type Props = {
  height: number;
  width: number;
};

Befunge.defaultProps = {
  height: 10,
  width: 10,
}


export default function Befunge(props: Props) {

  const { height, width} = props;
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <table>
        {Array.from({length: height}, (_, j) => (<tr>
          {Array.from({length: width}, (_, k) => <td><input type="text" /></td>
        </tr>))}
      </table>
    </div>
  )
}
