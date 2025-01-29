import { FaTrash } from "react-icons/fa"
import DeleteGroupModal from "./DeleteGroupModal"
import { useRef } from "react"
import PropTypes from "prop-types"

const DeleteGroupButton = ({ picture, name, _id, fetchUserData }) => {

  const modalDeleteRef = useRef() 
    
  return (
    <>
    <button aria-label="Delete Group">
        <FaTrash size={20} onClick={() => modalDeleteRef.current.showModal()} className="dark:text-white"/>
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