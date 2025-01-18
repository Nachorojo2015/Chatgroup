import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";

const CloseSession = () => {

  async function closeSession() {
    try {
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (!response.ok) {
            const errorMessage = await response.text()
            return alert(errorMessage)
        }
        
        const successMessage = await response.text()
        
        toast.success(successMessage)

        setTimeout(() => {
            window.location.href = '/login'
        }, 2500)
    } catch (error) {
        alert(error.message)
    }
  }

  return (
    <CiLogout className="cursor-pointer dark:text-white" size={20} onClick={closeSession}/>
  )
}

export default CloseSession