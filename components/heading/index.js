import styles from './heading.module.css'

const Heading = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.subheading}>Adam Chambers</h1>
      <h2 className={styles.heading}>Creative Engineer</h2>
    </header>
  )
}

export default Heading
