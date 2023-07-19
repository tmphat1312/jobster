import { useAppSelector } from "@/hooks"
import { Navigate } from "react-router-dom"

function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.user)

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedPage
