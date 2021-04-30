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
        onEnter: () => animateEnter(props),
        onLeaveBack: () => animateLeave(props),
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
