import React, { useMemo, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore,  setDoc, doc, getDoc } from 'firebase/firestore';
import { BarGraphContainer } from "./graph-container";
import { DataTable } from "./data-table";
import { IErosionDoc } from "../../common/types";
import "./container.scss";

interface IFirebaseEditParams<documentInterface> {
  app: FirebaseApp;
  externalId: string;
  basePath: string;
  shape?: documentInterface;
}

const emptyData: Record<string,number|undefined> = {};

for(const letter in "ABCD".split("")) {
  for(const number in Array(7).keys()) {
    const key = `${letter}${number}`;
    emptyData[key] = undefined;
  }
}

export const FirebaseEditForm = (params: IFirebaseEditParams<IErosionDoc>) => {
  const {app, externalId, basePath} = params;
  const fireStore = getFirestore(app);
  const docPath = `${basePath}/${externalId}`; // basePath/class_hash/offering_id/externalId

  const initialEmptyState: IErosionDoc = useMemo(() => {
    return {
      text:"",
      externalId,
      data:emptyData
    }
  }, [externalId]);

  const [editorState, setEditorState] = React.useState(initialEmptyState);
  React.useEffect( () => {
    getDoc(doc(fireStore, docPath)).then(d => {
      const document: IErosionDoc = d.data() as IErosionDoc;
      setEditorState(document || initialEmptyState);
    });
  }, [docPath, fireStore, initialEmptyState]);

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

  return(
    <div className="container">
      <DataTable
        data={editorState.data}
        selectedTransect={selectedTransect}
        handleSelectTransect={handleSelectTransect}
        handleDataChange={handleInput}
      />
      <BarGraphContainer
        selectedTransect={selectedTransect}
        transectData={editorState?.data}
      />
    </div>

  );
}
