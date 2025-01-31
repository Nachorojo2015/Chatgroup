import PropTypes from "prop-types";
import SearchUsersButton from "./SearchUsersButton";

const PrivateUsers = ({ privateUsers }) => {

  return (
    <div className="w-full overflow-y-auto h-full absolute [scrollbar-width:thin]">
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

       <SearchUsersButton />
    </div>
  );
};

PrivateUsers.displayName = "PrivateUsers";

PrivateUsers.propTypes = {
  privateUsers: PropTypes.array,
};

export default PrivateUsers;
