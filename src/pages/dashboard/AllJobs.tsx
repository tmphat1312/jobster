import SearchJobForm from "@/components/JobSearchForm"
import JobsContainer from "@/components/JobsContainer"
import LoadingSpinner from "@/components/LoadingSpinner"
import Pagination from "@/components/Pagination"
import { getJobs } from "@/features/job/jobThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useEffect, useState } from "react"
import EditJobModal from "./EditJobModal"

function AllJobs() {
  const dispatch = useAppDispatch()
  const [current, setCurrent] = useState(1)
  const { totalJobs, status, editId, numOfPages } = useAppSelector(
    (state) => state.job
  )

  useEffect(() => {
    dispatch(getJobs())
  }, [])

  return (
    <div className="space-y-8">
      <SearchJobForm resetAction={() => setCurrent(1)} />
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
          {numOfPages > 1 && (
            <Pagination
              total={numOfPages}
              current={current}
              action={(page) => {
                setCurrent(page)
                dispatch(getJobs({ page }))
              }}
            />
          )}
        </div>
      )}
      {editId != "" && (
        <div>
          <div className="fixed inset-0 bg-slate-900/50"></div>
          <div className="fixed -translate-y-1/2 top-1/2 inset-x-4">
            <EditJobModal />
          </div>
        </div>
      )}
    </div>
  )
}

export default AllJobs
