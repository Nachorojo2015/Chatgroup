import PropTypes from "prop-types"
import { useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import Player from "./Player";

const Microphone = ({ setActiveMicro, socket, id, userId, BACKEND_URL }) => {

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaStreamRef = useRef(null); // Referencia para el MediaStream

  const startRecording = async () => {
    setActiveMicro(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream; // Almacenamos el MediaStream
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error al acceder al micrófono:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    // Detener las pistas de audio del MediaStream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const deleteAudio = () => {
    setActiveMicro(false)
    setAudioURL(''); // Elimina la URL del audio
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop()); // Detiene las pistas de audio
    }
  };

  const sendAudio = async () => {
    setActiveMicro(false);
    setAudioURL('');
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

      const isDark = document.querySelector('html').className === 'dark'
      const audioSizeInMb = audioBlob.size / 1024 / 1024

      if (audioSizeInMb > 10) return toast.error('Audio size is greater than 10mb', {
        theme: isDark ? 'dark' : 'light'
      })

      const formData = new FormData();
      formData.append('file', audioBlob);
      
      const toastId = toast.loading('Sending audio...', {
        theme: isDark ? 'dark' : 'light'
      })

      try {
        const response = await fetch(`${BACKEND_URL}/messages/upload/file`, {
          method: 'POST',
          body: formData,
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
  
        const data = await response.json()
        const fileUrl = data.fileUrl
  
        socket.emit('send-message', { message: {
          format: 'audio',
          content: fileUrl,
          chatId: id,
          user: userId
        }})
  
        toast.update(toastId, {
          render: 'Audio upload',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        })
      } catch (error) {
        console.log(error)
      }

      // Limpiar el estado y detener el micrófono
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
       }
       audioChunksRef.current = []; // Limpiar los chunks de audio
    }
  }

  return (
    <div>
      {!isRecording ? (
        <button onClick={startRecording} disabled={ id === 'Block' } className={`${audioURL ? 'hidden' : 'mt-[5px]'}`}><FaMicrophone size={20}/></button>
      ) : (
        <div className="flex items-center gap-3">
         <span className="w-3 h-3 rounded-full bg-red-500 animate-blink"></span>
         <button onClick={stopRecording}><FaStop size={30}/></button>
        </div>
      )}
      {audioURL && (
        <div className="flex gap-5">
          <button onClick={deleteAudio}><FaRegTrashAlt /></button>
          <Player audioURL={audioURL}/>
          <button onClick={sendAudio}><IoSend /></button>
        </div>
      )}
    </div>
  );
}

Microphone.propTypes = {
  activeMicro: PropTypes.bool,
  setActiveMicro: PropTypes.func,
  socket: PropTypes.object,
  id: PropTypes.string,
  userId: PropTypes.string,
  BACKEND_URL: PropTypes.string
}

export default Microphone