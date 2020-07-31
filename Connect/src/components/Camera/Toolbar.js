import React, { Component } from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
const { width } = Dimensions.get("window");
const { FlashMode, Type } = Camera.Constants;
export default ({
  handleImageClick,
  flashMode,
  setFlashMode,
  capturing,
  shortCapture,
  videoShoot,
  stopVideo,
  videoStart,
  cameraType,
  setCameraType,
}) => {
  return (
    <View
      style={{
        bottom: 0,
        width,
        height: 100,
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.on ? FlashMode.off : FlashMode.on
            )
          }
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name={flashMode === FlashMode.on ? "md-flash" : "md-flash-off"}
            color="#fff"
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressIn={shortCapture}
          onPress={handleImageClick}
          onLongPress={videoShoot}
          onPressOut={stopVideo}
          style={[
            {
              width: 60,
              height: 60,
              borderWidth: 2,
              borderColor: "#000",
              borderRadius: 30,
              backgroundColor: "#fff",
            },
            capturing && {
              width: 80,
              height: 80,
              borderRadius: 40,
            },
          ]}
        >
          {capturing && (
            <View
              style={{
                width: 76,
                height: 76,
                borderWidth: 2,
                borderRadius: 76,
                backgroundColor: "red",
                borderColor: "transparent",
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setCameraType(cameraType === Type.back ? Type.front : Type.back)
          }
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="md-reverse-camera" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
