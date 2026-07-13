import { motion } from "framer-motion"

const heartGrid = [
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
]

function PixelHeart({ size = 2.5, color = "#FF4D6D" }) {
  return (
    <div
      className="inline-grid gap-px"
      style={{ gridTemplateColumns: `repeat(7, ${size}px)` }}
    >
      {heartGrid.flatMap((row, i) =>
        row.map((pixel, j) => (
          <div
            key={`${i}-${j}`}
            style={{
              width: size,
              height: size,
              backgroundColor: pixel ? color : "transparent",
            }}
          />
        ))
      )}
    </div>
  )
}

const hearts = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 120,
  delay: i * 0.3,
  duration: 2 + Math.random() * 1.5,
  size: 2 + Math.random() * 1.5,
  color: Math.random() > 0.5 ? "#FF4D6D" : "#8B0000",
}))

export default function FloatingHearts({ active }) {
  if (!active) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute left-1/2"
          style={{ bottom: "45%" }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: -200 - Math.random() * 100,
            x: h.x,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeOut",
          }}
        >
          <PixelHeart size={h.size} color={h.color} />
        </motion.div>
      ))}
    </div>
  )
}
