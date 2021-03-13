import { useRef } from 'react'
import { useLoader, useFrame, useEffect } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FHole = (props) => {
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, '/models/fhole.glb')

  const rotation = 0.01

  useFrame(() => {
    if (!props.mouse.x || !props.mouse.y) {
      return
    }
    mesh.current.rotation.y +=
      rotation * (props.mouse.x * (rotation * 0.1) - mesh.current.rotation.y)
    mesh.current.rotation.x +=
      rotation * (props.mouse.y * (rotation * 0.1) - mesh.current.rotation.x)
  })

  return (
    <primitive
      ref={mesh}
      position={[0, 0, 0]}
      scale={[0.9, 0.9, 0.9]}
      object={gltf.scene}
      dispose={null}></primitive>
  )
}

export default FHole
