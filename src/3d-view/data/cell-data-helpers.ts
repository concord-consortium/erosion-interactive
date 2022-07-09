import { CellKeys, GridVerts, GridXValues, GridYValues } from "../../common/constants";
import { ErosionData, ITerrainVert } from "../../common/types";


// Convert from "A1"–"D6" to 0-27 for vertex index
export const cellIdToIndex = (cellID: string) => {
  return CellKeys.indexOf(cellID);
}

// Convert from "A"–"D" to 0-3 for transect index
export const cellToTransectIndx = (cellID: string) => {
  // relies on B = A + 1 in charCode lookup table:
  return cellID.charCodeAt(0) - "A".charCodeAt(0);
}

// Convert from "0"–"7" to 0-36 for point index
export const cellToPointIndx = (cellID: string) => {
  const number = cellID.slice(1);
  return parseInt(number,10) -1;
}

// Convert from "A"–"D" to 6... -6
export const cellIdToGridX = (cellID: string) => {
  return GridXValues[cellToTransectIndx(cellID)];
}

// Convert from "A"–"D" to 6... -6
export const cellIdToGridY = (cellID: string) => {
  return GridYValues[cellToPointIndx(cellID)];
}

export const cellToTerrainVert =
  (cellID: string, height: number) => {
    const index = cellIdToIndex(cellID);
    const gridVert = GridVerts[index];
    return {... gridVert, z: height};
}

const hasValue = (thing:any) => {
  if (thing === undefined) return false;
  if (thing === null) return false;
  return true;
}

export const dataForCellID = (cellID: string, cells: ErosionData, defaultValue = 0) => {
  const value = hasValue(cells[cellID]) ? cells[cellID] : defaultValue;
  return cellToTerrainVert(cellID, value!);
}

export const erosionDataToVerts = (cells: ErosionData, defaultZ = 0): ITerrainVert[] => {
  return CellKeys.map( (cellID:string) => dataForCellID(cellID, cells, defaultZ));
}
