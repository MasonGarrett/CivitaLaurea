import firebase from "firebase";
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXX6jAB3MR1lEwdEoAekQAmiJTddGkp_A",
    authDomain: "civita-laurea.firebaseapp.com",
    projectId: "civita-laurea",
    storageBucket: "civita-laurea.appspot.com",
    messagingSenderId: "936720196161",
    appId: "1:936720196161:web:263c480867dafebcb49cc0",
    measurementId: "G-E07JC0TZTX"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;