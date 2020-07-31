import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { GeoFire } from "geofire";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
const url =
  "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=41.8842%2C-87.6388%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs";
export default function App() {
  const [loc, setLoc] = useState(null);
  const [location, setActualLocation] = useState({
    latitude: null,
    longitude: null,
  });
  async function getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === "granted") {
      setLoc(true);
    } else {
      throw new Error("Location permission not granted");
    }
  }
  //   react native mock location detector/
  //   18.9910 72.8366
  //   18.9977 72.8376
  // 18.9854   72.8346
  const geofire = new GeoFire(firebase.database().ref("Users/").push());
  const setGeofire = () => {
    if (loc) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setActualLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        geofire
          .set("location", [18.9977, 72.8376])
          .then((returned) => {
            console.log(returned);
            alert("Successfully setted the location");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  const geoQuery = geofire.query({
    center: [18.9942579, 72.8382773],
    radius: 0.2,
  });

  useEffect(() => {
    geoQuery.on("key_entered", (key, location, dis) => {
      console.log(key, location, dis);
    });
  }, []);
  //   Converting from lat lon to state site: here developer
  const setGeoCoder = () => {
    fetch(
      `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=TH7m-fg95nfG5m2CuZm3NzMYNKRyK8eILhw3v2fR_D4&mode=retrieveAddresses&prox=18.9942579,72.8382773`
    )
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        console.log(
          json.Response.View[0].Result[0].Location.Address.AdditionalData[1]
            .value
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <Button
        title="Get Location"
        color={"orange"}
        onPress={getLocationAsync}
      />
      <Button title="Upload Location" color={"orange"} onPress={setGeofire} />
      <Button title="set GeoCoder" color={"orange"} onPress={setGeoCoder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
