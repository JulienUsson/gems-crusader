import React, { useRef, useState } from 'react'
import { Canvas, MeshProps, useFrame } from 'react-three-fiber'
import { Mesh } from 'three'

export default function GameState() {
  return (
    <Canvas style={{ flex: 1 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

function Box(props: MeshProps) {
  const mesh = useRef<Mesh>()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
