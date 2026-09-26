/**
 * Firebase Authentication Configuration
 * 
 * This file initializes Firebase using the modular CDN approach.
 * 
 * Usage in HTML:
 *   <script type="module">
 *     import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from './js/firebase-config.js';
 *     // Use the imported functions
 *   </script>
 * 
 * Or with a bundler:
 *   import { auth, signInWithEmailAndPassword, ... } from './js/firebase-config.js';
 */

// Import the functions needed from the SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'x', // from Firebase project settings
  authDomain: 'x.firebaseapp.com',
  projectId: 'x',
  storageBucket: 'x.com',
  messagingSenderId: 'x', // from Firebase project settings
  appId: 'x', // from Firebase project settings
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
};

export default app;
