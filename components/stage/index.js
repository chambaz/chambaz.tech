import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import styles from './stage.module.css'
import Background from '../background'

const Stage = (props) => {
  const slidesRef = useRef(null)
  const slideRef1 = useRef(null)
  const slideRef2 = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (slidesRef && slideRef1 && slideRef2) {
      ScrollTrigger.getAll().forEach((t) => t.kill(false))

      ScrollTrigger.create({
        trigger: slideRef2.current,
        scroller: slidesRef.current,
        start: 'top 55%',
        invalidateOnRefresh: true,
        onEnter: () => {
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

          gsap.to(props.scrollBtn.current, {
            opacity: 0,
            duration: 0.25,
          })

          gsap.to(props.description.current, {
            opacity: 1,
            delay: 0.75,
            duration: 0.75,
          })
        },
        onLeaveBack: () => {
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

          gsap.to(props.scrollBtn.current, {
            opacity: 1,
            duration: 0.75,
            delay: 1,
          })
        },
      })
    }
  })

  return (
    <div ref={slidesRef} className={styles.stage}>
      <div ref={slideRef1} className={styles.stageSlide}></div>
      <div ref={slideRef2} className={styles.stageSlide}></div>
    </div>
  )
}

export default Stage
