interface TextInputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: string[]
}

function TextInput({ ...props }: TextInputProps) {
  return (
    <label htmlFor={props.name} className="space-y-1 text-black capitalize">
      <span>{props.label}</span>
      <select
        className="block w-full px-2 py-1 border border-gray-300 rounded-sm bg-slate-100"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default TextInput
