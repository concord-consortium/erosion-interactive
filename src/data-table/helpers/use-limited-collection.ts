import { getFirestore, collection } from 'firebase/firestore';
import { FirebaseApp  } from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import { ErosionData, IErosionDoc } from '../../common/types';
import { CellKeys } from '../../common/constants';

export const useLimitedCollection = <DocShape>(app:FirebaseApp, path: string, skipIds?:string[]):[DocShape[],boolean,any] => {
  const fireStore = getFirestore(app);
  const excludeIds: string[] = skipIds || [];
  const [value, loading, error] = useCollection(collection(fireStore, path));
  const filteredValues = value?.docs
    .filter((d) => excludeIds.indexOf(d.id) === -1)
    .map((d) => {
      const data = d.data() as DocShape;
      return ({...data, id: d.id} as DocShape);
    });
  return [filteredValues||[], loading, error];
}

interface keyCounter {
  total: number|null;
  count: number
}

/***
@Args:
 - docs: Firestore Documents of shape IErosionDoc
 - keys: labeled cell indexes to use, eg: ['A1', 'A2' ... 'C3'] &etc.
***/
export const averageDocs = (docs: IErosionDoc[], keys=CellKeys): ErosionData => {
  const results:ErosionData = {};
  const erosionStatus: Record<string, keyCounter> = {};

  // Ensure that each cell has a status counter.
  for(const key of keys) {
    erosionStatus[key]||= {count: 0, total: 0};
  }

  docs.forEach( (d) => {
    for(const key of keys) {
      if(d.data[key] !== null && d.data[key] !== undefined) {
        const status = erosionStatus[key];
        status.count+= 1;
        status.total = status.total! + d.data[key]!;
      }
    }
  });
  for(const key of keys) {
    const status = erosionStatus[key];
    // Don't include cells for which we have no data:
    if(status.count > 0) {
      results[key] = status.total! / status.count;
    }
  }
  return results;
}
