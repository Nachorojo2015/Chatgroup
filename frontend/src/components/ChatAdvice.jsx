import { CiLock } from "react-icons/ci";

const ChatAdvice = () => {
  return (
    <article className="flex flex-col gap-2 justify-center items-center m-auto p-2 rounded-lg my-3 w-[95%] bg-yellow-200 bg-opacity-50">
        <CiLock className="dark:text-white" size={20}/>
        <p className="text-[10px] dark:text-white">Conversations in this chat are end-to-end encrypted to protect your privacy. Please avoid sharing sensitive information such as passwords, bank details or confidential personal information. Your security is our priority.</p>
    </article>
  )
}

export default ChatAdvice