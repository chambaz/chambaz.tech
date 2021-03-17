import Head from 'next/head'

import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Grid from '../components/grid'
import data from '../data/articles.json'

const Writing = () => {
  return (
    <main>
      <Head>
        <title>Adam Chambers - Creative Coding</title>
      </Head>
      <Loader />
      <Background />
      <Nav />
      <Container>
        <Grid heading="Coding" data={data} />
      </Container>
    </main>
  )
}

export default Writing
