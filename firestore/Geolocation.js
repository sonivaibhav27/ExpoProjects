import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  YellowBox,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { GeoFirestore, GeoQuery } from "geofirestore";
import tipsiStripe from "tipsi-stripe";
import _ from "lodash";
import "firebase/firestore";
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
const Returned = Dimensions.get("window");
var firebaseConfig = {
  apiKey: "AIzaSyAmHj0mDWxHyQ8K2GG91wwLhRD6WUbLvMY",
  authDomain: "hotel-7ebaa.firebaseapp.com",
  databaseURL: "https://hotel-7ebaa.firebaseio.com",
  projectId: "hotel-7ebaa",
  storageBucket: "hotel-7ebaa.appspot.com",
  messagingSenderId: "377675897733",
  appId: "1:377675897733:web:3f9275120696f5bf0e42ec",
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const geoFirestore = new GeoFirestore(firestore);
const geoCollection = geoFirestore.collection("GeoBasedUsers");

tipsiStripe.setOptions({
  publishableKey:
    "pk_test_51GtdaHA5kvsULNkXGb6K1mGG3Qk9ZEu7hAY4eU6cEo5vAaxWmAwn0JRi3UtF5z3sl5iicD7QFnbQgOsHxCgRLgxn00lTgwe4Xn",
  androidPayMode: "test",
});
export default function App() {
  const [users, setUsers] = React.useState([]);
  const addLocation = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc("vaibhavNew")
      .set({
        name: "Vaibhav",
        age: 20,
        bio: "Hello World",
        images: [12, 32, 43, 54, 65],
        points: new firebase.firestore.GeoPoint(72.092, -120.223),
      });
  };
  const updateLocation = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc("vaibhav")
      .update({
        name: "raja",
      })
      .then((res) => {
        console.log(res.updateTime);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get = async () => {
    let documentRef = firebase.firestore().collection("Users").doc("vaibhav");

    try {
      documentRef
        .get({ source: "cache" })
        .then((snap) => {
          console.log("Cache Data", snap.data());
        })
        .catch((err) => {
          if (
            err.message ==
            "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
          ) {
            console.log("Cache data not found!");
            documentRef.get().then((doc) => {
              console.log(doc.data());
            });
          } else {
            console.log(err.message);
          }
        });
    } catch (e) {
      console.log("Error");
    }
  };
  geoCollection.limit(10);
  const geoSet = () => {
    geoCollection.add({
      name: "Geofirestore  #3",
      score: 240,
      coordinates: new firebase.firestore.GeoPoint(19.0072, 72.835),
    });
  };
  function randomGeo(center, radius) {
    var y0 = center.latitude;
    var x0 = center.longitude;
    var rd = (radius * 1000) / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    return { x: y + y0, y: x + x0 };
  }
  const geoPromise = async () => {
    let returned;
    for (let i = 5; i < 50; i++) {
      returned = randomGeo({ latitude: 18.9942, longitude: 72.8383 }, 20);
      await geoCollection
        .add({
          coordinates: new firebase.firestore.GeoPoint(returned.x, returned.y),
          name: `Geofirestore #${i}`,
          score: Math.floor(Math.random() * 600) + 1,
        })
        .then((id) => {
          console.log("added document with ID" + id.id);
        });
    }
  };

  const makeQuery = () => {
    return geoCollection.near({
      center: new firebase.firestore.GeoPoint(18.991, 72.8359),
      radius: 3,
    });
  };

  const geoQuer = () => {
    let newArr = [];
    const query = makeQuery();

    query
      .get()

      .then((value) => {
        let merged, distance;
        console.log(value.docs);
        for (let snapshot of value.docs) {
          distance = snapshot.distance.toFixed(2);
          merged = {
            distance,
            ...snapshot.data(),
          };
          newArr.push(merged);
        }
        setUsers([...users, ...newArr]);
        console.log(users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const instantiatePayment = () => {};
  return (
    <View style={styles.container}>
      <Button onPress={addLocation} title="add Location" />
      <Button onPress={instantiatePayment} title="Make Payment" />
      <Button onPress={geoPromise} title="add Multiple Location" />
      <Button onPress={updateLocation} title="Update Location" />
      <Button onPress={get} title="Get Location" />
      <View style={{ flexDirection: "row" }}>
        <Button onPress={geoSet} color="orange" title="GeoAdd" />
        <Button onPress={geoQuer} color="orange" title="GeoQuesry" />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.score}${index}`.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: 400,
                marginHorizontal: 20,
                borderRadius: 8,
                overflow: "hidden",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "dodgerblue",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#fff", fontSize: 28 }}
                >
                  {item.distance}
                </Text>
              </View>
              <View style={{ backgroundColor: "#e1e5e7", padding: 10 }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <Text>Score : {item.score}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
