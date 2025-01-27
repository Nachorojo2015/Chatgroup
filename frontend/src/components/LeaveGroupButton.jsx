import { BiLogOut } from "react-icons/bi"
import LeaveGroupModal from "./LeaveGroupModal"
import { useRef } from "react"
import PropTypes from "prop-types"

const LeaveGroupButton = ({ picture, name, _id, fetchUserData }) => {

  const modalLeaveGroup = useRef()

  return (
    <>
    <button className="ml-auto" onClick={() => modalLeaveGroup.current.showModal()}>
        <BiLogOut size={25}/>
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