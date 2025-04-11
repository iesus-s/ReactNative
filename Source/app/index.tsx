import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { ThemedText } from './components/ThemedText';
import { ThemedView } from './components/ThemedView';

// LoadScreen (Golfbud)
export default function LoadScreen() {
  // Initialize the router (for navigation) used to naviate between screens
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Reroute to the HomeScreen after 2 seconds
      router.replace("/screens/home"); // Navigate to the HomeScreen after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Clean up the timer
  }, [router]);

  return ( 
    <ThemedView style={styles.container}>
      {/* Title of the Screen */}
      <ThemedText type="app" >Golfbud</ThemedText>
    </ThemedView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",  
  },  
});
