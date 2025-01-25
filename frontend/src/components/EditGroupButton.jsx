import { useRef } from "react"
import { FaPenClip } from "react-icons/fa6"
import EditGroupModal from "./EditGroupModal"
import PropTypes from "prop-types"

const EditGroupButton = ({ name, description, username, picture, _id, members, visibility, fetchUserData }) => {

  const modalEditRef = useRef()

  return (
    <>
    <button aria-label="Edit group">
          <FaPenClip size={20} onClick={() => modalEditRef.current.showModal()} className="cursor-pointer"/>
    </button>
    <EditGroupModal ref={modalEditRef} name={name} description={description} username={username} picture={picture} _id={_id} members={members} visibility={visibility} fetchUserData={fetchUserData}/>
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
    fetchUserData: PropTypes.func
}

export default EditGroupButton