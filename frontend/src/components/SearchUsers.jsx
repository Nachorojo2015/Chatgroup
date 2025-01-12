import { CiSearch } from "react-icons/ci";


const SearchUsers = () => {
  return (
    <div className="flex items-center justify-center relative w-[80%]">
      <input placeholder="Search Users" className="mt-2 w-full indent-2 rounded-md p-1 pr-10 placeholder:text-black"/>
      <CiSearch size={22} className="absolute right-2 top-3"/>
    </div>
  )
}

export default SearchUsers