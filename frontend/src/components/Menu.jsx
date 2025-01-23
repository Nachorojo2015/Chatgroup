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
import CreateGroup from "./CreateGroup";


const Menu = () => {

  const { fullname, username, avatar, groups, privateUsers } = useUserStore()

  const [activeTab, setActiveTab] = useState('Groups')
  
  if (!username || !fullname || !avatar) return <ClipLoader cssOverride={{margin: 'auto'}}/>

  const Searcher = {
    'Groups': <SearchGroups />,
    'Users': <SearchUsers />
  }

  const Chats = {
    'Groups': <ChatGroups groups={groups}/>,
    'Users': <PrivateUsers privateUsers={privateUsers}/>
  }

  return (
    <aside className="flex flex-col items-center">
      <section className="flex flex-col items-center w-full">

        <div className="flex justify-between w-[90%] mt-2">
         <DarkMode />
         <CloseSession />
        </div>
        <UserImage />
        <h1 className="text-3xl dark:text-white">{fullname}</h1>
        <h2 className="dark:text-white">{username}</h2>
        {Searcher[activeTab]}
      </section>

      <section className="flex items-center justify-around border-black border-t border-b w-full mt-3 dark:border-white">
        <button className={`w-full border-black border-r ${activeTab === 'Groups' ? 'font-bold' : ''} dark:text-white dark:border-white`} onClick={() => setActiveTab('Groups')}>Groups</button>
        <button className={`w-full border-black border-l ${activeTab === 'Users' ? 'font-bold' : ''} dark:text-white dark:border-white`} onClick={() => setActiveTab('Users')}>Users</button>
      </section>
      
      <section className="flex flex-1 w-full relative items-center justify-center">
        {Chats[activeTab]}
      </section>
      
      <section className="mt-auto flex items-center justify-center gap-5 w-full border-t border-black p-4 dark:border-white">
        <CreateGroup />
      </section>
    </aside>
  )
}

export default Menu