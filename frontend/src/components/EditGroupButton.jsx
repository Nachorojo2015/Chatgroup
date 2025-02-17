import { useRef } from "react"
import EditGroupModal from "./EditGroupModal"
import PropTypes from "prop-types"

const EditGroupButton = ({ name, description, username, picture, _id, members, blockedUsers, visibility, fetchUserData, socket }) => {

  const modalEditRef = useRef()

  return (
    <>
    <button aria-label="Edit group" onClick={() => modalEditRef.current.showModal()} className="text-sm transition hover:opacity-70">
        Edit Group
    </button>
    <EditGroupModal ref={modalEditRef} name={name} description={description} username={username} picture={picture} _id={_id} members={members} blockedUsers={blockedUsers} visibility={visibility} fetchUserData={fetchUserData} socket={socket}/>
    </>
  )
}

EditGroupButton.displayName = 'EditGroupModal'

EditGroupButton.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    username: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    members: PropTypes.array,
    visibility: PropTypes.string,
    fetchUserData: PropTypes.func,
    blockedUsers: PropTypes.array,
    socket: PropTypes.object
}

export default EditGroupButton