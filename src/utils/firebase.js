// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from "firebase/auth";

// Direct Firebase config from your message
const firebaseConfig = {
  apiKey: "AIzaSyBLvjRDiaXfCvnvdsMVlDdqQouPkCBuQfk",
  authDomain: "my-app-c11ca.firebaseapp.com",
  projectId: "my-app-c11ca",
  storageBucket: "my-app-c11ca.firebasestorage.app",
  messagingSenderId: "694564202438",
  appId: "1:694564202438:web:3f787ffd15c9695a0f34c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
