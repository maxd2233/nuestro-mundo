// Procedural 8-bit & Minecraft style sound synthesizer using Web Audio API
// No external MP3 assets needed, instant response, 100% reliable across browsers

let audioCtx = null
let soundEnabled = true

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

export function toggleSoundEffects() {
  soundEnabled = !soundEnabled
  return soundEnabled
}

export function isSoundEnabled() {
  return soundEnabled
}

export function playChestOpenSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // 1. Wooden creak sound
  const osc1 = ctx.createOscillator()
  const gain1 = ctx.createGain()
  osc1.type = "sawtooth"
  osc1.frequency.setValueAtTime(80, now)
  osc1.frequency.exponentialRampToValueAtTime(140, now + 0.15)
  osc1.frequency.exponentialRampToValueAtTime(60, now + 0.35)

  gain1.gain.setValueAtTime(0.12, now)
  gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35)

  osc1.connect(gain1)
  gain1.connect(ctx.destination)
  osc1.start(now)
  osc1.stop(now + 0.35)

  // 2. Magical golden shimmer chime
  const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const noteTime = now + 0.15 + i * 0.08

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, noteTime)

    gain.gain.setValueAtTime(0.08, noteTime)
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(noteTime)
    osc.stop(noteTime + 0.4)
  })
}

export function playXpSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  // Ascending XP orb chime
  const startFreq = 800 + Math.random() * 200
  osc.frequency.setValueAtTime(startFreq, now)
  osc.frequency.exponentialRampToValueAtTime(startFreq * 1.5, now + 0.12)

  gain.gain.setValueAtTime(0.09, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.25)
}

export function playMineCrackSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "triangle"
  osc.frequency.setValueAtTime(140 + Math.random() * 40, now)
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.08)

  gain.gain.setValueAtTime(0.18, now)
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.09)
}

export function playDiamondShatterSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Crystal explosion chords
  const freqs = [1046.5, 1318.51, 1567.98, 2093.0]
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = now + idx * 0.04

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, t)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.3)

    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.45)
  })
}

export function playEatSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  // 3 quick crunchy bites
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = now + i * 0.12

    osc.type = "square"
    osc.frequency.setValueAtTime(220 + Math.random() * 60, t)
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.06)

    gain.gain.setValueAtTime(0.08, t)
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.07)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.07)
  }
}

export function playPageFlipSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "triangle"
  osc.frequency.setValueAtTime(300, now)
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.15)

  gain.gain.setValueAtTime(0.05, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.18)
}

export function playClickSound() {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.setValueAtTime(440, now)
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.04)

  gain.gain.setValueAtTime(0.06, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.06)
}

