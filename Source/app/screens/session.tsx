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
  // Fetch the scorecard data
  useEffect(() => {
    const fetchScorecardData = async () => {
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

    fetchScorecardData();
    console.log("ID:", creatorID);
  }, []);

  useEffect(() => {
    const fetchScorecard = async () => {
      if (creatorID) {
        try {
          const response = await fetch(`http://localhost:3000/api/request/scorecards?creator=${creatorID}`);
          const data = await response.json();
          if (data && data.length > 0) {
            setScorecard(data[0]);  // Get the latest scorecard
          } else {
            console.error("No scorecard found for the given creator ID.");
          }
        } catch (error) {
          console.error("Error fetching scorecard data:", error);
        }
      }
    };

    fetchScorecard();
  }, [creatorID]);

  const renderGrid = () => {
    if (!scorecard) return null;

    const rows = scorecard.holeSelection || 9;  // Default to 16 if not found
    const columns = scorecard.players.length || 1;  // Default to 4 if no players
    const columnNames = scorecard.players || ["A", "B", "C", "D"];  // Use player names from scorecard

    const grid = [];

    // Header row
    const headerRow = (
      <ThemedView key="header" style={styles.names}>
        {columnNames.map((name: string, index: number) => ( 
        <ThemedText key={index} style={styles.columnHeader}>{name}</ThemedText> 
        ))}
      </ThemedView>
    );
    grid.push(headerRow);

    // Input rows based on holes
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(
          <TextInput 
            key={`${i}-${j}`} 
            id={`${i}-${j}`} 
            style={styles.input} 
            value={scorecard.scores[columnNames[j]]?.[`hole${i + 1}`] || ''}  // Set value from scorecard
          />
        );
      }
      // Row with hole number and inputs
      grid.push(
        <ThemedView key={i} style={styles.row}>
          <ThemedText style={styles.rowLabel}>{i + 1}</ThemedText>
          {row}
        </ThemedView>
      );
    }
    return grid;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Session Screen</ThemedText>
        <ThemedView style={styles.gridContainer}>
          {renderGrid()}
        </ThemedView>
        <ThemedButton onPress={() => router.push("/screens/game")} style={styles.goBack} title="Go Back" />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    paddingBottom: 70,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingLeft: 30,
    paddingRight: 50, 
  }, 
  names: { 
    flexDirection: 'row',  
    alignItems: 'center',  
    paddingLeft: 17,
  },
  columnHeader: { 
    margin: 4, 
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 23,
    paddingRight: 23,
  },
  rowLabel: {
    marginRight: 8,
    fontSize: 24,
    width: 30, 
    textAlign: 'right',
  },
  input: {
    flex: 1,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
  },
  goBack: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    marginTop: 50,
  },
});