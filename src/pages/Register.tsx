import Logo from "@/components/Logo"
import { loginUser, registerUser } from "@/features/user/userThunk"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface FormValues {
  name: string
  email: string
  password: string
  hasAccount: boolean
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  hasAccount: true,
}

function Register() {
  const [values, setValues] = useState(initialValues)
  const { status, user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function toggleHasAccount() {
    setValues((prevValues) => ({
      ...prevValues,
      hasAccount: !prevValues.hasAccount,
    }))
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (values.hasAccount) {
      dispatch(loginUser({ email: values.email, password: values.password }))
      return
    }

    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard", {
        replace: true,
      })
    }
  }, [user])

  return (
    <div className="grid min-h-screen place-content-center">
      <div className={styles.formContainerClasses}>
        <header className={styles.formHeaderClasses}>
          <Logo />
          <h1 className={styles.formTitleClasses}>
            {values.hasAccount ? "login" : "register"}
          </h1>
        </header>
        <form
          className="space-y-8 text-xl"
          action="/dashboard"
          onSubmit={handleSubmit}
        >
          {!values.hasAccount && (
            <label className={styles.labelClasses} htmlFor="name">
              <span>name</span>
              <input
                className={styles.inputClasses}
                type="text"
                name="name"
                id="name"
                required
                minLength={3}
                value={values.name}
                onChange={handleChange}
                autoComplete="username"
                autoFocus={!values.hasAccount}
              />
            </label>
          )}
          <label className={styles.labelClasses} htmlFor="email">
            <span>email</span>
            <input
              className={styles.inputClasses}
              type="email"
              name="email"
              id="email"
              required
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus={values.hasAccount}
            />
          </label>
          <label className={styles.labelClasses} htmlFor="password">
            <span>password</span>
            <input
              className={styles.inputClasses}
              type="password"
              name="password"
              id="password"
              minLength={6}
              maxLength={20}
              required
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="button button--primary button--block"
            disabled={status == "pending"}
          >
            {status == "pending" ? "submitting..." : "submit"}
          </button>
          <button
            type="submit"
            className="button button--primary button--block"
            disabled={status == "pending"}
            onClick={() =>
              dispatch(
                loginUser({ email: "testUser@test.com", password: "secret" })
              )
            }
          >
            {status == "pending" ? "Directing..." : "Live demo"}
          </button>
          <p className="text-center">
            {values.hasAccount
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={toggleHasAccount}
              type="button"
              className="capitalize text-primary-500 hover:text-primary-600"
            >
              {values.hasAccount ? "register" : "login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

/* styles */

const styles = {
  formContainerClasses:
    "px-8 py-16 overflow-hidden bg-white rounded-lg top-line drop-shadow-md w-[90vw] max-w-[450px] line--primary",
  formHeaderClasses: "flex flex-col items-center justify-center gap-8 mb-8",
  formTitleClasses:
    "text-4xl font-semibold tracking-widest drop-shadow-md capitalize",
  labelClasses: "block space-y-2 capitalize",
  inputClasses:
    "border-2 rounded-sm bg-slate-100 focus-visible:bg-slate-50 w-full px-2 py-1",
}
export default Register
