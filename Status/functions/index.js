const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.changeHeart = functions.database
  .ref("/rooms/pizza/messages/{messageID}")
  .onCreate((snapshot, context) => {
    const data = snapshot.val();
    const replaced = replace(data.text);
    return snapshot.ref.update({ text: replaced });
  });

function replace(text) {
  return text.replace(/\bpizza\b/g, "❤️");
}
