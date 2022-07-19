import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import landwardRuler from "../../assets/3d-assets/landward-ruler.glb";

type GLTFResult = GLTF & {
  nodes: {
    pSphere1: THREE.Mesh,
    ruler_marker: THREE.Mesh
  }
  materials: {
    "Ruler_Mat4.001": THREE.MeshStandardMaterial,
    "RED_Mat5.001": THREE.MeshStandardMaterial
  }
}


export default function LandwardRuler({ ...props }) {
  const group = React.useRef<THREE.Group>() as React.RefObject<THREE.Group>;
  const { nodes, materials } = useGLTF(landwardRuler) as GLTFResult;

  return (
    <group ref={props.reference} {...props} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere1.geometry}
            material={materials["RED_Mat5.001"]}
            position={[0, 0, -.5]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ruler_marker.geometry}
            material={materials["Ruler_Mat4.001"]}
          />
        </group>
    </group>
  );
}

useGLTF.preload(landwardRuler);
