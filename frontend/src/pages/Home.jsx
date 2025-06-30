import { useEffect } from "react"
import Menu from "../components/Menu"
import Chat from "../components/Chat"
import { useUserStore } from "../store/userStore"
import { BACKEND_URL } from "../config/variables"

const Home = ({ socket }) => {
  const fetchUserData = useUserStore(state => state.fetchUserData)
  
    useEffect(() => {
      fetchUserData(BACKEND_URL)
    }, [fetchUserData])
    
  
    return (
      <section className="flex h-[100dvh] overflow-hidden">
          <Menu socket={socket} BACKEND_URL={BACKEND_URL}/>
          <Chat socket={socket} BACKEND_URL={BACKEND_URL}/>
      </section>
    )
}

export default Home