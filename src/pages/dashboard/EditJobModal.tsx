import { setEditId } from "@/features/job/jobSlice"
import { editJob } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useEffect, useState } from "react"

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

function EditJobModal() {
  const dispatch = useAppDispatch()
  const { status, jobs, editId } = useAppSelector((state) => state.job)
  const initialState = jobs.find((job) => job._id == editId) as AddJobState
  const [job, setJob] = useState(initialState)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(editJob(job))
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

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key == "Escape") {
      dispatch(setEditId(""))
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <form
      className="max-w-3xl px-8 py-4 mx-auto bg-white rounded-md drop-shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-8 text-3xl font-medium">Edit job</h2>
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
      <div className="flex max-w-sm gap-3 mx-auto">
        <button
          type="submit"
          className="button button--block button--primary"
          disabled={status == "pending"}
          title="Press Enter to submit"
        >
          {status == "pending" ? "Editing..." : "Edit"}
        </button>
        <button
          type="button"
          className="button button--block button--grey"
          disabled={status == "pending"}
          onClick={() => dispatch(setEditId(""))}
          title="Press Esc to cancel"
        >
          cancel
        </button>
      </div>
    </form>
  )
}

export default EditJobModal
