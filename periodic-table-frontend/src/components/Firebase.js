// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import firebaseui, { auth } from "firebaseui";
import { useState } from "react";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAVhf2zRYcIrOMVZSxhus70-IgLLSh_s2c",
  authDomain: "periodic-table-b89e9.firebaseapp.com",
  projectId: "periodic-table-b89e9",
  storageBucket: "periodic-table-b89e9.appspot.com",
  messagingSenderId: "472558676995",
  appId: "1:472558676995:web:95b5da72a5a477979cf236",
  measurementId: "G-28FF3QGQMZ",
};
function Auth() {
  return getAuth();
}

const moment = require("moment");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function AppUserGetDb() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    //current user
    let scores = [];
    let moment = [];
    let favourites = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === getAuth().currentUser.uid) {
        scores = doc.data().score;
        moment = doc.data().moment;
        favourites = doc.data().favourites;
      }
    });
    // console.log("scores", scores);
    // console.log("fav", favourites);
    return { scores, moment, favourites };
  } catch (e) {
    // console.log(e);
    return e;
  }
}

async function AppUserFavUpdate(fav) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    //current user
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === getAuth().currentUser.uid) {
        updateDoc(doc.ref, {
          favourites: fav,
        });
      }
    });
  } catch (e) {
    // console.log("fav error ", e);

    return e;
  }
}

async function AppUserDbUpdate(score) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    //current user
    // console.log("score updating", score);
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === getAuth().currentUser.uid) {
        updateDoc(doc.ref, {
          score: arrayUnion(score),
          moment: arrayUnion(moment().format("MMMM Do YYYY, h:mm:ss a")),
        });
      }
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function AppUserFavourites(favourite) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    //current user
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === getAuth().currentUser.uid) {
        updateDoc(doc.ref, {
          favourites: arrayUnion(favourite),
        });
      }
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function AppUserDb(username, score, uid) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      score: [],
      moment: [],
      favourites: [],
      uid: uid,
    });

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function AppUserCreation(data) {
  console.log("data in fb", data);
  console.log("auth", auth);
  let user;
  try {
    let user = await createUserWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password,
      data.name
    );
    if (user.user) {
      updateProfile(getAuth().currentUser, {
        displayName: data.name,
      });
      AppUserDb(data.name, null, user.user.uid);
      console.log("user", user);
      return true;
    }
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function AppUserLogout() {
  let user;
  try {
    user = await signOut(getAuth()).then((res) => {});
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function AppUserLogin(data) {
  console.log("userlogin", data);
  console.log("auth", auth);
  let user;
  try {
    user = await signInWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password
    );

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Function to check if user is logged in
function AppUserCheck() {
  const [user, setUser] = useState(null);
  if (user === null) {
    getAuth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }
  return user;
}
export {
  AppUserCreation,
  AppUserLogin,
  AppUserLogout,
  Auth,
  AppUserDbUpdate,
  AppUserGetDb,
  AppUserFavourites,
  AppUserFavUpdate,
  AppUserCheck,
};
