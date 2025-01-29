import PropTypes from "prop-types"

const MediaUploadOption = ({ icon: Icon, typeFiles, extensions }) => {
  return (
    <label className="flex items-center gap-3 transition hover:opacity-50 cursor-pointer mt-3 mb-3">
        <Icon size={20}/>
        <span className="text-sm">{typeFiles}</span>
        <input type="file" hidden accept={extensions}/>
    </label>
  )
}

MediaUploadOption.propTypes = {
    icon: PropTypes.func,
    typeFiles: PropTypes.string,
    extensions: PropTypes.string
}

export default MediaUploadOption