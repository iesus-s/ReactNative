import React, { useEffect, useState } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native"; 

import { useColorScheme as useRNColorScheme } from "react-native";
import { ThemedView } from "./components/ThemedView";
import { ThemedText } from "./components/ThemedText";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Initialize the router (for navigation) used to naviate between screens
  const router = useRouter();  
  // Get the color scheme from the device
  const colorScheme = useRNColorScheme();
  // Load custom fonts
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      // Delay showing the navigation bar
      const timer = setTimeout(() => {
        setShowNavBar(true);
      }, 2000); // Delay duration (2 seconds)

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return ( 
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> 
      <ThemedView style={styles.container}>
        {/* Navigation Stack */}
        <ThemedView style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="screens/home" options={{ headerShown: false }} />
            <Stack.Screen name="screens/profile" options={{ headerShown: false }} />
            <Stack.Screen name="screens/options" options={{ headerShown: false }} />
          </Stack>
        </ThemedView>

        {/* Bottom Navigation Bar */}
        {showNavBar && ( // Only render the navigation bar after the delay
          <ThemedView style={styles.navBar}>
            <TouchableOpacity  style={styles.navItem} onPress={() => router.push("/screens/home")}>
              <ThemedText type="nav">Home</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/screens/game")}>
              <ThemedText type="nav">Game</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/screens/profile")}>
              <ThemedText type="nav">Profile</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/screens/bets")}>
              <ThemedText type="nav">Bets</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push("/screens/options")}>
              <ThemedText type="nav">Options</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        {/* Status Bar */}
        <StatusBar style="auto" />
      </ThemedView> 
    </ThemeProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
});
