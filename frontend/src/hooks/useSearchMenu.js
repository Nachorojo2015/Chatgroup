import { useState } from "react";

export const useSearchMenu = () => {
    const [valueSearch, setValueSearch] = useState("");

    const handleChange = (e) => setValueSearch(e.target.value);

    return {
        valueSearch,
        handleChange
    }
}