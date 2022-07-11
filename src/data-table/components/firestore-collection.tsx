import { useLimitedCollection } from "../../common/hooks/use-limited-collection";
import { FirebaseApp } from "firebase/app";
import * as React from "react";

interface IFireStoreCollectionParams {
  app: FirebaseApp;
  excludeIds?:number[];
  basePath: string;
}

export const FirestoreCollection = (params: IFireStoreCollectionParams) => {
  const { app, basePath } = params;
  interface myType {
    text: string;
    id: string;
  }
  const [values, loading, error] = useLimitedCollection<myType>(app, basePath);
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {values && (
          <div>
            Collection:
            {values.map((d:any) => {
              return(
                <React.Fragment key={d.id}>
                  {JSON.stringify(d)}
                </React.Fragment>
              );
              })
            }
          </div>
        )}
      </p>
    </div>
  );
};
