import PropTypes from "prop-types"
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const Text = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id)
  return (
    <li className="flex justify-end mt-3 mr-3 items-center relative">
      <span className="pr-16 pl-3 text-sm bg-slate-200 p-2 rounded-3xl rounded-br-none dark:bg-gray-600 dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56">{content}</span>
      <time className="text-[10px] mt-auto absolute bottom-0 right-1 cursor-pointer dark:text-gray-300">{time}</time>
    </li>
  )

  // If is not my user id
    return (
    <div className="flex items-end gap-2.5 mt-3 ml-2">
      <img className={`w-8 h-8 rounded-full ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-10' : ''} relative`}>
        <span className={`text-sm dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <span className="pr-20 bg-slate-200 p-2 rounded-3xl rounded-bl-none text-sm dark:bg-gray-600 dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56">{content}</span>
        <time className="text-[10px] mt-auto absolute bottom-1 right-3 dark:text-gray-300 cursor-pointer">{time}</time>
      </div>
    </div>
  )
}

const Image = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <div className="flex justify-end relative">
        <img src={content} alt="user-image" className="xl:max-w-96 max-w-60 mr-3 mt-3 rounded-3xl rounded-br-none"/>
        <time className="text-[10px] mt-auto absolute bottom-0 right-5 font-bold text-white cursor-pointer">{time}</time>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className={`w-8 h-8 rounded-full ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-10' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <img src={content} alt="user-image" className="xl:max-w-96 max-w-60 rounded-3xl rounded-bl-none"/>
        <time className="text-[10px] mt-auto absolute bottom-0 right-5 font-bold text-white cursor-pointer">{time}</time>
      </div>
    </div>
  )
}

const Video = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <div className="flex items-center relative">
        <video src={content} controls className="ml-auto xl:max-w-96 max-w-60 mr-3 mt-3 rounded-3xl rounded-br-none"></video>
        <time className="text-[10px] mt-auto absolute bottom-0 right-5 font-bold text-white cursor-pointer">{time}</time>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className={`w-8 h-8 rounded-full ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-10' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <video src={content} controls className="xl:max-w-96 max-w-60 rounded-3xl rounded-bl-none"></video>
        <time className="text-[10px] mt-auto absolute bottom-0 right-5 font-bold text-white cursor-pointer">{time}</time>
      </div>
    </div>
  )
}

const Application = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <div className="flex xl:w-[16%] w-[45%] ml-auto items-center justify-end gap-3 mr-3 mt-3 p-2 pr-20 rounded-md relative bg-slate-200 dark:bg-gray-600 dark:text-white">
        <FaFileAlt />
        File
        <a href={content}>
          <FaDownload />
        </a>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 font-bold dark:text-gray-300 cursor-pointer">{time}</time>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className={`w-8 h-8 rounded-full ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-10' : ''}`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className="flex items-center gap-3 p-2 rounded-md relative pr-20 bg-slate-200 dark:bg-gray-600 dark:text-white">
          <FaFileAlt />
          File
          <a href={content}>
            <FaDownload />
         </a>
         <time className="text-[10px] mt-auto absolute bottom-0 right-2 font-bold dark:text-gray-300 cursor-pointer">{time}</time>
        </div>
      </div>
    </div>
  )
}

const Audio = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <div className="flex items-center justify-end relative">
        <audio src={content} controls className="ml-auto mt-3 mr-3"></audio>
        <time className="text-[10px] mt-auto absolute bottom-0 right-12 font-bold cursor-pointer">{time}</time>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5 mt-3 ml-2">
      <img className={`w-8 h-8 rounded-full ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-10' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <audio src={content} controls></audio>
        <time className="text-[10px] mt-auto absolute bottom-0 right-7 font-bold cursor-pointer">{time}</time>
      </div>
    </div>
  )
}

const Message = ({ message, userId, nextMessage }) => {
  let isSameUser = false
  if (nextMessage) {
    isSameUser = message.user._id === nextMessage.user._id // Same user send next message
  }

  console.log(message)

  const dateMessage = new Date(message.date)

  let hours = dateMessage.getHours(); // Obtiene la hora en formato 24h
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.'; // Determina si es AM o PM

  hours = hours % 12;
  hours = hours ? hours : 12; // Si es 0 (medianoche), se convierte a 12

  const formattedHours = dateMessage.getHours().toString().padStart(2, '0')
  const minutes = dateMessage.getMinutes().toString().padStart(2, '0')

  const time = `${formattedHours}:${minutes} ${ampm}`

  const TypeMessage = {
    'text': <Text userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={time}/>,
    'image': <Image userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={time}/>,
    'video': <Video userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={time}/>,
    'application': <Application userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={time}/>,
    'audio': <Audio userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={time}/>
  }
  
  return (
    <>
    {TypeMessage[message.format]}
    </>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  nextMessage: PropTypes.object,
  userId: PropTypes.string
}

Text.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Image.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Video.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Application.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Audio.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

export default Message