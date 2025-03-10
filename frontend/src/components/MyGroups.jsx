import { TbWorld } from "react-icons/tb";
import { SiPrivateinternetaccess } from "react-icons/si"; 
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import CopyLinkGroupButton from "./CopyLinkGroupButton";
import EditGroupButton from "./EditGroupButton";
import DeleteGroupButton from "./DeleteGroupButton";
import { useChatStore } from "../store/chatStore";
import { toast } from "react-toastify";
import { SlOptionsVertical } from "react-icons/sl";
import { useRef, useState } from "react";

const MyGroups = ({ group, fetchUserData, username, socket, BACKEND_URL }) => {

  const { picture, name, visibility, members, blockedUsers, description, _id } = group
  const { setData, setIsChatMobileOpen, setLoader, unSeen, setUnSeen } = useChatStore()
  const [menu, setMenu] = useState(false)

  const pictureGroupModal = useRef()

  const isUnSeen = unSeen.includes(_id)

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
          _id,
          data.messages
        )

        setLoader(false)
      } catch (error) {
        console.log(error)
        toast.error('Error in server')
        setLoader(false)
      }
    }

  return (
    <article
      className="flex items-center w-full gap-3 p-3"
    >
      <img
        src={picture}
        alt="avatar user"
        className="xl:w-16 xl:h-16 w-12 h-12 rounded-full object-cover"
        onClick={() => pictureGroupModal.current.showModal()}
        onError={e => e.target.src = '/picture-group-no-load.png'}
      />

      <div className="flex flex-col">
        <span className="dark:text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis w-52 hover:underline cursor-pointer" onClick={openChat}>{name}</span>
        <div>
          <span className="border-r-2 border-black dark:border-white pr-2 dark:text-white">
            {visibility}
            {visibility === "Public" ? (
              <TbWorld className="inline ml-1" size={20} />
            ) : (
              <SiPrivateinternetaccess className="inline ml-1 mb-[2px]" size={20} />
            )}
          </span>
          <span className="ml-2 dark:text-white">
            <FaUser className="inline mr-1 mb-1" />
            {members?.length}
          </span>
        </div>
      </div>

      <div className="flex items-center ml-auto gap-5 relative">
        {isUnSeen ? <span className="bg-blue-400 rounded-full p-1"></span> : ''}
        <button onClick={openMenu} ref={btnMenuRef} className="transition hover:opacity-60">
          <SlOptionsVertical className="dark:text-white"/>
        </button>
        <div className={`transition-all ${!menu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-1 rounded-md absolute right-7 shadow bg-white dark:bg-black dark:text-white min-w-36`}>
          <CopyLinkGroupButton _id={_id} />
          <EditGroupButton _id={_id} name={name} description={description} username={username} picture={picture} members={members} blockedUsers={blockedUsers} visibility={visibility} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>
          <DeleteGroupButton picture={picture} name={name} _id={_id} socket={socket} BACKEND_URL={BACKEND_URL}/>
        </div>
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

MyGroups.displayName = 'MyGroups'

MyGroups.propTypes = {
    group: PropTypes.object,
    fetchUserData: PropTypes.func,
    username: PropTypes.string,
    socket: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default MyGroups;
