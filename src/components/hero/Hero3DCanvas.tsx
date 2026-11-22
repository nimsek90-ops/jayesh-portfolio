"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrbs({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Gentle parallax follow
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.current.x * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.current.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Top Left Floating Pastel Iridescent Orb - Shifted outward for logo clarity */}
      <Float speed={2.0} rotationIntensity={0.6} floatIntensity={1.0}>
        <mesh ref={orb1} position={[-5.6, 2.4, -2.2]} scale={0.55}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#ffe4dc"
            attach="material"
            distort={0.2}
            speed={1.5}
            roughness={0.25}
            metalness={0.05}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>
      </Float>

      {/* Top Right Ambient Lavender Prism */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh ref={orb2} position={[4.1, 1.5, -2]} scale={0.65}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#dcdffd"
            roughness={0.2}
            metalness={0.3}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Subtle Floating Sky Sphere */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh ref={orb3} position={[3.6, -1.8, -1.5]} scale={0.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#fed4dc"
            attach="material"
            distort={0.25}
            speed={2}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffd4c4" />
        <FloatingOrbs mouse={mouse} />
      </Canvas>
    </div>
  );
}
