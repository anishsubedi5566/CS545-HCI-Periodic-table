// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebaseui, { auth } from "firebaseui";
import firebase from "firebase/app"
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
  measurementId: "G-28FF3QGQMZ" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
async function AppUserCreation(data){
  console.log("data in fb",data)
  console.log("auth",auth)
  let user;
  try{
    user = await createUserWithEmailAndPassword(getAuth(), data.email, data.password, data.name)
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
  if (user.user){
    updateProfile(getAuth().currentUser, {
      displayName: data.name
    })
    console.log("user",user)
    return true
  }
  return false
}

async function AppUserLogout(){
  let user;
  try{
    user = await signOut(getAuth()).then((res)=>{
      localStorage.removeItem("user")
      toast.success("User logged out")
    }
    )
    return user
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
}

async function AppUserLogin(data){
  console.log("userlogin",data)
  console.log("auth",auth)
  let user;
  try{
    user = await signInWithEmailAndPassword(getAuth(), data.email, data.password).then((res)=>{
      toast.success("User logged in")
      localStorage.setItem("user", JSON.stringify(res.user))
      
    }
    )
    return user
  }
  catch(error){
    console.log(error)
    localStorage.removeItem("user")
    toast.error(error.message)
  }
}
export {AppUserCreation,AppUserLogin, AppUserLogout};