import React from "react";
import * as THREE from "three";
import sky from "../../assets/sky.png";


export const Sky = () => {
  const textureLoader = new THREE.TextureLoader();
  const skyTexture = textureLoader.load(sky);

  return (
    <mesh position={[0, 0, 0]}>
      <color attach="background" args={["#7fb2f6"]} />
      <sphereBufferGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
    </mesh>
  )
}