import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom"
import notFoundImage from "@images/not-found.svg"

interface RouteError {
  status: number
  statusText: string
}

function Error() {
  const error = useRouteError()
  let message = "An error occurred"
  let subMessage = "Please try again later"

  if (isRouteErrorResponse(error)) {
    const { status, statusText } = error as RouteError
    switch (status) {
      case 404:
        message = "Ohh!!! Page not found"
        subMessage = "We can't seem to find the page you're looking for"
        break
      case 401:
        message = "You are not authorized to view this page"
        subMessage = "Please give your credentials to view this page (login)"
        break
      case 503:
        message = "Look like our server is down right now"
        break
      default:
        message = `${status} ${statusText}`
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2 text-center">
      <img src={notFoundImage} alt="Page not found" className="w-3/5 mx-auto" />
      <h1 className="text-3xl leading-loose">{message}</h1>
      <p className="text-gray-500">{subMessage}</p>
      <Link
        to="/"
        className="text-lg underline capitalize inline-size text-primary-500 underline-offset-2 hover:text-primary-600 hover:drop-shadow-sm"
      >
        back home
      </Link>
    </main>
  )
}

export default Error
