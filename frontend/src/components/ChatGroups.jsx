import PropTypes from "prop-types"
import MyGroups from "./MyGroups"
import JoinedGroups from "./JoinedGroups"
import SearchGroupsButton from "./SearchGroupsButton"


const ChatGroups = ({ groups, username, fetchUserData }) => { 
  const myGroups = groups.filter(group => group.creator.username === username) // Grupos creados por el usuario
  const joinedGroups = groups.filter(group => group.creator.username !== username) // Grupos en los que el usuario esta unido

  return (
    <div className="w-full overflow-y-auto h-full absolute">
      <span className="ml-5 mt-2 block font-semibold">{myGroups.length === 0 ? '' : 'My groups'}</span>

      {
        myGroups.map((group, index) => (
          <MyGroups key={index} group={group} fetchUserData={fetchUserData} username={username}/>
        ))
      }

      <span className="ml-5 mt-2 block font-semibold">{joinedGroups.length === 0 ? '' : 'Joined'}</span>

      {
        joinedGroups.map((group, index) => (
          <JoinedGroups key={index} group={group}/>
        ))
      }

      <SearchGroupsButton username={username}/>
    </div>
  )
}

ChatGroups.displayName = 'ChatGroups'

ChatGroups.propTypes = {
    groups: PropTypes.array,
    username: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default ChatGroups