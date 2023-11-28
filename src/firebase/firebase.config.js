// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};
// const firebaseConfig = {
//   apiKey: "AIzaSyD1WEp_fp_p7TuSa0GTEEsMUAkznvFKNik",
//   authDomain: "bloodpulse-50fbb.firebaseapp.com",
//   projectId: "bloodpulse-50fbb",
//   storageBucket: "bloodpulse-50fbb.appspot.com",
//   messagingSenderId: "1000719905091",
//   appId: "1:1000719905091:web:fe333268118aaa78927ff6"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);