import Menu from "./Menu"
import Chat from "./Chat"
import { useEffect } from "react"
import { useUserStore } from "../store/userStore"
import PropTypes from "prop-types"

const UserPanel = ({ socket, BACKEND_URL }) => {

  const fetchUserData = useUserStore(state => state.fetchUserData)

  useEffect(() => {
    fetchUserData(BACKEND_URL)
  }, [fetchUserData, BACKEND_URL])
  

  return (
    <section className="flex h-[100dvh] overflow-hidden">
        <Menu socket={socket} BACKEND_URL={BACKEND_URL}/>
        <Chat socket={socket} BACKEND_URL={BACKEND_URL}/>
    </section>
  )
}

UserPanel.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default UserPanel