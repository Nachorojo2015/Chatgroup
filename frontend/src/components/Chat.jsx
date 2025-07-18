import PropTypes from "prop-types"
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
import SendMessageButton from "./SendMessageButton";
import EmojiMart from "./EmojiMart";
import { isSameDate } from "../utils/isSameDate";
import OptionsChat from "./OptionsChat";
import ChatPreview from "./ChatPreview";
// import { useParams } from "react-router-dom";

const Chat = ({ socket, BACKEND_URL }) => {

  // const idChat = useParams();

  const { message } = useChatStore()
  const { userId, fetchUserData, updateLastMessage, chats, username } = useUserStore()
  const [menu, setMenu] = useState(false)
  const chatContainer = useRef(null)
  const textareaMessageRef = useRef(null)
  const btnMenuRef = useRef()
  const pictureGroupModal = useRef()
  
  const { type, image, name, messages, id, setMessages, isChatMobileOpen, setIsChatMobileOpen, activeMicro, setActiveMicro, setIdChat, loader, setUnSeen, unSeen } = useChatStore()

  useEffect(() => {
    const handleReceiveMessage = ({ newMessage }) => {
      const chatId = newMessage.chatId
      const { format, content, date, user } = newMessage
      updateLastMessage({
        chatId,
        content: format === 'text' ? content :format,
        date: date,
        fullname: user.fullname
      })

      if (chatId !== id) {
        setUnSeen({
          ...unSeen,
          [chatId]: (unSeen[chatId] || 0) + 1  // Suma 1 al contador
        });
      } else {
        setMessages([...messages, newMessage])
      }
    }

    const handleReceiveDeleteMessage = ({ messageDeleted }) => {
      const updatedMessages = messages.filter(mes => mes._id !== messageDeleted._id)
      const lastMessage = updatedMessages[updatedMessages.length - 1]
      console.log(!lastMessage)
      updateLastMessage({
          chatId: messageDeleted.chatId,
          content: !lastMessage ? '' : lastMessage.format === 'text' ? lastMessage.content : lastMessage.format,
          date: !lastMessage ? '' : lastMessage.date,
          fullname: !lastMessage ? '' : lastMessage.user.fullname
      })
      setMessages(updatedMessages)
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
  
  if (!id) return <ChatPreview />

function closeChatMobile() {
  setIsChatMobileOpen(false)
  setIdChat('')
  setActiveMicro(false)
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

  const chat = chats.find(chat => chat._id === id)

  return (
    <section className={`flex flex-col ${!isChatMobileOpen ? 'hidden xl:flex' : ''} xl:w-[75%] w-full relative bg-contain bg-[url(/background-light-chat.png)] dark:bg-[url(/background-dark-chat.png)]`}>
      <header className="w-full p-2 px-5 flex items-center gap-3 relative bg-white dark:bg-[rgb(33,33,33)]">
        <button onClick={closeChatMobile} className="xl:hidden">
           <FaArrowLeft className="dark:text-white"/>
        </button>
        <img src={image} alt="picture-chat" className="xl:w-12 xl:h-12 w-10 h-10 rounded-full object-cover" onClick={() => pictureGroupModal.current.showModal()} onError={e => e.target.src = `${type === 'private' ? '/picture-user-no-load.png' : '/picture-group-no-load.png'}`}/>
        <div className="flex flex-col">
          <span className="dark:text-white whitespace-nowrap overflow-hidden text-ellipsis font-bold">{name}</span>
          <span className="dark:text-gray-400 text-[12px]">{type === 'group' ? `${chat.members.length} members ` : chat.users.find(user => user.username !== username).username}</span>
        </div>
        <OptionsChat chatId={id} socket={socket} BACKEND_URL={BACKEND_URL}/>

        <dialog ref={pictureGroupModal} className="backdrop:bg-[rgba(0,0,0,.90)] xl:max-w-96 max-w-60 outline-none" onClick={() => pictureGroupModal.current.close()}>
          <div>
            <span className="absolute whitespace-nowrap overflow-hidden text-ellipsis bg-black p-2 w-full text-white bg-opacity-40">{name}</span>
            <img src={image} alt="picture-group" className="object-cover xl:w-96 xl:h-96 w-64 h-64" onError={e => e.target.src = `${type === 'private' ? '/picture-user-no-load.png' : '/picture-group-no-load.png'}`}/>
          </div>
        </dialog>
      </header>
      <div className="relative flex flex-1">
        <ul className="overflow-y-auto overflow-x-hidden absolute h-full w-full [scrollbar-width:none] px-3 py-3 bg-transparent" ref={chatContainer}>
            {
              loader ? 
              <div className="grid place-content-center place-items-center mt-60">
                <ClipLoader />
              </div>
              :
              messages.map((message, index) => (
                  <Message key={message._id} message={message} userId={userId} isSameUser={messages[index - 1]?.user?._id === message?.user?._id} isSameDate={isSameDate(messages[index - 1]?.date, message?.date)} socket={socket} typeChat={type}/>
              ))
            }
        </ul>
      </div>
      <footer className="shadow w-full py-1 px-5 flex items-center gap-3 bg-white dark:bg-[rgb(33,33,33)]">
        <EmojiMart message={message} ref={textareaMessageRef}/>
        <MessageInput socket={socket} userId={userId} id={id} ref={textareaMessageRef}/>
        {
          message && !activeMicro ? 
          <SendMessageButton socket={socket} chatId={id} userId={userId} typeChat={type} ref={textareaMessageRef}/>
          :
          <>
          <div className="relative flex items-center">
            <div className={`absolute z-[200] flex flex-col gap-3 bottom-9 right-0 shadow min-w-36 dark:bg-[rgb(33,33,33)] bg-white rounded-lg p-3 transition ${menu ? 'opacity-100 scale-up-bottom' : 'opacity-0 invisible'}`}>
              <MediaUploadOption icon={IoImageOutline} typeFile={'Pictures'} extensions={'.jpg, .png, .webp'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
              <MediaUploadOption icon={FiVideo} typeFile={'Videos'} extensions={'.mp4'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
              <MediaUploadOption icon={LuFiles} typeFile={'Files'} extensions={'.pdf, .docx'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
              <MediaUploadOption icon={IoMusicalNotesOutline} typeFile={'Audios'} extensions={'.mp3'} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL} type={type}/>
            </div>
            <button onClick={openMenu} ref={btnMenuRef} className={`transition hover:opacity-60 ${activeMicro ? 'hidden' : ''}`}>
              <FiPaperclip size={20} className="dark:text-white"/>
            </button>
          </div>
          <Microphone activeMicro={activeMicro} setActiveMicro={setActiveMicro} socket={socket} id={id} userId={userId} BACKEND_URL={BACKEND_URL}type={type}/>
          </>
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