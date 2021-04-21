import { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FHole = (props) => {
  const [rotationY, setRotationY] = useState(0.013)
  const [rotationX, setRotationX] = useState(0.01)
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, '/models/fhole.glb')

  useEffect(() => {
    if (window.innerWidth < 769) {
      setRotationX(0.02)
      setRotationY(0.04)
    }
  }, [])

  useFrame(() => {
    if (!props.mouse.x || !props.mouse.y) {
      return
    }
    mesh.current.rotation.y +=
      rotationY * (props.mouse.x * (rotationY * 0.1) - mesh.current.rotation.y)
    mesh.current.rotation.x +=
      rotationX * (props.mouse.y * (rotationX * 0.1) - mesh.current.rotation.x)
  })

  return (
    <primitive
      ref={mesh}
      position={[0, 2, 0]}
      scale={[0.9, 0.9, 0.9]}
      object={gltf.scene}
      dispose={null}></primitive>
  )
}

export default FHole
