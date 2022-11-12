// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebaseui, { auth } from "firebaseui";
import firebase from "firebase/app";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export { AppUserCreation, AppUserLogin, AppUserLogout, Auth };
