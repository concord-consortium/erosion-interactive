import { waipioData } from "./data/waipio-data";
import { utqiagvikData } from "./data/utqiagvik-data";

const transectPointPositions = [0, -4, -8, -12, -16, -20, -24];

// need to take in "A1" -> "D7" & convert to corresponding x/y placement on the grid of 3d ipad immersive

export const getRandomX = (num: number) => {
  const min = num - .5;
  const max = num + .5;
  return Math.random() * (max - min) + min;
}

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

