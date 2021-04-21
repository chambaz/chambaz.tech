import React from 'react'

import styles from './description.module.css'

const Description = (props) => {
  return (
    <p ref={props.descriptionRef} className={styles.description}>
      Head of Technology at{' '}
      <a href="https://www.digitalsurgeons.com/">Digital Surgeons</a>.
      <br />
      Creative engineer, marketer, musician, maker.
      <br />I write <a href="">here</a>, do creative coding <a href="">here</a>,
      and make music <a href="">here</a>.
    </p>
  )
}

export default Description
