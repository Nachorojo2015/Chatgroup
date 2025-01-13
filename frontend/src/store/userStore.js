import { create } from "zustand";

export const useUserStore = create((set) => ({
    _id: '',
    fullname: '',
    username: '',
    avatar: '',
    groups: [],
    privateChats: [],

    fetchUserData: async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/protected', {
            credentials: 'include'
        })
    
        if (!response.ok) {
          const errorMessage = await response.text()
          alert(`error, ${errorMessage}`)
          setTimeout(() => {
             window.location.href = '/login'
          }, 3000)
        }
    
        const data = await response.json()
    
        const user = data.user
    
        const { _id, fullname, username, avatar, groups, privateChats } = user
    
        set({
          _id,
          fullname,
          username,
          avatar,
          groups,
          privateChats
        })
      } catch (error) {
        console.log(error.message)
        alert('Error in the server')
      }
    },

    updateAvatar: (url) => {
       set({
        avatar: url
       })
    }
}))