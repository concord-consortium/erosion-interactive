/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as React from "react";
import THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import meshFile from "../../assets/3d-assets/mesh-panaluu.glb";

type GLTFResult = GLTF & {
  nodes: {
    PunaluuTerrain1: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    lambert1: THREE.MeshStandardMaterial
  }
}

export default function Model({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group>() as React.RefObject<THREE.Group>;
  const { nodes, materials } = useGLTF(meshFile) as GLTFResult;

  console.log(nodes.PunaluuTerrain1.geometry);

  return (
    <group ref={group} {...props} dispose={null}>
        <mesh name="PunaluuTerrain1" geometry={nodes.PunaluuTerrain1.geometry} material={materials.lambert1} rotation={[Math.PI / 2, 0, 0]} scale={0.01}/>
    </group>
  );
}

useGLTF.preload(meshFile);
