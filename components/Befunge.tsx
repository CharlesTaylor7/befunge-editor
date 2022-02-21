import { advancePointer, ExecutionState, initialExecutionState } from '@/utils/befunge'
import execute from '@/utils/execute'
import { gridUpdate } from '@/utils/grid'
import { useCallback, useState } from 'react'

type Props = {
  initialExecutionState: ExecutionState
}

Befunge.defaultProps = {
  initialExecutionState,
}

type Mode = 'edit' | 'step' | 'animate'

export default function Befunge(props: Props) {
  const { initialExecutionState } = props
  const [state, updateState] = useState(initialExecutionState)
  const [mode, setMode] = useState<Mode>('edit')
  const handleGridInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number) =>
      updateState((state) => ({ ...state, grid: gridUpdate(state.grid, i, j, e.target.value) })),
    [updateState]
  )

  const runStep = useCallback(() => updateState((state) => advancePointer(execute(state))), [])

  return (
    <div className="w-screen h-screen flex flex-row gap-10">
      <table className="table-fixed border-separate self-center">
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
                    onChange={(e) => handleGridInput(e, i, j)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col">
        <header>
          <button className="border rounded bg-green-300 p-2 m-4" onClick={() => setMode('step')}>
            Run!
          </button>
          <button className="border rounded bg-green-300 p-2 m-4" onClick={runStep}>
            Next
          </button>
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
