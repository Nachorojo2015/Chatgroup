import PropTypes from "prop-types"
import { toast } from "react-toastify"
import { useUserStore } from "../store/userStore"
import { forwardRef } from "react"

const User = forwardRef(({ userSearch, socket, BACKEND_URL }, ref) => {

  const { privateUsers } = useUserStore()

  async function createPrivateChat() {
    for (let i = 0; i < privateUsers.length; i++) {
      const privateChat = privateUsers[i]
      const users = privateChat.users.map(user => user._id)
      if (users.includes(userSearch._id)) return ref.current.close()
    }

    const isDark = document.querySelector('html').className === 'dark'
    const toastId = toast.loading('Creating private chat...', {
      theme: isDark ? 'dark' : 'light'
    })

    try {
      const response = await fetch(`${BACKEND_URL}/private/create/${userSearch._id}`, {
        method: 'POST',
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

      toast.update(toastId, {
        render: 'Private chat created',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })

      ref.current.close()
      socket.emit('update-user')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article className="flex items-center gap-5 p-2 transition hover:opacity-65 w-full cursor-pointer" onClick={createPrivateChat}>
        <img src={userSearch.avatar} alt="user-avatar" className="w-16 h-16 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
        <div className="dark:text-white">
          <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-40">{userSearch.fullname}</p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis w-40">{userSearch.username}</p>
        </div>
    </article>
  )
})

User.displayName = 'User'

User.propTypes = {
    userSearch: PropTypes.object,
    fetchUserData: PropTypes.func,
    socket: PropTypes.object,
    BACKEND_URL: PropTypes.string
}

export default User