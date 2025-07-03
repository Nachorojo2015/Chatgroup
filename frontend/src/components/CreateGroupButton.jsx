import { useRef } from "react"
import CreateGroupModal from "./CreateGroupModal"
import PropTypes from "prop-types"
import { FiUsers } from "react-icons/fi";

const CreateGroupButton = ({ fetchUserData, BACKEND_URL }) => {

  const modalCreateGroupRef = useRef()

  return (
    <>
    <button onClick={() => modalCreateGroupRef.current.showModal()} className="text-sm transition hover:opacity-60 flex items-center gap-5 p-2 dark:text-white">
      <FiUsers size={20}/>
      <span>New Group</span>
    </button>
    <CreateGroupModal ref={modalCreateGroupRef} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

CreateGroupButton.propTypes = {
    fetchUserData: PropTypes.func,
    BACKEND_URL: PropTypes.string
}

export default CreateGroupButton