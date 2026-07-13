import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

const creeperGrid = [
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 1, 1, 2, 2, 1],
  [1, 2, 2, 1, 1, 2, 2, 1],
  [1, 1, 1, 2, 2, 1, 1, 1],
  [1, 1, 2, 2, 2, 2, 1, 1],
  [1, 1, 2, 1, 1, 2, 1, 1],
  [1, 1, 1, 2, 2, 1, 1, 1],
]

const creeperColors = { 0: "transparent", 1: "#4CAF50", 2: "#1B5E20" }

function CreeperFace({ size = 3 }) {
  return (
    <div
      className="inline-grid gap-px"
      style={{ gridTemplateColumns: `repeat(8, ${size}px)` }}
    >
      {creeperGrid.flatMap((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            style={{
              width: size,
              height: size,
              backgroundColor: creeperColors[cell],
            }}
          />
        ))
      )}
    </div>
  )
}

export default function HiddenCreeper() {
  const [found, setFound] = useState(false)
  const [hovering, setHovering] = useState(false)

  const pos = useMemo(() => ({
    left: `${15 + Math.random() * 70}%`,
    top: `${10 + Math.random() * 50}%`,
  }), [])

  return (
    <div
      className="absolute z-[2] cursor-pointer"
      style={pos}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => setFound(true)}
    >
      <motion.div
        animate={{
          opacity: hovering ? 0.9 : 0,
          scale: hovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.4 }}
      >
        <CreeperFace size={3} />
      </motion.div>

      <AnimatePresence>
        {found && (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-pixel text-[6px] md:text-[7px] text-[#4CAF50]">
              Sssss...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
