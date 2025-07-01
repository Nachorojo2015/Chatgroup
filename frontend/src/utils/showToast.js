import { toast } from "react-toastify"

export const showToast = (message, type, closingTime, theme = 'light') => {
    return toast(message, {
        type,
        autoClose: closingTime,
        theme
    })
}