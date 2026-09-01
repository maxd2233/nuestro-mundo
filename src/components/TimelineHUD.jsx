import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playClickSound } from "../utils/audioEffects"

const chapters = [
  { id: "hero", label: "El Inicio", icon: "✨", target: 0 },
  { id: "galeria", label: "Nuestra Historia", icon: "📸", target: "#galeria" },
  { id: "carta", label: "La Carta", icon: "💌", target: "#carta" },
]

export default function TimelineHUD() {
  const [activeChapter, setActiveChapter] = useState("hero")
  const [expanded, setExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0
      setScrollProgress(progress)

      if (progress < 25) {
        setActiveChapter("hero")
      } else if (progress < 80) {
        setActiveChapter("galeria")
      } else {
        setActiveChapter("carta")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (target) => {
    playClickSound()
    if (typeof target === "number") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.5 })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      const el = document.querySelector(target)
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 1.5 })
        } else {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 select-none">
      <div className="relative flex items-center gap-2">
        {/* Floating Compass HUD Widget */}
        <motion.button
          onClick={() => {
            playClickSound()
            setExpanded(!expanded)
          }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#140e1a]/90 border border-[#D4A537]/40 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Abrir mapa de aventura"
        >
          {/* Rotating Pixel Compass Needle */}
          <div className="relative w-6 h-6 rounded-full bg-[#2a1a0e] border border-[#D4A537]/60 flex items-center justify-center shadow-inner">
            <motion.div
              className="w-1 h-4 bg-gradient-to-t from-[#FF4D6D] to-[#5ED9D1] rounded-full"
              style={{ originY: 0.5 }}
              animate={{ rotate: scrollProgress * 3.6 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-sm" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="font-pixel text-[5.5px] text-[#A0A0B8] uppercase tracking-wider">
              BRÚJULA
            </span>
            <span className="font-pixel text-[7px] text-[#FFD700] tracking-wide">
              {chapters.find((c) => c.id === activeChapter)?.label}
            </span>
          </div>
        </motion.button>

        {/* Expanded Navigation Menu */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="absolute bottom-12 left-0 flex flex-col gap-1.5 p-2 rounded-xl bg-[#120a16]/95 border border-[#D4A537]/40 backdrop-blur-lg shadow-2xl min-w-[170px]"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <div className="px-2 py-1 border-b border-white/10 mb-1">
                <span className="font-pixel text-[6px] text-[#D4A537] tracking-widest uppercase">
                  Mapa de la Aventura
                </span>
              </div>

              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    scrollTo(ch.target)
                    setExpanded(false)
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    activeChapter === ch.id
                      ? "bg-[#D4A537]/20 border border-[#D4A537]/50 text-[#FFD700]"
                      : "hover:bg-white/5 text-[#D8D8E6]"
                  }`}
                >
                  <span className="text-sm">{ch.icon}</span>
                  <span className="font-pixel text-[7px]">{ch.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

