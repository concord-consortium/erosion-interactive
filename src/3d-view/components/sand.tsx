import React, { Ref } from "react";
import { gridLength, gridWidth, terrainLength, terrainWidth } from "./helpers";
import { renderPlane } from "./planeHelper";
import sand from "../assets/sand.png";
import * as THREE from "three";

interface ISandProps {
  refs: {
    beachTerrainRef: Ref<THREE.PlaneGeometry> | null,
    rightSideRef: Ref<THREE.PlaneGeometry> | null,
    leftSideRef: Ref<THREE.PlaneGeometry> | null,
    backSideRef: Ref<THREE.PlaneGeometry> | null
  }
}

export const Sand = (props: ISandProps) => {
  const {beachTerrainRef, rightSideRef, leftSideRef, backSideRef} = props.refs;
  const textureLoader = new THREE.TextureLoader();
  const sandTexture = textureLoader.load(sand);

  return (
    <>
      {renderPlane([0, 0, 0], [-Math.PI / 2, 0, 0], [terrainWidth, terrainLength, gridWidth, gridLength], sandTexture, beachTerrainRef)}
      {renderPlane([-terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, rightSideRef!)}
      {renderPlane([terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, leftSideRef, THREE.BackSide)}
      {renderPlane([0, 0, terrainLength / 2], [0, 0, 0], [terrainWidth, 1, gridWidth], sandTexture, backSideRef)}
    </>
  )
}