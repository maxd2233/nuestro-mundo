import { motion } from "framer-motion"
import { useMemo } from "react"

const orbCount = 6

function Orb({ delay, startX, startY, size }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
        background: "radial-gradient(circle, #80FF00 30%, #4CAF50 70%, transparent 100%)",
        boxShadow: "0 0 8px rgba(128,255,0,0.6), 0 0 16px rgba(128,255,0,0.3)",
      }}
      animate={{
        y: [0, -30, -10, -40, 0],
        x: [0, 10, -5, 15, 0],
        opacity: [0, 0.8, 0.6, 0.9, 0],
        scale: [0.5, 1, 0.8, 1.1, 0.5],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export default function XPOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: orbCount }, (_, i) => ({
        id: i,
        delay: i * 2.5,
        startX: 5 + Math.random() * 90,
        startY: 20 + Math.random() * 60,
        size: 6 + Math.random() * 6,
      })),
    []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {orbs.map((o) => (
        <Orb key={o.id} {...o} />
      ))}
    </div>
  )
}
