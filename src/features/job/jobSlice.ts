import { toast } from "react-hot-toast"
import { createSlice } from "@reduxjs/toolkit"
import { addJob } from "./jobThunk"

export interface JobState {
  status: "idle" | "pending" | "succeeded" | "failed"
}

const initialState: JobState = {
  status: "idle",
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
  },
})

export default jobSlice
