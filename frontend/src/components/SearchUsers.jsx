import { CiSearch } from "react-icons/ci";
import { usePrivateUsers } from "../store/privateUsersStore";


const SearchUsers = () => {

  const setValueSearch = usePrivateUsers(state => state.setValueSearch)

  return (
    <div className="flex items-center justify-center relative w-[80%]">
      <input onChange={setValueSearch} placeholder="Search Users" className="mt-2 w-full indent-2 rounded-md p-1 pr-10 placeholder:text-black dark:bg-black dark:bg-opacity-40 dark:placeholder:text-white dark:text-gray-100"/>
      <CiSearch size={22} className="absolute right-2 top-3 dark:text-white"/>
    </div>
  )
}

export default SearchUsers