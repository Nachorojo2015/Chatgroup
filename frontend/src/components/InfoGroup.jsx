import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import { MdGroups } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { SiPrivateinternetaccess } from "react-icons/si";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa"
import { MdHistory } from "react-icons/md";

const InfoGroup = () => {

  const { id } = useParams()

  const [group, setGroup] = useState(null)


  function formateDate(fecha) {
    fecha = new Date(fecha)
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const año = fecha.getFullYear();
    const fechaFormateada = `${dia} de ${mes} del ${año}`;
    return fechaFormateada
  }

  useEffect(() => {
    async function getInfoGroup() {
        try {
          const response = await fetch(`http://localhost:3000/group/${id}`);
    
          if (!response.ok) {
            const errorMessage = await response.text();
            return toast.error(errorMessage);
          }
    
          const data = await response.json();
          console.log(data.group)
          setGroup(data.group);
        } catch (error) {
          console.log(error);
        }
      }
    
      getInfoGroup();
  }, [id])

  if (!group) {
    return (
    <div className="flex justify-center items-center h-screen">
        <ClipLoader />
    </div>
    )
  }
  
  return (
    <section className="bg-black bg-opacity-85">
        <article className="bg-gray-900 bg-opacity-80 flex flex-col items-center">
            <img src={group.picture} alt="picture-group" className="h-96 w-[80%] rounded-b-md object-cover"/>
            <div className="flex justify-between w-[80%] mt-5 mb-5">
                <div className="flex flex-col">
                    <strong className="text-2xl text-white">{group.name}</strong>
                    <span className="font-semibold text-gray-400">{group.visibility} group | {group.members.length} members</span>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 rounded-md bg-blue-500 text-white">
                        <MdGroups />
                        <strong>Join to group</strong>
                    </button>
                    <button className="flex items-center gap-3 px-6 rounded-md bg-gray-600 text-white">
                        <IoCopyOutline />
                        <strong>Copy Link</strong>
                    </button>
                </div>
            </div>
        </article>
        <section className="flex flex-col items-center gap-12 mt-12 text-white">
            <article className="bg-gray-900 p-3 rounded-lg w-[50%]">
                <strong>Information about this group</strong>
                <hr className="text-gray-600 mt-3"/>
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
            <article className="bg-gray-900 p-3 rounded-lg w-[50%]">
                <strong>Members | {group.members.length}</strong>
                <hr className="text-gray-600 mt-3"/>
                <div className="mt-5 flex items-center gap-1">
                    {
                        group.members.map((member, index) => (
                            <img key={index} src={member.avatar} alt="user-avatar" className="w-12 h-12 rounded-full object-cover"/>
                        ))
                    }
                </div>
                <hr className="text-gray-600 mt-5 mb-3"/>
                <strong>Administrators | {group.administrators.length}</strong>
                <div className="mt-5 flex items-center gap-1">
                    {
                        group.administrators.map((member, index) => (
                            <img key={index} src={member.avatar} alt="user-avatar" className="w-12 h-12 rounded-full object-cover"/>
                        ))
                    }
                </div>
            </article>
            <article className="bg-gray-900 p-3 rounded-lg w-[50%] mb-5">
                <strong>Description</strong>
                <hr className="text-gray-600 mt-3"/>
                <p className="whitespace-pre-wrap mt-3 break-words">{group.description}</p>
            </article>
        </section>
    </section>
  )
}

export default InfoGroup