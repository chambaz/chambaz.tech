import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isMobileSafari } from 'react-device-detect'

import styles from './nav.module.css'

const Nav = () => {
  const router = useRouter()
  const navList = useRef()
  const [isActive, setIsActive] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  const navItems = ['about', 'writing', 'coding', 'contact']

  const linkClass = (path) => {
    return router.pathname === `/${path}`
      ? `${styles.navLink} ${styles.navLinkActive}`
      : styles.navLink
  }

  useEffect(() => {
    if (isMobileSafari) {
      setIsSafari(true)
    }
  }, [])

  return (
    <nav
      className={isActive ? `${styles.nav} ${styles.navActive}` : styles.nav}>
      <a onClick={() => router.push('/')}>
        <img className={styles.navLogo} src="/img/fhole.svg" />
      </a>
      <ul
        className={
          isSafari
            ? `${styles.navList} ${styles.navListSafari}`
            : styles.navList
        }>
        {navItems.map((item, key) => {
          return (
            <li className={styles.navItem} key={key}>
              <Link href={`/${item}`}>
                <a className={linkClass(item)}>{item}</a>
              </Link>
            </li>
          )
        })}
      </ul>
      <svg
        className={styles.navHamburger}
        onClick={() => setIsActive(!isActive)}
        width="54"
        height="47"
        viewBox="0 0 54 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          className={styles.navBar1}
          d="M51.11 4.76999H2.36C1.82957 4.76999 1.32086 4.55927 0.945786 4.1842C0.570713 3.80913 0.360001 3.30042 0.360001 2.76999C0.360001 2.23956 0.570713 1.73085 0.945786 1.35578C1.32086 0.980703 1.82957 0.769989 2.36 0.769989H51.11C51.6404 0.769989 52.1491 0.980703 52.5242 1.35578C52.8993 1.73085 53.11 2.23956 53.11 2.76999C53.11 3.30042 52.8993 3.80913 52.5242 4.1842C52.1491 4.55927 51.6404 4.76999 51.11 4.76999Z"
          fill="white"
        />
        <path
          className={styles.navBar2}
          d="M26.23 25.51H2.36C1.82957 25.51 1.32086 25.2993 0.945786 24.9242C0.570713 24.5491 0.360001 24.0404 0.360001 23.51C0.360001 22.9795 0.570713 22.4708 0.945786 22.0958C1.32086 21.7207 1.82957 21.51 2.36 21.51H26.23C26.7604 21.51 27.2691 21.7207 27.6442 22.0958C28.0193 22.4708 28.23 22.9795 28.23 23.51C28.23 24.0404 28.0193 24.5491 27.6442 24.9242C27.2691 25.2993 26.7604 25.51 26.23 25.51Z"
          fill="white"
        />
        <path
          className={styles.navBar3}
          d="M51.11 46.24H2.36C1.82957 46.24 1.32086 46.0293 0.945786 45.6542C0.570713 45.2791 0.360001 44.7704 0.360001 44.24C0.360001 43.7096 0.570713 43.2008 0.945786 42.8258C1.32086 42.4507 1.82957 42.24 2.36 42.24H51.11C51.6404 42.24 52.1491 42.4507 52.5242 42.8258C52.8993 43.2008 53.11 43.7096 53.11 44.24C53.11 44.7704 52.8993 45.2791 52.5242 45.6542C52.1491 46.0293 51.6404 46.24 51.11 46.24Z"
          fill="white"
        />
      </svg>
    </nav>
  )
}

export default Nav
