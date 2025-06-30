import { Link, useNavigate } from "react-router-dom";
import useRegisterForm from "../hooks/useRegisterForm";
import register from "../services/registerService";
import { BACKEND_URL } from "../config/variables";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import useLoader from "../hooks/useLoader";
import { showToast } from "../utils/showToast";
import { ClipLoader } from "react-spinners";
import { useShowPassword } from "../hooks/useShowPassword";
import { verifySecurePassword } from "../utils/verifySecurePassword";

const RegisterForm = () => {
  const { form, handleChange } = useRegisterForm();
  const { isLoading, startLoader, stopLoader } = useLoader();
  const { viewPassword, showPassword, hidePassword } = useShowPassword();

  const navigate = useNavigate();

  const sendDataRegister = async (e) => {
    e.preventDefault();

    const { email, fullname, username, password, confirmPassword } = form;

    const isSecure = verifySecurePassword(password);

    if (!isSecure)
      return showToast(
        "The password must contain lowercase, uppercase, numbers and special characters",
        "error",
        2500
      );

    if (password !== confirmPassword)
      return showToast("The passwords dont match", "error", 1000);

    startLoader();

    try {
      await register(email, fullname, username, password, BACKEND_URL);
      stopLoader();
      showToast("User registered!", "success", 2000);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      stopLoader();
      showToast(`Error in server, ${error.message}`, "error", 2000);
    }
  }

  return (
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
          maxLength={50}
        />
      </div>
      <div>
        <input
          name="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          required={true}
          onChange={handleChange}
          max={50}
        />
      </div>
      <div className="flex items-center relative">
        <input
          type={viewPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required={true}
          onChange={handleChange}
          maxLength={30}
        />
        {viewPassword ? (
          <FaEye
            className="absolute right-3 cursor-pointer dark:text-white"
            onClick={hidePassword}
          />
        ) : (
          <LuEyeClosed
            className="absolute right-3 cursor-pointer dark:text-white"
            onClick={showPassword}
          />
        )}
      </div>
      <div className="flex items-center relative">
        <input
          name="confirmPassword"
          placeholder="Confirm password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={true}
          maxLength={30}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-black"
      >
        {isLoading ? (
          <ClipLoader
            color="white"
            cssOverride={{ width: "20px", height: "20px" }}
          />
        ) : (
          "Sign Up"
        )}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?
        <Link
          to={"/login"}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
