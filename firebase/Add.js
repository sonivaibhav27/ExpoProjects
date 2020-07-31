const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyDm6MWGPxMfilgrM4l_sNzKa_cnHmvHdtM",
  authDomain: "indian-browser-8511d.firebaseapp.com",
  databaseURL: "https://indian-browser-8511d.firebaseio.com",
  projectId: "indian-browser-8511d",
  storageBucket: "indian-browser-8511d.appspot.com",
  messagingSenderId: "992820746163",
  appId: "1:992820746163:web:2636a5862de1452c545dc6",
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

(async function () {
  try {
    await chat("Vaibhav", "Lets Party , get some  pizza");
    await chat("Soni", "Ok , getting some pizza for you <3");
    process.exit(0); //coming out of node environment
  } catch (e) {
    console.log("Error", e);
  }
})();
async function chat(name, text) {
  const ref = firebase.database().ref("rooms").child("pizza").child("messages");
  await ref.push({ name, text });
  setTimeout(() => {}, 1000);

  console.log(`${name}: ${text}`);
}
