import PropTypes from "prop-types"
import { useRef } from "react"
import MyGroups from "./MyGroups"
import JoinedGroups from "./JoinedGroups"
import SearchGroupsModal from "./SearchGroupsModal"


const ChatGroups = ({ groups, username }) => { 
  const myGroups = groups.filter(group => group.creator.username === username) // Grupos creados por el usuario
  const joinedGroups = groups.filter(group => group.creator.username !== username) // Grupos en los que el usuario esta unido

  const modalSearchGroupsRef = useRef()

  return (
    <div className="w-full overflow-y-auto h-full absolute">
      <span className="ml-5 mt-2 block font-semibold">{myGroups.length === 0 ? '' : 'My groups'}</span>

      {
        myGroups.map((group, index) => (
          <MyGroups key={index} group={group}/>
        ))
      }

      <span className="ml-5 mt-2 block font-semibold">{joinedGroups.length === 0 ? '' : 'Join'}</span>

      {
        joinedGroups.map((group, index) => (
          <JoinedGroups key={index} group={group}/>
        ))
      }

      <div className="flex flex-col items-center justify-center mt-5">
        <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalSearchGroupsRef.current.showModal()}>Search New Groups</button>
      </div>

      <SearchGroupsModal ref={modalSearchGroupsRef} username={username}/>
    </div>
  )
}

ChatGroups.displayName = 'ChatGroups'

ChatGroups.propTypes = {
    groups: PropTypes.array,
    username: PropTypes.string
}

export default ChatGroups