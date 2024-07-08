// src/firebase/config.js
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyACPPJnti3Xt1-x1pdMQJ4hXq9b0hY5ZPQ",
  authDomain: "projectolx-502fb.firebaseapp.com",
  projectId: "projectolx-502fb",
  storageBucket: "projectolx-502fb.appspot.com",
  messagingSenderId: "789961119726",
  appId: "1:789961119726:web:cbef21121edf4fb24820ff",
  measurementId: "G-RHPJLV0WQ3"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);


