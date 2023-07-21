import { createSlice } from "@reduxjs/toolkit"
import { getStats } from "./statsThunk"
import { toast } from "react-hot-toast"

export interface StatsProps {
  defaultStats: {
    pending: number
    interview: number
    declined: number
  }
  monthlyApplications: Array<{
    date: string
    count: number
  }>
}

export interface StatsState {
  data: StatsProps | null
  status: "idle" | "pending" | "succeeded" | "failed"
}

const initialState: StatsState = {
  data: null,
  status: "idle",
}

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.status = "pending"
        toast.loading("Loading stats...")
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.status = "succeeded"
        state.data = payload as StatsProps
        toast.remove()
        toast.success("Stats loaded")
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.status = "failed"
        toast.remove()
        toast.error(payload as string, {
          duration: 4000,
        })
      })
  },
})

export default statsSlice
