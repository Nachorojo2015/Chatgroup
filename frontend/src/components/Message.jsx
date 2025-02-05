import PropTypes from "prop-types"
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const Text = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id)
  return (
    <li className="flex justify-end mt-3 mr-3 items-center">
      <span className="bg-slate-200 p-2 rounded-md dark:bg-gray-600 dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56">{content}</span>
    </li>
  )

  // If is not my user id
    return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="Jese image"/>
      <div className="flex flex-col gap-1">
        <span className="dark:text-white">{username}</span>
        <span className="bg-slate-200 p-2 rounded-md dark:bg-gray-600 dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56">{content}</span>
      </div>
    </div>
  )
}

const Image = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id) {
    return <img src={content} alt="user-image" className="ml-auto xl:max-w-96 max-w-60 mr-3 mt-3"/>
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="user-avatar"/>
      <div className="flex flex-col gap-1">
        <span className="dark:text-white">{username}</span>
        <img src={content} alt="user-image" className="xl:max-w-96 max-w-60"/>
      </div>
    </div>
  )
}

const Video = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id) {
    return <video src={content} controls className="ml-auto xl:max-w-96 max-w-60 mr-3 mt-3"></video>
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="user-avatar"/>
      <div className="flex flex-col gap-1">
        <span className="dark:text-white">{username}</span>
        <video src={content} controls className="xl:max-w-96 max-w-60"></video>
      </div>
    </div>
  )
}

const Application = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <div className="flex xl:w-[10%] w-[30%] ml-auto items-center justify-end gap-3 mr-3 mt-3 p-2 rounded-md bg-slate-200 dark:bg-gray-600 dark:text-white">
        <FaFileAlt />
        File
        <a href={content}>
          <FaDownload />
        </a>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="user-avatar"/>
      <div className="flex flex-col gap-1">
        <span className="dark:text-white">{username}</span>
        <div className="flex items-center gap-3 p-2 rounded-md bg-slate-200 dark:bg-gray-600 dark:text-white">
          <FaFileAlt />
          File
          <a href={content}>
            <FaDownload />
         </a>
        </div>
      </div>
    </div>
  )
}

const Audio = ({ userId, _id, content, username, avatar }) => {
  // If is my user id
  if (userId === _id) {
    return <audio src={content} controls className="ml-auto mt-3 mr-3 w-[75%] xl:w-[30%]"></audio>
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className="w-8 h-8 rounded-full" src={avatar} alt="user-avatar"/>
      <div className="flex flex-col gap-1">
        <span className="dark:text-white">{username}</span>
        <audio src={content} controls className="w-[75%] xl:w-[30%]"></audio>
      </div>
    </div>
  )
}

const Message = ({ message, userId }) => {
  console.log(message)
  const TypeMessage = {
    'text': <Text userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} />,
    'image': <Image userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} />,
    'video': <Video userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} />,
    'application': <Application userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} />,
    'audio': <Audio userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} />
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

Image.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string
}

Video.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string
}

Application.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string
}

Audio.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string
}

export default Message