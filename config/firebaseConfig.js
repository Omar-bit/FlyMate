import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Conditionally import Google Sign-In
let GoogleSignin = null;
try {
  const googleSignInModule = require('@react-native-google-signin/google-signin');
  GoogleSignin = googleSignInModule.GoogleSignin;
} catch (error) {
  console.log('Google Sign-In not available in this EXPO GO ');
}

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  //   databaseURL: 'https://project-id.firebaseio.com',

  apiKey: 'AIzaSyDEOFcm3vWeZJIVdRptfW2LAHJ-VMWode0',
  authDomain: 'flymate-app.firebaseapp.com',
  projectId: 'flymate-app',
  storageBucket: 'flymate-app.firebasestorage.app',
  messagingSenderId: '608776488312',
  appId: '1:608776488312:web:287c34195658f1ba4d348d',
  measurementId: 'G-ZRWFVMK14M',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

if (GoogleSignin) {
  GoogleSignin.configure({
    webClientId:
      '608776488312-2ughjn8jr53u9uk2796ac956t5t98eqe.apps.googleusercontent.com',
  });
}

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { app, auth, db };
