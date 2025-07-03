import { RiPencilFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import CreateGroupButton from "./CreateGroupButton";
import SearchUsersButton from "./SearchUsersButton";
import { useToggleMenu } from "../hooks/useToggleMenu";

const OptionsChatButton = ({ socket, fetchUserData, BACKEND_URL }) => {
  const { isChatMenu, toggleIsChatMenu } = useToggleMenu();

  return (
    <div>
      <button
        className={`bg-[rgb(51,144,236)] dark:bg-[rgb(135,116,225)] rounded-full p-4 absolute right-5 bottom-5 text-white block blur-in ${
          !isChatMenu ? "xl:hidden xl:group-hover:block" : ""
        }`}
        onClick={toggleIsChatMenu}
      >
        {!isChatMenu ? (
          <RiPencilFill size={30} className="scale-up-center" />
        ) : (
          <IoMdClose size={30} className="jello-diagonal" />
        )}
      </button>

      <div
        className={`mb-24 ml-24 bg-white dark:bg-[rgb(33,33,33,0.867)] shadow-md p-3 rounded-lg ${
          isChatMenu ? "block" : "hidden"
        }`}
      >
        <CreateGroupButton
          fetchUserData={fetchUserData}
          BACKEND_URL={BACKEND_URL}
        />
        <SearchUsersButton socket={socket} BACKEND_URL={BACKEND_URL} />
      </div>
    </div>
  );
};

export default OptionsChatButton;
