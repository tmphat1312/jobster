import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoadingSpinner from "./components/LoadingSpinner"
import AddJob from "./pages/dashboard/AddJob"
import AllJobs from "./pages/dashboard/AllJobs"
import Dashboard from "./pages/dashboard/Dashboard"
import Profile from "./pages/dashboard/Profile"
import Stats from "./pages/dashboard/Stats"
import Error from "./pages/Error"
import Landing from "./pages/Landing"
import ProtectedPage from "./pages/ProtectedPage"
import Register from "./pages/Register"
import { store } from "./store"

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
        element: (
          <ProtectedPage>
            <Dashboard />
          </ProtectedPage>
        ),
        children: [
          {
            index: true,
            element: <Stats />,
          },
          {
            path: "add-job",
            element: <AddJob />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
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
    <div>
      <Provider store={store}>
        <RouterProvider router={routes} fallbackElement={<LoadingSpinner />} />
        <Toaster />
      </Provider>
    </div>
  )
}

export default App
