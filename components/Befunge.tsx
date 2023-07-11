import { useCallback, useEffect, useState } from 'react'
import Button from '@/components/Button'

import { advancePointer, ExecutionState, execute, init, programFromGrid } from '@/utils/befunge'
import { initialExecutionState as defaultState } from '@/utils/befunge'
import { gridLookup, gridUpdate } from '@/utils/grid'

type Props = {
  initialState: Partial<ExecutionState>
}

Befunge.defaultProps = {
  initialState: defaultState,
}

type Mode = 'text-edit' | 'cell-edit' | 'step' | 'animate'

export default function Befunge(props: Props) {
  const [state, updateState] = useState({ ...defaultState, ...props.initialState })
  const [mode, setMode] = useState<Mode>('text-edit')

  const handleGridInput = useCallback(
    (e: string, i: number, j: number) => updateState((state) => ({ ...state, grid: gridUpdate(state.grid, i, j, e) })),
    [updateState],
  )
  const loadGrid = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => updateState((state) => ({ ...state, grid: init(e.target.value) })),
    [],
  )

  const runStep = useCallback(() => updateState((state) => advancePointer(execute(state))), [updateState])
  const restartExecution = useCallback(() => {
    setMode('step')
    updateState((state) => ({ ...initialExecutionState, grid: state.grid }))
  }, [])

  useEffect(() => {
    if (state.executionComplete) {
      setMode('cell-edit')
    }
  }, [state.executionComplete])

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center">
      <header className="flex gap-5 mt-10">
        <Button onClick={() => setMode('text-edit')} disabled={mode === 'text-edit'}>
          Edit
        </Button>
        <Button onClick={restartExecution}>Restart</Button>
        <Button onClick={runStep} disabled={mode !== 'step'}>
          Next
        </Button>
      </header>
      <main className="flex">
        {mode === 'text-edit' ? (
          <textarea
            className="h-full border rounded-[10px] border-blue-300 p-2 font-mono"
            autoFocus
            onChange={loadGrid}
            defaultValue={programFromGrid(state.grid)}
            onBlur={() => setMode('cell-edit')}
          />
        ) : (
          <>
            <div className="flex justify-center"></div>
            <table className="self-center table-fixed border-separate border-2 border-blue-200">
              <tbody>
                {Array.from({ length: state.grid.height }, (_, j) => (
                  <tr key={j}>
                    {Array.from({ length: state.grid.width }, (_, i) => (
                      <Cell
                        key={i}
                        value={gridLookup(state.grid, i, j)}
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
          </>
        )}
        <div className="flex flex-col m-4">
          <div>
            <input disabled={!state.pendingInput} />
            <p>Heading: {state.heading}</p>
            <p>Console: {state.console}</p>
            Stack:
            <div className="flex flex-col">
              {Array.from(state.stack).map((s) => (
                <span>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
type CellProps = {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  executing: boolean
  mode: Mode
}

export function Cell({ value, onChange, mode, executing }: CellProps) {
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
