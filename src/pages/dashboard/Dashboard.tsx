import BottomSidebar from "@/components/BottomSideBar"
import Logo from "@/components/Logo"
import Sidebar from "@/components/Sidebar"
import UserButton from "@/components/UserButton"
import { Outlet } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="mb-4 dashboard md:grid">
      <div>
        <header className="px-4 py-8 bg-white md:px-16 header">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <Logo />
            <h1 className="hidden text-4xl font-medium tracking-widest drop-shadow-md md:block">
              Dashboard
            </h1>
            <UserButton />
          </div>
        </header>
        <main className="mx-4 rounded-md md:mx-0 main">
          <Outlet />
        </main>
        <footer>
          <div className="md:hidden">
            <BottomSidebar />
          </div>
          footer
        </footer>
      </div>
      <aside className="hidden sidebar md:block">
        <Sidebar />
      </aside>
    </div>
  )
}

export default Dashboard
