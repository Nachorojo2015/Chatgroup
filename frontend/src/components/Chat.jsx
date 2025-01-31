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
import { ClipLoader } from "react-spinners";
import Message from "./Message";

const socket = io('http://localhost:3000', {
  withCredentials: true
})

const Chat = () => {

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const userId = useUserStore(state => state.userId)
  
  const inputMessageRef = useRef()

  const { image, name, messages, id, addMessage } = useChatStore()

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

  function sendMessage(e) {
    e.preventDefault()
    if (!message) return

    socket.emit('message', { message: {
      format: 'text',
      content: message,
      chatId: id,
      user: userId
    }})
    
    inputMessageRef.current.value = ''
    setMessage('')
  }

  return (
    <section className="xl:border-l border-black dark:border-white flex flex-col">
      <header className="p-3 flex items-center gap-3 border-b border-black dark:border-white">
        <img src={image} alt="picture-chat" className="w-16 h-16 rounded-full"/>
        <span className="dark:text-white">{name}</span>
      </header>
      <div className="relative flex flex-1">
        <ul className="overflow-y-auto h-full absolute w-full pb-3 [scrollbar-width:thin]">
          {
            !messages
            ?
            <ClipLoader/>
            :
            <>
            <article className="flex items-center justify-center mb-8 gap-2 bg-blue-400 text-white p-1 bg-opacity-60 border-b">
              <TbLock/>
              <p className="text-sm">The messages send to this Chat are cifred end-to-end. Nobody outside this chat, not even Chatgroup can read or listen them.</p>
            </article>
            {
              messages.map(message => (
                <Message key={message._id} message={message} userId={userId}/>
              ))
            }
            </>
          }
        </ul>
      </div>
      <footer className="flex items-center gap-3 p-4 mt-auto border-t border-black dark:border-white relative">
        <div className={`transition-all ${open ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'} absolute top-[-141px] left-0 bg-slate-200 px-2`}>
          <ul>
            <MediaUploadOption icon={AiFillPicture} typeFiles={'Pictures'} extensions={'.jpg, .png, .webp'}/>
            <MediaUploadOption icon={TbPlayerPlayFilled } typeFiles={'Videos'} extensions={'.mp3'}/>
            <MediaUploadOption icon={LuFiles} typeFiles={'Files'} extensions={'.pdf, .docx'}/>
            <MediaUploadOption icon={FaMicrophone} typeFiles={'Audio'} extensions={'.mp3'}/>
          </ul>
        </div>
        <button onClick={() => setOpen(!open)}>
         <IoAddCircle size={30} className="dark:text-white"/>
        </button>
        <form className="flex w-full gap-3 items-center" onSubmit={sendMessage}>
         <input placeholder="Write a message..." className="w-full indent-2 dark:bg-black dark:text-white" ref={inputMessageRef} onChange={(e) => setMessage(e.target.value)}/>
          {
          message ? 
          <button type="submit">
            <IoSend size={20} className="dark:text-white"/>
          </button>
          :
          <Microphone />
          }
        </form>
      </footer>
    </section>
  )
}


Chat.displayName = 'Chat'

Chat.propTypes = {
  chatSelected: PropTypes.bool
}

export default Chat