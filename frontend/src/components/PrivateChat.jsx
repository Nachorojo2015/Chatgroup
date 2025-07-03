import { toast } from "react-toastify";
import { useChatStore } from "../store/chatStore";
import PropTypes from "prop-types";
import { useUserStore } from "../store/userStore";
import { formatCustomDate } from "../utils/formatCustomDate";

const PrivateChat = ({ privateChat, lastMessage, BACKEND_URL }) => {
  const {
    setIsChatMobileOpen,
    setData,
    unSeen,
    setUnSeen,
    id,
    setLoader,
    setIsBlocked,
  } = useChatStore();
  const { blockedUsers, userId, username } = useUserStore();

  const privateUser = privateChat.users.find(
    (user) => user.username !== username
  );

  const isMyUserBlocked = privateUser.blockedUsers.includes(userId);
  const isBlocked = blockedUsers.includes(privateUser._id);

  async function openChat() {
    if (unSeen[privateChat._id]) {
      const updatedUnSeen = { ...unSeen };
      updatedUnSeen[privateChat._id] = 0;
      setUnSeen(updatedUnSeen);
    }

    if (id === privateChat._id) return;

    setIsBlocked(isBlocked || isMyUserBlocked);
    setIsChatMobileOpen(true);
    setLoader(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/messages/${privateChat._id}`
      );

      if (!response.ok) {
        setLoader(true);
        const errorMessage = await response.text();
        return toast.error(errorMessage);
      }

      const data = await response.json();

      setData(
        privateUser.avatar,
        privateUser.fullname,
        privateChat._id,
        data.messages,
        "private"
      );

      setLoader(false);
    } catch (error) {
      console.error(error);
      toast.error("Error in server");
      setLoader(false);
    }
  }

  return (
    <article
      className={`flex items-center w-full gap-3 p-3 cursor-pointer rounded-xl transition ${
        id === privateChat._id
          ? "dark:bg-[rgb(135,116,225)] bg-blue-400 text-white"
          : "hover:bg-slate-100 dark:hover:bg-[rgba(0,0,0,0.30)]"
      }`}
      onClick={openChat}
    >
      <img
        src={privateUser.avatar}
        alt="avatar user"
        className={`w-14 h-14 rounded-full object-cover ${
          isBlocked || isMyUserBlocked ? "opacity-20" : ""
        }`}
        onError={(e) => (e.target.src = "/picture-user-no-load.png")}
      />
      <div className="w-full">
        <div className="flex items-center">
          <span className="dark:text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis w-52">
            {privateUser.fullname}
          </span>
          <span className={`text-[12px] ml-auto dark:text-white `}>
            {formatCustomDate(lastMessage?.date)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="whitespace-nowrap text-sm overflow-hidden text-ellipsis max-w-56 dark:text-white">
            {lastMessage?.content}
          </span>
          <span
            className={`ml-auto text-white text-[10px] bg-green-500 p-1 text-center w-5 h-5 rounded-full ${
              unSeen[privateChat._id] > 0 ? "" : "invisible"
            }`}
          >
            {unSeen[privateChat._id]}
          </span>
        </div>
      </div>
    </article>
  );
};

PrivateChat.propTypes = {
  privateChat: PropTypes.object,
  lastMessage: PropTypes.object,
  BACKEND_URL: PropTypes.string,
};

export default PrivateChat;
