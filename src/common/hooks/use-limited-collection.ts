import { getFirestore, collection } from 'firebase/firestore';
import { FirebaseApp  } from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";


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

