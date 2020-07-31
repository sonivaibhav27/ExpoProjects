import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
const firebaseConfig = {
  apiKey: "AIzaSyDXJxqA0TKUul7sDE16QjZoWGMBPZZvNXA",
  authDomain: "example-a200b.firebaseapp.com",
  databaseURL: "https://example-a200b.firebaseio.com",
  projectId: "example-a200b",
  storageBucket: "example-a200b.appspot.com",
  messagingSenderId: "48921330327",
  appId: "1:48921330327:web:8bd559f5774d03342edfd2",
};

class Fire {
  constructor() {
    this.init();
  }
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  signInAnonmously = () => {
    return firebase.auth().signInAnonymously();
  };
  get UID() {
    return firebase.auth().currentUser.uid;
  }
  get ref() {
    return firebase.database().ref("listContacts/");
  }
}
Fire.shared = new Fire();
export default Fire;
