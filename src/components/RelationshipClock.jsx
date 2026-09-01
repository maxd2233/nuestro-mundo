import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Start date: 16 de abril de 2026
const START_DATE = new Date(2026, 3, 16, 0, 0, 0) // Month 3 = abril (0-indexed)

function calcElapsed(start, now) {
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  let anchor = new Date(start)
  anchor.setMonth(anchor.getMonth() + months)

  if (anchor > now) {
    months--
    anchor = new Date(start)
    anchor.setMonth(anchor.getMonth() + months)
  }

  let diffMs = now - anchor
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  diffMs -= days * (1000 * 60 * 60 * 24)
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  diffMs -= hours * (1000 * 60 * 60)
  const minutes = Math.floor(diffMs / (1000 * 60))
  diffMs -= minutes * (1000 * 60)
  const seconds = Math.floor(diffMs / 1000)

  return { months, days, hours, minutes, seconds }
}

function PixelHourglass() {
  const gold = "#FFD700"
  const wood = "#4A2F18"
  const grid = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1],
    [0, 1, 2, 2, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 2, 2, 0, 0],
    [0, 1, 2, 2, 1, 0],
    [1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ]
  const size = 3
  return (
    <svg width={6 * size} height={8 * size} className="inline-block align-middle drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]">
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell === 0 ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * size}
              y={y * size}
              width={size}
              height={size}
              fill={cell === 1 ? wood : gold}
            />
          )
        )
      )}
    </svg>
  )
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-[46px] md:min-w-[58px] px-2 py-1 rounded bg-[#0f0b07]/50 border border-[#D4A537]/20">
      <span
        className="font-pixel text-[13px] md:text-[16px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C0] to-[#FFD700] tabular-nums"
        style={{ textShadow: "0 0 10px rgba(255,215,0,0.4)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-pixel text-[6px] md:text-[7px] text-[#C2B299] mt-1 tracking-wider uppercase opacity-90">
        {label}
      </span>
    </div>
  )
}

export default function RelationshipClock() {
  const [elapsed, setElapsed] = useState(() => calcElapsed(START_DATE, new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(calcElapsed(START_DATE, new Date()))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Hanging chain links */}
      <div className="flex gap-14 md:gap-20 -mb-1">
        <div className="w-[3px] h-5 bg-gradient-to-b from-[#8B6914] to-[#4A2F18] shadow-[0_0_4px_rgba(0,0,0,0.6)]" />
        <div className="w-[3px] h-5 bg-gradient-to-b from-[#8B6914] to-[#4A2F18] shadow-[0_0_4px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Crafted wooden placard with gold borders */}
      <div
        className="relative bg-gradient-to-b from-[#3a2211] to-[#24150b] rounded-lg px-5 py-3.5 md:px-7 md:py-4.5 border border-[#D4A537]/40 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_24px_rgba(212,165,55,0.15)]"
      >
        {/* Corner rivets */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_4px_#FFD700]" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_4px_#FFD700]" />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_4px_#FFD700]" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_4px_#FFD700]" />

        <div className="flex items-center justify-center gap-2 mb-2.5">
          <PixelHourglass />
          <p className="font-pixel text-[7px] md:text-[8px] text-[#78E08F] tracking-wider uppercase">
            Juntos hace
          </p>
        </div>

        <div className="flex gap-2.5 md:gap-3.5 justify-center">
          <TimeUnit value={elapsed.months} label="meses" />
          <TimeUnit value={elapsed.days} label="días" />
          <TimeUnit value={elapsed.hours} label="horas" />
          <TimeUnit value={elapsed.minutes} label="min" />
          <TimeUnit value={elapsed.seconds} label="seg" />
        </div>
      </div>
    </motion.div>
  )
}
