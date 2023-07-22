import { getJobs } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useState } from "react"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"

export interface SearchJobState {
  search: string
  status: "all" | "pending" | "interview" | "declined"
  jobType: "all" | "full-time" | "part-time" | "remote" | "internship"
  sort: "latest" | "oldest" | "a-z" | "z-a"
  page: number
}

const initialState = {
  search: "",
  status: "all",
  jobType: "all",
  sort: "latest",
  page: 1,
} satisfies SearchJobState

const inputs = [
  {
    type: "text",
    name: "search",
    label: "search",
  },
] as const

const selectInputs = [
  {
    name: "status" as const,
    label: "status",
    options: ["all", "pending", "interview", "declined"],
  },
  {
    name: "jobType" as const,
    label: "job type",
    options: ["all", "full-time", "part-time", "remote", "internship"],
  },
  {
    name: "sort" as const,
    label: "sort",
    options: ["latest", "oldest", "a-z", "z-a"],
  },
]

function SearchJobForm({ resetAction }: { resetAction?: () => void }) {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.job)
  const [jobFilter, setJobFilter] = useState(initialState)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(getJobs({ ...jobFilter }))

    if (resetAction) resetAction()
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
    <form className={styles.formClasses} onSubmit={handleSubmit}>
      <h2 className="mb-8 text-3xl font-medium">Jobs filter</h2>
      <div className={styles.inputsContainerClasses}>
        {inputs.map((input, i) => (
          <TextInput
            {...input}
            onChange={handleInputChange}
            value={jobFilter[input.name]}
            key={input.name}
            autoFocus={i == 0}
          />
        ))}

        {selectInputs.map((input) => (
          <SelectInput
            {...input}
            onChange={handleSelectChange}
            value={jobFilter[input.name]}
            key={input.name}
          />
        ))}
      </div>
      <div className={styles.buttonsContainerClasses}>
        <button
          type="submit"
          className="button button--block button--primary"
          disabled={status == "pending"}
        >
          {status == "pending" ? "searching..." : "search"}
        </button>
        <button
          type="button"
          className="button button--block button--grey"
          onClick={clearFilters}
          disabled={status == "pending"}
        >
          clear filters
        </button>
      </div>
    </form>
  )
}

const styles = {
  formClasses: "max-w-3xl px-8 py-4 mx-auto bg-white rounded-md drop-shadow-md",
  inputsContainerClasses:
    "flex flex-col gap-4 mb-8 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-8 md:mb-12",
  buttonsContainerClasses: "flex flex-col max-w-sm gap-3 mx-auto sm:flex-row",
}

export default SearchJobForm
