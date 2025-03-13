import { useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaUserGroup } from "react-icons/fa6";
import { toast } from "react-toastify";
import CopyLinkGroupButton from "./CopyLinkGroupButton";
import EditGroupButton from "./EditGroupButton";
import DeleteGroupButton from "./DeleteGroupButton";
import LeaveGroupButton from "./LeaveGroupButton";
import PropTypes from "prop-types";
import { useChatStore } from "../store/chatStore";
import { useUserStore } from "../store/userStore";

const Group = ({ group, fetchUserData, username, socket, lastMessage, BACKEND_URL }) => {

  // Identify if the group is mine
  const isMine = group.creator.username === username

  const { picture, name, visibility, members, blockedUsers, description, _id } = group
  const { setData, setIsChatMobileOpen, setLoader, unSeen, setUnSeen, id } = useChatStore()
  const userId = useUserStore(state => state.userId)
  const [menu, setMenu] = useState(false)

  const pictureGroupModal = useRef()

  const isUnSeen = unSeen.includes(_id)

  const isBlock = group.blockedUsers.includes(userId)

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
      setUnSeen(unSeen.filter(chatId => chatId !== _id))
      try {
        const response = await fetch(`${BACKEND_URL}/messages/${_id}`)
  
        if (!response.ok) {
          setLoader(false)
          const errorMessage = await response.text()
          return toast.error(`${errorMessage}, try again`)
        }
  
        const data = await response.json()
  
        setData(
          picture, 
          name,
          isBlock ? 'Block' : _id,
          data.messages,
          'group'
        )

        setLoader(false)
      } catch (error) {
        console.log(error)
        toast.error('Error in server')
        setLoader(false)
      }
    }

    console.log(lastMessage)

  return (
    <article
      className={`flex items-center w-full gap-3 p-3 ${id === _id ? 'dark:bg-slate-700 bg-slate-300' : ''}`}
    >
      <img
        src={picture}
        alt="avatar user"
        className="xl:w-16 xl:h-16 w-12 h-12 rounded-full object-cover"
        onClick={() => pictureGroupModal.current.showModal()}
        onError={e => e.target.src = '/picture-group-no-load.png'}
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <FaUserGroup className="dark:text-white"/>
          <span className="dark:text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-52 hover:underline cursor-pointer" onClick={openChat}>{name}</span>
        </div>
        <span className="flex text-sm items-center gap-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-56 dark:text-white">{lastMessage?.fullname}: {lastMessage?.content}</span>
      </div>

      <div className="flex items-center ml-auto gap-5 relative">
        {isUnSeen ? <span className="bg-blue-400 rounded-full p-1"></span> : ''}
        <button onClick={openMenu} ref={btnMenuRef} className="transition hover:opacity-60">
          <SlOptionsVertical className="dark:text-white"/>
        </button>
        {
            isMine ? 
            <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-1 rounded-md absolute right-7 shadow bg-white dark:bg-black dark:text-white min-w-36`}>
                <CopyLinkGroupButton _id={_id} />
                <EditGroupButton _id={_id} name={name} description={description} username={username} picture={picture} members={members} blockedUsers={blockedUsers} visibility={visibility} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>
                <DeleteGroupButton picture={picture} name={name} _id={_id} socket={socket} BACKEND_URL={BACKEND_URL}/>
            </div>
            :
            <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-2 rounded-md absolute right-9 shadow dark:bg-black bg-white dark:text-white min-w-32`}>
              <CopyLinkGroupButton _id={_id}/>
              <LeaveGroupButton picture={picture} name={name} _id={_id} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
            </div>
        }
      </div>

      <dialog ref={pictureGroupModal} className="backdrop:bg-[rgba(0,0,0,.90)] xl:max-w-96 max-w-60 outline-none" onClick={() => pictureGroupModal.current.close()}>
        <div>
          <span className="absolute whitespace-nowrap overflow-hidden text-ellipsis bg-black p-2 w-full text-white bg-opacity-40">{name}</span>
          <img src={picture} alt="picture-group" className="object-cover xl:w-96 xl:h-96 w-64 h-64" onError={e => e.target.src = '/picture-group-no-load.png'}/>
        </div>
      </dialog>
    </article>
  );
};

Group.propTypes = {
    group: PropTypes.object,
    fetchUserData: PropTypes.func,
    username: PropTypes.string,
    socket: PropTypes.object,
    lastMessage: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default Group