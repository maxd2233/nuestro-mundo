import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero3DScene from "./Hero3DScene"
import MinecraftChest from "./MinecraftChest"
import ErrorBoundary from "./ErrorBoundary"
import RelationshipClock from "./RelationshipClock"
import DiamondEasterEgg from "./DiamondEasterEgg"
import FloatingHearts from "./FloatingHearts"
import TorchBorder from "./TorchBorder"
import HiddenCreeper from "./HiddenCreeper"
import SnowBiome from "./SnowBiome"

const stars = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 70}%`,
  size: Math.random() > 0.7 ? 3 : 2,
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2.5,
}))

const sparklePositions = Array.from({ length: 16 }, () => ({
  x: `${-40 + Math.random() * 80}px`,
  y: `${-40 + Math.random() * 80}px`,
  delay: Math.random() * 0.5,
  size: 3 + Math.random() * 5,
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-[#06060f] pt-12 pb-16">
      {/* Snow biome overlay */}
      <SnowBiome />

      {/* Stars background with subtle depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white will-change-opacity"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: 0,
              animation: `pixel-blink ${star.duration}s ease-in-out ${star.delay}s infinite`,
              boxShadow: star.size > 2 ? "0 0 6px rgba(255,255,255,0.8)" : "none",
            }}
          />
        ))}
      </div>

      {/* Hidden creeper easter egg */}
      <HiddenCreeper />

      {/* Torch borders with dynamic lighting */}
      <TorchBorder />

      {/* Header text container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto mb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[#D4A537]/30 bg-[#1a140d]/60 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#5ED9D1] animate-pulse" />
          <span className="font-pixel text-[6px] md:text-[7px] text-[#D4A537] tracking-wider uppercase">
            Nuestra Aventura Juntos
          </span>
        </motion.div>

        <motion.h1
          className="font-pixel text-[15px] sm:text-[18px] md:text-[24px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#FFD700] to-[#C99700] mb-3 text-center leading-relaxed tracking-wider drop-shadow-[0_4px_12px_rgba(255,215,0,0.25)]"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          Nuestro Mundo
        </motion.h1>

        {/* Blinking subtext */}
        <motion.p
          className="font-pixel text-[7px] md:text-[9px] text-[#A0A0B2] text-center animate-pixel-blink tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          [ toca o haz clic en el baúl para abrirlo ]
        </motion.p>
      </div>

      {/* 3D WebGL Chest Scene with resilient fallback */}
      <div className="relative z-10 w-full max-w-3xl h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
        <ErrorBoundary
          fallback={
            <div className="py-12">
              <MinecraftChest onOpen={handleChestOpen} />
            </div>
          }
        >
          <Hero3DScene isOpen={isOpen} onOpenChest={handleChestOpen} />
        </ErrorBoundary>
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
                  scale: [0, 1.2, 0.6, 0],
                  x: sp.x,
                  y: sp.y,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1.1, delay: sp.delay, ease: "easeOut" }}
                style={{ left: "50%", top: "45%" }}
              >
                <div
                  className="bg-[#FFD700] shadow-[0_0_8px_#FFD700]"
                  style={{
                    width: sp.size,
                    height: sp.size,
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                />
              </motion.div>
            ))}

            {/* "Bienvenido" cinematic banner */}
            <motion.div
              className="mt-2 text-center relative z-20"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="inline-block px-5 py-2.5 rounded-lg bg-[#1a140d]/80 border border-[#D4A537]/50 backdrop-blur-md shadow-[0_8px_24px_rgba(212,165,55,0.25)]">
                <p className="font-pixel text-[8px] sm:text-[10px] md:text-[12px] text-[#FFD700] leading-relaxed">
                  Bienvenido a nuestro mundo, mi amor 💕
                </p>
              </div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="mt-3"
              >
                <span className="text-[#FFD700] text-xl md:text-2xl inline-block drop-shadow-[0_0_8px_#FFD700]">
                  ↓
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Relationship clock */}
      <div className="relative z-10 mt-6">
        <RelationshipClock />
      </div>

      {/* Diamond easter egg – bottom-right corner */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
        <DiamondEasterEgg />
      </div>
    </section>
  )
}
