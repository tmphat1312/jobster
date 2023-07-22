import { SearchJobState } from "@/components/JobSearchForm"
import { authorizedJobInstance, handleAxiosError } from "@/lib/axios"
import { JobProps } from "@/types/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { logoutUser } from "../user/userSlice"

export const addJob = createAsyncThunk(
  "job/addJob",
  async (job: JobProps, thunkAPI) => {
    try {
      const response = await authorizedJobInstance.post("/jobs", job)
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

export const getJobs = createAsyncThunk(
  "job/getJobs",
  async (params: Partial<SearchJobState> | undefined, thunkAPI) => {
    if (params) {
      params = {
        ...params,
        page: params.page ? params.page : 1,
        sort: params.sort ? params.sort : "latest",
        jobType: params.jobType ? params.jobType : "all",
        status: params.status ? params.status : "all",
      }
    }

    console.log(params)

    try {
      const response = await authorizedJobInstance.get("/jobs", {
        params,
      })
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

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id: string, thunkAPI) => {
    try {
      const response = await authorizedJobInstance.delete(`/jobs/${id}`)
      return thunkAPI.fulfillWithValue({ data: response.data, id })
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

export const editJob = createAsyncThunk(
  "job/editJob",
  async (job: JobProps, thunkAPI) => {
    try {
      const response = await authorizedJobInstance.patch(
        `/jobs/${job._id}`,
        job
      )
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
