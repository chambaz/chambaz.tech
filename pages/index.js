import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import Nav from '../components/nav'
import Container from '../components/container'
import Heading from '../components/heading'
import FHole from '../components/fhole'

const Home = () => {
  return (
    <main>
      <Nav />
      <Container>
        <Heading />
      </Container>
      <Canvas
        camera={{ position: [0, 0, 35] }}
        style={{ position: 'fixed', top: 0, left: 0 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={<mesh />}>
          <FHole />
        </Suspense>
      </Canvas>
    </main>
  )
}

export default Home
