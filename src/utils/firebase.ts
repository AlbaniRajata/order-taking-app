import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const {
    REACT_APP_API_KEY,
    REACT_APP_API_AUTH_DOMAIN,
    REACT_APP_API_PROJECT_ID,
    REACT_APP_API_STORAGE_BUCKET,
    REACT_APP_API_MESSAGING_SENDER_ID,
    REACT_APP_API_APP_ID,
    REACT_APP_API_MEASUREMENT_ID,
} = process.env;

export const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_API_AUTH_DOMAIN,
    projectId: REACT_APP_API_PROJECT_ID,
    storageBucket: REACT_APP_API_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_API_MESSAGING_SENDER_ID,
    appId: REACT_APP_API_APP_ID,
    measurementId: REACT_APP_API_MEASUREMENT_ID
  };

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app)