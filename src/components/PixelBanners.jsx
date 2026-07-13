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
  },
  {
    label: "Amor",
    pattern: [
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 2, 1, 2, 1],
      [0, 1, 2, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
    ],
    colors: { 1: "#D4A537", 2: "#FF4D6D" },
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
  },
]

function Banner({ label, pattern, colors, index }) {
  const px = 4

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      {/* Pole */}
      <div
        className="w-1.5 h-full absolute left-1/2 -translate-x-1/2 -top-1"
        style={{
          background: "linear-gradient(to right, #8B6914, #D4A537, #8B6914)",
          boxShadow: "1px 0 0 0 #5C3A1E",
        }}
      />

      {/* Banner fabric */}
      <div
        className="inline-grid gap-px relative"
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

      {/* Tassels */}
      <div className="flex gap-px mt-px">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-px h-2"
            style={{ backgroundColor: pattern[5]?.[i * 2] ? colors[1] : colors[2] || colors[1] }}
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <p className="font-pixel text-[5px] md:text-[6px] text-minecraft-stone mt-2 opacity-50 text-center">
        {label}
      </p>
    </motion.div>
  )
}

export default function PixelBanners() {
  return (
    <div className="flex justify-center gap-8 md:gap-12 my-6 md:my-8">
      {banners.map((b, i) => (
        <Banner key={b.label} {...b} index={i} />
      ))}
    </div>
  )
}
