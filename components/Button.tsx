type Props = {
  onClick: () => void
  children?: React.ReactNode
}

Button.defaultProps = {
  onClick: () => {},
}
export default function Button(props: Props) {
  const { onClick, children } = props
  return (
    <button className="border rounded bg-green-300 p-2 m-4" onClick={onClick}>
      {children}
    </button>
  )
}
