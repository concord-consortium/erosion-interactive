import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDeGdz7cSe9ut5Vovcv7P9hcTf-DDwOo94",
  authDomain: "ep-erosion-dev.firebaseapp.com",
  projectId: "ep-erosion-dev",
  storageBucket: "ep-erosion-dev.appspot.com",
  messagingSenderId: "550159635043",
  appId: "1:550159635043:web:770c00ca3623578b571e56",
  measurementId: "G-L8J1W753JM"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

