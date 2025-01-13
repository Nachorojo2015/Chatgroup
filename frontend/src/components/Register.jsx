import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

  const [form, setForm] = useState({
    email: '',
    fullname: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function sendDataRegister(e) {
    e.preventDefault()

    const { email, fullname, username, password, confirmPassword } = form

    if (password !== confirmPassword) return toast.error('The passwords dont match')

    if (!securePassword) return toast.error('Password is not secure')

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, fullname, username, password })
      })
  
      if (!response.ok) {
        const errorMessage = await response.text()
        return toast.error(`error to register user ${errorMessage}`)
      }
  
      const data = await response.json()
      console.log(data)
  
      toast.success('user register 👌')
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    } catch (error) {
      console.log(error.message)
      toast.error('error to register user, try again')
    }
    
  }

  const [securePassword, setSecurePassword] = useState(false)

  function verifyPassword(e) {
    handleChange(e)

    const passwordValue = e.target.value

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // Regex que valida la seguridad de la contraseña

    const isSecure = regex.test(passwordValue);

    setSecurePassword(isSecure)
  }

  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

  const EyePasswordIcon = viewPassword ? FaEye : LuEyeClosed
  const EyeConfirmPasswordIcon = viewConfirmPassword ? FaEye : LuEyeClosed

  return (
    <div className="flex flex-col items-center justify-center px-6 py-3 h-screen">
      <ToastContainer />
      <div className="w-full rounded-lg shadow-md sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Sign Up
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={sendDataRegister}>
            <div>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email Adress"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="fullname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Fullname"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center relative">
              <input
                type={viewPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${securePassword ? 'outline-green-400 border-green-300 dark:border-green-300' : 'outline-red-400'}`}
                required={true}
                onChange={verifyPassword}
                maxLength={30}
              />
              <EyePasswordIcon className="absolute right-3 cursor-pointer dark:text-white" onClick={() => setViewPassword(!viewPassword)}/>
            </div>
            <div className="flex items-center relative">
              <input
                type={viewConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
                maxLength={30}
                onChange={handleChange}
              />
              <EyeConfirmPasswordIcon className="absolute right-3 cursor-pointer dark:text-white" onClick={() => setViewConfirmPassword(!viewConfirmPassword)}/>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-black"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
