import { List } from 'immutable'
import { useState } from 'react'

type Props = {
  height: number
  width: number
}

Befunge.defaultProps = {
  height: 8,
  width: 5,
}

function toKey(i: number, j: number, height: number): number {
  return i + j * height
}

export default function Befunge(props: Props) {
  const { height, width } = props
  const [grid, setGrid] = useState<List<string>>(List())
  

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <table 
        className="table-fixed border-separate"
      >
        {Array.from({ length: height }, (_, j) => (
          <tr>
            {Array.from({ length: width }, (_, i) => (
              <td className="border text-center text-ellipsis p-0 w-[30px] h-[30px]">
                <input
                  autoFocus={i===0 && j===0}
                  className="block w-full h-full text-center"
                  type="text"
                  maxLength={1}
                  onChange={(e) => setGrid(grid.set(toKey(i, j, height), e.target.value))}
                />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}
