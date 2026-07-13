import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MinecraftChest from "./MinecraftChest"
import RelationshipClock from "./RelationshipClock"
import DiamondEasterEgg from "./DiamondEasterEgg"
import FloatingHearts from "./FloatingHearts"
import TorchBorder from "./TorchBorder"
import HiddenCreeper from "./HiddenCreeper"
import SnowBiome from "./SnowBiome"

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

  const handleChestOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(() => {
      if (onOpen) onOpen()
    }, 1500)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-[#0a0a1a]">
      {/* Snow biome overlay */}
      <SnowBiome />

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

      {/* Hidden creeper easter egg */}
      <HiddenCreeper />

      {/* Torch borders */}
      <TorchBorder />

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

      {/* Minecraft Chest */}
      <div className="relative z-10">
        <MinecraftChest onOpen={handleChestOpen} />
      </div>

      {/* Floating hearts on open */}
      <FloatingHearts active={isOpen} />

      {/* Welcome message + sparkles on open */}
      <AnimatePresence>
        {isOpen && (
          <>
            {sparkles.map((sp, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none z-20"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1, 0.5, 0],
                  x: sp.x,
                  y: sp.y,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.9, delay: sp.delay, ease: "easeOut" }}
                style={{ left: "50%", top: "50%" }}
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

      {/* Relationship clock hanging from the chest */}
      <div className="relative z-10 mt-4">
        <RelationshipClock />
      </div>

      {/* Diamond easter egg – bottom-right corner */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
        <DiamondEasterEgg />
      </div>
    </section>
  )
}
