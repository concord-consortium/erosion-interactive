import { GridXValues, GridYValues } from "../../common/constants";
import {
  cellIdToIndex,
  cellToTransectIndx,
  cellToPointIndx,
  cellToTerrainVert
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
    .toEqual({x:-40, y:6, z:10});

  // Generally:
  const cellValue = 10;
  expect(cellToTerrainVert("A1", cellValue))
    .toEqual({x:GridXValues[0], y:GridYValues[0], z:cellValue});

  expect(cellToTerrainVert("A2", 10))
    .toEqual({x:-40, y:4, z:10});

  expect(cellToTerrainVert("A3", 10))
    .toEqual({x:-40, y:2, z:10});

  expect(cellToTerrainVert("A4", 10))
    .toEqual({x:-40, y:0, z:10});
})