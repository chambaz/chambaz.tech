import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import { animateEnter, animateLeave } from '../../lib/animation'

import styles from './stage.module.css'

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
          animateEnter(props)
          props.setDescIsActive(true)
        },
        onLeaveBack: () => {
          animateLeave(props)
          props.setDescIsActive(false)
        },
      })
    }
  })

  return (
    <div ref={slidesRef} id="slides" className={styles.stage}>
      <div ref={slideRef1} id="slide1" className={styles.stageSlide}></div>
      <div ref={slideRef2} id="slide2" className={styles.stageSlide}></div>
    </div>
  )
}

export default Stage
