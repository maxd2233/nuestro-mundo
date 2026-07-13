import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const WOOD_BASE = "#7A4B22"
const WOOD_SEAM = "#5C3A1A"
const WOOD_LID = "#8A5A2C"
const METAL = "#2E2A24"
const METAL_LIGHT = "#454038"
const GOLD = "#D4A537"
const KEYHOLE = "#17110A"

const plankGrain = {
  backgroundImage:
    "repeating-linear-gradient(90deg, transparent 0px, transparent 7px, rgba(0,0,0,0.18) 7px, rgba(0,0,0,0.18) 9px)",
}

const blockShadow = (base) => ({
  boxShadow:
    `2px 0 0 0 ${base}, 0 2px 0 0 ${base}, -2px 0 0 0 ${base}, 0 -2px 0 0 ${base}, ` +
    `1px 1px 0 0 ${base}, -1px -1px 0 0 ${base}, 1px -1px 0 0 ${base}, -1px 1px 0 0 ${base}, ` +
    `inset 1px 1px 0 0 rgba(255,255,255,0.12), inset -1px -1px 0 0 rgba(0,0,0,0.35)`,
})

// Cerrojo pixel-art, grid 8x8
function Latch() {
  const grid = [
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 2, 2, 1, 1],
    [1, 1, 2, 3, 3, 2, 1, 1],
    [1, 1, 2, 3, 3, 2, 1, 1],
    [1, 1, 2, 2, 2, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
  ]
  const colors = { 1: METAL, 2: GOLD, 3: KEYHOLE }
  const s = 3
  return (
    <svg
      width={8 * s}
      height={8 * s}
      viewBox={`0 0 ${8 * s} ${8 * s}`}
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: "38%" }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell === 0 ? null : (
            <rect key={`${x}-${y}`} x={x * s} y={y * s} width={s} height={s} fill={colors[cell]} />
          )
        )
      )}
    </svg>
  )
}

function Sparkle({ delay }) {
  return (
    <motion.div
      className="absolute left-1/2 top-[35%] w-1 h-1"
      style={{ background: GOLD }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: (Math.random() - 0.5) * 90,
        y: -40 - Math.random() * 40,
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    />
  )
}

export default function MinecraftChest({ onOpen }) {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    onOpen?.()
  }

  return (
    <div
      className="relative mx-auto cursor-pointer select-none"
      style={{ width: 180, height: 150, perspective: 600 }}
      onClick={handleOpen}
      role="button"
      aria-label="Abrir cofre"
    >
      {/* resplandor interior, aparece al abrir */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="absolute left-3 right-3 top-4 h-16 rounded-sm pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212,165,55,0.55), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* particulas doradas al abrir */}
      {opened && [...Array(7)].map((_, i) => <Sparkle key={i} delay={0.3 + i * 0.05} />)}

      {/* base del cofre */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-b-md overflow-hidden"
        style={{ height: "62%", background: WOOD_BASE, ...blockShadow(WOOD_SEAM), ...plankGrain }}
      >
        {/* franja inferior mas oscura */}
        <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: WOOD_SEAM }} />
      </div>

      {/* cerrojo, fijo sobre la union tapa/base */}
      <Latch />

      {/* tapa, se abre sobre su bisagra */}
      <motion.div
        className="absolute top-0 left-0 right-0 rounded-t-md overflow-hidden origin-bottom"
        style={{
          height: "48%",
          background: WOOD_LID,
          transformStyle: "preserve-3d",
          ...blockShadow(WOOD_SEAM),
          ...plankGrain,
        }}
        animate={
          opened
            ? { rotateX: -115, y: -10 }
            : { rotateX: 0, y: 0 }
        }
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
      >
        {/* franja superior mas clara, borde de la tapa */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{ background: GOLD, opacity: 0.85 }} />
      </motion.div>
    </div>
  )
}
