import { forwardRef } from "react"
import { useChatStore } from "../store/chatStore"
import { IoSend } from "react-icons/io5"
import PropTypes from "prop-types"

const SendMessageButton = forwardRef(({ socket, chatId, userId, typeChat }, ref ) => {

    const { setMessage, message } = useChatStore()

    function sendMessage() {
        if (!message.trim()) return
    
        socket.emit('send-message', { message: {
          format: 'text',
          content: message,
          chatId,
          user: userId,
          typeChat: typeChat
        }})
        
        ref.current.value = ''
        setMessage('')
    }  

  return (
    <button onClick={sendMessage}>
      <IoSend size={20} className="dark:text-white"/>
    </button>
  )
})

SendMessageButton.displayName = 'SendMessageButton'

SendMessageButton.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
  userId: PropTypes.string,
  typeChat: PropTypes.string
}

export default SendMessageButton