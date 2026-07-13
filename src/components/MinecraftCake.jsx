import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sliceGrid = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [1, 2, 2, 3, 2, 2, 1],
  [1, 2, 3, 3, 3, 2, 1],
  [1, 2, 2, 3, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 4, 4, 4, 4, 4, 0],
]

const cakeColors = { 0: "transparent", 1: "#F5F5F5", 2: "#D4A537", 3: "#FF4D6D", 4: "#8B4513" }
const eatenColors = { 0: "transparent", 1: "#5C3A1E", 2: "#5C3A1E", 3: "#5C3A1E", 4: "#3D2010" }

function CakeSlice({ eaten, size = 4 }) {
  const colors = eaten ? eatenColors : cakeColors
  return (
    <div
      className="inline-grid gap-px"
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
              boxShadow: cell !== 0 ? "0.5px 0 0 0 rgba(0,0,0,0.3)" : "none",
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
    setEaten(true)
    setParticles(true)
    setTimeout(() => setParticles(false), 1200)
  }

  return (
    <div className="flex flex-col items-center gap-3 my-8 md:my-12">
      <motion.div
        className="cursor-pointer select-none relative"
        whileHover={{ scale: eaten ? 1 : 1.08 }}
        whileTap={{ scale: eaten ? 1 : 0.95 }}
        onClick={handleClick}
        role="button"
        aria-label={eaten ? "Pastel comido" : "Comer pastel"}
      >
        <CakeSlice eaten={eaten} size={5} />

        {/* Crumbs when eaten */}
        <AnimatePresence>
          {particles && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-minecraft-gold"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ opacity: 1, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 40,
                    y: -10 - Math.random() * 20,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {eaten ? (
          <motion.p
            key="eaten"
            className="font-pixel text-[7px] md:text-[8px] text-minecraft-stone"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            +2 🍗
          </motion.p>
        ) : (
          <motion.p
            key="hint"
            className="font-pixel text-[6px] md:text-[7px] text-minecraft-stone opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
          >
            [ toca para comer ]
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
