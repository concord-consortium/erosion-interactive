import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Terrain } from "./terrain";
import { fakeAggregatedData } from "../data/fake-data";

import "./three-d-view.scss";
import { IRuntimeInitInteractive } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "../types";

interface IInteractiveState {}
interface IProps {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>
}

interface ILinkedState {
  answerType?: string
  answerText?: string
}

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

export const ThreeDView = (props: IProps) => {
  const data = fakeAggregatedData;
  const linkedState: ILinkedState = props.initMessage.linkedState!;
  const parsedAnswer = linkedState && linkedState.answerText ? JSON.parse(linkedState.answerText): null;

  const cameraPos: [number, number, number] = [-60, 20, 10];
  return (
    <div className="canvas-container">
      <Canvas camera={{ fov: 33, position: cameraPos, near: 0.1 }}>
        <CameraController/>
        <color attach="background" args={["white"]}/>
        <directionalLight color="white" position={[80, 40, 0]} intensity={.75} />
        <ambientLight intensity={0.15}/>
        <Terrain data={parsedAnswer ? parsedAnswer.positions : data} />
      </Canvas>
      <div className="linked">{JSON.stringify(props.initMessage.linkedState)}</div>
    </div>
  );
};
