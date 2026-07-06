import { useState, useRef } from "react"
import { motion } from "framer-motion"

const baseUrl = import.meta.env.BASE_URL

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src={`${baseUrl}music/amoor.mp3`} loop />
      <motion.button
        onClick={toggle}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: "#4CAF50",
          boxShadow:
            "2px 0 0 0 #388E3C, 0 2px 0 0 #388E3C, -2px 0 0 0 #388E3C, 0 -2px 0 0 #388E3C, inset 1px 1px 0 0 #81C784, inset -1px -1px 0 0 #2E7D32",
          border: "none",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        )}
      </motion.button>
    </>
  )
}
