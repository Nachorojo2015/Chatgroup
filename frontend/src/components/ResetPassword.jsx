import { useRef, useState } from "react"
import { FaEye } from "react-icons/fa"
import { LuEyeClosed } from "react-icons/lu"
import { toast, ToastContainer } from "react-toastify"

const ResetPassword = () => {

  const newPasswordRef = useRef()

  async function sendNewPassword() {
    const newPassword = newPasswordRef.current.value

    if (newPassword.length === 0) return toast.error('password is empty')

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // Regex que valida la seguridad de la contraseña

    const isSecure = regex.test(newPassword)

    if (!isSecure) return toast.error('password is not secure')

    try {
      const response = await fetch('http://localhost:3000/auth/email/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword }),
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        toast.error(`error reset password. ${errorMessage}`)
      }

      toast.success('Password reset succesfull')
      setTimeout(() => {
        window.location = '/login'
      }, 3000)
    } catch (error) {
      console.log(error.message)
      toast.error('error in server, try again')
    }
  }

  const [viewPassword, setViewPassword] = useState(false)

  const EyePasswordIcon = viewPassword ? FaEye : LuEyeClosed

  return (
    <section className="h-screen grid place-content-center place-items-center">
    <ToastContainer />
    <dialog open className="flex flex-col items-center bg-slate-100 min-w-[350px] rounded-xl p-5">
        <img src="/chat.svg" alt="brand-for-the-page" width={100}/>
        <p className="text-2xl font-bold">Change your password</p>
        <div className="relative flex items-center w-full">
          <input ref={newPasswordRef} type={viewPassword ? "text" : "password"} placeholder="Type your new password" maxLength={30} className="w-full mt-3 p-2.5 rounded-sm shadow-md border-t outline-none"/>
          <EyePasswordIcon className="absolute right-3 top-[28px] cursor-pointer dark:text-white" onClick={() => setViewPassword(!viewPassword)}/>
        </div>
        <button onClick={sendNewPassword} type="button" className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change password</button>
    </dialog>
    </section>
    
  )
}

export default ResetPassword