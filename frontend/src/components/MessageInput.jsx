import { forwardRef } from "react"
import { useChatStore } from "../store/chatStore"
import PropTypes from "prop-types"

const MessageInput = forwardRef(({ socket, userId, id }, ref) => {

  const { setMessage, message, activeMicro, type, isBlocked } = useChatStore()

  function sendMessage(e) {
      e.preventDefault()
      if (!message.trim()) return
  
      socket.emit('send-message', { message: {
        format: 'text',
        content: message,
        chatId: id,
        user: userId,
        typeChat: type
      }})
      
      ref.current.value = ''
      setMessage('')
  }

  return (
  <textarea
  placeholder={`${isBlocked ? 'Blocked' : !activeMicro ? 'Write a message' : ''}`}
  disabled={ activeMicro || isBlocked }
  className={`[field-sizing:content] p-2.5 w-full text-sm cursor-auto text-gray-900 rounded-lg bg-transparent dark:placeholder-gray-400 dark:text-white h-auto max-h-32 resize-none outline-none ${activeMicro ? 'hidden' : ''}`}
  ref={ref}
  onChange={(e) => {
    setMessage(e.target.value);
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
    }
  }}
/>
  )
})

MessageInput.displayName = 'MessageInput'

MessageInput.propTypes = {
    socket: PropTypes.object,
    userId: PropTypes.string,
    id: PropTypes.string
}

export default MessageInput