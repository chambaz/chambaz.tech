import { useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FHole = (props) => {
  console.log(props.mouse)
  const mesh = useRef()
  const gltf = useLoader(GLTFLoader, '/models/fhole.glb')

  const rotation = 0.018

  useFrame(() => {
    mesh.current.rotation.y +=
      rotation * (props.mouse.x * (rotation * 0.1) - mesh.current.rotation.y)
    mesh.current.rotation.x +=
      rotation * (props.mouse.y * (rotation * 0.1) - mesh.current.rotation.x)
  })

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
