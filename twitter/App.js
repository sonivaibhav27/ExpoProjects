import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Signup } from "./src/screens/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {} from "@react-navigation/drawer";
import {} from "@react-navigation/bottom-tabs";
import {} from "react-native-gesture-handler";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{
          headerTitle: () => {
            <Image
              source={require("./assets/logo.jpeg")}
              style={{ height: 40, width: 40, alignSelf: "center" }}
            />;
          },
          headerRight: () => {
            <TouchableOpacity>
              <Text style={{ color: "#00acee" }}>SignUp</Text>
            </TouchableOpacity>;
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
