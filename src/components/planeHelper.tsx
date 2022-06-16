import React from "react";
import * as THREE from "three";

type vectorArray = [x: number, y: number, z: number];
type geoArgs = [
  width?: number | undefined,
  height?: number | undefined,
  widthSegments?: number | undefined,
  heightSegments?: number | undefined
];


export const renderPlane = (
  meshPositions: vectorArray,
  rotation: vectorArray,
  args: geoArgs,
  texture: THREE.Texture,
  ref?: React.MutableRefObject<THREE.BufferGeometry | undefined>,
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
      />
    </mesh>
  );
};
