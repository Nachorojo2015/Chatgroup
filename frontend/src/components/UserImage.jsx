import PropTypes from "prop-types"
import { uploadAvatar } from "../firebase/config"
import { useState } from "react"
import { BeatLoader } from "react-spinners"

const UserImage = ({ username, avatar, updateAvatar }) => {

  const [loader, setLoader] = useState(false)

  async function handleAvatar(e) {
    const avatarFile = e.target.files[0]
    if (!avatarFile) return

    setLoader(true)

    try {
      const url = await uploadAvatar(avatarFile, username)
      updateAvatar({ url })
    } catch (error) {
      console.error(error)
      alert(`Error updating avatar, ${error.message}`)
    }

    setLoader(false)
  }

  return (
    <label>
        {loader ? <BeatLoader cssOverride={{height: '144px', margin: 'auto'}}/> : <img src={avatar} alt="user avatar" className="rounded-full w-36 h-36 cursor-pointer transition hover:opacity-80"/>}
        <input type="file" hidden accept=".jpg, .png, .webp" onChange={handleAvatar}/>
    </label>
  )
}

UserImage.displayName = 'UserImage'

UserImage.propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
    updateAvatar: PropTypes.func
}

export default UserImage