import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const RotatingObject = ({ geometryType, rotationSpeed, color }) => {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += rotationSpeed;
      mesh.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={mesh}>
      {geometryType === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
      {geometryType === 'cube' && <boxGeometry args={[1, 1, 1]} />}
      {geometryType === 'torus' && <torusGeometry args={[1, 0.4, 16, 100]} />}
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

const ThreeScene = ({ objectVisibility, rotationSpeeds }) => {
  return (
    <Canvas style={{ height: '100vh', background: 'black' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, -10, -10]} intensity={0.5} />
      <Stars />
      <OrbitControls />
      {objectVisibility.sphere && <RotatingObject geometryType="sphere" rotationSpeed={rotationSpeeds.sphere} color="red" />}
      {objectVisibility.cube && <RotatingObject geometryType="cube" rotationSpeed={rotationSpeeds.cube} color="yellow" />}
      {objectVisibility.torus && <RotatingObject geometryType="torus" rotationSpeed={rotationSpeeds.torus} color="cyan" />}
    </Canvas>
  );
};

export default ThreeScene;
