import LeaveGroupModal from "./LeaveGroupModal"
import { useRef } from "react"
import PropTypes from "prop-types"

const LeaveGroupButton = ({ picture, name, _id, fetchUserData }) => {

  const modalLeaveGroup = useRef()

  return (
    <>
    <button className="text-sm transition hover:opacity-70 text-red-500" onClick={() => modalLeaveGroup.current.showModal()}>
      Leave group
    </button>
    <LeaveGroupModal ref={modalLeaveGroup} picture={picture} name={name} _id={_id} fetchUserData={fetchUserData} />
    </>
  )
}

LeaveGroupButton.propTypes = {
    picture: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default LeaveGroupButton