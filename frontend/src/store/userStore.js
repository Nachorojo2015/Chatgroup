import { toast } from "react-toastify";
import { create } from "zustand";

export const useUserStore = create((set) => ({
    userId: '',
    fullname: '',
    username: '',
    avatar: '',
    groups: [],
    privateUsers: [],
    blockedUsers: [],

    // Setter para actualizar los chats y labeledChats automáticamente
    setChats: (groups, privateUsers) => {
      set({
          groups,
          privateUsers,
          labeledChats: [
              ...groups.map(chat => ({ ...chat, type: "group" })),
              ...privateUsers.map(chat => ({ ...chat, type: "privateUser" }))
          ]
      });
    },

    
    updateLastMessage: (newMessage) => {
      set((state) => ({
          chats: state.chats.map(chat => 
              chat._id === newMessage.chatId
              ? { ...chat, lastMessage: newMessage } 
              : chat
          )
      }));
    },

    fetchUserData: async (BACKEND_URL) => {
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
          blockedUsers,
          chats: [
            ...groups.map(chat => ({ ...chat, type: "group" })),
            ...privateUsers.map(chat => ({ ...chat, type: "privateUser" }))
          ] 
        })
        
      } catch (error) {
        console.log(error.message)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2500)
      }
    }
}))