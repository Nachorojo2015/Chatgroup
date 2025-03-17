import { forwardRef, useRef, useState } from "react"
import { MdOutlineEmojiEmotions } from "react-icons/md"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useChatStore } from "../store/chatStore"
import PropTypes from "prop-types"

const EmojiMart = forwardRef(({ message }, ref) => {

  const [isPickerVisible, setPickerVisible] = useState(false)   
  const { setMessage, isBlocked, activeMicro } = useChatStore()
  const btnPickerRef = useRef()
  const picker = useRef()

  function openClosePicker() {
    setPickerVisible(!isPickerVisible)
    document.addEventListener('click', () => {
        if (!btnPickerRef.current.contains(event.target) && !picker.current.contains(event.target)) {
          setPickerVisible(false)
          document.body.classList.remove('pointer-events-none');
        }
    })
  }

  const handleEmojiSelect = (e) => {
    if (ref.current) {
      ref.current.value += e.native
      const cursorPos = ref.current.selectionStart; // Posición del cursor
      const textBefore = message.substring(0, cursorPos); // Texto antes del cursor
      const textAfter = message.substring(cursorPos); // Texto después del cursor
  
      const newMessage = textBefore + e.native + textAfter; // Insertar emoji en la posición correcta
      setMessage(newMessage); // Actualizar el estado
  
      setTimeout(() => {
        ref.current.focus(); // Mantener el foco en el textarea
        ref.current.selectionStart = ref.current.selectionEnd = cursorPos + e.native.length; // Mover el cursor después del emoji
      }, 0);
    }
  };

  const isDark = document.querySelector('html').className === 'dark'

  return (
    <>
    <button onClick={openClosePicker} ref={btnPickerRef} disabled={ isBlocked } className={`${activeMicro ? 'hidden' : ''} transition hover:opacity-60`}>
      <MdOutlineEmojiEmotions className="dark:text-white" size={20}/>
    </button>
    <div ref={picker} className={`${isPickerVisible ? 'scale-up-bottom-left absolute bottom-12 left-0' : 'hidden'}`}>
      <Picker data={data} previewPosition="none" onEmojiSelect={handleEmojiSelect} theme={isDark ? 'dark' : ''}/>
    </div>
    </>
  )
})

EmojiMart.displayName = 'EmojiMart'

EmojiMart.propTypes = {
  message: PropTypes.string
}

export default EmojiMart