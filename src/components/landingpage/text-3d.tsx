"use client"
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface Text3DComponentProps {
  scrollProgress: number
}

export default function Text3DComponent({ scrollProgress }: Text3DComponentProps) {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (textRef.current) {
      // Rotate based on scroll
      textRef.current.rotation.y = scrollProgress * Math.PI * 2
      textRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.3
      
      // Scale based on scroll
      const scale = 1 + scrollProgress * 0.5
      textRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/fonts/blowbrush/blowbrush.json"
        size={1.5}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        COMING SOON
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </Text3D>
    </Center>
  )
}
