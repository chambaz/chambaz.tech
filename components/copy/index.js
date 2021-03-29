import styles from './copy.module.css'

const Copy = (props) => {
  let cls = styles.copy

  if (props.noMargin) {
    cls += ` ${styles.copyNoMargin}`
  }
  return <div className={cls}>{props.children}</div>
}

export default Copy
