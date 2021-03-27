import Head from 'next/head'

import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Footer from '../components/footer'

const Contact = () => {
  return (
    <main>
      <Head>
        <title>Adam Chambers - Contact</title>
        <meta property="og:title" content="Adam Chambers - Contact" />
      </Head>
      <Loader />
      <Background />
      <Nav />
      <Container></Container>
      <Footer />
    </main>
  )
}

export default Contact
