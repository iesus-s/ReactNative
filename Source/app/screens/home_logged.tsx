import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText'; 
import { ThemedButton } from '../components/ThemedButton';

export default function LoggedInHome() {
    // Initialize the router (for navigation) used to naviate between screens
    const router = useRouter(); 
    const toggleModal = () => setModalVisible(!isModalVisible);
    const [isModalVisible, setModalVisible] = useState(false);

    return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {/* Title of the Screen */}
        <ThemedText type="title">Logged In</ThemedText> 
        {/* Button to Log Out the User */}
        <ThemedButton onPress={toggleModal} title="Log Out" /> 
      </ThemedView>
    </ScrollView>
    );
}

// Syling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
