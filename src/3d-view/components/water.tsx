import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gridWidth, terrainWidth, waterLength, getPositionArray, getData } from "./helpers";
import { renderPlane } from "./planeHelper";
import { IProps } from "./grid-labels";
import water from "../assets/water.png";

export const Water = (props: IProps) => {
  const {data} = props;

  const waterRef = useRef<THREE.PlaneGeometry>(null);
  const waterRightSideRef = useRef<THREE.PlaneGeometry>(null);
  const waterLeftSideRef = useRef<THREE.PlaneGeometry>(null);

  useEffect(() => {
    setWaterElevation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const setWaterElevation = () => {
    const waterArray = getPositionArray(waterRef.current!);
    const waterRightSideArray = getPositionArray(waterRightSideRef.current!);
    const waterLeftSideArray = getPositionArray(waterLeftSideRef.current!);
    const waterRefs = [waterRef, waterRightSideRef, waterLeftSideRef];

    const waterData = getData(data, "y", 7);

    for (let i = 0; i < data.length; i++){
      waterArray[14 + (i * 3)] = data[i].z === 0 ? 0 : data[i].z;
    }

    waterRightSideArray[1] = 0;
    waterLeftSideArray[1] = 0;
    waterRightSideArray[4] = waterData[0].z;
    waterLeftSideArray[4] = waterData[3].z;

    waterRefs.forEach(ref => ref.current!.attributes.position.needsUpdate = true);
  };


  const waterTexture = new THREE.TextureLoader().load(water);

  return (
    <>
      {renderPlane([0, 0, -9], [-Math.PI / 2, 0, 0], [terrainWidth, waterLength, gridWidth], waterTexture, null, waterRef)};
      {renderPlane([-terrainWidth / 2, 0, -9], [0, -Math.PI / 2, 0], [waterLength, 1], waterTexture, null, waterRightSideRef)};
      {renderPlane([terrainWidth / 2, 0, -9], [0, -Math.PI / 2, 0], [waterLength, 1], waterTexture, null, waterLeftSideRef, THREE.BackSide)}
      {renderPlane([0, -.25, -11], [0, 0, 0], [terrainWidth, .5], waterTexture, null, null, THREE.BackSide)}

    </>
  )
}