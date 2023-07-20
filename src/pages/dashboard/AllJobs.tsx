import SearchJobForm from "@/components/JobSearchForm"
import JobsContainer from "@/components/JobsContainer"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getJobs } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useEffect } from "react"

function AllJobs() {
  const dispatch = useAppDispatch()
  const { totalJobs, status } = useAppSelector((state) => state.job)

  useEffect(() => {
    dispatch(getJobs())
  }, [])

  return (
    <>
      <SearchJobForm />
      {status == "pending" ? (
        <div className="mt-16 text-lg text-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <p className="font-bold text-center text-slate-800">
            {totalJobs > 0 ? totalJobs : "No"} job{totalJobs > 1 && "s"} found
          </p>
          <JobsContainer />
        </div>
      )}
    </>
  )
}

export default AllJobs
