import { useRef } from "react"
import SearchUsersModal from "./SearchUsersModal"
import PropTypes from "prop-types"
import { FiUser } from "react-icons/fi";

const SearchUsersButton = ({ socket, BACKEND_URL }) => {

  const modalSearchUsersRef = useRef()  

  return (
    <>
    <button type="button" className="dark:text-white transition hover:opacity-60 text-sm flex p-2 items-center gap-5" onClick={() => modalSearchUsersRef.current.showModal()}>
    <FiUser size={20}/>
    <span>New Message</span>
    </button>
    <SearchUsersModal ref={modalSearchUsersRef} socket={socket} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

SearchUsersButton.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default SearchUsersButton