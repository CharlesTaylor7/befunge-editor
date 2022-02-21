type Props = {
  height: number
  width: number
}

Befunge.defaultProps = {
  height: 8,
  width: 5,
}

export default function Befunge(props: Props) {
  const { height, width } = props
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <table className="table-fixed border-separate">
        {Array.from({ length: height }, (_, j) => (
          <tr>
            {Array.from({ length: width }, (_, i) => (
              <td className="border text-center text-ellipsis p-0 w-[30px] h-[30px]">
                <input className="block w-full h-full text-center" 
                  type="text" 
                maxLength={1}/>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}
