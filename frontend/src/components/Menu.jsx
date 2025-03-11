import ClipLoader from "react-spinners/ClipLoader";
import { useRef, useState } from "react";
import DarkMode from "./DarkMode";
import CloseSession from "./CloseSession";
import { useUserStore } from "../store/userStore";
import ChatGroups from "./ChatGroups";
import PrivateUsers from "./PrivateUsers";
import { CiSearch } from "react-icons/ci";
import { useChatStore } from "../store/chatStore";
import CreateGroupButton from "./CreateGroupButton";
import { RxHamburgerMenu } from "react-icons/rx";
import PropTypes from "prop-types";
import SearchGroupsButton from "./SearchGroupsButton";
import SearchUsersButton from "./SearchUsersButton";
import ProfileUserButton from "./ProfileUserButton";

const Menu = ({ socket, BACKEND_URL }) => {

  const { fullname, username, avatar, groups, privateUsers, fetchUserData } = useUserStore()
  const isChatMobileOpen = useChatStore(state => state.isChatMobileOpen)
  const [menu, setMenu] = useState(false)

  const [activeTab, setActiveTab] = useState('Groups')
  const [valueSearch, setValueSearch] = useState('')

  function openMenu() {
    setMenu(!menu)
    document.addEventListener('click', () => {
      if (!btnMenuRef.current.contains(event.target)) {
        setMenu(false)
        document.body.classList.remove('pointer-events-none');
      }
    })
  }

  const btnMenuRef = useRef()
  
  if (!username || !fullname) return <ClipLoader cssOverride={{margin: 'auto'}}/>

  const Chats = {
    'Groups': <ChatGroups groups={groups} username={username} valueSearch={valueSearch} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>,
    'Users': <PrivateUsers privateUsers={privateUsers} valueSearch={valueSearch} fetchUserData={fetchUserData} username={username} socket={socket} BACKEND_URL={BACKEND_URL}/>
  }

  return (
    <aside className={`flex flex-col items-center ${isChatMobileOpen ? 'hidden xl:flex' : 'xl:flex'} xl:w-[30%] w-full`}>
      <section className="flex items-center w-full">
        <div className="relative m-2 flex items-center">
          <button ref={btnMenuRef} className="p-2 mt-2 transition hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full" onClick={openMenu}>
            <RxHamburgerMenu className="dark:text-white" size={20}/>
          </button>
          <div className={`absolute flex flex-col gap-4 justify-between top-0 mt-14 ml-1 transition duration-200 min-w-40 z-10 bg-white shadow-md dark:bg-black p-3 rounded-lg ${menu ? 'opacity-100' : 'opacity-0 invisible'}`}>
            <DarkMode />
            <CreateGroupButton fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
            <SearchGroupsButton username={username} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
            <SearchUsersButton socket={socket} BACKEND_URL={BACKEND_URL}/>
            <ProfileUserButton username={username} fullname={fullname} avatar={avatar} BACKEND_URL={BACKEND_URL}/>
            <CloseSession BACKEND_URL={BACKEND_URL}/>
          </div>
        </div>
        <div className="flex items-center justify-center relative xl:w-[85%] w-[80%]">
          <input placeholder="Search" className="mt-2 w-full indent-2 rounded-md p-2 pr-10 placeholder:text-black dark:bg-black dark:bg-opacity-40 dark:placeholder:text-white dark:text-gray-100" onChange={(e) => setValueSearch(e.target.value)}/>
          <CiSearch size={22} className="absolute right-2 top-4 dark:text-white"/>
        </div>
      </section>

      <section className="flex items-center justify-around w-full mt-3 mb-2">
        <button className={`dark:bg-gray-800 bg-slate-200 text-sm px-5 py-1 rounded-full ${activeTab === 'Groups' ? 'dark:text-blue-300 text-blue-500' : 'dark:text-white'}`} onClick={() => setActiveTab('Groups')}>Groups</button>
        <button className={`dark:bg-gray-800 bg-slate-200 text-sm px-5 py-1 rounded-full ${activeTab === 'Users' ? 'dark:text-blue-300 text-blue-500' : 'dark:text-white'}`} onClick={() => setActiveTab('Users')}>Users</button>
      </section>
      
      <section className="flex flex-1 w-full relative items-center justify-center">
        {Chats[activeTab]}
      </section>
    </aside>
  )
}

Menu.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default Menu