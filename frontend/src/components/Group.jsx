import PropTypes from "prop-types"
import { forwardRef } from "react"
import { FaInfoCircle, FaUser } from "react-icons/fa"
import { IoMdAddCircle } from "react-icons/io"
import LeaveGroupButton from "./LeaveGroupButton"
import { toast } from "react-toastify"

const Group = forwardRef(({ groupSearch, username, fetchUserData }, ref) => {

  const isMember = groupSearch.members.map(group => group.username).includes(username)

  async function joinGroup() {
    ref.current.close()
    const toastId = toast.loading('Join to group...')
    
    try {
      const response = await fetch(`http://localhost:3000/group/join/${groupSearch._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return toast.update(toastId, {
          render: errorMessage,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        })
      }

      toast.update(toastId, {
        render: 'Joined!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })

      fetchUserData()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <article className="flex items-center gap-5 p-2 transition hover:opacity-65 w-full">
        <img src={groupSearch.picture} alt="picture-group" className="w-16 h-16 rounded-full object-cover"/>
          <div className="dark:text-white">
            <p className="font-semibold ">{groupSearch.name}</p>
            <p className="flex items-center gap-3 mt-2">
             <span>{groupSearch.members?.length}</span>
             <FaUser />
            </p>
          </div>
            {
                groupSearch.creator.username === username ? 
                <span className="ml-auto text-blue-500">Owner</span>
                :
                <div className="flex items-center gap-3 ml-auto">
                  <button>
                    <FaInfoCircle size={30} className="dark:text-white"/>
                  </button>
                  {
                    isMember ? 
                    <LeaveGroupButton picture={groupSearch.picture} name={groupSearch.name} _id={groupSearch._id} fetchUserData={fetchUserData} />
                    :
                    <button onClick={joinGroup}>
                      <IoMdAddCircle size={35} className="dark:text-white"/>
                    </button>
                  }
                </div>
            }
    </article>
  )
})

Group.displayName = 'Group'

Group.propTypes = {
    groupSearch: PropTypes.object,
    username: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default Group