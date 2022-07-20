import { hawaiiData, transectPointPositions } from "./hawaii-transect-data";

// need to take in "A1" -> "D7" & convert to corresponding x/y placement on the grid of 3d ipad immersive

export const getSelectedLocationData = (cellID: string) => {
  const pointIdx = cellToPointIndx(cellID);
  const transect: string = cellID[0];

  const x = hawaiiData[transect].x;
  const z = transectPointPositions[pointIdx];
  const y = hawaiiData[transect].heights[pointIdx]
  return {x, z, y}
}

// Convert from "0"–"7" to 0-36 for point index
export const cellToPointIndx = (cellID: string) => {
  return Number(cellID.slice(1)) - 1;
}

