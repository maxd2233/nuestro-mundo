import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ⚠️ EDITÁ ACÁ tu mensaje secreto
const SECRET_MESSAGE = "te amo piojito <3"

const MINE_DURATION_MS = 1400

// Bloque de mineral de diamante, pixel-art dibujado a bloques (sin imagen externa)
function DiamondOreBlock({ crackStage }) {
  const stone = "#8A8A8A"
  const stoneDark = "#6B6B6B"
  const diamond = "#5ED9D1"
  const diamondLight = "#9FF0EA"

  // 8x8 grid: 0 = vacio, 1 = piedra, 2 = piedra oscura, 3 = diamante, 4 = brillo diamante
  const grid = [
    [1, 1, 2, 1, 1, 1, 2, 1],
    [1, 3, 3, 1, 2, 3, 1, 1],
    [2, 3, 4, 1, 1, 3, 3, 2],
    [1, 1, 1, 2, 1, 1, 1, 1],
    [1, 2, 1, 1, 1, 2, 1, 1],
    [1, 3, 3, 2, 1, 3, 1, 2],
    [2, 3, 4, 1, 3, 3, 1, 1],
    [1, 1, 1, 1, 1, 1, 2, 1],
  ]
  const colors = { 1: stone, 2: stoneDark, 3: diamond, 4: diamondLight }
  const s = 3.5

  // Lineas de grieta segun etapa de minado (0 a 4)
  const cracks = [
    null,
    "M4,4 L14,12",
    "M4,4 L14,12 M20,6 L26,16",
    "M4,4 L14,12 M20,6 L26,16 M8,20 L18,26",
    "M4,4 L14,12 M20,6 L26,16 M8,20 L18,26 M22,20 L28,28 M2,16 L10,22",
  ]

  return (
    <svg width={8 * s} height={8 * s} viewBox={`0 0 ${8 * s} ${8 * s}`} className="block">
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <rect key={`${x}-${y}`} x={x * s} y={y * s} width={s} height={s} fill={colors[cell]} />
        ))
      )}
      {cracks[crackStage] && (
        <path
          d={cracks[crackStage]}
          stroke="rgba(0,0,0,0.75)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default function DiamondEasterEgg() {
  const [progress, setProgress] = useState(0) // 0 a 1
  const [mining, setMining] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [shattered, setShattered] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  const stopMining = useCallback(() => {
    setMining(false)
    setProgress(0)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const startMining = useCallback((e) => {
    e.preventDefault()
    setMining(true)
    startRef.current = performance.now()

    const tick = (now) => {
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / MINE_DURATION_MS, 1)
      setProgress(p)
      if (p >= 1) {
        setShattered(true)
        setTimeout(() => setRevealed(true), 350)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const crackStage = Math.min(Math.floor(progress * 4) + (progress > 0 ? 1 : 0), 4)

  if (shattered && !revealed) {
    // pequeño instante de particulas antes de mostrar el modal
    return (
      <div className="relative w-[28px] h-[28px]">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1"
            style={{ background: "#5ED9D1" }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 40,
              y: (Math.random() - 0.5) * 40,
              opacity: 0,
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {!revealed && (
        <button
          aria-label=""
          onMouseDown={startMining}
          onMouseUp={stopMining}
          onMouseLeave={stopMining}
          onTouchStart={startMining}
          onTouchEnd={stopMining}
          className="relative opacity-70 hover:opacity-100 active:opacity-100 transition-opacity duration-300 select-none"
          style={{ touchAction: "manipulation" }}
        >
          <DiamondOreBlock crackStage={crackStage} />
          {mining && (
            <motion.div
              className="absolute -inset-1 rounded-full pointer-events-none"
              style={{ boxShadow: "0 0 10px rgba(94,217,209,0.5)" }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          )}
        </button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealed(false)}
          >
            <motion.div
              className="relative max-w-sm w-full bg-[#5C3A1E] rounded-sm px-6 py-8"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow:
                  "2px 0 0 0 #3D2712, 0 2px 0 0 #3D2712, -2px 0 0 0 #3D2712, 0 -2px 0 0 #3D2712, " +
                  "1px 1px 0 0 #3D2712, -1px -1px 0 0 #3D2712, 1px -1px 0 0 #3D2712, -1px 1px 0 0 #3D2712, " +
                  "inset 1px 1px 0 0 #7A4E2E, inset -1px -1px 0 0 #1a0a05",
              }}
            >
              <p className="font-pixel text-[8px] text-[#5ED9D1] text-center mb-4 tracking-wide">
                [ Encontraste un diamante ]
              </p>
              <p className="font-sans text-[13px] md:text-[14px] text-[#E8D5B7] leading-relaxed text-center whitespace-pre-line">
                {SECRET_MESSAGE}
              </p>
              <button
                onClick={() => setRevealed(false)}
                className="mt-6 mx-auto block font-pixel text-[8px] text-minecraft-gold hover:text-[#E8D5B7] transition-colors"
              >
                [ cerrar ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
