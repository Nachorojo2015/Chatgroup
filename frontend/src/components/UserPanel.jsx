import Menu from "./Menu"
import Chat from "./Chat"
import { useEffect, useState } from "react"

const UserPanel = () => {

  const [userData, setUserData] = useState(null)

  async function getDataUser() {
    try {
      const response = await fetch('http://localhost:3000/auth/protected', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        const errorMessage = await response.text()
        alert(`error, ${errorMessage}`)
        setTimeout(() => {
            window.location.href = '/login'
        }, 3000)
      }

      const data = await response.json()
      setUserData(data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getDataUser()
  }, [])
  

  return (
    <section className="grid grid-cols-[100%,0] xl:grid-cols-[30%,70%] h-screen">
        <Menu userData={userData}/>
        <Chat userData={userData}/>
    </section>
  )
}

export default UserPanel