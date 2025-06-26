import { Link, useNavigate } from "react-router-dom"
import { RiChatSmile2Line } from "react-icons/ri"
import { FaEye } from "react-icons/fa"
import { LuEyeClosed } from "react-icons/lu"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import useLoginForm from "../hooks/useLoginForm"
import { login } from "../services/authService"
import ForgotPasswordModal from "./ForgotPasswordModal"

const Login = ({ BACKEND_URL }) => {
  const modalEmail = useRef();
  const { form, handleChange } = useLoginForm();
  const [viewPassword, setViewPassword] = useState(false);
  
  const navigate = useNavigate();

  const EyePasswordIcon = viewPassword ? FaEye : LuEyeClosed;

  async function sendDataLogin(e) {
    e.preventDefault();
    const { username, password } = form;

    const toastId = toast.loading('Login...');

    try {
      await login(username, password, BACKEND_URL);
      toast.update(toastId, {
        render: 'User login!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }

  

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100dvh]">
        <RiChatSmile2Line className="dark:text-white text-3xl" />
        <span className="font-bold text-3xl mb-5 dark:text-white">Chatgroup</span>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center relative">
                <input
                  type={viewPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleChange}
                  maxLength={30}
                />
                <EyePasswordIcon
                  className="absolute right-3 cursor-pointer dark:text-white"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              </div>
              <span className="text-sm block font-medium text-primary-600 cursor-pointer hover:underline dark:text-white" onClick={() => modalEmail.current.showModal()}>
                Forgot password?
              </span>
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
      <ForgotPasswordModal ref={modalEmail} BACKEND_URL={BACKEND_URL}/>
    </>
  );
};

Login.propTypes = {
  BACKEND_URL: PropTypes.string,
};

export default Login;