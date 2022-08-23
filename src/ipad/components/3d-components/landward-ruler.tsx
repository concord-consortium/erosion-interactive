import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import landwardRuler from "../../assets/3d-assets/landward-ruler.glb";

type GLTFResult = GLTF & {
  nodes: {
    pSphere2: THREE.Mesh,
    Ruler_150cm1: THREE.Mesh
  }
  materials: {
    "YellowMat": THREE.MeshStandardMaterial,
    "RED_Mat5": THREE.MeshStandardMaterial
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
            geometry={nodes.pSphere2.geometry}
            material={materials.RED_Mat5}
            position={[0, 0, -1.425]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Ruler_150cm1.geometry}
            material={materials.YellowMat}
          />
        </group>
    </group>
  );
}

useGLTF.preload(landwardRuler);
