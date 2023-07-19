import { useAppDispatch, useAppSelector } from "@/hooks"
import LoadingSpinner from "./LoadingSpinner"
import { BiSolidUserCircle, BiSolidDownArrow } from "react-icons/bi"
import { useState } from "react"
import { logoutUser } from "@/features/user/userSlice"

function UserButton() {
  const { user } = useAppSelector((state) => state.user)
  const [showTooltip, setShowTooltip] = useState(false)
  const dispatch = useAppDispatch()

  function toggleTooltip() {
    setShowTooltip((prev) => !prev)
  }

  if (!user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <section className="relative text-white rounded-md bg-primary-500 drop-shadow-md hover:bg-primary-600">
      <button
        className="flex items-center gap-2 px-4 py-2"
        onClick={toggleTooltip}
      >
        <span className="text-2xl">
          <BiSolidUserCircle />
        </span>
        <span>{user.name}</span>
        <span className={`${showTooltip && "rotate-180"}`}>
          <BiSolidDownArrow />
        </span>
      </button>
      <div
        className="absolute inset-x-0 top-[120%] tooltip bg-primary-200  rounded-md hover:bg-primary-300"
        hidden={!showTooltip}
      >
        <button
          className="w-full px-4 py-3 font-medium text-center capitalize text-primary-700"
          onClick={() => dispatch(logoutUser())}
        >
          logout
        </button>
      </div>
    </section>
  )
}

export default UserButton
