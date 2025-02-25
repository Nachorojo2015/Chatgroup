import { FaUnlock } from "react-icons/fa6";

const UnlockUserButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 text-sm transition hover:opacity-70">
        <FaUnlock />
        <span>Unlock User</span>
    </button>
  )
}

export default UnlockUserButton