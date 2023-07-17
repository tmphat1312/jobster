import Logo from "@/components/Logo"
import hero from "@images/hero-female.svg"

function Landing() {
  return (
    <>
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
          <button className="button button--primary">login / register</button>
        </section>
        <img
          src={hero}
          alt="A woman finding job online with Jobster app"
          className="hidden sm:block"
        />
      </main>
    </>
  )
}

export default Landing
