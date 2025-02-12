import { forwardRef, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { ClipLoader } from 'react-spinners'
import User from './User'
import PropTypes from 'prop-types'

const SearchUsersModal = forwardRef(({ fetchUserData }, ref) => {

    const [usersSearch, setUsersSearch] = useState([])
    const [loader, setLoader] = useState(false)

    const inputSearchRef = useRef()
    const labelInputSearchRef = useRef()

    async function searchUsers(e) {
        e.preventDefault()
    
        const valueSearch = inputSearchRef.current.value
    
        if (!valueSearch) return labelInputSearchRef.current.innerText = 'Insert a value'
          
        if (!valueSearch.includes('@')) return labelInputSearchRef.current.innerText = 'Insert an @ at the beginning to search a username'
          
        labelInputSearchRef.current.innerText = ''
        setLoader(true)
    
        try {
          const response = await fetch(`http://localhost:3000/user/${valueSearch}`, {
            credentials: 'include'
          })
    
          if (!response.ok) {
            const errorMessage = await response.text()
            labelInputSearchRef.current.innerText = errorMessage
            setUsersSearch([])
          }
    
          const data = await response.json()
    
          console.log(data.users)
    
          setUsersSearch(data.users)
        } catch (error) {
          console.log(error.message)
        }
    
        setLoader(false)
    
      }  

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 p-3 rounded-md shadow-md xl:min-w-[450px]">
        <button onClick={() => ref.current.close()}>
         <FaArrowLeftLong className="dark:text-white" size={22}/>
        </button>
          <form className="flex flex-col items-start mt-5" onSubmit={searchUsers}>
              <label ref={labelInputSearchRef} htmlFor="user" className="text-sm text-red-500"></label>
              <div className="flex items-center gap-3 w-full mt-1">
                <input ref={inputSearchRef} name="user" placeholder="Enter a @username" className="dark:bg-gray-700 dark:text-white p-1 rounded w-full indent-1 border-2 border-black"/>
                <button type="submit">
                  <CiSearch size={30} className="dark:text-white"/>
                </button>
              </div>
          </form>
          <section className="flex items-center justify-center flex-col gap-3 mt-5">
            {
              loader ? 
              <ClipLoader /> 
               : 
              usersSearch.map((userSearch, index) => (
              <User key={index} userSearch={userSearch} fetchUserData={fetchUserData} ref={ref}/>
              ))
            }
          </section>
    </dialog>
  )
})

SearchUsersModal.displayName = 'SearchUsersModal'

SearchUsersModal.propTypes = {
  fetchUserData: PropTypes.func
}

export default SearchUsersModal