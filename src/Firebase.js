import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDxvm7NwObralxnezCiJ4dn1MkAieyba4o',
  authDomain: 'puisho-store.firebaseapp.com',
  databaseURL: 'https://puisho-store-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'puisho-store',
  storageBucket: 'puisho-store.appspot.com',
  messagingSenderId: '965151574141',
  appId: '1:965151574141:web:a26674ae6c4ec5e54c8914',
}
export const app = initializeApp(firebaseConfig)
const auth = getAuth()
export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
}
