import React, { Ref } from "react";
import * as THREE from "three";

export type VertexArray = [x: number, y: number, z: number];
export type GridDimensions = [
  width?: number | undefined,
  height?: number | undefined,
  widthSegments?: number | undefined,
  heightSegments?: number | undefined
];


export const renderPlane = (
  meshPositions: VertexArray,
  rotation: VertexArray,
  args: GridDimensions,
  texture: THREE.Texture,
  ref?: Ref<THREE.PlaneGeometry> | null,
  side?: THREE.Side) => {
  return (
    <mesh
    position={meshPositions}
    rotation={rotation}
    >
      <planeBufferGeometry
        ref={ref}
        attach={"geometry"}
        args={args}
      />
      <meshStandardMaterial
        side={side || THREE.FrontSide}
        map={texture}
        flatShading={true}
        roughness={1}
        emissive={0}
        // flatShading
      />
    </mesh>
  );
};
