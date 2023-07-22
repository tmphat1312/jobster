import { useAppSelector } from "@/hooks"
import { Navigate } from "react-router-dom"

function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.user)

  return user ? <>{children}</> : <Navigate to="/" />
}

export default ProtectedPage
