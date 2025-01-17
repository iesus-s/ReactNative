import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';

const toggleTheme = () => {
  // Sign-in logic here (MISSING) 
};

export default function OptionsScreen() {
  const router = useRouter();

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Options Screen</ThemedText> 
      </ThemedView>
      <ThemedView style={styles.container}> 
        <ThemedButton onPress={toggleTheme} title="Switch Theme"/>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
