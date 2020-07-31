import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "./config";
import { WebView } from "react-native-webview";
const { width, height } = Dimensions.get("window");
export default function App() {
  const [user, setUser] = React.useState("");
  const [data, setData] = React.useState([]);
  const [repo, setRepo] = React.useState([]);
  const getDetails = () => {
    axios
      .get("users/" + user)
      .then((user) => {
        setData(user.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    axios.get("users/gaearon/repos").then((response) => console.log(response));
  }, []);
  const getRepos = ({ item }) => {
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          backgroundColor: "#fff",
          borderRadius: 3,
          elevation: 3,
          padding: 10,
        }}
      >
        <Text style={{ color: "#000" }}>{item.name}</Text>
      </View>
    );
  };
  return (
    <LinearGradient colors={["#C33764", "#1D2671"]} style={styles.container}>
      <StatusBar backgroundColor="#1d2671" barStyle="light-content" />
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#ddd",
            fontWeight: "500",
            fontSize: 24,
          }}
        >
          Github
        </Text>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("./assets/logo.webp")}
            style={{
              width: null,
              height: null,
              backgroundColor: "#fff",
              flex: 1,
            }}
          />
        </View>
      </View>

      <TextInput
        placeholder="Enter User to see repos..."
        style={{
          padding: 10,
          borderBottomWidth: 2,
          borderBottomColor: "#fff",
          borderRadius: 6,
          alignSelf: "center",
          width: width - 40,
          fontSize: 20,
          marginTop: 30,
          color: "#ddd",
        }}
        value={user}
        onChangeText={(userName) => setUser(userName)}
        placeholderTextColor="#ddd"
        onSubmitEditing={getDetails}
      />
      {data && (
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            elevation: 5,
            backgroundColor: "#000",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              padding: 5,
              borderBottomWidth: 0.4,
              borderBottomColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              elevation: 2,
            }}
          >
            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 18 }}>
              {data.login}
            </Text>
            <Image
              source={{ uri: data.avatar_url }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
          <View
            style={{
              padding: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#ddd" }}>
              Followers :{" "}
              <Text style={{ color: "#fff" }}>{data.followers}</Text>
            </Text>
            <Text style={{ color: "#ddd" }}>
              Following: <Text style={{ color: "#fff" }}>{data.following}</Text>
            </Text>
          </View>
          {repo && (
            <FlatList
              data={repo}
              renderItem={getRepos}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
