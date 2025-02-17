import PropTypes from "prop-types"
import { useState } from "react"
import { BeatLoader } from "react-spinners"
import { toast } from 'react-toastify'
import { useUserStore } from "../store/userStore"
import { IoMdAdd } from "react-icons/io"

const UserImage = ({ avatar }) => {

  const [loader, setLoader] = useState(false)
  const fetchUserData = useUserStore(state => state.fetchUserData)

  async function handleAvatar(e) {
    const avatarFile = e.target.files[0]
    if (!avatarFile) return

    setLoader(true)

    const formaData = new FormData()
    formaData.append('avatar', avatarFile)

    try {
      const response = await fetch('http://localhost:3000/user/avatar', {
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

      fetchUserData()
    } catch (error) {
      console.error(error)
    }

    setLoader(false)
  }

  return (
    <label>
        {loader ? 
        <BeatLoader cssOverride={{height: '144px', margin: 'auto', color: 'gray'}} className="dark:text-white"/> 
        : 
        <div className="relative flex items-center justify-center group">
          <IoMdAdd className="absolute dark:text-white opacity-0 transition group-hover:opacity-100" size={80} />
          <img src={avatar} alt="user avatar" className="rounded-full w-36 h-36 object-cover cursor-pointer transition group-hover:opacity-20" />
        </div>
        }
        <input type="file" hidden accept=".jpg, .png, .webp" onChange={handleAvatar}/>
    </label>
  )
}

UserImage.displayName = 'UserImage'

UserImage.propTypes = {
  avatar: PropTypes.string,
}

export default UserImage