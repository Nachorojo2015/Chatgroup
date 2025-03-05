import PropTypes from "prop-types"
import { toast } from "react-toastify"

const MediaUploadOption = ({ icon: Icon, extensions, socket, id, userId, BACKEND_URL }) => {

  async function handleFile(e) {
    const file = e.target.files[0]

    if (!file) return

    const fileSizeInMb = file.size / 1024 / 1024

    const isDark = document.querySelector('html').className === 'dark'
    if (fileSizeInMb > 10) return toast.error('The file size is greater than 10mb', {
      theme: isDark ? 'dark' : 'light'
    })

    const formData = new FormData()
    formData.append('file', file)

    const toastId = toast.loading('Sending file...', {
      theme: isDark ? 'dark' : 'light'
    })

    try {
      const response = await fetch(`${BACKEND_URL}/messages/upload`, {
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

      if (!fileUrl) return toast.update(toastId, {
        render: 'Error to upload file',
        type: 'error',
        isLoading: false,
        autoClose: 1500
      })

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
      toast.update(toastId, {
        render: 'Error in server',
        type: 'error',
        isLoading: false,
        autoClose: 1500
      })
    }
  }

  return (
    <label className="flex items-center gap-3 transition hover:opacity-50 cursor-pointer mt-3 mb-3">
        <Icon size={20}/>
        <input type="file" disabled={ id === 'Block' } hidden accept={extensions} onChange={handleFile}/>
    </label>
  )
}

MediaUploadOption.propTypes = {
    icon: PropTypes.func,
    extensions: PropTypes.string,
    socket: PropTypes.object,
    id: PropTypes.string,
    userId: PropTypes.string,
    BACKEND_URL: PropTypes.string
}

export default MediaUploadOption