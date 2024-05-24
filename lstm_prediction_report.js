// Import the required Firebase modules
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyBejzfwpu1lyNQg07jaQ-qyo0HqrBImgUo",
    authDomain: "placementprediction-fp.firebaseapp.com",
    projectId: "placementprediction-fp",
    storageBucket: "placementprediction-fp.appspot.com",
    messagingSenderId: "403450492438",
    appId: "1:403450492438:web:e307336c971fde21b4a737",
    measurementId: "G-6W2STCNVCX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Define your exportJSON function
export default async function exportJSON() {
  const dataRef = ref(storage, 'gs://placementprediction-fp.appspot.com/lstm_prediction_report.json'); // Replace with the actual path to your JSON file in Firebase Storage
  try {
    const url = await getDownloadURL(dataRef);
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching JSON from Firebase Storage:", error);
    return null;
  }
}
