import { useEffect } from "react";
import DarkMode from "./DarkMode";
import CloseSession from "./CloseSession";
import { useUserStore } from "../store/userStore";
import { CiSearch } from "react-icons/ci";
import { useChatStore } from "../store/chatStore";
import { RxHamburgerMenu } from "react-icons/rx";
import PropTypes from "prop-types";
import SearchGroupsButton from "./SearchGroupsButton";
import ProfileUserButton from "./ProfileUserButton";
import Chats from "./Chats";
// import { IoSettingsOutline } from "react-icons/io5";
// import Settings from "../pages/Settings";
import { useSearchMenu } from "../hooks/useSearchMenu";
import { useToggleMenu } from "../hooks/useToggleMenu";
import OptionsChatButton from "./OptionsChatButton";
import { ClipLoader } from "react-spinners";

const Menu = ({ socket, BACKEND_URL }) => {
  const { fullname, username, avatar, fetchUserData } = useUserStore();
  const isChatMobileOpen = useChatStore((state) => state.isChatMobileOpen);

  const { valueSearch, handleChange } = useSearchMenu();
  const { isSettingsMenu, toggleSettingsMenu } = useToggleMenu();

  useEffect(() => {
    fetchUserData(BACKEND_URL);
  }, [fetchUserData, BACKEND_URL]);

  return (
    <aside
      className={`flex flex-col items-center relative group ${
        isChatMobileOpen ? "hidden xl:flex" : "xl:flex"
      } xl:w-[25%] xl:border-r w-full bg-white dark:bg-[rgb(33,33,33)]`}
    >
      <header className="flex items-center w-full">
        <div className="relative m-2 flex items-center">
          <button
            className="p-2 mt-2 transition hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full"
            onClick={toggleSettingsMenu}
          >
            <RxHamburgerMenu className="dark:text-white" size={20} />
          </button>
          <div
            className={`absolute flex flex-col gap-1 justify-between top-0 mt-14 ml-1 transition duration-200 min-w-64 z-10 bg-white dark:bg-[rgb(33,33,33)] p-1 rounded-lg shadow-md bg-blend-saturation ${
              isSettingsMenu ? "scale-up-top-left opacity-100" : "opacity-0 invisible"
            }`}
          >
            {/* Profile user */}
            <ProfileUserButton
              username={username}
              fullname={fullname}
              avatar={avatar}
              BACKEND_URL={BACKEND_URL}
            />
            <hr className="opacity-50"/>
            {/* Settings */}
            {/* <div className="flex items-center gap-3 rounded-lg cursor-pointer transition hover:bg-[rgba(0,0,0,0.08)] p-2" onClick={openSettings}>
              <IoSettingsOutline size={20} className="dark:text-white"/>
              <span className="dark:text-white text-sm font-semibold">Settings</span>
            </div> */}
            {/* Dark Mode */}
            <DarkMode />
            {/* Search Groups */}
            <SearchGroupsButton
              username={username}
              fetchUserData={fetchUserData}
              BACKEND_URL={BACKEND_URL}
            />
            <hr className="opacity-50"/>
            {/* Close session */}
            <CloseSession BACKEND_URL={BACKEND_URL} />
          </div>
        </div>
        <div className="flex items-center justify-center relative w-[80%]">
          <input
            placeholder={!username ? 'Loading...' : 'Search'}
            className="font-chat mt-2 bg-gray-100 w-full indent-2 rounded-full p-2 pr-10 placeholder:text-black dark:bg-black dark:bg-opacity-40 dark:placeholder:text-white dark:text-gray-100"
            onChange={handleChange}
          />

          {
            !username ?
            <ClipLoader color="gray" size={22} cssOverride={{ position: 'absolute', right: '12px', top: '16px'}}/>
            :
            <CiSearch
            size={22}
            className="absolute right-3 top-4 dark:text-white"
            />
          }
        </div>
      </header>

      <section className="flex flex-1 w-full relative items-center justify-center mt-1">
        <Chats
          valueSearch={valueSearch}
          fetchUserData={fetchUserData}
          username={username}
          socket={socket}
          BACKEND_URL={BACKEND_URL}
        />
      </section>

      <OptionsChatButton socket={socket} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
    </aside>
  );
};

Menu.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string,
};

export default Menu;
