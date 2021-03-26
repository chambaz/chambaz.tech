import React, { useEffect } from 'react'
import Head from 'next/head'
import { enablePageScroll } from 'scroll-lock'

import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Grid from '../components/grid'
import data from '../data/coding.json'

const Writing = () => {
  useEffect(() => {
    enablePageScroll()
  }, [])

  return (
    <main>
      <Head>
        <title>Adam Chambers - Creative Coding</title>
      </Head>
      <Loader />
      <Background />
      <Nav />
      <Container>
        <Grid
          heading="Creative Coding"
          moreHeading="CodePen"
          moreLink="https://codepen.io/chambaz"
          viewHeading="View piece"
          data={data}
        />
      </Container>
    </main>
  )
}

export default Writing
