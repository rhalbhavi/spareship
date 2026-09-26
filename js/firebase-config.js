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
  apiKey: 'AIzaSyAxiHf-joGYH6D4okYXOFbqLtjbV2BzV24', // from Firebase project settings
  authDomain: 'spareship-b5fd4.firebaseapp.com',
  projectId: 'spareship-b5fd4',
  storageBucket: 'spareship-b5fd4.appspot.com',
  messagingSenderId: '56888072733', // from Firebase project settings
  appId: '1:56888072733:web:c3c2170e77d0da3e0404f4', // from Firebase project settings
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
