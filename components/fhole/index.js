import { useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FHole = () => {
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, '/models/fhole.glb')

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <primitive
      ref={mesh}
      position={[0, -8, 0]}
      scale={[0.4, 0.4, 0.4]}
      object={gltf.scene}
      dispose={null}></primitive>
  )
}

export default FHole
