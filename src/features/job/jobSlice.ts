import { toast } from "react-hot-toast"
import { createSlice } from "@reduxjs/toolkit"
import { addJob, getJobs } from "./jobThunk"

export interface JobProps {
  position: string
  company: string
  jobLocation: string
  status: "pending" | "interview" | "declined"
  jobType: "full-time" | "part-time" | "remote" | "internship"
  createdAt?: string
  _id?: string
}

export interface JobState {
  status: "idle" | "pending" | "succeeded" | "failed"
  jobs: JobProps[]
  totalJobs: number
  numOfPages: number
}

const initialState: JobState = {
  status: "idle",
  jobs: [],
  totalJobs: 0,
  numOfPages: 0,
}

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addJob.pending, (state) => {
      state.status = "pending"
      toast.loading("Adding the job...")
    })
    builder.addCase(addJob.fulfilled, (state) => {
      state.status = "succeeded"
      toast.remove()
      toast.success("The job is there!")
    })
    builder.addCase(addJob.rejected, (state, { payload }) => {
      const { msg } = payload as { msg: string }
      state.status = "failed"
      toast.remove()
      toast.error(msg, {
        duration: 4000,
      })
    })
    builder.addCase(getJobs.pending, (state) => {
      state.status = "pending"
      toast.loading("Loading jobs...")
    })
    builder.addCase(getJobs.fulfilled, (state, { payload }) => {
      const { jobs, totalJobs, numOfPages } = payload as {
        jobs: JobProps[]
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
    builder.addCase(getJobs.rejected, (state, { payload }) => {
      const { msg } = payload as { msg: string }
      state.status = "failed"
      toast.remove()
      toast.error(msg, {
        duration: 4000,
      })
    })
  },
})

export default jobSlice
