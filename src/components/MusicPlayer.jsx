import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toggleSoundEffects, isSoundEnabled, playClickSound } from "../utils/audioEffects"

const baseUrl = import.meta.env.BASE_URL

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [sfxOn, setSfxOn] = useState(() => isSoundEnabled())
  const audioRef = useRef(null)

  const toggle = () => {
    playClickSound()
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleToggleSfx = (e) => {
    e.stopPropagation()
    const next = toggleSoundEffects()
    setSfxOn(next)
    if (next) playClickSound()
  }

  return (
    <>
      <audio ref={audioRef} src={`${baseUrl}music/amoor.mp3`} loop />

      <div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Track info pill on hover or playing */}
        <AnimatePresence>
          {(hovered || playing) && (
            <motion.div
              className="hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#120c18]/90 border border-[#D4A537]/30 backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Animated Equalizer Bars when playing */}
              <div className="flex items-end gap-0.5 h-3.5">
                {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#FFD700] rounded-t-sm"
                    animate={
                      playing
                        ? { height: ["20%", `${h * 100}%`, "30%"] }
                        : { height: "20%" }
                    }
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col">
                <span className="font-pixel text-[6px] text-[#FFD700] tracking-wide">
                  {playing ? "REPRODUCIENDO" : "MÚSICA DE FONDO"}
                </span>
                <span className="font-sans text-[11px] text-white font-medium">
                  Amor Completo ♪
                </span>
              </div>

              {/* SFX Toggle Button */}
              <button
                onClick={handleToggleSfx}
                title={sfxOn ? "Efectos de sonido: Activados" : "Efectos de sonido: Silenciados"}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer border ${
                  sfxOn
                    ? "bg-[#D4A537]/20 border-[#D4A537]/50 text-[#FFD700]"
                    : "bg-white/5 border-white/10 text-white/40"
                }`}
              >
                {sfxOn ? "🔊 SFX" : "🔇 SFX"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Disc / Jukebox Button */}
        <motion.button
          onClick={toggle}
          className="relative w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-[#D4A537]/50 shadow-[0_8px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(212,165,55,0.3)] bg-[#18110b]"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
        >
          {/* Vinyl Disc Grooves */}
          <motion.div
            className="absolute inset-0.5 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#1e150e] via-[#332215] to-[#1a110a]"
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[85%] h-[85%] rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-[65%] h-[65%] rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD700] to-[#E67E22] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#110b06]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Play/Pause Overlay Icon */}
          <div className="relative z-10 text-white drop-shadow-md">
            {playing ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white" className="translate-x-0.5">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            )}
          </div>
        </motion.button>
      </div>
    </>
  )
}
