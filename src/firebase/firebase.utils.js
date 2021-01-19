import firebase from 'firebase/app';
import 'firebase/firestore';

export var firebaseConfig = {
  apiKey: "AIzaSyBFoSKKyuKe3CPY5Cq8VA4z1bWgjkjvWKA",
  authDomain: "contact-b1932.firebaseapp.com",
  projectId: "contact-b1932",
  storageBucket: "contact-b1932.appspot.com",
  messagingSenderId: "743737740964",
  appId: "1:743737740964:web:93f7e1d314a430fdeba031",
  measurementId: "G-1MPXG63BPL"
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export default firebase;