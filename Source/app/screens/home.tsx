import React, { useState } from 'react';
import { StyleSheet, Modal, ScrollView } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput';  

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');  

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleCreateModal = () => setCreateModalVisible(!isCreateModalVisible);


  const handleSignIn = () => {
    // Sign-in logic here (MISSING)
    console.log('Email:', email);
    console.log('Password:', password); 
    toggleModal();
  };

  const handleCreateAccount = () => {
    // Sign-in logic here (MISSING)
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Re-type Password:', retypePassword);
    toggleCreateModal();
  }; 
  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Home Screen</ThemedText>  
        <ThemedView style={styles.buttonsContainer}>
          <ThemedButton onPress={toggleModal} title="Sign In" /> 
          <ThemedButton onPress={toggleCreateModal} title="Create Account" /> 
        </ThemedView>

        {/* Modals */}
        <Modal visible={isModalVisible} transparent animationType="fade" 
                onRequestClose={toggleModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText type="request" style={styles.modalTitle}>Sign In</ThemedText>
              <ThemedTextInput placeholder="Email" value={email}
                onChangeText={setEmail} />
              <ThemedTextInput placeholder="Password" value={password}
                onChangeText={setPassword} secureTextEntry/>
              
              {/* Container for buttons to center them */}
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={handleSignIn} title="Submit" />
                <ThemedButton onPress={toggleModal} title="Cancel" />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal> 
        <Modal visible={isCreateModalVisible} transparent animationType="fade" 
                onRequestClose={toggleModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText type="request" style={styles.modalTitle}>Create Account</ThemedText>
              <ThemedTextInput placeholder="Email" value={email}
                onChangeText={setEmail} />
              <ThemedTextInput placeholder="Password" value={password}
                onChangeText={setPassword} secureTextEntry/>
                <ThemedTextInput placeholder="Re-type Password" value={retypePassword}
                onChangeText={setRetypePassword} secureTextEntry/>
              
              {/* Container for buttons to center them */}
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={handleCreateAccount } title="Submit" />
                <ThemedButton onPress={toggleCreateModal} title="Cancel" />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal> 
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
  buttonsContainer: { 
    marginTop: 400,
    marginBottom: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 400,
    padding: 20,
    borderRadius: 10, 
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  
    marginTop: 20,  
  },
});
