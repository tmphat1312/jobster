import { navLinks } from "@/constants"
import { useAppSelector } from "@/hooks"
import clsx from "clsx"
import { useState } from "react"
import { FaRegHandPeace } from "react-icons/fa"
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb"
import { NavLink } from "react-router-dom"

function Sidebar() {
  const { user } = useAppSelector((state) => state.user)
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <div className={clsx("py-2 sticky top-0", !isMinimized && "open")}>
      <div className="flex justify-end px-2">
        <button
          className="text-3xl hover:text-black"
          onClick={() => setIsMinimized((prev) => !prev)}
        >
          <span className={clsx("inline-block", isMinimized && "rotate-180")}>
            <TbLayoutSidebarLeftCollapse />
          </span>
        </button>
      </div>
      <header
        className={clsx("space-y-2 transition-all", isMinimized && "invisible")}
      >
        <div className="flex justify-center text-3xl text-yellow-500">
          <FaRegHandPeace />
        </div>
        <h4 className="text-lg text-center truncate">
          Hello,
          <span className="font-bold text-primary-500"> {user?.name}</span>
        </h4>
      </header>
      <nav className="py-8 text-lg font-medium capitalize">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              clsx(
                navStyles,
                isActive && "text-primary-700",
                isMinimized && "justify-center"
              )
            }
            end
          >
            <span className={clsx("text-2xl", !isMinimized && "ml-4")}>
              {link.icon}
            </span>
            <span className={clsx(isMinimized && "hidden")}>{link.text}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

const navStyles =
  "flex items-center gap-2 px-2 py-4 hover:bg-primary-100 hover:text-slate-900 truncate transition-all"

export default Sidebar
