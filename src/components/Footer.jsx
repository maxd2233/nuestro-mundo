import { motion } from "framer-motion"

/* 7×5 pixel heart built with CSS divs */
function PixelHeart({ className }) {
  return (
    <div className={`inline-grid grid-cols-7 gap-[1.5px] ${className}`}>
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
            className="w-[3px] h-[3px] md:w-[4px] md:h-[4px]"
            style={{
              backgroundColor: pixel ? "#FF4D6D" : "transparent",
              imageRendering: "pixelated",
            }}
          />
        )),
      )}
    </div>
  )
}

const grassBlocks = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(100 / 14) * i}%`,
}))

export default function Footer() {
  return (
    <footer className="relative pt-2 pb-10 md:pb-14 px-4 bg-minecraft-dark overflow-hidden">
      {/* Grass block border */}
      <div className="absolute top-0 left-0 right-0 h-2 md:h-3 z-10 flex">
        {grassBlocks.map((block) => (
          <div
            key={block.id}
            className="h-full flex-1"
            style={{
              background: "linear-gradient(to bottom, #5B9E2D 40%, #8B6914 40%, #8B6914 100%)",
              boxShadow: "1px 0 0 0 #3D7A1E",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mt-6 md:mt-8">
        {/* Minecraft pixel hearts row */}
        <div className="flex justify-center gap-2 md:gap-3 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
            >
              <PixelHeart />
            </motion.div>
          ))}
        </div>

        {/* Main text */}
        <p className="font-pixel text-[8px] md:text-[10px] text-minecraft-grass leading-relaxed mb-3">
          Hecho con ❤️ para Tristán
        </p>

        {/* Year */}
        <p className="font-pixel text-[6px] md:text-[7px] text-minecraft-stone opacity-60">
          &copy; {new Date().getFullYear()} &mdash; Nuestro Mundo
        </p>
      </div>
    </footer>
  )
}
