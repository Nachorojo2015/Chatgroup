import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import WaveSurfer from 'wavesurfer.js'

const Player = ({ audioURL }) => {
    
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)

  const waveFormRef = useRef()
  const waveSurfer = useRef()

  const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: 'gray',
    progressColor: '#0178ff',
    cursorColor: 'black',
    responsive: true,
    height: 20,
    normalize: true,
    backend: 'MediaElement',
    barWidth: 3,
    barGap: 3
  })
  
  useEffect(() => {
    const options = formWaveSurferOptions(waveFormRef.current)
    waveSurfer.current = WaveSurfer.create(options)

    waveSurfer.current.load(audioURL)

    waveSurfer.current.on('ready', () => {
      setDuration(waveSurfer.current.getDuration())
    })

    waveSurfer.current.on('audioprocess', () => {
        setCurrentTime(waveSurfer.current.getCurrentTime())
    })

    waveSurfer.current.on('finish', () => {
      waveSurfer.current.seekTo(0); 
      setPlaying(false)
    });

    return () => {
        waveSurfer.current.un('audioprocess')
        waveSurfer.current.un('ready')
        waveSurfer.current.un('finish')
        waveSurfer.current.destroy()
    }
  }, [audioURL,]);

  const handlePlayPause = () => {
    setPlaying(!playing)
    waveSurfer.current.playPause()
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="flex items-center gap-3 min-w-52">
        <button onClick={handlePlayPause}>{playing ? <FaPause className="dark:text-white"/> : <FaPlay className="dark:text-white"/>}</button>
        <div id="waveform" ref={waveFormRef} className="w-full"></div>
        <time className="dark:text-white text-sm">{playing ? formatTime(currentTime) : formatTime(duration)}</time>
    </div>
  )
}

Player.propTypes = {
    audioURL: PropTypes.string
}

export default Player