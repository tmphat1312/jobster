import { logoutUser } from "@/features/user/userSlice"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useState } from "react"
import { BiSolidDownArrow, BiSolidUserCircle } from "react-icons/bi"
import LoadingSpinner from "./LoadingSpinner"

function UserButton() {
  const { user } = useAppSelector((state) => state.user)
  const [showTooltip, setShowTooltip] = useState(false)
  const dispatch = useAppDispatch()

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <section className={styles.containerClasses}>
      <button
        className={styles.buttonClasses}
        onClick={() => setShowTooltip((prev) => !prev)}
      >
        <span className="text-2xl">
          <BiSolidUserCircle />
        </span>
        <span className="inline-block truncate max-w-[12ch]">{user.name}</span>
        <span className={`${showTooltip && "rotate-180"}`}>
          <BiSolidDownArrow />
        </span>
      </button>
      <div className={styles.tooltipClasses} hidden={!showTooltip}>
        <button
          className={styles.logoutButtonClasses}
          onClick={() => dispatch(logoutUser())}
        >
          logout
        </button>
      </div>
    </section>
  )
}

const styles = {
  containerClasses:
    "relative text-white rounded-md bg-primary-500 drop-shadow-md hover:bg-primary-600",
  buttonClasses: "flex items-center gap-2 px-4 py-2",
  tooltipClasses:
    "absolute inset-x-0 top-[120%] tooltip bg-primary-200  rounded-md hover:bg-primary-300",
  logoutButtonClasses:
    "w-full px-4 py-3 font-medium text-center capitalize text-primary-700",
}

export default UserButton
