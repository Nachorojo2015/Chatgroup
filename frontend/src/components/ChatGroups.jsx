import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { ClipLoader } from "react-spinners"
import { useUserStore } from "../store/userStore"
import MyGroups from "./MyGroups"
import JoinedGroups from "./JoinedGroups"
import { FaUser } from "react-icons/fa"
import { FaInfoCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6"


const ChatGroups = ({ groups }) => {

  // Seguir completando componente
  const username = useUserStore(state => state.username)
  const [loader, setLoader] = useState(false)
  const [groupsSearch, setGroupsSearch] = useState([])
  const myGroups = groups.filter(group => group.creator.username === username)
  const aggregateGroups = groups.filter(group => group.creator.username !== username)

  const modalRef = useRef()
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
        labelInputSearchRef.innerText = errorMessage
        setGroupsSearch([])
      }

      const data = await response.json()

      setGroupsSearch(data.groups)
    } catch (error) {
      console.log(error.message)
    }

    setLoader(false)
    
  }

  return (
    <div className="w-full overflow-y-auto h-full absolute">
      <span className="ml-5 mt-2 block font-semibold">{myGroups.length === 0 ? '' : 'My groups'}</span>
      {
        myGroups.map((group, index) => (
          <MyGroups key={index} group={group}/>
        ))
      }

      <span className="ml-5 mt-2 block font-semibold">{aggregateGroups.length === 0 ? '' : 'Join'}</span>

      {
        aggregateGroups.map((group, index) => (
          <JoinedGroups key={index} group={group}/>
        ))
      }

      <div className="flex flex-col items-center justify-center mt-5">
        <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalRef.current.showModal()}>Search New Groups</button>
      </div>

      <dialog ref={modalRef} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px]">
        <FaArrowLeftLong className="cursor-pointer" size={22} onClick={() => modalRef.current.close()}/>
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
              <article className="flex items-center gap-5 p-2 transition hover:bg-slate-200 w-full cursor-pointer rounded" key={index}>
                  <img src={groupSearch.picture} alt="picture-group" className="w-16 h-16 rounded-full"/>
                  <div>
                    <p className="font-semibold">{groupSearch.name}</p>
                    <p>
                      <span>{groupSearch.members?.length}</span>
                      <FaUser className="inline ml-1 mb-[2px]" />
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                   <FaInfoCircle size={30}/>
                   <IoMdAddCircle size={35}/>
                  </div>
              </article>
            ))
          }
        </section>
      </dialog>
    </div>
  )
}

ChatGroups.displayName = 'ChatGroups'

ChatGroups.propTypes = {
    groups: PropTypes.array
}

export default ChatGroups