import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomJwtPayload } from '../constants/jwtPayload';

export default function ProfileScreen() {
  const router = useRouter(); 
  const [scorecard, setScorecard] = useState<any>(null);
  const [creatorID, setCreatorID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<CustomJwtPayload>(token); 
          setCreatorID(decoded._id);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchScorecard = async () => {
      if (creatorID) {
        try {
          const response = await fetch(`http://192.168.1.241:3000/api/request/scorecards/user/${creatorID}`);
          const data = await response.json();
          if (response.ok) {  
            setScorecard(data[data.length - 1]);  // Get the latest scorecard (might need fixing)
            console.log(data[data.length - 1]);
          } else {
            console.error("No scorecard found for the given creator ID.");
          }
        } catch (error) {
          console.error("Error fetching scorecard data:", error);
        }
      }
    };

    fetchScorecard();
  }, [creatorID]); // Run when creatorID is updated

  const renderGrid = () => {
    if (!scorecard) return null;

    const rows = scorecard.players.length || 1;  // Default to 1 if no players
    const columns = (scorecard.holeSelection + 1) * 9 || 9;  // Default to 9 if not found
    const rowNames = scorecard.players || ["A", "B", "C", "D"];  // Use player names from scorecard
    const grid = [];

    // Header row
    const headerRow = (
      <ThemedView key="header" style={styles.number}>
        {/* Empty first column for spacing */}
        <ThemedView key="empty" style={styles.columnHeaderContainer} />
    
        {/* Numbered columns start from 1 */}
        {[...Array(columns)].map((_, index) => (
          <ThemedView key={index + 1} style={styles.columnHeaderContainer}>
            <ThemedText style={styles.columnHeader}>{index + 1}</ThemedText> {/* Starts at 1 */}
          </ThemedView>
        ))}
      </ThemedView>
    );
    grid.push(headerRow);

    // Input columns based on players
    for (let i = 0; i < rows; i++) {
      const column = [];
      for (let j = 0; j < columns; j++) {
        column.push(
          <TextInput
            key={`${i}-${j}`}
            id={`${i}-${j}`}
            style={styles.input}
            value={scorecard.scores[rowNames[i]]?.[`hole${j + 1}`] || ''}  // Set value from scorecard
          />
        );
      }
      // Column with player name and inputs
      grid.push(
        <ThemedView key={i} style={styles.row}>
          <ThemedText style={styles.rowLabel}>{rowNames[i]}</ThemedText>
          {column}
        </ThemedView>
      );
    }
    return grid;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Session Screen</ThemedText>
        {/* Course Name Section */}
        <ThemedText style={styles.sessionTitles}>Course Name: {scorecard?.course || ""}</ThemedText>
        <ScrollView horizontal>
          <ThemedView style={styles.gridContainer}>
            {renderGrid()}
          </ThemedView>
        </ScrollView>
        <ThemedButton onPress={() => router.push("/screens/game")} style={styles.goBack} title="Go Back" />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    paddingBottom: 70,
    paddingTop: 0,
  },
  sessionTitles: {
    alignItems: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold',
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',  
  }, 
  number: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',   
  },
  columnHeaderContainer: {  
    width: 60,   
    color: 'white',    
    margin: 4,  
    justifyContent: 'center',
    alignItems: 'center', 
  },
  columnHeader: {  
    fontWeight: 'bold',
    fontSize: 24,   
    textAlign: 'center',
  },
  rowLabel: {
    marginRight: 8,
    fontSize: 24,
    width: 80, 
    textAlign: 'left', 
  },
  input: {
    width: 60,  
    height: 60,  
    textAlign: 'center',
    fontSize: 32,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'white',
  },
  goBack: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    marginTop: 50,
  },
});