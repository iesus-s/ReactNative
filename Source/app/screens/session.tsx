import React from 'react';
import { StyleSheet, ScrollView, View, TextInputProps } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import ThemedTextInput from '../components/ThemedTextInput';  

export default function ProfileScreen() {
  const router = useRouter(); 

  const renderGrid = () => {
    const rows = 16;
    const columns = 4;
    const columnNames = ["Name 1", "Name 2", "Name 3", "Name 4"];
    const grid = [];

    // Header row
    const headerRow = (
      <ThemedView key="header" style={styles.row}>
        <ThemedText style={styles.rowLabel}></ThemedText> {/* Empty cell for alignment */}
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
          <ThemedTextInput 
            key={`${i}-${j}`} 
            id={`${i}-${j}`} 
            style={styles.input} 
          />
        );
      }
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
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingLeft: 20,
    paddingRight: 50,
  },
  rowLabel: {
    marginRight: 8,
    fontSize: 16,
    width: 30,
  },
  columnHeader: {
    flex: 1,
    margin: 4,
    padding: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    margin: 4,
    padding: 8,
    borderWidth: 1,
    width: 60,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});