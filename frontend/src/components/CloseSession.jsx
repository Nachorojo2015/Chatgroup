import { CiLogout } from "react-icons/ci";

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
        
        alert(successMessage)

        setTimeout(() => {
            window.location.href = '/login'
        })
    } catch (error) {
        alert(error.message)
    }
  }

  return (
    <CiLogout className="cursor-pointer" size={20} onClick={closeSession}/>
  )
}

export default CloseSession