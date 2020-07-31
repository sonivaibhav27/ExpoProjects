import React from "react";
import { View, StyleSheet, TouchableHighlight, TouchableOpacity, Animated, Image } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

export default class AddButton extends React.Component {
 
    render() {
       

        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
                
                <TouchableOpacity style={[styles.button]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#7F58FF">
                        <View>
                        <Image style={{ width: 60, height: 60 }}
                                resizeMode="contain"
                                source={(require('../assets/post.png'))} />
                        </View>
                    </TouchableHighlight>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#DC143C",
        position: "absolute",
        marginTop: -60,
        shadowColor: "#7F58FF",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#7F58FF"
    }
});
