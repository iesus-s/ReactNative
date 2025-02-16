import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'

export default function OptionsScreen() {
  const router = useRouter(); 

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Options</ThemedText>
        <ThemedView style={styles.listContainer}> 
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/options/profile_settings')}> 
              <ThemedText style={styles.optionTitle}>Profile Settings</ThemedText>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/options/notifications')}> 
              <ThemedText style={styles.optionTitle}>Notifications</ThemedText>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/options/privacy')}> 
              <ThemedText style={styles.optionTitle}>Privacy & Security</ThemedText>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/options/appearance')}> 
              <ThemedText style={styles.optionTitle}>Appearance</ThemedText>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.optionItem} onPress={() => router.push('/options/about')}> 
              <ThemedText style={styles.optionTitle}>About</ThemedText>
            </TouchableOpacity> 
        </ThemedView>
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
  listContainer: {
    width: '100%',
    marginTop: 20, 
  },
  optionTitle: {
    fontSize: 20, 
  },
  optionItem: {
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
  },
});