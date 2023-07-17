type Props = {
  onToggle: (checked: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
}

Toggle.defaultProps = {
  onToggle: () => {},
}

export default function Toggle(props: Props) {
  const { onToggle, children } = props
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="peer sr-only" onChange={(e) => onToggle(e.target.checked)} />
      <div className="w-12 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>
    </label>
  )
}
