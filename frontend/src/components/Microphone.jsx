import PropTypes from "prop-types"
import { useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

const Microphone = ({ setActiveMicro, socket, id, userId }) => {

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

      // Crear un FormData para enviar el archivo al servidor
      const formData = new FormData();
      formData.append('file', audioBlob);

      const toastId = toast.loading('Sending audio...')

      try {
        const response = await fetch('http://localhost:3000/messages/upload', {
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
  
        socket.emit('message', { message: {
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
    <div className="ml-auto dark:text-white">
      {!isRecording ? (
        <button onClick={startRecording} className={`${audioURL ? 'hidden' : ''}`}><FaMicrophone size={20}/></button>
      ) : (
        <div className="flex items-center gap-3">
         <span className="w-3 h-3 rounded-full bg-red-500 animate-blink"></span>
         <button onClick={stopRecording}><FaStop size={30}/></button>
        </div>
      )}
      {audioURL && (
        <div className="flex gap-3">
          <button onClick={deleteAudio}><FaRegTrashAlt /></button>
          <audio controls src={audioURL} className="h-[30px]"/>
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
  userId: PropTypes.string
}

export default Microphone