import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Grid from '../components/grid'
import Footer from '../components/footer'

const Writing = () => {
  return (
    <main>
      <Loader />
      <Background />
      <Nav />
      <Container noSafariFix={true}>
        <Grid />
      </Container>
      <Footer />
    </main>
  )
}

export default Writing
