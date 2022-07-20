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
  },
  "B": {
    x: -8,
    heights: [2.561, 2.311, 2.021, 1.671, 1.371, 1.101, .866]
  },
  "C": {
    x: -4,
    heights: [2.233, 1.858, 1.573, 1.293, 1.043, 1, 1]
  },
  "D": {
    x: 0,
    heights: [2.473, 2.103, 1.818, 1.513, 1.248, 1, 1]
  }
}