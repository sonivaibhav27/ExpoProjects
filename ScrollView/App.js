import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import Animated, { Transition, Transitioning } from "react-native-reanimated";
const URLS = [
  "https://images.unsplash.com/photo-1591089627083-d9d049d833f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591089079607-73a2d0343394?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1590626448634-7a9f6e56bb39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591089297862-911da5481144?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591089283948-2205abd42972?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591093584092-9624c3e404f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591088385381-c3a394d93d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591089219008-94f05c3f2783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591086446281-8853a17166b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
].map((item, index) => ({ id: index, uri: item, name: "vaibhav", age: 20 }));
const Data = [
  "Card #1",
  "Card #2",
  "Card #3",
  "Card #4",
  "Card #5",
  "Card #6",
  "Card #7",
  "Card #8",
  "Card #9",
];

const Card_Width = Dimensions.get("window").width * 0.8;
const HorizontalMargin = 5;
const Card_Height = Dimensions.get("window").height * 0.7;
const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 10;
export default function App() {
  const _renderCards = (CardData) => {
    return CardData.map((item, i) => {
      return (
        <View style={[styles.cardContainer]} key={item.id}>
          <Image
            source={{ uri: item.uri }}
            style={{ flex: 1, width: null, height: null }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFill,
              top: null,
              right: 3,
              left: 3,
              bottom: 3,
              backgroundColor: "#fff",
              height: Card_Height / 8,
              borderRadius: 10,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {item.name}, {item.age}
            </Text>
          </View>
        </View>
      );
    });
  };
  const transition = (
    <Transition.Sequence>
      <Transition.In type="scale" />
      <Transition.Change interpolation="linear" />
      <Transition.Out type="scale" />
    </Transition.Sequence>
  );
  const [index, setIndex] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const ref = React.useRef();
  return (
    <Transitioning.View transition={transition} ref={ref} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            marginVertical: 20,
            fontWeight: "bold",
            fontSize: 30,
            marginHorizontal: 10,
          }}
        >
          Boosted Profiles
        </Text>
        <ScrollView
          onMomentumScrollEnd={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x * index;
            const layoutMeasurement = e.nativeEvent.layoutMeasurement.width;
            console.log(offsetX - layoutMeasurement);
            // 360 298
            setScale(0.7);
            setIndex(index + 1);
          }}
          decelerationRate={0}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={Card_Width + 10}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
          }}
        >
          {_renderCards(URLS)}
        </ScrollView>
      </View>
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3ff",
    justifyContent: "center",
  },
  cardContainer: {
    height: Card_Height,
    width: Card_Width,
    borderRadius: 10,
    backgroundColor: "#ccc",
    margin: HorizontalMargin,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#18a098",
  },
});
