import * as React from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore,  setDoc, doc, getDoc} from 'firebase/firestore';

interface IFirebaseEditParams<documentInterface> {
  app: FirebaseApp;
  platform_user_id: string;
  base_path: string;
  shape?: documentInterface;
}

interface IErosionDoc {
  text?: string;
  transept?: number;
  platform_user_id: string;
  data: Record<string,number|null>;
}


export const FirebaseEditForm = (params: IFirebaseEditParams<IErosionDoc>) => {
  const {app, platform_user_id, base_path} = params;
  const fireStore = getFirestore(app);
  const docPath = `${base_path}/${platform_user_id}`;
  const emptyData: Record<string,number|null> = {};
  for(const letter in "ABCD".split("")) {
    for(const number in Array(7).keys()) {
      const key = `${letter}${number}`;
      emptyData[key] = null;
    }
  }

  const initialEmptyState: IErosionDoc = {
    text:"",
    transept:0,
    platform_user_id: "",
    data:emptyData
  }

  const [editorState, setEditorState] = React.useState(initialEmptyState);
  React.useEffect( () => {
    getDoc(doc(fireStore, docPath)).then(d => {
      const document: IErosionDoc = d.data() as IErosionDoc;
      setEditorState(document);
    });
  }, [docPath, fireStore]);

  const updateFirestore = (nextDoc: Partial<IErosionDoc>) => {
    const update = {...editorState, ...nextDoc};
    setDoc(doc(fireStore, docPath), update);
  }

  const updateDoc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    updateFirestore({text});
  };



  return(
    <div>
    <textarea onChange={updateDoc} defaultValue={editorState.text}/>
    {

    }
    </div>

  );
}
