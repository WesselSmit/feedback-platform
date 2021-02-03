import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA11RU9wX76_8S95XtupC2c4ItCc7bvBpM',
  authDomain: 'feedback-platform-82621.firebaseapp.com',
  projectId: 'feedback-platform-82621',
  storageBucket: 'feedback-platform-82621.appspot.com',
  messagingSenderId: '145686348099',
  appId: '1:145686348099:web:1f093e4b8746b47d87eff6',
  measurementId: 'G-KFZCMJKNNV',
};

// Initialized firebase app
firebase.initializeApp(firebaseConfig);

// Firebase services
const projectAuth = firebase.auth();

export { firebase, projectAuth };
