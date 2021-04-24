import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import styles from './scrollBtn.module.css'

const ScrollBtn = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const iconRef = useRef(null)

  const clickToScroll = () => {
    if (!isActive) {
      setIsActive(true)
      gsap.to(props.heading.current, {
        y: (window.innerHeight / 2) * -1,
        opacity: 0.1,
        duration: 0.75,
        delay: 0.15,
      })

      gsap.to(props.canvas.current, {
        y: (window.innerHeight / 2) * -1,
        opacity: 0.1,
        duration: 0.75,
      })

      gsap.to(props.description.current, {
        opacity: 1,
        delay: 0.75,
        duration: 0.75,
      })

      props.description.current.style.pointerEvents = 'all'
    } else {
      setIsActive(false)
      gsap.to(props.heading.current, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.35,
      })

      gsap.to(props.canvas.current, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.2,
      })

      gsap.to(props.description.current, {
        opacity: 0,
        duration: 0.25,
        overwrite: true,
      })

      props.description.current.style.pointerEvents = 'none'
    }
  }

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

    setIsMobile(window.innerWidth < 769 ? true : false)
  }, [])

  let label = ''

  if (!isMobile) {
    label = 'scroll'
  } else {
    label = isActive ? 'Back to experience' : 'About Adam Chambers'
  }

  return (
    <button
      ref={props.scrollBtnRef}
      onClick={clickToScroll}
      className={styles.scrollBtn}>
      {' '}
      <span>{label}</span>{' '}
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
          transform={
            isActive ? 'rotate(-90, 16, 16)' : 'rotate(90, 16, 16)'
          }></path>
      </svg>{' '}
    </button>
  )
}

export default ScrollBtn
