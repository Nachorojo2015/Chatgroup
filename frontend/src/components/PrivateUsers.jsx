import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ClipLoader } from "react-spinners";

const PrivateUsers = ({ privateUsers }) => {
  const [usersSearch, setUsersSearch] = useState([])
  const [loader, setLoader] = useState(false)

  const modalRef = useRef()
  const inputSearchRef = useRef()
  const labelInputSearchRef = useRef()

  async function searchUsers(e) {
    e.preventDefault()

    const valueSearch = inputSearchRef.current.value

    if (!valueSearch) {
      labelInputSearchRef.current.innerText = 'Insert a value'
      return
    }

    if (!valueSearch.includes('@')) {
      labelInputSearchRef.current.innerText = 'Insert an @ at the beginning to search a username'
      return
    }

    labelInputSearchRef.current.innerText = ''
    setLoader(true)

    try {
      const response = await fetch(`http://localhost:3000/user/${valueSearch}`, {
        credentials: 'include'
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        labelInputSearchRef.current.innerText = errorMessage
        setUsersSearch([])
      }

      const data = await response.json()

      console.log(data.users)

      setUsersSearch(data.users)
    } catch (error) {
      console.log(error.message)
    }

    setLoader(false)

  }

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
          <button type="button" className="text-white w-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => modalRef.current.showModal()}>Search New Users</button>
        </div>

        <dialog ref={modalRef} className="backdrop:bg-[rgba(0,0,0,.60)] p-3 rounded-md shadow-md xl:min-w-[450px]">
          <IoMdClose className="cursor-pointer ml-auto" onClick={() => modalRef.current.close()} size={22}/>
          <form className="flex flex-col items-start" onSubmit={searchUsers}>
              <label ref={labelInputSearchRef} htmlFor="user" className="text-sm text-red-500"></label>
              <div className="flex items-center gap-3 w-full mt-1">
                <input ref={inputSearchRef} name="user" placeholder="Enter a @username" className="p-1 rounded w-full indent-1 border-2 border-black"/>
                <button type="submit">
                  <CiSearch size={30}/>
                </button>
              </div>
          </form>
          <section className="flex items-center justify-center flex-col gap-3 mt-5">
            {
              loader ? 
              <ClipLoader /> 
               : 
              usersSearch.map((userSearch, index) => (
              <article className="flex items-center gap-5 p-2 transition hover:bg-slate-200 w-full cursor-pointer rounded" key={index}>
                  <img src={userSearch.avatar} alt="" className="w-16 h-16 rounded-full"/>
                  <div>
                    <p className="font-semibold">{userSearch.fullname}</p>
                    <p>{userSearch.username}</p>
                  </div>
              </article>
              ))
            }
          </section>
        </dialog>
    </div>
  );
};

PrivateUsers.displayName = "PrivateUsers";

PrivateUsers.propTypes = {
  privateUsers: PropTypes.array,
};

export default PrivateUsers;
