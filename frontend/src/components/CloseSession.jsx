import PropTypes from "prop-types";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { showToast } from "../utils/showToast";

const CloseSession = ({ BACKEND_URL }) => {
  const navigate = useNavigate()

  async function closeSession() {
    const theme = document.querySelector('html').className
    try {
        await logout(BACKEND_URL)
        showToast('Logout successfull!', 'success', 1500, theme)

        setTimeout(() => {
           navigate('/login')
        }, 2000)
    } catch (error) {
        showToast(error.message, 'error', 1500, theme)
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-lg cursor-pointer transition hover:bg-[rgba(0,0,0,0.08)] p-2 text-red-500" onClick={closeSession}>
      <CiLogout size={20}/>
      <span className="text-sm font-semibold">Close session</span>
    </div>
  )
}

CloseSession.propTypes = {
  BACKEND_URL: PropTypes.string
}

export default CloseSession