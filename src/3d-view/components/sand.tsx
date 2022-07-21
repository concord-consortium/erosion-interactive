import React, { useEffect, useRef } from "react";
import { gridLength, gridWidth, terrainLength, terrainWidth, getPositionArray, getData } from "./helpers";
import { renderPlane } from "./planeHelper";
import { IProps } from "./grid-labels";
import sand from "../assets/sand.png";
import * as THREE from "three";

export const Sand = (props: IProps) => {
  const {data} = props;

  const beachTerrainRef = useRef<THREE.PlaneGeometry>(null);
  const rightSideRef = useRef<THREE.PlaneGeometry>(null);
  const leftSideRef = useRef<THREE.PlaneGeometry>(null);
  const backSideRef = useRef<THREE.PlaneGeometry>(null);

  useEffect(() => {
    setTerrainElevation();
    setSideElevation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const setSideElevation = () => {
    const sideRefs = [rightSideRef, leftSideRef, backSideRef];

    sideRefs.forEach((ref, idx) => {
      const posArray = getPositionArray(ref.current!);
      const sideData = idx === 0 ? getData(data, "x", -20) : idx === 1 ? getData(data, "x", 20) : getData(data, "y", -7);

      for (let i = 0; i < sideData.length; i++){
        posArray[i * 3 + 1] = sideData[i].z;
      }

      ref.current!.attributes.position.needsUpdate = true;
    })
  };

  const setTerrainElevation = () => {
    const terrainArray = getPositionArray(beachTerrainRef.current!);

    for (let i = 0; i < data.length; i++){
      terrainArray[i * 3 + 2] = data[i].z;
    }

    beachTerrainRef.current!.attributes.position.needsUpdate = true;
  };

  const textureLoader = new THREE.TextureLoader();
  const sandTexture = textureLoader.load(sand);

  return (
    <>
      {renderPlane([0, 0, 0], [-Math.PI / 2, 0, 0], [terrainWidth, terrainLength, gridWidth, gridLength], sandTexture, null, beachTerrainRef)}
      {renderPlane([-terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, null, rightSideRef!)}
      {renderPlane([terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, null, leftSideRef, THREE.BackSide)}
      {renderPlane([0, 0, terrainLength / 2], [0, 0, 0], [terrainWidth, 1, gridWidth], sandTexture, null, backSideRef)}
    </>
  )
}