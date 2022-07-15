import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ISelectedPointInformation } from "./immersive";
import THREE, { Vector3 } from "three";

interface ICameraControllerProps {
  gridLocation: ISelectedPointInformation;
  direction: string;
}

export const CameraController = (props: ICameraControllerProps) => {
  const { camera, gl } = useThree();
  const { gridLocation, direction } = props;
  let y: number;

  if (direction === "shoreline") {
    y = 100;
  } else {
    y = -100;
  }

  useEffect(
    () => {
      camera.lookAt(gridLocation.transectLocation, 0, y);
      camera.updateProjectionMatrix();
    },
    [camera, gl, gridLocation, y]
  );

  return null;
}