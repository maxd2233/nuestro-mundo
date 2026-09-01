import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const biomes = {
  hero: {
    name: "Bioma Nevado",
    bg: "radial-gradient(circle at 50% 20%, rgba(20, 24, 45, 0.4) 0%, rgba(6, 6, 15, 0.95) 100%)",
    glowColor: "rgba(94, 217, 209, 0.12)",
    accent: "#5ED9D1",
  },
  galeria: {
    name: "Bosque de Amatista",
    bg: "radial-gradient(circle at 50% 30%, rgba(35, 18, 50, 0.45) 0%, rgba(10, 8, 20, 0.95) 100%)",
    glowColor: "rgba(187, 134, 252, 0.15)",
    accent: "#BB86FC",
  },
  carta: {
    name: "Cabaña de Roble",
    bg: "radial-gradient(circle at 50% 40%, rgba(55, 30, 15, 0.45) 0%, rgba(15, 8, 4, 0.95) 100%)",
    glowColor: "rgba(255, 165, 0, 0.15)",
    accent: "#FFD700",
  },
}

export default function BiomeAtmosphere() {
  const [currentBiome, setCurrentBiome] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (scrollY < windowHeight * 0.8) {
        setCurrentBiome("hero")
      } else if (scrollY + windowHeight >= docHeight - 600) {
        setCurrentBiome("carta")
      } else {
        setCurrentBiome("galeria")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const biome = biomes[currentBiome]

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] transition-all duration-1000 ease-out">
      {/* Dynamic atmospheric background tint */}
      <motion.div
        key={currentBiome}
        className="absolute inset-0"
        style={{ background: biome.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      />

      {/* Volumetric ambient orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-50"
        style={{ background: `radial-gradient(circle, ${biome.glowColor} 0%, transparent 70%)` }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

