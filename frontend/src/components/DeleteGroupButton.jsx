import DeleteGroupModal from "./DeleteGroupModal"
import { useRef } from "react"
import PropTypes from "prop-types"
import { MdDelete } from "react-icons/md";

const DeleteGroupButton = ({ picture, name, _id, fetchUserData }) => {

  const modalDeleteRef = useRef() 
    
  return (
    <>
    <button aria-label="Delete Group" onClick={() => modalDeleteRef.current.showModal()} className="flex items-center justify-center gap-2 text-sm text-red-500 transition hover:opacity-70">
      <MdDelete />
      <span>Delete Group</span>
    </button>
    <DeleteGroupModal ref={modalDeleteRef} picture={picture} name={name} _id={_id} fetchUserData={fetchUserData} />
    </>
  )
}

DeleteGroupButton.displayName = 'DeleteGroupModal'

DeleteGroupButton.propTypes = {
    picture: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default DeleteGroupButton