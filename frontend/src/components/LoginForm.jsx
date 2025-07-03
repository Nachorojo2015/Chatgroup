import { Link, useNavigate } from "react-router-dom";
import useLoginForm from "../hooks/useLoginForm";
import useLoader from "../hooks/useLoader";
import { forwardRef } from "react";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { login } from "../services/authService";
import { showToast } from "../utils/showToast";
import { ClipLoader } from "react-spinners";
import { useShowPassword } from "../hooks/useShowPassword";

const LoginForm = forwardRef(({ BACKEND_URL }, ref) => {
  const navigate = useNavigate();
  const { form, handleChange } = useLoginForm();
  const { isLoading, startLoader, stopLoader } = useLoader();
  const { viewPassword, showPassword, hidePassword } = useShowPassword();

  function showEmailModal() {
    ref.current.showModal();
  }

  async function sendDataLogin(e) {
    e.preventDefault();
    const { username, password } = form;

    startLoader();

    try {
      await login(username, password, BACKEND_URL);
      stopLoader();
      showToast("User login!", "success", 2000);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      stopLoader();
      showToast(error.message, "error", 2000);
    }
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={sendDataLogin}>
      <div>
        <input
          name="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="Username"
          required
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center relative">
        <input
          type={viewPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
          onChange={handleChange}
          maxLength={30}
        />
        {viewPassword ? (
          <FaEye
            className="absolute right-3 cursor-pointer"
            onClick={hidePassword}
          />
        ) : (
          <LuEyeClosed
            className="absolute right-3 cursor-pointer"
            onClick={showPassword}
          />
        )}
      </div>
      <span
        className="text-sm block font-medium text-primary-600 cursor-pointer hover:underline"
        onClick={showEmailModal}
      >
        Forgot password?
      </span>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white bg-blue-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {isLoading ? (
          <ClipLoader
            color="white"
            cssOverride={{ width: "20px", height: "20px" }}
          />
        ) : (
          "Sign In"
        )}
      </button>
      <p className="text-sm font-light text-gray-500">
        Don’t have an account yet?{" "}
        <Link
          to={"/register"}
          className="font-medium text-primary-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
});

LoginForm.displayName = "Login form";

export default LoginForm;
