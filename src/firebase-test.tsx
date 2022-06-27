import * as React from "react";
const { useState } = React;
import { FirebaseApp } from "firebase/app";
import { signOut, signInWithCustomToken} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import jwt_decode from "jwt-decode";
import { JWTLink } from "./jwt-link";

import { FirebaseEditForm } from "./firestore-update-form";

// Our DB Config:
import {auth, firebaseApp } from "./connect-to-firestore";
import { useLimitedCollection } from "./use-limited-collection";
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
  offering: string; // This will be null for teachers, but ignore that for now.
}



const FirestoreCollection = (params: { app:FirebaseApp, excludeIds?:number[] }) => {
  const { app } = params;
  interface myType {
    text: string;
    id: string;
  }
  const [values, loading, error] = useLimitedCollection<myType>(app, 'playground');
  console.log(values);
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {values && (
          <span>
            Collection:
            {values.map((d) => {
              console.log(d.id);
              return(
                <React.Fragment key={d.id}>
                  {JSON.stringify(d)}
                </React.Fragment>
              );
              })
            }
          </span>
        )}
        <hr/>
      </p>
    </div>
  );
};


export const Test = () => {
  const [user, loading, error] = useAuthState(auth);
  const [concordJWT, setConcordJWT] = useState("");

  const loginWithConcordJWT = () => {
    signInWithCustomToken(auth, concordJWT);
  }

  const handleJWTInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConcordJWT(e.target.value);
  }
  
  const logout = () => {
    signOut(auth);
  };

  if (loading) {
    return (<div> <p>Authenticating ...</p> </div> );
  }

  if (error) {
    return (<div> <p>Error: {error}</p></div> );
  }
  if (user) {
    const accessToken:string  = (user as any).accessToken; // Really its there
    if(accessToken) {
      const claims: ILearnerFireStoreClaims = jwt_decode(accessToken);
      const { platform_user_id } = claims;
      return (
        <div>
          <p>Current User: {platform_user_id}</p>
          <button onClick={logout}>Log out</button>
          <br/>
          <hr/>
          <FirestoreCollection app={firebaseApp}/>
          <FirebaseEditForm app={firebaseApp} platform_user_id={platform_user_id} base_path="playground"/>
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

  return (
    <div>
      <hr/>
      <JWTLink appName="ep-erosion-dev" host="https://learn.staging.concord.org" />
      <br />
      <textarea onChange={handleJWTInputChange}>{concordJWT}</textarea>
      <br/>
      <button onClick={loginWithConcordJWT}>Log in with JWT ^^</button>
    </div>
  );
};
