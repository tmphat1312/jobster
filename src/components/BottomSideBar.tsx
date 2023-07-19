import { NavLink } from "react-router-dom"
import { navLinks } from "@/constants"
import clsx from "clsx"

function BottomSidebar() {
  return (
    <div>
      <nav className="fixed bottom-0 flex justify-between max-w-md gap-1 mx-auto overflow-hidden capitalize inset-x-1 rounded-t-xl">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center px-2 py-4 grow bg-primary-500 text-white",
                isActive && "bg-primary-300 text-primary-900"
              )
            }
          >
            <span className="block">{link.icon}</span>
            <span className="block">{link.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="flex flex-col items-center invisible px-2 py-4">
        <span className="block">{navLinks[0].icon}</span>
        <span className="block">{navLinks[0].text}</span>
      </div>
    </div>
  )
}

export default BottomSidebar
