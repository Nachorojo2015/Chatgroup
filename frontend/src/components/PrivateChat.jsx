import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "react-toastify";
import { useChatStore } from "../store/chatStore";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import BlockUserButton from "./BlockUserButton";
import { useUserStore } from "../store/userStore";
import UnlockUserButton from "./UnlockUserButton";

const PrivateChat = ({ privateChat, fetchUserData, socket, BACKEND_URL }) => {

  const { setIsChatMobileOpen, setData, unSeen, setUnSeen, setLoader, id } = useChatStore()
  const { blockedUsers, userId } = useUserStore()

  const isMyUserBlocked = privateChat.user.blockedUsers.includes(userId)
  const isBlocked = blockedUsers.includes(privateChat.user._id)

  const [menu, setMenu] = useState(false)

  const isUnSeen = unSeen.includes(privateChat._id)

  const pictureUserModal = useRef()

  const btnMenuRef = useRef()

  function openMenu() {
    setMenu(!menu)
    document.addEventListener('click', () => {
      if (!btnMenuRef.current.contains(event.target)) {
        setMenu(false)
        document.body.classList.remove('pointer-events-none');
      }
    })
  }

  async function openChat() {
    setLoader(true)
    setIsChatMobileOpen(true)
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
    } catch (error) {
      console.error(error)
      toast.error('Error in server')
      setLoader(false)
    }
  } 

  return (
    <article className={`flex items-center w-full gap-3 p-3 ${id === privateChat._id ? 'dark:bg-slate-500 bg-slate-300' : ''}`}>
        <img
        src={privateChat.user.avatar}
        alt="avatar user"
        className={`xl:w-16 xl:h-16 w-12 h-12 rounded-full object-cover ${isBlocked || isMyUserBlocked ? 'opacity-20' : ''}`}
        onClick={() => pictureUserModal.current.showModal()}
        onError={e => e.target.src = '/picture-user-no-load.png'}
        />
        <div className="flex flex-col">
         <span className="dark:text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis w-52 cursor-pointer hover:underline" onClick={openChat}>{privateChat.user.fullname}</span>
         <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis w-52 dark:text-white">
         {privateChat.user.username}
         </span>
        </div>
        <div className="ml-auto flex items-center gap-3">
           {isUnSeen ? <span className="ml-auto bg-blue-400 rounded-full p-1"></span> : ''}
           {
              isBlocked || !isMyUserBlocked ? 
              <button onClick={openMenu} ref={btnMenuRef}>
                <SlOptionsVertical className="dark:text-white"/>
              </button>
              :
             <span className="dark:text-white text-sm">Blocked</span>
           }
          <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-2 rounded-md absolute right-9 shadow dark:bg-black dark:text-white min-w-32`} id="menu-users-option">
            {
             isBlocked && !isMyUserBlocked ? 
             <UnlockUserButton avatar={privateChat.user.avatar} username={privateChat.user.username} fetchUserData={fetchUserData} socket={socket} privateChatId={privateChat._id} BACKEND_URL={BACKEND_URL}/>
             :
             <BlockUserButton avatar={privateChat.user.avatar} username={privateChat.user.username} fetchUserData={fetchUserData} socket={socket} privateChatId={privateChat._id} BACKEND_URL={BACKEND_URL}/>
            }
          </div>
          </div>
          <dialog ref={pictureUserModal} className="backdrop:bg-[rgba(0,0,0,.80)] xl:max-w-96 max-w-60 outline-none" onClick={() => pictureUserModal.current.close()}>
            <div>
              <span className="absolute w-full bg-black p-2 text-white bg-opacity-40">{privateChat.user.fullname}</span>
              <img src={privateChat.user.avatar} alt="picture-group" className="object-cover xl:w-96 xl:h-96 w-64 h-64" onError={e => e.target.src = '/picture-user-no-load.png'}/>
            </div>
          </dialog>
    </article>
  )
}

PrivateChat.propTypes = {
  privateChat: PropTypes.object,
  fetchUserData: PropTypes.func,
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default PrivateChat