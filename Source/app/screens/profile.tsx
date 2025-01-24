import React from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile Screen</ThemedText>
        {/* UPDATE TO GET VALUES FROM DATABSE */}
        <ThemedView style={styles.avatarContainer}>
          <Image 
            source={require('../assets/images/profile.png')}  // Default profile picture
            style={styles.avatar}
          />
        </ThemedView>
        {/* UPDATE TO GET VALUES FROM DATABSE */}
        <ThemedText type="title" style={styles.name}>User Name</ThemedText>
        <ThemedText type="body" style={styles.email}>email@example.com</ThemedText>
        <ThemedText type="body" style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        </ThemedText>
        <ThemedView style={styles.divider}/> 
          <ThemedText type="profile">Friends</ThemedText> 
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,   
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 20,
  },  
});