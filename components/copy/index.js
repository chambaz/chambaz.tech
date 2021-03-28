import styles from './copy.module.css'

const Copy = (props) => {
  return <div className={styles.copy}>{props.children}</div>
}

export default Copy
