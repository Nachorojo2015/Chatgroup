import PropTypes from "prop-types"
import { toast } from "react-toastify"
import { TbCopyPlusFilled } from "react-icons/tb";

const CopyLinkGroupButton = ({ _id }) => {

 async function copyLinkGroup() {

    const isDark = document.querySelector('html').className === 'dark'

    const route = window.location.toString()

    navigator.clipboard.writeText(route.includes('/group') ? route : `${route}group/${_id}`)
     .then(() => {
        toast.success('Link group copied succesfull', {
          theme: isDark ? 'dark' : 'light'
        })
      })
      .catch(() => {
        toast.error('Error to copy the link', {
          theme: isDark ? 'dark' : 'light'
        })
      })
 }   

  return (
    <button aria-label="Copy group Link" className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70" onClick={copyLinkGroup}>
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