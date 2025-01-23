import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

const JoinedGroups = ({ group }) => {

  const { picture, name, visibility, members } = group 

  return (
    <article
      className="flex items-center w-full gap-3 transition cursor-pointer hover:bg-slate-200 dark:hover:bg-opacity-20 p-3"
    >
      <img
        src={picture}
        alt="avatar user"
        className="w-16 h-16 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="dark:text-white font-bold">{name}</span>
        <div>
          <span className="border-r-2 border-black pr-2">
            {visibility}
            {visibility === "Public" ? (
              <TbWorld className="inline ml-1" size={20} />
            ) : (
              <SiPrivateinternetaccess className="inline ml-1" size={20} />
            )}
          </span>
          <span className="ml-2">
            <FaUser className="inline mr-1" />
            {members?.length}
          </span>
        </div>
      </div>

      <div className="flex items-center ml-auto gap-5">
      <BiLogOut size={20}/>
      </div>
    </article>
  );
};

JoinedGroups.displayName = 'JoinedGroups'

JoinedGroups.propTypes = {
    group: PropTypes.object
}

export default JoinedGroups;
