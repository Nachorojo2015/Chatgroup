import PropTypes from "prop-types"
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
    <button aria-label="Copy group Link" className="text-sm transition hover:opacity-70" onClick={copyLinkGroup}>
        Copy Link
    </button>
  )
}

CopyLinkGroupButton.displayName = 'CopyLinkGroupButton'

CopyLinkGroupButton.propTypes = {
    _id: PropTypes.string
}

export default CopyLinkGroupButton