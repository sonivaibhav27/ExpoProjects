import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Button, View, StatusBar } from "react-native";
import GeoLocation from "./Geolocation";
const Stack = createStackNavigator();

function App({ navigation: { navigate } }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="GeoLocation Screen"
        color="#18a098"
        onPress={() => navigate("GeoScreen")}
      />
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="GeoScreen" component={GeoLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7e7e7",
    justifyContent: "center",
    alignItems: "center",
  },
});
