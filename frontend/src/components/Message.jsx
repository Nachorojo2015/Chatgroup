import PropTypes from "prop-types"
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa"
import Player from "./Player";
import { forwardRef, useRef } from "react";
import MessageOptionsModal from "./MessageOptionsModal";

const Text = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end ${isSameUser ? 'mt-1' : 'mt-3'} mr-3 relative scale-up-right`}>
        <div className={`relative flex flex-col dark:bg-purple-700 bg-green-200 rounded-md p-2 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <span className={`text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-64`}>{content}</span>
          <div className="flex ml-auto items-center gap-1 mt-1 cursor-pointer" onClick={() => ref.current.showModal()}>
            <time className="text-[10px] dark:text-gray-300">{time}</time>
            <FaCheck size={10} className="dark:text-gray-300"/>
          </div>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
      </li>
    )
  }

  // If is not my user id
  return (
    <li className={`flex gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2 scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser ? 'ml-[42px]' : 'rounded-tl-none'} p-2 bg-slate-200 dark:bg-gray-600 relative`}>
        <span className={`text-sm font-bold dark:text-white ${isSameUser ? 'hidden' : ''}`}>{fullname}</span>
        <span className="text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-64">{content}</span>
        {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        <time className="ml-auto text-[10px] cursor-pointer dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Image = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time }, ref) => {

  const modalPictureRef = useRef()

  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end relative mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-right`} ref={ref}>
        <div className={`xl:max-w-96 max-w-64 rounded-md dark:bg-purple-700 bg-green-200 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <div className="p-1 pb-5"> 
            <img src={content} alt="user-image" className="rounded-md shadow" onClick={() => modalPictureRef.current.showModal()} onError={(e) => e.target.src = "/picture-no-load.png"}/>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
        <dialog ref={modalPictureRef} className="backdrop:bg-[rgba(0,0,0,.90)] xl:max-w-96 max-w-60 outline-none" onClick={() => modalPictureRef.current.close()}>
          <img src={content} alt="picture" onError={(e) => e.target.src = "/picture-no-load.png"}/>
        </dialog>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2 scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{fullname}</span>
        <div className={`xl:max-w-96 max-w-64 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser ? '' : 'rounded-tl-none'} relative`}>
          <div className="p-1 pb-5">
            <img src={content} alt="user-image" className="rounded-md shadow" onClick={() => modalPictureRef.current.showModal()} onError={(e) => e.target.src = "/picture-no-load.png"}/>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-2 text-[10px] mt-auto cursor-pointer dark:text-gray-300">{time}</time>
      </div>
      <dialog ref={modalPictureRef} className="backdrop:bg-[rgba(0,0,0,.90)] xl:max-w-96 max-w-60 outline-none" onClick={() => modalPictureRef.current.close()}>
        <img src={content} alt="picture" onError={(e) => e.target.src = "/picture-no-load.png"}/>
      </dialog>
    </li>
  )
})

const Video = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} relative scale-up-right`} ref={ref}>
        <div className={`ml-auto xl:max-w-96 max-w-64 rounded-md dark:bg-purple-700 bg-green-200 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <div className="p-1 pb-5">
            <video src={content} controls className="shadow rounded-md"></video>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2 scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{fullname}</span>
        <div className={`xl:max-w-96 max-w-64 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser ? '' : 'rounded-tl-none'} relative`}>
          <div className="p-1 pb-5">
            <video src={content} controls className="rounded-md shadow"></video>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-2 cursor-pointer text-[10px] mt-auto dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Application = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end ${isSameUser ? 'mt-1' : 'mt-3'} mr-3 relative scale-up-right`}>
        <div className={`relative flex flex-col dark:bg-purple-700 bg-green-200 rounded-md p-2 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <div className="flex items-center gap-2">
            <FaFileAlt className="dark:text-white"/>
            <span className="dark:text-white">File</span>
            <a href={content}>
              <FaDownload className="dark:text-white"/>
            </a>
          </div>
          <div className="flex ml-auto items-center gap-1 mt-1 cursor-pointer" onClick={() => ref.current.showModal()}>
            <time className="text-[10px] dark:text-gray-300">{time}</time>
            <FaCheck size={10} className="dark:text-gray-300"/>
          </div>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
      </li>
    )
  }

  return (
    <li className={`flex gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2 scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser ? 'ml-[42px]' : 'rounded-tl-none'} p-2 bg-slate-200 dark:bg-gray-600 relative`}>
        <span className={`text-sm font-bold dark:text-white ${isSameUser ? 'hidden' : ''}`}>{fullname}</span>
        <div className="flex items-center gap-2">
          <FaFileAlt className="dark:text-white"/>
          <span className="dark:text-white">File</span>
          <a href={content}>
            <FaDownload className="dark:text-white"/>
          </a>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        <time className="ml-auto text-[10px] cursor-pointer dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Audio = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center justify-end mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} relative scale-up-right`} ref={ref}>
        <div className={`flex items-center gap-5 dark:bg-purple-700 bg-green-200 p-2 rounded-md ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <div className="relative">
            <img src={avatar} alt="user-avatar" className="w-10 h-10 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
            <FaMicrophone className="text-white absolute bottom-[-5px] left-[-5px] bg-blue-500 rounded-full p-1" size={20}/>
          </div>
          <Player audioURL={content}/>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2 scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{fullname}</span>
        <div className={`flex items-center gap-3 bg-slate-200 dark:bg-gray-600 p-2 rounded-md ${isSameUser ? '' : 'rounded-tl-none'} relative`}>
          <Player audioURL={content}/>
          <div className="relative">
            <img src={avatar} alt="user-avatar" className="w-10 h-10 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
            <FaMicrophone className="text-white absolute bottom-[-5px] right-[-5px] bg-blue-500 rounded-full p-1" size={20}/>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-14 cursor-pointer text-[10px] mt-auto dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Message = ({ message, userId, isSameUser, isSameDate, socket }) => {

  function formatTime(date) {
    const dateMessage = new Date(date)

    let hours = dateMessage.getHours(); // Obtiene la hora en formato 24h
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.'; // Determina si es AM o PM

    hours = hours % 12;
    hours = hours ? hours : 12; // Si es 0 (medianoche), se convierte a 12

    const formattedHours = dateMessage.getHours().toString().padStart(2, '0')
    const minutes = dateMessage.getMinutes().toString().padStart(2, '0')

    const time = `${formattedHours}:${minutes} ${ampm}`

    return time
  }

  function formatDate(date) {
    date = new Date(date)
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  console.log(message)

  const messageModalRef = useRef()
  
  const TypeMessage = {
    'text': <Text userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef}/>,
    'image': <Image userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef} />,
    'video': <Video userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef} />,
    'application': <Application userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef}/>,
    'audio': <Audio userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef}/>
  }
  
  return (
    <>
    <span className={`flex justify-center mt-2 p-2 text-sm dark:text-white ${!isSameDate ? 'inline-block' : 'hidden'}`}>{formatDate(message.date)}</span>
    {TypeMessage[message.format]}
    <MessageOptionsModal ref={messageModalRef} socket={socket} message={message}/>
    </>
  )
}

Text.displayName = 'Text Message'
Image.displayName = 'Image Message'
Video.displayName = 'Video Message'
Application.displayName = 'Application Message'
Audio.displayName = 'Audio Message'

Message.propTypes = {
  message: PropTypes.object,
  nextMessage: PropTypes.object,
  userId: PropTypes.string,
  isSameUser: PropTypes.bool,
  socket: PropTypes.object,
  isSameDate: PropTypes.bool
}

Text.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Image.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Video.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Application.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

Audio.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string
}

export default Message