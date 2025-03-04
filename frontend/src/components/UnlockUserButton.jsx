import { FaUnlock } from "react-icons/fa6";
import UnlockUserModal from "./UnlockUserModal";
import PropTypes from "prop-types";
import { useRef } from "react";

const UnlockUserButton = ({ avatar, username, fetchUserData, socket, privateChatId, BACKEND_URL }) => {

  const unlockUserModalRef = useRef()

  return (
    <>
    <button className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70" onClick={() => unlockUserModalRef.current.showModal()}>
        <FaUnlock />
        <span>Unlock User</span>
    </button>
    <UnlockUserModal ref={unlockUserModalRef} avatar={avatar} username={username} fetchUserData={fetchUserData} socket={socket} privateChatId={privateChatId} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

UnlockUserButton.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  fetchUserData: PropTypes.func,
  socket: PropTypes.object,
  privateChatId: PropTypes.string,
  BACKEND_URL: PropTypes.string
}

export default UnlockUserButton