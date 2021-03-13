import styles from './heading.module.css'

const Heading = (props) => {
  return (
    <header
      onMouseEnter={() => props.setGlitchActive(true)}
      onMouseLeave={() => props.setGlitchActive(false)}>
      <h1 className={styles.heading}>
        Creative
        <br />
        Engineer
      </h1>
    </header>
  )
}

export default Heading
