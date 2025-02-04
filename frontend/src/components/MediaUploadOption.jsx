import PropTypes from "prop-types"
import { useChatStore } from "../store/chatStore"
import { uploadMediaFile } from "../firebase/config"
import { toast } from "react-toastify"

const MediaUploadOption = ({ icon: Icon, typeFiles, extensions, socket, id, userId }) => {

  const setIsOpenMenu = useChatStore(state => state.setIsOpenMenu)

  async function handleFile(e) {
    const file = e.target.files[0]

    if (!file) return

    const formatFile = file.type.split('/').shift()

    const urlFile = await uploadMediaFile(file)

    if (!urlFile) return toast.error('Error to upload file')

    socket.emit('message', { message: {
      format: formatFile,
      content: urlFile,
      chatId: id,
      user: userId
    }})
  }

  return (
    <label className="flex items-center gap-3 transition hover:opacity-50 cursor-pointer mt-3 mb-3">
        <Icon size={20}/>
        <span className="text-sm">{typeFiles}</span>
        <input type="file" hidden accept={extensions} onClick={() => setIsOpenMenu(false)} onChange={handleFile}/>
    </label>
  )
}

MediaUploadOption.propTypes = {
    icon: PropTypes.func,
    typeFiles: PropTypes.string,
    extensions: PropTypes.string,
    socket: PropTypes.object,
    id: PropTypes.string,
    userId: PropTypes.string
}

export default MediaUploadOption