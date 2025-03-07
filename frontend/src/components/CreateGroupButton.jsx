import { useRef } from "react"
import { MdGroups } from "react-icons/md"
import CreateGroupModal from "./CreateGroupModal"
import PropTypes from "prop-types"

const CreateGroupButton = ({ fetchUserData, BACKEND_URL }) => {

  const modalCreateGroupRef = useRef()

  return (
    <>
    <button onClick={() => modalCreateGroupRef.current.showModal()} className="text-xl flex items-center gap-5 dark:text-white">
      New Group
      <MdGroups size={30}/>
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