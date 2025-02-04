import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
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

const socket = io('http://localhost:3000', {
  withCredentials: true
})

const Chat = () => {

  const { isOpenMenu, setIsOpenMenu } = useChatStore()
  const [message, setMessage] = useState('')
  const userId = useUserStore(state => state.userId)
  
  const textareaMessageRef = useRef()

  const { image, name, messages, id, addMessage, isChatMobileOpen, setIsChatMobileOpen } = useChatStore()

  useEffect(() => {
    socket.on('new-message', ({ newMessage }) => {
      addMessage(newMessage)
    })

    return () => {
      socket.off('new-message'); // Elimina el evento al desmontar
    }
  }, [addMessage])
  

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
    textareaMessageRef.current.style.height = "auto";
    setMessage('')
  }

  function handleInput() {
    const textarea = textareaMessageRef.current
    textarea.style.height = "auto"; // Resetea la altura
    textarea.style.height = textarea.scrollHeight + "px"; // Ajusta la altura
  }

  return (
    <section className={`xl:border-l border-black dark:border-white flex flex-col ${!isChatMobileOpen ? 'hidden xl:flex' : ''}`}>
      <header className="p-3 flex items-center gap-3 border-b border-black dark:border-white">
        <button onClick={() => setIsChatMobileOpen(false)} className="xl:hidden">
           <FaArrowLeft className="dark:text-white"/>
        </button>
        <img src={image} alt="picture-chat" className="w-16 h-16 rounded-full"/>
        <span className="dark:text-white">{name}</span>
      </header>
      <div className="relative flex flex-1 w-full">
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full pb-3 [scrollbar-width:thin]">
            <article className="flex items-center justify-center gap-3 mb-8 bg-blue-400 text-white p-1 bg-opacity-60 border-b">
              <TbLock className="hidden xl:block"/>
              <p className="text-[12px] text-center xl:text-left">The messages send to this Chat are cifred end-to-end. Nobody outside this chat, not even Chatgroup can read or listen them.</p>
            </article>
            {
              messages.map(message => (
                <Message key={message._id} message={message} userId={userId}/>
              ))
            }
        </ul>
      </div>
      <footer className="flex items-center gap-3 p-4 mt-auto border-t border-black dark:border-white relative">
        <div className={`transition-all ${isOpenMenu ? 'scale-100 bottom-16' : 'scale-0 bottom-0 pointer-events-none'} absolute left-[1px] bg-white shadow-xl dark:bg-black dark:text-white px-2`}>
          <ul>
            <MediaUploadOption icon={AiFillPicture} typeFiles={'Pictures'} extensions={'.jpg, .png, .webp'}/>
            <MediaUploadOption icon={TbPlayerPlayFilled } typeFiles={'Videos'} extensions={'.mp3'}/>
            <MediaUploadOption icon={LuFiles} typeFiles={'Files'} extensions={'.pdf, .docx'}/>
            <MediaUploadOption icon={FaMicrophone} typeFiles={'Audio'} extensions={'.mp3'}/>
          </ul>
        </div>
        <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
         <IoAddCircle size={30} className="dark:text-white"/>
        </button>
        <textarea placeholder="Write a message..." className="w-full dark:bg-black dark:text-white indent-1 resize-none h-auto outline-none max-h-48" ref={textareaMessageRef} rows={1} onInput={handleInput} onChange={(e) => {
          setMessage(e.target.value)
          console.log(message)
        }} onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
          } else if (e.key === 'Enter' && e.shiftKey) {
            // e.preventDefault()
            setMessage((prev) => prev + "\n")
          }
         }}/>
          {
          message ? 
          <button onClick={sendMessage}>
            <IoSend size={20} className="dark:text-white"/>
          </button>
          :
          <Microphone />
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