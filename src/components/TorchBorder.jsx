import { motion } from "framer-motion"

function Torch({ side }) {
  const isLeft = side === "left"

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "left-3 md:left-6" : "right-3 md:right-6"} z-10`}
    >
      {/* Torch stick */}
      <div className="flex flex-col items-center">
        {/* Flame */}
        <motion.div
          className="relative w-3 h-4 md:w-4 md:h-5 mb-px"
          animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 1 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(ellipse at bottom, #FFD700 20%, #FF8C00 50%, #FF4500 80%, transparent 100%)",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(ellipse at bottom, #FFFFFF 10%, transparent 60%)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.3, 0.7, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.div>

        {/* Glow */}
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,165,0,0.25) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stick */}
        <div
          className="w-1.5 h-5 md:w-2 md:h-6"
          style={{
            background: "linear-gradient(to right, #5C3A1E, #7A4B22, #5C3A1E)",
            boxShadow: "1px 0 0 0 #3D2010, -1px 0 0 0 #3D2010",
          }}
        />
      </div>
    </div>
  )
}

export default function TorchBorder() {
  return (
    <>
      <Torch side="left" />
      <Torch side="right" />
    </>
  )
}
