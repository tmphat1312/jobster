import BottomSidebar from "@/components/BottomSideBar"
import Logo from "@/components/Logo"
import Sidebar from "@/components/Sidebar"
import UserButton from "@/components/UserButton"
import { Outlet } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard md:grid">
      <div className="flex flex-col min-h-screen">
        <header className="px-4 py-8 bg-white md:px-16 header">
          <div className="flex items-center justify-between gap-4 mx-auto max-w-7xl">
            <div>
              <Logo />
            </div>
            <h1 className="hidden text-4xl font-medium tracking-widest drop-shadow-md md:block">
              Dashboard
            </h1>
            <UserButton />
          </div>
        </header>
        <main className="mx-6 my-10 md:mx-16 main">
          <Outlet />
        </main>
        <footer className="md:hidden footer">
          <BottomSidebar />
        </footer>
      </div>
      <aside className="hidden sidebar md:block">
        <Sidebar />
      </aside>
    </div>
  )
}

export default Dashboard
