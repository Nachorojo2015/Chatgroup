import { forwardRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { ClipLoader } from "react-spinners"
import { sendForgotPasswordEmail } from "../services/authService";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import useLoginForm from "../hooks/useLoginForm";

const ForgotPasswordModal = forwardRef(({ BACKEND_URL }, ref) => {

    const [loading, setLoading] = useState(false);
    const { form, handleChange } = useLoginForm();

   async function sendMailForgotPassword() {
       const { email } = form;
   
       if (email.length === 0) return;
   
       setLoading(true);
   
       try {
         await sendForgotPasswordEmail(email, BACKEND_URL);
         toast.success('We sent an email to you');
       } catch (error) {
         toast.error(`Error: ${error.message}`);
       }
   
       setLoading(false);
       ref.current.close();

       form.email = ''
     }

  return (
    <dialog ref={ref} className="p-3 rounded-md min-w-[250px] shadow-md backdrop:bg-[rgba(0,0,0,.60)]">
        {loading ? (
          <ClipLoader cssOverride={{ marginLeft: 'auto', display: 'block' }} size={20} />
        ) : (
          <IoMdClose className="ml-auto cursor-pointer" size={20} onClick={() => ref.current.close()} />
        )}
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your mail"
        />
        <button onClick={sendMailForgotPassword} type="button" className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Send
        </button>
    </dialog>
  )
})

ForgotPasswordModal.displayName = 'Forgot Password Modal'

ForgotPasswordModal.propTypes = {
    BACKEND_URL: PropTypes.string
}

export default ForgotPasswordModal