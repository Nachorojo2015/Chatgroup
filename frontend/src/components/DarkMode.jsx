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
    <button className="dark:text-white" onClick={darkMode}>{ darkIcon ? <IoCloudyNightSharp size={20}/>  : <CiLight size={20}/> }</button>
  )
}

export default DarkMode