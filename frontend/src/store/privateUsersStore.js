import { create } from "zustand";

export const usePrivateUsers = create((set) => ({
    valueSearch: '',
    setValueSearch: (e) => {
        set({
            valueSearch: e.target.value
        })
    }
}))