import React, { useState } from 'react'
import styles from './heading.module.css'

const Heading = (props) => {
  return (
    <div>
      <h1
        className={
          props.glitchActive
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
