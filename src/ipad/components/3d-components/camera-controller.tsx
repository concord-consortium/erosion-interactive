import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ISelectedPointInformation } from "./immersive";

interface ICameraControllerProps {
  gridLocation: ISelectedPointInformation;
  direction: string;
}

export const CameraController = (props: ICameraControllerProps) => {
  const { camera, gl } = useThree();
  const { gridLocation, direction } = props;
  let y: number;

  if (direction === "seaward") {
    y = -100;
  } else {
    y = 100;
  }

  useEffect(
    () => {
      camera.lookAt(gridLocation.x, 0, y);
      camera.updateProjectionMatrix();
    },
    [camera, gl, gridLocation, direction, y]
  );

  return null;
}