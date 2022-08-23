import React, { RefObject } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import {ISelectedPointInformation} from "./immersive";
import LandwardRuler from "./landward-ruler";
import SeawardRuler from "./seaward-ruler";

interface IRulersProps {
  direction: string;
  reference: RefObject<Mesh<BufferGeometry, Material | Material[]>>;
  seawardRulerLocation: ISelectedPointInformation;
  landwardRulerLocation: ISelectedPointInformation;
}

export const Rulers = (props: IRulersProps) => {
  const {reference, direction, seawardRulerLocation, landwardRulerLocation} = props;

  return (
    <>
      { direction === "seaward" ?
        <>
          <SeawardRuler
            position={[seawardRulerLocation.x, seawardRulerLocation.y, seawardRulerLocation.z]}
          />
          <LandwardRuler position={[landwardRulerLocation.x, landwardRulerLocation.y, landwardRulerLocation.z]}/>
        </> :
        <>
          <LandwardRuler
            reference={reference}
            position={[landwardRulerLocation.x, landwardRulerLocation.y, landwardRulerLocation.z]}
          />
          <SeawardRuler
            position={[seawardRulerLocation.x, seawardRulerLocation.y, seawardRulerLocation.z]}
          />
        </>
      }
    </>
  )
}