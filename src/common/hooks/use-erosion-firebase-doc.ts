import * as React from "react";
const  { useState, useEffect } = React;
import { signInWithCustomToken } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import jwt_decode from "jwt-decode";
import { getFirebaseJwt } from "@concord-consortium/lara-interactive-api";
import { auth } from "../connect-to-firestore";
import { IAuthoredState } from "../types";
/*

Here is a nice tool for inspecting JWTs: https://jwt.io/

Here where we get the typing hints for our JWT claims:
https://github.com/concord-consortium/rigse/blob/07d35a5d1a414af1c8cd43c47124426ecbb646fe/rails/app/controllers/api/v1/jwt_controller.rb#L170-L207

*/

interface IPortalFireStoreClaims {
  platform_id: string;
  platform_user_id: string;
  user_id: string;
}

interface ILearnerFireStoreClaims extends IPortalFireStoreClaims {
  user_type: "learner" | "teacher";
  class_hash: string;
  learner_id: string;
  offering_id: string; // This will be null for teachers, but ignore that for now.
}


// get claims from the firebase JWT specified in init message:
export const useErosionFirebaseDoc = (authoredState: IAuthoredState|null) => {
  const [user, loading, authError] = useAuthState(auth);
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();
  const fireBaseAppName = "ep-erosion-dev";

  // TODO: Load this from authored state, cant find it ATM.
  // const fireBaseAppName = authoredState.firebaseApp || "ep-erosion-dev";

  useEffect(() => {
    getFirebaseJwt(fireBaseAppName)
      .then(response => {
        setRawFirebaseJWT(response.token);
      })
      .catch(e => {
        setRawFirebaseJWT(`ERROR: ${e.toString()}`);
      });
  }, [authoredState]);

  useEffect(() => {
    if (rawFirebaseJwt) {
      signInWithCustomToken(auth, rawFirebaseJwt);
      // signInAnonymously(auth);
    }
  }, [rawFirebaseJwt]);

  // Maybe later we will have other errors.
  const error = authError;
  let documentPath:string|null = null;
  let collectionPath:string|null = null;
  let platformUserId: string|null = null;
  let externalID: string|null = null;

  // TBD: what would the teacher get for document collection?
  if(user) {
    const accessToken:string  = (user as any).accessToken; // Really its there
    const claims: ILearnerFireStoreClaims = jwt_decode(accessToken);
    const rawJWTObj = jwt_decode(rawFirebaseJwt!) as any; // it's there!
    const { class_hash, offering_id } = claims;
    externalID = rawJWTObj.externalId;
    platformUserId = claims.platform_user_id;
    collectionPath = `playground/${class_hash}/${offering_id}`;
    documentPath = `${collectionPath}/${externalID}`;
  }
  return {platformUserId, collectionPath, documentPath, externalID, loading, error};
}