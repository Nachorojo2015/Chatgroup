import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useEffect } from "react";
import { AiFillPicture } from "react-icons/ai";
import { LuFiles } from "react-icons/lu";
import MediaUploadOption from "./MediaUploadOption";
import { useChatStore } from "../store/chatStore";
import Microphone from "./Microphone";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useRef } from "react";
import { useUserStore } from "../store/userStore";
import Message from "./Message";
import { FaArrowLeft } from "react-icons/fa6";
import MessageInput from "./MessageInput";
import { ClipLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { CiLock } from "react-icons/ci";

const Chat = ({ socket }) => {

  const { isOpenMenu, setIsOpenMenu, setMessage, message } = useChatStore()
  const userId = useUserStore(state => state.userId)
  const chatContainer = useRef(null)
  const textareaMessageRef = useRef(null)
  const menuChatOptions = useRef(null)
  const menuChatOptionsButton = useRef(null)
  
  const { image, name, messages, id, setMessages, isChatMobileOpen, setIsChatMobileOpen, activeMicro, setActiveMicro, setIdChat, loader, setUnSeen, unSeen } = useChatStore()

  useEffect(() => {
    const handleReceiveMessage = ({ newMessage }) => {
      const chatId = newMessage.chatId
      console.log(chatId)
      if (chatId !== id && !unSeen.includes(chatId)) {
        setUnSeen([...unSeen, chatId])
      } else {
        setMessages([...messages, newMessage])
      }
    }

    const handleErrorMessage = ({ error }) => {
      toast.error(error)
    }

    socket.on('receive-message', handleReceiveMessage)
    socket.on('message-error', handleErrorMessage)

    return () => {
      socket.off('receive-message')
      socket.off('message-error')
    }
  }, [setMessages, socket, id, setUnSeen, unSeen, messages])

  useEffect(() => {
    scrollToBottom()
  }, [id])

  useEffect(() => {
    function handleMenuOptions(event) {
      if (
        menuChatOptions.current &&
        menuChatOptionsButton.current &&
        !menuChatOptions.current.contains(event.target) &&
        !menuChatOptionsButton.current.contains(event.target)
      ) {
        setIsOpenMenu(false)
      }
    }
    document.addEventListener('click', handleMenuOptions)

    return () => {
      document.removeEventListener('click', handleMenuOptions)
    }
  }, [setIsOpenMenu])
  
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

    socket.emit('message', { message: {
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
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full pb-3 pr-1 [scrollbar-width:none]" ref={chatContainer}>
            {
              loader ? 
              <div className="grid place-content-center place-items-center mt-60">
                <ClipLoader />
              </div>
              :
              <>
              <article className="flex items-center gap-1 m-auto p-2 rounded-lg text-center mt-3 w-[80%] bg-yellow-200 bg-opacity-50">
                <CiLock className="dark:text-white" size={20}/>
                <p className="text-[10px] dark:text-white">Conversations in this chat are end-to-end encrypted to protect your privacy. Please avoid sharing sensitive information such as passwords, bank details or confidential personal information. Your security is our priority.</p>
              </article>
              {
                messages.map((message, index) => (
                  <Message key={message._id} message={message} userId={userId} isSameUser={messages[index - 1]?.user?._id === message?.user?._id}/>
                ))
              }
              </>
            }
        </ul>
      </div>
      <footer className="flex items-center gap-3 p-4 mt-auto border-t border-black dark:border-white relative">
        <div ref={menuChatOptions} className={`transition-all ${isOpenMenu ? 'scale-100 bottom-[63px]' : 'scale-0 bottom-0 pointer-events-none'} rounded-md absolute left-0 bg-white shadow dark:bg-black dark:text-white px-2`}>
          <ul>
            <MediaUploadOption icon={AiFillPicture} typeFiles={'Pictures'} extensions={'.jpg, .png, .webp'} socket={socket} id={id} userId={userId}/>
            <MediaUploadOption icon={TbPlayerPlayFilled } typeFiles={'Videos'} extensions={'.mp4'} socket={socket} id={id} userId={userId}/>
            <MediaUploadOption icon={LuFiles} typeFiles={'Files'} extensions={'.pdf, .docx'} socket={socket} id={id} userId={userId}/>
            <MediaUploadOption icon={FaMicrophone} typeFiles={'Audio'} extensions={'.mp3'} socket={socket} id={id} userId={userId}/>
          </ul>
        </div>
        <button ref={menuChatOptionsButton} onClick={() => setIsOpenMenu(!isOpenMenu)} className={`${activeMicro ? 'hidden' : ''}`}>
         <IoMdAdd  size={30} className={`dark:text-white ${isOpenMenu ? 'hidden' : 'spin-icon'}`}/>
         <IoMdClose size={30} className={`dark:text-white ${isOpenMenu ? 'spin-icon' : 'hidden'}`}/>
        </button> 
        <MessageInput socket={socket} userId={userId} id={id} ref={textareaMessageRef}/>
          {
          message && !activeMicro ? 
          <button onClick={sendMessage}>
            <IoSend size={20} className="dark:text-white"/>
          </button>
          :
          <Microphone activeMicro={activeMicro} setActiveMicro={setActiveMicro} socket={socket} id={id} userId={userId}/>
          }
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