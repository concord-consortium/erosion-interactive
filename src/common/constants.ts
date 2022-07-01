
/*** Transect Indexes  ********************************************************/
export const Transects = ["A", "B", "C", "D"];
export const Points = [1, 2, 3, 4, 5, 6, 7];
export const CellKeys: string[] = [];

for(const letter of Transects) {
  for(const number of Points) {
    const key = `${letter}${number}`;
    CellKeys.push(key);
  }
}

/*** Transect Indexes  ********************************************************/


