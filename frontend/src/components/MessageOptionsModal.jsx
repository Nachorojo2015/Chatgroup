import PropTypes from "prop-types"
import { forwardRef } from "react"
import { IoMdClose } from "react-icons/io"
import { MdContentCopy, MdDelete } from "react-icons/md"
import { toast } from "react-toastify"

const MessageOptionsModal = forwardRef(({ socket, message, typeChat }, ref) => {

  async function copyMessage() {
      const isDark = document.querySelector('html').className === 'dark'
      navigator.clipboard.writeText(message.content)
       .then(() => {
          toast.success('Message copied', {
            theme: isDark ? 'dark' : 'light'
          })
        })
        .catch(() => {
          toast.error('Error to copy the message', {
            theme: isDark ? 'dark' : 'light'
          })
        })
    }
    
    async function deleteMessage() {
      socket.emit('delete-message', { messageId: message._id, typeChat, content: message.content, date: message.content, fullname: message.user.fullname })
    }

  return (
     <dialog className="min-w-32 p-2 rounded-md dark:bg-gray-700 dark:text-white" ref={ref} onClick={() => ref.current.close()}>
          <button>
            <IoMdClose size={20}/>
          </button>
          <div className="flex flex-col gap-1 justify-center mt-2">
            <button className="flex items-center justify-center gap-2 transition hover:opacity-40 dark:text-white" onClick={copyMessage}>
              <MdContentCopy />
              <span>Copy</span>
            </button>
            <button className="flex items-center justify-center gap-2 transition hover:opacity-40 text-red-500" onClick={deleteMessage}>
              <MdDelete />
              <span>Delete</span>
            </button>
          </div>
    </dialog>
  )
})

MessageOptionsModal.displayName = 'MessageOptionsModal'

MessageOptionsModal.propTypes = {
    socket: PropTypes.object,
    message: PropTypes.object,
    typeChat: PropTypes.string
}

export default MessageOptionsModal