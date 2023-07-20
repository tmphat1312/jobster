import jobInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { UserState } from "../user/userThunk"
import { logoutUser } from "../user/userSlice"
import { SearchJobState } from "@/components/JobSearchForm"

export interface JobState {
  status: "idle" | "pending" | "succeeded" | "failed"
}

export interface JobProps {
  position: string
  company: string
  jobLocation: string
  status: "pending" | "interview" | "declined"
  jobType: "full-time" | "part-time" | "remote" | "internship"
  createdAt?: string
  _id?: string
}

export const addJob = createAsyncThunk(
  "job/addJob",
  async (job: JobProps, thunkAPI) => {
    const userState = thunkAPI.getState() as { user: UserState }

    try {
      const response = await jobInstance.post("/jobs", job, {
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

export const getJobs = createAsyncThunk(
  "job/getJobs",
  async (params: SearchJobState | undefined, thunkAPI) => {
    const userState = thunkAPI.getState() as { user: UserState }

    try {
      const response = await jobInstance.get("/jobs", {
        headers: {
          Authorization: `Bearer ${userState.user.user?.token}`,
        },
        params,
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
