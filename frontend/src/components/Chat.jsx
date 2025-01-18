import PropTypes from "prop-types"
import { TbLock } from "react-icons/tb";


const Chat = ({ chatSelected }) => {


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
    <div className="xl:border-l-4 dark:border-white">
      chat
    </div>
  )
}


Chat.displayName = 'Chat'

Chat.propTypes = {
  chatSelected: PropTypes.bool
}

export default Chat