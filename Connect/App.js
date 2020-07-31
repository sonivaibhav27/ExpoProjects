import "react-native-gesture-handler";
import React, { createContext, Component, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Calls, Cameras, Chats, Status } from "./src/components/Screens";
import { Entypo } from "@expo/vector-icons";
import { createStore } from "redux";
import { Provider } from "react-redux";
import firebase from "firebase";
console.disableYellowBox = true;
console.ignoredYellowBox = ["Setting a timer"];
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import ConDisplays from "./src/components/Contacts";
import { Easing } from "react-native-reanimated";
import LoginScreen from "./src/components/LoginScreen";
import Chat from "./src/components/Chat";

const Tab = createMaterialTopTabNavigator();

const TabScreens = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 60,
          backgroundColor: "#075E54",
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>
          Whatsapp
        </Text>
        <Entypo name="dots-three-vertical" color={"#fff"} size={20} />
      </View>
      <Tab.Navigator
        tabBarOptions={{
          indicatorStyle: { backgroundColor: "#fff" },
          activeTintColor: "#fff",
          style: { elevation: 0, backgroundColor: "#075E54" },
          showIcon: true,
          labelStyle: { fontWeight: "bold" },
        }}
      >
        <Tab.Screen
          name="Camera"
          component={Cameras}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Entypo
                  name="camera"
                  color={color}
                  size={24}
                  style={{ alignSelf: "center" }}
                />
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Status" component={Status} />
        <Tab.Screen name="Calls" component={Calls} />
      </Tab.Navigator>
    </View>
  );
};
const configProps = {
  animation: "timing",
  config: {
    duration: 120,
    easing: Easing.linear,
  },
};
const Stack = createStackNavigator();
const Message = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Message" component={Chat} />
    </Stack.Navigator>
  );
};
const AppScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabScreens}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Modal"
        component={ConDisplays}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
          headerStyle: {
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  const [userIs, setUser] = React.useState({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    let userRef = firebase.database().ref().child("UsersStatus/");
    const isOfflineForDatabase = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const isOnlineForDatabase = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    firebase
      .database()
      .ref(".info/connected")
      .on("value", (snapshot) => {
        if (snapshot.val() === null) {
          return null;
        }
        userRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(() => {
            userRef.set(isOnlineForDatabase);
          });
      });
  }, []);
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#075E54" />
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Auth" component={LoginScreen} />
          <Stack.Screen name="App" component={AppScreens} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
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
