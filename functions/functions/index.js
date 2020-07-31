const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
firebase.initializeApp({
  apiKey: "AIzaSyCKXc-HzyPbr8RxLZXaYK2a9ecsFoMEG_s",
  authDomain: "iotproject-527f1.firebaseapp.com",
  databaseURL: "https://iotproject-527f1.firebaseio.com",
  projectId: "iotproject-527f1",
  storageBucket: "iotproject-527f1.appspot.com",
  messagingSenderId: "697671462898",
  appId: "1:697671462898:web:3650b8536465ed7ecbc56b",
  measurementId: "G-5GFNJ6BX7J",
});

const db = firebase.firestore();

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.newUser = functions.firestore
  .document("Users/{userUNIQUEIdentifier}")
  .onCreate((dataSnapshot, context) => {
    const UID = context.params.userUNIQUEIdentifier;
    return db.collection("userData").doc(UID).set({
      name: "vaibhav",
    });
  });

exports.updateUserInformation = functions.firestore
  .document("Users/{userUNIQUEIdentifier}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    console.log(data);
    const UID = context.params.userUNIQUEIdentifier;
    return db.collection("userData").doc(UID).update(data);
  });
