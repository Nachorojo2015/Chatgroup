import { useRef } from "react"
import EditGroupModal from "./EditGroupModal"
import PropTypes from "prop-types"
import { BiSolidPencil } from "react-icons/bi";

const EditGroupButton = ({ name, description, username, picture, _id, members, blockedUsers, visibility, fetchUserData, socket, BACKEND_URL }) => {

  const modalEditRef = useRef()

  return (
    <>
    <button aria-label="Edit group" onClick={() => modalEditRef.current.showModal()} className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70">
        <BiSolidPencil />
        <span>Edit Group</span>
    </button>
    <EditGroupModal ref={modalEditRef} name={name} description={description} username={username} picture={picture} _id={_id} members={members} blockedUsers={blockedUsers} visibility={visibility} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>
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
    socket: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default EditGroupButton