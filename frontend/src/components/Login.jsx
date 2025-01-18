import { Link, useNavigate } from "react-router-dom"
import { RiChatSmile2Line } from "react-icons/ri"
import { FaEye } from "react-icons/fa"
import { LuEyeClosed } from "react-icons/lu"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { IoMdClose } from "react-icons/io";
import ClipLoader from 'react-spinners/ClipLoader'

const Login = () => {
  const modalEmail = useRef()

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const navigate = useNavigate()

  async function sendDataLogin(e) {
    e.preventDefault()
    
    const { username, password } = form

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return toast.error(`error to register user, ${errorMessage}`)
      }

      const data = await response.json()
      console.log(data)

      toast.success("user login 👍")
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      console.log(error.message)
      toast.error("error in the server, try again")
    }
  }

  async function sendMailForgotPassword() {
    const { email } = form

    if (email.length === 0) return
    
    setLoading(true) // Activa el estado que marca la carga

    try {
      const response = await fetch('http://localhost:3000/auth/email/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return toast.error(`error sending email. ${errorMessage}`)
      }

      toast.success('We sent an email to you')
    } catch (error) {
      console.log(error.message)
      toast.error('error in the server, try again')
    }

    setLoading(false)
    modalEmail.current.close()
  }

  const [viewPassword, setViewPassword] = useState(false)

  const EyePasswordIcon = viewPassword ? FaEye : LuEyeClosed

  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <RiChatSmile2Line className="dark:text-white text-3xl" />
        <span className="font-bold text-3xl mb-5 dark:text-white">
          Chatgroup
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={sendDataLogin}>
              <div>
                <input
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center relative">
                <input
                  type={viewPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleChange}
                  maxLength={30}
                />
                <EyePasswordIcon
                  className="absolute right-3 cursor-pointer dark:text-white"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary-600 cursor-pointer hover:underline dark:text-white" onClick={() => {modalEmail.current.showModal()}}>
                  Forgot password?
                </span>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-black dark:hover:bg-opacity-50"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* Modal para enviar email */}
      <dialog ref={modalEmail} className="p-3 rounded-md min-w-[250px] shadow-md backdrop:bg-[rgba(0,0,0,.60)]">
        {loading ? <ClipLoader cssOverride={{marginLeft: 'auto', display: 'block'}} size={20}/> : <IoMdClose className="ml-auto cursor-pointer" size={20} onClick={() => modalEmail.current.close()}/>}
        <input onChange={handleChange} type="email" name="email" className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your mail"></input>
        <button onClick={sendMailForgotPassword} type="button" className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
      </dialog>
    </>
  )
}

export default Login
