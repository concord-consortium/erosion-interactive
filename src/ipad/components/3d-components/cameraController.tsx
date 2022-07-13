import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

interface ICameraControllerProps {
  gridLocation: {x: number, y: number}
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
      camera.lookAt(gridLocation.x, 1, y)
    },
    [camera, gl, gridLocation, y]
  );

  return null;
}