import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { MdGroups } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { SiPrivateinternetaccess } from "react-icons/si";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa"
import { MdHistory } from "react-icons/md";
import { useUserStore } from "../store/userStore";
import DarkMode from "./DarkMode";
import PropTypes from "prop-types";
import DeleteGroupButton from "./DeleteGroupButton";
import LeaveGroupButton from "./LeaveGroupButton";
import CopyLinkGroupButton from "./CopyLinkGroupButton";

const InfoGroup = ({ socket, BACKEND_URL }) => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [group, setGroup] = useState(null)
  const { username, fetchUserData } = useUserStore()

  const isMember = group?.members.map(group => group.username).includes(username)
  const isCreator = group?.creator?.username === username

  function formateDate(fecha) {
    fecha = new Date(fecha)
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const año = fecha.getFullYear();
    const fechaFormateada = `${dia} de ${mes} del ${año}`;
    return fechaFormateada
  }

    async function joinGroup() {
        const isDark = document.querySelector('html').className === 'dark'
        const toastId = toast.loading('Join to group...', {
          theme: isDark ? 'dark' : 'light'
        })
        
        try {
          const response = await fetch(`${BACKEND_URL}/group/join/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
    
          if (!response.ok) {
            const errorMessage = await response.text()
            return toast.update(toastId, {
              render: errorMessage,
              type: 'error',
              isLoading: false,
              autoClose: 2000
            })
          }
    
          toast.update(toastId, {
            render: 'Joined!',
            type: 'success',
            isLoading: false,
            autoClose: 2000
          })
    
          fetchUserData(BACKEND_URL)
        } catch (error) {
          console.log(error.message)
        }
    }


  useEffect(() => {
    async function getInfoGroup() {
        try {
          const response = await fetch(`${BACKEND_URL}/group/${id}`);
    
          if (!response.ok) {
            const errorMessage = await response.text();
            toast.error(errorMessage);
            setTimeout(() => {
              navigate('/')
            }, 2000)
          }
    
          const data = await response.json();
          setGroup(data.group);
        } catch (error) {
          console.log(error);
          toast.error('Error in server')
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      }
    
      getInfoGroup()
      fetchUserData(BACKEND_URL)
  }, [id, fetchUserData, navigate, BACKEND_URL])

  if (!group) {
    return (
    <div className="flex justify-center items-center h-screen">
        <ClipLoader />
    </div>
    )
  }
  
  return (
    <section className="h-screen overflow-auto">
      <div className="dark:bg-black bg-white dark:bg-opacity-10">
        <article className="dark:bg-gray-900 bg-slate-200 bg-opacity-80 flex flex-col items-center">
            <img src={group.picture} alt="picture-group" className="h-96 xl:w-[80%] shadow-md w-full rounded-b-md object-cover" onError={e => e.target.src = '/picture-group-no-load.png'}/>
            <div className="flex flex-wrap justify-center gap-3 xl:justify-between w-[80%] mt-5 mb-5">
                <div className="flex flex-col">
                    <strong className="text-2xl whitespace-nowrap overflow-hidden text-ellipsis w-72 dark:text-white">{group.name}</strong>
                    <span className="font-semibold dark:text-gray-400">{group.visibility} group | {group.members.length} members</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5">
                    {
                      isCreator ?
                      <DeleteGroupButton picture={group.picture} name={group.name} _id={group._id} socket={socket} BACKEND_URL={BACKEND_URL}/>
                      :
                      isMember ? 
                      <LeaveGroupButton picture={group.picture} name={group.name} _id={group._id} fetchUserData={fetchUserData} BACKEND_URL={BACKEND_URL}/>
                      :
                      <button className="flex items-center gap-3 dark:text-white" onClick={joinGroup}>
                        <MdGroups />
                        <strong>Join to group</strong>
                      </button>
                    }
                    <CopyLinkGroupButton />
                    <DarkMode />
                 </div>
            </div>
        </article>
        <section className="flex flex-col items-center gap-12 mt-12 dark:text-white px-2">
            <article className="dark:bg-gray-900 border shadow-md p-3 rounded-lg xl:w-[50%] w-full">
                <strong>Information about this group</strong>
                <hr className="dark:text-gray-600 mt-3"/>
                <div className="mt-3 flex items-center gap-3">
                    {group.visibility === 'Public' ? <BiWorld size={30}/> : <SiPrivateinternetaccess size={30}/>}
                    <div>
                        <strong>{group.visibility}</strong>
                        <p>{group.visibility === 'Public' ? 'Anyone can see the group and what is posted' : 'Only users within the group can see what is posted'}</p>
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                    {group.visibility === 'Public' ? <FaRegEye size={30}/> : <FaRegEyeSlash size={30}/>}
                    <div>
                        <strong>{group.visibility === 'Public' ? 'Visible' : 'Hidden'}</strong>
                        <p>{group.visibility === 'Public' ? 'Anyone can find this group' : 'Only users with the link can find this group.'}</p>
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                    <MdHistory size={30}/>
                    <div>
                        <strong>History</strong>
                        <p>Group created on {formateDate(group.creationDate)}</p>
                    </div>
                </div>
            </article>
            <article className="dark:bg-gray-900 border shadow-md p-3 rounded-lg xl:w-[50%] w-full">
                <strong>Members | {group.members.length}</strong>
                <hr className="dark:text-gray-600 mt-3"/>
                <div className="mt-5 flex items-center gap-1">
                    {
                        group.members.map((member, index) => (
                            <img key={index} src={member.avatar} alt="user-avatar" className="w-12 h-12 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
                        ))
                    }
                </div>
                <hr className="dark:text-gray-600 mt-5 mb-3"/>
                <strong>Administrators | {group.administrators.length}</strong>
                <div className="mt-5 flex items-center gap-1">
                    {
                        group.administrators.map((member, index) => (
                            <img key={index} src={member.avatar} alt="user-avatar" className="w-12 h-12 rounded-full object-cover" onError={e => e.target.src = '/picture-user-no-load.png'}/>
                        ))
                    }
                </div>
            </article>
            <article className="dark:bg-gray-900 border shadow-md p-3 rounded-lg xl:w-[50%] w-full mb-5">
                <strong>Description</strong>
                <hr className="dark:text-gray-600 mt-3"/>
                <p className="whitespace-pre-wrap mt-3 break-words">{group.description}</p>
            </article>
        </section>
    </div>
    </section>
  )
}

InfoGroup.propTypes = {
  socket: PropTypes.object,
  BACKEND_URL: PropTypes.string
}

export default InfoGroup