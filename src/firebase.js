import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN8BqblbSor5vUu6WR3fTReJMPcEg",  // Even though we're not using Auth, this is needed for RTDB
  authDomain: "trone-tech.firebaseapp.com",
  projectId: "trone-tech",
  storageBucket: "trone-tech.appspot.com",
  messagingSenderId: "105108350187",
  appId: "1:105108350187:web:810bd8a378a7f4f8b31d4d",
  measurementId: "G-4R86S9XI7H",
  databaseURL: "https://trone-tech-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
let app;
let analytics = null;
let database;

try {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);
  
  // Initialize Realtime Database
  database = getDatabase(app);
  
  // Only initialize analytics in browser environment and if supported
  if (typeof window !== 'undefined') {
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(error => {
      console.error("Analytics initialization error:", error);
    });
  }
  
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Define admin credentials (these would typically be stored securely, but for this demo we'll keep them here)
const ADMIN_EMAIL = 'test@gmail.com';
const ADMIN_PASSWORD = 'test123';

// Logging function with better error handling
const logAction = async (action, details) => {
  if (!database) {
    console.error("Cannot log action: Firebase database not initialized");
    return;
  }
  
  try {
    const logsRef = ref(database, 'adminLogs');
    await push(logsRef, {
      action,
      details,
      timestamp: serverTimestamp(),
      userEmail: details.email || 'unknown',
      userId: 'session-admin'
    });
  } catch (error) {
    console.error("Error logging action:", error);
  }
};

export { app, analytics, database, logAction, ADMIN_EMAIL, ADMIN_PASSWORD }; 