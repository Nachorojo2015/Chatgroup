import { toast } from "react-toastify";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
    userId: '',
    fullname: '',
    username: '',
    avatar: '',
    groups: [],
    privateUsers: [],

    fetchUserData: async () => {
      try {
        const response = await fetch(`http://localhost:3000/user`, {
          credentials: 'include'
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          toast.error(errorMessage)
          setTimeout(() => {
            window.location.href = '/login'
          }, 2500)
        }

        const data = await response.json()

        const { user } = data

        const { fullname, username, avatar, groups, privateUsers, _id } = user

        set({
          userId: _id,
          fullname,
          username, 
          avatar,
          groups,
          privateUsers
        })
        
      } catch (error) {
        console.log(error.message)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2500)
      }
    },

    updateAvatar: async ({ url }) => {
      const { fetchUserData } = get()

       try {
        const response = await fetch('http://localhost:3000/user/avatar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url }),
          credentials: 'include'
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          toast.error(`Error to update avatar, ${errorMessage}`)
        }

        fetchUserData()

       } catch (error) {
        console.log(error.message)
       }
    }
}))