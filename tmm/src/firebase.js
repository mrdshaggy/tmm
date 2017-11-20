import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyCiaZ6D17B_lr1OiGqpposNJDbZ_rW-nJY",
    authDomain: "temm-dd89d.firebaseapp.com",
    databaseURL: "https://temm-dd89d.firebaseio.com",
    projectId: "temm-dd89d",
    storageBucket: "temm-dd89d.appspot.com",
    messagingSenderId: "733607351069"
});
export const fs = firebaseApp.storage();
export const db = firebaseApp.database();