import { useUserStore } from '../store/userStore'
import Group from './Group'
import PrivateChat from './PrivateChat'
import PropTypes from 'prop-types'

const Chats = ({ valueSearch, fetchUserData, username, socket, BACKEND_URL }) => {
 
  let chats = useUserStore(state => state.chats)

  if (valueSearch) {
    chats = chats.filter(chat => {
      const searchTerm = valueSearch?.toLowerCase()
      const chatName = chat.type === 'group' ? chat?.name : chat?.fullname
      return chatName?.toLowerCase()?.includes(searchTerm);
    })
  }

  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.lastMessage?.date.timestamp) - new Date(a.lastMessage?.date.timestamp)
  )
    
  return (
    <div className='w-full overflow-y-auto h-full absolute [scrollbar-width:thin]'>
        {
            sortedChats
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