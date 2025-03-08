import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import LeaveGroupButton from "./LeaveGroupButton";
import { useChatStore } from "../store/chatStore";
import { toast } from "react-toastify";
import { SlOptionsVertical } from "react-icons/sl";
import { useRef, useState } from "react";
import CopyLinkGroupButton from "./CopyLinkGroupButton";
import { useUserStore } from "../store/userStore";

const JoinedGroups = ({ group, fetchUserData, BACKEND_URL }) => {

  const { picture, name, visibility, members, _id } = group 
  const { setData, setIsChatMobileOpen, setLoader, unSeen, setUnSeen } = useChatStore()
  const userId = useUserStore(state => state.userId)
  const [openMenu, setOpenMenu] = useState(false)

  const isUnSeen = unSeen.includes(_id)

  const pictureGroupModal = useRef()

  const isBlock = group.blockedUsers.includes(userId)

  async function openChat() {
    setOpenMenu(false)
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
        data.messages
      )

      setLoader(false)
    } catch (error) {
      console.log(error)
      toast.error('Error in server')
    }
  }

  return (
    <article
      className="flex items-center w-full gap-3 p-3"
    >
      <img
        src={picture}
        alt="avatar user"
        className={`xl:w-16 xl:h-16 w-12 h-12 rounded-full object-cover ${isBlock ? 'opacity-20' : ''}`}
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
      <span className="dark:text-white">{isBlock ? 'Blocked' : ''}</span>
      <button onClick={() => setOpenMenu(!openMenu)}>
       <SlOptionsVertical className="dark:text-white"/>
      </button>
      <div className={`transition-all ${!openMenu ? 'invisible opacity-0' : 'opacity-100'} flex flex-col gap-2 p-2 rounded-md absolute right-9 shadow-xl dark:bg-black bg-white dark:text-white min-w-32`}>
        <CopyLinkGroupButton _id={_id}/>
        <LeaveGroupButton picture={picture} name={name} _id={_id} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
      </div>
     </div>

      <dialog ref={pictureGroupModal} className="backdrop:bg-[rgba(0,0,0,.90)] xl:max-w-96 max-w-60 outline-none" onClick={() => pictureGroupModal.current.close()}>
        <div>
          <span className="absolute w-full bg-black p-2 text-white bg-opacity-40">{name}</span>
          <img src={picture} alt="picture-group" className="object-cover" onError={e => e.target.src = '/picture-group-no-load.png'}/>
        </div>
      </dialog>
    </article>
  );
};

JoinedGroups.displayName = 'JoinedGroups'

JoinedGroups.propTypes = {
  group: PropTypes.object,
  fetchUserData: PropTypes.func,
  BACKEND_URL: PropTypes.string
}

export default JoinedGroups;
