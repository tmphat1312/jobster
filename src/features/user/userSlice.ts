import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
  isLoading: "idle" | "pending" | "succeeded" | "failed"
  user: null | {
    name: string
    email: string
  }
}

const initialState: UserState = {
  isLoading: "idle",
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

export default userSlice
