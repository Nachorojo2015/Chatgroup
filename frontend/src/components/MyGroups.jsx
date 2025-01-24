import { TbWorld } from "react-icons/tb";
import { SiPrivateinternetaccess } from "react-icons/si"; 
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import { useUserStore } from "../store/userStore";
import CopyLinkGroupButton from "./CopyLinkGroupButton";
import EditGroupButton from "./EditGroupButton";
import DeleteGroupButton from "./DeleteGroupButton";

const MyGroups = ({ group }) => {

  const { picture, name, visibility, members, description, _id } = group

  const { fetchUserData, username } = useUserStore()

  return (
    <article
      className="flex items-center w-full gap-3 transition hover:bg-slate-200 dark:hover:bg-opacity-20 p-3"
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
              <SiPrivateinternetaccess className="inline ml-1 mb-[2px]" size={20} />
            )}
          </span>
          <span className="ml-2">
            <FaUser className="inline mr-1 mb-1" />
            {members?.length}
          </span>
        </div>
      </div>

      <div className="flex items-center ml-auto gap-5">
        <CopyLinkGroupButton _id={_id}/>
        <EditGroupButton _id={_id} description={description} username={username} picture={picture} members={members} visibility={visibility} fetchUserData={fetchUserData}/>
        <DeleteGroupButton picture={picture} name={name} _id={_id} fetchUserData={fetchUserData}/>
      </div>
    </article>
  );
};

MyGroups.displayName = 'MyGroups'

MyGroups.propTypes = {
    group: PropTypes.object
}

export default MyGroups;
