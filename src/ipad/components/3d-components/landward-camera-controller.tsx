import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ISelectedPointInformation } from "./immersive";

interface ILandwardCameraController {
  rulerCameraLocation: ISelectedPointInformation;
}

export const LandwardCameraController = (props: ILandwardCameraController) => {
  const { camera, gl } = useThree();
  const { rulerCameraLocation } = props;

  useEffect(
    () => {
      camera.position.set(rulerCameraLocation.transectLocation, rulerCameraLocation.pointHeight, rulerCameraLocation.pointLocation);
      camera.updateProjectionMatrix();
    },
    [camera, gl, rulerCameraLocation]
  );

  return null;
}