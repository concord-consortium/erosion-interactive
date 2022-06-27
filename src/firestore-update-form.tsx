import * as React from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore,  setDoc, doc, getDoc} from 'firebase/firestore';
import { useState } from "react";

interface IFirebaseEditParams<documentInterface> {
  app: FirebaseApp;
  platform_user_id: string;
  basePath: string;
  shape?: documentInterface;
}

interface IErosionDoc {
  text?: string;
  transept?: string;
  platform_user_id: string;
  data: Record<string,number|undefined>;
}

const transects = ["A", "B", "C", "D"];
const points = [1, 2, 3, 4, 5, 6, 7];


export const FirebaseEditForm = (params: IFirebaseEditParams<IErosionDoc>) => {
  const {app, platform_user_id, basePath} = params;
  const fireStore = getFirestore(app);

  const docPath = `${basePath}/${platform_user_id}`;
  const emptyData: Record<string,number|undefined> = {};

  for(const letter in "ABCD".split("")) {
    for(const number in Array(7).keys()) {
      const key = `${letter}${number}`;
      emptyData[key] = undefined;
    }
  }

  const initialEmptyState: IErosionDoc = {
    text:"",
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

  const [selectedTransect, setSelectedTransect] = useState<string>();

  const handleSelectTransect = (e: any) => {
    setSelectedTransect(e.target.value);
  };

  const handleInput = (e: any) => {
    const pointID = e.target.getAttribute("id");
    const pointValue = Number(e.target.value);

    const newTransectData = {...editorState.data};
    newTransectData[pointID] = pointValue;

    setEditorState({...editorState, data: newTransectData});
    updateFirestore({data: newTransectData});
  };

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
      <div className="transect-table">
      <div className="selector">
        <select defaultValue={"DEFAULT"} onChange={handleSelectTransect}>
          <option value="DEFAULT" disabled>Choose a salutation ...</option>
          {transects.map((t) => {
            return <option key={t} value={t}>{`Transect ${t}`}</option>;
          })}
        </select>
      </div>
      {selectedTransect && points.map((p) => {
        return (
          <div key={selectedTransect + p + "div"} className="point-input">
            <label>{`P${p}:`}</label>
            <input type="number" step="0.01" value={editorState.data[selectedTransect + p]} key={selectedTransect + p} id={selectedTransect + p} onChange={handleInput}></input>
          </div>
        );
      })}
      <div className="debugging">TransectData: {JSON.stringify(editorState.data)}</div>
      </div>
    }
    </div>

  );
}
