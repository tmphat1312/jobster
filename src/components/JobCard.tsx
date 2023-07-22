import { setEditId } from "@/features/job/jobSlice"
import { deleteJob } from "@/features/job/jobThunk"
import { useAppDispatch } from "@/hooks"
import { JobProps } from "@/types/api"
import { cva } from "class-variance-authority"
import dayjs from "dayjs"
import { BiSolidEditLocation, BiSolidTimeFive } from "react-icons/bi"
import { BsCalendarDate } from "react-icons/bs"

function JobCard({ job }: { job: JobProps }) {
  const dispatch = useAppDispatch()

  return (
    <article className="bg-white rounded-md drop-shadow-md">
      <header className="flex gap-8 p-4">
        <div className={charBox({ intents: job.status })}>
          {job.position.charAt(0)}
        </div>
        <section className="capitalize">
          <h4 className="text-xl font-medium text-slate-800">{job.position}</h4>
          <p>{job.company}</p>
        </section>
      </header>
      <hr />
      <div className="grid gap-3 p-4 capitalize sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <span className="text-xl">
            <BiSolidEditLocation />
          </span>
          <span className="truncate">{job.jobLocation}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-xl">
            <BiSolidTimeFive />
          </span>
          <span className="truncate">
            {dayjs(job.createdAt).format("MMM DD, YYYY")}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-xl">
            <BsCalendarDate />
          </span>
          <span className="truncate">{job.jobType}</span>
        </p>
        <div>
          <span className={statusBadge({ intents: job.status })}>
            {job.status}
          </span>
        </div>
      </div>
      <hr />
      <footer className="p-4 space-x-2">
        <button
          className={styles.editButtonClasses}
          onClick={() => dispatch(setEditId(job._id || ""))}
        >
          edit
        </button>
        <button
          className={styles.deleteButtonClasses}
          onClick={() => dispatch(deleteJob(job._id || ""))}
        >
          delete
        </button>
      </footer>
    </article>
  )
}

const charBox = cva(
  [
    "grid place-content-center",
    "text-3xl text-white font-bold uppercase",
    "w-14 h-14 rounded-md ",
  ],
  {
    variants: {
      intents: {
        pending: "bg-pending-text",
        declined: "bg-declined-text",
        interview: "bg-interview-text",
      },
    },
  }
)

const statusBadge = cva("py-1 px-2 rounded-md inline-block", {
  variants: {
    intents: {
      pending: "text-pending-text bg-pending-bg",
      declined: "text-declined-text bg-declined-bg",
      interview: "text-interview-text bg-interview-bg",
    },
  },
})

const styles = {
  editButtonClasses:
    "inline-block text-green-500 bg-green-200 button drop-shadow-sm hover:drop-shadow-md",
  deleteButtonClasses:
    "text-red-500 bg-red-200 button drop-shadow-sm hover:drop-shadow-md",
}

export default JobCard
