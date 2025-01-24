import PropTypes from "prop-types"

const User = ({ userSearch }) => {
  return (
    <article className="flex items-center gap-5 p-2 transition hover:bg-slate-200 w-full cursor-pointer">
        <img src={userSearch.avatar} alt="user-avatar" className="w-16 h-16 rounded-full"/>
        <div>
          <p className="font-semibold">{userSearch.fullname}</p>
          <p>{userSearch.username}</p>
        </div>
    </article>
  )
}

User.displayName = 'User'

User.propTypes = {
    userSearch: PropTypes.object
}

export default User