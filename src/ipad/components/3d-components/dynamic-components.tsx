
import React, { MutableRefObject, RefObject, Suspense, useEffect, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { CameraController } from "./camera-controller";
import { Rulers } from "./rulers";
import { ISelectedPointInformation } from "./immersive";
import { deleteField, doc, Firestore, updateDoc } from "firebase/firestore";
import { IErosionDoc } from "../../../common/types";
import { getRandomX, getSelectedLocationData } from "../../../common/cell-keys-to-ipad";
import * as THREE from "three";
import { BufferGeometry, Material, Mesh } from "three";

const defaultState: ISelectedPointInformation = {
  x: 0,
  z: 0,
  y: 0
}

interface IProps {
  docs: Array<IErosionDoc>;
  documentPath: string;
  fireStore: Firestore;
  selectedBeach?: string;
  direction: string;
  partnerLocation: string;
  currentLocation: ISelectedPointInformation;
  rulerRef: RefObject<Mesh<BufferGeometry, Material | Material[]>>;
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | undefined>;
  defaultCameraZ: number;
  seawardRulerLocation: ISelectedPointInformation;
  landwardRulerLocation: ISelectedPointInformation;
  updateRulerLocation: (xyz: ISelectedPointInformation, ruler: string) => void;

}

export const DynamicComponents = (props: IProps) => {
  const {fireStore, documentPath, docs, partnerLocation, selectedBeach, direction, rulerRef, cameraRef, currentLocation, defaultCameraZ, seawardRulerLocation, landwardRulerLocation, updateRulerLocation} = props;
  const facingLand = direction === "landward";

  // delete location XYZ on first mounting + on unmount
  useEffect(() => {
    updateDoc(doc(fireStore, documentPath), {locationXYZ: deleteField()})
    return () => {
      updateDoc(doc(fireStore, documentPath), {locationXYZ: deleteField()})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (facingLand){
      const x = getRandomX(currentLocation.x);
      const {y, z} = currentLocation;
      updateRulerLocation({x, y, z}, "landward");
    } else {
      updateRulerLocation(currentLocation, "seaward");
    }
  }, [currentLocation, direction])

  // setting partner location
  useEffect(() => {
    const dir = direction === "landward" ? "seaward" : "landward";
    const partnerDoc = docs.filter((d) => d.location === partnerLocation)[0];
    if (partnerDoc && 'locationXYZ' in partnerDoc && partnerDoc.locationXYZ){
      updateRulerLocation(partnerDoc.locationXYZ, dir);
    } else {
      updateRulerLocation(getSelectedLocationData(partnerLocation, selectedBeach), dir);
    }
  }, [partnerLocation, docs, selectedBeach]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        fov={50}
        position={[currentLocation.x, currentLocation.y + .5, defaultCameraZ]}
        near={.01}
        far={1000}
        makeDefault
      />
      <CameraController
        gridLocation={currentLocation}
        direction={direction}
      />
      <Rulers
        direction={direction}
        seawardRulerLocation={seawardRulerLocation}
        landwardRulerLocation={landwardRulerLocation}
        reference={rulerRef}
      />
    </>
  )
}