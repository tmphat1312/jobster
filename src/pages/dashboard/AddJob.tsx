import { addJob } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useState } from "react"

export interface AddJobState {
  position: string
  company: string
  jobLocation: string
  status: "pending" | "interview" | "declined"
  jobType: "full-time" | "part-time" | "remote" | "internship"
}

const inputs = [
  {
    type: "text",
    name: "position",
    label: "position",
  },
  {
    type: "text",
    name: "company",
    label: "company",
  },
  {
    type: "text",
    name: "jobLocation",
    label: "job location",
  },
] as const

const selectInputs = [
  {
    name: "status",
    label: "status",
    options: ["pending", "interview", "declined"],
  },
  {
    name: "jobType",
    label: "job type",
    options: ["full-time", "part-time", "remote", "internship"],
  },
] as const

function AddJob() {
  const { user } = useAppSelector((state) => state.user)
  const { status } = useAppSelector((state) => state.job)
  const initialState = {
    position: "",
    company: "",
    jobLocation: user?.location ?? "",
    status: "pending",
    jobType: "full-time",
  } satisfies AddJobState
  const [job, setJob] = useState(initialState)
  const dispatch = useAppDispatch()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addJob(job))
    setJob(initialState)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setJob((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setJob((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <form
      className="max-w-3xl px-8 py-4 mx-auto bg-white rounded-md drop-shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-8 text-3xl font-medium">Add Job</h2>
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
              value={job[input.name]}
              onChange={handleInputChange}
              autoFocus={i === 0}
              required
            />
          </label>
        ))}

        {selectInputs.map((input) => (
          <label
            htmlFor={input.name}
            key={input.name}
            className="space-y-1 text-black capitalize"
          >
            <span>{input.label}</span>
            <select
              className="block w-full px-2 py-1 border border-gray-300 rounded-sm bg-slate-100"
              name={input.name}
              id={input.name}
              value={job[input.name]}
              onChange={handleSelectChange}
              required
            >
              {input.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="flex flex-col max-w-sm gap-3 mx-auto sm:flex-row">
        <button
          type="button"
          className="button button--block button--grey"
          onClick={() => setJob(initialState)}
          disabled={status == "pending"}
        >
          clear
        </button>
        <button
          type="submit"
          className="button button--block button--primary"
          disabled={status == "pending"}
        >
          {status == "pending" ? "adding..." : "add"}
        </button>
      </div>
    </form>
  )
}

export default AddJob
