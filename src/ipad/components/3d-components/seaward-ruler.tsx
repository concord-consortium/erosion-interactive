import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import seawardRuler from "../../assets/3d-assets/seaward-ruler.glb";

type GLTFResult = GLTF & {
  nodes: {
    ruler_10cm_marker: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    "Ruler_Mat3": THREE.MeshStandardMaterial
  }
}


export default function SeawardRuler({ ...props }) {
  const { nodes, materials } = useGLTF(seawardRuler) as GLTFResult;

  return (
    <group ref={props.reference} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ruler_10cm_marker.geometry}
        material={materials.Ruler_Mat3}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(seawardRuler);
