import { getJobs } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useState } from "react"

export interface SearchJobState {
  search: string
  status: "all" | "pending" | "interview" | "declined"
  jobType: "all" | "full-time" | "part-time" | "remote" | "internship"
  sort: "latest" | "oldest" | "a-z" | "z-a"
}

const inputs = [
  {
    type: "text",
    name: "search",
    label: "search",
  },
] as const

const selectInputs = [
  {
    name: "status",
    label: "status",
    options: ["all", "pending", "interview", "declined"],
  },
  {
    name: "jobType",
    label: "job type",
    options: ["all", "full-time", "part-time", "remote", "internship"],
  },
  {
    name: "sort",
    label: "sort",
    options: ["latest", "oldest", "a-z", "z-a"],
  },
] as const

function SearchJobForm() {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.job)
  const initialState = {
    search: "",
    status: "all",
    jobType: "all",
    sort: "latest",
  } satisfies SearchJobState
  const [jobFilter, setJobFilter] = useState(initialState)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(getJobs(jobFilter))
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setJobFilter((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setJobFilter((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  function clearFilters() {
    setJobFilter(initialState)
    dispatch(getJobs(initialState))
  }

  return (
    <form
      className="max-w-3xl px-8 py-4 mx-auto bg-white rounded-md drop-shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-8 text-3xl font-medium">Jobs filter</h2>
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
              value={jobFilter[input.name]}
              onChange={handleInputChange}
              autoFocus={i === 0}
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
              value={jobFilter[input.name]}
              onChange={handleSelectChange}
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
          onClick={clearFilters}
          disabled={status == "pending"}
        >
          clear filters
        </button>
        <button
          type="submit"
          className="button button--block button--primary"
          disabled={status == "pending"}
        >
          {status == "pending" ? "searching..." : "search"}
        </button>
      </div>
    </form>
  )
}

export default SearchJobForm
