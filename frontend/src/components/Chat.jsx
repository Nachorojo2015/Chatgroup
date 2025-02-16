import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useCallback, useEffect } from "react";
import { AiFillPicture } from "react-icons/ai";
import { LuFiles } from "react-icons/lu";
import MediaUploadOption from "./MediaUploadOption";
import { useChatStore } from "../store/chatStore";
import Microphone from "./Microphone";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { io } from 'socket.io-client'
import { useRef } from "react";
import { useUserStore } from "../store/userStore";
import Message from "./Message";
import { FaArrowLeft } from "react-icons/fa6";
import MessageInput from "./MessageInput";
import { ClipLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

const socket = io('http://localhost:3000', {
  withCredentials: true
})

const Chat = () => {

  const { isOpenMenu, setIsOpenMenu, setMessage, message } = useChatStore()
  const userId = useUserStore(state => state.userId)
  const chatContainer = useRef(null)
  const textareaMessageRef = useRef(null)
  const menuChatOptions = useRef(null)
  const menuChatOptionsButton = useRef(null)
  
  const { image, name, messages, id, addMessage, isChatMobileOpen, setIsChatMobileOpen, activeMicro, setActiveMicro, setIdChat, loader } = useChatStore()

  const formattedMessages = messages.map((message, index) => {
    const prevMessage = messages[index - 1] ? messages[index - 1].user._id : ""

    return {
      ...message,
      sequence: prevMessage !== message.user._id ? 1 : 0
    }
  })

  const handleClickOutside = useCallback((event) => {
    if (
      menuChatOptions.current &&
      menuChatOptionsButton.current &&
      !menuChatOptions.current.contains(event.target) &&
      !menuChatOptionsButton.current.contains(event.target)
    ) {
      setIsOpenMenu(false);
    }
  }, [setIsOpenMenu]); 

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    socket.on('new-message', ({ newMessage }) => {
      const chatId = newMessage.chatId
      if (chatId !== id) document.getElementById(`chat-id-${chatId}`).classList.remove('hidden')
      if (chatId === id) {
        addMessage(newMessage)
      }
    })

    return () => {
      socket.off('new-message'); // Elimina el evento al desmontar
      document.removeEventListener('click', handleClickOutside)
    }
  }, [addMessage, setIsOpenMenu, id, handleClickOutside])

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
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
        <img src={image} alt="picture-chat" className="w-16 h-16 rounded-full"/>
        <span className="dark:text-white">{name}</span>
      </header>
      <div className="relative flex flex-1 w-full">
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full pb-3 [scrollbar-width:thin]" ref={chatContainer}>
            {
              loader ? 
              <div className="grid place-content-center place-items-center mt-60">
                <ClipLoader />
              </div>
              :
              formattedMessages.map(message => (
                <Message key={message._id} message={message} userId={userId} />
              ))
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
  chatSelected: PropTypes.bool
}

export default Chat