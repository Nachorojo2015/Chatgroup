import PropTypes from "prop-types";
import SearchUsersButton from "./SearchUsersButton";
import { useChatStore } from "../store/chatStore";
import { toast } from "react-toastify";

const PrivateUsers = ({ privateUsers, valueSearch, fetchUserData, username }) => {

  const { setIsChatMobileOpen, setData } = useChatStore()

  let privateChats = privateUsers.map(privateChat => ({ user: privateChat.users.filter(user => user.username !== username)[0], _id: privateChat._id})).flat()

  if (valueSearch) {
    privateChats = privateChats.filter(privateChat => privateChat.user.fullname.toLowerCase().includes(valueSearch.toLowerCase()))
  }

  async function openChat(_id, avatar, name) {
      try {
        const response = await fetch(`http://localhost:3000/messages/${_id}`)
    
        if (!response.ok) {
          const errorMessage = await response.text()
          return toast.error(`${errorMessage}, try again`)
        }
    
        const data = await response.json()
  
        setData(
          avatar,
          name,
          _id,
          data.messages
        )
  
        setIsChatMobileOpen(true)
        document.getElementById(`chat-id-${_id}`).classList.add('hidden')
      } catch (error) {
        console.error(error)
      }
    }
  
  return (
    <div className="w-full overflow-y-auto h-full absolute [scrollbar-width:thin]">
      {
        privateChats.map((privateChat, index) => (
                <article className="flex items-center w-full gap-3 transition cursor-pointer hover:bg-slate-200 dark:hover:bg-opacity-20 p-3" key={index} onClick={() => openChat(privateChat._id, privateChat.user.avatar, privateChat.user.fullname)}>
                    <img
                    src={privateChat.user.avatar}
                    alt="avatar user"
                    className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                    <span className="dark:text-white">{privateChat.user.fullname}</span>
                    <span className="text-sm font-semibold dark:text-white">
                        {privateChat.user.username}
                    </span>
                    </div>
                    <span className="ml-auto bg-blue-400 rounded-full p-1 hidden" id={`chat-id-${privateChat._id}`}></span>
                </article>
        ))
       }
       <SearchUsersButton fetchUserData={fetchUserData}/>
    </div>
  );
};

PrivateUsers.displayName = "PrivateUsers";

PrivateUsers.propTypes = {
  privateUsers: PropTypes.array,
  valueSearch: PropTypes.string,
  fetchUserData: PropTypes.func,
  username: PropTypes.string
};

export default PrivateUsers;
