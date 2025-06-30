import { useState } from "react";

export const useShowPassword = () => {
    const [viewPassword, setViewPassword] = useState(false);

    const showPassword = () => setViewPassword(true);
    const hidePassword = () => setViewPassword(false);

    return {
        viewPassword,
        showPassword,
        hidePassword
    }
}