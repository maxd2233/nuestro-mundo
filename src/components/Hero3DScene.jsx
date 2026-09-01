import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { playChestOpenSound } from "../utils/audioEffects"

// Helper function to create procedural voxel textures
function createWoodTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = "#6e411f"
  ctx.fillRect(0, 0, 64, 64)

  ctx.fillStyle = "#4a2a12"
  ctx.fillRect(0, 15, 64, 2)
  ctx.fillRect(0, 31, 64, 2)
  ctx.fillRect(0, 47, 64, 2)

  ctx.fillStyle = "#2d1c10"
  ctx.fillRect(0, 0, 64, 3)
  ctx.fillRect(0, 61, 64, 3)
  ctx.fillRect(0, 0, 3, 64)
  ctx.fillRect(61, 0, 3, 64)

  for (let i = 0; i < 200; i++) {
    const x = Math.floor(Math.random() * 64)
    const y = Math.floor(Math.random() * 64)
    ctx.fillStyle = Math.random() > 0.5 ? "#7d4c25" : "#593317"
    ctx.fillRect(x, y, 2, 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  return texture
}

function createGrassBlockTextures() {
  const topCanvas = document.createElement("canvas")
  topCanvas.width = 32
  topCanvas.height = 32
  const topCtx = topCanvas.getContext("2d")
  topCtx.fillStyle = "#5c9429"
  topCtx.fillRect(0, 0, 32, 32)
  for (let i = 0; i < 80; i++) {
    topCtx.fillStyle = Math.random() > 0.5 ? "#4c7d21" : "#6ea832"
    topCtx.fillRect(Math.floor(Math.random() * 32), Math.floor(Math.random() * 32), 2, 2)
  }

  const sideCanvas = document.createElement("canvas")
  sideCanvas.width = 32
  sideCanvas.height = 32
  const sideCtx = sideCanvas.getContext("2d")
  sideCtx.fillStyle = "#6e4a27"
  sideCtx.fillRect(0, 0, 32, 32)
  sideCtx.fillStyle = "#5c9429"
  sideCtx.fillRect(0, 0, 32, 8)
  for (let x = 0; x < 32; x += 4) {
    const dripHeight = 8 + Math.floor(Math.random() * 6)
    sideCtx.fillRect(x, 8, 4, dripHeight - 8)
  }

  const topTex = new THREE.CanvasTexture(topCanvas)
  topTex.magFilter = THREE.NearestFilter
  const sideTex = new THREE.CanvasTexture(sideCanvas)
  sideTex.magFilter = THREE.NearestFilter

  return { topTex, sideTex }
}

function createDiamondOreTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "#696969"
  ctx.fillRect(0, 0, 32, 32)
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#555555" : "#7b7b7b"
    ctx.fillRect(Math.floor(Math.random() * 32), Math.floor(Math.random() * 32), 2, 2)
  }
  const gemPositions = [
    [8, 8], [10, 8], [8, 10], [20, 14], [22, 14], [22, 16],
    [12, 22], [14, 22], [14, 24], [24, 6]
  ]
  gemPositions.forEach(([gx, gy]) => {
    ctx.fillStyle = "#5ed9d1"
    ctx.fillRect(gx, gy, 3, 3)
    ctx.fillStyle = "#d4fffc"
    ctx.fillRect(gx + 1, gy + 1, 1, 1)
  })

  const tex = new THREE.CanvasTexture(canvas)
  tex.magFilter = THREE.NearestFilter
  return tex
}

export default function Hero3DScene({ isOpen, onOpenChest }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 1.8, 6.2)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // Textures & Materials
    const woodTex = createWoodTexture()
    const { topTex: grassTopTex, sideTex: grassSideTex } = createGrassBlockTextures()
    const diamondOreTex = createDiamondOreTexture()

    const woodMaterial = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.75,
      metalness: 0.1,
    })

    const goldLatchMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6b830,
      roughness: 0.35,
      metalness: 0.85,
      emissive: 0x553e05,
      emissiveIntensity: 0.3,
    })

    const ironTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a42,
      roughness: 0.5,
      metalness: 0.7,
    })

    // Chest Group
    const chestGroup = new THREE.Group()
    chestGroup.position.set(0, 0, 0)
    scene.add(chestGroup)

    const CHEST_WIDTH = 2.0
    const CHEST_DEPTH = 2.0
    const BASE_HEIGHT = 1.1
    const LID_HEIGHT = 0.5

    // Chest Base
    const baseGeo = new THREE.BoxGeometry(CHEST_WIDTH, BASE_HEIGHT, CHEST_DEPTH)
    const baseMesh = new THREE.Mesh(baseGeo, woodMaterial)
    baseMesh.position.set(0, BASE_HEIGHT / 2 - 0.4, 0)
    baseMesh.castShadow = true
    baseMesh.receiveShadow = true
    chestGroup.add(baseMesh)

    // Iron corners
    const cornerGeo = new THREE.BoxGeometry(0.12, BASE_HEIGHT + 0.02, 0.12)
    const corners = [
      [CHEST_WIDTH / 2, BASE_HEIGHT / 2 - 0.4, CHEST_DEPTH / 2],
      [-CHEST_WIDTH / 2, BASE_HEIGHT / 2 - 0.4, CHEST_DEPTH / 2],
      [CHEST_WIDTH / 2, BASE_HEIGHT / 2 - 0.4, -CHEST_DEPTH / 2],
      [-CHEST_WIDTH / 2, BASE_HEIGHT / 2 - 0.4, -CHEST_DEPTH / 2],
    ]
    corners.forEach(([cx, cy, cz]) => {
      const cornerMesh = new THREE.Mesh(cornerGeo, ironTrimMaterial)
      cornerMesh.position.set(cx, cy, cz)
      chestGroup.add(cornerMesh)
    })

    // Chest Lid Pivot
    const lidPivot = new THREE.Group()
    lidPivot.position.set(0, BASE_HEIGHT - 0.4, -CHEST_DEPTH / 2)
    chestGroup.add(lidPivot)

    // Lid Mesh
    const lidGeo = new THREE.BoxGeometry(CHEST_WIDTH + 0.06, LID_HEIGHT, CHEST_DEPTH + 0.06)
    const lidMesh = new THREE.Mesh(lidGeo, woodMaterial)
    lidMesh.position.set(0, LID_HEIGHT / 2, (CHEST_DEPTH + 0.06) / 2)
    lidMesh.castShadow = true
    lidPivot.add(lidMesh)

    // Gold Latch
    const latchGeo = new THREE.BoxGeometry(0.3, 0.4, 0.12)
    const latchMesh = new THREE.Mesh(latchGeo, goldLatchMaterial)
    latchMesh.position.set(0, 0.05, CHEST_DEPTH + 0.09)
    lidPivot.add(latchMesh)

    // Interior Gold Glow (appears when opened)
    const glowPlaneGeo = new THREE.PlaneGeometry(CHEST_WIDTH * 0.85, CHEST_DEPTH * 0.85)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
    const glowPlane = new THREE.Mesh(glowPlaneGeo, glowMaterial)
    glowPlane.rotation.x = -Math.PI / 2
    glowPlane.position.set(0, BASE_HEIGHT - 0.45, 0)
    chestGroup.add(glowPlane)

    const chestInteriorLight = new THREE.PointLight(0xffd700, 0, 4)
    chestInteriorLight.position.set(0, BASE_HEIGHT - 0.2, 0)
    chestGroup.add(chestInteriorLight)

    // Floating Voxel Islands / Blocks
    const floatingBlocks = []

    // Grass block
    const grassMatArray = [
      new THREE.MeshStandardMaterial({ map: grassSideTex, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ map: grassSideTex, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ map: grassTopTex, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.9 }),
      new THREE.MeshStandardMaterial({ map: grassSideTex, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ map: grassSideTex, roughness: 0.8 }),
    ]
    const grassBlockGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7)
    const grassBlock = new THREE.Mesh(grassBlockGeo, grassMatArray)
    grassBlock.position.set(-2.8, 0.4, -0.6)
    grassBlock.castShadow = true
    scene.add(grassBlock)
    floatingBlocks.push({ mesh: grassBlock, baseY: 0.4, speed: 1.2, phase: 0, rotSpeed: 0.005 })

    // Diamond Ore block
    const diamondOreMat = new THREE.MeshStandardMaterial({
      map: diamondOreTex,
      roughness: 0.6,
      metalness: 0.2,
      emissive: 0x5ed9d1,
      emissiveIntensity: 0.25,
    })
    const diamondBlockGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6)
    const diamondBlock = new THREE.Mesh(diamondBlockGeo, diamondOreMat)
    diamondBlock.position.set(2.7, 0.7, -0.4)
    diamondBlock.castShadow = true
    scene.add(diamondBlock)
    floatingBlocks.push({ mesh: diamondBlock, baseY: 0.7, speed: 1.5, phase: 2, rotSpeed: -0.006 })

    // Floating gold block
    const goldNuggetGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35)
    const goldNugget = new THREE.Mesh(goldNuggetGeo, goldLatchMaterial)
    goldNugget.position.set(-1.8, 1.8, -1.2)
    scene.add(goldNugget)
    floatingBlocks.push({ mesh: goldNugget, baseY: 1.8, speed: 2.0, phase: 4, rotSpeed: 0.01 })

    // Pedestal
    const groundGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.3, 32)
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x181822,
      roughness: 0.85,
      metalness: 0.1,
    })
    const groundMesh = new THREE.Mesh(groundGeo, groundMat)
    groundMesh.position.set(0, -0.55, 0)
    groundMesh.receiveShadow = true
    scene.add(groundMesh)

    // Ambient floating dust particles
    const particleCount = 140
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12
      particlePositions[i * 3 + 1] = Math.random() * 6 - 1
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffdf80,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMaterial)
    scene.add(particleSystem)

    // Rising Golden Sparkles
    const sparkleCount = 45
    const sparkleGeo = new THREE.BufferGeometry()
    const sparklePos = new Float32Array(sparkleCount * 3)
    const sparkleVels = []

    for (let i = 0; i < sparkleCount; i++) {
      sparklePos[i * 3] = (Math.random() - 0.5) * 1.5
      sparklePos[i * 3 + 1] = BASE_HEIGHT / 2
      sparklePos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
      sparkleVels.push({
        vx: (Math.random() - 0.5) * 0.03,
        vy: Math.random() * 0.04 + 0.02,
        vz: (Math.random() - 0.5) * 0.03,
      })
    }

    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePos, 3))
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.14,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })
    const sparkleSystem = new THREE.Points(sparkleGeo, sparkleMat)
    scene.add(sparkleSystem)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x2d325a, 1.8)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffecd0, 2.4)
    sunLight.position.set(4, 7, 5)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 1024
    sunLight.shadow.mapSize.height = 1024
    scene.add(sunLight)

    const torchLeftLight = new THREE.PointLight(0xff8822, 2.8, 8, 1.5)
    torchLeftLight.position.set(-3.5, 1.5, 1.5)
    scene.add(torchLeftLight)

    const torchRightLight = new THREE.PointLight(0xff8822, 2.8, 8, 1.5)
    torchRightLight.position.set(3.5, 1.5, 1.5)
    scene.add(torchRightLight)

    const rimLight = new THREE.PointLight(0x5ed9d1, 2.0, 7)
    rimLight.position.set(0, 3, -3)
    scene.add(rimLight)

    // Mouse & Gyroscope coordinates
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-999, -999)
    let targetCameraX = 0
    let targetCameraY = 1.8
    let currentLidAngle = 0
    let targetLidAngle = 0

    const onPointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      targetCameraX = mouse.x * 0.9
      targetCameraY = 1.8 + mouse.y * 0.4
    }

    // Gyroscope tilt support on mobile
    const onDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = (e.gamma / 45) * 0.8
        const tiltY = ((e.beta - 45) / 45) * 0.4
        targetCameraX = Math.max(-1.2, Math.min(1.2, tiltX))
        targetCameraY = 1.8 + Math.max(-0.4, Math.min(0.6, tiltY))
      }
    }

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )
      raycaster.setFromCamera(clickMouse, camera)
      const intersects = raycaster.intersectObjects([baseMesh, lidMesh, latchMesh], true)

      if (intersects.length > 0 || (Math.abs(clickMouse.x) < 0.35 && Math.abs(clickMouse.y) < 0.35)) {
        if (!isOpenRef.current) {
          playChestOpenSound()
          onOpenChest?.()
        }
      }
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true })
    renderer.domElement.addEventListener("click", onClick)

    const onResize = () => {
      if (!container) return
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", onResize)

    // Animation Loop
    const startTime = performance.now()
    let animationFrameId

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = (performance.now() - startTime) * 0.001

      // Torch flicker
      const flicker1 = Math.sin(elapsedTime * 9) * 0.3 + Math.sin(elapsedTime * 23) * 0.2
      const flicker2 = Math.cos(elapsedTime * 8) * 0.3 + Math.sin(elapsedTime * 19) * 0.2
      torchLeftLight.intensity = 2.8 + flicker1
      torchRightLight.intensity = 2.8 + flicker2

      // Camera lerp
      camera.position.x += (targetCameraX - camera.position.x) * 0.04
      camera.position.y += (targetCameraY - camera.position.y) * 0.04
      camera.lookAt(0, 0.4, 0)

      // Chest opening lerp
      targetLidAngle = isOpenRef.current ? -Math.PI * 0.65 : 0
      currentLidAngle += (targetLidAngle - currentLidAngle) * 0.08
      lidPivot.rotation.x = currentLidAngle

      // Glow intensity lerp
      if (isOpenRef.current) {
        glowMaterial.opacity = Math.min(glowMaterial.opacity + 0.04, 0.85)
        chestInteriorLight.intensity = Math.min(chestInteriorLight.intensity + 0.25, 4.5)
        sparkleMat.opacity = Math.min(sparkleMat.opacity + 0.03, 0.95)

        const positions = sparkleGeo.attributes.position.array
        for (let i = 0; i < sparkleCount; i++) {
          positions[i * 3] += sparkleVels[i].vx
          positions[i * 3 + 1] += sparkleVels[i].vy
          positions[i * 3 + 2] += sparkleVels[i].vz
          if (positions[i * 3 + 1] > 3.5) {
            positions[i * 3 + 1] = BASE_HEIGHT / 2
          }
        }
        sparkleGeo.attributes.position.needsUpdate = true
      }

      // Floating blocks
      floatingBlocks.forEach((fb) => {
        fb.mesh.position.y = fb.baseY + Math.sin(elapsedTime * fb.speed + fb.phase) * 0.12
        fb.mesh.rotation.y += fb.rotSpeed
        fb.mesh.rotation.x = Math.sin(elapsedTime * 0.8 + fb.phase) * 0.05
      })

      // Chest idle float
      chestGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.04

      // Particles drift
      const pPositions = particleGeo.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += 0.003
        if (pPositions[i * 3 + 1] > 5) {
          pPositions[i * 3 + 1] = -1
        }
      }
      particleGeo.attributes.position.needsUpdate = true

      // Raycaster hover state
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects([baseMesh, lidMesh, latchMesh], true)
      const hovering = hits.length > 0
      if (hovering !== isHovered) {
        setIsHovered(hovering)
        renderer.domElement.style.cursor = hovering ? "pointer" : "default"
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("deviceorientation", onDeviceOrientation)
      window.removeEventListener("resize", onResize)
      renderer.domElement.removeEventListener("click", onClick)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      renderer.dispose()
      baseGeo.dispose()
      lidGeo.dispose()
      latchGeo.dispose()
      grassBlockGeo.dispose()
      diamondBlockGeo.dispose()
      goldNuggetGeo.dispose()
      groundGeo.dispose()
      particleGeo.dispose()
      sparkleGeo.dispose()
      woodTex.dispose()
      grassTopTex.dispose()
      grassSideTex.dispose()
      diamondOreTex.dispose()
    }
  }, [onOpenChest])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] md:min-h-[480px] relative select-none"
    />
  )
}
