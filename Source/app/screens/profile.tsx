import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, View } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { CustomJwtPayload } from '../constants/jwtPayload';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "Guest",
    email: "guest@example.com",
    bio: "No bio available.",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<CustomJwtPayload>(token); // Cast the decoded token
          setUserData({
            username: decoded.username || "Unknown User",
            email: decoded.email || "No email provided",
            bio: decoded.bio || "No bio available.",
          });
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile Screen</ThemedText>
        <ThemedView style={styles.avatarContainer}>
          <Image 
            source={require('../assets/images/profile.png')}
            style={styles.avatar}
          />
        </ThemedView>
        <ThemedText type="title" style={styles.name}>{userData.username}</ThemedText>
        <ThemedText type="body" style={styles.email}>{userData.email}</ThemedText>
        <ThemedText type="body" style={styles.bio}>{userData.bio}</ThemedText>
        <ThemedView style={styles.divider}/> 
        <ThemedText type="profile">Friends</ThemedText> 
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,  
    padding: 16 
  },
  avatarContainer: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 16 
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  email: { 
    fontSize: 16, 
    color: 'gray', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  bio: { 
    fontSize: 16, 
    textAlign: 'center', 
    paddingHorizontal: 16 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#ccc', 
    width: '100%', 
    marginVertical: 20 
  },
});
