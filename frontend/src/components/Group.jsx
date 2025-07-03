import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useChatStore } from "../store/chatStore";
import { useUserStore } from "../store/userStore";
import { formatCustomDate } from "../utils/formatCustomDate";

const Group = ({ group, lastMessage, BACKEND_URL }) => {
  const { picture, name, _id } = group;
  const {
    setData,
    setIsChatMobileOpen,
    setLoader,
    unSeen,
    setUnSeen,
    id,
    setIsBlocked,
  } = useChatStore();
  const userId = useUserStore((state) => state.userId);

  const isBlock = group.blockedUsers.includes(userId);

  async function openChat() {
    if (unSeen[_id]) {
      const updatedUnSeen = { ...unSeen };
      updatedUnSeen[_id] = 0;
      setUnSeen(updatedUnSeen);
    }

    if (id === _id) return;

    setIsBlocked(isBlock);
    setLoader(true);
    setIsChatMobileOpen(true);

    try {
      const response = await fetch(`${BACKEND_URL}/messages/${_id}`);

      if (!response.ok) {
        setLoader(false);
        const errorMessage = await response.text();
        return toast.error(`${errorMessage}, try again`);
      }

      const data = await response.json();

      setData(picture, name, _id, data.messages, "group");

      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error("Error in server");
      setLoader(false);
    }
  }

  return (
    <article
      className={`flex items-center w-full gap-3 p-3 cursor-pointer transition rounded-xl ${
        id === _id
          ? "dark:bg-[rgb(135,116,225)] bg-blue-400 text-white"
          : "hover:bg-slate-100 dark:hover:bg-[rgba(0,0,0,0.30)]"
      }`}
      onClick={openChat}
    >
      <img
        src={picture}
        alt="avatar user"
        className={`w-14 h-14 rounded-full object-cover ${
          isBlock ? "opacity-20" : ""
        }`}
        onError={(e) => (e.target.src = "/picture-group-no-load.png")}
      />

      <div className="w-full">
        <div className="flex items-center gap-3">
          <span className="dark:text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-52">
            JavaScript
          </span>
          <span className={`text-[12px] ml-auto  dark:text-white`}>
            {formatCustomDate(lastMessage?.date)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="flex text-sm items-center gap-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-56 dark:text-white">
            {lastMessage?.fullname ? lastMessage?.fullname + ": " : ""}{" "}
            {lastMessage?.content}
          </span>
          <span
            className={`ml-auto text-white text-[10px] bg-green-500 p-1 text-center w-5 h-5 rounded-full ${
              unSeen[_id] > 0 ? "" : "invisible"
            }`}
          >
            {unSeen[_id]}
          </span>
        </div>
      </div>
    </article>
  );
};

Group.propTypes = {
  group: PropTypes.object,
  fetchUserData: PropTypes.func,
  username: PropTypes.string,
  socket: PropTypes.object,
  lastMessage: PropTypes.object,
  BACKEND_URL: PropTypes.string,
};

export default Group;
