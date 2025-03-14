import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA88qLbbr5eWXvqHGiTv7r8f4403b1d4w", // Replace with your actual API key
  authDomain: "trone-tech.firebaseapp.com",
  databaseURL: "https://trone-tech-default-rtdb.firebaseio.com",
  projectId: "trone-tech",
  storageBucket: "trone-tech.appspot.com",
  messagingSenderId: "101463310713",
  appId: "1:101463310713:web:018bda873d78af4403b1d4",
  measurementId: "G-4R8659XH1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };
export default app; 