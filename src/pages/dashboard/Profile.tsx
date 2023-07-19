import { updateUser } from "@/features/user/userThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useState } from "react"

function Profile() {
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.user)
  const [values, setValues] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    lastName: user?.lastName ?? "",
    location: user?.location ?? "",
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(updateUser(values))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const inputs = [
    {
      type: "text",
      name: "name",
      label: "name",
      value: values.name,
    },
    {
      type: "email",
      name: "email",
      label: "email",
      value: values.email,
    },
    {
      type: "text",
      name: "lastName",
      label: "last name",
      value: values.lastName,
    },
    {
      type: "text",
      name: "location",
      label: "location",
      value: values.location,
    },
  ] as const

  return (
    <form
      className="max-w-3xl px-8 py-4 mx-auto bg-white rounded-md drop-shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-8 text-3xl font-medium">Profile</h2>
      <div className="flex flex-col gap-4 mb-8 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-8 md:mb-12">
        {inputs.map((input, i) => (
          <label
            htmlFor={input.name}
            key={input.name}
            className="space-y-1 text-black capitalize"
          >
            <span>{input.label}</span>
            <input
              className="block w-full px-2 py-1 border border-gray-300 rounded-sm bg-slate-100"
              type={input.type}
              name={input.name}
              id={input.name}
              value={values[input.name]}
              onChange={handleChange}
              autoFocus={i === 0}
            />
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="md:w-auto md:mx-auto button button--block button--primary"
        disabled={status == "pending"}
      >
        {status == "pending" ? "Saving..." : "Save changes"}
      </button>
    </form>
  )
}

export default Profile
