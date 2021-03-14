import styles from './loader.module.css'

const Loader = (props) => {
  return (
    <div
      className={
        props.loaded ? `${styles.loader} ${styles.loaderActive}` : styles.loader
      }>
      {!props.loaded && (
        <div>
          <img className={styles.loaderLogo} src="/img/fhole.svg" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default Loader
