import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import rulerFile from "../../assets/3d-assets/ruler-1m.glb";

type GLTFResult = GLTF & {
  nodes: {
    Ruler_0: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    "Ruler_Mat.002": THREE.MeshStandardMaterial
  }
}


export default function Ruler({ ...props }) {
  console.log("ruler props", props);
  const { nodes, materials } = useGLTF(rulerFile) as GLTFResult;

  return (
    <group ref={props.reference} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ruler_0.geometry}
        material={materials["Ruler_Mat.002"]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload("/ruler-1m.glb");
