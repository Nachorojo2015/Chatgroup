import { forwardRef, useRef, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const CreateGroupModal = forwardRef(({ fetchUserData }, ref) => {

    const [imageGroup, setImageGroup] = useState('/camera.png')
    const [fileImageGroup, setFileImageGroup] = useState(null)
    
    const groupNameRef = useRef()
    const labelNameRef = useRef()
      
    
    function handleImageGroup(e) {
      const imageGroupFile = e.target.files[0]
        
      if (!imageGroupFile) return
        
      const url = URL.createObjectURL(imageGroupFile)
        
      setImageGroup(url)
      setFileImageGroup(imageGroupFile)
    }

    async function createGroup() {
        const groupName = groupNameRef.current.value
    
        if (!groupName) return labelNameRef.current.innerText = 'Insert a value'
    
        if (imageGroup === '/camera.png') return labelNameRef.current.innerText = 'Insert a pick'
    
        labelNameRef.current.innerText = ''
        ref.current.close()
        const toastId = toast.loading('Creating group...')

        const formData = new FormData()
        formData.append('image', fileImageGroup)

        try {
          const response = await fetch(`http://localhost:3000/group/create/${groupName}`, {
            method: 'POST',
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
            render: 'Group created successfully!',
            type: 'success',
            isLoading: false,
            autoClose: 2000
          })

          setImageGroup('/camera.png')
          setFileImageGroup(null)
          groupNameRef.current.value = ''
          fetchUserData()
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <dialog ref={ref} className="p-3 rounded-md dark:bg-gray-700 dark:text-white">
        <button onClick={() => ref.current.close()}>
          <FaArrowLeftLong />
        </button>

        <label className="pointer-events-none">
          <img src={imageGroup} alt="picture-group" className="cursor-pointer m-auto w-16 h-16 rounded-full pointer-events-auto transition hover:opacity-50"/>
          <input type="file" hidden onChange={handleImageGroup} accept=".jpg, .png, .webp"/>
        </label>

        <label ref={labelNameRef} htmlFor="group-name" className="block mt-3 text-sm text-red-500"></label>
        <input name="group-name" placeholder="Enter group name" className="border-b border-black dark:border-white indent-1 outline-none bg-gray-700" ref={groupNameRef}/>

        <button onClick={createGroup} type="button" className="text-white block mt-5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center m-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
    </dialog>
  )
})

CreateGroupModal.displayName = 'CreateGroupModal'

CreateGroupModal.propTypes = {
    fetchUserData: PropTypes.func
}

export default CreateGroupModal