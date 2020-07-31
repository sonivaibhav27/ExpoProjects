import * as React from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import Constants from "expo-constants";

const Images = [
  "https://images.unsplash.com/photo-1590581296933-1e815bbf390b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1587613754067-13e9a170b42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1590518670093-8c06506cae08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1571942948799-f6c583a1e19d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
].map((item, id) => ({ item, id }));

const ProcessImage = async (images) => {
  return new Promise(async (res, rej) => {
    const ProcessedImages = [...images];
    for (let i in images) {
      const image = ProcessedImages[i];
      await Image.getSize(image.item, (w, h) => {
        ProcessedImages[i] = { ...image, width: w, height: h };
      });
    }
    res(ProcessedImages);
  });
};

export default function App() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    ProcessImage(Images)
      .then((result) => {
        setLoading(false), console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {loading ? <ActivityIndicator size="large" /> : <Text>Done</Text>}
    </View>
  );
}
