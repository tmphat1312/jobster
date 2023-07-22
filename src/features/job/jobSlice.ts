import { JobProps } from "@/types/api"
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"
import { addJob, deleteJob, editJob, getJobs } from "./jobThunk"

const jobSlice = createSlice({
  name: "job",
  initialState: {
    status: "idle",
    jobs: Array<JobProps>(),
    totalJobs: 0,
    numOfPages: 0,
    editId: "",
  },
  reducers: {
    setEditId(state, { payload }) {
      const id = payload as string
      state.editId = id
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.status = "pending"
        toast.loading("Adding the job...")
      })
      .addCase(addJob.fulfilled, (state) => {
        state.status = "succeeded"
        toast.remove()
        toast.success("The job is there!")
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
      .addCase(getJobs.pending, (state) => {
        state.status = "pending"
        toast.loading("Loading jobs...")
      })
      .addCase(getJobs.fulfilled, (state, { payload }) => {
        const { jobs, totalJobs, numOfPages } = payload as {
          jobs: any
          totalJobs: number
          numOfPages: number
        }
        state.status = "succeeded"
        state.jobs = jobs
        state.totalJobs = totalJobs
        state.numOfPages = numOfPages
        toast.remove()
        toast.success("All the jobs is there!")
      })
      .addCase(getJobs.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = "pending"
        toast.loading("Deleting job...")
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        const { id } = payload
        state.status = "succeeded"
        state.jobs = state.jobs.filter((job) => job._id !== id)
        state.totalJobs -= 1
        state.numOfPages -= 1
        toast.remove()
        toast.success("Job deleted!")
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
      .addCase(editJob.pending, (state) => {
        state.status = "pending"
        toast.loading("Editing job...")
      })
      .addCase(editJob.fulfilled, (state, { payload }) => {
        const { updatedJob } = payload as { updatedJob: JobProps }
        state.status = "succeeded"
        state.jobs = [
          ...state.jobs.filter((job) => job._id !== updatedJob._id),
          updatedJob,
        ]
        toast.remove()
        toast.success("Job edited!")
        state.editId = ""
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
  },
})

export const { setEditId } = jobSlice.actions
export default jobSlice
