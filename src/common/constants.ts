import { ITerrainVert } from "./types";

/*** Transect Indexes *******************************/
export const Transects = ["A", "B", "C", "D"];
export const Points = [1, 2, 3, 4, 5, 6, 7];
export const CellKeys: string[] = [];

for(const letter of Transects) {
  for(const number of Points) {
    const key = `${letter}${number}`;
    CellKeys.push(key);
  }
}


/*** Terrain Grid Vertices *************************/

export const GridXValues = [-40, -20, 0, 20];
export const GridYValues = [6, 4, 2, 0, -2, -4, -6];
export const GridVerts: ITerrainVert[] = [];

for(const x of GridXValues) {
  for(const y of GridYValues) {
    GridVerts.push({x, y, z:0});
  }
}
