import PropTypes from "prop-types"
import { useChatStore } from "../store/chatStore"
import { toast } from "react-toastify"

const MediaUploadOption = ({ icon: Icon, extensions, socket, id, userId }) => {

  const setIsOpenMenu = useChatStore(state => state.setIsOpenMenu)

  async function handleFile(e) {
    const file = e.target.files[0]

    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const toastId = toast.loading('Sending file...')

    try {
      const response = await fetch('http://localhost:3000/messages/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        toast.error(errorMessage)
      }

      const data = await response.json()

      const formatFile = file.type.split('/').shift()
      const fileUrl = data.fileUrl

      socket.emit('send-message', { message: {
        format: formatFile,
        content: fileUrl,
        chatId: id,
        user: userId
      }})

      toast.update(toastId, {
        render: 'File update',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <label className="flex items-center gap-3 transition hover:opacity-50 cursor-pointer mt-3 mb-3">
        <Icon size={20}/>
        <input type="file" disabled={ id === 'Block' } hidden accept={extensions} onClick={() => setIsOpenMenu(false)} onChange={handleFile}/>
    </label>
  )
}

MediaUploadOption.propTypes = {
    icon: PropTypes.func,
    extensions: PropTypes.string,
    socket: PropTypes.object,
    id: PropTypes.string,
    userId: PropTypes.string
}

export default MediaUploadOption