import PropTypes from "prop-types"
import { useRef } from "react"


import ProfileUserModal from "./ProfileUserModal"


const ProfileUserButton = ({ username, fullname, avatar, BACKEND_URL }) => {

  const profileUserModal = useRef()

  return (
    <>
    <div className="flex items-center gap-3 rounded-lg cursor-pointer transition hover:bg-[rgba(0,0,0,0.08)] p-2" onClick={() => profileUserModal.current.showModal()}>
      <img src={avatar} alt="user-avatar" className="w-7 h-7 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <span className="dark:text-white text-sm font-semibold">{fullname}</span>
    </div>
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