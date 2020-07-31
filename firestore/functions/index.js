const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
const stripe = require("stripe")(
  "sk_test_51GtdaHA5kvsULNkXmQEI1578vEVIIUsQhCGLzYPtsG6mOw1vBrbY5jlJLpSlYy9DUSw2lGro6ukOlNdSc6C0Zdpz00b2yzSCJz"
);
firebase.initializeApp();
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
