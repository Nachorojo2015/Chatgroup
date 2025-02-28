import { forwardRef, useRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { MdGroups, MdOutlineGroup } from 'react-icons/md'
import { IoMdAdd } from "react-icons/io"

const EditGroupModal = forwardRef(({ name, description, username, picture, _id, members, blockedUsers, visibility, fetchUserData, socket }, ref) => {

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

       ref.current.close()
       const isDark = document.querySelector('html').className === 'dark'
       const toastId = toast.loading('Editing group...', {
        theme: isDark ? 'dark' : 'light'
       })

       const formData = new FormData()

       if (pictureGroupFile) {
        formData.append('image', pictureGroupFile)
       }

       formData.append('name', nameEdit)   
       formData.append('visibility', visibilityEdit)
       formData.append('description', descriptionEdit)

       try {
         const response = await fetch(`http://localhost:3000/group/edit/${_id}`, {
           method: 'PUT',
           body: formData,
           credentials: 'include'
         })
   
         if (!response.ok) {
           const errorMessage = await response.text()
           return toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 2000
           })
         }
   
         toast.update(toastId, {
          render: 'Group edited!',
          type: 'success',
          isLoading: false,
          autoClose: 2000
         })

         fetchUserData()
       } catch (error) {
         console.log(error.message)
       }
     }


    async function blockUserFromGroup(idUser) {
      ref.current.close()
      const isDark = document.querySelector('html').className === 'dark'
      const toastId = toast.loading('Removing user...', {
        theme: isDark ? 'dark' : 'light'
      })
      try {
        const response = await fetch(`http://localhost:3000/group/block/${_id}/${idUser}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          return toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 2000
          })
        }

        const data = await response.json()

        toast.update(toastId, {
          render: `${data.username} was blocked`,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        })

        socket.emit('update-user')
      } catch (error) {
        console.log(error)
        toast.update(toastId, {
          render: 'Error in server',
          type: 'error',
          isLoading: false,
          autoClose: 2000
        })
      }
    }

    async function unlockUserFromGroup(idUser) {
      ref.current.close()
      const isDark = document.querySelector('html').className === 'dark'
      const toastId = toast.loading('Removing user...', {
        theme: isDark ? 'dark' : 'light'
      })
      try {
        const response = await fetch(`http://localhost:3000/group/unlock/${_id}/${idUser}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          return toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 2000
          })
        }

        const data = await response.json()

        toast.update(toastId, {
          render: `${data.username} was unlocked`,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        })

        socket.emit('update-user')
      } catch (error) {
        console.log(error)
        toast.update(toastId, {
          render: 'Error in server',
          type: 'error',
          isLoading: false,
          autoClose: 2000
        })
      }
    }

    function closeEditModal() {
      ref.current.close()
    }

  return (
    <dialog ref={ref} className="backdrop:bg-[rgba(0,0,0,.60)] dark:bg-gray-700 dark:text-white p-3 rounded-md shadow-md xl:min-w-[450px] min-w-[95%]">
        <button onClick={closeEditModal}>
          <FaArrowLeftLong />
        </button>
      
        <label htmlFor="picture" className="pointer-events-none">
          <div className="relative flex items-center justify-center group">
            <IoMdAdd className="absolute dark:text-white opacity-0 transition group-hover:opacity-100" size={50} />
            <img src={pictureGroup} alt="picture-group" className="cursor-pointer m-auto w-36 h-36 object-cover rounded-full pointer-events-auto transition group-hover:opacity-20"/>
          </div>
          <input type="file" hidden id="picture" name="picture" accept=".jpg, .png, .webp" onChange={handlePicture}/>
        </label>
        
        <input placeholder="Group name" defaultValue={name} ref={nameGroupEditRef} className="dark:bg-gray-700 m-auto block mt-3 border p-3 rounded-md border-black outline-none"/>
        
        <textarea placeholder="Description" defaultValue={description} ref={descriptionGroupEditRef} maxLength={255} className="[field-sizing:content] dark:bg-gray-700 resize-none mt-5 rounded-md p-3 border border-black w-full outline-none max-h-48 max-w-[430px]"/>
                
        <hr className="mt-5 border-gray-500"/>
        
        <div className="flex justify-between mt-5">
          <p className="flex items-center gap-3">
            <span className="font-semibold">Type of group</span>
            <MdOutlineGroup size={30} />
          </p>
          <select name="visibility" className="outline-none dark:bg-gray-700" defaultValue={visibility} ref={visibilityGroupEditRef}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        
        <hr className="mt-5 border-gray-500"/>
        
        <div className="mt-5">
          <details>
            <summary>Members <MdGroups className="inline mb-1 ml-2" size={30}/></summary>
                {
                members.map(member => (
                  <article className="flex items-center gap-3 mt-3" key={member._id}>
                    <img src={member.avatar} alt="avatar-user" className="w-16 h-16 align-middle rounded-full"/>
                    <span>{member.username}</span>
                    {
                    member.username === username ? <span className="ml-auto text-blue-500">Owner</span> : 
                    blockedUsers.includes(member._id) ? 
                    <button className="block ml-auto focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" onClick={() => unlockUserFromGroup(member._id)}>Unlock</button>
                    :
                    <button className="block ml-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => blockUserFromGroup(member._id)}>Block</button>
                    }
                  </article>
                  ))
                }
            </details>
        </div>
        
        <hr className="mt-3 border-gray-500"/>
        
        <button onClick={editGroup} type="button" className="text-white block m-auto mt-5 w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Edit</button>
    </dialog>
  )
})

EditGroupModal.displayName = 'EditGroupModal'

EditGroupModal.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    username: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
    members: PropTypes.array,
    visibility: PropTypes.string,
    fetchUserData: PropTypes.func,
    blockedUsers: PropTypes.array,
    socket: PropTypes.object
}

export default EditGroupModal