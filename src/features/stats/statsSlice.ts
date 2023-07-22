import { StatsProps } from "@/types/api"
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"
import { getStats } from "./statsThunk"

interface StatsState {
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
        state.data = payload
        toast.remove()
        toast.success("Stats loaded")
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
  },
})

export default statsSlice
