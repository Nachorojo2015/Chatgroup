import { useRef } from "react"
import { MdGroups } from "react-icons/md"
import CreateGroupModal from "./CreateGroupModal"
import PropTypes from "prop-types"

const CreateGroupButton = ({ fetchUserData }) => {

  const modalCreateGroupRef = useRef()

  return (
    <>
    <button onClick={() => modalCreateGroupRef.current.showModal()} className="text-xl flex items-center gap-5 dark:text-white">
      Create new Group
      <MdGroups size={30}/>
    </button>
    <CreateGroupModal ref={modalCreateGroupRef} fetchUserData={fetchUserData}/>
    </>
  )
}

CreateGroupButton.propTypes = {
    fetchUserData: PropTypes.func
}

export default CreateGroupButton