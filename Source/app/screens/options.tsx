import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

export default function OptionsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Options Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
