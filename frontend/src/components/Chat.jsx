import PropTypes from "prop-types"


const Chat = ({ chatSelected }) => {


  if (!chatSelected) return <div className="hidden xl:grid place-content-center place-items-center border-gray-700 xl:border-l-4"><img src="/chat.svg" alt="brand-app-logue" className="w-52 h-52"/> <p className="text-3xl">Init a conversation</p></div>

  return (
    <div className="xl:border-l-4">
      chat
    </div>
  )
}


Chat.displayName = 'Chat'

Chat.propTypes = {
  chatSelected: PropTypes.bool
}

export default Chat