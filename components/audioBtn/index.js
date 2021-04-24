import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { IoIosVolumeOff } from 'react-icons/io'
import { IoIosVolumeHigh } from 'react-icons/io'

import styles from './audioBtn.module.css'

const AudioBtn = (props) => {
  const [audioPower, setAudioPower] = useState(false)
  const [hintAnimation, setHintAnimation] = useState(null)
  const labelRef = useRef(null)

  const toggleAudio = (hintAnimation) => {
    hintAnimation.kill()
    setAudioPower(!audioPower)
  }

  useEffect(() => {
    if (labelRef) {
      setHintAnimation(
        gsap.to(labelRef.current, {
          opacity: 1,
          duration: 2,
          repeat: 1,
          yoyo: true,
          repeatDelay: 7,
          delay: 12,
        })
      )
    }
  }, [])

  return (
    <div className={styles.audioBtn} onClick={() => toggleAudio(hintAnimation)}>
      <p ref={labelRef} className={styles.audioBtnLabel}>
        Enable audio experience
      </p>
      <button
        className={styles.audioBtnBtn}
        style={{ display: !audioPower ? 'block' : 'none' }}>
        <IoIosVolumeOff />
      </button>
      <button
        className={styles.audioBtnBtn}
        style={{ display: audioPower ? 'block' : 'none' }}>
        <IoIosVolumeHigh />
      </button>
    </div>
  )
}

export default AudioBtn
