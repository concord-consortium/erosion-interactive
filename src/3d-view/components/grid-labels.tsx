import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import lato from "../assets/lato.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GridXValues } from "../../common/constants";
import { ITerrainVert } from "../../common/types";
import { gridLength, terrainLength } from "./helpers";
import { renderPlane } from "./planeHelper";
import green from "../assets/green.png";


interface IProps {
  data: Array<ITerrainVert>;
  getPositionArray: (refObj: THREE.BufferGeometry) => Array<number>;
  getData: (coord: string, gridVal: number) => Array<ITerrainVert>;
}

export const GridLabels = (props: IProps) => {
  const {data, getPositionArray, getData} = props;

  const transectARef = useRef<THREE.PlaneGeometry>(null);
  const transectBRef = useRef<THREE.PlaneGeometry>(null);
  const transectCRef = useRef<THREE.PlaneGeometry>(null);
  const transectDRef = useRef<THREE.PlaneGeometry>(null);

  const greenTexture = new THREE.TextureLoader().load(green);

  const font = new FontLoader().parse(lato);
  const textOptions = {font, size: 1.5, height: .25}
  const textA = new TextGeometry("A", textOptions);
  const textB = new TextGeometry("B", textOptions);
  const textC = new TextGeometry("C", textOptions);
  const textD = new TextGeometry("D", textOptions);

  useEffect(() => {
    setTransectLabels();
  }, [data]);

  const setTransectLabels = () => {
    const transectRefs = [transectARef, transectBRef];

    transectRefs.forEach((ref, idx) => {
      const posArray = getPositionArray(ref.current!);
      const transectData = getData("x", GridXValues[idx]);

      for (let i = 0; i < transectData.length; i++){
        posArray[i * 6 + 2] = transectData[i].z;
        posArray[i * 6 + 5] = transectData[i].z;
      }

      ref.current!.attributes.position.needsUpdate = true;

    })
  }

  return (
    <>
      {renderPlane([-20, .1, 0], [-Math.PI / 2, 0, 0], [.25, terrainLength, 1, gridLength], greenTexture, transectARef)}
      {renderPlane([-6.66, .1, 0], [-Math.PI / 2, 0, 0], [.25, terrainLength, 1, gridLength], greenTexture, transectBRef)}
      {renderPlane([6.66, 4.1, 0], [-Math.PI / 2, 0, 0], [.25, terrainLength, 1, gridLength], greenTexture, transectCRef)}
      {renderPlane([20, 4.1, 0], [-Math.PI / 2, 0, 0], [.25, terrainLength, 1, gridLength], greenTexture, transectDRef)}

      <mesh position={[-20, 5, -9]} geometry={textA}>
        <meshStandardMaterial color={"#0481a0"}/>
      </mesh>

      <mesh position={[-6.66, 5, -9]} geometry={textB}>
        <meshStandardMaterial color={"#0481a0"}/>
      </mesh>

      <mesh position={[6.66, 5, -9]} geometry={textC}>
        <meshStandardMaterial color={"#0481a0"}/>
      </mesh>

      <mesh position={[20, 5, -9]} geometry={textD}>
        <meshStandardMaterial color={"#0481a0"}/>
      </mesh>
    </>
  )
}