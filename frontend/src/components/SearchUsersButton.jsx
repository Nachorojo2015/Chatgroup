import { useRef } from "react"
import SearchUsersModal from "./SearchUsersModal"
import PropTypes from "prop-types"

const SearchUsersButton = ({ fetchUserData }) => {

  const modalSearchUsersRef = useRef()  

  return (
    <>
    <div className="flex flex-col justify-center items-center mt-5">
        <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalSearchUsersRef.current.showModal()}>Search New Users</button>
    </div>
    <SearchUsersModal ref={modalSearchUsersRef} fetchUserData={fetchUserData}/>
    </>
  )
}

SearchUsersButton.propTypes = {
  fetchUserData: PropTypes.func
}

export default SearchUsersButton