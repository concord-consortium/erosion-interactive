import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import seawardRuler from "../../assets/3d-assets/seaward-ruler.glb";

type GLTFResult = GLTF & {
  nodes: {
    Ruler_150cm: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    "Ruler_1_5m_big_text": THREE.MeshStandardMaterial
  }
}


export default function SeawardRuler({ ...props }) {
  const { nodes, materials } = useGLTF(seawardRuler) as GLTFResult;

  return (
    <group ref={props.reference} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ruler_150cm.geometry}
        material={materials.Ruler_1_5m_big_text}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(seawardRuler);
