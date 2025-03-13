import PropTypes from "prop-types"
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import MediaUploadOption from "./MediaUploadOption";
import { useChatStore } from "../store/chatStore";
import Microphone from "./Microphone";
import { FiVideo } from "react-icons/fi";
import { useRef } from "react";
import { useUserStore } from "../store/userStore";
import Message from "./Message";
import { FaArrowLeft } from "react-icons/fa6";
import MessageInput from "./MessageInput";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import ChatAdvice from "./ChatAdvice";

const Chat = ({ socket, BACKEND_URL }) => {

  const { setMessage, message } = useChatStore()
  const { userId, fetchUserData, updateLastMessage } = useUserStore()
  const [menu, setMenu] = useState(false)
  const chatContainer = useRef(null)
  const textareaMessageRef = useRef(null)
  const btnMenuRef = useRef()
  
  const { type, image, name, messages, id, setMessages, isChatMobileOpen, setIsChatMobileOpen, activeMicro, setActiveMicro, setIdChat, loader, setUnSeen, unSeen } = useChatStore()

  useEffect(() => {
    const handleReceiveMessage = ({ newMessage }) => {
      const chatId = newMessage.chatId
      
      updateLastMessage({
        chatId,
        content: newMessage.format === 'text' ? newMessage.content : newMessage.format,
        date: newMessage.date,
        fullname: newMessage.user.fullname
      })

      if (chatId !== id && !unSeen.includes(chatId)) {
        setUnSeen([...unSeen, chatId])
      } else {
        setMessages([...messages, newMessage])
      }
    }

    const handleReceiveDeleteMessage = ({ messageDeleted }) => {
      setMessages(messages.filter(mes => mes._id !== messageDeleted._id))
      const lastMessage = messages[messages.length - 2]
      updateLastMessage({
          chatId: lastMessage.chatId,
          content: lastMessage.format === 'text' ? lastMessage.content : lastMessage.format,
          date: lastMessage.date,
          fullname: lastMessage.user.fullname
        })
    }

    const handleErrorMessage = ({ error }) => {
      toast.error(error)
    }

    const handleUpdateUserData = () => {
      fetchUserData(BACKEND_URL)
    }

    socket.on('receive-message', handleReceiveMessage)
    socket.on('message-error', handleErrorMessage)
    socket.on('receive-message-deleted', handleReceiveDeleteMessage)
    socket.on('update-user-data', handleUpdateUserData)

    scrollToBottom()

    return () => {
      socket.off('receive-message')
      socket.off('message-error')
      socket.off('receive-message-deleted')
      socket.off('update-user-data')
    }
  }, [setMessages, socket, id, setUnSeen, unSeen, messages, fetchUserData, updateLastMessage, BACKEND_URL])
  
  if (!id) 
  return ( 
    <div className="hidden xl:grid place-content-center place-items-center border-black dark:border-white xl:border-l w-[70%]">
     <span className="dark:text-white px-5 py-1 dark:bg-gray-800 bg-slate-200 rounded-full font-bold">Select a chat</span>
    </div>
  )

  function sendMessage() {
    if (!message.trim()) return

    socket.emit('send-message', { message: {
      format: 'text',
      content: message,
      chatId: id,
      user: userId,
      typeChat: type
    }})
    
    textareaMessageRef.current.value = ''
    setMessage('')
  }

function closeChatMobile() {
  setIsChatMobileOpen(false)
  setIdChat('')
}

function scrollToBottom() {
  if (chatContainer.current) {
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight
  }
}

function openMenu() {
  setMenu(!menu)
  document.addEventListener('click', () => {
    if (!btnMenuRef.current.contains(event.target)) {
      setMenu(false)
      document.body.classList.remove('pointer-events-none');
    }
  })
}

function isSameDate(prevMessage, nextMessage) {
  const datePrevMessage = new Date(prevMessage)
  const dateNextMessage = new Date(nextMessage)
  return datePrevMessage.getFullYear() === dateNextMessage.getFullYear() &&
         datePrevMessage.getMonth() === dateNextMessage.getMonth() &&
         datePrevMessage.getDate() === dateNextMessage.getDate()
}

  return (
    <section className={`xl:border-l border-black dark:border-white flex flex-col ${!isChatMobileOpen ? 'hidden xl:flex' : ''} xl:w-[70%] w-full relative`}>
      <header className="border-b shadow w-full p-3 flex items-center gap-3 border-black dark:border-white">
        <button onClick={closeChatMobile} className="xl:hidden">
           <FaArrowLeft className="dark:text-white"/>
        </button>
        <img src={image} alt="picture-chat" className="xl:w-14 xl:h-14 w-10 h-10 rounded-full object-cover" onError={e => e.target.src = "/picture-no-load.png"}/>
        <span className="dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
      </header>
      <div className="relative flex flex-1">
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full pb-16 [scrollbar-width:none]" ref={chatContainer}>
            {
              loader ? 
              <div className="grid place-content-center place-items-center mt-60">
                <ClipLoader />
              </div>
              :
              <>
              <ChatAdvice />
              {
                messages.map((message, index) => (
                  <Message key={message._id} message={message} userId={userId} isSameUser={messages[index - 1]?.user?._id === message?.user?._id} isSameDate={isSameDate(messages[index - 1]?.date, message?.date)} socket={socket}/>
                ))
              }
              </>
            }
        </ul>
      </div>
      <footer className="fixed bottom-0 z-[100] xl:w-[70%] w-full py-1 dark:bg-black bg-white flex items-center gap-3">
        <div className="relative flex items-center ml-1">
          <div className={`absolute flex flex-col gap-3 bottom-9 shadow dark:bg-gray-800 bg-white rounded-lg p-2 transition ${menu ? 'opacity-100 scale-up-bottom' : 'opacity-0 invisible'}`}>
            <MediaUploadOption icon={IoImageOutline} typeFile={'Pictures'} extensions={'.jpg, .png, .webp'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
            <MediaUploadOption icon={FiVideo} typeFile={'Videos'} extensions={'.mp4'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
            <MediaUploadOption icon={LuFiles} typeFile={'Files'} extensions={'.pdf, .docx'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
            <MediaUploadOption icon={IoMusicalNotesOutline} typeFile={'Audios'} extensions={'.mp3'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
          </div>
        <button onClick={openMenu} ref={btnMenuRef} className={`ml-5 transition hover:opacity-60 ${activeMicro ? 'hidden' : ''}`}>
          <FiPaperclip size={20} className="dark:text-white"/>
        </button>
        </div>
        <MessageInput socket={socket} userId={userId} id={id} ref={textareaMessageRef}/>
        {
          message && !activeMicro ? 
          <button onClick={sendMessage} className="mr-5">
            <IoSend size={20} className="dark:text-white"/>
          </button>
          :
          <Microphone activeMicro={activeMicro} setActiveMicro={setActiveMicro} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL}type={type}/>
        }
      </footer>
    </section>
  )
}


Chat.displayName = 'Chat'

Chat.propTypes = {
  chatSelected: PropTypes.bool,
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default Chat