import { useMemo } from 'react';
import { getFirestore, collection } from 'firebase/firestore';
import { FirebaseApp  } from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";


export const useLimitedCollection = <DocShape>(app:FirebaseApp, path: string, skipIds?:string[]):[DocShape[],boolean,any] => {
  const fireStore = getFirestore(app);
  const [value, loading, error] = useCollection(collection(fireStore, path));
  const filteredValues = useMemo(() => {
    const values = value?.docs
      .filter((d) => skipIds ? skipIds.indexOf(d.id) === -1 : true)
      .map((d) => {
        const data = d.data() as DocShape;
        return ({...data, id: d.id} as DocShape);
      });
    return values || [];
  },[value, skipIds]);
  return [filteredValues, loading, error];
}

