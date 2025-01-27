import { useRef } from "react"
import SearchGroupsModal from "./SearchGroupsModal"
import PropTypes from "prop-types"

const SearchGroupsButton = ({ username, fetchUserData }) => {

  const modalSearchGroupsRef = useRef()  

  return (
    <>
    <div className="flex flex-col items-center justify-center mt-5">
        <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalSearchGroupsRef.current.showModal()}>Search New Groups</button>
    </div>
    <SearchGroupsModal ref={modalSearchGroupsRef} username={username} fetchUserData={fetchUserData} />
    </>
  )
}

SearchGroupsButton.displayName = 'SearchGroupsButton'

SearchGroupsButton.propTypes = {
    username: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default SearchGroupsButton