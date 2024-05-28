import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: atob("QUl6YVN5RGVHZHo3Y1NlOXV0NVZvdmN2N1A5aGNUZi1ERHdPbzk0"),
  authDomain: "ep-erosion-dev.firebaseapp.com",
  projectId: "ep-erosion-dev",
  storageBucket: "ep-erosion-dev.appspot.com",
  messagingSenderId: "550159635043",
  appId: "1:550159635043:web:770c00ca3623578b571e56",
  measurementId: "G-L8J1W753JM"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

