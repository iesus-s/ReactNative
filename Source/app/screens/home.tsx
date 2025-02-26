import React, { useState } from 'react';
import { StyleSheet, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput';    

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [fullName, setFullName]= useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUser] = useState(''); 
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');   

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleCreateModal = () => setCreateModalVisible(!isCreateModalVisible);
  const toggleMessageModal = () => setMessageModalVisible(!isMessageModalVisible);

  const handleSignIn = async () => {
    if (!username) {
      setMessage('Missing Username!');
      toggleMessageModal();
      return;
    }
    else if (!password) {
      setMessage('Missing Password!');
      toggleMessageModal();
      return;
    }
    else try {
      const response = await fetch('http://192.168.5.34:3000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token); // Save token
        toggleModal();
        setMessage('Signed In!');
      } else {
        setMessage('Wrong Username or Password!');
      }
      toggleMessageModal();
    } catch (error) {  
      setMessage('Failed to Sign In. Please try again later.');
      toggleMessageModal();
    }
  };

  // Create Account Logic
const handleCreateAccount = async () => {
  if (!fullName) {
    setMessage("Missing Full Name!");
    toggleMessageModal();
    return;
  }
  if (!username) {
    setMessage("Missing Username!");
    toggleMessageModal();
    return;
  }
  if (!email) {
    setMessage("Missing Email!");
    toggleMessageModal();
    return;
  }
  if (!password || !retypePassword) {
    setMessage("Missing Password!");
    toggleMessageModal();
    return;
  } else if (password !== retypePassword) {
    setMessage("Passwords Do Not Match!");
    toggleMessageModal();
    return;
  }

  try {
    // Check if username is already taken
    const response = await fetch("http://192.168.5.34:3000/api/request/users");
    const users = await response.json();

    if (users && users.some((user: { username: string }) => user.username === username)) {
      setMessage("Username is already taken!");
      toggleMessageModal();
      return;
    }

    const createResponse = await fetch("http://192.168.5.34:3000/api/request/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        username,
        email,
        phoneNumber,
        password,
      }),
    });

    const data = await createResponse.json();

    if (createResponse.ok) {
      setMessage("New User Created!"); // Success message
      toggleCreateModal(); // Close the create account modal
    } else {
      // Extract error message properly
      const errorMessage = data?.error || "Failed to create account!";
      setMessage(errorMessage); 
    }

    toggleMessageModal(); // Show the message modal
  } catch (error) {
    setMessage("Failed to Create Account. Please try again later."); 
    toggleMessageModal();
  }
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

        {/* Sign In Modal */}
        <Modal visible={isModalVisible} transparent animationType="fade" 
                onRequestClose={toggleModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText type="request" style={styles.modalTitle}>Sign In</ThemedText>
              <ThemedTextInput placeholder="Username" value={username}
                onChangeText={setUser} />
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

        {/* Create Account Modal */}
        <Modal visible={isCreateModalVisible} transparent animationType="fade" 
                onRequestClose={toggleCreateModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText type="request" style={styles.modalTitle}>Create Account</ThemedText>

              <ThemedText style={styles.entryTitle}>Full Name *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Full Name" value={fullName}
                onChangeText={setFullName} />
              <ThemedText style={styles.entryTitle}>Username *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Username" value={username}
                onChangeText={setUser} />
              <ThemedText style={styles.entryTitle}>Email *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Email" value={email}
                onChangeText={setEmail} />
              <ThemedText style={styles.entryTitle}>Phone Number (optional)</ThemedText>
              <ThemedTextInput placeholder="Phone" value={phoneNumber}
                onChangeText={setPhoneNumber} />
              <ThemedText style={styles.entryTitle}>Password *</ThemedText>
              <ThemedTextInput placeholder="Enter Your Password" value={password}
                onChangeText={setPassword} secureTextEntry/> 
              <ThemedTextInput placeholder="Re-type Password" value={retypePassword}
                onChangeText={setRetypePassword} secureTextEntry/>
              <ThemedText style={styles.required}>*Required</ThemedText>
              
              {/* Container for buttons to center them */}
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={handleCreateAccount} title="Submit" />
                <ThemedButton onPress={toggleCreateModal} title="Cancel" />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal> 

        {/* Message Modal */}
        <Modal visible={isMessageModalVisible} transparent animationType="fade" 
                onRequestClose={toggleMessageModal}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText type="request" style={styles.modalTitle}>{message}</ThemedText>
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={toggleMessageModal} title="Ok" />
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
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.8)',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  }, 
  entryTitle: {
    fontSize: 14, 
    marginBottom: 5,  
    textAlign: 'left',
  }, 
  required: {
    fontSize: 12,  
    textAlign: 'left',
    fontStyle: 'italic',
    marginTop: 0,
  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  
    marginTop: 20,  
  },
});