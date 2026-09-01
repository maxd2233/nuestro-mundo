import { useState, useEffect } from "react"
import { motion, useSpring } from "framer-motion"

export default function CursorGlow() {
  const [visible, setVisible] = useState(false)
  const springX = useSpring(0, { stiffness: 120, damping: 20 })
  const springY = useSpring(0, { stiffness: 120, damping: 20 })

  useEffect(() => {
    // Only enable on non-touch pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const handleMouseMove = (e) => {
      springX.set(e.clientX)
      springY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [springX, springY, visible])

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Soft golden / twilight cursor glow */}
      <div
        className="w-[340px] h-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 165, 55, 0.07) 0%, rgba(94, 217, 209, 0.04) 35%, transparent 70%)",
        }}
      />
    </motion.div>
  )
}

