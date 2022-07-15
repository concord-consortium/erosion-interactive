export const transectPointPositions = [6, 4, 2, 0, -2, -4, -6];

interface ITransectData {
  x: number,
  heights: Array<number>
}

interface IHawaiiData {
  [transect: string]: ITransectData
}

export const hawaiiData: IHawaiiData = {
  "A": {
    x: -11.94,
    heights: [2.5, 2.344, 2.144, 1.764, 1.454, 1.159, .919]
  }
}