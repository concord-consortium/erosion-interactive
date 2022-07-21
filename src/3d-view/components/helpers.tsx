import { ITerrainVert } from "../../common/types";

export const terrainWidth = 40;
export const gridWidth = 3;
export const gridLength = 6;
export const terrainLength = 14;
export const waterLength = 4;

export const getData = (data: Array<ITerrainVert>, coord: string, val: number) => {
  return data.filter((d) => coord === "x" ? d.x === val : d.y === val);
};

export const getPositionArray = (currentObject: THREE.BufferGeometry) => {
  return currentObject.attributes.position.array as number[];
};