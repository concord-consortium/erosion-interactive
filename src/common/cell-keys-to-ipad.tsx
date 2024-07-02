import { waipioData } from "./data/waipio-data";
import { utqiagvikData } from "./data/utqiagvik-data";

const transectPointPositions = [0, -4, -8, -12, -16, -20, -24];

export const getSelectedLocationData = (cellID: string, selectedBeach: string|undefined) => {
  const pointIdx = cellToPointIndx(cellID);
  const transect: string = cellID[0];

  const data = selectedBeach === "hawaii" ? waipioData : utqiagvikData;

  const x = data[transect].x;
  const z = transectPointPositions[pointIdx];
  const y = data[transect].heights[pointIdx];

  return {x, z, y}
}

// Convert from "0"–"7" to 0-36 for point index
export const cellToPointIndx = (cellID: string) => {
  return Number(cellID.slice(1)) - 1;
}

