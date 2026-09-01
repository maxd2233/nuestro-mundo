import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playMineCrackSound, playDiamondShatterSound, playClickSound } from "../utils/audioEffects"

const SECRET_MESSAGE = "te amo piojito <3"
const MINE_DURATION_MS = 1400

function DiamondOreBlock({ crackStage }) {
  const stone = "#686868"
  const stoneDark = "#4a4a4a"
  const diamond = "#5ED9D1"
  const diamondLight = "#E0FFFF"

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
  const s = 4.5

  const cracks = [
    null,
    "M4,4 L16,14",
    "M4,4 L16,14 M24,8 L30,20",
    "M4,4 L16,14 M24,8 L30,20 M10,24 L22,32",
    "M4,4 L16,14 M24,8 L30,20 M10,24 L22,32 M26,24 L34,34 M2,20 L12,28",
  ]

  return (
    <svg
      width={8 * s}
      height={8 * s}
      viewBox={`0 0 ${8 * s} ${8 * s}`}
      className="block drop-shadow-[0_4px_12px_rgba(94,217,209,0.35)]"
    >
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <rect key={`${x}-${y}`} x={x * s} y={y * s} width={s} height={s} fill={colors[cell]} />
        ))
      )}
      {cracks[crackStage] && (
        <path
          d={cracks[crackStage]}
          stroke="rgba(0,0,0,0.85)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default function DiamondEasterEgg() {
  const [progress, setProgress] = useState(0)
  const [mining, setMining] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [shattered, setShattered] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const lastCrackStageRef = useRef(0)

  const stopMining = useCallback(() => {
    setMining(false)
    setProgress(0)
    lastCrackStageRef.current = 0
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const startMining = useCallback((e) => {
    e.preventDefault()
    setMining(true)
    startRef.current = performance.now()
    playMineCrackSound()

    const tick = (now) => {
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / MINE_DURATION_MS, 1)
      setProgress(p)

      const stage = Math.min(Math.floor(p * 4) + (p > 0 ? 1 : 0), 4)
      if (stage > lastCrackStageRef.current) {
        lastCrackStageRef.current = stage
        playMineCrackSound()
      }

      if (p >= 1) {
        setShattered(true)
        playDiamondShatterSound()
        setTimeout(() => setRevealed(true), 400)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const crackStage = Math.min(Math.floor(progress * 4) + (progress > 0 ? 1 : 0), 4)

  if (shattered && !revealed) {
    return (
      <div className="relative w-9 h-9">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-sm shadow-[0_0_8px_#5ED9D1]"
            style={{ background: "#5ED9D1" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 80,
              y: (Math.random() - 0.5) * 80,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {!revealed && (
        <div className="group relative">
          <div className="absolute -top-7 right-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="font-pixel text-[6px] text-[#5ED9D1] bg-[#070712]/90 px-2 py-1 rounded border border-[#5ED9D1]/30">
              [ mantén presionado para picar ]
            </span>
          </div>

          <button
            aria-label="Picar diamante"
            onMouseDown={startMining}
            onMouseUp={stopMining}
            onMouseLeave={stopMining}
            onTouchStart={startMining}
            onTouchEnd={stopMining}
            className="relative cursor-pointer select-none transition-transform duration-200 active:scale-95"
            style={{ touchAction: "manipulation" }}
          >
            <DiamondOreBlock crackStage={crackStage} />
            {mining && (
              <motion.div
                className="absolute -inset-2 rounded-lg pointer-events-none"
                style={{ boxShadow: "0 0 16px rgba(94,217,209,0.7)" }}
                animate={{ scale: [1, 1.15, 1], rotate: [-2, 2, -2] }}
                transition={{ duration: 0.25, repeat: Infinity }}
              />
            )}
          </button>
        </div>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealed(false)}
          >
            <motion.div
              className="relative max-w-sm w-full bg-gradient-to-b from-[#2a1a10] via-[#1a0f08] to-[#120a05] rounded-xl px-7 py-8 border border-[#5ED9D1]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(94,217,209,0.25)]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#5ED9D1]/10 flex items-center justify-center border border-[#5ED9D1]/30 shadow-[0_0_16px_rgba(94,217,209,0.3)]">
                <span className="text-2xl">💎</span>
              </div>

              <p className="font-pixel text-[9px] text-[#5ED9D1] text-center mb-3 tracking-wider uppercase">
                [ ¡Encontraste un Diamante! ]
              </p>

              <div className="p-4 rounded-lg bg-[#0d0704]/70 border border-[#D4A537]/20 my-4 text-center">
                <p className="font-sans text-[15px] md:text-[16px] text-[#FFF] font-medium leading-relaxed tracking-wide">
                  "{SECRET_MESSAGE}"
                </p>
              </div>

              <button
                onClick={() => {
                  playClickSound()
                  setRevealed(false)
                }}
                className="mt-4 mx-auto block font-pixel text-[8px] text-[#FFD700] hover:text-[#FFF] transition-colors px-4 py-2 rounded border border-[#FFD700]/30 bg-[#FFD700]/10 cursor-pointer"
              >
                [ Cerrar ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
