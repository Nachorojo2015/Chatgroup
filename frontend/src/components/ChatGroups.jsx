import PropTypes from "prop-types"
import { useRef } from "react"
import { CiSearch } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"

const ChatGroups = ({ groups }) => {

  const modalRef = useRef()

  async function searchGroups() {
    
  }

  return (
    <div className="w-full overflow-y-auto h-full absolute">
      <div className="flex flex-col items-center justify-center mt-5">
        <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalRef.current.showModal()}>Search New Groups</button>
      </div>

      <dialog ref={modalRef} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px]">
        <IoMdClose className="cursor-pointer ml-auto" size={22} onClick={() => modalRef.current.close()}/>
        <div className="flex items-center gap-3">
          <input placeholder="Search new groups" className="mt-3 p-1 rounded w-full indent-1 border-2 border-black"/>
          <CiSearch size={30} className="cursor-pointer mt-2"/>
        </div>
      </dialog>
    </div>
  )
}

ChatGroups.displayName = 'ChatGroups'

ChatGroups.propTypes = {
    groups: PropTypes.array
}

export default ChatGroups