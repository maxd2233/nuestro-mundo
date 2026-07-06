import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 60}%`,
  size: Math.random() > 0.7 ? 3 : 2,
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2,
}))

const sparklePositions = Array.from({ length: 12 }, () => ({
  x: `${-30 + Math.random() * 60}px`,
  y: `${-30 + Math.random() * 60}px`,
  delay: Math.random() * 0.4,
  size: 3 + Math.random() * 4,
}))

export default function Chest({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false)
  const sparkles = useMemo(() => sparklePositions, [])

  const handleClick = () => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(() => {
      if (onOpen) onOpen()
    }, 1500)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-[#0a0a1a]">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: 0,
              animation: `pixel-blink ${star.duration}s ease-in-out ${star.delay}s infinite`,
              boxShadow: star.size > 2 ? "0 0 4px rgba(255,255,255,0.6)" : "none",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h1
        className="font-pixel text-[12px] md:text-[16px] text-minecraft-gold mb-4 text-center leading-relaxed relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Nuestro Mundo
      </motion.h1>

      {/* Blinking subtext */}
      <motion.p
        className="font-pixel text-[7px] md:text-[9px] text-minecraft-stone mb-10 text-center relative z-10 animate-pixel-blink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        [ toca el baúl para abrirlo ]
      </motion.p>

      {/* Chest button */}
      <button
        onClick={handleClick}
        disabled={isOpen}
        className="relative w-48 h-40 md:w-64 md:h-52 cursor-pointer disabled:cursor-default bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-minecraft-gold focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a1a] z-10 min-h-[44px] min-w-[44px]"
        style={{ border: "none" }}
        aria-label="Abrir baúl de Minecraft"
      >
        <div className="relative w-full h-full">
          {/* Hinge (behind the lid) */}
          <div
            className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[60%] h-[6px] md:h-[8px] bg-minecraft-gold z-10"
            style={{
              boxShadow:
                "1px 0 0 0 #8B7332, 0 1px 0 0 #8B7332, -1px 0 0 0 #8B7332, 0 -1px 0 0 #8B7332, 1px 1px 0 0 #8B7332, -1px -1px 0 0 #8B7332",
            }}
          >
            {/* Hinge pins */}
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[4px] h-[8px] md:w-[5px] md:h-[10px] bg-[#8B7332]" />
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[4px] h-[8px] md:w-[5px] md:h-[10px] bg-[#8B7332]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[8px] md:w-[5px] md:h-[10px] bg-[#8B7332]" />
          </div>

          {/* Chest lid */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[45%] bg-[#A07040] origin-bottom z-20"
            animate={
              isOpen
                ? {
                    rotateX: -120,
                    y: -15,
                  }
                : {}
            }
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              boxShadow:
                "4px 0 0 0 #5C3A1E, 0 4px 0 0 #5C3A1E, -4px 0 0 0 #5C3A1E, 0 -4px 0 0 #5C3A1E, 3px 1px 0 0 #5C3A1E, 2px 2px 0 0 #5C3A1E, 1px 3px 0 0 #5C3A1E, -3px 1px 0 0 #5C3A1E, -2px 2px 0 0 #5C3A1E, -1px 3px 0 0 #5C3A1E, 3px -1px 0 0 #5C3A1E, 2px -2px 0 0 #5C3A1E, 1px -3px 0 0 #5C3A1E, -3px -1px 0 0 #5C3A1E, -2px -2px 0 0 #5C3A1E, -1px -3px 0 0 #5C3A1E",
            }}
          >
            {/* Lid planks */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[3px] p-[3px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#8B5E3C]"
                  style={{
                    boxShadow:
                      "1px 0 0 0 #5C3A1E, 0 1px 0 0 #5C3A1E, -1px 0 0 0 #5C3A1E, 0 -1px 0 0 #5C3A1E",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Chest body */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[60%] bg-chest"
            animate={isOpen ? { y: 3 } : {}}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow:
                "4px 0 0 0 #5C3A1E, 0 4px 0 0 #5C3A1E, -4px 0 0 0 #5C3A1E, 0 -4px 0 0 #5C3A1E, 3px 1px 0 0 #5C3A1E, 2px 2px 0 0 #5C3A1E, 1px 3px 0 0 #5C3A1E, -3px 1px 0 0 #5C3A1E, -2px 2px 0 0 #5C3A1E, -1px 3px 0 0 #5C3A1E, 3px -1px 0 0 #5C3A1E, 2px -2px 0 0 #5C3A1E, 1px -3px 0 0 #5C3A1E, -3px -1px 0 0 #5C3A1E, -2px -2px 0 0 #5C3A1E, -1px -3px 0 0 #5C3A1E",
            }}
          >
            {/* Body planks */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[3px] p-[3px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#7A4E2E]"
                  style={{
                    boxShadow:
                      "1px 0 0 0 #6B4226, 0 1px 0 0 #6B4226, -1px 0 0 0 #6B4226, 0 -1px 0 0 #6B4226",
                  }}
                />
              ))}
            </div>

            {/* Lock (golden rectangle) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-10 md:w-10 md:h-12 bg-minecraft-gold flex items-center justify-center"
              style={{
                boxShadow:
                  "2px 0 0 0 #8B7332, 0 2px 0 0 #8B7332, -2px 0 0 0 #8B7332, 0 -2px 0 0 #8B7332, 1px 1px 0 0 #8B7332, -1px -1px 0 0 #8B7332, 1px -1px 0 0 #8B7332, -1px 1px 0 0 #8B7332",
              }}
            >
              {/* Keyhole */}
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#5C3A1E]" />
                <div className="w-1.5 h-3 md:w-2 md:h-4 bg-[#5C3A1E]" />
              </div>
            </div>
          </motion.div>
        </div>
      </button>

      {/* Sparkles on open */}
      <AnimatePresence>
        {isOpen && (
          <>
            {sparkles.map((sp, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none z-20"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1, 0.5, 0],
                  x: sp.x,
                  y: sp.y,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.9,
                  delay: sp.delay,
                  ease: "easeOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              >
                <div
                  className="bg-minecraft-gold"
                  style={{
                    width: sp.size,
                    height: sp.size,
                    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                />
              </motion.div>
            ))}

            {/* "Bienvenido" message */}
            <motion.div
              className="mt-10 text-center relative z-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="font-pixel text-[9px] md:text-[11px] text-minecraft-gold mb-4 leading-relaxed">
                Bienvenido a nuestro mundo, mi amor
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span className="text-2xl md:text-3xl inline-block">⬇</span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
