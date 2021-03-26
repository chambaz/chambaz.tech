import React, { useEffect } from 'react'
import Head from 'next/head'
import { enablePageScroll } from 'scroll-lock'

import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Grid from '../components/grid'
import data from '../data/writing.json'

const Writing = () => {
  useEffect(() => {
    enablePageScroll()
  }, [])

  return (
    <main>
      <Head>
        <title>Adam Chambers - Writing</title>
      </Head>
      <Loader />
      <Background />
      <Nav />
      <Container>
        <Grid
          heading="Writing"
          moreHeading="digitalsurgeons.com"
          moreLink="https://www.digitalsurgeons.com/thoughts/author/adam-chambers/"
          viewHeading="Read article"
          data={data}
        />
      </Container>
    </main>
  )
}

export default Writing
