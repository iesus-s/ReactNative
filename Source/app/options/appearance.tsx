import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 

export default function Appearance() {
  const router = useRouter();

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Appearance</ThemedText> 
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
});
