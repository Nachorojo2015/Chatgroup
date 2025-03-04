import PropTypes from "prop-types";
import SearchUsersButton from "./SearchUsersButton";
import PrivateChat from "./PrivateChat";

const PrivateUsers = ({ privateUsers, valueSearch, fetchUserData, username, socket, BACKEND_URL }) => {

  let privateChats = privateUsers.map(privateChat => ({ user: privateChat.users.filter(user => user.username !== username)[0], _id: privateChat._id})).flat()

  if (valueSearch) {
    privateChats = privateChats.filter(privateChat => privateChat.user.fullname.toLowerCase().includes(valueSearch.toLowerCase()))
  }
  
  return (
    <div className="w-full overflow-y-auto h-full absolute [scrollbar-width:thin]">
       {
        privateChats.map(privateChat => (
          <PrivateChat key={privateChat._id} privateChat={privateChat} fetchUserData={fetchUserData} socket={socket} BACKEND_URL={BACKEND_URL}/>
        ))
       }
       <SearchUsersButton fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
    </div>
  );
};

PrivateUsers.displayName = "PrivateUsers";

PrivateUsers.propTypes = {
  privateUsers: PropTypes.array,
  valueSearch: PropTypes.string,
  fetchUserData: PropTypes.func,
  username: PropTypes.string,
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
};

export default PrivateUsers;
