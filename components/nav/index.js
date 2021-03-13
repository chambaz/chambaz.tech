import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './nav.module.css'

const Nav = () => {
  const router = useRouter()

  const navItems = ['about', 'writing', 'coding', 'contact']

  const linkClass = (path) => {
    return router.pathname === `/${path}`
      ? `${styles.navLink} ${styles.navLinkActive}`
      : styles.navLink
  }

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>
          <img className={styles.navLogo} src="/img/fhole.svg" />
        </a>
      </Link>
      <ul className={styles.navList}>
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
    </nav>
  )
}

export default Nav
