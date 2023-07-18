import jobInstance from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { toast } from "react-hot-toast"

export interface UserState {
  isLoading: "idle" | "pending" | "succeeded" | "failed"
  user: null | UserResponse
}

export interface UserResponse {
  name: string
  email: string
  lastName: string
  location: string
  token: string
}

const initialState: UserState = {
  isLoading: "idle",
  user: null,
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
  async (user: { email: string; password: string }) => {
    console.log("login", user)
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = "pending"
      toast.loading("Registering user...")
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user } = payload
      state.user = user
      state.isLoading = "succeeded"
      toast.remove()
      toast.success("User registered successfully")
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      const { msg } = payload as { msg: string }
      state.isLoading = "failed"
      toast.remove()
      toast.error(msg, {
        duration: 4000,
      })
    })
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = "pending"
    })
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isLoading = "succeeded"
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = "failed"
    })
  },
})

export default userSlice
