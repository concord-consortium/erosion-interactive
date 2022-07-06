import { IErosionDoc } from "../../common/types";
import { averageDocs } from "./use-limited-collection";

const docA: IErosionDoc ={
  transept: "A",
  externalId: "1",
  data: {
    "A1": 1,
    "A2": 1.2,
    "A3": 1.8,
    "A4": 2,
    "A5": 2,
    "A6": 2,
    "A7": 4,
  }
};

const docB: IErosionDoc ={
  transept: "A",
  externalId: "2",
  data: {
    "A1": 2,
    "A2": 2.2,
    "A3": 2.8,
    "A4": 3,
    "A5": 3,
    "A6": 3,
    "A7": 3,
  }
};

const docC: IErosionDoc ={
  transept: "B",
  externalId: "3",
  data: {
    "B1": 1,
    "B2": 1.2,
    "B3": 1.8,
    "B4": 1,
    "B5": 1,
    "B6": 1,
    "B7": 1,
  }
};

const docs = [docA, docB, docC];

test('averageDocs returns average data cells', () => {
  const avg=averageDocs(docs);
  const expectedB1 = expect.objectContaining(
    {"B1": 1}
  );
  const expectedA1 = expect.objectContaining(
    {"A1": 1.5}
  );
  expect(avg).toEqual(expectedB1);
  expect(avg).toEqual(expectedA1);
});
