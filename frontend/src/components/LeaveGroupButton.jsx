import LeaveGroupModal from "./LeaveGroupModal"
import { useRef } from "react"
import PropTypes from "prop-types"
import { CgLogOut } from "react-icons/cg";

const LeaveGroupButton = ({ picture, name, _id, fetchUserData, BACKEND_URL }) => {

  const modalLeaveGroup = useRef()

  return (
    <>
    <button className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70 text-red-500" onClick={() => modalLeaveGroup.current.showModal()}>
      <CgLogOut size={20}/>
      <span>Leave group</span>
    </button>
    <LeaveGroupModal ref={modalLeaveGroup} picture={picture} name={name} _id={_id} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL} />
    </>
  )
}

LeaveGroupButton.propTypes = {
    picture: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    fetchUserData: PropTypes.func,
    BACKEND_URL: PropTypes.string
}

export default LeaveGroupButton