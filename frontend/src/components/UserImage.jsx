import PropTypes from "prop-types"
import { uploadAvatar } from "../firebase/config"
import { useUserStore } from "../store/userStore"

const UserImage = ({ avatar, userId }) => {

  const updateAvatar = useUserStore(state => state.updateAvatar)

  async function handleAvatar(e) {
    const avatarFile = e.target.files[0]

    try {
      const urlAvatar = await uploadAvatar(avatarFile, userId)
      updateAvatar(urlAvatar)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <label>
        <img src={avatar} alt="user avatar" className="rounded-full w-36 h-36 cursor-pointer transition hover:opacity-80"/>
        <input type="file" hidden accept=".jpg, .png, .webp" onChange={handleAvatar}/>
    </label>
  )
}

UserImage.displayName = 'UserImage'

UserImage.propTypes = {
    avatar: PropTypes.string,
    userId: PropTypes.string
}

export default UserImage