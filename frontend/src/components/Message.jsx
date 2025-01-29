import PropTypes from "prop-types"

const Text = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id)
  return (
    <div className="flex gap-2.5 ml-auto mt-3">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="Jese image"/>
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{username}</span>
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span> */}
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-sm font-normal text-gray-900 dark:text-white">{content}</p>
        </div>
      </div>
    </div>
  )

  // If is not my user id
    return (
    <div className="flex items-start gap-2.5 mt-3">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="Jese image"/>
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{username}</span>
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span> */}
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-sm font-normal text-gray-900 dark:text-white">{content}</p>
        </div>
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