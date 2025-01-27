import PropTypes from "prop-types"
import { forwardRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"


const LeaveGroupModal = forwardRef(({ picture, name, _id, fetchUserData }, ref) => {

  const [loader, setLoader] = useState(false)

  async function leaveGroup() {
    setLoader(true)
    try {
      const response = await fetch(`http://localhost:3000/group/leave/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        ref.current.close()
        return toast.error(errorMessage)
      }

      ref.current.close()
      toast.success('Leave group')
      fetchUserData()
    } catch (error) {
      console.log(error.message)
    } 

    setLoader(false)
  }

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px]">
      <FaArrowLeftLong className="cursor-pointer" onClick={() => ref.current.close()} size={22}/>

      <img src={picture} alt="picture-group" className="w-36 h-36 rounded-full m-auto"/>
      <p className="text-center mt-3 font-bold">{name}</p>
      <h1 className="text-center">¿Leave Group?</h1>

      <button onClick={leaveGroup} className="text-white mt-3 w-full bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{loader ? <ClipLoader size={20} color="white"/> : 'Leave'}</button>
    </dialog>
  )
})

LeaveGroupModal.displayName = 'LeaveGroupModal'

LeaveGroupModal.propTypes = {
    picture: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default LeaveGroupModal