export interface ITransectPoint {
  x: number,
  y: number,
  z: number
}

const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomZIndex = () => {
  return Math.floor(Math.random() *7);
};

const xValues = [-40, -20, 0, 20];
const yValues = [6, 4, 2, 0, -2, -4, -6];
const zValues = Array.from(Array(7), (el) => el = getRandomValue(.1, 2));

const createFakeData = () => {
  const aggregatedData: Array<ITransectPoint> = [];

  for (let i = 0; i < yValues.length; i++){
    for (let j = 0; j < xValues.length; j++){
      aggregatedData.push({
        x: xValues[j],
        y: yValues[i],
        z: zValues[getRandomZIndex()]
      });
    }
  }

  return aggregatedData;
};

export const fakeAggregatedData = createFakeData();
