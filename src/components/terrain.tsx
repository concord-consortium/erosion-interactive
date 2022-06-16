import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { renderPlane } from "./planeHelper";
import { terrainWidth, terrainLength, gridLength, gridWidth } from "./helpers";
import { ITransectPoint } from "../data/fake-data";
import sand from "../assets/sand.png";

interface TerrainProps {
  data: Array<ITransectPoint>
}

export const Terrain = (props: TerrainProps) => {
  const {data} = props;

  const beachTerrainRef = useRef<THREE.BufferGeometry>();
  const rightSideRef = useRef<THREE.BufferGeometry>();
  const leftSideRef = useRef<THREE.BufferGeometry>();
  const backSideRef = useRef<THREE.BufferGeometry>();

  const sandTexture = new THREE.TextureLoader().load(sand);

  useEffect(() => {
    setTerrainElevation();
    setSideElevation("right");
    setSideElevation("left");
    setSideElevation("back");
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

  const setSideElevation = (type: string) => {
    const side = getRef(type).current!;
    const sidePosArray = side.attributes.position.array as number[];

    const sideSpecificData = type === "right" ?  getData("x", -40) : type === "left" ? getData("x", 20) : getData("y", 6);

    for (let i = 0; i < sideSpecificData.length; i++){
      sidePosArray[i * 3 + 1] = sideSpecificData[i].z;
    }
  };

  const setTerrainElevation = () => {
    const terrain = beachTerrainRef.current!;
    const terrainArray = terrain.attributes.position.array as number[];

    for (let i = 0; i < data.length; i++){
      terrainArray[i * 3 + 2] = data[i].z;
    }
  };

  return (
    <>
      {renderPlane([0, 0, 0], [-Math.PI / 2, 0, 0], [terrainWidth, terrainLength, gridWidth, gridLength], sandTexture, beachTerrainRef)}
      {renderPlane([-terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, rightSideRef)}
      {renderPlane([terrainWidth / 2, 0, 0], [0, -Math.PI / 2, 0], [terrainLength, 1, gridLength], sandTexture, leftSideRef, THREE.BackSide)}
      {renderPlane([0, 0, -terrainLength / 2], [0, 0, 0], [terrainWidth, 1, gridWidth], sandTexture, backSideRef, THREE.BackSide)}
    </>
  );
};
