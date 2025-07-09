import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Plane } from "@react-three/drei";
import * as THREE from "three";
import css from "../../assets/uploads/css3.png";

const FloatingImage = ({ imageUrl }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const meshRef = useRef();

  // Add floating animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={[12, 8, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const ImageTo3D = ({ imageUrl }) => {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          {/* <FloatingImage imageUrl={imageUrl} /> */}
          <FloatingImage imageUrl={css} />
          {/* <FloatingImage imageUrl={"logo192.png"} /> */}
          {/* <FloatingImage
            imageUrl={
              "https://imgs.search.brave.com/lcloPg0TTw-kwWnAHgSGMtGgab4HSImmASpwESibg-Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vU2dmZ3dH/NWd3emh6SDBBbXZC/LVQ3VTBCQ2tTLU9B/TWk5d3NsazE4TGdI/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl6/ZEdGMC9hV011ZG1W/amRHVmxlbmt1L1ky/OXRMM041YzNSbGJT/OXkvWlhOdmRYSmpa/WE12ZEdoMS9iV0p1/WVdsc2N5OHdNRFV2/L016RTJMemt4TVM5/emJXRnMvYkM5aFlu/TjBjbUZqZEMxai9j/bVZoZEdsMlpTMXBa/R1ZoL0xXeHZaMjh0/Wm05eUxXSjEvYzJs/dVpYTnpMV0oxYVd4/ay9hVzVuTFc5eUxX/TnZiWEJoL2Jua3Rk/SEpoYm5Od1lYSmwv/Ym5RdFpHVnphV2R1/TFhSbC9iWEJzWVhS/bExXWnlaV1V0L2Rt/VmpkRzl5TG1wd1p3.jpeg"
            }
          /> */}
        </Suspense>
        <OrbitControls enablePan enableZoom />
      </Canvas>
    </div>
  );
};

export default ImageTo3D;
