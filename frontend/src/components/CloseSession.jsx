import PropTypes from "prop-types";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CloseSession = ({ BACKEND_URL }) => {
  const navigate = useNavigate()

  async function closeSession() {
    const isDark = document.querySelector('html').className === 'dark'
    try {
        const response = await fetch(`${BACKEND_URL}/auth/logout`, {
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

CloseSession.propTypes = {
  BACKEND_URL: PropTypes.string
}

export default CloseSession