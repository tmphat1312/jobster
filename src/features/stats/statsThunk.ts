import { authorizedJobInstance, handleAxiosError } from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { logoutUser } from "../user/userSlice"

export const getStats = createAsyncThunk(
  "stats/getStats",
  async (_, thunkAPI) => {
    try {
      const response = await authorizedJobInstance.get("/jobs/stats")
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      const resp = handleAxiosError(error)

      if (resp.status && resp.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue({ msg: "Unauthorized user" })
      }

      return thunkAPI.rejectWithValue(resp.message)
    }
  }
)
