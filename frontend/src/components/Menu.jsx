import ClipLoader from "react-spinners/ClipLoader";
import UserImage from "./UserImage";
import { useState } from "react";
import SearchGroups from "./SearchGroups";
import SearchUsers from "./SearchUsers";
import DarkMode from "./DarkMode";
import CloseSession from "./CloseSession";
import { useUserStore } from "../store/userStore";


const Menu = () => {

  const { _id, fullname, username, avatar } = useUserStore()

  const [activeTab, setActiveTab] = useState('Groups')

  if (!_id) return <ClipLoader cssOverride={{margin: 'auto'}}/>

  return (
    <aside className="flex flex-col items-center">
      {/* Info user */}
      <section className="flex flex-col items-center w-full">
        <div className="flex justify-between w-[90%] mt-2">
         <DarkMode />
         <CloseSession />
        </div>
        <UserImage avatar={avatar} userId={_id}/>
        <h1 className="text-3xl">{fullname}</h1>
        <h2>{username}</h2>
        {activeTab === 'Groups' ? <SearchGroups /> : <SearchUsers />}
      </section>
      {/* Selectors */}
      <section className="flex items-center justify-around border-black border-t border-b w-full mt-3">
        <button className={`w-full border-black border-r ${activeTab === 'Groups' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('Groups')}>Groups</button>
        <button className={`w-full border-black border-l ${activeTab === 'Users' ? 'text-blue-500' : ''}`} onClick={() => setActiveTab('Users')}>Users</button>
      </section>
      {/* Chats */}
      <section className="w-full">
        
      </section>
      {/* Create group */}
    </aside>
  )
}

export default Menu