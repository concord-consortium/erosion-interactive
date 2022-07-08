import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Terrain } from "./terrain";
import { fakeAggregatedData } from "../data/fake-data";
import { FirebaseApp } from "firebase/app";
import { averageDocs } from "../../common/average-collection-docs";
import { useLimitedCollection } from "../../common/hooks/use-limited-collection";
import { ErosionData, IErosionDoc } from "../../common/types";

import "./three-d-view.scss";
import { collection } from "firebase/firestore";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 100;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

interface ThreeDViewParams {
  app: FirebaseApp;
  collectionPath: string;
}

export const ThreeDView = (params: ThreeDViewParams) => {
  const fakeData = fakeAggregatedData;
  const {app, collectionPath} = params;

  // NP: Todo, switch fakeAggregateData with read document data:
  const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath);
  const data: ErosionData = docs
    ? averageDocs(docs)
    : {};

  const sortedData = (d: any) => {
    const array = [];
    const sortedArrayOfKeys = Object.keys(d).sort((key, nextKey) => Number(key[1]) - Number(nextKey[1]));

    for (let i = 0; i < sortedArrayOfKeys.length; i++){
      const newObj: Record<string, number> = {};
      newObj[sortedArrayOfKeys[i]] = d[sortedArrayOfKeys[i]];
      array.push(newObj)
    }

    return array;
  }

  console.log(sortedData(data));

  const cameraPos: [number, number, number] = [-60, 20, 10];
  return (
    <div className="canvas-container">
      <Canvas camera={{ fov: 33, position: cameraPos, near: 0.1 }}>
        <CameraController/>
        <color attach="background" args={["white"]}/>
        <directionalLight color="white" position={[80, 40, 0]} intensity={.75} />
        <ambientLight intensity={0.15}/>
        <Terrain data={fakeData} />
      </Canvas>
    </div>
  );
};
