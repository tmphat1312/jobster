interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

function TextInput({ ...props }: TextInputProps) {
  return (
    <label htmlFor={props.name} className="space-y-1 text-black capitalize">
      <span>{props.label}</span>
      <input
        className="block w-full px-2 py-1 border border-gray-300 rounded-sm bg-slate-100"
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
      />
    </label>
  )
}

export default TextInput
