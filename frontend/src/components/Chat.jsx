import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useEffect } from "react";
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

const socket = io('http://localhost:3000', {
  withCredentials: true
})

const Chat = () => {

  const { isOpenMenu, setIsOpenMenu, setMessage, message } = useChatStore()
  const userId = useUserStore(state => state.userId)
  
  const { image, name, messages, id, addMessage, isChatMobileOpen, setIsChatMobileOpen, activeMicro, setActiveMicro, setIdChat } = useChatStore()

  useEffect(() => {
    document.addEventListener('click', () => {
      const menuChatOptions = document.getElementById('menu-chat-options')
      const menuChatOptionsButton = document.getElementById('menu-chat-options-button')

      if (menuChatOptions && menuChatOptionsButton && !menuChatOptions.contains(event.target) && !menuChatOptionsButton.contains(event.target)) {
        setIsOpenMenu(false)
      }
    })

    function scrollToBottom() {
      const chatContainer = document.getElementById('chatContainer')
      chatContainer.scrollTop = chatContainer.scrollHeight
    }

    socket.on('new-message', ({ newMessage }) => {
      const chatId = newMessage.chatId
      if (chatId !== id) document.getElementById(`chat-id-${chatId}`).classList.remove('hidden')
      if (chatId === id) {
        addMessage(newMessage)
        scrollToBottom()
      }
    })

    return () => {
      socket.off('new-message'); // Elimina el evento al desmontar
    }
  }, [addMessage, setIsOpenMenu, id])

  const textareaMessageRef = useRef()
  
  if (!image || !name || !id) 
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
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full pb-3 [scrollbar-width:thin]" id="chatContainer">
            <article className="flex items-center justify-center gap-3 mb-8 bg-blue-400 text-white p-1 bg-opacity-60 border-b">
              <TbLock className="hidden xl:block"/>
              <p className="text-[12px] text-center xl:text-left">The messages send to this Chat are cifred end-to-end. Nobody outside this chat, not even Chatgroup can read or listen them.</p>
            </article>
            {
              messages.map((message, index) => (
                <Message key={message._id} message={messages[index]} userId={userId} nextMessage={messages[index+1]}/>
              ))
            }
        </ul>
      </div>
      <footer className="flex items-center gap-3 p-4 mt-auto border-t border-black dark:border-white relative">
        <div id="menu-chat-options" className={`transition-all ${isOpenMenu ? 'scale-100 bottom-16' : 'scale-0 bottom-0 pointer-events-none'} absolute left-[1px] bg-white shadow-xl dark:bg-black dark:text-white px-2`}>
          <ul>
            <MediaUploadOption icon={AiFillPicture} typeFiles={'Pictures'} extensions={'.jpg, .png, .webp'} socket={socket} id={id} userId={userId}/>
            <MediaUploadOption icon={TbPlayerPlayFilled } typeFiles={'Videos'} extensions={'.mp4'} socket={socket} id={id} userId={userId}/>
            <MediaUploadOption icon={LuFiles} typeFiles={'Files'} extensions={'.pdf, .docx'} socket={socket} id={id} userId={userId}/>
            <MediaUploadOption icon={FaMicrophone} typeFiles={'Audio'} extensions={'.mp3'} socket={socket} id={id} userId={userId}/>
          </ul>
        </div>
        <button id="menu-chat-options-button" onClick={() => setIsOpenMenu(!isOpenMenu)} className={`${activeMicro ? 'hidden' : ''}`}>
         <IoAddCircle size={30} className="dark:text-white"/>
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