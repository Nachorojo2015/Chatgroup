import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { FaInfoCircle, FaUser } from "react-icons/fa"
import { IoMdAddCircle } from "react-icons/io"
import { ClipLoader } from "react-spinners"
import LeaveGroupButton from "./LeaveGroupButton"

const Group = ({ groupSearch, username, fetchUserData }) => {

  const [loader, setLoader] = useState(false)

  const addButtonRef = useRef()

  const isMember = groupSearch.members.map(group => group.username).includes(username)

  async function joinGroup() {
    setLoader(true)
    try {
      const response = await fetch(`http://localhost:3000/group/join/${groupSearch._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok && addButtonRef.current) return addButtonRef.current.classList.add('text-red-500')

      fetchUserData()
    } catch (error) {
      console.log(error.message)
    }
    setLoader(false)
  }

  return (
    <article className="flex items-center gap-5 p-2 transition hover:bg-slate-200 w-full">
        <img src={groupSearch.picture} alt="picture-group" className="w-16 h-16 rounded-full"/>
          <div>
            <p className="font-semibold">{groupSearch.name}</p>
            <p>
             <span>{groupSearch.members?.length}</span>
             <FaUser className="inline ml-1 mb-[2px]" />
            </p>
          </div>
            {
                groupSearch.creator.username === username ? 
                <span className="ml-auto text-blue-500">Owner</span>
                :
                <div className="flex items-center gap-3 ml-auto">
                  <button>
                    <FaInfoCircle size={30}/>
                  </button>
                  {
                    isMember ? 
                    <LeaveGroupButton picture={groupSearch.picture} name={groupSearch.name} _id={groupSearch._id} fetchUserData={fetchUserData} />
                    :
                    loader ? 
                    <ClipLoader />
                    :
                    <button onClick={joinGroup} ref={addButtonRef}>
                      <IoMdAddCircle size={35} />
                    </button>
                  }
                </div>
            }
    </article>
  )
}

Group.displayName = 'Group'

Group.propTypes = {
    groupSearch: PropTypes.object,
    username: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default Group