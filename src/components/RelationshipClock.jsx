import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Fecha de inicio: 16 de abril de 2026
const START_DATE = new Date(2026, 3, 16, 0, 0, 0) // mes 3 = abril (0-indexed)

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

// Reloj de arena pixel-art, 12x14, dibujado a bloques (sin imagen externa)
function PixelHourglass() {
  const gold = "#D4A537"
  const wood = "#4A2F18"
  // filas del reloj de arena (1 = madera/marco, 2 = arena dorada, 0 = vacio)
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
    <svg width={6 * size} height={8 * size} className="inline-block align-middle">
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
    <div className="flex flex-col items-center min-w-[42px] md:min-w-[54px]">
      <span
        className="font-pixel text-[13px] md:text-[17px] text-minecraft-gold tabular-nums"
        style={{ textShadow: "0 0 6px rgba(212,165,55,0.5)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-pixel text-[6px] md:text-[7px] text-[#B9A88A] mt-1 tracking-wide">
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
      className="flex flex-col items-center mt-2 md:mt-4"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Cadenas que cuelgan del cofre */}
      <div className="flex gap-10 md:gap-14 -mb-1">
        <div className="w-[2px] h-4 md:h-5 bg-[#6B6B6B]" />
        <div className="w-[2px] h-4 md:h-5 bg-[#6B6B6B]" />
      </div>

      {/* Cartel de madera */}
      <div
        className="relative bg-[#5C3A1E] rounded-sm px-4 py-3 md:px-5 md:py-4"
        style={{
          boxShadow:
            "2px 0 0 0 #3D2712, 0 2px 0 0 #3D2712, -2px 0 0 0 #3D2712, 0 -2px 0 0 #3D2712, " +
            "1px 1px 0 0 #3D2712, -1px -1px 0 0 #3D2712, 1px -1px 0 0 #3D2712, -1px 1px 0 0 #3D2712, " +
            "inset 1px 1px 0 0 #7A4E2E, inset -1px -1px 0 0 #1a0a05",
        }}
      >
        {/* Clavos en las esquinas, detalle de cartel de madera */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-[#2A1A0D] rounded-full" />
        <div className="absolute top-1 right-1 w-1 h-1 bg-[#2A1A0D] rounded-full" />
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-[#2A1A0D] rounded-full" />
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#2A1A0D] rounded-full" />

        <p className="font-pixel text-[7px] md:text-[8px] text-minecraft-grass text-center mb-2 tracking-wide flex items-center justify-center gap-1.5">
          <PixelHourglass />
          Juntos hace
        </p>
        <div className="flex gap-3 md:gap-4 justify-center">
          <TimeUnit value={elapsed.months} label="meses" />
          <TimeUnit value={elapsed.days} label="dias" />
          <TimeUnit value={elapsed.hours} label="horas" />
        </div>
      </div>
    </motion.div>
  )
}
