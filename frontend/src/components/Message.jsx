import PropTypes from "prop-types"
import { FaFileAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa"
import Player from "./Player";
import { forwardRef, useEffect, useRef, useState } from "react";
import MessageOptionsModal from "./MessageOptionsModal";
import { formatTime } from "../scripts/formatTime";
import { formatDate } from "../scripts/formatDate";
import { ClipLoader } from "react-spinners";
import { FaArrowLeftLong } from "react-icons/fa6";

const Text = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time, username, typeChat, isSameDate }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end ${isSameUser ? 'mt-1' : 'mt-3'} relative scale-up-right`}>
        <div className={`relative flex flex-col dark:bg-purple-700 bg-green-200 rounded-md px-2 py-1 ${isSameUser && isSameDate ? '' : 'rounded-tr-none'}`}>
          <div className="flex gap-3 items-center">
            <span className={`text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-64`}>{content}</span>
            <div className="flex ml-auto mt-auto items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
              <time className="text-[10px] dark:text-gray-300">{time}</time>
              <FaCheck size={10} className="dark:text-gray-300"/>
            </div>
          </div>
        </div>
        {isSameUser && isSameDate ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
      </li>
    )
  }

  // Message type group | Visible on groups
  if (typeChat === 'group') {
    return (
      <li className={`flex gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
        <img className={`w-8 h-8 rounded-full object-cover ${isSameUser && isSameDate ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
        <div className={`flex flex-col gap-1 rounded-md ${isSameUser && isSameDate ? 'ml-[42px]' : 'rounded-tl-none'} px-2 py-1 bg-slate-200 dark:bg-gray-600 relative`}>
        <div className="flex justify-between">
          <span className={`text-sm font-bold dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''}`}>{fullname}</span>
          <span className={`text-[12px] dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''} ml-3`}>{username}</span>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-64">{content}</span>
          <time className="ml-auto mt-auto text-[10px] cursor-pointer dark:text-gray-300">{time}</time>
        </div>
        {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
      </div>
      </li>
    )
  }

  // Message type private | Visible on privates
  return (
    <li className={`flex gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} px-2 py-1 bg-slate-200 dark:bg-gray-600 relative`}>
        <div className="flex gap-3 items-center">
          <span className="text-sm dark:text-white whitespace-pre-line break-words xl:max-w-96 max-w-64">{content}</span>
          <time className="ml-auto mt-auto text-[10px] cursor-pointer dark:text-gray-300">{time}</time>
        </div>
        {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
      </div>
    </li>
  )
})

const ImageMessage = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time, username, typeChat, isSameDate }, ref) => {

  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [openMenuImage, setOpenMenuImage] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = content;
    img.onload = () => {
      setLoaded(true);
    };
  }, [content]);

  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end relative ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-right`} ref={ref}>
        <div className={`xl:max-w-96 max-w-64 rounded-md dark:bg-purple-700 bg-green-200 ${isSameUser && isSameDate ? '' : 'rounded-tr-none'}`}>
          <div className={`p-1 pb-5 flex justify-center items-center ${!loaded ? `w-[100px] h-[100px]` : ``}`}> 
          {!loaded ? <ClipLoader/> : <img src={content} alt="user-image" className="rounded-md shadow object-cover max-h-[450px]" onClick={() => setSelectedImage(content)} onError={(e) => e.target.src = "/picture-no-load.png"}/>}
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>

        {selectedImage && (
        <div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >
          <div className={`${openMenuImage ? 'blur-in' : 'invisible'} absolute flex items-center gap-5 top-0 p-3 z-[60] bg-black bg-opacity-80 w-full`}>
              <button onClick={() => setSelectedImage(null)}>
                <FaArrowLeftLong size={20} color="white"/>
              </button>
              <div className="flex flex-col">
                <strong className="text-white text-sm">{fullname}</strong>
                <span className="text-white text-sm">{time}</span>
              </div>
          </div>

          <img
            src={selectedImage}
            alt="full size"
            className="max-w-full max-h-full transition-transform duration-300 scale-100 open-image"
            onClick={() => setOpenMenuImage(!openMenuImage)}
          />
        </div>
        )}
      </li>
    )
  }

  if (typeChat === 'group') {
    return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser && isSameDate ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 ${isSameUser && isSameDate ? 'ml-[42px]' : ''} relative`}>
        <div className="flex justify-between items-center">
          <span className={`dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''}`}>{fullname}</span>
          <span className={`dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''} text-sm`}>{username}</span>
        </div>
        <div className={`xl:max-w-96 max-w-64 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} relative`}>
          <div className={`p-1 pb-5 flex justify-center items-center ${!loaded ? `w-[100px] h-[100px]` : ``}`}>
          {!loaded ? <ClipLoader/> : <img src={content} alt="user-image" className="rounded-md shadow max-h-[450px]" onClick={() => setSelectedImage(content)} onError={(e) => e.target.src = "/picture-no-load.png"}/>}
          </div>
          {isSameUser ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-2 text-[10px] mt-auto cursor-pointer dark:text-gray-300">{time}</time>
      </div>
       {selectedImage && (
        <div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >

          <div className={`${openMenuImage ? 'blur-in' : 'invisible'} absolute flex items-center gap-5 top-0 p-3 z-[60] bg-black bg-opacity-80 w-full`}>
              <button onClick={() => setSelectedImage(null)}>
                <FaArrowLeftLong size={20} color="white"/>
              </button>
              <div className="flex flex-col">
                <strong className="text-white text-sm">{fullname}</strong>
                <span className="text-white text-sm">{time}</span>
              </div>
          </div>

          <img
            src={selectedImage}
            alt="full size"
            className="max-w-full max-h-full transition-transform duration-300 scale-100 open-image"
            onClick={() => setOpenMenuImage(!openMenuImage)}
          />
        </div>
        )}
    </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <div className={`flex flex-col gap-1 relative`}>
        <div className={`xl:max-w-96 max-w-64 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} relative`}>
          <div className={`p-1 pb-5 flex justify-center items-center ${!loaded ? `w-[100px] h-[100px]` : ``}`}>
            {!loaded ? <ClipLoader/> : <img src={content} alt="user-image" className="rounded-md shadow max-h-[450px]" onClick={() => setSelectedImage(content)} onError={(e) => e.target.src = "/picture-no-load.png"}/>}
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-2 text-[10px] mt-auto cursor-pointer dark:text-gray-300">{time}</time>
      </div>
       {selectedImage && (
        <div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >

          <div className={`${openMenuImage ? 'blur-in' : 'invisible'} absolute flex items-center gap-5 top-0 p-3 z-[60] bg-black bg-opacity-80 w-full`}>
              <button onClick={() => setSelectedImage(null)}>
                <FaArrowLeftLong size={20} color="white"/>
              </button>
              <div className="flex flex-col">
                <strong className="text-white text-sm">{fullname}</strong>
                <span className="text-white text-sm">{time}</span>
              </div>
          </div>

          <img
            src={selectedImage}
            alt="full size"
            className="max-w-full max-h-full transition-transform duration-300 scale-100 open-image"
            onClick={() => setOpenMenuImage(!openMenuImage)}
          />
        </div>
        )}
    </li>
  )
})

const Video = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time, username, typeChat, isSameDate }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center ${isSameUser ? 'mt-1' : 'mt-3'} relative scale-up-right`} ref={ref}>
        <div className={`ml-auto xl:max-w-96 max-w-64 rounded-md dark:bg-purple-700 bg-green-200 ${isSameUser && isSameDate ? '' : 'rounded-tr-none'}`}>
          <div className="p-1 pb-5">
            <video src={content} controls className="shadow rounded-md"></video>
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
        </div>
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  if (typeChat === 'group') {
    return (
     <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser && isSameDate ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 ${isSameUser && isSameDate ? 'ml-[42px]' : ''} relative`}>
        <div className="flex justify-between items-center">
          <span className={`dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''}`}>{fullname}</span>
          <span className={`dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''} text-sm`}>{username}</span>
        </div>
        <div className={`xl:max-w-96 max-w-64 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} relative`}>
          <div className="p-1 pb-5">
            <video src={content} controls className="rounded-md shadow"></video>
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-2 cursor-pointer text-[10px] mt-auto dark:text-gray-300">{time}</time>
      </div>
    </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <div className={`flex flex-col gap-1 relative`}>
        <div className={`xl:max-w-96 max-w-64 rounded-md bg-slate-200 dark:bg-gray-600 ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} relative`}>
          <div className="p-1 pb-5">
            <video src={content} controls className="rounded-md shadow"></video>
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-2 cursor-pointer text-[10px] mt-auto dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Application = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time, username, typeChat, isSameDate }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex justify-end ${isSameUser ? 'mt-1' : 'mt-3'} relative scale-up-right`}>
        <div className={`relative flex flex-col dark:bg-purple-700 bg-green-200 rounded-md p-2 ${isSameUser && isSameDate ? '' : 'rounded-tr-none'}`}>
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
        {isSameUser && isSameDate ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
      </li>
    )
  }

  if (typeChat === 'group') {
    return (
      <li className={`flex gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser && isSameDate ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser && isSameDate ? 'ml-[42px]' : 'rounded-tl-none'} py-1 px-2 bg-slate-200 dark:bg-gray-600 relative`}>
        <div className="flex justify-between items-center">
          <span className={`dark:text-white text-sm font-bold ${isSameUser && isSameDate ? 'hidden' : ''}`}>{fullname}</span>
          <span className={`dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''} text-[12px] ml-3`}>{username}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaFileAlt className="dark:text-white"/>
          <span className="dark:text-white">File</span>
          <a href={content}>
            <FaDownload className="dark:text-white"/>
          </a>
        </div>
        {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        <time className="ml-auto text-[10px] cursor-pointer dark:text-gray-300">{time}</time>
      </div>
    </li>
    )
  }

  return (
    <li className={`flex gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <div className={`flex flex-col gap-1 rounded-md ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} py-1 px-2 bg-slate-200 dark:bg-gray-600 relative`}>
        <div className="flex items-center gap-2">
          <FaFileAlt className="dark:text-white"/>
          <span className="dark:text-white">File</span>
          <a href={content}>
            <FaDownload className="dark:text-white"/>
          </a>
        </div>
        {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        <time className="ml-auto text-[10px] cursor-pointer dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Audio = forwardRef(({ userId, _id, content, fullname, avatar, isSameUser, time, username, typeChat, isSameDate }, ref) => {
  // If is my user id
  if (userId === _id) {
    return (
      <li className={`flex items-center justify-end ${isSameUser ? 'mt-1' : 'mt-3'} relative scale-up-right`} ref={ref}>
        <div className={`flex items-center gap-5 dark:bg-purple-700 bg-green-200 p-2 rounded-md ${isSameUser && isSameDate ? '' : 'rounded-tr-none'}`}>
          <div className="relative">
            <img src={avatar} alt="user-avatar" className="w-10 h-10 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
            <FaMicrophone className="text-white absolute bottom-[-5px] left-[-5px] bg-blue-500 rounded-full p-1" size={20}/>
          </div>
          <Player audioURL={content}/>
        </div>
        {isSameUser && isSameDate ? '' : <div className="absolute top-0 right-0 w-0 border-t-[10px] border-t-green-200 dark:border-t-purple-700 border-r-[10px] border-r-transparent translate-x-2"></div>}
        <div className="absolute bottom-0 right-2 flex items-center gap-1 cursor-pointer" onClick={() => ref.current.showModal()}>
          <time className="text-[10px] mt-auto dark:text-gray-300">{time}</time>
          <FaCheck size={10} className="dark:text-gray-300"/>
        </div>
      </li>
    )
  }

  if (typeChat === 'group') {
    return (
      <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <img className={`w-8 h-8 rounded-full object-cover ${isSameUser && isSameDate ? 'hidden' : ''}`} src={avatar} alt="user-avatar" onError={e => e.target.src = '/picture-user-no-load.png'}/>
      <div className={`flex flex-col gap-1 ${isSameUser && isSameDate ? 'ml-[42px]' : ''} relative`}>
        <div className="flex justify-between items-center">
          <span className={`dark:text-white text-sm font-bold ${isSameUser && isSameDate ? 'hidden' : ''}`}>{fullname}</span>
          <span className={`dark:text-white ${isSameUser && isSameDate ? 'hidden' : ''} text-[12px] ml-3`}>{username}</span>
        </div>
        <div className={`flex items-center gap-3 bg-slate-200 dark:bg-gray-600 p-2 rounded-md ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} relative`}>
          <Player audioURL={content}/>
          <div className="relative">
            <img src={avatar} alt="user-avatar" className="w-10 h-10 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
            <FaMicrophone className="text-white absolute bottom-[-5px] right-[-5px] bg-blue-500 rounded-full p-1" size={20}/>
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-14 cursor-pointer text-[10px] mt-auto dark:text-gray-300">{time}</time>
      </div>
    </li>
    )
  }

  return (
    <li className={`flex items-start gap-2.5 ${isSameUser ? 'mt-1' : 'mt-3'} scale-up-left`} ref={ref}>
      <div className={`flex flex-col gap-1 relative`}>
        <div className={`flex items-center gap-3 bg-slate-200 dark:bg-gray-600 p-2 rounded-md ${isSameUser && isSameDate ? '' : 'rounded-tl-none'} relative`}>
          <Player audioURL={content}/>
          <div className="relative">
            <img src={avatar} alt="user-avatar" className="w-10 h-10 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
            <FaMicrophone className="text-white absolute bottom-[-5px] right-[-5px] bg-blue-500 rounded-full p-1" size={20}/>
          </div>
          {isSameUser && isSameDate ? '' : <div className="absolute top-0 left-0 w-0 h-0 border-t-[10px] dark:border-t-gray-600 border-t-slate-200 border-r-[10px] border-r-transparent -translate-x-2 rotate-90"></div>}
        </div>
        <time className="absolute bottom-0 right-14 cursor-pointer text-[10px] mt-auto dark:text-gray-300">{time}</time>
      </div>
    </li>
  )
})

const Message = ({ message, userId, isSameUser, isSameDate, socket, typeChat }) => {

  const messageModalRef = useRef()
  
  const TypeMessage = {
    'text': <Text userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} username={message.user.username} typeChat={typeChat} isSameDate={isSameDate} ref={messageModalRef}/>,
    'image': <ImageMessage userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} username={message.user.username} typeChat={typeChat} isSameDate={isSameDate} ref={messageModalRef} />,
    'video': <Video userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} username={message.user.username} typeChat={typeChat} isSameDate={isSameDate} ref={messageModalRef} />,
    'application': <Application userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} username={message.user.username} typeChat={typeChat} isSameDate={isSameDate} ref={messageModalRef}/>,
    'audio': <Audio userId={userId} _id={message.user._id} fullname={message.user.fullname} avatar={message.user.avatar} content={message.content} isSameUser={isSameUser} time={formatTime(message.date)} username={message.user.username} typeChat={typeChat} isSameDate={isSameDate} ref={messageModalRef}/>
  }
  
  return (
    <>
    <span className={`${!isSameDate ? 'flex' : 'hidden'} justify-center mt-2 p-2 text-sm dark:text-white `}>{formatDate(message.date)}</span>
    {TypeMessage[message.format]}
    <MessageOptionsModal ref={messageModalRef} socket={socket} message={message} typeChat={typeChat}/>
    </>
  )
}

Text.displayName = 'Text Message'
ImageMessage.displayName = 'Image Message'
Video.displayName = 'Video Message'
Application.displayName = 'Application Message'
Audio.displayName = 'Audio Message'

Message.propTypes = {
  message: PropTypes.object,
  nextMessage: PropTypes.object,
  userId: PropTypes.string,
  isSameUser: PropTypes.bool,
  socket: PropTypes.object,
  isSameDate: PropTypes.bool,
  typeChat: PropTypes.string
}

Text.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  typeChat: PropTypes.string,
  isSameDate: PropTypes.bool,
  username: PropTypes.string
}

ImageMessage.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  typeChat: PropTypes.string,
  isSameDate: PropTypes.bool,
  username: PropTypes.string
}

Video.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  typeChat: PropTypes.string,
  isSameDate: PropTypes.bool,
  username: PropTypes.string
}

Application.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  typeChat: PropTypes.string,
  isSameDate: PropTypes.bool,
  username: PropTypes.string
}

Audio.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  fullname: PropTypes.string,
  avatar: PropTypes.string,
  isSameUser: PropTypes.bool,
  time: PropTypes.string,
  typeChat: PropTypes.string,
  isSameDate: PropTypes.bool,
  username: PropTypes.string
}

export default Message