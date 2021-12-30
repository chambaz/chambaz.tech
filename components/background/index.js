import React, { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

const Background = () => {
  const camera = useRef()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 35] }}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
      <PerspectiveCamera ref={camera} position={[0, 5, 5]} />
      <ambientLight />
      <mesh rotation={[0, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry attach="geometry" args={[width, height]} />
        <meshStandardMaterial attach="material" color="#222222" />
      </mesh>

      <EffectComposer>
        <Noise opacity={0.2} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  )
}

export default Background
