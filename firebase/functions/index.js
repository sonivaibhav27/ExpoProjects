const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
const db = firebase.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log("Hello World , This is first Functions ;)");
  response.send("Hello from Firebase!");
});

exports.newUser = functions.firestore
  .document("Users/{userUNIQUEIdentifier}")
  .onCreate((dataSnapshot, context) => {
    const UID = context.params.userUNIQUEIdentifier;
    return db.collection("userData").doc(UID).set(dataSnapshot.data());
  });
exports.addPizzaz = functions.database
  .ref("/rooms/{chatRoom}/messages/{roomId}")
  .onCreate((dataSnapshot, context) => {
    const chatRoom = context.params.chatRoom;
    const roomId = context.params.roomId;

    const messages = dataSnapshot.val();
    const replace = addPizzazz(messages.text);
    return dataSnapshot.ref.update({ text: replace });
  });

function addPizzazz(text) {
  return text.replace(/\bpizza\b/g, "🍕");
}
