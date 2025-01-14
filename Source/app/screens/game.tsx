import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';

export default function GameScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Game Screen</ThemedText>
        <ThemedView style={styles.buttonsContainer}>
          <ThemedButton onPress={() => router.push("/screens/scorecard")} title="New Scorecard" />
          <ThemedButton onPress={() => router.push("/screens/records")} title="Records" />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100, 
  },
  buttonsContainer: { 
    marginTop: 400,
    marginBottom: 50,
  },
});
