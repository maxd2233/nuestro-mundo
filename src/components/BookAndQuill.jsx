import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const fullText = `Armé este mundito con fotos nuestras porque quería que tuvieras un lugar donde guardar lo que sentimos, algo que puedas volver a abrir cuando quieras.

Gracias por escucharme, por hacerme sentir querido y saber lo que es el amor.

Sé que no soy perfecto pero te daré mi mejor versión.

Gracias por elegirme todos los días.

Te elijo de vuelta, las veces que sean necesarias.`

function QuillIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="inline-block align-middle">
      <rect x="7" y="1" width="2" height="10" fill="#D4A537" />
      <rect x="6" y="11" width="4" height="2" fill="#8B6914" />
      <rect x="7" y="13" width="2" height="2" fill="#2D1810" />
      <rect x="8" y="0" width="1" height="1" fill="#FFD700" />
    </svg>
  )
}

function BookCover({ isOpen }) {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full z-20 origin-left"
      style={{
        background: "linear-gradient(135deg, #5C3A1E 0%, #3D2010 100%)",
        boxShadow: "2px 0 0 0 #2D1810, inset 1px 1px 0 0 #7A4E2E",
        transformStyle: "preserve-3d",
      }}
      animate={{ rotateY: isOpen ? -160 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Cover decoration */}
      <div className="absolute inset-3 md:inset-4 border border-[#8B6914]/30 rounded-sm flex items-center justify-center">
        <div className="text-center">
          <QuillIcon />
          <p className="font-pixel text-[6px] md:text-[7px] text-[#D4A537] mt-1">
            Carta
          </p>
        </div>
      </div>
    </motion.div>
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
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => setBookOpen(true), 400)
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
    }, 20)
    return () => clearInterval(interval)
  }, [bookOpen])

  return (
    <section
      id="carta"
      ref={sectionRef}
      className="min-h-screen py-16 md:py-24 px-4 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #2D1810 50%, #1a1a2e 100%)",
      }}
    >
      {/* Title */}
      <motion.h2
        className="font-pixel text-[11px] md:text-[13px] text-minecraft-gold text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        [ Una carta para vos ]
      </motion.h2>

      {/* Book */}
      <motion.div
        className="relative w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ perspective: 800 }}
      >
        <div className="relative min-h-[320px] md:min-h-[360px]">
          {/* Book cover */}
          <BookCover isOpen={bookOpen} />

          {/* Book spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-4 md:w-5 bg-[#5C3A1E] z-10"
            style={{
              boxShadow: "2px 0 0 0 #3D2010, 3px 0 0 0 #2D1810, inset -1px 0 0 0 #7A4E2E",
            }}
          />

          {/* Book top/bottom spine caps */}
          <div
            className="absolute -top-1 left-0 right-0 h-2 md:h-3 bg-[#5C3A1E] z-10"
            style={{ boxShadow: "0 2px 0 0 #3D2010, 0 3px 0 0 #2D1810" }}
          />
          <div
            className="absolute -bottom-1 left-0 right-0 h-2 md:h-3 bg-[#5C3A1E] z-10"
            style={{ boxShadow: "0 -2px 0 0 #3D2010, 0 -3px 0 0 #2D1810" }}
          />

          {/* Paper pages */}
          <div
            className="relative ml-4 md:ml-5 p-5 md:p-6 min-h-[300px]"
            style={{
              background: "linear-gradient(135deg, #F5E6C8 0%, #EDD9A9 50%, #E8D0A0 100%)",
              boxShadow:
                "3px 0 0 0 #3D2010, 0 3px 0 0 #3D2010, -1px 0 0 0 #3D2010, 0 -1px 0 0 #3D2010, inset 0 0 40px rgba(139,90,43,0.15)",
            }}
          >
            {/* Page lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 24px, #8B6914 24px, #8B6914 25px)",
                backgroundPosition: "0 20px",
              }}
            />

            {/* Quill decoration top-right */}
            <div className="absolute top-3 right-3 opacity-30">
              <QuillIcon />
            </div>

            {/* Blinking cursor */}
            <span
              className="absolute -right-3 top-5 text-[#5C3A1E] font-pixel text-[10px] animate-pixel-blink"
              style={{ display: isDone ? "none" : "block" }}
            >
              █
            </span>

            {/* Typewriter text */}
            <pre
              className="relative font-pixel text-[8px] md:text-[9px] leading-relaxed whitespace-pre-wrap tracking-wide"
              style={{ color: "#2D1810", fontFamily: "inherit", wordBreak: "break-word" }}
            >
              {displayedText}
            </pre>

            {/* Signature hearts */}
            {isDone && (
              <motion.div
                className="flex justify-center gap-2 mt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="font-pixel text-[11px] md:text-[13px]"
                    style={{ color: i === 1 ? "#8B0000" : "#FF4D6D" }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  >
                    ❤
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
