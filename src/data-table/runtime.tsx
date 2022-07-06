import * as React from "react";
const { useState } = React;
import { signOut, signInWithCustomToken } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { IRuntimeInitInteractive, getFirebaseJwt } from "@concord-consortium/lara-interactive-api";
import { IAuthoredState } from "../common/types";

import "./runtime.scss";

interface IInteractiveState {}

interface IRuntimeProps {
  initMessage: IRuntimeInitInteractive<IInteractiveState, IAuthoredState>;
}

import jwt_decode from "jwt-decode";
import { FirebaseEditForm } from "./components/firestore-update-form";
import { FirestoreCollection } from "./components/firestore-collection";

// Our DB Config:./components/firestore-collection
import {auth, firebaseApp } from "../common/connect-to-firestore";
import { useEffect } from "react";

/*

Here is a nice tool for inspecting JWTs: https://jwt.io/

Here where we get the typing hints for our JWT claims:
https://github.com/concord-consortium/rigse/blob/07d35a5d1a414af1c8cd43c47124426ecbb646fe/rails/app/controllers/api/v1/jwt_controller.rb#L170-L207


```ruby

  # POST api/v1/jwt/firebase as a logged in user, or
  # GET  api/v1/jwt/firebase?firebase_app=abc with a valid bearer token
  def firebase
    user, learner, teacher = handle_initial_auth
    # ... (code removed)

    {
      platform_id: APP_CONFIG[:site_url],
      platform_user_id: user.id,
      user_id: jwt_user_id(user)
    }

    # if learner
      user_type: "learner",
      class_hash: offering.clazz.class_hash,
      offering_id: offering.id

```
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


export const RuntimeComponent = (props: IRuntimeProps) => {
  const { initMessage } = props;
  const { authoredState } = initMessage;
  const [user, loading, error] = useAuthState(auth);
  const [rawFirebaseJwt, setRawFirebaseJWT] = useState<string>();

  useEffect(() => {
    getFirebaseJwt("ep-erosion-dev")
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

  const logout = () => {
    signOut(auth);
  };

  if (loading) {
    return (<div> <p>Authenticating ...</p> </div> );
  }

  if (error) {
    return (<div>Error!</div>);
  }

  if (user) {
    const accessToken:string  = (user as any).accessToken; // Really its there
    if(accessToken) {
      const claims: ILearnerFireStoreClaims = jwt_decode(accessToken);
      const rawJWTObj = jwt_decode(rawFirebaseJwt!) as any; // it's there!
      const { platform_user_id, class_hash, offering_id } = claims;
      return (
        <div className={"main"}>
          <p>Current User: {platform_user_id}</p>
          <button onClick={logout}>Log out</button>
          <FirestoreCollection app={firebaseApp} basePath={`playground/${class_hash}/${offering_id}`}/>
          <FirebaseEditForm app={firebaseApp} externalId={rawJWTObj.externalId} basePath={`playground/${class_hash}/${offering_id}`}/>
        </div>
      );
    }

    else {
      return(
        <div>
          Cant read JWT claims.
        </div>
      )
    }
  }

  else {
    return (
      <div>Error.</div>
    )
  }
};
