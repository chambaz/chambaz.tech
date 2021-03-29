import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from './footer.module.css'

const Footer = (props) => {
  let cls = styles.footer

  if (props.neverHide) {
    cls += ` ${styles.footerNeverHide}`
  }
  return <footer className={cls}>Adam Chambers</footer>
}

export default Footer
