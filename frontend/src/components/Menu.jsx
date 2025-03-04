import ClipLoader from "react-spinners/ClipLoader";
import UserImage from "./UserImage";
import { useState } from "react";
import DarkMode from "./DarkMode";
import CloseSession from "./CloseSession";
import { useUserStore } from "../store/userStore";
import ChatGroups from "./ChatGroups";
import PrivateUsers from "./PrivateUsers";
import { CiSearch } from "react-icons/ci";
import { useChatStore } from "../store/chatStore";
import CreateGroupButton from "./CreateGroupButton";
import PropTypes from "prop-types";

const Menu = ({ socket, BACKEND_URL }) => {

  const { fullname, username, avatar, groups, privateUsers, fetchUserData } = useUserStore()
  const isChatMobileOpen = useChatStore(state => state.isChatMobileOpen)

  const [activeTab, setActiveTab] = useState('Groups')
  const [valueSearch, setValueSearch] = useState('')
  
  if (!username || !fullname || !avatar) return <ClipLoader cssOverride={{margin: 'auto'}}/>

  const Chats = {
    'Groups': <ChatGroups groups={groups} username={username} valueSearch={valueSearch} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>,
    'Users': <PrivateUsers privateUsers={privateUsers} valueSearch={valueSearch} fetchUserData={fetchUserData} username={username} socket={socket} BACKEND_URL={BACKEND_URL}/>
  }

  return (
    <aside className={`flex flex-col items-center ${isChatMobileOpen ? 'hidden xl:flex' : 'xl:flex'} xl:w-[30%] w-full`}>
      <section className="flex flex-col items-center w-full">
        <div className="flex justify-between w-[90%] mt-2">
          <DarkMode />
          <CloseSession BACKEND_URL={BACKEND_URL}/>
        </div>
        <UserImage avatar={avatar} BACKEND_URL={BACKEND_URL} />
        <h1 className="text-3xl dark:text-white">{fullname}</h1>
        <h2 className="dark:text-white">{username}</h2>
        <div className="flex items-center justify-center relative w-[80%]">
          <input placeholder="Search" className="mt-2 w-full indent-2 rounded-md p-1 pr-10 placeholder:text-black dark:bg-black dark:bg-opacity-40 dark:placeholder:text-white dark:text-gray-100" onChange={(e) => setValueSearch(e.target.value)}/>
          <CiSearch size={22} className="absolute right-2 top-3 dark:text-white"/>
        </div>
      </section>

      <section className="flex items-center justify-around border-black border-t border-b w-full mt-3 dark:border-white">
        <button className={`w-full border-black border-r ${activeTab === 'Groups' ? 'font-bold' : ''} dark:text-white dark:border-white`} onClick={() => setActiveTab('Groups')}>Groups</button>
        <button className={`w-full border-black border-l ${activeTab === 'Users' ? 'font-bold' : ''} dark:text-white dark:border-white`} onClick={() => setActiveTab('Users')}>Users</button>
      </section>
      
      <section className="flex flex-1 w-full relative items-center justify-center">
        {Chats[activeTab]}
      </section>
      
      <section className="mt-auto flex items-center justify-center gap-5 w-full border-t border-black p-4 dark:border-white">
        <CreateGroupButton fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
      </section>
    </aside>
  )
}

Menu.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default Menu