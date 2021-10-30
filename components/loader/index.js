import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isMobileSafari } from 'react-device-detect'

import styles from './loader.module.css'

const Loader = (props) => {
  const router = useRouter()
  const [fontLoaded, setFontLoaded] = useState(false)
  const [secondaryLoad, setSecondaryLoad] = useState(false)
  const [isSafari, setIsSafari] = useState(false)
  const [dots, setDots] = useState(0)

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots < 3) {
        setDots(dots + 1)
      } else {
        setDots(0)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [dots])

  let cls = fontLoaded
    ? `${styles.loader} ${styles.loaderActive}`
    : styles.loader

  if (secondaryLoad) {
    cls += ` ${styles.loaderSecondary}`
  }

  if (isSafari) {
    cls += ` ${styles.loaderSafari}`
  }

  let dotsStr = ''

  for (let i = 0; i < dots; i++) {
    dotsStr += '.'
  }

  return (
    <div className={cls}>
      {!fontLoaded && (
        <div>
          <img className={styles.loaderLogo} src="/img/fhole.svg" />
          <p>Loading{dotsStr}</p>
        </div>
      )}
    </div>
  )
}

export default Loader
