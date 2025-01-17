import React from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';

export default function ProfileScreen() {
  const router = useRouter(); 

  const renderGrid = () => {
    /////////////////////////// CHANGE TO TAKE ROW ,COLUMN AND NAMES FROM SCORECARD.TSX ///////////////////////////
    const rows = 16;
    const columns = 4;
    const columnNames = ["A", "B", "C", "D"];
    const grid = [];

    // Header row
    const headerRow = (
      <ThemedView key="header" style={styles.names}>
        {columnNames.map((name, index) => ( 
            <ThemedText key={index} style={styles.columnHeader}>{name}</ThemedText> 
        ))}
      </ThemedView>
    );
    grid.push(headerRow);

    // Input rows
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) { 
        row.push(
          <TextInput 
            key={`${i}-${j}`} 
            id={`${i}-${j}`} 
            style={styles.input} 
          />
        );
      }
      // Input columns
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
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
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