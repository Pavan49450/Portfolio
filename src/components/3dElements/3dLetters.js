// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Text, Environment } from "@react-three/drei";
// import { motion } from "framer-motion-3d";

// const AnimatedText = ({ text }) => {
//   return (
//     <motion.group
//       initial={{ scale: 0, rotateY: 0 }}
//       animate={{ scale: 1, rotateY: Math.PI * 2 }}
//       transition={{ duration: 2, ease: "easeInOut" }}
//     >
//       <Text
//         font="/fonts/Roboto-Bold.ttf"
//         fontSize={1}
//         color="#00ffff"
//         anchorX="center"
//         anchorY="middle"
//         bevelEnabled
//         bevelSize={0.02}
//         bevelThickness={0.05}
//       >
//         {/* Hello 3D!
//          */}
//         {text}
//       </Text>
//     </motion.group>
//   );
// };

// const ThreeDTextScene = ({ text }) => {
//   return (
//     <div className="w-full h-screen">
//       <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
//         <Suspense fallback={null}>
//           <AnimatedText text={text} />
//           <Environment preset="sunset" background />
//         </Suspense>
//         <OrbitControls enableZoom={false} />
//       </Canvas>
//     </div>
//   );
// };

// export default ThreeDTextScene;
