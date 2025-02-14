import { forwardRef } from "react"
import { useChatStore } from "../store/chatStore"
import PropTypes from "prop-types"

const MessageInput = forwardRef(({ socket, userId, id }, ref) => {

  const { setMessage, message, activeMicro } = useChatStore()

  function sendMessage(e) {
      e.preventDefault()
      if (!message.trim()) return
  
      socket.emit('message', { message: {
        format: 'text',
        content: message,
        chatId: id,
        user: userId
      }})
      
      ref.current.value = ''
      setMessage('')
  }

  return (
    <textarea placeholder="Write a message..." className={`${activeMicro ? 'hidden' : ''} [field-sizing:content] w-full dark:bg-black dark:text-white indent-1 resize-none h-auto outline-none max-h-48`} ref={ref} onChange={(e) => {
      setMessage(e.target.value)
    }} onKeyDown={(e) => {
       if (e.key === 'Enter' && !e.shiftKey) {
          sendMessage(e)
    }
    }}/>
  )
})

MessageInput.displayName = 'MessageInput'

MessageInput.propTypes = {
    socket: PropTypes.object,
    userId: PropTypes.string,
    id: PropTypes.string
}

export default MessageInput