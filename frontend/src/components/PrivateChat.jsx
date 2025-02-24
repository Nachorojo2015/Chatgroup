import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "react-toastify";
import { useChatStore } from "../store/chatStore";
import PropTypes from "prop-types";

const PrivateChat = ({ privateChat }) => {

  const { setIsChatMobileOpen, setData, unSeen, setUnSeen, setLoader } = useChatStore()

  const isUnSeen = unSeen.includes(privateChat._id)

  async function openChat() {
    setLoader(false)
    setUnSeen(unSeen.filter(chatId => chatId !== privateChat._id))
    try {
      const response = await fetch(`http://localhost:3000/messages/${privateChat._id}`)
  
      if (!response.ok) {
        const errorMessage = await response.text()
        return toast.error(errorMessage)
      }
  
      const data = await response.json()

      setData(
        privateChat.user.avatar,
        privateChat.user.fullname,
        privateChat._id,
        data.messages
      )

      setIsChatMobileOpen(true)
    } catch (error) {
      console.error(error)
    }
}
  return (
    <article className="flex items-center w-full gap-3 transition cursor-pointer hover:bg-slate-200 dark:hover:bg-opacity-20 p-3">
                    <img
                    src={privateChat.user.avatar}
                    alt="avatar user"
                    className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                    <span className="dark:text-white font-bold transition hover:underline" onClick={openChat}>{privateChat.user.fullname}</span>
                    <span className="text-sm dark:text-white">
                        {privateChat.user.username}
                    </span>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                     {isUnSeen ? <span className="ml-auto bg-blue-400 rounded-full p-1"></span> : ''}
                     <button>
                        <SlOptionsVertical className="dark:text-white"/>
                      </button>
                    </div>
    </article>
  )
}

PrivateChat.propTypes = {
  privateChat: PropTypes.object
}

export default PrivateChat