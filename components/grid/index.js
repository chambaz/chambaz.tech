import styles from './grid.module.css'

const Grid = (props) => {
  return (
    <div className={styles.grid}>
      <h1 className={styles.gridHeading}>{props.heading}</h1>
      <div className={styles.gridContainer}>
        {props.data.data.map((item, key) => {
          return (
            <a href={item.link} className={styles.gridItem} key={key}>
              <img className={styles.gridItemImg} src={item.image} />
              <h2 className={styles.gridItemHeading}>{item.heading}</h2>
              <span className={styles.gridItemLink}>{props.view}</span>
            </a>
          )
        })}
        <a href={props.moreLink} className={styles.gridItemCenter}>
          <h2 className={styles.gridItemHeading}>See more on {props.more}</h2>
          <span className={styles.gridItemBtn}>Visit {props.more}</span>
        </a>
      </div>
    </div>
  )
}

export default Grid
