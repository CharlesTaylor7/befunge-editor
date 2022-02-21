import { ExecutionState, initialExecutionState } from '@/utils/befunge'
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

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center">
        <header>
          <button className="border rounded bg-green-300 p-2 m-4" onClick={() => setMode('step')}>
            Run!
          </button>
          <button className="border rounded bg-green-300 p-2 m-4" onClick={() => console.log('next')}>
            Next
          </button>
        </header>
        <table className="table-fixed border-separate">
          {Array.from({ length: state.grid.height }, (_, j) => (
            <tr>
              {Array.from({ length: state.grid.width }, (_, i) => (
                <td
                  className={`
                    border text-center text-ellipsis p-0 w-[40px] h-[40px]
                    ${
                      state.executionPointer.x === i && state.executionPointer.y === j
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
        </table>
      </div>
      <div>
        <input disabled={!state.pendingInput} />
        <p>Heading: {state.heading}</p>
        <p>Console: {state.console}</p>
        <p>Stack: {state.stack}</p>
      </div>
    </div>
  )
}
