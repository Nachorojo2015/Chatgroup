import { create } from 'zustand'

export const useChatStore = create((set) => ({
    image: '',
    name: '',
    id: '',
    messages: [],

    setData: (image, name, id, messages) => {
        set({
            image,
            name,
            id,
            messages
        })
    },

    addMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message]
        }));
    }
}))