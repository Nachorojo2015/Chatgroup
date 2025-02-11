import { create } from 'zustand'

export const useChatStore = create((set) => ({
    image: '',
    name: '',
    id: '',
    messages: [],

    message: '',

    isOpenMenu: false, // Media Upload Option menu

    isChatMobileOpen: false,

    activeMicro: false,

    setMessage: (message) => {
        set({
            message
        })
    },

    setData: (image, name, id, messages) => {
        set({
            image,
            name,
            id,
            messages
        })
    },

    setIsOpenMenu: (open) => {
        set({
            isOpenMenu: open
        })
    },

    setIsChatMobileOpen: (open) => {
        set({
            isChatMobileOpen: open
        })
    },

    addMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message]
        }));
    },

    setActiveMicro: (active) => {
        set({
            activeMicro: active
        })
    }
}))