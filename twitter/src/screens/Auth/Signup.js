import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default class Signup extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Sign up></Text>
        <View>
          <Text style={{ color: "#999" }}>
            Phone number ,email address,or username
          </Text>
          <TextInput
            ref={(num) => (this.num = num)}
            style={{
              marginHorizontal: 20,
              paddingBottom: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: this.num.isFocused() ? "#00acee" : "#ddd",
            }}
          />
        </View>
        <View>
          <Text style={{ color: "#999" }}>Password</Text>
          <TextInput
            ref={(num2) => (this.num2 = num2)}
            style={{
              marginHorizontal: 20,
              paddingBottom: 3,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: this.num2.isFocused() ? "#00acee" : "#ddd",
            }}
          />
        </View>
        <Text>Forgotten your password?</Text>
      </View>
    );
  }
}
