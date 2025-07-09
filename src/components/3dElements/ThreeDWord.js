import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Center,
  Environment,
  Stars,
} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import font from "../../assets/fonts/helvetiker_regular.typeface.json";

const FloatingText = ({ word, hovered }) => {
  const mesh = useRef();

  // Animations: scale and color based on hover
  const { scale, color } = useSpring({
    scale: hovered ? 1.1 : 1,
    color: hovered ? "#ccc" : "#ffffff",
    config: { mass: 1, tension: 210, friction: 20 },
  });

  // Floating + rotation
  //   useFrame(({ clock }) => {
  //     if (mesh.current) {
  //       mesh.current.rotation.y = clock.getElapsedTime() * 1.3;
  //       mesh.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
  //     }
  //   });

  return (
    <a.group
      ref={mesh}
      scale={scale}
      //   onPointerOver={() => setHovered(true)}
      //   onPointerOut={() => setHovered(false)}
    >
      <Text3D
        font={font}
        size={20}
        height={1}
        curveSegments={16}
        bevelEnabled
        bevelThickness={0.15}
        bevelSize={0.2}
        bevelOffset={0}
        bevelSegments={10}
      >
        {word}
        <a.meshStandardMaterial
          attach="material"
          color={color}
          metalness={0.9}
          roughness={0.2}
        />
      </Text3D>
    </a.group>
  );
};

const ThreeDText = ({ word }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full h-fit m-auto flex justify-center items-center bg-white rounded-xl overflow-hidden hover:bg-zinc-100 transition-all"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Canvas shadows camera={{ position: [0, 0, 45], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          {/* <Environment preset="park" background={false} /> */}
          {/* <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          /> */}
          <Center>
            <FloatingText word={word} hovered={hovered} />
          </Center>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan />
      </Canvas>
    </div>
  );
};

export default ThreeDText;
