import PropTypes from "prop-types"
import { useRef } from "react"


import ProfileUserModal from "./ProfileUserModal"


const ProfileUserButton = ({ username, fullname, avatar, BACKEND_URL }) => {

  const profileUserModal = useRef()

  return (
    <>
    <button className="dark:text-white transition hover:opacity-60 flex items-center gap-2 text-sm" onClick={() => profileUserModal.current.showModal()}>
      <img src={avatar} alt="user-avatar" className="w-6 h-6 object-cover rounded-full" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <span>My Profile</span>
    </button>
    <ProfileUserModal ref={profileUserModal} username={username} fullname={fullname} avatar={avatar} BACKEND_URL={BACKEND_URL}/>
    </>
  )
}

ProfileUserButton.propTypes = {
    avatar: PropTypes.string,
    BACKEND_URL: PropTypes.string,
    username: PropTypes.string,
    fullname: PropTypes.string
}

export default ProfileUserButton