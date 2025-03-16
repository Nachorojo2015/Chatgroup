import { forwardRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { BeatLoader } from "react-spinners"
import { IoMdAdd } from "react-icons/io"
import { useUserStore } from "../store/userStore"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { FaCamera } from "react-icons/fa";

const ProfileUserModal = forwardRef(({  username, fullname, avatar, BACKEND_URL }, ref) => {

    const [loader, setLoader] = useState(false)
    const fetchUserData = useUserStore(state => state.fetchUserData)
    
      async function handleAvatar(e) {
        const avatarFile = e.target.files[0]
        if (!avatarFile) return
    
        setLoader(true)
    
        const formaData = new FormData()
        formaData.append('avatar', avatarFile)
    
        try {
          const response = await fetch(`${BACKEND_URL}/user/avatar`, {
            method: 'PUT',
            body: formaData,
            credentials: 'include'
          })
    
          if (!response.ok) {
            setLoader(false)
            const errorMessage = await response.text()
            return toast.error(errorMessage)
          }
    
          toast.success('Avatar updated')
    
          fetchUserData(BACKEND_URL)
        } catch (error) {
          console.error(error)
        }
    
        setLoader(false)
      }

  return (
    <dialog ref={ref} className="p-3 rounded-md dark:bg-gray-700 dark:text-white">
     <button onClick={() => ref.current.close()}>
      <FaArrowLeftLong className="dark:text-white" size={22}/>
     </button>
      <label>
        {loader ? 
        <BeatLoader cssOverride={{height: '144px', margin: 'auto', color: 'white'}} className="dark:text-white"/> 
        : 
        <div className="relative flex items-center justify-center group">
          <IoMdAdd className="absolute dark:text-white opacity-0 transition group-hover:opacity-100" size={80} />
          <div className="relative">
            <img src={avatar} alt="user avatar" className="rounded-full w-36 h-36 object-cover cursor-pointer transition group-hover:opacity-20" onError={e => e.target.src = '/picture-user-no-load.png'} />
            <FaCamera className="absolute bottom-2 right-2" size={30}/>
          </div>
        </div>
        }
        <input type="file" hidden accept=".jpg, .png, .webp" onChange={handleAvatar}/>
      </label>
      <div className="flex flex-col items-center mt-2">
        <h1 className="text-3xl dark:text-white">{fullname}</h1>
        <h2 className="dark:text-white">{username}</h2>
      </div>
    </dialog>
  )
})

ProfileUserModal.displayName = 'ProfileUserModal'

ProfileUserModal.propTypes = {
    avatar: PropTypes.string,
    BACKEND_URL: PropTypes.string,
    username: PropTypes.string,
    fullname: PropTypes.string
}

export default ProfileUserModal