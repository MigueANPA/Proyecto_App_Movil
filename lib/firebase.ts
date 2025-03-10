import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPaKt0ETYzIl8vWf5cVJ7BbmPrSI5sW7I",
  authDomain: "miguel-angel--perez-ajal.firebaseapp.com",
  databaseURL: "https://miguel-angel--perez-ajal.firebaseio.com", // <- Añadido
  projectId: "miguel-angel--perez-ajal",
  storageBucket: "miguel-angel--perez-ajal.firebasestorage.app",
  messagingSenderId: "1039877236252",
  appId: "1:1039877236252:web:46e45b618f3eaa1eab61d9",
  measurementId: "G-325ZFW3K8B"
};

const firebase = initializeApp(firebaseConfig);

// Servicios
export const firebase_db = getFirestore(firebase);
export const rtdb = getDatabase(firebase);
export const auth = getAuth(firebase);
export { sendPasswordResetEmail };

// Analytics con mejor manejo de errores
let analytics: null | ReturnType<typeof getAnalytics> = null;
const initAnalytics = async () => {
  try {
    if (await isSupported()) {
      analytics = getAnalytics(firebase);
    }
  } catch (error) {
    console.error("Error initializing Analytics:", error);
  }
};
initAnalytics();

export { firebase, analytics };