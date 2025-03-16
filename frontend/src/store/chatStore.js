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

    unSeen: {},

    type: '',

    isBlocked: false,

    setIsBlocked: (state) => {
        set({
            isBlocked: state
        })
    },

    setUnSeen: (update) => set((state) => ({
        unSeen: { ...state.unSeen, ...update }
    })),

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

    setData: (image, name, id, messages, type) => {
        set({
            image,
            name,
            id,
            messages,
            type
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