import React, { useEffect, useMemo, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore,  setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
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
for(const key of CellKeys) {
  emptyData[key] = null;
}

export const FirebaseEditForm = (params: IFirebaseEditParams<IErosionDoc>) => {
  const {app, collectionPath, platformUserId, docPath} = params;
  const fireStore = getFirestore(app);

  const initialEmptyState: IErosionDoc = useMemo(() => {
    return {
      text:"",
      id: platformUserId,
      data:emptyData
    }
  }, [platformUserId]);

  const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath);

  const [editorState, setEditorState] = React.useState(initialEmptyState);

  React.useEffect( () => {
    const currentUserDoc = docs.filter((d) => Number(d.id) === Number(platformUserId))[0];
    if (currentUserDoc) {
      if (!currentUserDoc.data){
        updateFirestore({data: emptyData});
        setEditorState({...currentUserDoc, data: emptyData});
      } else {
        setEditorState({...currentUserDoc});
      }
      if ("transect" in currentUserDoc) {
        setSelectedTransect(currentUserDoc.transect);
      }
    } else {
      setEditorState({...initialEmptyState});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs]);

  const [selectedTransect, setSelectedTransect] = useState<string>();

  const handleSelectTransect = (e: any) => {
    const transect: string = e.target.value;
    setSelectedTransect(transect);
    updateFirestore({transect});
  };

  const handleInput = (e: any) => {
    const pointID = e.target.getAttribute("id");
    const pointValue = e.target.value ? Number(e.target.value) : null;

    const newTransectData = {...editorState.data};
    newTransectData[pointID] = pointValue;

    setEditorState({...editorState, data: newTransectData});
    updateFirestore({data: newTransectData});
  };

  const updateFirestore = (nextDoc: Partial<IErosionDoc>) => {
    const update = {...editorState, ...nextDoc};
    setDoc(doc(fireStore, docPath), update, {merge: true});
  }

  // const [docs] = useLimitedCollection<IErosionDoc>(app, collectionPath);
  const data: ErosionData = docs
    ? averageDocs(docs)
    : {};
  return(
    <>
      <div className="container">
        <DataTable
          data={editorState?.data}
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
