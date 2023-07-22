import SelectInput from "@/components/SelectInput"
import TextInput from "@/components/TextInput"
import { addJob } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useState } from "react"

interface AddJobState {
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
    name: "status" as const,
    label: "status",
    options: ["pending", "interview", "declined"],
  },
  {
    name: "jobType" as const,
    label: "job type",
    options: ["full-time", "part-time", "remote", "internship"],
  },
]

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
    <form className={styles.formClasses} onSubmit={handleSubmit}>
      <h2 className={styles.headingClasses}>Add Job</h2>
      <div className={styles.inputsContainerClasses}>
        {inputs.map((input, i) => (
          <TextInput
            key={input.name}
            {...input}
            value={job[input.name]}
            onChange={handleInputChange}
            required
            autoFocus={i === 0}
          />
        ))}

        {selectInputs.map((input) => (
          <SelectInput
            key={input.name}
            {...input}
            required
            value={job[input.name]}
            onChange={handleSelectChange}
          />
        ))}
      </div>
      <div className={styles.buttonsContainerClasses}>
        <button
          type="submit"
          className="button button--block button--primary"
          disabled={status == "pending"}
        >
          {status == "pending" ? "adding..." : "add"}
        </button>
        <button
          type="button"
          className="button button--block button--grey"
          onClick={() => setJob(initialState)}
          disabled={status == "pending"}
        >
          clear
        </button>
      </div>
    </form>
  )
}

const styles = {
  formClasses: "max-w-3xl px-8 py-4 mx-auto bg-white rounded-md drop-shadow-md",
  headingClasses: "mb-8 text-3xl font-medium",
  inputsContainerClasses:
    "flex flex-col gap-4 mb-8 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-8 md:mb-12",
  buttonsContainerClasses: "flex flex-col max-w-sm gap-3 mx-auto sm:flex-row",
}

export default AddJob
