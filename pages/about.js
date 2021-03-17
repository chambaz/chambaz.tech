import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Footer from '../components/footer'

import styles from '../components/container/container.module.css'

const About = () => {
  return (
    <main>
      <Loader />
      <Background />
      <Nav />
      <Container centerAlign={true}>
        <div className={styles.containerCopy}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut
            blandit ex. Pellentesque eleifend a libero in condimentum. Curabitur
            sodales et ligula id faucibus. Nunc ac sapien et dolor placerat
            luctus. Donec vitae ante vel felis pretium luctus. Proin iaculis
            ligula id congue laoreet. In in sapien tempor, finibus orci nec,
            consectetur turpis. Suspendisse semper tincidunt sapien et bibendum.
            Duis elementum dapibus ipsum, sed suscipit quam suscipit a. Etiam in
            sapien ut ligula maximus ultricies.
          </p>
          <p>
            Nam tempus ut lorem nec facilisis. Etiam sit amet lorem pharetra,
            maximus nunc ut, accumsan sem. Vestibulum tristique pulvinar
            finibus. Aliquam et turpis egestas, posuere lectus at, fringilla
            arcu. In quis sem vitae libero eleifend sollicitudin sed ac ante.
            Donec porta est a metus aliquet blandit. Quisque ultricies, enim eu
            sagittis cursus, turpis velit mollis eros, vel molestie arcu enim
            sit amet tortor. Suspendisse potenti. Maecenas dictum varius
            tincidunt. Nam nec elementum enim. Sed ut rutrum dui.
          </p>
        </div>
      </Container>
      <Footer />
    </main>
  )
}

export default About
