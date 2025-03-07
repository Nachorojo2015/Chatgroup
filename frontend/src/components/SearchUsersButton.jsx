import { useRef } from "react"
import SearchUsersModal from "./SearchUsersModal"
import PropTypes from "prop-types"

const SearchUsersButton = ({ socket, BACKEND_URL }) => {

  const modalSearchUsersRef = useRef()  

  return (
    <>
    <div className="flex flex-col justify-center items-center mt-5">
        <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => modalSearchUsersRef.current.showModal()}>Search New Users</button>
    </div>
    <SearchUsersModal ref={modalSearchUsersRef} socket={socket} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

SearchUsersButton.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default SearchUsersButton