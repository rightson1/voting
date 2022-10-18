import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAFbMdZadslyE91LSakgx_W4ko1ZRKY7lI",
    authDomain: "voting-a2b24.firebaseapp.com",
    projectId: "voting-a2b24",
    storageBucket: "voting-a2b24.appspot.com",
    messagingSenderId: "994267475721",
    appId: "1:994267475721:web:51e9c599bc476ede77add8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);