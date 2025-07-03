import { Outlet } from "react-router-dom"
import Menu from "../components/Menu"


const MainLayout = ({ socket, BACKEND_URL }) => {
  return (
    <section className="flex h-[100dvh] overflow-hidden">
        <Menu socket={socket} BACKEND_URL={BACKEND_URL}/>
        
        <Outlet />

    </section>
  )
}

export default MainLayout