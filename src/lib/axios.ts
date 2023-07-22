import { API_URL, USER_LOCAL_STORAGE_KEY } from "@/constants"
import { UserProps } from "@/types/api"
import axios, { AxiosError } from "axios"
import { getLocalStorage } from "./localstorage"

const baseURL = API_URL

export function handleAxiosError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error(error.response)
    } else if (error.request) {
      console.error(error.request)
    } else {
      console.error("Axios Error", error.message)
    }

    return { message: error.response?.data, status: error.response?.status }
  }

  if (error instanceof Error) {
    console.error(`${error.name}`, error.message)
    return { message: error.message }
  }

  console.error("Unknown Error: ", error)
  return { message: "Unknown Error happened" }
}

export const jobInstance = axios.create({
  baseURL,
})

export const authorizedJobInstance = axios.create({
  baseURL,
})

authorizedJobInstance.interceptors.request.use((config) => {
  const user = getLocalStorage(USER_LOCAL_STORAGE_KEY) as UserProps
  config.headers["Authorization"] = `Bearer ${user?.token}`
  return config
})
