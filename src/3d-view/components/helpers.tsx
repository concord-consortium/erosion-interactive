import { ITerrainVert } from "../../common/types";

export const terrainWidth = 40;
export const gridWidth = 3;
export const gridLength = 6;
export const terrainLength = 14;
export const waterLength = 4;

export const getData =(data: Array<ITerrainVert>, coord: string, val: number) => {
  const transectData = [];

  for (let i = 0; i < data.length; i++){
    const coordinate = coord === "x" ? data[i].x : data[i].y;

    if (coordinate === val){
      transectData.push(data[i]);
    }
  }

  return transectData;
};

export const getPositionArray = (currentObject: THREE.BufferGeometry) => {
  return currentObject.attributes.position.array as number[];
};