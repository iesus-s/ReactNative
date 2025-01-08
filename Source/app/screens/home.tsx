import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

import BottomNavigation from "../components/Navigation"; 


export default function HomeScreen() {
  return ( 
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home Screen</ThemedText>
    </ThemedView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  navBar: {
    height: 70,
  },
});
