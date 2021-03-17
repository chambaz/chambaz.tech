import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useResource } from 'react-three-fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Glitch } from 'react-postprocessing'
import { GlitchMode } from 'postprocessing'

import Loader from '../components/loader'
import Background from '../components/background'
import Nav from '../components/nav'
import Container from '../components/container'
import Heading from '../components/heading'
import FHole from '../components/fhole'
import Footer from '../components/footer'

const Home = () => {
  const headingRef = useRef()
  const camera = useResource()
  const [mousePos, setMousePos] = useState({})
  const [glitchActive, setGlitchActive] = useState(false)

  const onMouseMove = (e) => {
    if (e.touches && e.touches.length) {
      e = e.touches[0]
    }

    setMousePos({
      x: e.pageX - window.innerWidth / 2,
      y: e.pageY - window.innerHeight / 2,
    })
  }

  const onTouchMove = (e) => {
    e = e.touches[0]

    const headingBox = headingRef.current.getBoundingClientRect()

    if (
      e.pageX > headingBox.left &&
      e.pageX < headingBox.right &&
      e.pageY > headingBox.top &&
      e.pageY < headingBox.bottom
    ) {
      setGlitchActive(true)
    } else {
      setGlitchActive(false)
    }

    setMousePos({
      x: e.pageX - window.innerWidth / 2,
      y: e.pageY - window.innerHeight / 2,
    })
  }

  return (
    <main onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
      <Loader />
      <Background />
      <Nav />
      <Container centerAlign={true}>
        <div ref={headingRef}>
          <Heading
            glitchActive={glitchActive}
            setGlitchActive={setGlitchActive}
          />
        </div>
      </Container>
      <Canvas
        camera={{ position: [0, 0, 35] }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <PerspectiveCamera ref={camera} position={[0, 5, 5]} />
        <pointLight position={[-5, 0, -5]} color="#0201ff" intensity={1} />
        <pointLight position={[5, 0, -5]} color="#ff0078" intensity={1} />
        <Suspense fallback={<mesh />}>
          <FHole mouse={mousePos} />
        </Suspense>

        {glitchActive && (
          <EffectComposer>
            <Glitch
              delay={[1.5, 3.5]}
              duration={[0.6, 1.0]}
              strength={[0.3, 1.0]}
              mode={GlitchMode.CONSTANT_MILD}
              active
              ratio={0.85}
            />
          </EffectComposer>
        )}
      </Canvas>
      <Footer />
    </main>
  )
}

export default Home
