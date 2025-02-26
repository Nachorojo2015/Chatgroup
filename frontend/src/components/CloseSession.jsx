import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CloseSession = () => {
  const navigate = useNavigate()

  async function closeSession() {
    const isDark = document.querySelector('html').className === 'dark'
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
            return toast.error(errorMessage, {
              theme: isDark ? 'dark' : 'light'
            })
        }
        
        const successMessage = await response.text()
        
        toast.success(successMessage, {
          theme: isDark ? 'dark' : 'light'
        })

        setTimeout(() => {
           navigate('/login')
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