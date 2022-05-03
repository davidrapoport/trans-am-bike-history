import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAepgRFqEJHXwgiJGWTIelssQFpNKQaq1E",
  authDomain: "trans-am-history.firebaseapp.com",
  projectId: "trans-am-history",
  storageBucket: "trans-am-history.appspot.com",
  messagingSenderId: "478519096944",
  appId: "1:478519096944:web:04ee2730b32b6e771766b5",
  measurementId: "G-5EGCTXYH05",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const currentUser = firebaseAuth.currentUser;
