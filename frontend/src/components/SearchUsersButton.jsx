import { useRef } from "react"
import SearchUsersModal from "./SearchUsersModal"
import PropTypes from "prop-types"
import { CiSearch } from "react-icons/ci";

const SearchUsersButton = ({ socket, BACKEND_URL }) => {

  const modalSearchUsersRef = useRef()  

  return (
    <>
    <button type="button" className="dark:text-white transition hover:opacity-60 text-sm flex items-center gap-2" onClick={() => modalSearchUsersRef.current.showModal()}>
     <CiSearch size={20}/>
     Search Users
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