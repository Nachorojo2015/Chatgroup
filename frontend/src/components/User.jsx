import PropTypes from "prop-types"
import { useChatStore } from "../store/chatStore"
import { toast } from "react-toastify"
import { useUserStore } from "../store/userStore"
import { forwardRef } from "react"

const User = forwardRef(({ userSearch, fetchUserData }, ref) => {
  const { setData, setIsChatMobileOpen } = useChatStore()

  const { privateUsers } = useUserStore()

  async function createPrivateChat() {
    for (let i = 0; i < privateUsers.length; i++) {
      const privateChat = privateUsers[i]
      const users = privateChat.users.map(user => user._id)
      if (users.includes(userSearch._id)) return ref.current.close()
    }

    const toastId = toast.loading('Creating private chat...')

    try {
      const response = await fetch(`http://localhost:3000/private/create/${userSearch._id}`, {
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

      const data = await response.json()

      setData(
        userSearch.avatar,
        userSearch.name,
        data.idPrivateChat,
        []
      )

      setIsChatMobileOpen(true)

      toast.update(toastId, {
        render: 'Private chat created',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      })

      fetchUserData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article className="flex items-center gap-5 p-2 transition hover:opacity-65 w-full cursor-pointer" onClick={createPrivateChat}>
        <img src={userSearch.avatar} alt="user-avatar" className="w-16 h-16 rounded-full"/>
        <div className="dark:text-white">
          <p className="font-semibold">{userSearch.fullname}</p>
          <p>{userSearch.username}</p>
        </div>
    </article>
  )
})

User.displayName = 'User'

User.propTypes = {
    userSearch: PropTypes.object,
    fetchUserData: PropTypes.func
}

export default User