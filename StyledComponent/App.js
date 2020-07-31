import React, { useEffect } from "react";
import styled from "styled-components";
import * as firebase from "firebase";
import { Button } from "react-native";
import { v4 as uuidv4 } from "uuid";
import shortID from "short-uuid";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyAp3WyUYJs0pTl1fjzjpT0r_vHFgpkGfVU",
  authDomain: "project-9783d.firebaseapp.com",
  databaseURL: "https://project-9783d.firebaseio.com",
  projectId: "project-9783d",
  storageBucket: "project-9783d.appspot.com",
  messagingSenderId: "133815889827",
  appId: "1:133815889827:web:8ef58ac834a08f0f5a7416",
  measurementId: "G-DEJZTY1170",
};

console.disableYellowBox = true;
const v4options = {
  random: [
    0x10,
    0x91,
    0x56,
    0xbe,
    0xc4,
    0xfb,
    0xc1,
    0xea,
    0x71,
    0xb4,
    0xef,
    0xe1,
    0x67,
    0x1c,
    0x58,
    0x36,
  ],
};
export default () => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);
  const storeButton = async () => {
    const ref = firebase.firestore().collection("User").doc("Images");

    try {
      for (let i = 0; i < 500; i++) {
        const vid = shortID.generate() + (Math.random() * 100 + 1).toString();
        await ref.set(
          {
            [vid]: vid,
          },
          { merge: true }
        );
      }
      console.log("Done Uploading");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView>
      <Container>
        <ImageContainer>
          <Avatar
            source={{
              uri:
                "https://images.unsplash.com/photo-1558980664-10e7170b5df9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            }}
          />
        </ImageContainer>

        <Name>Vaibhav</Name>
        <Button title="Store" onPress={storeButton} />
      </Container>
      <Container />
    </SafeAreaView>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
  margin-top: 24px;
`;
const Name = styled.Text`
  font-size: 25px;
  color: #bcbece;
  margin-top: 20px;
  font-weight: 700;
`;
const Avatar = styled.Image`
  width: null;
  height: null;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const ImageContainer = styled.View`
  flex: 1;

  overflow: hidden;
`;
