import React from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import Fire from "./Config";
import { Details } from "./PhoneAndName";
const { width, height } = Dimensions.get("window");
import firebase from "firebase";
export default class Chat extends React.Component {
  state = {
    message: "",
    allMessages: [],
    height: 0,
    online: null,
  };
  converTime(time) {
    let date = new Date(time);
    let result = (date.getHours < 10 ? "0" : "") + date.getHours() + ":";
    result += date.getMinutes < 10 ? "0" : "" + date.getMinutes();
    return result;
  }
  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("UsersStatus/")
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        this.setState({ online: snapshot.val() });
      });

    let isChild;
    const { firstName } = this.props.route.params;
    this.props.navigation.setOptions({ title: firstName });
    let refR = Fire.shared.ref.child("Messages/");
    refR.on("child_added", (snapshot) => {
      isChild = snapshot.hasChild(
        `${Details.phone}${this.props.route.params.contacts}`
      );
    });
    if (isChild) {
      refR
        .child(`${Details.phone}${this.props.route.params.contacts}`)
        .on("child_added", (snapshot) => {
          console.log(snapshot.val());
          this.setState((prevState) => ({
            allMessages: [...prevState.allMessages, snapshot.val()],
          }));
        });
    } else {
      refR
        .child(`${this.props.route.params.contacts}${Details.phone}`)
        .on("child_added", (snapshot) => {
          this.setState((prevState) => ({
            allMessages: [...prevState.allMessages, snapshot.val()],
          }));
        });
    }
  }

  // Don't use value, in on..as it will return the push key also
  sendMessage = () => {
    let isRefPresent;
    let ref = Fire.shared.ref.child("Messages/");

    ref.once("value", (snapshot) => {
      isRefPresent = snapshot.hasChild(
        `${Details.phone}${this.props.route.params.contacts}`
      );
    });
    if (isRefPresent) {
      ref.child(`${Details.phone}${this.props.route.params.contacts}`).push(
        {
          to: this.props.route.params.firstName,
          message: this.state.message,
          from: Details.name,

          fromPhone: Details.phone,
        },
        (err) => {
          if (err) alert(`Can't able to send messsage`);
          else {
            this.setState({ message: "" });
          }
        }
      );
    } else {
      ref.child(`${this.props.route.params.contacts}${Details.phone}`).push(
        {
          to: this.props.route.params.firstName,
          message: this.state.message,
          from: Details.name,

          fromPhone: Details.phone,
        },
        (err) => {
          if (err) alert(`Can't able to send messsage`);
          else {
            this.setState({ message: "" });
            const { firstName, contacts } = this.props.route.params;

            Fire.shared.ref
              .child("users/")
              .child(`${Details.phone}/`)
              .child(contacts)
              .set({ contacts: firstName });
          }
        }
      );
    }
  };
  // .hasChild("")
  // .push(
  //   {
  //     to: this.props.route.params.firstName,
  //     message: this.state.message,
  //     from: Details.name,

  //     fromPhone: Details.phone,
  //   },
  //   (err) => {
  //     if (err) alert(`Can't able to send messsage`);
  //     else {
  //       this.setState({ message: "" });
  //       const { firstName, contacts } = this.props.route.params;

  //       Fire.shared.ref
  //         .child("users/")
  //         .child(`${Details.phone}/`)
  //         .child(contacts)
  //         .set({ contacts: firstName });
  //     }
  //   }
  // );

  renderMessages = ({ item }) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
        <View
          onLayout={(e) =>
            this.setState({ height: e.nativeEvent.layout.height })
          }
          style={{
            alignSelf: Details.name === item.from ? "flex-end" : "flex-start",
            backgroundColor: Details.name === item.from ? "#fff" : "#075E54",

            padding: 10,
            borderRadius: 10,
            maxWidth: width / 1.3,
          }}
        >
          <Text style={{ color: Details.name === item.from ? "#000" : "#fff" }}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    console.log("Data", this.state.online);
    return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        {this.state.online ? (
          this.state.online.state === "online" ? (
            <View style={{ position: "absolute", right: 10, top: 20 }}>
              <Text style={{ fontSize: 24, color: "green" }}>
                .{" "}
                <Text style={{ fontSize: 16, color: "#000" }}>
                  {this.state.online.state}
                </Text>
              </Text>
            </View>
          ) : (
            <View style={{ position: "absolute", right: 10, top: 20 }}>
              <Text style={{ fontSize: 24, color: "green" }}>
                .{" "}
                <Text style={{ fontSize: 16, color: "#000" }}>
                  {this.converTime(this.state.online.last_changed)}
                </Text>
              </Text>
            </View>
          )
        ) : null}
        {this.state.allMessages.length > 0 ? (
          <FlatList
            ref={(flat) => (this.flat = flat)}
            onContentSizeChange={(width, height) =>
              this.flat.scrollToEnd({ animated: true })
            }
            style={{
              backgroundColor: "#f4f5f7",
              paddingVertical: 20,
              bottom: 10,
              height: height,
              position: "absolute",
              left: 0,
              right: 0,
            }}
            contentContainerStyle={{ paddingBottom: 30 }}
            data={this.state.allMessages}
            renderItem={this.renderMessages}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            style={{
              height: 40,
              borderWidth: 0.8,
              borderColor: "#ddd",
              borderRadius: 20,
              width: "70%",
              padding: 10,
              backgroundColor: "#fff",
              marginBottom: 20,
            }}
            onChangeText={(message) => this.setState({ message })}
            value={this.state.message}
            placeholder="Enter Message ...."
          />
          <TouchableOpacity
            onPress={this.sendMessage}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#075E54",
              width: "20%",
              marginLeft: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
