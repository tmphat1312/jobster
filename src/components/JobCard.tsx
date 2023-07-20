import { JobProps } from "@/features/job/jobThunk"
import clsx from "clsx"
import dayjs from "dayjs"
import { BiSolidEditLocation, BiSolidTimeFive } from "react-icons/bi"
import { BsCalendarDate } from "react-icons/bs"
import { Link } from "react-router-dom"

function JobCard({ job }: { job: JobProps }) {
  return (
    <article className="bg-white rounded-md drop-shadow-md">
      <header className="flex gap-8 p-4">
        <div
          className={clsx(
            "grid text-3xl text-white font-bold uppercase rounded-md w-14 h-14 place-content-center",
            job.status == "pending" && "bg-orange-400",
            job.status == "declined" && "bg-red-400",
            job.status == "interview" && "bg-blue-400"
          )}
        >
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
          <span
            className={clsx(
              job.status == "pending" && "text-orange-500 bg-orange-200",
              job.status == "declined" && "text-red-500 bg-red-200",
              job.status == "interview" && "text-blue-500 bg-blue-200",
              "py-1 px-2 rounded-md inline-block"
            )}
          >
            {job.status}
          </span>
        </div>
      </div>
      <hr />
      <footer className="p-4 space-x-2">
        <Link
          to="/edit"
          className="inline-block text-green-600 bg-green-300 button drop-shadow-sm hover:drop-shadow-md"
        >
          edit
        </Link>
        <button className="text-red-600 bg-red-300 button drop-shadow-sm hover:drop-shadow-md">
          delete
        </button>
      </footer>
    </article>
  )
}

export default JobCard
