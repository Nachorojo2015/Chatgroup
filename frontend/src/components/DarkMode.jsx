import { useEffect, useState } from "react";
import { IoCloudyNightSharp } from "react-icons/io5";

const DarkMode = () => {
  const [darkIcon, setDarkIcon] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    setDarkIcon(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDarkMode() {
    const newDarkMode = !darkIcon;
    setDarkIcon(newDarkMode);
    localStorage.setItem("dark", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  }

  return (
    <div className="dark:text-white transition p-2 rounded-lg hover:bg-[rgba(0,0,0,0.08)] flex items-center gap-2 text-sm cursor-pointer" onClick={toggleDarkMode}>
      <IoCloudyNightSharp size={20} />
      <span className="font-semibold">Night mode</span>

      <label className="relative inline-block w-12 h-6 ml-auto">
        <input
          type="checkbox"
          checked={darkIcon}
          onChange={toggleDarkMode}
          className="peer hidden"
        />
        <span className="absolute inset-0 bg-gray-300 rounded-full transition peer-checked:bg-green-500"></span>
        <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition transform peer-checked:translate-x-6"></span>
      </label>
    </div>
  );
};

export default DarkMode;
