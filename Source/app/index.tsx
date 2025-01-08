import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { ThemedText } from './components/ThemedText';
import { ThemedView } from './components/ThemedView';

// LoadScreen (Golfbud)
export default function LoadScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/screens/home"); // Navigate to the HomeScreen after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Clean up the timer
  }, [router]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Golfbud</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
  }, 
});
