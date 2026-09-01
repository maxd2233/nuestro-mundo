import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playEatSound } from "../utils/audioEffects"

const sliceGrid = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [1, 2, 2, 3, 2, 2, 1],
  [1, 2, 3, 3, 3, 2, 1],
  [1, 2, 2, 3, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 4, 4, 4, 4, 4, 0],
]

const cakeColors = { 0: "transparent", 1: "#FFFFFF", 2: "#F0C27B", 3: "#FF4D6D", 4: "#8B4513" }
const eatenColors = { 0: "transparent", 1: "#3D2010", 2: "#3D2010", 3: "#3D2010", 4: "#221105" }

function CakeSlice({ eaten, size = 5.5 }) {
  const colors = eaten ? eatenColors : cakeColors
  return (
    <div
      className="inline-grid gap-px p-2 rounded-lg bg-[#140b05]/60 border border-[#D4A537]/30 shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
      style={{ gridTemplateColumns: `repeat(7, ${size}px)` }}
    >
      {sliceGrid.flatMap((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            style={{
              width: size,
              height: size,
              backgroundColor: colors[cell],
              boxShadow: cell !== 0 ? "0.5px 0 0 0 rgba(0,0,0,0.4)" : "none",
            }}
          />
        ))
      )}
    </div>
  )
}

export default function MinecraftCake() {
  const [eaten, setEaten] = useState(false)
  const [particles, setParticles] = useState(false)

  const handleClick = () => {
    if (eaten) return
    playEatSound()
    setEaten(true)
    setParticles(true)
    setTimeout(() => setParticles(false), 1400)
  }

  return (
    <div className="flex flex-col items-center gap-3 my-12 md:my-16">
      <motion.div
        className="cursor-pointer select-none relative"
        whileHover={{ scale: eaten ? 1 : 1.1, y: -2 }}
        whileTap={{ scale: eaten ? 1 : 0.95 }}
        onClick={handleClick}
        role="button"
        aria-label={eaten ? "Pastel comido" : "Comer pastel"}
      >
        <CakeSlice eaten={eaten} size={6} />

        {/* Crumbs & Heart Particles when eaten */}
        <AnimatePresence>
          {particles && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-sm"
                  style={{
                    left: "50%",
                    top: "50%",
                    background: i % 2 === 0 ? "#FFD700" : "#FF4D6D",
                    boxShadow: i % 2 === 0 ? "0 0 6px #FFD700" : "0 0 6px #FF4D6D",
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 60,
                    y: -20 - Math.random() * 40,
                    scale: 0.3,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: i * 0.04, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {eaten ? (
          <motion.div
            key="eaten"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120904]/80 border border-[#78E08F]/40"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <span className="font-pixel text-[8px] md:text-[9px] text-[#78E08F]">
              +2 🍗 ¡Vida Restaurada! 💕
            </span>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            className="font-pixel text-[7px] md:text-[8px] text-[#C2B299] opacity-70 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
          >
            [ toca el pastel para compartirlo ]
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
