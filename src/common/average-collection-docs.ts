import { ErosionData, IErosionDoc } from './types';
import { CellKeys } from './constants';

/***
 @Args:
  - docs: Firestore Documents of shape IErosionDoc
  - keys: labeled cell indexes to use, eg: ['A1', 'A2' ... 'C3'] &etc.
 ***/

  interface keyCounter {
    total: number;
    count: number;
  }

 export const averageDocs = (docs: IErosionDoc[], keys=CellKeys): ErosionData => {
   const results:ErosionData = {};
   const erosionStatus: Record<string, keyCounter> = {};

   // Ensure that each cell has a status counter.
   for(const key of keys) {
     erosionStatus[key]||= {count: 0, total: 0};
   }

   docs.forEach( (d) => {
     for(const key of keys) {
       if(d.data?.[key] !== null && d.data?.[key] !== undefined) {
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
