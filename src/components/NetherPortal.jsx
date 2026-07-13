import { motion } from "framer-motion"
import { useMemo } from "react"

function PortalParticle({ delay, x, startY }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: `${x}%`,
        background: "radial-gradient(circle, #BB86FC, #9B59B6, #6C3483)",
        boxShadow: "0 0 8px rgba(155,89,182,0.7), 0 0 16px rgba(155,89,182,0.3)",
      }}
      initial={{ opacity: 0, y: startY || 0 }}
      animate={{
        opacity: [0, 0.9, 0.7, 0],
        y: [startY || 0, -60 - Math.random() * 40],
        x: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 30],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

export default function NetherPortal() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.2,
        x: 5 + Math.random() * 90,
        startY: 10 + Math.random() * 60,
      })),
    []
  )

  return (
    <div className="relative py-12 md:py-20 flex items-center justify-center overflow-hidden">
      {/* Glow behind portal */}
      <motion.div
        className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(155,89,182,0.25) 0%, rgba(108,52,131,0.1) 40%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Portal frame */}
      <div className="relative">
        {/* Obsidian frame */}
        <div
          className="relative w-24 h-36 md:w-32 md:h-48"
          style={{
            background: "#0D0015",
            boxShadow:
              "4px 0 0 0 #1a0030, 0 4px 0 0 #1a0030, -4px 0 0 0 #1a0030, 0 -4px 0 0 #1a0030, " +
              "6px 0 0 0 #0a0010, 0 6px 0 0 #0a0010, -6px 0 0 0 #0a0010, 0 -6px 0 0 #0a0010, " +
              "inset 2px 2px 0 0 #1a0030, inset -2px -2px 0 0 #0a0010",
          }}
        >
          {/* Portal swirl */}
          <motion.div
            className="absolute inset-2 md:inset-3 overflow-hidden rounded-sm"
            style={{
              background: "linear-gradient(135deg, #6C3483, #9B59B6, #BB86FC, #8E44AD, #6C3483)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(187,134,252,0.5), transparent 70%)",
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />

            {/* Animated swirl lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px"
                style={{
                  top: `${15 + i * 18}%`,
                  background: "linear-gradient(90deg, transparent, rgba(187,134,252,0.4), transparent)",
                }}
                animate={{ x: [-30, 30, -30], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2.5, delay: i * 0.25, repeat: Infinity }}
              />
            ))}

            {/* Vertical swirl */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute h-full w-px"
                style={{
                  left: `${25 + i * 25}%`,
                  background: "linear-gradient(180deg, transparent, rgba(187,134,252,0.3), transparent)",
                }}
                animate={{ y: [-20, 20, -20], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </div>

        {/* Particles floating up */}
        <div className="absolute -inset-8 pointer-events-none">
          {particles.map((p) => (
            <PortalParticle key={p.id} {...p} />
          ))}
        </div>
      </div>

      {/* Side obsidian blocks */}
      <div className="absolute left-[10%] md:left-[15%] top-1/2 -translate-y-1/2">
        <div
          className="w-4 h-4 md:w-5 md:h-5"
          style={{
            background: "#0D0015",
            boxShadow: "1px 0 0 0 #1a0030, 0 1px 0 0 #1a0030, inset 1px 1px 0 0 #1a0030",
          }}
        />
      </div>
      <div className="absolute right-[10%] md:right-[15%] top-1/2 -translate-y-1/2">
        <div
          className="w-4 h-4 md:w-5 md:h-5"
          style={{
            background: "#0D0015",
            boxShadow: "1px 0 0 0 #1a0030, 0 1px 0 0 #1a0030, inset 1px 1px 0 0 #1a0030",
          }}
        />
      </div>

      {/* Label */}
      <motion.p
        className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 font-pixel text-[6px] md:text-[7px] text-[#9B59B6] opacity-40"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ✦ nether ✦
      </motion.p>
    </div>
  )
}
