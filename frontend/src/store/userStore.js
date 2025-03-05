import { toast } from "react-toastify";
import { create } from "zustand";

const BACKEND_URL = import.meta.vite.BACKEND_URL

export const useUserStore = create((set) => ({
    userId: '',
    fullname: '',
    username: '',
    avatar: '',
    groups: [],
    privateUsers: [],
    blockedUsers: [],

    fetchUserData: async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user`, {
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

        const { fullname, username, avatar, groups, privateUsers, blockedUsers, _id } = user

        set({
          userId: _id,
          fullname,
          username, 
          avatar,
          groups,
          privateUsers,
          blockedUsers
        })
        
      } catch (error) {
        console.log(error.message)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2500)
      }
    }
}))