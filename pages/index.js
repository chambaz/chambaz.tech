import React, { Suspense, useState } from 'react'
import { Canvas } from 'react-three-fiber'

import Nav from '../components/nav'
import Container from '../components/container'
import Heading from '../components/heading'
import FHole from '../components/fhole'

const Home = () => {
  const [mousePos, setMousePos] = useState({})
  const onMouseMove = (e) => {
    setMousePos({
      x: e.pageX - window.innerWidth / 2,
      y: e.pageY - window.innerHeight / 2,
    })
  }

  return (
    <main>
      <Nav />
      <Container>
        <Heading />
      </Container>
      <Canvas
        camera={{ position: [0, 0, 35] }}
        onMouseMove={onMouseMove}
        style={{ position: 'fixed', top: 0, left: 0 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={<mesh />}>
          <FHole mouse={mousePos} />
        </Suspense>
      </Canvas>
    </main>
  )
}

export default Home
