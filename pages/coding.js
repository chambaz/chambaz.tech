import React, { useEffect } from 'react'
import { enablePageScroll } from 'scroll-lock'

import Meta from '../components/meta'
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
      <Meta
        title="Adam Chambers - Creative Coding"
        description="Creative coding by Adam Chambers, multi-disciplinary creative technologist, marketer, musician, and maker."
      />
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
