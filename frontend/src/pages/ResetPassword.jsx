import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { BACKEND_URL } from "../config/variables";
import { showToast } from "../utils/showToast";
import { verifySecurePassword } from "../utils/verifySecurePassword";
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import { ClipLoader } from "react-spinners";
import { useShowPassword } from "../hooks/useShowPassword";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, startLoader, stopLoader } = useLoader();
  const { viewPassword, showPassword, hidePassword } = useShowPassword();
  const { newPassword, handleChange } = useResetPasswordForm();

  async function sendNewPassword() {
    if (newPassword.length === 0)
      return showToast("Password is empty", "error", 1000);

    const isSecure = verifySecurePassword(newPassword);

    if (!isSecure) return showToast("Password is not secure", "error", 1000);

    startLoader();

    try {
      await resetPassword(newPassword, BACKEND_URL);
      stopLoader();
      showToast("Password reset succesfull", "success", 1500);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      stopLoader();
      showToast(`Error in server, ${error.message}`, "error", 2000);
    }
  }

  return (
    <section className="h-screen grid place-content-center place-items-center">
      <dialog
        open
        className="flex flex-col items-center bg-slate-100 min-w-[350px] rounded-xl p-5"
      >
        <img src="/chat.svg" alt="brand-for-the-page" width={100} />
        <p className="text-2xl font-bold">Change your password</p>
        <div className="relative flex items-center w-full">
          <input
            onChange={handleChange}
            type={viewPassword ? "text" : "password"}
            disabled={isLoading}
            placeholder="Type your new password"
            maxLength={30}
            className="w-full mt-3 p-2.5 rounded-sm outline-none"
          />
          {viewPassword ? (
            <FaEye
              className="absolute right-3 top-[28px] cursor-pointer dark:text-white"
              onClick={hidePassword}
            />
          ) : (
            <LuEyeClosed
              className="absolute right-3 top-[28px] cursor-pointer dark:text-white"
              onClick={showPassword}
            />
          )}
        </div>
        <button
          onClick={sendNewPassword}
          disabled={isLoading}
          type="button"
          className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <ClipLoader
              color="white"
              cssOverride={{ width: "20px", height: "20px" }}
            />
          ) : (
            "Change Password"
          )}
        </button>
      </dialog>
    </section>
  );
};

export default ResetPassword;
