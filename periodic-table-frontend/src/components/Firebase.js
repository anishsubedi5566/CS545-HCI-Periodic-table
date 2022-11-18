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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function AppUserGetDb() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    //current user
    let scores = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === getAuth().currentUser.uid) {
        scores = doc.data().score;
      }
    });
    console.log("scores", scores);
    return scores;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function AppUserDbUpdate(score) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    //current user
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === getAuth().currentUser.uid) {
        updateDoc(doc.ref, {
          score: arrayUnion(score),
        });
      }
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function AppUserDb(username, score, uid) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      score: [],
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
export {
  AppUserCreation,
  AppUserLogin,
  AppUserLogout,
  Auth,
  AppUserDbUpdate,
  AppUserGetDb,
};
