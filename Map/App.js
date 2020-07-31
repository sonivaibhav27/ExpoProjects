import React, { useEffect } from "react";
import { FlatList, TouchableNativeFeedback, View } from "react-native";
import GeoLocation from "react-native-geolocation-service";
import MapView from "react-native-maps";

export default () => {
  useEffect(() => {
    GeoLocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (err) => {
        console.log(err.code + err.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1000,
        timeout: 10000,
      }
    );
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} maxZoomLevel={10} />
    </View>
  );
};
