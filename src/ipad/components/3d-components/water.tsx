import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import water from "../../assets/3d-assets/water.glb";

type GLTFResult = GLTF & {
  nodes: {
    water: THREE.Mesh
  }
  materials: {
    water1: THREE.MeshStandardMaterial
  }
}

export default function Water({ ...props }) {
  const group = useRef<THREE.Group>() as React.RefObject<THREE.Group>;
  const { nodes, materials } = useGLTF(water) as GLTFResult;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.water.geometry}
        material={materials.water1}
        position={[0, .25, -250]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload(water);