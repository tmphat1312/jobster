import Logo from "@/components/Logo"
import { useAppSelector } from "@/hooks"
import hero from "@images/hero-female.svg"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function Landing() {
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard", {
        replace: true,
      })
    }
  }, [])

  return (
    <div className="app-container">
      <header className="py-6">
        <Logo />
      </header>
      <main className="grid items-center grid-cols-1 gap-16 py-40 sm:grid-cols-2">
        <section className="space-y-6">
          <h1 className="text-5xl font-bold capitalize drop-shadow-sm">
            job <span className="underline text-primary-600">tracking</span> app
          </h1>
          <p className="leading-relaxed tracking-wide">
            Jobster is the comprehensive job tracking app that helps job seekers
            stays organized and focused on their job search. Our app enables you
            to track all your applications in one place, so you never miss a
            deadline or opportunity. Let Jobster help you find your dream job
            today!
          </p>
          <Link to="/register" className="inline-block button button--primary">
            login / register
          </Link>
        </section>
        <img
          src={hero}
          alt="A woman finding job online with Jobster app"
          className="hidden sm:block"
        />
      </main>
    </div>
  )
}

export default Landing
