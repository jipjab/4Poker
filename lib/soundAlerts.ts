/**
 * Sound alert utilities using Web Audio API
 * Generates sounds programmatically without requiring audio files
 */

type SoundType = 'warning' | 'critical' | 'levelChange' | 'breakStart' | 'breakEnd'

interface SoundOptions {
  frequency?: number
  duration?: number
  volume?: number
  type?: 'beep' | 'chime' | 'alert'
}

/**
 * Play a sound using Web Audio API
 */
export const playSound = (
  type: SoundType,
  options: SoundOptions = {}
): void => {
  if (typeof window === 'undefined' || typeof AudioContext === 'undefined') {
    return
  }

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    let frequency: number
    let duration: number
    let volume: number = 0.3
    let soundType: 'beep' | 'chime' | 'alert' = 'beep'

    // Configure sound based on type
    switch (type) {
      case 'warning':
        frequency = 800
        duration = 200
        volume = 0.25
        soundType = 'beep'
        break
      case 'critical':
        frequency = 1000
        duration = 300
        volume = 0.4
        soundType = 'alert'
        break
      case 'levelChange':
        frequency = 600
        duration = 500
        volume = 0.35
        soundType = 'chime'
        break
      case 'breakStart':
        frequency = 500
        duration = 400
        volume = 0.3
        soundType = 'chime'
        break
      case 'breakEnd':
        frequency = 700
        duration = 400
        volume = 0.3
        soundType = 'chime'
        break
      default:
        frequency = 800
        duration = 200
    }

    // Override with options if provided
    frequency = options.frequency ?? frequency
    duration = options.duration ?? duration
    volume = options.volume ?? volume
    soundType = options.type ?? soundType

    if (soundType === 'chime') {
      // Play a pleasant chime (multiple tones)
      playChime(audioContext, frequency, duration, volume)
    } else if (soundType === 'alert') {
      // Play an alert sound (two-tone)
      playAlert(audioContext, frequency, duration, volume)
    } else {
      // Play a simple beep
      playBeep(audioContext, frequency, duration, volume)
    }
  } catch (error) {
    // Silently fail if audio is not available
    console.debug('Sound alert failed:', error)
  }
}

/**
 * Play a simple beep
 */
const playBeep = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  volume: number
): void => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration / 1000)
}

/**
 * Play a chime (multiple tones)
 */
const playChime = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  volume: number
): void => {
  const tones = [frequency, frequency * 1.25, frequency * 1.5]
  
  tones.forEach((tone, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = tone
    oscillator.type = 'sine'

    const delay = index * 50 // Stagger the tones
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay / 1000)
    gainNode.gain.linearRampToValueAtTime(volume * 0.6, audioContext.currentTime + (delay + 50) / 1000)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (delay + duration) / 1000)

    oscillator.start(audioContext.currentTime + delay / 1000)
    oscillator.stop(audioContext.currentTime + (delay + duration) / 1000)
  })
}

/**
 * Play an alert sound (two-tone pattern)
 */
const playAlert = (
  audioContext: AudioContext,
  frequency: number,
  duration: number,
  volume: number
): void => {
  // Play two beeps quickly
  playBeep(audioContext, frequency, duration / 2, volume)
  setTimeout(() => {
    playBeep(audioContext, frequency * 1.2, duration / 2, volume)
  }, duration / 2)
}

/**
 * Hook to manage sound alerts
 */
export const useSoundAlerts = (enabled: boolean) => {
  const playWarningSound = () => {
    if (enabled) {
      playSound('warning')
    }
  }

  const playCriticalSound = () => {
    if (enabled) {
      playSound('critical')
    }
  }

  const playLevelChangeSound = () => {
    if (enabled) {
      playSound('levelChange')
    }
  }

  const playBreakStartSound = () => {
    if (enabled) {
      playSound('breakStart')
    }
  }

  const playBreakEndSound = () => {
    if (enabled) {
      playSound('breakEnd')
    }
  }

  return {
    playWarningSound,
    playCriticalSound,
    playLevelChangeSound,
    playBreakStartSound,
    playBreakEndSound,
  }
}

