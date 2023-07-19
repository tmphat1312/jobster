import jobInstance from "@/lib/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { logoutUser } from "./userSlice"

export interface UserState {
  status: "idle" | "pending" | "succeeded" | "failed"
  user: null | UserResponse
}

export interface UserResponse {
  name: string
  email: string
  lastName: string
  location: string
  token: string
}

export const LOCAL_STORAGE_KEY = "user_jobster_token"

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await jobInstance.post("/auth/register", user)
      // return response.data
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response)
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

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await jobInstance.post("/auth/login", user)
      // return response.data
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response)
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    user: { name: string; email: string; lastName: string; location: string },
    thunkAPI
  ) => {
    const userState = thunkAPI.getState() as { user: UserState }

    try {
      const response = await jobInstance.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${userState.user.user?.token}`,
        },
      })
      // return response.data
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
