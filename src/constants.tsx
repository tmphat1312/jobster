import {
  AiOutlineAreaChart,
  AiOutlineFileSearch,
  AiOutlineFileAdd,
  AiOutlineProfile,
} from "react-icons/ai"

export interface NavLink {
  path: string
  text: string
  icon: JSX.Element
}

export const navLinks: NavLink[] = [
  { path: "", text: "stats", icon: <AiOutlineAreaChart /> },
  { path: "all-jobs", text: "all jobs", icon: <AiOutlineFileSearch /> },
  { path: "add-job", text: "add job", icon: <AiOutlineFileAdd /> },
  { path: "profile", text: "profile", icon: <AiOutlineProfile /> },
]
