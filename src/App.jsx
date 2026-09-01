import { useRef } from "react"
import SmoothScroll from "./components/SmoothScroll"
import CursorGlow from "./components/CursorGlow"
import TimelineHUD from "./components/TimelineHUD"
import Chest from "./components/Chest"
import Gallery from "./components/Gallery"
import BookAndQuill from "./components/BookAndQuill"
import Footer from "./components/Footer"
import MusicPlayer from "./components/MusicPlayer"
import XPOrbs from "./components/XPOrbs"
import MinecraftCake from "./components/MinecraftCake"

export default function App() {
  const galleryRef = useRef(null)

  const scrollToGallery = () => {
    setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo("#galeria", {
          offset: 0,
          duration: 1.8,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        })
      } else {
        galleryRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }, 1500)
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#07070d] text-white selection:bg-[#FFD700]/30 selection:text-[#FFD700] overflow-x-hidden">
        {/* Ambient Cursor Light */}
        <CursorGlow />

        {/* Floating Adventure Compass / Timeline HUD */}
        <TimelineHUD />

        {/* Ambient Floating XP Orbs */}
        <XPOrbs />

        {/* 3D WebGL Hero Chest Section */}
        <div id="hero">
          <Chest onOpen={scrollToGallery} />
        </div>

        {/* Moments Timeline Gallery */}
        <div id="galeria" ref={galleryRef}>
          <Gallery />
        </div>

        {/* Interactive Minecraft Cake */}
        <MinecraftCake />

        {/* 3D Grimoire Letter / Book & Quill */}
        <BookAndQuill />

        {/* Footer */}
        <Footer />

        {/* Floating Jukebox Music Player */}
        <MusicPlayer />
      </div>
    </SmoothScroll>
  )
}
