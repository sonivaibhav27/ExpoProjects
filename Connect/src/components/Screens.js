import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { Details } from "./PhoneAndName";
import Fire from "./Config";
import { FlatList } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
const { width, height } = Dimensions.get("window");
import { Camera } from "expo-camera";
import Toolbar from "./Camera/Toolbar";
import * as Permissions from "expo-permissions";
export class Cameras extends React.Component {
  camera = null;
  state = {
    cameraType: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.off,
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    videoStart: null,
  };
  handleImageClick = async () => {
    const image = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [image, ...this.state.captures],
    });
  };
  onLongCapture = async () => {
    const video = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [video, ...this.state.captures],
      videoStart: true,
    });
  };
  setFlashMode = (flashMode) => this.setState({ flash: flashMode });
  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }
  shortClick = () => {
    this.setState({ capturing: true });
  };
  setCameraType = (cameraType) => {
    this.setState({ cameraType });
  };
  showModal = (item) => {
    <View
      style={{
        ...StyleSheet.absoluteFill,
        bottom: 20,
        right: 20,
        left: 20,
        top: 20,
        height,
        width,
      }}
    >
      <View
        style={{
          width: width - 20,
          marginHorizontal: 10,
          height: height - 80,
          alignSelf: "center",
        }}
      >
        <Image
          source={{ uri: item.uri }}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
    </View>;
  };
  renderImages = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{ flex: 1, marginLeft: 4 }}
        onPress={this.showModal}
      >
        <View style={{ width: 70, height: 70 }}>
          <Image
            source={{ uri: item.uri }}
            style={{ flex: 1, width: null, height: null }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  stopVideo = async () => {
    if (this.state.capturing) {
      this.camera.stopRecording();
      this.setState({ videoStart: false });
    }
  };
  showVideo = () => {
    setTimeout(() => this.setState({ videoStart: false }), 1000);
  };
  render() {
    const { cameraType, flash, capturing, videoStart } = this.state;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Camera
          ref={(camera) => (this.camera = camera)}
          style={{ ...StyleSheet.absoluteFill, width, height }}
          type={cameraType}
          flashMode={flash}
        />

        <View
          style={{ position: "absolute", bottom: 100, left: 10, right: 10 }}
        >
          {this.state.captures.length < 1 ? null : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.captures}
              renderItem={this.renderImages}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        <View style={{ flex: 1, position: "absolute", bottom: 0 }}>
          <Toolbar
            setFlashMode={this.setFlashMode}
            handleImageClick={this.handleImageClick}
            flashMode={flash}
            capturing={capturing}
            shortCapture={this.shortClick}
            videoShoot={this.onLongCapture}
            stopVideo={this.stopVideo}
            videoStart={videoStart}
            cameraType={cameraType}
            setCameraType={this.setCameraType}
          />
        </View>
      </View>
    );
  }
}

export class Chats extends React.Component {
  state = {
    contacts: [],
    chats: [],
  };
  async requestContacts(navigate) {
    const that = this;
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      alert("We want to access your contacts");
    } else {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.PhoneNumbers,
        ],
      });
      if (data.length > 0) {
        this.setState({ contacts: data });
        navigate("Modal", { contacts: this.state.contacts });
      } else {
        alert("You dont have contacts");
      }
    }
  }
  componentDidMount() {
    Fire.shared.ref
      .child("users/")
      .child(Details.phone)
      .on("child_added", (snapshot) => {
        this.setState((prevState) => {
          return {
            chats: [...prevState.chats, snapshot.val()],
          };
        });
      });
  }
  renderChats = ({ item }) => {
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
            contacts: "343243",
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
              A
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
            {item.contacts}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.chats.length > 0 ? (
          <FlatList
            style={{
              position: "absolute",
              bottom: 50,
              top: 0,
              right: 0,
              left: 0,
              backgroundColor: "#f4f5f7",
              paddingVertical: 20,
            }}
            data={this.state.chats}
            renderItem={this.renderChats}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: "#128C7E",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => this.requestContacts(navigate)}
        >
          <Feather name="phone-call" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}
export class Status extends React.Component {
  state = {
    image: null,
    view: 0,
    url: "",
    friendsStatus: [],
  };
  // openGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 200,
  //     height: 200,
  //     cropping: true,
  //     cropperTintColor: "#40a0a8",
  //     cropperCircleOverlay: true,
  //     cropperToolbarTitle: "Get Photos",
  //     cropperStatusBarColor: "pink",
  //   })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  openGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        const image = await fetch(result.uri);

        const convertToBlob = await image.blob();

        const gettingUploaded = await firebase
          .storage()
          .ref(`${Details.phone}`)
          .child("status")
          .put(convertToBlob);
        gettingUploaded.on(
          "state_changed",
          this.progress,
          this.error,
          function () {
            alert("Successfully Saved!");
          }
        );
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  progress = (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
  };
  complete = () => {};
  error = (err) => {
    console.log(err);
  };

  call = () => {
    firebase
      .storage()
      .ref(Details.phone)
      .child("status")
      .getDownloadURL()
      .then((url) => {
        this.setState({ url });
      })
      .catch((e) => console.log(e));
  };
  componentWillUpdate() {
    this.call();
  }
  async componentWillMount() {
    this.call();
    firebase
      .storage()
      .ref()
      .listAll()
      .then((results) => {
        console.log(results.items);
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          {!this.state.image && !this.state.url ? (
            <TouchableOpacity
              onPress={this.openGallery}
              style={{
                flexDirection: "row",
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#ccc",
                padding: 5,
              }}
            >
              <View>
                <Image
                  source={require("../../assets/ws.png")}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                  }}
                />
              </View>
              <Text
                style={{ alignSelf: "center", fontSize: 20, marginLeft: 20 }}
              >
                Upload Photos
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              // onLayout={this.call}
              onPress={this.openGallery}
              style={{
                flexDirection: "row",
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#ccc",
                padding: 5,
              }}
            >
              <View>
                <View
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 65 / 2,
                    borderWidth: 2,
                    borderColor: "#ccc",
                    padding: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: this.state.url }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 60 / 2,
                    }}
                  />
                </View>
              </View>
              <View style={{ justifyContent: "space-evenly" }}>
                <Text style={{ fontSize: 20, marginLeft: 20 }}>My Status</Text>
                <Text style={{ fontSize: 14, marginLeft: 20, color: "#999" }}>
                  Tap to see status
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {this.state.friendsStatus.length == 0 ? null : (
          <View>
            <View
              style={{
                backgroundColor: "#ccc",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#999" }}>Status</Text>
            </View>
            <FlatList
              data={this.state.friendsStatus}
              renderItem={this.showStatus}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  }
}
export const Calls = () => {
  return (
    <View style={styles.container}>
      <Text>Calls!!</Text>
    </View>
  );
};
export const Hey = () => {
  return (
    <View style={styles.container}>
      <Text>Calls!!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
