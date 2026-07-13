import { motion } from "framer-motion"
import { useMemo } from "react"

const glyphChars = "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟ"

function Glyph({ char, x, y, delay }) {
  return (
    <motion.div
      className="absolute font-pixel text-[8px] md:text-[10px] pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color: "#9FF0EA",
        textShadow: "0 0 4px rgba(159,240,234,0.6)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: [0, 0.7, 0.5, 0.8, 0],
        y: [10, -20, -35, -50, -70],
        x: [0, (Math.random() - 0.5) * 30],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      {char}
    </motion.div>
  )
}

export default function EnchantmentTable() {
  const glyphs = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      char: glyphChars[Math.floor(Math.random() * glyphChars.length)],
      x: 20 + Math.random() * 60,
      y: 10 + Math.random() * 30,
      delay: i * 0.4,
    }))
  }, [])

  return (
    <div className="relative flex flex-col items-center my-8 md:my-12">
      {/* Floating glyphs */}
      <div className="absolute -top-16 left-0 right-0 h-24 pointer-events-none overflow-hidden">
        {glyphs.map((g) => (
          <Glyph key={g.id} {...g} />
        ))}
      </div>

      {/* Table base */}
      <div className="relative">
        {/* Book on top */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-7 md:w-12 md:h-8 z-10"
          animate={{ rotateY: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 200 }}
        >
          <div
            className="w-full h-full rounded-sm"
            style={{
              background: "linear-gradient(135deg, #5C3A1E, #3D2010)",
              boxShadow: "1px 0 0 0 #2D1810, 0 1px 0 0 #2D1810, inset 1px 1px 0 0 #7A4E2E",
            }}
          />
        </motion.div>

        {/* Table top */}
        <div
          className="w-20 h-3 md:w-24 md:h-4 rounded-t-sm"
          style={{
            background: "linear-gradient(to bottom, #1a0a05, #2D1810)",
            boxShadow: "2px 0 0 0 #0D0503, 0 2px 0 0 #0D0503, -2px 0 0 0 #0D0503, inset 1px 1px 0 0 #3D2010",
          }}
        />

        {/* Table body */}
        <div
          className="w-16 h-6 md:w-20 md:h-8 mx-auto"
          style={{
            background: "linear-gradient(to bottom, #2D1810, #1a0a05)",
            boxShadow: "2px 0 0 0 #0D0503, 0 2px 0 0 #0D0503, -2px 0 0 0 #0D0503, inset 1px 1px 0 0 #3D2010",
          }}
        />

        {/* Legs */}
        <div className="flex justify-between mx-2 md:mx-3">
          <div className="w-2 h-3 md:w-2.5 md:h-4" style={{ background: "#2D1810", boxShadow: "1px 0 0 0 #0D0503" }} />
          <div className="w-2 h-3 md:w-2.5 md:h-4" style={{ background: "#2D1810", boxShadow: "-1px 0 0 0 #0D0503" }} />
        </div>
      </div>

      {/* Label */}
      <p className="font-pixel text-[6px] md:text-[7px] text-minecraft-stone mt-3 opacity-60 text-center">
        Mesa de encantamientos
      </p>
    </div>
  )
}
