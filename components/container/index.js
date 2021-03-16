import { useEffect, useState } from 'react'
import { isMobileSafari } from 'react-device-detect'
import styles from './container.module.css'

const Container = (props) => {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    if (isMobileSafari) {
      setIsSafari(true)
    }
  }, [])

  return (
    <div
      className={
        isMobileSafari
          ? `${styles.container} ${styles.containerSafari}`
          : styles.container
      }>
      {props.children}
    </div>
  )
}

export default Container
