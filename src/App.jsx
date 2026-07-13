import { useRef } from "react"
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
      galleryRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 1600)
  }

  return (
    <>
      <XPOrbs />
      <Chest onOpen={scrollToGallery} />
      <div id="galeria" ref={galleryRef}>
        <Gallery />
      </div>
      <MinecraftCake />
      <BookAndQuill />
      <Footer />
      <MusicPlayer />
    </>
  )
}
