import { useRef } from "react";
import { MdBlock } from "react-icons/md";
import BlockUserModal from "./BlockUserModal";
import PropTypes from "prop-types";

const BlockUserButton = ({ avatar, username, fetchUserData, socket, privateChatId, BACKEND_URL }) => {

  const blockUserModalRef = useRef()

  return (
    <>
    <button className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70 text-red-500" onClick={() => blockUserModalRef.current.showModal()}>
      <MdBlock size={20}/>
      <span>Block User</span>
    </button>
    <BlockUserModal ref={blockUserModalRef} avatar={avatar} username={username} fetchUserData={fetchUserData} socket={socket} privateChatId={privateChatId} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

BlockUserButton.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    fetchUserData: PropTypes.func,
    socket: PropTypes.object,
    privateChatId: PropTypes.string,
    BACKEND_URL: PropTypes.string
}

export default BlockUserButton