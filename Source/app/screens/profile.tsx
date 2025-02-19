import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { CustomJwtPayload } from '../constants/jwtPayload';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput';

export default function ProfileScreen() {
  const router = useRouter();

  {/* Add Friend Modal Constants */}
  const [modalNewFriend, setNewFriendVisible] = useState(false);
  const toggleNewFriendVisible = () => setNewFriendVisible(!modalNewFriend);
  const [addFriend, setNewFriend] = useState('');

  {/* Message Modal Constants */}
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState(''); 
  const toggleMessageModal = () => setMessageModalVisible(!isMessageModalVisible);

  {/* Add New Friend Logic NEED TO FINISH *************************/}
  const handleNewFriend = async () => {
    if (!addFriend) {
      setMessage('Missing Username!');
      toggleMessageModal();
      return;
    }
    else try {
      const response = await fetch(`http://192.168.1.241:3000/api/request/users/?username=${addFriend}`); 
        const data = await response.json(); 
        console.log(data);
    } catch (error) {  
      setMessage('User Not Found!');
      toggleMessageModal(); 
    }
    console.log("Friend", addFriend); 
  };

  {/* Populate Signed In User */}
  const [userData, setUserData] = useState({
    username: "Guest",
    email: "guest@example.com",
    bio: "No bio available.",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<CustomJwtPayload>(token); // Cast the decoded token
          setUserData({
            username: decoded.username || "Unknown User",
            email: decoded.email || "No email provided",
            bio: decoded.bio || "No bio available.",
          });
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile Screen</ThemedText>
        <ThemedView style={styles.avatarContainer}>
          <Image 
            source={require('../assets/images/profile.png')}
            style={styles.avatar}
          />
        </ThemedView>
        <ThemedText type="title" style={styles.name}>{userData.username}</ThemedText>
        <ThemedText type="body" style={styles.email}>{userData.email}</ThemedText>
        <ThemedText type="body" style={styles.bio}>{userData.bio}</ThemedText>
        <ThemedView style={styles.divider}/> 
        <ThemedText type="profile">Friends</ThemedText> 
        <ThemedButton onPress={toggleNewFriendVisible} style={styles.modalTitle} title="Add Friend" />

        {/* Add Friend Modal */}
          <Modal visible={modalNewFriend} transparent animationType="fade" 
                  onRequestClose={toggleNewFriendVisible}>
            <ThemedView style={styles.modalOverlay}>
              <ThemedView style={styles.modalContainer}>
                <ThemedText type="request" style={styles.modalTitle}>Add Friend</ThemedText>
                <ThemedTextInput placeholder="Username" value={addFriend}
                  onChangeText={setNewFriend} /> 
                
                {/* Container for buttons to center them */}
                <ThemedView style={styles.buttonContainer}>
                  <ThemedButton onPress={handleNewFriend} title="Submit" />
                  <ThemedButton onPress={toggleNewFriendVisible} title="Cancel" />
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
    padding: 16 
  },
  avatarContainer: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 16 
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  email: { 
    fontSize: 16, 
    color: 'gray', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  bio: { 
    fontSize: 16, 
    textAlign: 'center', 
    paddingHorizontal: 16 
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',   
  },
  divider: { 
    height: 1, 
    backgroundColor: '#ccc', 
    width: '100%', 
    marginVertical: 20 
  },
});
