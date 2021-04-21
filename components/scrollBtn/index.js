import React from 'react'

import styles from './scrollBtn.module.css'

const Nav = () => {
  return (
    <button className={styles.scrollBtn}>
      {' '}
      <span>Scroll</span>{' '}
      <svg
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
