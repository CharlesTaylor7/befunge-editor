type Props = {
  disabled: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default function Button(props: Props) {
  return (
    <button
      data-testid={props.testId}
      className={`
        border rounded p-2
        ${props.disabled ? "bg-slate-200" : "bg-green-300"}
      `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
