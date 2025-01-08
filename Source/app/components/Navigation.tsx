// components/BottomNavigation.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Import your screens
import HomeScreen from "../screens/home";
import GamesScreen from "../screens/game";
import StatsScreen from "../screens/stats";
import BetsScreen from "../screens/bets";
import OptionsScreen from "../screens/options";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <>
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
            headerShown: false, // Hide header on all screens
            }}
        >
            <Tab.Screen name="Games" component={HomeScreen} />
            <Tab.Screen name="Games" component={GamesScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
            <Tab.Screen name="Bets" component={BetsScreen} />
            <Tab.Screen name="Options" component={OptionsScreen} />
        </Tab.Navigator>
        </>
  );
}
