import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';

interface Scorecard {
  _id: string;
  date: string;
  players: string[];
  holeSelection: number;
  scores: { [key: string]: { [key: string]: string } };
  course?: string;  
}

const API_URL = 'http://192.168.5.34'; 

export default function PickedSession() {
  const router = useRouter(); 
  const { scorecardID } = useLocalSearchParams();
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);

  // Get the Scorecard Data from API
  useEffect(() => {
    const fetchScorecard = async () => {
      if (scorecardID) {
        try {
          const response = await fetch(`${API_URL}:3000/api/request/scorecards/${scorecardID}`);
          const data = await response.json(); 
          if (response.ok) {
            setScorecard(data);
            console.log(scorecard);
          } else {
            console.error("Error fetching scorecard data.");
          }
        } catch (error) {
          console.error("Error fetching scorecard data:", error);
        }
      }
    };
    fetchScorecard();
  }, [scorecardID]);

  // Handle input change for scores
  const handleInputChange = (player: string, hole: number, value: string) => {
    if (scorecard) {
      const updatedScores = { ...scorecard.scores };
      if (!updatedScores[player]) {
        updatedScores[player] = {};
      }
      updatedScores[player][`hole${hole}`] = value;

      setScorecard({
        ...scorecard,
        scores: updatedScores,
      });
    }
  };

  // Update Scorecard Data
    useEffect(() => {
      const updateScorecard = async () => { 
        if (scorecard) {
          try {
            const response = await fetch(`${API_URL}:3000/api/request/scorecards/user/update/${scorecardID}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(scorecard),
            });
            if (response.ok) {
              console.log("Scorecard updated successfully.");
            } else {
              console.error("Error updating scorecard.");
              console.log("Updated Scorecard: ", scorecard);
            }
          } catch (error) {
            console.error("Error updating scorecard:", error);
          }
        }
      };
      updateScorecard();
    }, [scorecard]); // Run when scorecard is updated

  const renderGrid = () => {
    if (!scorecard) return null;

    const rows = scorecard.players.length || 1;
    const columns = scorecard.holeSelection || 9;
    const rowNames = scorecard.players || ["A", "B", "C", "D"];
    const grid = [];

    // Header row
    const headerRow = (
      <ThemedView key="header" style={styles.number}>
        <ThemedView key="empty" style={styles.columnHeaderContainer} />
        {[...Array(columns)].map((_, index) => (
          <ThemedView key={index + 1} style={styles.columnHeaderContainer}>
            <ThemedText style={styles.columnHeader}>{index + 1}</ThemedText>
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
            style={styles.input}
            value={scorecard.scores[rowNames[i]]?.[`hole${j + 1}`] || ''}
            onChangeText={(text) => handleInputChange(rowNames[i], j + 1, text)}
            keyboardType="numeric"
          />
        );
      }
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
        <ThemedText style={styles.sessionTitles}>Course Name: {scorecard?.course || ""}</ThemedText>
        <ScrollView horizontal>
          <ThemedView style={styles.gridContainer}>{renderGrid()}</ThemedView>
        </ScrollView>
        <ThemedButton onPress={() => router.back()} style={styles.goBack} title="Go Back" />
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
    marginRight: 37,
  },
  number: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnHeaderContainer: {
    width: 60,
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
    width: 100,
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
