import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC2LMGWu_XS3xCXnPJp44DH_JWAFe_3Ab0",
    authDomain: "smartagrisys-d6a3f.firebaseapp.com",
    projectId: "smartagrisys-d6a3f",
    storageBucket: "smartagrisys-d6a3f.appspot.com",
    messagingSenderId: "653506748083",
    appId: "1:653506748083:web:a4c0cbe149efca4b81dac6",
    measurementId: "G-T5G7V2GRFS"
  
}


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth()
export {auth}