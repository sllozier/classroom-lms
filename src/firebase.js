import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrzIwI1HhI6_wKTS3IaLqYLfvE5i5UZXk",
  authDomain: "classroom-lms.firebaseapp.com",
  projectId: "classroom-lms",
  storageBucket: "classroom-lms.appspot.com",
  messagingSenderId: "309103446782",
  appId: "1:309103446782:web:7cddfc355600fd0bdef3af",
  measurementId: "G-7DQ9KR7YLM",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    const user = response.user;
    // console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};

const signUpwithEmail = async (auth, email, password, name) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      name
    );
    console.log("EMAIL RESP", response.user);
    const user = response.user;
    console.log("USER UID?", user.uid);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: name,
        email: email,
        enrolledClassrooms: [],
      });
    }
    console.log("WHAT IS USER?", user);
  } catch (err) {
    alert(err.message);
  }
};

const signInWithEmail = async (auth, email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    console.log("USER UID?", user.uid);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
    console.log("WHAT IS USER?", user);
  } catch (err) {
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  app,
  auth,
  db,
  signInWithGoogle,
  signUpwithEmail,
  signInWithEmail,
  sendPasswordReset,
  logout,
};
