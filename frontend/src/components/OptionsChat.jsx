import { SlOptionsVertical } from "react-icons/sl"
import { useUserStore } from "../store/userStore"
import { useRef, useState } from "react"
import UnlockUserButton from "./UnlockUserButton"
import BlockUserButton from "./BlockUserButton"
import CopyLinkGroupButton from "./CopyLinkGroupButton"
import EditGroupButton from "./EditGroupButton"
import DeleteGroupButton from "./DeleteGroupButton"
import LeaveGroupButton from "./LeaveGroupButton"
import PropTypes from "prop-types"

const OptionsChat = ({ chatId, socket, BACKEND_URL }) => {
  const { chats, username, userId, blockedUsers, fetchUserData } = useUserStore()
  const [menu, setMenu] = useState(false)

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

  const chat = chats.find(chat => chat._id === chatId)

  const typeChat = chat?.type

  if (typeChat === 'private') {

    const privateUser = chat.users.find(user => user.username !== username)

    const isMyUserBlocked = privateUser.blockedUsers.includes(userId)
    const isBlocked = blockedUsers.includes(privateUser._id)

    return (
    <>
    {
    isBlocked || !isMyUserBlocked ? 
    <button onClick={openMenu} ref={btnMenuRef} className="ml-auto">
      <SlOptionsVertical className="dark:text-white"/>
    </button>
    :
    <span className="dark:text-white text-sm ml-auto">Blocked</span>
    }
    <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'scale-up-top-right opacity-100'} flex flex-col gap-2 p-3 rounded-md z-20 absolute right-7 top-16 shadow bg-white dark:bg-gray-900 dark:text-white min-w-36`}>
    {
    isBlocked && !isMyUserBlocked ? 
    <UnlockUserButton avatar={privateUser.avatar} username={privateUser.username} fetchUserData={fetchUserData} socket={socket} privateChatId={chat._id} BACKEND_URL={BACKEND_URL}/>
    :
    <BlockUserButton avatar={privateUser.avatar} username={privateUser.username} fetchUserData={fetchUserData} socket={socket} privateChatId={chat._id} BACKEND_URL={BACKEND_URL}/>
    }
    </div>
    </>
    )
  } 

  // Identify if the group is mine
  const isMine = chat.creator.username === username

  return (
    <div className="flex items-center ml-auto gap-5">
     <button onClick={openMenu} ref={btnMenuRef} className="transition hover:opacity-60">
        <SlOptionsVertical className="dark:text-white"/>
     </button>
    {
    isMine ? 
    <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'scale-up-top-right opacity-100'} flex flex-col gap-2 p-3 rounded-md absolute z-20 top-16 right-7 shadow bg-white dark:bg-gray-900 dark:text-white min-w-36`}>
      <CopyLinkGroupButton _id={chat._id} />
      <EditGroupButton _id={chat._id} name={chat.name} description={chat.description} username={username} picture={chat.picture} members={chat.members} blockedUsers={chat.blockedUsers} visibility={chat.visibility} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>
      <DeleteGroupButton picture={chat.picture} name={chat.name} _id={chat._id} socket={socket} BACKEND_URL={BACKEND_URL}/>
    </div>
    :
    <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'scale-up-top-right opacity-100'} flex flex-col gap-2 p-3 rounded-md absolute z-20 top-16 right-7 shadow dark:bg-gray-900 bg-white dark:text-white min-w-32`}>
      <CopyLinkGroupButton _id={chat._id}/>
      <LeaveGroupButton picture={chat.picture} name={chat.name} _id={chat._id} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
    </div>
    }
    </div>
  )
}

OptionsChat.propTypes = {
    chatId: PropTypes.string,
    socket: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default OptionsChat