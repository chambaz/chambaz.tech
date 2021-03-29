import React, { useEffect } from 'react'
import { enablePageScroll } from 'scroll-lock'

import Obfuscate from 'react-obfuscate'

import Meta from '../components/meta'
import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Copy from '../components/copy'
import Footer from '../components/footer'

const Contact = () => {
  useEffect(() => {
    enablePageScroll()
  }, [])

  return (
    <main>
      <Meta
        title="Adam Chambers - Contact"
        description="Partner and Head of Technology at creative consultancy Digital Surgeons, multi-disciplinary creative technologist, marketer, musician, and maker."
      />
      <Loader />
      <Background />
      <Nav />
      <Container>
        <Copy noMargin={true}>
          <h1>Get in touch</h1>
          <ul>
            <li>
              <Obfuscate email="ac@digitalsurgeons.com" />
            </li>
            <li>
              <a href="https://www.digitalsurgeons.com">digitalsurgeons.com</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/adamchambersds/">LinkedIn</a>
              , <a href="https://www.twitter.com/chambaz">Twitter</a>,{' '}
              <a href="https://codepen.io/chambaz">Codepen</a>
            </li>
          </ul>
        </Copy>
      </Container>
      <Footer />
    </main>
  )
}

export default Contact
