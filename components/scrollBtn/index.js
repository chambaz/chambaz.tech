import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import styles from './scrollBtn.module.css'

const Nav = () => {
  const iconRef = useRef(null)

  useEffect(() => {
    if (iconRef) {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 3,
      })

      tl.to(iconRef.current, {
        y: 5,
        duration: 0.5,
        repeat: 5,
        yoyo: true,
      })
    }
  }, [])

  return (
    <button className={styles.scrollBtn}>
      {' '}
      <span>Scroll</span>{' '}
      <svg
        ref={iconRef}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.3335 22.6667L19.3335 16.6667L13.3335 10.6667"
          stroke="#ffffff"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(90, 16, 16)"></path>
      </svg>{' '}
    </button>
  )
}

export default Nav
