import {
  authorizedJobInstance,
  handleAxiosError,
  jobInstance,
} from "@/lib/axios"
import { UserProps } from "@/types/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await jobInstance.post("/auth/register", user)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      const resp = handleAxiosError(error)
      return thunkAPI.rejectWithValue(resp.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await jobInstance.post("/auth/login", user)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      const resp = handleAxiosError(error)
      return thunkAPI.rejectWithValue(resp.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: UserProps, thunkAPI) => {
    try {
      const response = await authorizedJobInstance.patch(
        "/auth/updateUser",
        user
      )
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      const resp = handleAxiosError(error)
      return thunkAPI.rejectWithValue(resp.message)
    }
  }
)
