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
        <svg
          className={styles.navLogo}
          width="506"
          height="1002"
          viewBox="0 0 506 1002"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M69.8 914.7C82.5 941 95.3 965.2 126 966.3C157.3 967.4 172 943.1 183.4 918.8C219.2 842.8 226.2 761.2 224.3 678.9C222.7 609.1 214.1 540.1 183.4 475.6C182.2 473.1 182.5 469.1 184.1 466.8C204.5 436.5 207.6 402.9 208.1 368.2C209.1 296 214.6 217.5 241.2 150C257.2 109.4 272.9 75.8 299.2 40.9C331.3 -1.7 390.5 -9.4 435.6 13.8C482.9 38.1 513.9 98.5 503.3 146C497.8 170.7 480.4 186.8 455.6 188.4C433.7 189.8 416.8 180.9 407.3 160.5C397.1 138.4 403.1 117 422.8 98.8C426.7 95.2 431.1 90.6 434.6 87.8C423 63 412.3 37.4 381.2 36.7C350.8 35.9 330.7 62.7 321.3 86.8C295.8 151.4 284.6 211.4 282.1 279C279.1 362.2 286.4 444.1 320 521.9C322.3 527.2 322 535.7 319.2 540.6C301.9 570.2 298.9 602.4 298 635.7C296 715.6 294.2 793.9 265.9 869.3C250.6 904.4 234.8 938.7 209.7 967.5C175.8 1006.4 107 1010.4 63 985C20.6 960.5 -7.39999 899.7 3.20001 855.2C8.60001 832.4 25.3 817 47.5 814.7C70.5 812.3 88.1 820.7 98.5 841.7C108.5 861.8 103.3 886.6 86 902.5C81.3 906.6 76.1 909.9 69.8 914.7Z"
            fill="white"
          />
        </svg>
      </a>
      {/* <ul
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
      </svg> */}
    </nav>
  )
}

export default Nav
