import ClipLoader from "react-spinners/ClipLoader";
import UserImage from "./UserImage";
import { useState } from "react";
import SearchGroups from "./SearchGroups";
import SearchUsers from "./SearchUsers";
import DarkMode from "./DarkMode";
import CloseSession from "./CloseSession";
import { useUserStore } from "../store/userStore";
import ChatGroups from "./ChatGroups";
import PrivateUsers from "./PrivateUsers";
import { MdGroups } from "react-icons/md";


const Menu = () => {

  const { fullname, username, avatar, groups, privateUsers } = useUserStore()

  const [activeTab, setActiveTab] = useState('Groups')

  if (!username || !fullname || !avatar) return <ClipLoader cssOverride={{margin: 'auto'}}/>

  return (
    <aside className="flex flex-col items-center">
      {/* Info user */}
      <section className="flex flex-col items-center w-full">
        {/* Options user */}
        <div className="flex justify-between w-[90%] mt-2">
         <DarkMode />
         <CloseSession />
        </div>
        <UserImage />
        <h1 className="text-3xl dark:text-white">{fullname}</h1>
        <h2 className="dark:text-white">{username}</h2>
        {activeTab === 'Groups' ? <SearchGroups /> : <SearchUsers />}
      </section>
      {/* Selectors */}
      <section className="flex items-center justify-around border-black border-t border-b w-full mt-3 dark:border-white">
        <button className={`w-full border-black border-r ${activeTab === 'Groups' ? 'text-blue-500 dark:text-blue-500' : ''} dark:text-white dark:border-white`} onClick={() => setActiveTab('Groups')}>Groups</button>
        <button className={`w-full border-black border-l ${activeTab === 'Users' ? 'text-blue-500 dark:text-blue-500' : ''} dark:text-white dark:border-white`} onClick={() => setActiveTab('Users')}>Users</button>
      </section>
      {/* Chats (Groups or Users) */}
      <section className="flex flex-1 w-full relative items-center justify-center">
        {activeTab === 'Groups' ? <ChatGroups groups={groups}/> : <PrivateUsers privateUsers={privateUsers}/>}
      </section>
      {/* Create group */}
      <section className="mt-auto flex items-center justify-center gap-5 w-full border-t border-black p-4 dark:border-white">
        <span className="text-xl dark:text-white">Create new Group</span>
        <MdGroups size={30} className="cursor-pointer dark:text-white"/>
      </section>
    </aside>
  )
}

export default Menu