import { FaPaperclip } from "react-icons/fa";
import { FaArrowLeftLong, FaPenClip } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { SiPrivateinternetaccess } from "react-icons/si"; 
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useUserStore } from "../store/userStore";
import { useRef } from "react";
import { MdOutlineGroup } from "react-icons/md";
import { MdGroups } from "react-icons/md";

const MyGroups = ({ group }) => {

  const { picture, name, visibility, members, _id } = group

  const { fetchUserData, username } = useUserStore()

  const modalRef = useRef()

  async function copyLinkGroup() {
    navigator.clipboard.writeText(`http://localhost:5173/group/${_id}`)
      .then(() => {
        toast.success('Link group copied succesfull')
      })
      .catch(() => {
        toast.error('Error to copy the link')
      })
  }

  async function deleteGroup() {
    const toastId = toast.loading('Deleting Group...')
    try {
      const response = await fetch(`http://localhost:3000/group/delete/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        return toast.error(errorMessage)
      }

      toast.update(toastId, {
        render: 'Group deleted!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })

      fetchUserData()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <article
      className="flex items-center w-full gap-3 transition hover:bg-slate-200 dark:hover:bg-opacity-20 p-3"
    >
      <img
        src={picture}
        alt="avatar user"
        className="w-16 h-16 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="dark:text-white font-bold">{name}</span>
        <div>
          <span className="border-r-2 border-black pr-2">
            {visibility}
            {visibility === "Public" ? (
              <TbWorld className="inline ml-1" size={20} />
            ) : (
              <SiPrivateinternetaccess className="inline ml-1 mb-[2px]" size={20} />
            )}
          </span>
          <span className="ml-2">
            <FaUser className="inline mr-1 mb-1" />
            {members?.length}
          </span>
        </div>
      </div>

      <div className="flex items-center ml-auto gap-5">
        <FaPaperclip size={20} onClick={copyLinkGroup} className="cursor-pointer"/>
        <FaPenClip size={20} onClick={() => modalRef.current.showModal()} className="cursor-pointer"/>
        <FaTrash size={20} onClick={deleteGroup} className="cursor-pointer"/>
      </div>


      <dialog ref={modalRef} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px] min-w-[95%]">
        <FaArrowLeftLong onClick={() => modalRef.current.close()} className="cursor-pointer"/>

        <label htmlFor="picture" className="pointer-events-none">
          <img src={picture} alt="picture-group" className="w-36 h-36 m-auto rounded-full transition cursor-pointer pointer-events-auto hover:opacity-60"/>
          <input type="file" hidden id="picture" name="picture" accept=".jpg, .png, .webp"/>
        </label>

        <input placeholder="Name of the group" className="m-auto block mt-3 border-b border-black outline-none" autoFocus/>

        <hr className="mt-5 border-gray-500"/>

        <input placeholder="Description (Optional)" className="mt-5 w-full outline-none bg-gray-400 text-white placeholder:text-white p-2"/>
        
        <hr className="mt-5 border-gray-500"/>

        <div className="flex justify-between mt-5">
         <p className="flex items-center gap-3">
          <span className="font-semibold">Type of group</span>
          <MdOutlineGroup size={30}/>
         </p>
         <select name="visibility" className="outline-none">
          <option value="public">Public</option>
          <option value="private">Private</option>
         </select>
        </div>

        <hr className="mt-5 border-gray-500"/>

        <div className="mt-5">
          <details>
            <summary>Members <MdGroups className="inline mb-1 ml-2" size={30}/></summary>
            {
              members.map((member, index) => (
              <article className="flex items-center gap-3 mt-3" key={index}>
                <img src={member.avatar} alt="avatar-user" className="w-16 h-16 rounded-full"/>
                <span>{member.username}</span>
                {
                  member.username === username ? <span className="ml-auto text-blue-500">Owner</span> : <button className="block ml-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove</button>
                }
              </article>
              ))
            }
          </details>
        </div>
      </dialog>
    </article>
  );
};

MyGroups.displayName = 'MyGroups'

MyGroups.propTypes = {
    group: PropTypes.object
}

export default MyGroups;
