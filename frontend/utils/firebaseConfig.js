import { getApps, initializeApp } from '@firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyBejzfwpu1lyNQg07jaQ-qyo0HqrBImgUo",
//   authDomain: "placementprediction-fp.firebaseapp.com",
//   projectId: "placementprediction-fp",
//   storageBucket: "placementprediction-fp.appspot.com",
//   messagingSenderId: "403450492438",
//   appId: "1:403450492438:web:e307336c971fde21b4a737",
//   measurementId: "G-6W2STCNVCX"
// };

let app;
let auth;

if (!getApps().length) { 
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApps()[0]; // Use the already initialized app
  auth = getAuth(app); // This should be adjusted based on your exact use case
}

export { app, auth };
