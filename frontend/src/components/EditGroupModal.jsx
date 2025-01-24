import { forwardRef, useRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { uploadImageGroup } from "../firebase/config"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { MdGroups, MdOutlineGroup } from 'react-icons/md'

const EditGroupModal = forwardRef(({ description, username, picture, _id, members, visibility, fetchUserData }, ref) => {

  const nameGroupEditRef = useRef()
  const descriptionGroupEditRef = useRef()
  const visibilityGroupEditRef = useRef()

  const [ pictureGroup, setPictureGroup ] = useState(picture)
  const [ pictureGroupFile, setPictureGroupFile ] = useState(null)

  function handlePicture(e) {
      const pictureGroupFile = e.target.files[0]
  
      if (!pictureGroupFile) return
  
      const urlPicture = URL.createObjectURL(pictureGroupFile)
  
      setPictureGroup(urlPicture)
      setPictureGroupFile(pictureGroupFile)
   }

   async function editGroup() {
       const nameEdit = nameGroupEditRef.current.value
       const descriptionEdit = descriptionGroupEditRef.current.value
       const visibilityEdit = visibilityGroupEditRef.current.value
   
       let urlPicture = picture;
   
       if (picture !== pictureGroup) {
         urlPicture = await uploadImageGroup(pictureGroupFile)
       }
   
       try {
         const response = await fetch(`http://localhost:3000/group/edit/${_id}`, {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ name: nameEdit, description: descriptionEdit, picture: urlPicture, visibility: visibilityEdit })
         })
   
         if (!response.ok) {
           const errorMessage = await response.text()
           return toast.error(errorMessage)
         }
   
         toast.success('Group edited')
         fetchUserData()
       } catch (error) {
         console.log(error.message)
       }
   
       ref.current.close()
     }

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px] min-w-[95%]">
        <FaArrowLeftLong onClick={() => ref.current.close()} className="cursor-pointer"/>
        
        <label htmlFor="picture" className="pointer-events-none">
          <img src={pictureGroup} alt="picture-group" className="w-36 h-36 m-auto rounded-full transition cursor-pointer pointer-events-auto hover:opacity-60"/>
          <input type="file" hidden id="picture" name="picture" accept=".jpg, .png, .webp" onChange={handlePicture}/>
        </label>
        
        <input placeholder="Name of the group" defaultValue={name} ref={nameGroupEditRef} className="m-auto block mt-3 border-b border-black outline-none"/>
        
        <hr className="mt-5 border-gray-500"/>
        
        <input placeholder="Description (Optional)" defaultValue={description} ref={descriptionGroupEditRef} className="mt-5 w-full outline-none bg-gray-400 text-white placeholder:text-white p-2"/>
                
        <hr className="mt-5 border-gray-500"/>
        
        <div className="flex justify-between mt-5">
          <p className="flex items-center gap-3">
            <span className="font-semibold">Type of group</span>
            <MdOutlineGroup size={30}/>
          </p>
          <select name="visibility" className="outline-none" defaultValue={visibility} ref={visibilityGroupEditRef}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
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
        
        <hr className="mt-3 border-gray-500"/>
        
        <button onClick={editGroup} type="button" className="text-white block m-auto mt-5 w-full bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit</button>
    </dialog>
  )
})

EditGroupModal.displayName = 'EditGroupModal'

EditGroupModal.propTypes = {
    description: PropTypes.string,
    username: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    members: PropTypes.array,
    visibility: PropTypes.string,
    fetchUserData: PropTypes.func
}

export default EditGroupModal