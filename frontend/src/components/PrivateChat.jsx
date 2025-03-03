import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "react-toastify";
import { useChatStore } from "../store/chatStore";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import BlockUserButton from "./BlockUserButton";
import { useUserStore } from "../store/userStore";
import UnlockUserButton from "./UnlockUserButton";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const PrivateChat = ({ privateChat, fetchUserData, socket }) => {

  const { setIsChatMobileOpen, setData, unSeen, setUnSeen, setLoader} = useChatStore()
  const { blockedUsers, userId } = useUserStore()

  const isMyUserBlocked = privateChat.user.blockedUsers.includes(userId)
  const isBlocked = blockedUsers.includes(privateChat.user._id)

  const [openMenu, setOpenMenu] = useState(false)

  const isUnSeen = unSeen.includes(privateChat._id)

  const pictureUserModal = useRef()

  async function openChat() {
    setOpenMenu(false)
    setLoader(true)
    setUnSeen(unSeen.filter(chatId => chatId !== privateChat._id))
    try {
      const response = await fetch(`${BACKEND_URL}/messages/${privateChat._id}`)
  
      if (!response.ok) {
        setLoader(false)
        const errorMessage = await response.text()
        return toast.error(errorMessage)
      }
  
      const data = await response.json()

      setData(
        privateChat.user.avatar,
        privateChat.user.fullname,
        isBlocked || isMyUserBlocked ? 'Block' : privateChat._id,
        data.messages
      )

      setLoader(false)
      setIsChatMobileOpen(true)
    } catch (error) {
      console.error(error)
      setLoader(false)
    }
  } 

  return (
    <article className="flex items-center w-full gap-3 transition cursor-pointer hover:bg-slate-200 dark:hover:bg-opacity-20 p-3">
        <img
        src={privateChat.user.avatar}
        alt="avatar user"
        className={`w-16 h-16 rounded-full object-cover ${isBlocked || isMyUserBlocked ? 'opacity-20' : ''}`}
        onClick={() => pictureUserModal.current.showModal()}
        />
        <div className="flex flex-col gap-1">
         <span className="dark:text-white font-bold transition hover:underline" onClick={openChat}>{privateChat.user.fullname}</span>
         <span className="text-sm dark:text-white">
         {privateChat.user.username}
         </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
           {isUnSeen ? <span className="ml-auto bg-blue-400 rounded-full p-1"></span> : ''}
           {
              isBlocked || !isMyUserBlocked ? 
              <button onClick={() => setOpenMenu(!openMenu)}>
                <SlOptionsVertical className="dark:text-white"/>
              </button>
              :
             <span className="dark:text-white text-sm">Blocked</span>
           }
          <div className={`transition-all ${!openMenu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-2 rounded-md absolute right-9 shadow-xl dark:bg-black dark:text-white min-w-32`} id="menu-users-option">
            {
             isBlocked && !isMyUserBlocked ? 
             <UnlockUserButton avatar={privateChat.user.avatar} username={privateChat.user.username} fetchUserData={fetchUserData} socket={socket} privateChatId={privateChat._id}/>
             :
             <BlockUserButton avatar={privateChat.user.avatar} username={privateChat.user.username} fetchUserData={fetchUserData} socket={socket} privateChatId={privateChat._id}/>
            }
          </div>
          </div>
          <dialog ref={pictureUserModal} className="backdrop:bg-[rgba(0,0,0,.80)] xl:max-w-96 max-w-60 outline-none" onClick={() => pictureUserModal.current.close()}>
            <div>
              <span className="absolute w-full bg-black p-2 text-white bg-opacity-40">{privateChat.user.fullname}</span>
              <img src={privateChat.user.avatar} alt="picture-group" className="object-cover"/>
            </div>
          </dialog>
    </article>
  )
}

PrivateChat.propTypes = {
  privateChat: PropTypes.object,
  fetchUserData: PropTypes.func,
  socket: PropTypes.object
}

export default PrivateChat