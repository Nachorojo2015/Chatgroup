import { RiChatSmile2Line } from "react-icons/ri";
import { useRef } from "react";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { BACKEND_URL } from "../config/variables";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const modalEmail = useRef();

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100dvh]">
        <RiChatSmile2Line className="dark:text-white text-3xl" />
        <span className="font-bold text-3xl mb-5 dark:text-white">
          Chatgroup
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <LoginForm BACKEND_URL={BACKEND_URL} ref={modalEmail}/>
          </div>
        </div>
      </div>

      {/* Modal para enviar email */}
      <ForgotPasswordModal ref={modalEmail} BACKEND_URL={BACKEND_URL} />
    </>
  );
};

export default Login;
