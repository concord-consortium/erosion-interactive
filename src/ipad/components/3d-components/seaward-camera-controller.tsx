import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ISelectedPointInformation } from "./immersive";

interface ICameraControllerProps {
  gridLocation: ISelectedPointInformation;
}

export const SeawardCameraController = (props: ICameraControllerProps) => {
  const { camera, gl } = useThree();
  const { gridLocation } = props;

  useEffect(
    () => {
      camera.lookAt(gridLocation.transectLocation, 0, 100);
      camera.updateProjectionMatrix();
    },
    [camera, gl, gridLocation]
  );

  return null;
}