'use client';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect, useRef, useState } from 'react';

function Model({ isMobile }: { isMobile: boolean }) {
  const gltf = useLoader(GLTFLoader, 'mmd/furina_chibi.glb');
  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);
  const modelRef = useRef<THREE.Group>(null);

  // Handle scaling for responsive-ness
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = -Math.PI / 12;
      if (isMobile) {
        modelRef.current.scale.set(6.5, 6.5, 6.5);
      } else {
        modelRef.current.scale.set(4, 4, 4);
      }
    }
  }, [isMobile]);

  // Update mixer in animation frame and make model move
  useFrame((state, delta) => {
    // const t = state.clock.getElapsedTime();
    const y = isMobile ? -3.5 : -1.85;
    if (modelRef.current) {
      // modelRef.current.rotation.y = 3 * Math.PI / 2 + t * (Math.PI / 10);
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2 + y;
    }
    if (mixer) {
      mixer.update(delta * 0.25);
    }
  });

  // Setup materials
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const originalColor = (child.material as THREE.MeshStandardMaterial).color;
        const textureMap = (child.material as THREE.MeshStandardMaterial).map;

        child.material = new THREE.MeshBasicMaterial({
          color: originalColor,
          map: textureMap ? textureMap : undefined,
        });

        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }, [gltf]);

  // Play animations
  useEffect(() => {
    if (actions) {
      const animationNames = Object.keys(actions);

      animationNames.forEach((name) => {
        const action = actions[name];
        if (action) {
          action.clampWhenFinished = false;
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.reset().play();
        }
      });
    }
  }, [actions]);

  return <primitive object={gltf.scene} ref={modelRef} />;
}

export default function Furina() {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-96 lg:h-screen h-80">
      <Canvas shadows
        camera={{ position: [0, 5, 5], fov: 70 }}
        gl={{toneMapping: THREE.LinearToneMapping}}
        onCreated={({ gl, scene }) => {
          gl.toneMappingExposure = Math.pow(2, -0.75);
          scene.environment = null;
        }}
      >
        {/* Lightning */}
        <ambientLight intensity={2} />
        <directionalLight intensity={4} position={[5, 10, 7.5]} castShadow />

        {/* Model */}
        <Model isMobile={windowWidth < 1024} />

        {/* Model Controls */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
};