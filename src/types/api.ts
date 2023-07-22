export interface JobProps {
  position: string
  company: string
  jobLocation: string
  status: "pending" | "interview" | "declined"
  jobType: "full-time" | "part-time" | "remote" | "internship"
  createdAt?: string
  _id?: string
}

export interface StatsProps {
  defaultStats: {
    pending: number
    interview: number
    declined: number
  }
  monthlyApplications: Array<{
    date: string
    count: number
  }>
}

export interface UserProps {
  name: string
  email: string
  lastName: string
  location: string
  token: string
}
