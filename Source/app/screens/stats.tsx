import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

export default function StatsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Stats Screen</ThemedText>
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
