import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPsCJr7I4PlJ9fDS-C8wVG2Vo_DfinViw",
    authDomain: "filmbase-94134.firebaseapp.com",
    databaseURL: "https://filmbase-94134.firebaseio.com",
    projectId: "filmbase-94134",
    storageBucket: "filmbase-94134.appspot.com",
    messagingSenderId: "42109576593",
    appId: "1:42109576593:web:da06cb9a085dabccc3e630",
    measurementId: "G-C8VLDM4ZDR"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();


// Firestore database
const db = firebase.firestore();

// Simplified user type for referencing users
export type User = Pick<firebase.User, 'uid' | 'email'>;

// Helper to get current time in Timestamp
export const timestampNow = firebase.firestore.Timestamp.now;

// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => setUser(u));
  }, []);

  return user;
};

// Sign up handler
export const signUp = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// Sign out handler
export const signOut = () => firebase.auth().signOut();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => 
    firebase.auth().signInWithRedirect(provider);

export type Movie = {
    movieId: string;
    userId: string;
    isFavorite: boolean;
    seen: boolean;
}

export const moviesCollection = db.collection('movies') as firebase.firestore.CollectionReference<Movie>;