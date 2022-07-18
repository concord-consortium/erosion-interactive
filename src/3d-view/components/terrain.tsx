import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { renderPlane } from "./planeHelper";
import { terrainWidth, terrainLength, gridLength, gridWidth, waterLength } from "./helpers";
import { ITerrainVert } from "../../common/types";
import sand from "../assets/sand.png";
import water from "../assets/water.png";
import { useFrame } from "@react-three/fiber";

interface TerrainProps {
  data: Array<ITerrainVert>
}

export const Terrain = (props: TerrainProps) => {
  const {data} = props;

  const beachTerrainRef = useRef<THREE.PlaneGeometry>(null);
  const rightSideRef = useRef<THREE.PlaneGeometry>(null);
  const leftSideRef = useRef<THREE.PlaneGeometry>(null);
  const backSideRef = useRef<THREE.PlaneGeometry>(null);

  const waterRef = useRef<THREE.PlaneGeometry>(null);
  const waterRightSideRef = useRef<THREE.PlaneGeometry>(null);
  const waterLeftSideRef = useRef<THREE.PlaneGeometry>(null);

  const sandTexture = new THREE.TextureLoader().load(sand);
  const waterTexture = new THREE.TextureLoader().load(water);

  useFrame(() => {
    setTerrainElevation();
    setSideElevation("right");
    setSideElevation("left");
    setSideElevation("back");
    setWaterElevation();
  });


  const getRef = (type: string) => {
    if (type === "right") {
      return rightSideRef;
    } else if (type === "left") {
      return leftSideRef;
    } else {
      return backSideRef;
    }
  };

  const getData =(coord: string, val: number) => {
    const transectData = [];

    for (let i = 0; i < data.length; i++){
      const coordinate = coord === "x" ? data[i].x : data[i].y;

      if (coordinate === val){
        transectData.push(data[i]);
      }
    }

    return transectData;
  };

  const getPositionArray = (currentObject: THREE.BufferGeometry) => {
    return currentObject.attributes.position.array as number[];
  };

  const setSideElevation = (type: string) => {
    const side = getRef(type).current!;
    const sidePosArray = getPositionArray(side);

    const sideSpecificData = type === "right" ?  getData("x", -40) : type === "left" ? getData("x", 20) : getData("y", -6);

    for (let i = 0; i < sideSpecificData.length; i++){
      sidePosArray[i * 3 + 1] = sideSpecificData[i].z;
    }

    side.attributes.position.needsUpdate = true;
  };

  const setTerrainElevation = () => {
    const terrainArray = getPositionArray(beachTerrainRef.current!);

    for (let i = 0; i < data.length; i++){
      terrainArray[i * 3 + 2] = data[i].z;
    }

    beachTerrainRef.current!.attributes.position.needsUpdate = true;
  };

  const setWaterElevation = () => {
    const waterArray = getPositionArray(waterRef.current!);
    const waterData = getData("y", 6);

    waterArray[14] = waterData[0].z - .5;
    waterArray[17] = waterData[1].z - .5;
    waterArray[20] = waterData[2].z - .5;
    waterArray[23] = waterData[3].z - .5;

    const waterRightSideArray = getPositionArray(waterRightSideRef.current!);
    waterRightSideArray[4] = waterData[0].z;

    const waterLeftSideArray = getPositionArray(waterLeftSideRef.current!);
    waterLeftSideArray[4] = waterData[3].z;

    waterRef.current!.attributes.position.needsUpdate = true;
    waterRightSideRef.current!.attributes.position.needsUpdate = true;
    waterLeftSideRef.current!.attributes.position.needsUpdate = true;

  };

  return (
    <>
      {renderPlane([0, 0, 0], [-Math.PI / 2, 0, 0], [terrainWidth, terrainLength, gridWidth, gridLength], sandTexture, beachTerrainRef)}
      {renderPlane([-terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, rightSideRef!)}
      {renderPlane([terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, leftSideRef, THREE.BackSide)}
      {renderPlane([0, 0, terrainLength / 2], [0, 0, 0], [terrainWidth, 1, gridWidth], sandTexture, backSideRef)}

      {renderPlane([0, .5, -9], [-Math.PI / 2, 0, 0], [terrainWidth, waterLength, gridWidth], waterTexture, waterRef)};
      {renderPlane([-terrainWidth / 2, 0, -9], [0, -Math.PI / 2, 0], [waterLength, 1], waterTexture, waterRightSideRef)};
      {renderPlane([terrainWidth / 2, 0, -9], [0, -Math.PI / 2, 0], [waterLength, 1], waterTexture, waterLeftSideRef, THREE.BackSide)}
      {renderPlane([0, 0, -11], [0, 0, 0], [terrainWidth, 1], waterTexture, null, THREE.BackSide)}
    </>
  );
};
