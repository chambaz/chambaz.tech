import React, { useState } from 'react'
import styles from './heading.module.css'

const Heading = (props) => {
  const [hoverActive, setHoverActive] = useState(false)

  const hover = (activate = true) => {
    props.setGlitchActive(activate)
    setHoverActive(activate)
  }

  return (
    <div
      onMouseOver={() => hover()}
      onMouseLeave={() => hover(false)}
      onTouchEnd={() => hover(!props.glitchActive)}>
      <h1
        className={
          hoverActive
            ? `${styles.heading} ${styles.headingGlitch}`
            : styles.heading
        }>
        Creative
        <br />
        Engineer
      </h1>
    </div>
  )
}

export default Heading
