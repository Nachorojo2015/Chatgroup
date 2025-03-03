import PropTypes from "prop-types"
import { forwardRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { useChatStore } from "../store/chatStore"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const UnlockUserModal = forwardRef(({ avatar, username, socket, privateChatId }, ref) => {

  const [loader, setLoader] = useState(false)
  const setIdChat = useChatStore(state => state.setIdChat)

  async function unlockUser() {
    setLoader(true)
    const isDark = document.querySelector('html').className === 'dark'
    try {
      const response = await fetch(`${BACKEND_URL}/user/unlock/${username}`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        setLoader(false)
        ref.current.close()
        const errorMessage = await response.text()
        return toast.error(errorMessage, {
          theme: isDark ? 'dark' : 'light'
        })
      }

      setLoader(false)
      ref.current.close()
      const data = await response.json()
      toast.success(`${data.userUnlock} was unlocked`, {
        theme: isDark ? 'dark' : 'light'
      })

      socket.emit('update-user')
      setIdChat(privateChatId)
    } catch (error) {
      console.log(error)
      setLoader(false)
      ref.current.close()
      toast.error('Error in server', {
        theme: isDark ? 'dark' : 'light'
      })
    }
  }

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 dark:text-white p-3 rounded-md shadow-md xl:min-w-[450px]">
        <button onClick={() => ref.current.close()} size={22}>
        <FaArrowLeftLong />
      </button>

      <img src={avatar} alt="picture-group" className="w-36 h-36 rounded-full m-auto"/>
      <p className="text-center mt-3 font-bold">{username}</p>
      <h1 className="text-center">¿Block User?</h1>

      <button onClick={unlockUser} className="text-white mt-3 w-full bg-white-700 hover:opacity-50 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-black">{loader ? <ClipLoader size={20} color="white"/> : 'Unlock'}</button>
    </dialog>
  )
})

UnlockUserModal.displayName = 'UnlockUserModal'

UnlockUserModal.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    socket: PropTypes.object,
    privateChatId: PropTypes.string
}

export default UnlockUserModal