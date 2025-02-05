import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBLjLD8knubm4ZQ34-1o_uU1teSQ5vqfc0",
  authDomain: "thedojosite-28edb.firebaseapp.com",
  projectId: "thedojosite-28edb",
  storageBucket: "thedojosite-28edb.firebasestorage.app",
  messagingSenderId: "710862067904",
  appId: "1:710862067904:web:746404876195d7d76bf525"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };