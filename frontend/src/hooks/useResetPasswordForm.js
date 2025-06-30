import { useState } from "react"

export const useResetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState(null);

    const handleChange = (e) => {
        setNewPassword(e.target.value)
    }

    return {
        newPassword,
        handleChange
    }
}