import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { IoMdVolumeOff } from 'react-icons/io'

import styles from './audioBtn.module.css'

const AudioBtn = (props) => {
  const labelRef = useRef(null)

  useEffect(() => {
    if (labelRef) {
      gsap.to(labelRef.current, {
        opacity: 1,
        duration: 1,
        repeat: 3,
        yoyo: true,
        repeatDelay: 10,
        delay: 10,
      })
    }
  }, [])

  return (
    <div className={styles.audioBtn}>
      <p ref={labelRef} className={styles.audioBtnLabel}>
        Enable audio experience
      </p>
      <button className={styles.audioBtnBtn}>
        <IoMdVolumeOff />
      </button>
    </div>
  )
}

export default AudioBtn
