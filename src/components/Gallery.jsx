import { useState } from "react"
import { motion } from "framer-motion"
import { moments, finalMessage } from "../data/moments"
import EnchantmentTable from "./EnchantmentTable"
import PixelBanners from "./PixelBanners"

const baseUrl = import.meta.env.BASE_URL

function fullPhotoUrl(filename) {
  return `${baseUrl}photos/${filename}`
}

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

function PhotoBlock({ photos, alt, emoji, index }) {
  const [error, setError] = useState(false)
  const filename = photos?.[index ?? 0]
  const src = filename ? fullPhotoUrl(filename) : null
  return (
    <div className="w-full h-full bg-[#3D3D3D] overflow-hidden">
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#5C3A1E]">
          <span className="text-3xl md:text-4xl">{emoji}</span>
        </div>
      )}
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="galeria" className="section-panel min-h-screen py-16 md:py-24 px-4">
      {/* Section title with decorative blocks */}
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-12">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-minecraft-stone" style={{ boxShadow: "1px 0 0 0 #5C5C5C, 0 1px 0 0 #5C5C5C, -1px 0 0 0 #5C5C5C, 0 -1px 0 0 #5C5C5C" }} />
        <div className="w-4 h-4 md:w-5 md:h-5 bg-minecraft-dirt" style={{ boxShadow: "1px 0 0 0 #6B4A0A, 0 1px 0 0 #6B4A0A, -1px 0 0 0 #6B4A0A, 0 -1px 0 0 #6B4A0A" }} />
        <motion.h2
          className="font-pixel text-[11px] md:text-[13px] text-minecraft-gold text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          [ Momentos ]
        </motion.h2>
        <div className="w-4 h-4 md:w-5 md:h-5 bg-minecraft-dirt" style={{ boxShadow: "1px 0 0 0 #6B4A0A, 0 1px 0 0 #6B4A0A, -1px 0 0 0 #6B4A0A, 0 -1px 0 0 #6B4A0A" }} />
        <div className="w-4 h-4 md:w-5 md:h-5 bg-minecraft-stone" style={{ boxShadow: "1px 0 0 0 #5C5C5C, 0 1px 0 0 #5C5C5C, -1px 0 0 0 #5C5C5C, 0 -1px 0 0 #5C5C5C" }} />
      </div>

      {/* Pixel banners */}
      <PixelBanners />

      {/* Grid: 2 cols mobile, 3 desktop */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {moments.map((moment, i) => (
          <motion.article
            key={moment.id}
            className="group cursor-default relative"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
          >
            {/* Inventory slot card */}
            <div
              className="bg-[#1D1D1D] overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
              style={{
                boxShadow:
                  "3px 0 0 0 #2D2D2D, 0 3px 0 0 #2D2D2D, -3px 0 0 0 #2D2D2D, 0 -3px 0 0 #2D2D2D, 2px 1px 0 0 #2D2D2D, 1px 2px 0 0 #2D2D2D, -2px 1px 0 0 #2D2D2D, -1px 2px 0 0 #2D2D2D, 2px -1px 0 0 #2D2D2D, 1px -2px 0 0 #2D2D2D, -2px -1px 0 0 #2D2D2D, -1px -2px 0 0 #2D2D2D, inset 1px 1px 0 0 #4A4A4A, inset -1px -1px 0 0 #111",
              }}
            >
              {/* Photo area: 60% of card height */}
              <div className="w-full relative" style={{ paddingBottom: "60%" }}>
                <div className="absolute inset-0">
                  <PhotoBlock photos={moment.photos} alt={moment.title} emoji={moment.emoji} />
                </div>
              </div>

              {/* Secondary photo thumbnails */}
              {moment.photos.length > 1 && (
                <div className="flex gap-1 px-2.5 md:px-3 pt-2">
                  {moment.photos.map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-16 md:h-20 overflow-hidden"
                      style={{
                        boxShadow: "1px 0 0 0 #2D2D2D, 0 1px 0 0 #2D2D2D, -1px 0 0 0 #2D2D2D, 0 -1px 0 0 #2D2D2D",
                      }}
                    >
                      <PhotoBlock photos={moment.photos} alt={moment.title} emoji={moment.emoji} index={idx} />
                    </div>
                  ))}
                </div>
              )}

              {/* Info area */}
              <div className="p-2.5 md:p-3">
                <p className="font-pixel text-[7px] md:text-[8px] text-minecraft-grass mb-1.5 leading-relaxed">
                  {moment.date}
                </p>
                <h3 className="font-pixel text-[8px] md:text-[10px] text-[#E8D5B7] mb-1 leading-relaxed">
                  {moment.title}
                </h3>
                <p className="font-pixel text-[6px] md:text-[7px] text-minecraft-stone leading-relaxed opacity-80">
                  {moment.description}
                </p>
              </div>
            </div>

            {/* Hover gold glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow:
                  "0 0 12px rgba(255,215,0,0.3), 0 0 0 1px rgba(255,215,0,0.15)",
              }}
            />
          </motion.article>
        ))}
      </div>

      {/* Enchantment table decoration */}
      <EnchantmentTable />

      {/* Final message */}
      <motion.div
        className="max-w-xl mx-auto mt-12 md:mt-16 p-4 md:p-5 bg-minecraft-dark text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          boxShadow:
            "2px 0 0 0 #5C3A1E, 0 2px 0 0 #5C3A1E, -2px 0 0 0 #5C3A1E, 0 -2px 0 0 #5C3A1E, 1px 1px 0 0 #5C3A1E, -1px -1px 0 0 #5C3A1E, 1px -1px 0 0 #5C3A1E, -1px 1px 0 0 #5C3A1E, inset 1px 1px 0 0 #7A4E2E, inset -1px -1px 0 0 #1a0a05",
        }}
      >
        <p className="font-pixel text-[7px] md:text-[8px] text-[#E8D5B7] leading-relaxed">
          {finalMessage}
        </p>
      </motion.div>
    </section>
  )
}
