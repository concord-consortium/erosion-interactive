import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ITerrainVert } from "../../common/types";
import { Sand } from "./sand";
import { Water } from "./water";
import { GridLabels } from "./grid-labels";

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

  useEffect(() => {
    setTerrainElevation();
    setSideElevation();
    setWaterElevation();
  }, [data]);

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

  const setSideElevation = () => {
    const sideRefs = [rightSideRef, leftSideRef, backSideRef];

    sideRefs.forEach((ref, idx) => {
      const posArray = getPositionArray(ref.current!);
      const sideData = idx === 0 ? getData("x", -40) : idx === 1 ? getData("x", 20) : getData("y", -6);

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

  const setWaterElevation = () => {
    const waterArray = getPositionArray(waterRef.current!);
    const waterRightSideArray = getPositionArray(waterRightSideRef.current!);
    const waterLeftSideArray = getPositionArray(waterLeftSideRef.current!);
    const waterRefs = [waterRef, waterRightSideRef, waterLeftSideRef];

    const waterData = getData("y", 6);

    for (let i = 0; i < data.length; i++){
      waterArray[14 + (i * 3)] = data[i].z -.5;
    }

    waterRightSideArray[4] = waterData[0].z;
    waterLeftSideArray[4] = waterData[3].z;

    waterRefs.forEach(ref => ref.current!.attributes.position.needsUpdate = true);
  };

  return (
    <>
      <Sand
        refs={{beachTerrainRef, rightSideRef, leftSideRef, backSideRef}}
      />
      <Water
        refs={{waterRef, waterRightSideRef, waterLeftSideRef}}
      />

      <GridLabels
        data={data}
        getData={getData}
        getPositionArray={getPositionArray}
      />
    </>
  );
};
