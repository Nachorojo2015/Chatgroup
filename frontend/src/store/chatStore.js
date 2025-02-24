import { create } from 'zustand'

export const useChatStore = create((set) => ({
    image: '',
    name: '',
    id: '',
    messages: [],

    message: '',

    isChatMobileOpen: false,

    activeMicro: false,

    loader: false,

    unSeen: [],

    setUnSeen: (state) => {
        set({
            unSeen: state
        })
    },

    setLoader: (loader) => {
        set({
            loader
        })
    },

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

    setIsChatMobileOpen: (open) => {
        set({
            isChatMobileOpen: open
        })
    },

    setMessages: (state) => {
        set(({
            messages: state
        }));
    },

    setActiveMicro: (active) => {
        set({
            activeMicro: active
        })
    },
    
    setIdChat: (id) => {
        set({
            id
        })
    }
}))