import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Clipboard,
  TouchableNativeFeedback,
  TextInput,
  Button,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import Animated, { Easing, Clock } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
const year = [];
function fillYear() {
  for (let i = 18; i <= 100; i++) year.push(i);
  return year;
}
const regrex = /^(1[0-2]|[1-9])$/;
//2020 - 1900

//20[0-2][0-9]
const Range = /^(19[0-8][0-9]|199[0-9]|20[01][0-9]|2020)$/;
const {
  block,
  set,
  cond,
  and,
  greaterThan,
  eq,
  Value,
  clockRunning,
  startClock,
  timing,
  stopClock,
  debug,
  spring,
} = Animated;
function runSpring(clock, value, velocity, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 3,
    mass: 1,
    stiffness: 50.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}
const rotatedWidth =
  width * Math.sin((75 * Math.PI) / 180) +
  height * Math.sin((15 * Math.PI) / 180);
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "",
    };
    this.state = new Animated.Value(State.UNDETERMINED);
    this.translationX = new Animated.Value(0);
    this.translationY = new Animated.Value(0);
    this.velocityX = new Animated.Value(0);
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            state: this.state,
            translationX: this.translationX,
            translationY: this.translationY,
            velocityX: this.velocityX,
          },
        },
      ],
      { useNativeDriver: true }
    );
    const snapPoints = cond(
      and(greaterThan(this.translationX, 0), greaterThan(this.velocityX, 0)),
      rotatedWidth,
      0
    );
    this.translateX = cond(
      eq(this.state, State.END),
      [
        set(
          this.translationX,
          runSpring(new Clock(), this.translationX, this.velocityX, snapPoints)
        ),
        this.translationX,
      ],
      this.translationX
    );
  }

  render() {
    const { translateX, onGestureEvent } = this;
    const rotate = Animated.interpolate(translateX, {
      inputRange: [0, width / 4],
      outputRange: [0, 10],
      extrapolateLeft: Animated.Extrapolate.CLAMP,
    });
    return (
      <View style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}
        >
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                marginHorizontal: 20,
                height: height * 0.8,
                backgroundColor: "#18a098",

                borderRadius: 10,
                elevation: 3,
                marginTop: 50,
                alignSelf: "center",
                position: "relative",
                transform: [
                  { translateX: translateX },
                  { rotateZ: Animated.concat(rotate, "deg") },
                ],
              }}
            >
              <View
                style={{
                  marginTop: 30,
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 22, color: "#fff" }}>
                  hey vaibhav, what's your age?
                </Text>
              </View>
              <Text
                style={{
                  marginHorizontal: 20,
                  color: "white",
                  top: 20,
                  fontSize: 14,
                }}
              >
                we need only your actual age , not your date of birth ❤️
              </Text>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "white",
                      borderWidth: 5,
                      marginBottom: 20,
                      color: "#fff",
                      fontSize: 20,
                      paddingHorizontal: 10,
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                    value={this.state.language}
                    keyboardType="number-pad"
                    onChangeText={(e) => this.setState({ language: e })}
                    maxLength={2}
                    selectionColor="#fff"
                  />

                  <View
                    style={{
                      borderRadius: 3,
                    }}
                  >
                    <TouchableNativeFeedback>
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#fff",
                          borderRadius: 3,
                          alignItems: "center",
                          elevation: 2,
                          width: width - 80,
                        }}
                      >
                        <Text>Continue</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
