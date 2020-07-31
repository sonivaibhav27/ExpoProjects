import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import AddButton from "./components/AddButton";
import Home from "./screens/HomeScreen";
import Favorite from "./screens/FavoriteScreen";
import Messages from "./screens/MessagesScreen";
import Profile from "./screens/ProfileScreen";
import Post from "./screens/PostScreen";



const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="home" size={24} color="#CDCCCE" />
            }
        },
        Favorite: {
            screen: Favorite,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="star" size={24} color="#CDCCCE" />
            }
        },
        Ad: {
            screen: Post,
            navigationOptions: {
                tabBarIcon: <AddButton />,
                showLabel:false
            },
            
              tabBarOptions: {
                  showLabel: false
              },
              
               
          
        },
        Messages: {
            screen:Messages,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="comments" size={24} color="#CDCCCE" />
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="user" size={24} color="#CDCCCE" />
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: true
        }
    }
);

export default createAppContainer(TabNavigator);
