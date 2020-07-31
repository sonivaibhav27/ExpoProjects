import React, { createContext } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SliderComponent,
} from "react-native";
import Fire from "./Config";
import { AntDesign } from "@expo/vector-icons";

export default class ConDisplays extends React.Component {
  state = {
    userContacts: [],
    loading: true,
  };
  componentDidMount() {
    this.arrNew = [];
    const arr = [];
    Fire.shared.ref.on("value", (snapshot) => {
      let snap = snapshot.val();
      for (let obj in snap) {
        if (snap[obj]) arr.push(snap[obj]);
      }
    });

    this.arrNew = this.state.userContacts.concat(arr);
    this.setState((prevState) => ({
      userContacts: this.arrNew,
      loading: !prevState.loading,
    }));
  }

  renderContacts = (item) => {
    let newNumber;
    let replace;
    let spliceString;
    const { userContacts } = this.state;
    if (item.phoneNumbers) {
      replace = item.phoneNumbers[0].number.replace(/\s+/g, "").trim();

      if (
        item.phoneNumbers[0].number.startsWith("+91") ||
        item.phoneNumbers[0].number.startsWith("022")
      ) {
        spliceString = replace.slice(3);

        if (userContacts.includes(spliceString)) {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                borderBottomWidth: StyleSheet.hairlineWidth,
                padding: 10,
                borderColor: "#ddd",
              }}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  contacts: spliceString,
                  firstName: item.firstName,
                })
              }
            >
              <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#40a0a8",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {item.firstName.charAt(0)}
                  </Text>
                </View>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    alignSelf: "center",
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {item.firstName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      } else if (
        !item.phoneNumbers[0].number.startsWith("+91") &&
        !item.phoneNumbers[0].number.startsWith("022")
      ) {
        if (userContacts.includes(replace)) {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  contacts: replace,
                  firstName: item.firstName,
                })
              }
              style={{
                flex: 1,
                borderBottomWidth: StyleSheet.hairlineWidth,
                padding: 10,
                borderColor: "#ddd",
              }}
            >
              <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#40a0a8",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {item.firstName.charAt(0)}
                  </Text>
                </View>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    alignSelf: "center",
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                >
                  {item.firstName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
      }
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#40a0a8" />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              height: 50,
              elevation: 1,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#ddd",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Tabs")}
            >
              <AntDesign name="arrowleft" size={25} color={"#999"} />
            </TouchableOpacity>

            <TextInput
              style={{
                width: "90%",
                fontSize: 20,
                marginLeft: 20,
                alignSelf: "center",
              }}
            />
          </View>

          <FlatList
            style={{ flex: 1 }}
            showsVerticalScrollIndicator
            scrollEventThrottle={16}
            data={this.props.route.params.contacts}
            renderItem={({ item }) => this.renderContacts(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }
  }
}
