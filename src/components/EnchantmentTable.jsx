import { motion } from "framer-motion"
import { useMemo } from "react"

const glyphChars = "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟ"

function OrbitingGlyph({ char, index, total }) {
  const angle = (index / total) * 360
  const radius = 60 + (index % 3) * 15

  return (
    <motion.div
      className="absolute font-pixel text-[9px] md:text-[11px] pointer-events-none select-none text-[#5ED9D1]"
      style={{
        textShadow: "0 0 8px rgba(94,217,209,0.8), 0 0 16px rgba(94,217,209,0.4)",
      }}
      animate={{
        x: [
          Math.cos(((angle + 0) * Math.PI) / 180) * radius,
          Math.cos(((angle + 180) * Math.PI) / 180) * radius,
          Math.cos(((angle + 360) * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin(((angle + 0) * Math.PI) / 180) * (radius * 0.45) - 30,
          Math.sin(((angle + 180) * Math.PI) / 180) * (radius * 0.45) - 10,
          Math.sin(((angle + 360) * Math.PI) / 180) * (radius * 0.45) - 30,
        ],
        opacity: [0.3, 0.95, 0.3],
        scale: [0.8, 1.15, 0.8],
      }}
      transition={{
        duration: 5 + (index % 3),
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {char}
    </motion.div>
  )
}

export default function EnchantmentTable() {
  const glyphs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      char: glyphChars[Math.floor(Math.random() * glyphChars.length)],
    }))
  }, [])

  return (
    <div className="relative flex flex-col items-center my-14 md:my-20">
      {/* Cyan mystical aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(94,217,209,0.18)_0%,rgba(147,51,234,0.08)_50%,transparent_75%)] blur-2xl animate-pulse" />

      {/* Orbiting runic glyphs */}
      <div className="relative w-40 h-28 flex items-center justify-center pointer-events-none">
        {glyphs.map((g, i) => (
          <OrbitingGlyph key={g.id} char={g.char} index={i} total={glyphs.length} />
        ))}

        {/* Floating 3D Open Spellbook */}
        <motion.div
          className="relative z-10 select-none"
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-2, 2, -2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Open Book Pages Spread */}
          <div className="relative w-16 h-10 md:w-20 md:h-12 flex justify-center items-center">
            {/* Left Page */}
            <div
              className="w-1/2 h-full bg-gradient-to-r from-[#2c1d11] to-[#eed8ab] rounded-l-sm border-t border-b border-l border-[#8b6914] shadow-md flex items-center justify-center p-1 origin-right"
              style={{ transform: "perspective(400px) rotateY(20deg)" }}
            >
              <div className="space-y-0.5 opacity-60">
                <div className="w-5 h-[1.5px] bg-[#5c3a1e]" />
                <div className="w-4 h-[1.5px] bg-[#5c3a1e]" />
                <div className="w-5 h-[1.5px] bg-[#5c3a1e]" />
              </div>
            </div>

            {/* Book Spine */}
            <div className="w-1 h-[105%] bg-[#4a2810] shadow-sm z-20" />

            {/* Right Page */}
            <div
              className="w-1/2 h-full bg-gradient-to-l from-[#2c1d11] to-[#eed8ab] rounded-r-sm border-t border-b border-r border-[#8b6914] shadow-md flex items-center justify-center p-1 origin-left"
              style={{ transform: "perspective(400px) rotateY(-20deg)" }}
            >
              <div className="space-y-0.5 opacity-60">
                <div className="w-5 h-[1.5px] bg-[#5c3a1e]" />
                <div className="w-3 h-[1.5px] bg-[#5c3a1e]" />
                <div className="w-4 h-[1.5px] bg-[#5c3a1e]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Obsidian & Red Table Base */}
      <div className="relative -mt-2">
        {/* Table Top Surface */}
        <div
          className="w-24 h-4 md:w-28 md:h-5 rounded-t-sm"
          style={{
            background: "linear-gradient(to bottom, #8B0000, #4A0000)",
            boxShadow:
              "2px 0 0 0 #2A0000, 0 2px 0 0 #2A0000, -2px 0 0 0 #2A0000, inset 1px 1px 0 0 #FF4D6D",
          }}
        />

        {/* Obsidian Body */}
        <div
          className="w-20 h-7 md:w-24 md:h-9 mx-auto"
          style={{
            background: "linear-gradient(to bottom, #190a2a, #0b0214)",
            boxShadow:
              "2px 0 0 0 #05000a, 0 2px 0 0 #05000a, -2px 0 0 0 #05000a, inset 1px 1px 0 0 #3a1c5c",
          }}
        />

        {/* Obsidian Base Footing */}
        <div className="flex justify-between mx-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0b0214] shadow-[1px_0_0_0_#05000a]" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0b0214] shadow-[-1px_0_0_0_#05000a]" />
        </div>
      </div>

      {/* Atmospheric label */}
      <p className="font-pixel text-[6px] md:text-[7px] text-[#5ED9D1] mt-4 tracking-wider uppercase opacity-80 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5ED9D1] shadow-[0_0_6px_#5ED9D1]" />
        Mesa de Encantamientos
      </p>
    </div>
  )
}
