// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
import { getAuth, getReactNativePersistence, initializeAuth} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "dietplanner-609b7.firebaseapp.com",
  projectId: "dietplanner-609b7",
  storageBucket: "dietplanner-609b7.firebasestorage.app",
  messagingSenderId: "451237820058",
  appId: "1:451237820058:web:ec40ba0fcf7ba016171123",
  measurementId: "G-FBX2DCGBJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = Platform.OS === "web" ? getAuth(app) : initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})