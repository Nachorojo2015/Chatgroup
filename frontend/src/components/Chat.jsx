import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { useEffect } from "react";
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
import { CiLock } from "react-icons/ci";
import { IoMusicalNotesOutline } from "react-icons/io5";

const Chat = ({ socket }) => {

  const { setMessage, message } = useChatStore()
  const userId = useUserStore(state => state.userId)
  const chatContainer = useRef(null)
  const textareaMessageRef = useRef(null)
  
  const { image, name, messages, id, setMessages, isChatMobileOpen, setIsChatMobileOpen, activeMicro, setActiveMicro, setIdChat, loader, setUnSeen, unSeen } = useChatStore()

  useEffect(() => {
    const handleReceiveMessage = ({ newMessage }) => {
      const chatId = newMessage.chatId
      if (chatId !== id && !unSeen.includes(chatId)) {
        setUnSeen([...unSeen, chatId])
      } else {
        setMessages([...messages, newMessage])
      }
    }

    const handleReceiveDeleteMessage = ({ messageDeleted }) => {
      setMessages(messages.filter(mes => mes._id !== messageDeleted._id))
    }

    const handleErrorMessage = ({ error }) => {
      toast.error(error)
    }

    socket.on('receive-message', handleReceiveMessage)
    socket.on('message-error', handleErrorMessage)
    socket.on('receive-message-deleted', handleReceiveDeleteMessage)

    return () => {
      socket.off('receive-message')
      socket.off('message-error')
      socket.off('receive-message-deleted')
    }
  }, [setMessages, socket, id, setUnSeen, unSeen, messages])

  useEffect(() => {
    scrollToBottom()
  }, [id])
  
  if (!id) 
  return ( 
    <div className="hidden xl:grid place-content-center place-items-center border-black dark:border-white xl:border-l">
      <img src="/chat.svg" alt="brand-app-logue" className="w-52 h-52"/> 
      <p className="text-3xl dark:text-white">Init a conversation</p>
      <div className="flex items-center gap-3 mt-3 dark:text-white">
        <TbLock/>
        <p>End-to-end encryption</p>
      </div>
    </div>
  )

  function sendMessage() {
    if (!message.trim()) return

    socket.emit('send-message', { message: {
      format: 'text',
      content: message,
      chatId: id,
      user: userId
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

  return (
    <section className={`xl:border-l border-black dark:border-white flex flex-col ${!isChatMobileOpen ? 'hidden xl:flex' : ''}`}>
      <header className="p-3 flex items-center gap-3 border-b border-black dark:border-white">
        <button onClick={closeChatMobile} className="xl:hidden">
           <FaArrowLeft className="dark:text-white"/>
        </button>
        <img src={image} alt="picture-chat" className="w-14 h-14 rounded-full object-cover"/>
        <span className="dark:text-white">{name}</span>
      </header>
      <div className="relative flex flex-1 w-full">
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full pb-3 pr-1" ref={chatContainer}>
            {
              loader ? 
              <div className="grid place-content-center place-items-center mt-60">
                <ClipLoader />
              </div>
              :
              <>
              <article className="flex flex-col gap-2 justify-center items-center m-auto p-2 rounded-lg mt-3 w-[90%] bg-yellow-200 bg-opacity-50">
                <CiLock className="dark:text-white" size={20}/>
                <p className="text-[10px] dark:text-white">Conversations in this chat are end-to-end encrypted to protect your privacy. Please avoid sharing sensitive information such as passwords, bank details or confidential personal information. Your security is our priority.</p>
              </article>
              {
                messages.map((message, index) => (
                  <Message key={message._id} message={message} userId={userId} isSameUser={messages[index - 1]?.user?._id === message?.user?._id} socket={socket}/>
                ))
              }
              </>
            }
        </ul>
      </div>
      <footer className="flex items-center gap-3 mt-auto border-black p-3 dark:border-white relative">
        <ul className="flex items-center absolute right-10 dark:text-white">
            {
              message && !activeMicro ? 
              <button onClick={sendMessage}>
                <IoSend size={20} className="dark:text-white z-10"/>
              </button>
              :
              <div className="flex items-center gap-3">
                {!activeMicro ? 
                <>
                <MediaUploadOption icon={IoImageOutline} extensions={'.jpg, .png, .webp'} socket={socket} id={id} userId={userId}/>
                <MediaUploadOption icon={FiVideo} extensions={'.mp4'} socket={socket} id={id} userId={userId}/>
                <MediaUploadOption icon={LuFiles} extensions={'.pdf, .docx'} socket={socket} id={id} userId={userId}/>
                <MediaUploadOption icon={IoMusicalNotesOutline} extensions={'.mp3'} socket={socket} id={id} userId={userId}/>
                </>
                :
                ''
                }
                <Microphone activeMicro={activeMicro} setActiveMicro={setActiveMicro} socket={socket} id={id} userId={userId}/>
              </div>
            }
        </ul>
        <MessageInput socket={socket} userId={userId} id={id} ref={textareaMessageRef}/>
      </footer>
    </section>
  )
}


Chat.displayName = 'Chat'

Chat.propTypes = {
  chatSelected: PropTypes.bool,
  socket: PropTypes.object
}

export default Chat