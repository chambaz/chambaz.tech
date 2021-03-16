import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isMobileSafari } from 'react-device-detect'

import styles from './loader.module.css'

const Loader = (props) => {
  const router = useRouter()
  const [fontLoaded, setFontLoaded] = useState(false)
  const [secondaryLoad, setSecondaryLoad] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    if (isMobileSafari) {
      setIsSafari(true)
    }

    router.events.on('routeChangeComplete', () => {
      setFontLoaded(true)
      setSecondaryLoad(true)
    })

    const timeNow = new Date().getTime()
    document.fonts.ready.then(() => {
      const timePast = new Date().getTime() - timeNow

      setTimeout(() => {
        setFontLoaded(true)
      }, 2000 - timePast)
    })
  }, [])

  let cls = fontLoaded
    ? `${styles.loader} ${styles.loaderActive}`
    : styles.loader

  if (secondaryLoad) {
    cls += ` ${styles.loaderSecondary}`
  }

  if (isMobileSafari) {
    cls += ` ${styles.loaderSafari}`
  }

  return (
    <div className={cls}>
      {!fontLoaded && (
        <div>
          <img className={styles.loaderLogo} src="/img/fhole.svg" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default Loader
