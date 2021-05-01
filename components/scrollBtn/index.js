import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'

import styles from './scrollBtn.module.css'

const ScrollBtn = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const iconRef = useRef(null)

  gsap.registerPlugin(ScrollToPlugin)

  const clickToScroll = () => {
    if (!props.descIsActive) {
      setTimeout(() => {
        props.setDescIsActive(true)
      }, 500)
      gsap.to(document.querySelector('#slides'), {
        duration: 0.5,
        scrollTo: document.querySelector('#slide2'),
      })
      props.description.current.style.pointerEvents = 'all'
    } else {
      setTimeout(() => {
        props.setDescIsActive(false)
      }, 500)
      gsap.to(document.querySelector('#slides'), {
        duration: 1,
        scrollTo: document.querySelector('#slide1'),
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

  let label = 'More info'

  if (props.descIsActive) {
    label = 'Back to experience'
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
            props.descIsActive ? 'rotate(-90, 16, 16)' : 'rotate(90, 16, 16)'
          }></path>
      </svg>{' '}
    </button>
  )
}

export default ScrollBtn
