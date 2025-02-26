// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDPaKt0ETYzIl8vWf5cVJ7BbmPrSI5sW7I",
  authDomain: "miguel-angel--perez-ajal.firebaseapp.com",
  projectId: "miguel-angel--perez-ajal",
  storageBucket: "miguel-angel--perez-ajal.firebasestorage.app",
  messagingSenderId: "1039877236252",
  appId: "1:1039877236252:web:46e45b618f3eaa1eab61d9",
  measurementId: "G-325ZFW3K8B",
};

// Inicializar Firebase
const firebase = initializeApp(firebaseConfig);

// Inicializar Firestore
export const firebase_db = getFirestore(firebase);

// Inicializar Auth
export const auth = getAuth(firebase);

export { sendPasswordResetEmail };

// Inicializar Analytics solo si el entorno lo soporta
let analytics: null | ReturnType<typeof getAnalytics> = null;

isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebase);
    }
  })
  .catch((error) => console.error("Error verificando Analytics:", error));

export { firebase, analytics };



/* // lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPaKt0ETYzIl8vWf5cVJ7BbmPrSI5sW7I",
  authDomain: "miguel-angel--perez-ajal.firebaseapp.com",
  projectId: "miguel-angel--perez-ajal",
  storageBucket: "miguel-angel--perez-ajal.firebasestorage.app",
  messagingSenderId: "1039877236252",
  appId: "1:1039877236252:web:46e45b618f3eaa1eab61d9",
  measurementId: "G-325ZFW3K8B"
};



// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Inicializa Firestore
export const firebase_db = getFirestore(firebase); // Asegúrate de exportar db

export const analytics = getAnalytics(firebase);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebase); */