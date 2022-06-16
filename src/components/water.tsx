import React from "react";
import * as THREE from "three";
import { renderPlane } from "./planeHelper";
import { terrainWidth } from "./helpers";
import water from "../assets/water.png";

export const Water = () => {
  const texture = new THREE.TextureLoader().load(water);
  const planeLength = 4;

  return (
    <>
      {renderPlane([0, .5, 9], [-Math.PI / 2, 0, 0], [terrainWidth, planeLength], texture)};
      {renderPlane([0, 0, 11], [0, 0, 0], [terrainWidth, 1], texture)}
      {renderPlane([-20, 0, 9], [0, -Math.PI / 2, 0], [planeLength, 1], texture)}
      {renderPlane([20, 0, 9], [0, -Math.PI / 2, 0], [planeLength, 1], texture, undefined, THREE.BackSide)}
    </>
  );
};
