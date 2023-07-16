import { useCallback, useEffect, useState, useRef } from 'react'
import Button from '@/components/Button'

import defaultState from '@/cra/store/defaultState'
import { gridLookup, gridUpdate, gridInit, gridProgram } from '@/cra/grid'
import { execute, advance, pushInput } from '@/utilities/execute'

type Props = {
  initialState: Partial<ExecutionState>
}

Befunge.defaultProps = {
  initialState: defaultState,
}

type Mode = 'text-edit' | 'cell-edit' | 'step' | 'animate'
function tap(e) {
  console.log(e)
  return e
}

export default function Befunge(props: Props) {
  // State
  const [state, updateState] = useState({ ...defaultState, ...props.initialState })
  const [mode, setMode] = useState<Mode>('text-edit')
  const stdinInputRef = useRef()

  // Callbacks
  const step = useCallback(
    () =>
      updateState((state) => {
        const executed = execute(state, { strict: false })
        if (executed.pendingInput) {
          stdinInputRef.current.focus()
          return executed
        }
        return advance(executed)
      }),
    [updateState],
  )

  const handleStdinInput = useCallback(() => {
    let value = stdinInputRef.current.value
    if (value.length === 0) {
      return
    }

    stdinInputRef.current.value = ''
    stdinInputRef.current.blur()

    updateState((state) => advance(pushInput(state, state.pendingInput === 'Number' ? Number(value) : value)))
  }, [updateState])

  const handleGridInput = useCallback(
    (e: string, i: number, j: number) =>
      updateState((state) => ({ ...state, grid: gridUpdate(state.grid, { x: i, y: j }, e) })),
    [updateState],
  )
  const loadGrid = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lines = e.target.value.split('\n')
      const last = lines.pop()
      if (last !== '') {
        lines.push(last)
      }
      updateState((state) => ({ ...state, ...gridInit(lines) }))
    },
    [updateState],
  )

  const restart = useCallback(() => {
    updateState((state) => ({ ...defaultState, grid: state.grid, dimensions: state.dimensions }))
  }, [updateState])

  // Effects
  useEffect(() => {
    if (state.executionComplete) {
      setMode('cell-edit')
    }
  }, [state.executionComplete])

  useEffect(() => {
    if (mode !== 'animate' || state.pendingInput) {
      return
    }
    const intervalId = setInterval(step, 250)
    return () => clearInterval(intervalId)
  }, [mode, state.pendingInput])

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center">
      <header className="flex gap-5 mt-10">
        <Button
          onClick={() => {
            setMode('animate')
            restart()
          }}
        >
          Animate
        </Button>
        <Button onClick={() => setMode('text-edit')} disabled={mode === 'text-edit'}>
          Edit
        </Button>
      </header>
      <main className="flex">
        {mode === 'text-edit' ? (
          <textarea
            data-testid="befunge-text-editor"
            className="h-full border rounded-[10px] border-blue-300 p-2 font-mono"
            autoFocus
            onChange={loadGrid}
            defaultValue={gridProgram(state.grid, state.dimensions)}
            onBlur={() => setMode('cell-edit')}
          />
        ) : (
          <>
            <div>
              <table
                data-testid="befunge-grid-editor"
                className="self-center table-fixed border-separate border-2 border-blue-200"
              >
                <tbody>
                  {Array.from({ length: state.dimensions.height }, (_, j) => (
                    <tr key={j}>
                      {Array.from({ length: state.dimensions.width }, (_, i) => (
                        <Cell
                          key={i}
                          i={i}
                          j={j}
                          value={gridLookup(state.grid, { x: i, y: j })}
                          onChange={(e) => handleGridInput(e.target.value || ' ', i, j)}
                          mode={mode}
                          executing={
                            !mode.endsWith('edit') && state.executionPointer.x === i && state.executionPointer.y === j
                          }
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="flex flex-col mx-4">
          <p>
            <label>Stdin: </label>
            <input
              className={`
                pl-3 border rounded
                ${state.pendingInput ? 'border-red-300' : 'border-slate-300'}
              `}
              type={state.pendingInput === 'Number' ? 'number' : 'text'}
              ref={stdinInputRef}
              onBlur={handleStdinInput}
              onKeyDown={(e) => e.key === 'Enter' && handleStdinInput()}
              //disabled={!state.pendingInput}
            />
          </p>
          <p>Stdout: {state.console}</p>
          <p>Heading: {state.heading}</p>
          Stack:
          <div className="flex flex-col">
            {Array.from(state.stack).map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
type CellProps = {
  i: number
  j: number
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  executing: boolean
  mode: Mode
}

export function Cell(props: CellProps) {
  const { value, onChange, mode, executing, i, j } = props
  const [focus, setFocus] = useState<boolean>(false)
  return (
    <td
      className={`
        border text-center text-ellipsis p-0 w-[40px] h-[40px]
        ${executing ? 'border-yellow-200 border-2' : ''}
      `}
    >
      {mode === 'cell-edit' || focus ? (
        <input
          data-testid={`cell-input-${i}-${j}`}
          tabIndex="1"
          className="block w-full h-full text-center heading-1"
          autoFocus={focus && mode !== 'cell-edit'}
          type="text"
          maxLength={1}
          defaultValue={value.trim()}
          onChange={onChange}
          onBlur={() => setFocus(false)}
        />
      ) : (
        <div
          className="w-full h-full hover:cursor-text flex items-center justify-center"
          onClick={() => setFocus(true)}
        >
          {value}
        </div>
      )}
    </td>
  )
}
