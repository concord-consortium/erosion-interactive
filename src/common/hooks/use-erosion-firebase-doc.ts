import * as React from "react";
const  { useState, useEffect } = React;
import { signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import jwt_decode from "jwt-decode";
import { getFirebaseJwt } from "@concord-consortium/lara-interactive-api";
import { auth } from "../connect-to-firestore";
import { IAuthoredState } from "../types";
import { v4 as uuidv4 } from 'uuid';

/*

Here is a nice tool for inspecting JWTs: https://jwt.io/

Here where we get the typing hints for our JWT claims:
https://github.com/concord-consortium/rigse/blob/07d35a5d1a414af1c8cd43c47124426ecbb646fe/rails/app/controllers/api/v1/jwt_controller.rb#L170-L207

*/

// This root path must match what we have in Firestore Rules
const rootPath = "erosion";

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

interface IErosionAuthInfo {
  collectionPath: string;
  documentPath: string;
  platformUserId: string;
}

const getLocalUserId = () => {
  let localUserId= localStorage.get('localUserId');
  if(!localUserId) {
    localUserId = uuidv4();
    localStorage.setItem('localUserId',localUserId);
  }
  return localUserId;
}

// get claims from the firebase JWT specified in init message:
export const useErosionFirebaseDoc = (authoredState: IAuthoredState|null) => {
  const [user, loading, error] = useAuthState(auth);
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();
  const [erosionAuthInfo, setErosionAuthInfo] = useState<IErosionAuthInfo|null>(null);
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
      if(rawFirebaseJwt.match(/ERROR/)) {
        signInAnonymously(auth);
      } else {
        signInWithCustomToken(auth, rawFirebaseJwt);
      }
    }
  }, [rawFirebaseJwt]);

  useEffect(() => {
    if(user) {
      // If we have accessToken then this is custom Auth from Portal
      if((user as any).accessToken) { // Can show up for custom auth cases
        const accessToken:string  = (user as any).accessToken; // Really
        const claims: ILearnerFireStoreClaims = jwt_decode(accessToken);
        const { class_hash, offering_id, platform_user_id } = claims;
        const collectionPath = `${rootPath}/${class_hash}/${offering_id}`;
        setErosionAuthInfo({
          platformUserId: platform_user_id,
          collectionPath,
          documentPath: `${collectionPath}/${platform_user_id}`
        });
      }
      // We are logging in anonymously, create a custom ID and path:
      else {
        const platformUserId = getLocalUserId();
        const collectionPath = `${rootPath}/anonymous/${platformUserId}`;
        setErosionAuthInfo({
          platformUserId,
          collectionPath,
          documentPath: `${collectionPath}/${platformUserId}`
        });
      }
    }
  }, [user]);

  return {
    platformUserId: erosionAuthInfo?.platformUserId || null,
    collectionPath: erosionAuthInfo?.collectionPath || null,
    documentPath: erosionAuthInfo?.documentPath || null,
    loading,
    error};
}
