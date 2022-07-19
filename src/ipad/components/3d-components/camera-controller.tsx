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
  let z: number;

  if (direction === "seaward") {
    z = -100;
  } else {
    z = 100;
  }

  useEffect(
    () => {
      camera.lookAt(gridLocation.x, 0, z);
      camera.updateProjectionMatrix();
    },
    [camera, gl, gridLocation, direction, z]
  );

  return null;
}