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
import { useEffect, useState } from "react";

const MyGroups = ({ group, fetchUserData, username, socket }) => {

  const { picture, name, visibility, members, blockedUsers, description, _id } = group
  const { setData, setIsChatMobileOpen, setLoader } = useChatStore()
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
      document.addEventListener('click', () => {
        const menuOptions = document.getElementById('menu-options')
        const menuOptionsButton = document.getElementById('menu-options-button')

        if (menuOptions && menuOptionsButton && !menuOptions.contains(event.target) && !menuOptionsButton.contains(event.target)) {
          setOpenMenu(false)
        }
      })
  }, [])
  

  async function openChat() {
      setLoader(true)
      try {
        const response = await fetch(`http://localhost:3000/messages/${_id}`)
  
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

        setIsChatMobileOpen(true)
        setLoader(false)
        document.getElementById(`chat-id-${_id}`).classList.add('hidden')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <article
      className="flex items-center w-full gap-3 transition hover:bg-slate-200 dark:hover:bg-opacity-20 p-3"
    >
      <img
        src={picture}
        alt="avatar user"
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex flex-col gap-1">
        <span className="dark:text-white font-bold hover:underline cursor-pointer" onClick={openChat}>{name}</span>
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
        <span className="bg-blue-400 rounded-full p-1 hidden" id={`chat-id-${_id}`}></span>
        <button onClick={() => setOpenMenu(!openMenu)} id="menu-options-button">
          <SlOptionsVertical className="dark:text-white"/>
        </button>
        <div id="menu-options" className={`transition-all ${!openMenu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-1 rounded-md absolute right-9 shadow-xl dark:bg-black dark:text-white min-w-28`}>
          <CopyLinkGroupButton _id={_id} />
          <EditGroupButton _id={_id} name={name} description={description} username={username} picture={picture} members={members} blockedUsers={blockedUsers} visibility={visibility} fetchUserData={fetchUserData} socket={socket}/>
          <DeleteGroupButton picture={picture} name={name} _id={_id} fetchUserData={fetchUserData}/>
        </div>
      </div>
    </article>
  );
};

MyGroups.displayName = 'MyGroups'

MyGroups.propTypes = {
    group: PropTypes.object,
    fetchUserData: PropTypes.func,
    username: PropTypes.string,
    socket: PropTypes.object
}

export default MyGroups;
