import { advancePointer, ExecutionState, init, initialExecutionState } from '@/utils/befunge'
import execute from '@/utils/execute'
import { gridLookup, gridUpdate } from '@/utils/grid'
import { useCallback, useState } from 'react'
import Button from './Button'

type Props = {
  initialExecutionState: ExecutionState
}

Befunge.defaultProps = {
  initialExecutionState,
}

type Mode = 'edit' | 'step' | 'animate'

function useToggle(initialState: boolean): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialState)
  const toggle = useCallback(() => setState((s) => !s), [setState])
  return [state, toggle]
}

export default function Befunge(props: Props) {
  const { initialExecutionState } = props
  const [state, updateState] = useState(initialExecutionState)
  const [mode, setMode] = useState<Mode>('edit')
  const [textArea, setTextArea] = useState<boolean>(false)

  const handleGridInput = useCallback(
    (e: string, i: number, j: number) => updateState((state) => ({ ...state, grid: gridUpdate(state.grid, i, j, e) })),
    [updateState],
  )
  const loadGrid = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      updateState((state) => ({ ...state, grid: init(e.target.value.split('\n')) })),
    [],
  )

  const runStep = useCallback(() => updateState((state) => advancePointer(execute(state))), [])

  return (
    <div className="w-screen h-screen flex flex-row gap-10">
      <div className="flex flex-col gap-10 m-4">
        {textArea ? (
          <textarea
            className="border rounded-[10px] border-blue-300 p-2"
            autoFocus
            onChange={loadGrid}
            onBlur={() => setTextArea(false)}
          />
        ) : (
          <Button onClick={() => setTextArea(true)}>Program</Button>
        )}
        <table className="self-center table-fixed border-separate border-2 border-blue-200">
          <tbody>
            {Array.from({ length: state.grid.height }, (_, j) => (
              <tr key={j}>
                {Array.from({ length: state.grid.width }, (_, i) => (
                  <td
                    key={i}
                    className={`
                    border text-center text-ellipsis p-0 w-[40px] h-[40px]
                    ${
                      mode !== 'edit' && state.executionPointer.x === i && state.executionPointer.y === j
                        ? 'border-yellow-200 border-2'
                        : ''
                    }
                  `}
                  >
                    <input
                      disabled={mode === 'animate'}
                      autoFocus={i === 0 && j === 0}
                      className="block w-full h-full text-center"
                      type="text"
                      maxLength={1}
                      defaultValue={gridLookup(state.grid, i, j)}
                      onChange={(e) => handleGridInput(e.target.value, i, j)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col m-4">
        <header>
          <Button onClick={() => setMode('step')}>Run!</Button>
          <Button onClick={runStep}>Next!</Button>
        </header>
        <div>
          <input disabled={!state.pendingInput} />
          <p>Heading: {state.heading}</p>
          <p>Console: {state.console}</p>
          <p>Stack: {state.stack}</p>
        </div>
      </div>
    </div>
  )
}
