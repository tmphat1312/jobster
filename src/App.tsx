import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./pages/Landing"
import Error from "./pages/Error"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import LoadingSpinner from "./components/LoadingSpinner"
import { Toaster } from "react-hot-toast"

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
])

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} fallbackElement={<LoadingSpinner />} />
      <Toaster />
    </div>
  )
}

export default App
