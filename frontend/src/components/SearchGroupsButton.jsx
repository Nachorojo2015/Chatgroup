import { useRef } from "react"
import SearchGroupsModal from "./SearchGroupsModal"
import PropTypes from "prop-types"
import { CiSearch } from "react-icons/ci";

const SearchGroupsButton = ({ username, fetchUserData, BACKEND_URL }) => {

  const modalSearchGroupsRef = useRef()  

  return (
    <>
    <button type="button" className="dark:text-white transition hover:opacity-60 flex items-center gap-2 text-sm" onClick={() => modalSearchGroupsRef.current.showModal()}>
      <CiSearch size={20}/>
      <span>Search Groups</span>
    </button>
    <SearchGroupsModal ref={modalSearchGroupsRef} username={username} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL} />
    </>
  )
}

SearchGroupsButton.displayName = 'SearchGroupsButton'

SearchGroupsButton.propTypes = {
    username: PropTypes.string,
    fetchUserData: PropTypes.func,
    BACKEND_URL: PropTypes.string
}

export default SearchGroupsButton