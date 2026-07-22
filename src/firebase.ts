import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSN6FrokK_Bc7Rvt7-TBjW9_DwO23odOk",
  authDomain: "gen-lang-client-0686064031.firebaseapp.com",
  projectId: "gen-lang-client-0686064031",
  storageBucket: "gen-lang-client-0686064031.firebasestorage.app",
  messagingSenderId: "419775768613",
  appId: "1:419775768613:web:8f52313df0f95191aef7cc"
};

const app = initializeApp(firebaseConfig);
// Using getFirestore with custom database ID as second parameter
const db = getFirestore(app, "ai-studio-df9d19b3-0a13-4b41-abb5-7ffb411c873d");

export { db };
