import PropTypes from "prop-types"
import { forwardRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"

const LeaveGroupModal = forwardRef(({ picture, name, _id, fetchUserData, BACKEND_URL }, ref) => {

  const [loader, setLoader] = useState(false)

  async function leaveGroup() {
    setLoader(true)
    const isDark = document.querySelector('html').className === 'dark'
    try {
      const response = await fetch(`${BACKEND_URL}/group/leave/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) {
        ref.current.close()
        const errorMessage = await response.text()
        return toast.error(errorMessage, {
          theme: isDark ? 'dark' : 'light'
        })
      }

      ref.current.close()
      toast.success('Leave group', {
        theme: isDark ? 'dark' : 'light'
      })
      fetchUserData(BACKEND_URL)
    } catch (error) {
      console.log(error.message)
    } 

    setLoader(false)
  }

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 dark:text-white p-3 rounded-md shadow-md xl:min-w-[450px]">
      <button onClick={() => ref.current.close()} size={22}>
        <FaArrowLeftLong />
      </button>

      <img src={picture} alt="picture-group" className="w-36 h-36 rounded-full m-auto" onError={e => e.target.src = '/picture-group-no-load.png'}/>
      <p className="text-center mt-3 font-bold whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
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
    fetchUserData: PropTypes.func,
    BACKEND_URL: PropTypes.string
}

export default LeaveGroupModal