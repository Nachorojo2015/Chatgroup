import PropTypes from "prop-types"
import { forwardRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { useChatStore } from "../store/chatStore"

const BlockUserModal = forwardRef(({ avatar, username, socket, privateChatId, BACKEND_URL }, ref) => {

  const [loader, setLoader] = useState(false)
  const { setIdChat, id } = useChatStore()

  async function blockUser() {
    const isDark = document.querySelector('html').className === 'dark'
    setLoader(true)
    try {
      const response = await fetch(`${BACKEND_URL}/user/block/${username}`, {
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

      const data = await response.json()

      setLoader(false)
      ref.current.close()
      toast.success(`${data.userBlock} was blocked`, {
        theme: isDark ? 'dark' : 'light'
      })  
      socket.emit('update-user')
      setIdChat(privateChatId === id ? 'Block' : id)
    } catch (error) {
      console.log(error)
      setLoader(false)
      ref.current.close()
      toast.error('Error in server')
    }
  }

  return (
    <dialog ref={ref}  className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 dark:text-white p-3 rounded-md shadow-md xl:min-w-[450px]">
      <button onClick={() => ref.current.close()} size={22}>
        <FaArrowLeftLong />
      </button>

      <img src={avatar} alt="picture-group" className="w-36 h-36 rounded-full m-auto"/>
      <p className="text-center mt-3 font-bold whitespace-nowrap overflow-hidden text-ellipsis">{username}</p>
      <h1 className="text-center">¿Block User?</h1>

      <button onClick={blockUser} className="text-white mt-3 w-full bg-red-700 hover:bg-red-800 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600">{loader ? <ClipLoader size={20} color="white"/> : 'Block'}</button>
    </dialog>
  )
})

BlockUserModal.displayName = 'BlockUserModal'

BlockUserModal.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    socket: PropTypes.object,
    privateChatId: PropTypes.string,
    BACKEND_URL: PropTypes.string
}

export default BlockUserModal