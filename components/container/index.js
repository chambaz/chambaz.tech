import { useEffect, useState } from 'react'
import { isMobileSafari } from 'react-device-detect'
import styles from './container.module.css'

const Container = (props) => {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    if (isMobileSafari && props.noSafariFix !== true) {
      setIsSafari(true)
    }
  }, [])

  return (
    <div
      className={
        isSafari
          ? `${styles.container} ${styles.containerSafari}`
          : styles.container
      }
      style={{ alignItems: props.centerAlign ? 'center' : 'flex-start' }}>
      {props.children}
    </div>
  )
}

export default Container
