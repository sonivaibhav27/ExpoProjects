import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Fire from "./Config";
import { Details } from "./PhoneAndName";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      name: "",
      user: null,
    };
  }

  signIn = () => {
    (Details.phone = this.state.phone), (Details.name = this.state.name);
    Fire.shared
      .signInAnonmously()
      .then((user) => {
        Fire.shared.ref.child(Fire.shared.UID).set(this.state.phone, (err) => {
          if (err) {
            ToastAndroid.showWithGravityAndOffset(
              "Something went wrong",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          } else {
            ToastAndroid.showWithGravityAndOffset(
              "GO Ahead , Use our App!",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
        });
        this.setState({ user });
        this.props.navigation.navigate("App", {
          phoneNumber: this.state.phone,
        });
      })
      .catch((err) => {
        alert("Something went Wrong");
      });
  };
  render() {
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 30 }}>Enter your Phone</Text>
        </View>

        <TextInput
          style={{
            alignSelf: "center",
            borderBottomWidth: 1,
            borderBottomColor: "purple",
            padding: 10,
            fontSize: 18,
            marginTop: 30,
          }}
          placeholder="Enter Your Name"
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          style={{
            padding: 10,
            height: 70,
            borderWidth: 0.5,
            borderColor: "#DDD",
            borderRadius: 8,
            marginTop: 30,
            fontSize: 23,
          }}
          keyboardType="numeric"
          onChangeText={(phone) => this.setState({ phone })}
          value={this.state.phone}
        />
        <TouchableOpacity
          onPress={this.signIn}
          activeOpacity={1}
          style={{
            padding: 20,
            backgroundColor: "#40a0a8",
            borderRadius: 8,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 25 }}>Go..</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
