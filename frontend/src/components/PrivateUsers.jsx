import PropTypes from "prop-types";
import { useRef } from "react";
import SearchUsersModal from "./SearchUsersModal";

const PrivateUsers = ({ privateUsers }) => {

  const modalSearchUsersRef = useRef()

  return (
    <div className="w-full overflow-y-auto h-full absolute">
      {
        privateUsers.map((privateUser, index) => (
                <article className="flex items-center w-full gap-3 transition cursor-pointer hover:bg-slate-200 dark:hover:bg-opacity-20 p-3" key={index}>
                    <img
                    src={privateUser.avatar}
                    alt="avatar user"
                    className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                    <span className="dark:text-white">{privateUser.fullname}</span>
                    <span className="text-sm font-semibold dark:text-white">
                        {privateUser.username} | 1 Hora
                    </span>
                    </div>
                    <span className="ml-auto w-2 h-2 rounded-full bg-blue-500"></span>
                </article>
        ))
       }
        <div className="flex flex-col justify-center items-center mt-5">
          <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalSearchUsersRef.current.showModal()}>Search New Users</button>
        </div>

        <SearchUsersModal ref={modalSearchUsersRef}/>
    </div>
  );
};

PrivateUsers.displayName = "PrivateUsers";

PrivateUsers.propTypes = {
  privateUsers: PropTypes.array,
};

export default PrivateUsers;
