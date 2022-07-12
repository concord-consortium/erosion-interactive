import React, { useMemo, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore,  setDoc, doc, getDoc } from 'firebase/firestore';
import { BarGraphContainer } from "./graph-container";
import { DataTable } from "./data-table";
import { ErosionData, IErosionDoc } from "../../common/types";
import { ReadOnlyDataTable } from "./read-only-data-table";
import { useLimitedCollection } from "../../common/hooks/use-limited-collection";
import { averageDocs } from "../../common/average-collection-docs";
import { CellKeys } from "../../common/constants";

import "./container.scss";

interface IFirebaseEditParams<documentInterface> {
  app: FirebaseApp;
  collectionPath: string;
  docPath: string;
  platformUserId: string;
  shape?: documentInterface;
}

const emptyData: ErosionData = {};
for(const key in CellKeys) { emptyData[key] = null; }

export const FirebaseEditForm = (params: IFirebaseEditParams<IErosionDoc>) => {
  const {app, collectionPath, platformUserId, docPath} = params;
  const fireStore = getFirestore(app);

  console.warn(docPath);
  const initialEmptyState: IErosionDoc = useMemo(() => {
    return {
      text:"",
      platformUserId,
      data:emptyData
    }
  }, [platformUserId]);

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

  const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath);
  const data: ErosionData = docs
    ? averageDocs(docs)
    : {};

  return(
    <>
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
      <ReadOnlyDataTable data={data}/>
    </>
  );
}
