import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDIXYyDjRxsx4ER1cNXAaGFh8lu6mwP2Fc",
    authDomain: "hack-ideas-f9855.firebaseapp.com",
    projectId: "hack-ideas-f9855",
    storageBucket: "hack-ideas-f9855.appspot.com",
    messagingSenderId: "581988712215",
    appId: "1:581988712215:web:9a1b791cbb445ed5884152"
};

let db = null;
export const initializeFirbase = () => {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

export const getDb = () => {
    return db;
}