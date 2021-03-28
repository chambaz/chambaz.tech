import Meta from '../components/meta'
import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Footer from '../components/footer'

import styles from '../components/container/container.module.css'

const About = () => {
  return (
    <main>
      <Meta title="Adam Chambers - About" />
      <Loader />
      <Background />
      <Nav />
      <Container>
        <div className={styles.containerCopy}>
          <h1>Creative Engineer</h1>
          <p>
            Adam Chambers is a multi-disciplinary creative technologist,
            marketer, musician, and maker. As partner and Head of Technology at
            creative consultancy{' '}
            <a href="https://www.digitalsurgeons.com/">Digital Surgeons</a>,
            Adam builds and leads cross-functional teams that drive progress for
            leading brands, businesses, and high-growth startups. Adam takes a
            creative-led, human-centered approach to business and lives at the
            intersection of design, technology.
          </p>
        </div>
      </Container>
      <Footer />
    </main>
  )
}

export default About
