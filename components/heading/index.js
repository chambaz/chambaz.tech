import styles from './heading.module.css'

const Heading = (props) => {
  return (
    <div
      onMouseOver={() => props.setGlitchActive(true)}
      onMouseLeave={() => props.setGlitchActive(false)}>
      <h1 className={styles.heading}>
        Creative
        <br />
        Engineer
      </h1>
    </div>
  )
}

export default Heading
