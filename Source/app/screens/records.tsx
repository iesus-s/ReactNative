import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomJwtPayload } from '../constants/jwtPayload';

export default function RecordsScreen() {
  const router = useRouter();
  const [creatorID, setCreatorID] = useState<string | null>(null);
  const [scorecards, setScorecards] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<CustomJwtPayload>(token); 
          setCreatorID(decoded.username);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    fetchUserData();
  }, []);
  
  // Fetch scorecards **only when creatorID is available**
  useEffect(() => {
    const fetchScorecards = async () => {
      if (creatorID) {
        try { 
          const response = await fetch(`http://192.168.5.34:3000/api/request/scorecards/user/${creatorID}`);
          const data = await response.json();
  
          if (response.ok) {
            setScorecards(data);
          } else {
            console.error('Failed to fetch scorecards');
          }
        } catch (error) {
          console.error("Error fetching scorecards:", error);
        }
      }
    };
    fetchScorecards();
  }, [creatorID]); // Run when creatorID is updated
  

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Records Screen</ThemedText>
        {scorecards.length > 0 ? (
          scorecards.map((scorecard, index) => (
            <TouchableOpacity key={index} style={styles.scorecard}>
              <ThemedText type="body">Facility Name: {scorecard.course}</ThemedText>
              <ThemedText type="body">Date: {new Date(scorecard.date).toLocaleDateString()}</ThemedText>
              <ThemedText type="body">Players: {scorecard.players.join(', ')}</ThemedText>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText type="body">No scorecards found.</ThemedText>
        )}
        <ThemedButton onPress={router.back} title="Go Back" />
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
  scorecard: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '90%',
  },
});