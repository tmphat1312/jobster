import {
  AiOutlineAreaChart,
  AiOutlineFileSearch,
  AiOutlineFileAdd,
  AiOutlineProfile,
} from "react-icons/ai"

export const navLinks: {
  path: string
  text: string
  icon: JSX.Element
}[] = [
  { path: "", text: "stats", icon: <AiOutlineAreaChart /> },
  { path: "all-jobs", text: "all jobs", icon: <AiOutlineFileSearch /> },
  { path: "add-job", text: "add job", icon: <AiOutlineFileAdd /> },
  { path: "profile", text: "profile", icon: <AiOutlineProfile /> },
]

export const USER_LOCAL_STORAGE_KEY = "user_jobster_token"
export const API_URL = "https://jobify-prod.herokuapp.com/api/v1/toolkit"
