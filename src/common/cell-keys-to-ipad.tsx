import { IpadGridXValues, IpadGridYValues } from "./constants";
import { hawaiiData, transectPointPositions } from "./hawaii-transect-data";

// need to take in "A1" -> "D7" & convert to corresponding x/y placement on the grid of 3d ipad immersive

export const getSelectedLocationData = (cellID: string) => {
  const pointIdx = cellToPointIndx(cellID);
  const transect: string = cellID[0];

  const transectLocation = hawaiiData[transect].x;
  const pointLocation = transectPointPositions[pointIdx];
  const pointHeight = hawaiiData[transect].heights[pointIdx]
  return {transectLocation, pointLocation, pointHeight}
  // return {x: cellIdToGridX(cellID), y: cellIdToGridY(cellID)};
}

// export const translateCellKeyToGridPosition = (cellID: string) => {
//   return {x: cellIdToGridX(cellID), y: cellIdToGridY(cellID)};
// }
// Convert from "A"–"D" to 0-3 for transect index
export const cellToTransectIndx = (cellID: string) => {
  // relies on B = A + 1 in charCode lookup table:
  return cellID.charCodeAt(0) - "A".charCodeAt(0);
}

// Convert from "0"–"7" to 0-36 for point index
export const cellToPointIndx = (cellID: string) => {
  return Number(cellID.slice(1)) - 1;
}

// Convert from "A"–"D" to 15... -15
export const cellIdToGridX = (cellID: string) => {
  return IpadGridXValues[cellToTransectIndx(cellID)];
}

// Convert from "0"–"7" to 10... -10
export const cellIdToGridY = (cellID: string) => {
  return IpadGridYValues[cellToPointIndx(cellID)];
}

//

