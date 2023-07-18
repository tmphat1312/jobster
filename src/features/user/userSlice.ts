import jobInstance from "@/lib/axios"
import { getLocalStorage, setLocalStorage } from "@/lib/localstorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { toast } from "react-hot-toast"

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

const initialState: UserState = {
  status: "idle",
  user: getLocalStorage(LOCAL_STORAGE_KEY) as UserResponse | null,
}

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
      } else {
        console.error("Unknown Error: ", error)
        return thunkAPI.rejectWithValue("Unknown Error happened")
      }
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
      } else {
        console.error("Unknown Error: ", error)
        return thunkAPI.rejectWithValue("Unknown Error happened")
      }
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "pending"
      toast.loading("Registering user...")
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user } = payload
      state.user = user
      state.status = "succeeded"
      toast.remove()
      toast.success("User registered successfully")
      setLocalStorage(LOCAL_STORAGE_KEY, user)
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      const { msg } = payload as { msg: string }
      state.status = "failed"
      toast.remove()
      toast.error(msg, {
        duration: 4000,
      })
    })
    builder.addCase(loginUser.pending, (state) => {
      state.status = "pending"
      toast.loading("Logging in user...")
    })
    builder.addCase(loginUser.fulfilled, (state) => {
      state.status = "succeeded"
      toast.remove()
      toast.success("User logged in successfully")
      setLocalStorage(LOCAL_STORAGE_KEY, user)
    })
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      const { msg } = payload as { msg: string }
      state.status = "failed"
      toast.remove()
      toast.error(msg, {
        duration: 4000,
      })
    })
  },
})

export default userSlice
