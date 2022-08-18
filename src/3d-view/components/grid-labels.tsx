import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { Transects, Points, GridXValues, GridYValues } from "../../common/constants";
import { ITerrainVert } from "../../common/types";
import { gridLength, terrainLength, getPositionArray, getData } from "./helpers";
import { renderPlane } from "./planeHelper";
import lato from "../assets/lato.json";

export interface IProps {
  data: Array<ITerrainVert>;
}

export const GridLabels = (props: IProps) => {
  const {data} = props;

  const transectARef = useRef<THREE.PlaneGeometry>(null);
  const transectBRef = useRef<THREE.PlaneGeometry>(null);
  const transectCRef = useRef<THREE.PlaneGeometry>(null);
  const transectDRef = useRef<THREE.PlaneGeometry>(null);
  const transectRefs = [transectARef, transectBRef, transectCRef, transectDRef];

  const font = new FontLoader().parse(lato);

  const textOptions = {font, size: 1.5, height: 0}
  const smallTextOptions = {font, size: .5, height: 0}

  const tranctLabelGeometries = Transects.map((t) => new TextGeometry(t, textOptions));
  const pointLabelGeometries = Points.reverse().map((p) => new TextGeometry(String(p), smallTextOptions));

  useEffect(() => {
    setTransectLabels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const setTransectLabels = () => {
    transectRefs.forEach((ref, idx) => {
      const posArray = getPositionArray(ref.current!);
      const transectData = getData(data, "x", GridXValues[idx]);

      for (let i = 0; i < transectData.length; i++){
        posArray[i * 6 + 2] = transectData[i].z;
        posArray[i * 6 + 5] = transectData[i].z;
      }

      ref.current!.attributes.position.needsUpdate = true;
    })
  };

  return (
    <>
      {Transects.map((t, idx) => {
        let xValue = GridXValues[idx];

        if (idx === 0){
          xValue += .25;
        } else if (idx === 3){
          xValue -= .25;
        }
        return (
          <>
            {renderPlane([xValue, .1, 0], [-Math.PI / 2, 0, 0], [.5, terrainLength - .15, 1, gridLength], null, "#eeeeee", transectRefs[idx])}
          </>
        )
      })}

      {tranctLabelGeometries.map((geo, idx) => {
        return (
          <mesh key={idx} position={[GridXValues[idx] +.25, 5, -11]} geometry={geo}>
            <meshStandardMaterial color={"#93d5e4"}/>
          </mesh>
        )
      })}

      {pointLabelGeometries.map((geo, idx) => {
        return (
          <mesh key={idx} rotation={[0, Math.PI / 2, 0]} position={[-21.5, 4, GridYValues[idx]]} geometry={geo}>
            <meshStandardMaterial color={"#016082"}/>
          </mesh>
        )
      })}
    </>
  )
}