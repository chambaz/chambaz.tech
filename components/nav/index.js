import styles from './nav.module.css'

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <a className={styles.navLogo}>Logo</a>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="#">
            About
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="#">
            Writing
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="#">
            Creative Coding
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="#">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
