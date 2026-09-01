import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { moments, finalMessage } from "../data/moments"
import EnchantmentTable from "./EnchantmentTable"
import PixelBanners from "./PixelBanners"
import { playClickSound, playXpSound } from "../utils/audioEffects"

const baseUrl = import.meta.env.BASE_URL

function fullPhotoUrl(filename) {
  return `${baseUrl}photos/${filename}`
}

function Sparkles() {
  const particles = [
    { top: "8%", left: "15%", delay: "0s", size: 4 },
    { top: "5%", left: "75%", delay: "0.6s", size: 3 },
    { top: "20%", left: "85%", delay: "1.2s", size: 4 },
    { top: "35%", left: "10%", delay: "0.3s", size: 3 },
    { top: "15%", left: "50%", delay: "1.8s", size: 4 },
    { top: "25%", left: "30%", delay: "0.9s", size: 3 },
  ]
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="sparkle-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `sparkle 2s ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </>
  )
}

function PhotoCardImage({ photos, activeIndex, alt, emoji, onPhotoClick }) {
  const [error, setError] = useState(false)
  const filename = photos?.[activeIndex ?? 0]
  const src = filename ? fullPhotoUrl(filename) : null

  return (
    <div
      className="w-full h-full bg-[#111118] overflow-hidden cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-500"
      onClick={() => onPhotoClick(activeIndex ?? 0)}
    >
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1c120c] text-center p-4">
          <span className="text-3xl md:text-4xl mb-2">{emoji}</span>
          <span className="font-pixel text-[7px] text-[#C0C0D4]">{alt}</span>
        </div>
      )}
    </div>
  )
}

function MomentCard({ moment, index, onOpenLightbox }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.article
      layout
      ref={cardRef}
      className={`group relative rounded-xl overflow-hidden will-change-transform ${
        moment.special ? "special-glow" : ""
      }`}
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Card container with crisp dark contrast */}
      <div
        className={`h-full flex flex-col justify-between rounded-xl overflow-hidden transition-all duration-300 ${
          moment.special
            ? "bg-[#1c140c] border-2 border-[#FFD700]/60 shadow-[0_8px_30px_rgba(212,165,55,0.25)]"
            : "bg-[#14141e] border border-white/15 hover:border-[#D4A537]/60 shadow-xl"
        }`}
      >
        {/* Main Photo Area (100% crisp, zero overlay haze) */}
        <div className="w-full relative overflow-hidden" style={{ paddingBottom: "62%" }}>
          <div className="absolute inset-0">
            <PhotoCardImage
              photos={moment.photos}
              activeIndex={activePhotoIndex}
              alt={moment.title}
              emoji={moment.emoji}
              onPhotoClick={(idx) => onOpenLightbox(moment, idx)}
            />
          </div>

          {/* Floating heart badge for special moment */}
          {moment.special && (
            <div className="absolute top-2.5 right-2.5 float-heart z-20">
              <div className="bg-[#120a06] rounded-md px-2.5 py-1 border border-[#FFD700] shadow-lg">
                <span className="text-sm">💕</span>
              </div>
            </div>
          )}

          {/* Sparkles */}
          {moment.special && <Sparkles />}

          {/* Photo count indicator tag if multiple */}
          {moment.photos.length > 1 && (
            <div className="absolute bottom-2 right-2 z-20 bg-black/85 px-2 py-0.5 rounded text-[11px] font-sans font-medium text-white border border-white/20">
              📷 {activePhotoIndex + 1}/{moment.photos.length}
            </div>
          )}
        </div>

        {/* Multi-photo thumbnail bar */}
        {moment.photos.length > 1 && (
          <div className="flex gap-1.5 px-3 pt-2.5 bg-[#0e0e16] border-b border-white/10">
            {moment.photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playClickSound()
                  setActivePhotoIndex(idx)
                }}
                className={`flex-1 h-12 md:h-14 rounded overflow-hidden cursor-pointer transition-all duration-200 border ${
                  activePhotoIndex === idx
                    ? "border-[#FFD700] ring-2 ring-[#FFD700]/70 scale-[1.03]"
                    : "border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <PhotoCardImage
                  photos={moment.photos}
                  activeIndex={idx}
                  alt={moment.title}
                  emoji={moment.emoji}
                  onPhotoClick={() => setActivePhotoIndex(idx)}
                />
              </button>
            ))}
          </div>
        )}

        {/* Content Details (Crystal Clear, High-Contrast Typography) */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#14141e]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1 font-pixel text-[7.5px] md:text-[8.5px] text-[#78E08F] tracking-wide uppercase bg-[#78E08F]/15 px-2.5 py-1 rounded border border-[#78E08F]/40 font-bold">
                <span>📅</span> {moment.date}
              </span>
              <span className="text-lg">{moment.emoji}</span>
            </div>

            <h3 className="font-pixel text-[10px] sm:text-[11px] md:text-[12px] text-[#FFD700] mb-2 leading-relaxed font-bold drop-shadow-sm">
              {moment.title}
            </h3>

            <p className="font-sans text-[13.5px] sm:text-[14px] md:text-[14.5px] text-[#F0F0FA] leading-relaxed tracking-normal font-medium">
              {moment.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function PhotoLightbox({ current, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, onPrev, onNext])

  if (!current) return null
  const { moment, photoIndex } = current
  const filename = moment.photos[photoIndex]
  const src = fullPhotoUrl(filename)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 md:p-8 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white text-xl transition-colors cursor-pointer border border-white/30"
        aria-label="Cerrar visor"
      >
        ✕
      </button>

      {moment.photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              onPrev()
            }}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/80 hover:bg-black flex items-center justify-center text-white text-2xl transition-colors cursor-pointer border border-white/30 shadow-xl"
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              onNext()
            }}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/80 hover:bg-black flex items-center justify-center text-white text-2xl transition-colors cursor-pointer border border-white/30 shadow-xl"
            aria-label="Foto siguiente"
          >
            ›
          </button>
        </>
      )}

      <motion.div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
        initial={{ scale: 0.92, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-[#090912] max-h-[70vh] flex items-center justify-center">
          <img
            src={src}
            alt={moment.title}
            className="max-h-[70vh] max-w-full object-contain rounded"
          />
        </div>

        <div className="mt-3.5 text-center max-w-lg">
          <p className="font-pixel text-[10px] md:text-[12px] text-[#FFD700] mb-1 font-bold">
            {moment.title}
          </p>
          <p className="font-sans text-[13px] md:text-[14px] text-[#E0E0F0] font-medium">
            {moment.date} &bull; Foto {photoIndex + 1} de {moment.photos.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const filterTabs = [
  { id: "all", label: "Todos", icon: "✨" },
  { id: "special", label: "Especiales", icon: "💕" },
  { id: "dates", label: "Citas & Salidas", icon: "🍦" },
  { id: "family", label: "En Familia", icon: "🏠" },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all")
  const [lightboxState, setLightboxState] = useState(null)

  const filteredMoments = useMemo(() => {
    if (activeTab === "special") {
      return moments.filter((m) => m.special)
    }
    if (activeTab === "dates") {
      return moments.filter(
        (m) =>
          m.title.toLowerCase().includes("cita") ||
          m.title.toLowerCase().includes("mate") ||
          m.title.toLowerCase().includes("merienda") ||
          m.title.toLowerCase().includes("plaza")
      )
    }
    if (activeTab === "family") {
      return moments.filter(
        (m) =>
          m.description.toLowerCase().includes("flia") ||
          m.description.toLowerCase().includes("familia") ||
          m.description.toLowerCase().includes("amiga") ||
          m.title.toLowerCase().includes("casa")
      )
    }
    return moments
  }, [activeTab])

  const handleOpenLightbox = (moment, photoIndex) => {
    if (moment.special) {
      playXpSound()
    } else {
      playClickSound()
    }
    setLightboxState({ moment, photoIndex })
  }

  const handleCloseLightbox = () => {
    setLightboxState(null)
  }

  const handlePrevPhoto = useCallback(() => {
    if (!lightboxState) return
    const { moment, photoIndex } = lightboxState
    const nextIdx = photoIndex > 0 ? photoIndex - 1 : moment.photos.length - 1
    setLightboxState({ moment, photoIndex: nextIdx })
  }, [lightboxState])

  const handleNextPhoto = useCallback(() => {
    if (!lightboxState) return
    const { moment, photoIndex } = lightboxState
    const nextIdx = photoIndex < moment.photos.length - 1 ? photoIndex + 1 : 0
    setLightboxState({ moment, photoIndex: nextIdx })
  }, [lightboxState])

  return (
    <section id="galeria" className="relative min-h-screen py-20 md:py-28 px-4 md:px-8 bg-[#090912]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A537]/15 border border-[#D4A537]/40 mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs">✨</span>
          <span className="font-pixel text-[7px] md:text-[8px] text-[#FFD700] uppercase tracking-wider font-bold">
            Nuestros Recuerdos
          </span>
          <span className="text-xs">✨</span>
        </motion.div>

        <motion.h2
          className="font-pixel text-[17px] sm:text-[21px] md:text-[28px] text-[#FFD700] text-center mb-4 leading-relaxed font-bold drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Momentos Inolvidables
        </motion.h2>

        <motion.p
          className="font-sans text-[15px] md:text-[16px] text-[#E0E0F0] max-w-lg mx-auto font-medium leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Cada capítulo de nuestra historia juntos, guardado para siempre.
        </motion.p>

        {/* Inventory Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound()
                setActiveTab(tab.id)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-pixel text-[7.5px] md:text-[8.5px] transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#D4A537]/30 border-2 border-[#FFD700] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.35)] scale-[1.03] font-bold"
                  : "bg-[#18121f] border border-white/20 text-[#D0D0E4] hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.id === "all" && <span className="opacity-75">({moments.length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Pixel Banners */}
      <PixelBanners />

      {/* Moments Grid: 1 col mobile, 2 tablet, 3 desktop */}
      <motion.div
        layout
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <AnimatePresence>
          {filteredMoments.map((moment, i) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              index={i}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enchantment Table in the middle of journey */}
      <EnchantmentTable />

      {/* Final message placard */}
      <motion.div
        className="max-w-2xl mx-auto mt-16 md:mt-24 p-7 md:p-9 rounded-2xl bg-[#1c1208] border-2 border-[#D4A537] shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(212,165,55,0.2)] text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-3xl md:text-4xl mb-3">💌</div>
        <p className="font-sans text-[15px] md:text-[16.5px] text-[#FFF2D0] leading-relaxed font-semibold mb-3">
          "{finalMessage}"
        </p>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxState && (
          <PhotoLightbox
            current={lightboxState}
            onClose={handleCloseLightbox}
            onPrev={handlePrevPhoto}
            onNext={handleNextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
