import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA11RU9wX76_8S95XtupC2c4ItCc7bvBpM',
  authDomain: 'feedback-platform-82621.firebaseapp.com',
  databaseURL: 'https://feedback-platform-82621-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'feedback-platform-82621',
  storageBucket: 'feedback-platform-82621.appspot.com',
  messagingSenderId: '145686348099',
  appId: '1:145686348099:web:1f093e4b8746b47d87eff6',
  measurementId: 'G-KFZCMJKNNV',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage;

const groupsRef = db.collection('groups');
const usersRef = db.collection('users');

const storageRef = storage().ref();

export {
  auth,
  db,
  storage,
  groupsRef,
  usersRef,
  storageRef,
};
