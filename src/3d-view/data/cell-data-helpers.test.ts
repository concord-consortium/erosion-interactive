import { GridXValues, GridYValues } from "../../common/constants";
import {
  cellIdToIndex,
  cellToTransectIndx,
  cellToPointIndx,
  cellToTerrainVert,
  erosionDataToVerts
} from "./cell-data-helpers";

test('cellIdToIndex returns a numerical index', () => {
  expect(cellIdToIndex("A1")).toEqual(0);
  expect(cellIdToIndex("A2")).toEqual(1);

  expect(cellIdToIndex("B1")).toEqual(7);
  expect(cellIdToIndex("B2")).toEqual(8);

  expect(cellIdToIndex("C1")).toEqual(14);
  expect(cellIdToIndex("D7")).toEqual(27);

  // Failing -- bad IDs:
  expect(cellIdToIndex("A8")).toEqual(-1);
  expect(cellIdToIndex("E1")).toEqual(-1);
  expect(cellIdToIndex("")).toEqual(-1);
  expect(cellIdToIndex("QQ")).toEqual(-1);
});

test('transectIndex returns 0-3 for A-D', () => {
  expect(cellToTransectIndx("A1")).toEqual(0);
  expect(cellToTransectIndx("A6")).toEqual(0);
  expect(cellToTransectIndx("B1")).toEqual(1);
  expect(cellToTransectIndx("D1")).toEqual(3);
})

test('transectIndex returns 0-6 for 1-7', () => {
  expect(cellToPointIndx("A1")).toEqual(0);
  expect(cellToPointIndx("A2")).toEqual(1);
  expect(cellToPointIndx("A7")).toEqual(6);
  expect(cellToPointIndx("D1")).toEqual(0);
  expect(cellToPointIndx("D2")).toEqual(1);
})

test('cellToTerrainVert returns vertex for mesh', ()=> {
  // To verify these values look at `constants.ts`
  expect(cellToTerrainVert("A1", 10))
    .toEqual({x:-20, y:-7, z:10});

  // Generally:
  const cellValue = 10;
  expect(cellToTerrainVert("A1", cellValue))
    .toEqual({x:GridXValues[0], y:GridYValues[0], z:cellValue});

  expect(cellToTerrainVert("A2", 10))
    .toEqual({x:-20, y:-4.66, z:10});

  expect(cellToTerrainVert("A3", 10))
    .toEqual({x:-20, y:-2.33, z:10});

  expect(cellToTerrainVert("A4", 10))
    .toEqual({x:-20, y:0, z:10});
});

test(`erosionDataToVerts, returns geometry verts for cell records`, () => {
  const cells = {"A1": 0, "A2": 1, "A3": 2};
  const defaultZValue = 101;
  const verts = erosionDataToVerts(cells, defaultZValue);

  // Z is set by the student cell values
  // from our cells collection above
  expect(verts[24].z).toEqual(0);
  expect(verts[20].z).toEqual(1);
  expect(verts[16].z).toEqual(2);

  // X is set by looking up values from GridXValues
  expect(verts[0].x).toEqual(-20);
  expect(verts[1].x).toEqual(-6.66);
  expect(verts[2].x).toEqual(6.66);

  // Y is set by looking up values from GridYValues
  expect(verts[0].y).toEqual(7);

  // These values exist for cells that have no data too
  // by combining GridXValues, GridYValues, and default Z
  // Our input only defines 3 cells, so these are generated:
  expect(verts[3].x).toEqual(20);
  expect(verts[3].y).toEqual(7);
  expect(verts[3].z).toEqual(defaultZValue);
})