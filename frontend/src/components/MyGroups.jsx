import { TbWorld } from "react-icons/tb";
import { SiPrivateinternetaccess } from "react-icons/si"; 
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import CopyLinkGroupButton from "./CopyLinkGroupButton";
import EditGroupButton from "./EditGroupButton";
import DeleteGroupButton from "./DeleteGroupButton";
import { useChatStore } from "../store/chatStore";
import { toast } from "react-toastify";

const MyGroups = ({ group, fetchUserData, username }) => {

  const { picture, name, visibility, members, description, _id } = group
  const setData = useChatStore(state => state.setData)

  async function fetchDataChat() {
      try {
        const response = await fetch(`http://localhost:3000/messages/${_id}`)
  
        if (!response.ok) {
          const errorMessage = await response.text()
          return toast.error(errorMessage)
        }
  
        const data = await response.json()
  
        setData(
          picture, 
          name,
          _id,
          data.messages
        )
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <article
      className="flex items-center w-full gap-3 transition hover:bg-slate-200 dark:hover:bg-opacity-20 p-3"
      onClick={fetchDataChat}
    >
      <img
        src={picture}
        alt="avatar user"
        className="w-16 h-16 rounded-full"
      />

      <div className="flex flex-col gap-1">
        <span className="dark:text-white font-bold">{name}</span>
        <div>
          <span className="border-r-2 border-black dark:border-white pr-2 dark:text-white">
            {visibility}
            {visibility === "Public" ? (
              <TbWorld className="inline ml-1" size={20} />
            ) : (
              <SiPrivateinternetaccess className="inline ml-1 mb-[2px]" size={20} />
            )}
          </span>
          <span className="ml-2 dark:text-white">
            <FaUser className="inline mr-1 mb-1" />
            {members?.length}
          </span>
        </div>
      </div>

      <div className="flex items-center ml-auto gap-5">
        <CopyLinkGroupButton _id={_id}/>
        <EditGroupButton _id={_id} name={name} description={description} username={username} picture={picture} members={members} visibility={visibility} fetchUserData={fetchUserData}/>
        <DeleteGroupButton picture={picture} name={name} _id={_id} fetchUserData={fetchUserData}/>
      </div>
    </article>
  );
};

MyGroups.displayName = 'MyGroups'

MyGroups.propTypes = {
    group: PropTypes.object,
    fetchUserData: PropTypes.func,
    username: PropTypes.string
}

export default MyGroups;
