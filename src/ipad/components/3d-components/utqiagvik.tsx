import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "./gltf-type-helper";
import utgiagvik from "../../assets/3d-assets/utqiagvik.glb";


export default function Utgiagvik ({ ...props }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(utgiagvik) as GLTFResult;
  const group = React.useRef<THREE.Group>() as React.RefObject<THREE.Group>;

  return (
    <group {...props} dispose={null}>
    <group position={[37.22, 12, 113.59]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh032.geometry}
        material={materials.metal_tin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh032_1.geometry}
        material={materials.antena}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh032_2.geometry}
        material={materials["antena.001"]}
      />
    </group>
    <group
      position={[-0.55, 11.59, 87.33]}
      rotation={[0, 1.2, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh058.geometry}
        material={materials.metal_tin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh058_1.geometry}
        material={materials.antena}
      />
    </group>
    <group position={[47.54, 9.34, 81.01]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh037.geometry}
        material={materials.metal_tin}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh037_1.geometry}
        material={materials.antena}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh037_2.geometry}
        material={materials["antena.001"]}
      />
    </group>
    <group position={[-14, 12.22, 82]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh074.geometry}
        material={materials["metal_tin.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh074_1.geometry}
        material={materials["antena.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh074_2.geometry}
        material={materials["antena.002"]}
      />
    </group>
    <group position={[14, 12.22, 81.82]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh077.geometry}
        material={materials["metal_tin.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh077_1.geometry}
        material={materials["antena.009"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh077_2.geometry}
        material={materials["antena.008"]}
      />
    </group>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.pipes025.geometry}
      material={materials.pipes_01}
      position={[0.88, 4.21, 84.7]}
      rotation={[0, -1.57, 0]}
      scale={1.19}
    />
    <group
      position={[2.68, 11.29, 88.54]}
      rotation={[0, -1.57, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh066.geometry}
        material={materials.roof_win_base}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh066_1.geometry}
        material={materials.roof_win_glass}
      />
    </group>
    <group
      position={[-6.66, 4.86, 89.16]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh048.geometry}
        material={materials.rust_met}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh048_1.geometry}
        material={materials.lamp}
      />
    </group>
    <group
      position={[-43.08, 8.95, 123.3]}
      rotation={[-Math.PI, 0, -Math.PI]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh047.geometry}
        material={materials.rust_met}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh047_1.geometry}
        material={materials.lamp}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh047_2.geometry}
        material={materials.plywood01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh047_3.geometry}
        material={materials.plywood02}
      />
    </group>
    <group position={[95.5, 8.95, 123.3]} rotation={[-Math.PI, 0, -Math.PI]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041.geometry}
        material={materials.rust_met}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041_1.geometry}
        material={materials.lamp}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041_2.geometry}
        material={materials.plywood01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041_3.geometry}
        material={materials.plywood02}
      />
    </group>
    <group
      position={[-3.59, 4.64, 84.9]}
      rotation={[0, -1.57, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh055.geometry}
        material={materials.pipes_01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh055_1.geometry}
        material={materials.went_02}
      />
    </group>
    <group position={[14.08, 4.32, 92.99]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh002.geometry}
        material={materials.pipes_01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh002_1.geometry}
        material={materials.went_02}
      />
    </group>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.road.geometry}
      material={materials["pipes_05.001"]}
      position={[4.74, 3.5, 99.67]}
      scale={[80, 1, 20]}
    />
    <group position={[-45.94, 8.88, 113.19]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh070.geometry}
        material={materials["cap.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh070_1.geometry}
        material={materials["plank_wood.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh070_2.geometry}
        material={materials["rust_met.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh070_3.geometry}
        material={materials["pipes.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh070_4.geometry}
        material={materials["glass.003"]}
      />
    </group>
    <group
      position={[-3.33, 9.54, 86.38]}
      rotation={[0, -1.57, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh053.geometry}
        material={materials.pipes_03}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh053_1.geometry}
        material={materials.pipes_05}
      />
    </group>
    <group position={[-6, 5, 101.03]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh080.geometry}
        material={materials["tanker.002"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh080_1.geometry}
        material={materials["metal.002"]}
      />
    </group>
    <group position={[-26.09, 4.75, 101.03]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh084.geometry}
        material={materials["tanker.006"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh084_1.geometry}
        material={materials["metal.006"]}
      />
    </group>
    <group position={[-18, 4.75, 101.03]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh085.geometry}
        material={materials["tanker.007"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh085_1.geometry}
        material={materials["metal.007"]}
      />
    </group>
    <group
      position={[3.13, 4.62, 84.92]}
      rotation={[0, -1.57, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh051.geometry}
        material={materials.pipes_02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh051_1.geometry}
        material={materials.pipes_07}
      />
    </group>
    <group
      position={[36.64, 5.81, 95.75]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={[1, 1, -1]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh012.geometry}
        material={materials.pipes_01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh012_1.geometry}
        material={materials.went_01}
      />
    </group>
    <group
      position={[8.85, 5.81, 89.57]}
      rotation={[0, Math.PI / 2, 0]}
      scale={[1, 1, -1]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh021.geometry}
        material={materials.pipes_01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh021_1.geometry}
        material={materials.went_01}
      />
    </group>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Utqiagvik_2022_Terrain.geometry}
      material={materials["Utqiagvik-mat-HDR"]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.01}
    />
    <group
      position={[-1.01, 7.12, 88.59]}
      rotation={[0, -1.57, 0]}
      scale={1.19}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh040.geometry}
        material={materials.wall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh040_1.geometry}
        material={materials.roof}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh040_2.geometry}
        material={materials.door}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh040_3.geometry}
        material={materials.wire}
      />
    </group>
    </group>
  );
}

useGLTF.preload(utgiagvik);
