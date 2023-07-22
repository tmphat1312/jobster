import { USER_LOCAL_STORAGE_KEY } from "@/constants"
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/lib/localstorage"
import { UserProps } from "@/types/api"
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"
import { loginUser, registerUser, updateUser } from "./userThunk"

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: getLocalStorage(USER_LOCAL_STORAGE_KEY) as UserProps | null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null
      state.status = "idle"
      toast.success("User logged out successfully")
      removeLocalStorage(USER_LOCAL_STORAGE_KEY)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "pending"
        toast.loading("Registering user...")
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.user = user
        state.status = "succeeded"
        toast.remove()
        toast.success("User registered successfully")
        setLocalStorage(USER_LOCAL_STORAGE_KEY, user)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "pending"
        toast.loading("Logging in user...")
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user = payload.user
        state.user = user
        state.status = "succeeded"
        toast.remove()
        toast.success("User logged in successfully")
        setLocalStorage(USER_LOCAL_STORAGE_KEY, user)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "pending"
        toast.loading("Saving changes...")
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const user = payload.user
        state.user = user
        state.status = "succeeded"
        toast.remove()
        toast.success("Updated in successfully")
        setLocalStorage(USER_LOCAL_STORAGE_KEY, user)
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        const { msg } = payload as { msg: string }
        state.status = "failed"
        toast.remove()
        toast.error(msg, {
          duration: 4000,
        })
      })
  },
})

export const { logoutUser } = userSlice.actions

export default userSlice
