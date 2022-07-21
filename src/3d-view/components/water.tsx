import React, { Ref } from "react";
import { gridWidth, terrainWidth, waterLength } from "./helpers";
import { renderPlane } from "./planeHelper";
import water from "../assets/water.png";
import * as THREE from "three";

interface IWaterProps {
  refs: {
    waterRef: Ref<THREE.PlaneGeometry> | null,
    waterRightSideRef: Ref<THREE.PlaneGeometry> | null,
    waterLeftSideRef: Ref<THREE.PlaneGeometry> | null,
  }
}

export const Water = (props: IWaterProps) => {
  const {waterRef, waterRightSideRef, waterLeftSideRef} = props.refs;
  const waterTexture = new THREE.TextureLoader().load(water);

  return (
    <>
      {renderPlane([0, .5, -9], [-Math.PI / 2, 0, 0], [terrainWidth, waterLength, gridWidth], waterTexture, waterRef)};
      {renderPlane([-terrainWidth / 2, 0, -9], [0, -Math.PI / 2, 0], [waterLength, 1], waterTexture, waterRightSideRef)};
      {renderPlane([terrainWidth / 2, 0, -9], [0, -Math.PI / 2, 0], [waterLength, 1], waterTexture, waterLeftSideRef, THREE.BackSide)}
      {renderPlane([0, 0, -11], [0, 0, 0], [terrainWidth, 1], waterTexture, null, THREE.BackSide)}

    </>
  )
}