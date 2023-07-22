import { navLinks } from "@/constants"
import clsx from "clsx"
import { NavLink } from "react-router-dom"

function BottomSidebar() {
  return (
    <div>
      <nav className={styles.navClasses}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) => styles.navLinkClasses(isActive)}
          >
            <span className="block">{link.icon}</span>
            <span className="block">{link.text}</span>
          </NavLink>
        ))}
      </nav>
      {/* space holder */}
      <div className="flex flex-col items-center invisible px-2 py-4">
        <span className="block">{navLinks[0].icon}</span>
        <span className="block">{navLinks[0].text}</span>
      </div>
    </div>
  )
}

const styles = {
  navClasses:
    "fixed bottom-0 flex justify-between max-w-md mx-auto capitalize inset-x-0",
  navLinkClasses: (isActive: boolean) =>
    clsx(
      "flex flex-row items-center justify-center gap-1 py-3 grow bg-primary-500 text-white",
      isActive && "bg-primary-600"
    ),
}

export default BottomSidebar
