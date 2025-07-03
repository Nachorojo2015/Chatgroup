import { useState } from "react";

export const useToggleMenu = () => {
    const [isSettingsMenu, setIsSettingsMenu] = useState(false);
    const [isChatMenu, setIsChatMenu] = useState(false);

    const toggleSettingsMenu = () => setIsSettingsMenu(!isSettingsMenu);
    const toggleIsChatMenu = () => setIsChatMenu(!isChatMenu);

    return {
        isSettingsMenu,
        toggleSettingsMenu,
        isChatMenu,
        toggleIsChatMenu
    }
}