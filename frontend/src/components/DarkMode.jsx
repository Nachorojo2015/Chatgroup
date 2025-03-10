import { useEffect, useState } from "react"
import { CiLight } from "react-icons/ci";
import { IoCloudyNightSharp } from "react-icons/io5";

const DarkMode = () => {

    const [darkIcon, setDarkIcon] = useState(false)

    useEffect(() => {
      const dark = localStorage.getItem('dark') === 'true'
      const html = document.querySelector('html')
      dark ? html.className = '' : html.className = 'dark'
    }, [])
       
     
    function darkMode() {
      const dark = localStorage.getItem('dark') === 'true'
      localStorage.setItem('dark', !dark)
      setDarkIcon(!dark)
     
      const html = document.querySelector('html')
      dark ? html.className = 'dark' : html.className = ''
    }

  return (
    <button className="dark:text-white transition hover:opacity-60 flex items-center gap-2 text-sm" onClick={darkMode}>
      { 
      darkIcon ? 
      <>
      <IoCloudyNightSharp size={20}/>
      <span>Dark mode</span>
      </>
      : 
      <>
      <CiLight size={20}/>
      <span>Light mode</span>
      </>
      }
    </button>
  )
}

export default DarkMode