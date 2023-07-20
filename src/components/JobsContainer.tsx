import { useAppSelector } from "@/hooks"
import JobCard from "./JobCard"

function JobsContainer() {
  const { jobs } = useAppSelector((state) => state.job)

  return (
    <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  )
}

export default JobsContainer
