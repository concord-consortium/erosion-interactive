import React, { RefObject } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import {ISelectedPointInformation} from "./immersive";
import LandwardRuler from "./landward-ruler";
import SeawardRuler from "./seaward-ruler";

interface IRulersProps {
  direction: string,
  primaryRulerLocation: ISelectedPointInformation,
  secondaryRulerLocation: ISelectedPointInformation
}
export const Rulers = (props: IRulersProps) => {
  const {direction, primaryRulerLocation, secondaryRulerLocation} = props;

  return (
    <>
      { direction === "seaward" ?
        <>
          <SeawardRuler position={[primaryRulerLocation.x, primaryRulerLocation.y, primaryRulerLocation.z]}/>
          <LandwardRuler position={[secondaryRulerLocation.x, secondaryRulerLocation.y, secondaryRulerLocation.z]}/>
        </> :
        <>
          <LandwardRuler position={[primaryRulerLocation.x, primaryRulerLocation.y, primaryRulerLocation.z]}/>
          <SeawardRuler position={[secondaryRulerLocation.x, secondaryRulerLocation.y, secondaryRulerLocation.z]}/>
        </>
      }
    </>
  )
}