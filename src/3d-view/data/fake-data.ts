import { GridXValues, GridYValues } from "../../common/constants";

import { ITerrainVert } from "../../common/types";

const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomZIndex = () => {
  return Math.floor(Math.random() *7);
};

const gridZValues = Array.from(Array(7), (el) => el = getRandomValue(.1, 2));

const createFakeData = () => {
  const aggregatedData: Array<ITerrainVert> = [];

  for (let i = 0; i < GridYValues.length; i++){
    for (let j = 0; j < GridXValues.length; j++){
      aggregatedData.push({
        x: GridXValues[j],
        y: GridYValues[i],
        z: gridZValues[getRandomZIndex()]
      });
    }
  }

  return aggregatedData;
};

export const fakeAggregatedData = createFakeData();
