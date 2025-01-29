import PropTypes from "prop-types"
import { FaPaperclip } from "react-icons/fa"
import { toast } from "react-toastify"

const CopyLinkGroupButton = ({ _id }) => {

 async function copyLinkGroup() {
    navigator.clipboard.writeText(`http://localhost:5173/group/${_id}`)
     .then(() => {
        toast.success('Link group copied succesfull')
      })
      .catch(() => {
        toast.error('Error to copy the link')
      })
}  

  return (
    <button aria-label="Copy group Link">
        <FaPaperclip size={20} onClick={copyLinkGroup} className="dark:text-white"/>
    </button>
  )
}

CopyLinkGroupButton.displayName = 'CopyLinkGroupButton'

CopyLinkGroupButton.propTypes = {
    _id: PropTypes.string
}

export default CopyLinkGroupButton