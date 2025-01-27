import { forwardRef, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ClipLoader } from "react-spinners"
import PropTypes from "prop-types"
import Group from "./Group"

const SearchGroupsModal = forwardRef(({ username, fetchUserData }, ref) => {

  const [loader, setLoader] = useState(false)
  const [groupsSearch, setGroupsSearch] = useState([])

  const inputSearchRef = useRef()
  const labelInputSearchRef = useRef()

    async function searchGroups(e) {
      e.preventDefault()
    
      const valueSearch = inputSearchRef.current.value
    
      if (!valueSearch) return labelInputSearchRef.current.innerText = 'Insert a value'
    
      labelInputSearchRef.current.innerText = ''
    
      setLoader(true)
    
      try {
        const response = await fetch(`http://localhost:3000/group/search/${valueSearch}`, {
          credentials: 'include'
        })
    
        if (!response.ok) {
          const errorMessage = await response.text()
          setGroupsSearch([])
          return labelInputSearchRef.innerText = errorMessage
        }
    
        const data = await response.json()

        console.log(data.groups)
    
        setGroupsSearch(data.groups)
      } catch (error) {
        console.log(error.message)
      }
    
      setLoader(false)
    } 
  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px]">
        <FaArrowLeftLong className="cursor-pointer" size={22} onClick={() => ref.current.close()}/>
        <form className="flex flex-col items-start mt-5" onSubmit={searchGroups}>
          <label htmlFor="groups" ref={labelInputSearchRef} className="text-sm text-red-500"></label>
          <div className="flex items-center gap-3 w-full mt-1">
            <input ref={inputSearchRef} name="groups" placeholder="Enter a Group Name" className="p-1 rounded w-full indent-1 border-2 border-black"/>
            <button type="submit">
              <CiSearch size={30}/>
            </button>
          </div>
        </form>
        <section className="flex flex-col items-center justify-center gap-3 mt-5">
          {
            loader ? 
            <ClipLoader />
             :
            groupsSearch.map((groupSearch, index) => (
              <Group key={index} groupSearch={groupSearch} username={username} fetchUserData={fetchUserData} searchGroups={searchGroups}/>
            ))
          }
        </section>
    </dialog>
  )
})

SearchGroupsModal.displayName = 'SearchGroupsModal'

SearchGroupsModal.propTypes = {
  username: PropTypes.string,
  fetchUserData: PropTypes.func
}

export default SearchGroupsModal