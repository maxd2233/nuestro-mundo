import { motion } from "framer-motion"

const banners = [
  {
    label: "Primera Cita",
    pattern: [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 3, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
    ],
    colors: { 1: "#FF4D6D", 2: "#FF8FA3", 3: "#FFFFFF" },
    glow: "rgba(255, 77, 109, 0.4)",
  },
  {
    label: "Amor Eterno",
    pattern: [
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 2, 1, 2, 1],
      [0, 1, 2, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
    ],
    colors: { 1: "#FFD700", 2: "#FF4D6D" },
    glow: "rgba(255, 215, 0, 0.4)",
  },
  {
    label: "Juntos",
    pattern: [
      [2, 1, 2, 1, 2],
      [1, 2, 2, 2, 1],
      [2, 2, 1, 2, 2],
      [1, 2, 2, 2, 1],
      [2, 1, 2, 1, 2],
      [0, 1, 0, 1, 0],
    ],
    colors: { 1: "#5ED9D1", 2: "#2E8B83" },
    glow: "rgba(94, 217, 209, 0.4)",
  },
]

function Banner({ label, pattern, colors, glow, index }) {
  const px = 5

  return (
    <motion.div
      className="flex flex-col items-center relative"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      {/* Wooden Hanging Pole */}
      <div
        className="w-2 h-[105%] absolute left-1/2 -translate-x-1/2 -top-2 rounded-sm shadow-md"
        style={{
          background: "linear-gradient(to right, #5C3A1E, #8B6914, #5C3A1E)",
        }}
      />

      {/* Banner fabric container with gentle sway */}
      <motion.div
        className="relative z-10 p-1 rounded-sm shadow-lg"
        style={{
          boxShadow: `0 4px 16px ${glow}`,
        }}
        animate={{
          rotateZ: [-1.5, 1.5, -1.5],
          transformOrigin: "top center",
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="inline-grid gap-px"
          style={{ gridTemplateColumns: `repeat(5, ${px}px)` }}
        >
          {pattern.flatMap((row, ri) =>
            row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                style={{
                  width: px,
                  height: px,
                  backgroundColor: cell === 0 ? "transparent" : colors[cell],
                }}
              />
            ))
          )}
        </div>

        {/* Tassels fringe */}
        <div className="flex justify-around mt-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-3 rounded-b-sm"
              style={{
                backgroundColor: pattern[5]?.[i * 2] ? colors[1] : colors[2] || colors[1],
              }}
              animate={{ scaleY: [1, 1.25, 1] }}
              transition={{ duration: 1.2, delay: i * 0.2 + index * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      <p className="font-pixel text-[6px] md:text-[7px] text-[#D8D8E6] mt-3 tracking-wider uppercase opacity-80 text-center">
        {label}
      </p>
    </motion.div>
  )
}

export default function PixelBanners() {
  return (
    <div className="flex justify-center gap-10 md:gap-16 my-8 md:my-12">
      {banners.map((b, i) => (
        <Banner key={b.label} {...b} index={i} />
      ))}
    </div>
  )
}
