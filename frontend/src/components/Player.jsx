import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const Player = ({ audioURL }) => {
    
  const audio = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  useEffect(() => {
    const audioEl = audio.current;
    if (!audioEl) return;

    const updateTime = () => setCurrentTime(audioEl.currentTime);
    const setAudioDuration = () => setDuration(audioEl.duration);
    const handleEnded = () => stopAudio();

    audioEl.addEventListener("timeupdate", updateTime);
    audioEl.addEventListener("loadedmetadata", setAudioDuration);
    audioEl.addEventListener('ended', handleEnded)

    return () => {
      audioEl.removeEventListener("timeupdate", updateTime);
      audioEl.removeEventListener("loadedmetadata", setAudioDuration);
      audioEl.addEventListener('ended', handleEnded)
    } 
}, []);

  function stopAudio() {
    audio.current.pause()
    audio.current.currentTime = 0
    setIsPlaying(false)
  }

  function playAudio() {
    audio.current.play()
    setIsPlaying(true)
  }

  function handleSeek(e) {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audio.current.currentTime = newTime;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="flex items-center gap-3 min-w-52">
        <audio src={audioURL} ref={audio} hidden></audio>
        {
            isPlaying ? 
            <button onClick={stopAudio}>
                <FaPause className="dark:text-white"/>
            </button>
            :
            <button onClick={playAudio}>
                <FaPlay className="dark:text-white"/>
            </button>
        }
        <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
         />
        <time className="dark:text-white">{formatTime(currentTime)}</time>
    </div>
  )
}

Player.propTypes = {
    audioURL: PropTypes.string
}

export default Player