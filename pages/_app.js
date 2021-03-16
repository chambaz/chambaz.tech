import React, { useEffect } from 'react'
import { disablePageScroll } from 'scroll-lock'
import './index.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    disablePageScroll()
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
