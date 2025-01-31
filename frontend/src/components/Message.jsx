import PropTypes from "prop-types"

const Text = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id)
  return (
    <li className="flex justify-end gap-2.5 mt-3 mr-3">
      <span className="bg-slate-200 p-2 rounded-md inline-block dark:bg-gray-600 dark:text-white">{content}</span>
    </li>
  )

  // If is not my user id
    return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="Jese image"/>
      <div className="flex flex-col gap-1">
        <span className="dark:text-white">{username}</span>
        <span className="bg-slate-200 p-2 rounded-md inline-block dark:bg-gray-600 dark:text-white">{content}</span>
      </div>
    </div>
  )
}

const Message = ({ message, userId }) => {
  const TypeMessage = {
    'text': <Text userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content}/>
  }
  
  return (
    <>
    {TypeMessage[message.format]}
    </>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  userId: PropTypes.string
}

Text.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string
}

export default Message