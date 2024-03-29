import React, { Suspense, useState, useRef, useEffect } from 'react'
import { disablePageScroll } from 'scroll-lock'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

import { activateDescription, deactivateDescription } from '../lib/animation'

import Meta from '../components/meta'
import Loader from '../components/loader'
import Background from '../components/background'
import Logo from '../components/logo'
import AudioBtn from '../components/audioBtn'
import Container from '../components/container'
import Heading from '../components/heading'
import FHole from '../components/fhole'
import ScrollBtn from '../components/scrollBtn'
import Description from '../components/description'
import Stage from '../components/stage'
import Footer from '../components/footer'

const Home = () => {
  const headingRef = useRef()
  const canvasRef = useRef()
  const descriptionRef = useRef()
  const scrollBtnRef = useRef()
  const camera = useRef()
  const [mousePos, setMousePos] = useState({})
  const [descIsActive, setDescIsActive] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  const onMove = (e) => {
    if (e.touches) {
      e = e.touches[0]
    }

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

  useEffect(() => {
    disablePageScroll()

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Space' || e.key === 'Enter') {
        activateDescription()
        setDescIsActive(true)
      } else if (e.key === 'ArrowUp' || e.key === 'Escape') {
        deactivateDescription()
        setDescIsActive(false)
      }
    })
  }, [])

  return (
    <main onMouseMove={onMove} onTouchMove={onMove}>
      <Meta
        title="Chambaz - Creative Engineer"
        description="Multi-disciplinary creative technologist, marketer, musician, and maker."
      />
      <Loader />
      <Background />
      <Logo setDescIsActive={setDescIsActive} />
      {/* <AudioBtn /> */}
      <Container centerAlign={true}>
        <div ref={headingRef}>
          <Heading glitchActive={glitchActive} />
        </div>
      </Container>
      <div
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, width: '100%' }}
        ref={canvasRef}>
        <Canvas camera={{ position: [0, 0, 35] }}>
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
      </div>
      <ScrollBtn
        scrollBtnRef={scrollBtnRef}
        heading={headingRef}
        canvas={canvasRef}
        scrollBtn={scrollBtnRef}
        description={descriptionRef}
        descIsActive={descIsActive}
        setDescIsActive={setDescIsActive}
      />
      <Description descriptionRef={descriptionRef} />
      <Stage
        heading={headingRef}
        canvas={canvasRef}
        scrollBtn={scrollBtnRef}
        description={descriptionRef}
        descIsActive={descIsActive}
        setDescIsActive={setDescIsActive}
      />
      <Footer />
    </main>
  )
}

export default Home
