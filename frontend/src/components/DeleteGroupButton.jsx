import DeleteGroupModal from "./DeleteGroupModal"
import { useRef } from "react"
import PropTypes from "prop-types"
import { MdDelete } from "react-icons/md";

const DeleteGroupButton = ({ picture, name, _id, socket, BACKEND_URL }) => {

  const modalDeleteRef = useRef() 
    
  return (
    <>
    <button aria-label="Delete Group" onClick={() => modalDeleteRef.current.showModal()} className="flex items-center justify-center gap-2 text-sm text-red-500 transition hover:opacity-70">
      <MdDelete />
      <span>Delete Group</span>
    </button>
    <DeleteGroupModal ref={modalDeleteRef} picture={picture} name={name} _id={_id} socket={socket} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

DeleteGroupButton.displayName = 'DeleteGroupModal'

DeleteGroupButton.propTypes = {
    picture: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    socket: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default DeleteGroupButton