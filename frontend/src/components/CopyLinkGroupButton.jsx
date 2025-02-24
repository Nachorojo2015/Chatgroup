import PropTypes from "prop-types"
import { toast } from "react-toastify"
import { TbCopyPlusFilled } from "react-icons/tb";

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
    <button aria-label="Copy group Link" className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70" onClick={copyLinkGroup}>
        <TbCopyPlusFilled />
        <span>Copy Link</span>
    </button>
  )
}

CopyLinkGroupButton.displayName = 'CopyLinkGroupButton'

CopyLinkGroupButton.propTypes = {
    _id: PropTypes.string
}

export default CopyLinkGroupButton