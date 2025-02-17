import PropTypes from "prop-types"
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import Player from "./Player";

const Text = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
    <li className={`flex justify-end ${isSameUser ? 'mt-1' : 'mt-3'}  mr-3 items-center relative`}>
      <span className={`pr-16 pl-3 text-sm bg-slate-200 p-2 rounded-md ${isSameUser ? '' : 'rounded-tr-none'}  dark:bg-gray-600 dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56`}>{content}</span>
      <time className="text-[10px] mt-auto absolute bottom-0 right-1 cursor-pointer dark:text-gray-300">{time}</time>
    </li>
    )
  }

  // If is not my user id
  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser ? 'ml-[42px]' : 'rounded-tl-none'} p-2 bg-slate-200 dark:bg-gray-600 relative`}>
        <span className={`text-sm font-bold dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <span className="pr-14 text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56">{content}</span>
        <time className="text-[10px] absolute bottom-0 right-1 dark:text-gray-300 cursor-pointer">{time}</time>
      </div>
    </li>
  )
}

const Image = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end relative mr-3 ${isSameUser ? 'mt-1' : 'mt-3'}`}>
        <div className={`xl:max-w-96 max-w-60 rounded-md border-t-8 border-b-[25px] border-l-8 border-r-8 border-slate-200 dark:border-gray-600 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <img src={content} alt="user-image"/>
        </div>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 dark:text-gray-300 cursor-pointer">{time}</time>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`xl:max-w-96 max-w-60 rounded-md border-t-8 border-b-[25px] border-l-8 border-r-8 border-slate-200 dark:border-gray-600 ${isSameUser ? '' : 'rounded-tl-none'}`}>
          <img src={content} alt="user-image" />
        </div>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 dark:text-gray-300 cursor-pointer">{time}</time>
      </div>
    </li>
  )
}

const Video = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} relative`}>
        <div className={`ml-auto xl:max-w-96 max-w-60 border-t-8 border-b-[25px] border-l-8 border-r-8 border-slate-200 dark:border-gray-600 rounded-md ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <video src={content} controls></video>
        </div>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 dark:text-gray-300 cursor-pointer">{time}</time>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`xl:max-w-96 max-w-60 rounded-md border-t-8 border-b-[25px] border-l-8 border-r-8 border-slate-200 dark:border-gray-600 ${isSameUser ? '' : 'rounded-tl-none'}`}>
          <video src={content} controls></video>
        </div>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 dark:text-gray-300 cursor-pointer">{time}</time>
      </div>
    </li>
  )
}

const Application = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className="flex xl:w-[16%] w-[45%] ml-auto items-center justify-end gap-3 mr-3 mt-3 p-2 pr-20 rounded-md relative bg-slate-200 dark:bg-gray-600 dark:text-white">
        <FaFileAlt />
        File
        <a href={content}>
          <FaDownload />
        </a>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 font-bold dark:text-gray-300 cursor-pointer">{time}</time>
      </li>
    )
  }

  return (
    <li className="flex items-start gap-2.5 mt-3 ml-2">
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
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
    </li>
  )
}

const Audio = ({ userId, _id, content, username, avatar, isSameUser, time }) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center justify-end mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} relative`}>
        <div className={`flex items-center gap-5 bg-slate-200 dark:bg-gray-600 p-2 rounded-md ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <img src={avatar} alt="user-avatar" className="w-12 h-12 rounded-full object-cover"/>
          <Player audioURL={content}/>
        </div>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 dark:text-gray-300 cursor-pointer">{time}</time>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`bg-slate-200 dark:bg-gray-600 p-4 rounded-md ${isSameUser ? '' : 'rounded-tl-none'}`}>
          <Player audioURL={content}/>
        </div>
        <time className="text-[10px] mt-auto absolute bottom-0 right-2 dark:text-gray-300 cursor-pointer">{time}</time>
      </div>
    </li>
  )
}

const Message = ({ message, userId }) => {
  let isSameUser = message.sequence === 0  // Same user send next message

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