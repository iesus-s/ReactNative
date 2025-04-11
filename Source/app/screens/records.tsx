import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomJwtPayload } from '../constants/jwtPayload';

// API URL
const API_URL = 'http://192.168.1.241'; 

export default function RecordsScreen() {
  // Initialize the router (for navigation) used to naviate between screens
  const router = useRouter();
  // Signed In User State variables
  const [creatorID, setCreatorID] = useState<string | null>(null);
  const [scorecards, setScorecards] = useState<any[]>([]);

  // Get the Signed In User ID from AsyncStorage
  // and fetch the scorecards from the API
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
  
  // Fetch the scorecards from the API using the creatorID
  useEffect(() => {
    const fetchScorecards = async () => {
      if (creatorID) {
        try { 
          const response = await fetch(`${API_URL}:3000/api/request/scorecards/user/${creatorID}`);
          const data = await response.json();
  
          if (response.ok) {
            setScorecards(data.Scorecards); 
            console.log("Scorecards data: ", data.Scorecards);  // Log the scorecards data for debugging
          } else {
            console.error('Failed to fetch scorecards');
          }
        } catch (error) {
          console.error("Error fetching scorecards:", error);
        }
      }
    };
    fetchScorecards();
  }, [creatorID]);
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {/* Title of the Screen */}
        <ThemedText type="title">Records Screen</ThemedText>
        {/* Populate Scorecards */}
        {scorecards.length > 0 ? (
          scorecards.map((scorecard) => (
            <TouchableOpacity 
              key={scorecard._id} 
              style={styles.scorecard} 
              onPress={() => router.push({ pathname: "/screens/picked_session", params: { scorecardID: scorecard._id } })}
            >
              <ThemedText style={styles.scorecardText}>Facility Name: {scorecard.course}</ThemedText>
              <ThemedText style={styles.scorecardText}>Players: {scorecard.players.join(', ')}</ThemedText>
              <ThemedText style={styles.scorecardText}>Date: {new Date(scorecard.date).toLocaleDateString()}</ThemedText>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText type="body">No scorecards found.</ThemedText>
        )}
        {/* Button to go back a Screen */}
        <ThemedButton onPress={router.back} title="Go Back" />
      </ThemedView>
    </ScrollView>
  );
}

// Styles
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
  scorecardText: {
    fontWeight: 'bold',
  },
});
