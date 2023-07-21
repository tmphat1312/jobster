import jobInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { logoutUser } from "../user/userSlice"
import { UserState } from "../user/userThunk"

// TODO: make a factory to create these thunk based on factory design pattern
export const getStats = createAsyncThunk(
  "stats/getStats",
  async (_, thunkAPI) => {
    const userState = thunkAPI.getState() as { user: UserState }

    try {
      const response = await jobInstance.get("/jobs/stats", {
        headers: {
          Authorization: `Bearer ${userState.user.user?.token}`,
        },
      })
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response)
          if (error.response.status == 401) {
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue({ msg: "Unauthorized user" })
          }
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }

        return thunkAPI.rejectWithValue(error.response?.data)
      }

      console.error("Unknown Error: ", error)
      return thunkAPI.rejectWithValue("Unknown Error happened")
    }
  }
)
