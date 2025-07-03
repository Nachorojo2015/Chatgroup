import { useState } from "react"

export const useSettings = () => {
    const [isOpenSettings, setIsOpenSettings] = useState(false);

    const openSettings = () => setIsOpenSettings(true);
    const closeSettings = () => setIsOpenSettings(false);

    return {
        isOpenSettings,
        openSettings,
        closeSettings
    }
}