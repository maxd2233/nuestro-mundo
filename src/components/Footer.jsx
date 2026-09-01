import { motion } from "framer-motion"

function PixelHeart({ className }) {
  return (
    <div className={`inline-grid grid-cols-7 gap-[2px] ${className}`}>
      {[
        [0, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
      ].flatMap((row, i) =>
        row.map((pixel, j) => (
          <div
            key={`${i}-${j}`}
            className="w-[3px] h-[3px] md:w-[4.5px] md:h-[4.5px] rounded-[0.5px]"
            style={{
              backgroundColor: pixel ? "#FF4D6D" : "transparent",
              boxShadow: pixel ? "0 0 6px rgba(255,77,109,0.7)" : "none",
            }}
          />
        ))
      )}
    </div>
  )
}

const grassBlocks = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(100 / 24) * i}%`,
}))

export default function Footer() {
  return (
    <footer className="relative pt-4 pb-16 md:pb-20 px-4 bg-[#08050e] overflow-hidden border-t border-white/5">
      {/* 3D Grass Block Trim Header */}
      <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3.5 z-10 flex">
        {grassBlocks.map((block) => (
          <div
            key={block.id}
            className="h-full flex-1"
            style={{
              background: "linear-gradient(to bottom, #5c9429 45%, #6e4a27 45%, #4a2f18 100%)",
              borderRight: "1px solid rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>

      {/* Ambient twilight bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none opacity-20 bg-[radial-gradient(circle,rgba(255,77,109,0.15)_0%,transparent_70%)] blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mt-10 md:mt-12">
        {/* Pulsing Pixel Hearts Row */}
        <div className="flex justify-center gap-3 md:gap-4 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.28, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              <PixelHeart />
            </motion.div>
          ))}
        </div>

        {/* Main signature text */}
        <p className="font-pixel text-[9px] md:text-[11px] text-[#78E08F] leading-relaxed mb-3 tracking-wide">
          Hecho con ❤️ para Tristán
        </p>

        {/* Tagline */}
        <p className="font-sans text-[12px] md:text-[13px] text-[#A0A0B8] mb-2 font-normal">
          Un mundo entero construido recuerdo a recuerdo.
        </p>

        {/* Year */}
        <p className="font-pixel text-[6px] md:text-[7px] text-[#7A7A90] opacity-60">
          &copy; {new Date().getFullYear()} &mdash; Nuestro Mundo
        </p>
      </div>
    </footer>
  )
}
