import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: props.html_url }} />
    </View>
  );
};
