import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";
import { IoAddCircle } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { LuFiles } from "react-icons/lu";


const Chat = ({ chatSelected }) => {

  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  if (!chatSelected) 
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

  return (
    <section className="xl:border-l border-black dark:border-white flex flex-col">
      <header className="p-3 flex items-center gap-3 border-b border-black">
        <img src="" alt="picture-chat" className="w-16 h-16 rounded-full"/>
        <span className="dark:text-white"></span>
      </header>
      <div className="relative flex flex-1">
        <ul className="overflow-y-auto h-full absolute w-full">

        </ul>
      </div>
      <footer className="flex items-center gap-3 p-4 mt-auto border-t border-black relative">
        <div className={`${open ? 'hidden' : ''} absolute top-[-116px] left-0 bg-slate-200 p-3 rounded-xl`}>
          <ul>
            <label className="flex items-center gap-3 transition hover:opacity-50 cursor-pointer">
              <AiFillPicture size={25}/>
              Pictures and Videos
              <input type="file" hidden/>
            </label>
            <label className="flex items-center gap-3 mt-2 transition hover:opacity-50 cursor-pointer">
              <LuFiles size={25}/>
              Files
              <input type="file" hidden/>
            </label>
            <label className="flex items-center gap-3 mt-2 transition hover:opacity-50 cursor-pointer">
              <FaMicrophone size={25}/>
              Audios
              <input type="file" hidden/>
            </label>
          </ul>
        </div>
        <button onClick={() => setOpen(!open)}>
         <IoAddCircle size={30} className="dark:text-white"/>
        </button>
        <input placeholder="Write a message..." className="w-full indent-2 dark:bg-black dark:text-white" onChange={(e) => setMessage(e.target.value)}/>
        {
          message ? 
          <button>
            <IoSend size={20} className="dark:text-white"/>
          </button>
        :
          <button>
            <FaMicrophone size={20} className="dark:text-white"/>
          </button>
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