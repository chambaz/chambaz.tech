import styles from './grid.module.css'

const Grid = (props) => {
  return (
    <div className={styles.grid}>
      <div className={styles.gridItem}>
        <img
          className={styles.gridImg}
          src="https://www.digitalsurgeons.com/wp-content/uploads/2021/01/CDP_Header_DS.jpg"
        />
        <h2 className={styles.gridHeading}>
          The Power of a Customer Data Platform
        </h2>
        <a className={styles.gridLink} href="">
          Read article
        </a>
      </div>
      <div className={styles.gridItem}>
        <img
          className={styles.gridImg}
          src="https://www.digitalsurgeons.com/wp-content/uploads/2020/10/RIP_cookies_DScom_1170x657.jpg"
        />
        <h2 className={styles.gridHeading}>
          The machine-led, cookie-less future of online advertising
        </h2>
        <a className={styles.gridLink} href="">
          Read article
        </a>
      </div>
    </div>
  )
}

export default Grid
