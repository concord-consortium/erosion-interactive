import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Terrain } from "./terrain";
import { fakeAggregatedData } from "../data/fake-data";

import "./three-d-view.scss";

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

export const ThreeDView = () => {
  const data = fakeAggregatedData;
  const cameraPos: [number, number, number] = [-60, 20, 10];
  return (
    <div className="canvas-container">
      <Canvas camera={{ fov: 33, position: cameraPos, near: 0.1 }}>
        <CameraController/>
        <color attach="background" args={["white"]}/>
        <directionalLight color="white" position={[80, 40, 0]} intensity={.75} />
        <ambientLight intensity={0.15}/>
        <Terrain data={data} />
      </Canvas>
    </div>
  );
};