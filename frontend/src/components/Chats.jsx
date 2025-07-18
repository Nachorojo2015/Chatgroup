import { useUserStore } from '../store/userStore'
import Group from './Group'
import LoaderChats from './LoaderChats'
import PrivateChat from './PrivateChat'
import PropTypes from 'prop-types'

const Chats = ({ valueSearch, fetchUserData, username, socket, BACKEND_URL }) => {
 
  let chats = useUserStore(state => state.chats)

  if (!username) return <LoaderChats />;

  if (valueSearch) {
    chats = chats.filter(chat => {
      const searchTerm = valueSearch?.toLowerCase()
      const chatName = chat.type === 'group' ? chat?.name : chat?.users.find(user => user.username !== username).fullname
      return chatName?.toLowerCase()?.includes(searchTerm);
    })
  }

  if (!chats.length) return <p className='dark:text-white'>Search users or groups on the menu to start</p>
    
  return (
    <div className='w-full overflow-y-auto h-full absolute [scrollbar-width:thin] p-2'>
        {
            chats
                .map(chat => 
                    chat.type === 'group' ? 
                    (<Group key={chat._id} group={chat} fetchUserData={fetchUserData} username={username} socket={socket} lastMessage={chat.lastMessage} BACKEND_URL={BACKEND_URL}/>)
                    :
                    (<PrivateChat key={chat._id} privateChat={chat} fetchUserData={fetchUserData} socket={socket} lastMessage={chat.lastMessage} BACKEND_URL={BACKEND_URL}/>)
                )
        }
    </div>
);


}

Chats.propTypes = {
  labeledChats: PropTypes.array,
  valueSearch: PropTypes.string,
  fetchUserData: PropTypes.func,
  username: PropTypes.string,
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default Chats