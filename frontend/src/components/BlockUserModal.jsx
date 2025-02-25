import PropTypes from "prop-types"
import { forwardRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"

const BlockUserModal = forwardRef(({ avatar, username, fetchUserData }, ref) => {

  const [loader, setLoader] = useState(false)

  async function blockUser() {
    setLoader(true)
    try {
      const response = await fetch(`http://localhost:3000/user/block/${username}`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        setLoader(false)
        ref.current.close()
        const errorMessage = await response.text()
        return toast.error(errorMessage)
      }

      const data = await response.json()

      setLoader(false)
      ref.current.close()
      toast.success(`${data.userBlock} was blocked`)
      fetchUserData()
    } catch (error) {
      console.log(error)
      setLoader(false)
      ref.current.close()
      toast.error('Error in server')
    }
  }

  return (
    <dialog ref={ref}  className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 dark:text-white p-3 rounded-md shadow-md xl:min-w-[450px]">
      <button onClick={() => ref.current.close()} size={22}>
        <FaArrowLeftLong />
      </button>

      <img src={avatar} alt="picture-group" className="w-36 h-36 rounded-full m-auto"/>
      <p className="text-center mt-3 font-bold">{username}</p>
      <h1 className="text-center">¿Block User?</h1>

      <button onClick={blockUser} className="text-white mt-3 w-full bg-red-700 hover:bg-red-800 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600">{loader ? <ClipLoader size={20} color="white"/> : 'Block'}</button>
    </dialog>
  )
})

BlockUserModal.displayName = 'BlockUserModal'

BlockUserModal.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default BlockUserModal