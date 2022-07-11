import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Terrain } from "./terrain";
import { FirebaseApp } from "firebase/app";

import "./three-d-view.scss";
import { useLimitedCollection } from "../../common/hooks/use-limited-collection";
import { averageDocs } from "../../common/average-collection-docs";
import { IErosionDoc, ITerrainVert } from "../../common/types";
import { erosionDataToVerts } from "../data/cell-data-helpers";

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
  collectionPath: string;
  app: FirebaseApp;
}

export const ThreeDView = (params: ThreeDViewParams) => {

  const {app, collectionPath} = params;
  const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath);
  const [data, setData] = useState(erosionDataToVerts(averageDocs(docs), 4))

  useEffect(() => {
    const d = erosionDataToVerts(averageDocs(docs), 4);
    setData(d);
  },[docs]);

  const cameraPos: [number, number, number] = [-60, 20, 10];
  return (
    <div className="canvas-container">
      <Canvas camera={{ fov: 33, position: cameraPos, near: 0.1 }}>
        <CameraController/>
        <color attach="background" args={["white"]}/>
        <directionalLight color="white" position={[80, 40, 0]} intensity={1.75} />
        <ambientLight intensity={0.1}/>
        <Terrain data={data} />
      </Canvas>
    </div>
  );
};
