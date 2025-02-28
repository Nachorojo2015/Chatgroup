import PropTypes from "prop-types"
import MyGroups from "./MyGroups"
import JoinedGroups from "./JoinedGroups"
import SearchGroupsButton from "./SearchGroupsButton"


const ChatGroups = ({ groups, username, fetchUserData, valueSearch, socket }) => { 
  let myGroups = groups.filter(group => group.creator.username === username) // Grupos creados por el usuario
  let joinedGroups = groups.filter(group => group.creator.username !== username) // Grupos en los que el usuario esta unido

  if (valueSearch) {
    myGroups = groups.filter(group => group.creator.username === username && group.name.toLowerCase().includes(valueSearch.toLowerCase()))
    joinedGroups = groups.filter(group => group.creator.username !== username && group.name.toLowerCase().includes(valueSearch.toLowerCase()))
  }

  return (
    <div className="w-full overflow-y-auto h-full absolute [scrollbar-width:thin]">
      <span className="ml-5 mt-2 block font-semibold dark:text-white">{myGroups.length === 0 ? '' : 'My groups'}</span>

      {
        myGroups.map((group, index) => (
          <MyGroups key={index} group={group} fetchUserData={fetchUserData} username={username} socket={socket}/>
        ))
      }

      <span className="ml-5 mt-2 block font-semibold dark:text-white">{joinedGroups.length === 0 ? '' : 'Joined'}</span>

      {
        joinedGroups.map((group, index) => (
          <JoinedGroups key={index} group={group} fetchUserData={fetchUserData} socket={socket}/>
        ))
      }

      <SearchGroupsButton username={username} fetchUserData={fetchUserData} />
    </div>
  )
}

ChatGroups.displayName = 'ChatGroups'

ChatGroups.propTypes = {
    groups: PropTypes.array,
    username: PropTypes.string,
    fetchUserData: PropTypes.func,
    valueSearch: PropTypes.string,
    socket: PropTypes.object
}

export default ChatGroups