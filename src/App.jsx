import { useRef } from "react"
import Chest from "./components/Chest"
import Gallery from "./components/Gallery"
import Letter from "./components/Letter"
import Footer from "./components/Footer"

export default function App() {
  const galleryRef = useRef(null)

  const scrollToGallery = () => {
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 1600)
  }

  return (
    <>
      <Chest onOpen={scrollToGallery} />
      <div id="galeria" ref={galleryRef}>
        <Gallery />
      </div>
      <Letter />
      <Footer />
    </>
  )
}
