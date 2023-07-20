import SearchJobForm from "@/components/JobSearchForm"
import JobsContainer from "@/components/JobsContainer"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getJobs } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useEffect } from "react"
import EditJobModal from "./EditJobModal"

function AllJobs() {
  const dispatch = useAppDispatch()
  const { totalJobs, status, editId } = useAppSelector((state) => state.job)

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
          <p className="text-2xl font-bold text-center text-slate-800">
            {totalJobs > 0 ? totalJobs : "No"} job
            {(totalJobs > 1 || totalJobs == 0) && "s"} found
          </p>
          <JobsContainer />
        </div>
      )}
      {editId != "" && (
        <>
          <div className="fixed inset-0 bg-slate-900/50"></div>
          <div className="fixed -translate-y-1/2 top-1/2 inset-x-4">
            <EditJobModal />
          </div>
        </>
      )}
    </>
  )
}

export default AllJobs
