import { createSlice } from "@reduxjs/toolkit"

export interface UserState {
  isLoading: boolean
  user: null | {
    name: string
    email: string
  }
}

const initialState: UserState = {
  isLoading: false,
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

export default userSlice
