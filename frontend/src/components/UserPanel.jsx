import Menu from "./Menu"
import Chat from "./Chat"
import { useEffect } from "react"
import { useUserStore } from "../store/userStore"

const UserPanel = () => {

  const fetchUserData = useUserStore(state => state.fetchUserData)

  useEffect(() => {
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <section className="grid grid-cols-[100%,0] xl:grid-cols-[30%,70%] h-screen overflow-hidden">
        <Menu/>
        <Chat/>
    </section>
  )
}

export default UserPanel