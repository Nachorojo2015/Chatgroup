import { toast } from "react-toastify"

export const showToast = (message, type, closingTime) => {
    return toast(message, {
        type,
        autoClose: closingTime
    })
}