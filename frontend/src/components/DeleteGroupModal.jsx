import { forwardRef } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { toast } from "react-toastify"
import PropTypes from "prop-types"

const DeleteGroupModal = forwardRef(({ picture, name, _id ,socket, BACKEND_URL }, ref) => {

  async function deleteGroup() {
      ref.current.close()
      const isDark = document.querySelector('html').className === 'dark'
      const toastId = toast.loading('Deleting Group...', {
        theme: isDark ? 'dark' : 'light'
      })
      try {
        const response = await fetch(`${BACKEND_URL}/group/delete/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
  
        if (!response.ok) {
          const errorMessage = await response.text()
          return toast.error(errorMessage)
        }
  
        toast.update(toastId, {
          render: 'Group deleted!',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        })
  
        socket.emit('update-user')
      } catch (error) {
        console.log(error.message)
      }
    } 

    function closeDeleteModal() {
      ref.current.close()
    }

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 dark:text-white p-3 rounded-md shadow-md xl:min-w-[450px] min-w-[95%]">
        <button onClick={closeDeleteModal}>
          <FaArrowLeftLong />
        </button>
        <img src={picture} alt="picture-group" className="w-36 h-36 rounded-full object-cover m-auto"/>
        <p className="text-center mt-3 font-bold whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
        <h1 className="text-center">¿Delete Group?</h1>
        
        <button onClick={deleteGroup} className="text-white mt-3 w-full bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </dialog>
  )
})

DeleteGroupModal.displayName = 'DeleteGroupModal'

DeleteGroupModal.propTypes = {
    picture: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    socket: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default DeleteGroupModal