import PropTypes from "prop-types"

const UserImage = ({ pick }) => {


  return (
    <label>
        <img src={pick} alt="user avatar" className="rounded-full w-36 h-36 cursor-pointer transition hover:opacity-80"/>
        <input type="file" hidden/>
    </label>
  )
}

UserImage.displayName = 'UserImage'

UserImage.propTypes = {
    pick: PropTypes.string
}

export default UserImage