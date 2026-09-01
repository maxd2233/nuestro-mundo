import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playPageFlipSound } from "../utils/audioEffects"

const fullText = `Armé este mundito con fotos nuestras porque quería que tuvieras un lugar donde guardar lo que sentimos, algo que puedas volver a abrir cuando quieras.

Gracias por escucharme, por hacerme sentir querido y saber lo que es el amor.

Sé que no soy perfecto pero te daré mi mejor versión.

Gracias por elegirme todos los días.

Te elijo de vuelta, las veces que sean necesarias.`

function QuillIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="inline-block align-middle">
      <path
        d="M17 2C17 2 13 4 10 9C8.5 11.5 8 14 8 14L6 17L9 15C9 15 11.5 14.5 14 13C19 10 21 6 21 6C21 6 18 6 15 8"
        stroke="#D4A537"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="5" cy="18" r="1.5" fill="#8B6914" />
    </svg>
  )
}

export default function BookAndQuill() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      playPageFlipSound()
      setBookOpen(true)
    }, 350)
    return () => clearTimeout(timer)
  }, [isVisible])

  useEffect(() => {
    if (!bookOpen) return
    let i = 0
    setDisplayedText("")
    setIsDone(false)
    const interval = setInterval(() => {
      i++
      setDisplayedText(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(interval)
        setIsDone(true)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [bookOpen])

  return (
    <section
      id="carta"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-36 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#090810]"
    >
      {/* Header Badge & Title */}
      <div className="text-center mb-12 md:mb-16 relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A537]/10 border border-[#D4A537]/30 mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <QuillIcon />
          <span className="font-pixel text-[7px] md:text-[8px] text-[#FFD700] uppercase tracking-wider">
            Desde el Corazón
          </span>
        </motion.div>

        <motion.h2
          className="font-pixel text-[15px] sm:text-[18px] md:text-[24px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#FFD700] to-[#C99700] text-center drop-shadow-sm"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Una Carta Para Vos
        </motion.h2>
      </div>

      {/* 3D Grimoire Book Container */}
      <motion.div
        className="relative w-full max-w-2xl z-10"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
      >
        <div className="relative min-h-[360px] md:min-h-[420px] rounded-2xl p-1 bg-gradient-to-r from-[#2c180e] to-[#1a0e08] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,165,55,0.12)] border border-[#D4A537]/30">
          {/* Leather Book Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 bg-gradient-to-r from-[#3d2012] via-[#522b18] to-[#2a140b] rounded-l-2xl shadow-inner border-r border-[#1a0d07] z-20 flex flex-col justify-around items-center py-6">
            <div className="w-2.5 h-1 bg-[#D4A537]/60 rounded-full" />
            <div className="w-2.5 h-1 bg-[#D4A537]/60 rounded-full" />
            <div className="w-2.5 h-1 bg-[#D4A537]/60 rounded-full" />
          </div>

          {/* Parchment Pages Area */}
          <div className="relative ml-6 md:ml-8 p-6 sm:p-8 md:p-10 min-h-[350px] md:min-h-[410px] rounded-r-xl bg-gradient-to-br from-[#FAF3E0] via-[#F4E8CE] to-[#E9D7B5] shadow-inner text-[#2B1B10] flex flex-col justify-between">
            {/* Subtle vintage paper texture lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 rounded-r-xl"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(139, 90, 43, 0.25) 27px, rgba(139, 90, 43, 0.25) 28px)",
                backgroundPosition: "0 24px",
              }}
            />

            {/* Top decorative gold filigree */}
            <div className="flex justify-between items-center pb-4 border-b border-[#8B6914]/20 relative z-10">
              <span className="font-pixel text-[7px] text-[#8B6914] tracking-widest uppercase">
                ✦ Carta de Amor ✦
              </span>
              <QuillIcon />
            </div>

            {/* Letter text with graceful typography */}
            <div className="my-6 relative z-10">
              <pre
                className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[1.85] whitespace-pre-wrap tracking-wide text-[#2B1B10] font-medium"
                style={{ wordBreak: "break-word" }}
              >
                {displayedText}
                {!isDone && (
                  <span className="inline-block w-2 h-4 bg-[#8B5E3C] ml-1 animate-pulse align-middle" />
                )}
              </pre>
            </div>

            {/* Signature & Floating Hearts */}
            <div className="pt-4 border-t border-[#8B6914]/20 flex items-center justify-between relative z-10">
              <span className="font-pixel text-[8px] text-[#8B6914] tracking-wide">
                Siempre tuyo, Tristán
              </span>

              <AnimatePresence>
                {isDone && (
                  <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="text-lg md:text-xl text-[#FF4D6D] inline-block drop-shadow-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeInOut",
                        }}
                      >
                        ❤️
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
