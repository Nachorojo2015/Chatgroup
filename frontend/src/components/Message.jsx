import PropTypes from "prop-types"
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Player from "./Player";
import { forwardRef, useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

const Text = forwardRef(({ userId, _id, content, username, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end ${isSameUser ? 'mt-1' : 'mt-3'}  mr-3 items-center relative`}>
        <span className={`pr-20 pl-3 text-sm bg-slate-200 p-2 rounded-md ${isSameUser ? '' : 'rounded-tr-none'}  dark:bg-gray-600 dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56`}>{content}</span>
        {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-slate-200 dark:border-t-gray-600 border-r-[10px] border-r-transparent translate-x-2"></div>}
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  // If is not my user id
  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser ? 'ml-[42px]' : 'rounded-tl-none'} p-2 bg-slate-200 dark:bg-gray-600 relative`}>
        <span className={`text-sm font-bold dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <span className="pr-20 text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-56">{content}</span>
        {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer">
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </div>
    </li>
  )
})

const Image = forwardRef(({ userId, _id, content, username, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end relative mr-3 ${isSameUser ? 'mt-1' : 'mt-3'}`} ref={ref}>
        <div className={`xl:max-w-96 max-w-60 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <div className="p-2 pb-5">
            <img src={content} alt="user-image" className="rounded-md object-cover shadow"/>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-slate-200 dark:border-t-gray-600 border-r-[10px] border-r-transparent translate-x-2"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`xl:max-w-96 max-w-60 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser ? '' : 'rounded-tl-none'} relative`}>
          <div className="p-2 pb-5">
            <img src={content} alt="user-image" className="rounded-md object-cover shadow"/>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer">
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </div>
    </li>
  )
})

const Video = forwardRef(({ userId, _id, content, username, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} relative`} ref={ref}>
        <div className={`ml-auto xl:max-w-96 max-w-60 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <div className="p-2 pb-5">
            <video src={content} controls className="shadow object-cover rounded-md"></video>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-slate-200  dark:border-t-gray-600 border-r-[10px] border-r-transparent translate-x-2"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`xl:max-w-96 max-w-60 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser ? '' : 'rounded-tl-none'} relative`}>
          <div className="p-2 pb-5">
            <video src={content} controls className="rounded-md object-cover shadow"></video>
          </div>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer">
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </div>
    </li>
  )
})

const Application = forwardRef(({ userId, _id, content, username, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex xl:w-[16%] w-[45%] ml-auto items-center justify-end gap-3 mr-3 mt-3 p-2 pr-20 rounded-md ${isSameUser ? '' : 'rounded-tr-none'} relative bg-slate-200 dark:bg-gray-600 dark:text-white`} ref={ref}>
        <FaFileAlt />
        File
        <a href={content}>
          <FaDownload />
        </a>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-slate-200  dark:border-t-gray-600 border-r-[10px] border-r-transparent translate-x-2"></div>}
      </li>
    )
  }

  return (
    <li className="flex items-start gap-2.5 mt-3 ml-2" ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-10' : ''}`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`flex items-center gap-3 p-2 rounded-md ${isSameUser ? '' : 'rounded-tl-none'} relative pr-20 bg-slate-200 dark:bg-gray-600 dark:text-white`}>
          <FaFileAlt />
          File
          <a href={content}>
            <FaDownload />
         </a>
         <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer">
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
         </div>
         {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
      </div>
    </li>
  )
})

const Audio = forwardRef(({ userId, _id, content, username, avatar, isSameUser, time }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center justify-end mr-3 ${isSameUser ? 'mt-1' : 'mt-3'} relative`} ref={ref}>
        <div className={`flex items-center gap-5 bg-slate-200 dark:bg-gray-600 p-2 rounded-md ${isSameUser ? '' : 'rounded-tr-none'}`}>
          <img src={avatar} alt="user-avatar" className="w-12 h-12 rounded-full object-cover"/>
          <Player audioURL={content}/>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-slate-200 dark:border-t-gray-600 border-r-[10px] border-r-transparent translate-x-2"></div>}
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} ml-2`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser ? 'hidden' : ''}`} src={avatar} alt="user-avatar"/>
      <div className={`flex flex-col gap-1 ${isSameUser ? 'ml-[42px]' : ''} relative`}>
        <span className={`dark:text-white ${isSameUser ? 'hidden' : ''}`}>{username}</span>
        <div className={`bg-slate-200 dark:bg-gray-600 p-4 rounded-md ${isSameUser ? '' : 'rounded-tl-none'} relative`}>
          <Player audioURL={content}/>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer">
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </div>
    </li>
  )
})

const Message = ({ message, userId, isSameUser, socket }) => {

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

  async function copyMessage() {
    messageModalRef.current.close()
    navigator.clipboard.writeText(message.content)
     .then(() => {
        toast.success('Message copied')
      })
      .catch(() => {
        toast.error('Error to copy the message')
      })
  }

  async function deleteMessage() {
    messageModalRef.current.close()
    socket.emit('delete-message', { messageId: message._id })
  }

  const messageModalRef = useRef()
  
  const TypeMessage = {
    'text': <Text userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef}/>,
    'image': <Image userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef} />,
    'video': <Video userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef} />,
    'application': <Application userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef}/>,
    'audio': <Audio userId={userId} _id={message.user._id} username={message.user.username} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} ref={messageModalRef}/>
  }
  
  return (
    <>
    {TypeMessage[message.format]}
    <dialog className="p-3 rounded-md dark:bg-gray-700 dark:text-white" ref={messageModalRef}>
      <button onClick={() => messageModalRef.current.close()}>
        <IoMdClose size={20}/>
      </button>
      <div className="flex flex-col gap-1 justify-center mt-3">
        <button className="flex items-center justify-center gap-2 transition hover:opacity-40 dark:text-white" onClick={copyMessage}>
          <MdContentCopy />
          <span>Copy</span>
        </button>
        <button className="flex items-center justify-center gap-2 transition hover:opacity-40 text-red-500" onClick={deleteMessage}>
          <MdDelete />
          <span>Delete</span>
        </button>
      </div>
    </dialog>
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
  socket: PropTypes.object
}

Text.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  socket: PropTypes.object,
  messageId: PropTypes.string
}

Image.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  socket: PropTypes.object,
  messageId: PropTypes.string
}

Video.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  socket: PropTypes.object,
  messageId: PropTypes.string
}

Application.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  socket: PropTypes.object,
  messageId: PropTypes.string
}

Audio.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  socket: PropTypes.object,
  messageId: PropTypes.string
}

export default Message