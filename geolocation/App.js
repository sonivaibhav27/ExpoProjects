import React, { useEffect } from "react";
import GeocodingScreen from "./example";
import App from "./OurFile";
import firebase from "firebase";
export default () => {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAmHj0mDWxHyQ8K2GG91wwLhRD6WUbLvMY",
      authDomain: "hotel-7ebaa.firebaseapp.com",
      databaseURL: "https://hotel-7ebaa.firebaseio.com",
      projectId: "hotel-7ebaa",
      storageBucket: "hotel-7ebaa.appspot.com",
      messagingSenderId: "377675897733",
      appId: "1:377675897733:web:3f9275120696f5bf0e42ec",
    };

    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    debugger;
  }, []);
  return <App />;
};
