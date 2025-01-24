import PropTypes from "prop-types"
import { FaInfoCircle, FaUser } from "react-icons/fa"
import { IoMdAddCircle } from "react-icons/io"

const Group = ({ groupSearch, username}) => {

  return (
    <article className="flex items-center gap-5 p-2 transition hover:bg-slate-200 w-full">
        <img src={groupSearch.picture} alt="picture-group" className="w-16 h-16 rounded-full"/>
          <div>
            <p className="font-semibold">{groupSearch.name}</p>
            <p>
             <span>{groupSearch.members?.length}</span>
             <FaUser className="inline ml-1 mb-[2px]" />
            </p>
          </div>
            {
                groupSearch.creator.username === username ? 
                <span className="ml-auto text-blue-500">Owner</span>
                :
                <div className="flex items-center gap-3 ml-auto">
                  <button>
                    <FaInfoCircle size={30}/>
                  </button>
                  <button>
                    <IoMdAddCircle size={35}/>
                  </button>
                </div>
            }
    </article>
  )
}

Group.displayName = 'Group'

Group.propTypes = {
    groupSearch: PropTypes.object,
    username: PropTypes.string
}

export default Group