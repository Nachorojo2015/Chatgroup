import PropTypes from "prop-types"
import { useChatStore } from "../store/chatStore"

const MediaUploadOption = ({ icon: Icon, typeFiles, extensions }) => {

  const setIsOpenMenu = useChatStore(state => state.setIsOpenMenu)

  async function handleFile() {
    
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
    extensions: PropTypes.string
}

export default MediaUploadOption