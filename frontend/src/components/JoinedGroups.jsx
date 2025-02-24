import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import LeaveGroupButton from "./LeaveGroupButton";
import { useChatStore } from "../store/chatStore";
import { toast } from "react-toastify";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useState } from "react";

const JoinedGroups = ({ group, fetchUserData }) => {

  const { picture, name, visibility, members, _id } = group 
  const { setData, setIsChatMobileOpen, setLoader, unSeen, setUnSeen } = useChatStore()
  const [openMenu, setOpenMenu] = useState(false)

  const isUnSeen = unSeen.includes(_id)

  console.log(isUnSeen, unSeen)
  console.log(_id)

  useEffect(() => {
        document.addEventListener('click', () => {
          const menuOptions = document.getElementById('menu-join-options')
          const menuOptionsButton = document.getElementById('menu-join-options-button')
  
          if (menuOptions && menuOptionsButton && !menuOptions.contains(event.target) && !menuOptionsButton.contains(event.target)) {
            setOpenMenu(false)
          }
        })
  }, [])

  async function openChat() {
    setLoader(true)
    setUnSeen(unSeen.filter(chatId => chatId !== _id))
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
              <SiPrivateinternetaccess className="inline ml-1" size={20} />
            )}
          </span>
          <span className="ml-2 dark:text-white">
            <FaUser className="inline mr-1" />
            {members?.length}
          </span>
        </div>
      </div>
     <div className="flex items-center ml-auto gap-3">
      {isUnSeen ? <span className="bg-blue-400 rounded-full p-1 ml-auto"></span> : ''}
      <button onClick={() => setOpenMenu(!openMenu)} id="menu-join-options-button">
       <SlOptionsVertical className="dark:text-white"/>
      </button>
      <div id="menu-join-options" className={`transition-all ${!openMenu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-2 rounded-md absolute right-9 shadow-xl dark:bg-black dark:text-white min-w-32`}>
        <LeaveGroupButton picture={picture} name={name} _id={_id} fetchUserData={fetchUserData}/>
      </div>
     </div>
    </article>
  );
};

JoinedGroups.displayName = 'JoinedGroups'

JoinedGroups.propTypes = {
  group: PropTypes.object,
  fetchUserData: PropTypes.func,
}

export default JoinedGroups;
