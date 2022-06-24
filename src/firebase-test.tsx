import * as React from "react";
// const { useEffect } = React;
const { useState } = React;
import { getAuth, signOut, signInAnonymously, signInWithCustomToken} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import jwt_decode from "jwt-decode";

import { JWTLink } from "./jwt-link";


/*

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
  offering: string; // In truth this will be null for teachers, but ignore that.
}

const firebaseConfig = {
  apiKey: "AIzaSyDeGdz7cSe9ut5Vovcv7P9hcTf-DDwOo94",
  authDomain: "ep-erosion-dev.firebaseapp.com",
  projectId: "ep-erosion-dev",
  storageBucket: "ep-erosion-dev.appspot.com",
  messagingSenderId: "550159635043",
  appId: "1:550159635043:web:770c00ca3623578b571e56",
  measurementId: "G-L8J1W753JM"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const Test = () => {
  const [user, loading, error] = useAuthState(auth);
  const [concordJWT, setConcordJWT] = useState("");

  const login = () => {
    signInAnonymously(auth);
  };

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
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    console.log(user);
    console.log(auth);
    const accessToken:string  = (user as any).accessToken; // Really its there.
    if(accessToken) {
      const claims: ILearnerFireStoreClaims = jwt_decode(accessToken);
      console.log(claims);
      return (
        <div>
          <p>Current User: {claims.platform_user_id}</p>
          <button onClick={logout}>Log out</button>
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
      <button onClick={login}>Log in</button>
      <br/>
      <hr/>
      <JWTLink appName="ep-erosion-dev" host="https://learn.staging.concord.org" />
      <br />
      <textarea onChange={handleJWTInputChange}>{concordJWT}</textarea>
      <br/>
      <button onClick={loginWithConcordJWT}>Log in with JWT ^^</button>
    </div>
  );
};

