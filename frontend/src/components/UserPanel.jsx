import Menu from "./Menu"
import Chat from "./Chat"
import { useEffect } from "react"
import { useUserStore } from "../store/userStore"
import PropTypes from "prop-types"

const UserPanel = ({ socket }) => {

  const fetchUserData = useUserStore(state => state.fetchUserData)

  useEffect(() => {
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <section className="grid xl:grid-cols-[30%,70%] h-screen overflow-hidden">
        <Menu socket={socket}/>
        <Chat socket={socket}/>
    </section>
  )
}

UserPanel.propTypes = {
  socket: PropTypes.object
}

export default UserPanel