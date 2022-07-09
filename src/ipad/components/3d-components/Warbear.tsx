/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, RefObject } from 'react';
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF } from '@react-three/drei';
import warBear from "../../assets/3d-assets/warbear.gltf";

type GLTFResult = GLTF & {
  nodes: {
    Warbear: THREE.Mesh
  }
}

export default function Model({ ...props }) {
  const group = useRef<THREE.Group>() as RefObject<THREE.Group>;
  const { nodes } = useGLTF(warBear) as GLTFResult;
  const material = new THREE.MeshStandardMaterial({color: "gray"});

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Warbear.geometry} position={[0, 2, 0]} material={material} rotation={[-(Math.PI / 2), 0, 0]} scale={0.05} />
    </group>
  )
}

useGLTF.preload(warBear);