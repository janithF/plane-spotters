import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDdD_wvpTjmoHD5q7dik3dXp1cLG6R_Pzw",
    authDomain: "planespotters-352ac.firebaseapp.com",
    databaseURL: "https://planespotters-352ac-default-rtdb.firebaseio.com",
    projectId: "planespotters-352ac",
    storageBucket: "planespotters-352ac.appspot.com",
    messagingSenderId: "882016375293",
    appId: "1:882016375293:web:2dcdd0fce7cafe60e88994"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };