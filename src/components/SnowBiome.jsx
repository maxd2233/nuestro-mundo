import { useMemo } from "react"
import { motion } from "framer-motion"

const flakeCount = 30

export default function SnowBiome() {
  const flakes = useMemo(
    () =>
      Array.from({ length: flakeCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 2,
        delay: Math.random() * 8,
        duration: 5 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 40,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    []
  )

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {flakes.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: 0,
          }}
          animate={{
            opacity: [0, f.opacity, f.opacity, 0],
            y: ["0%", "100%"],
            x: [0, f.drift],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
