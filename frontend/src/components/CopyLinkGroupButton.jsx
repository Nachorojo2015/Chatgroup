import PropTypes from "prop-types"
import { TbCopyPlusFilled } from "react-icons/tb";
import { copyLinkGroup } from "../utils/copyLinkGroup";

const CopyLinkGroupButton = ({ _id }) => {  

  function copyLink() {
    copyLinkGroup(_id)
  }

  return (
    <button aria-label="Copy group Link" className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70" onClick={copyLink}>
        <TbCopyPlusFilled className="dark:text-white"/>
        <span className="dark:text-white">Copy Link</span>
    </button>
  )
}

CopyLinkGroupButton.displayName = 'CopyLinkGroupButton'

CopyLinkGroupButton.propTypes = {
    _id: PropTypes.string
}

export default CopyLinkGroupButton