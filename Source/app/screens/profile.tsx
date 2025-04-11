import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { CustomJwtPayload } from '../constants/jwtPayload';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput';

// API URL
const API_URL = 'http://192.168.1.241'; 

export default function ProfileScreen() {
  // Initialize the router (for navigation) used to naviate between screens
  const router = useRouter();

  {/* Add Friend Modal Constants */ }
  const [modalNewFriend, setNewFriendVisible] = useState(false);
  const toggleNewFriendVisible = () => setNewFriendVisible(!modalNewFriend);
  const [addFriend, setNewFriend] = useState('');

  {/* Message Modal Constants */ }
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const toggleMessageModal = () => setMessageModalVisible(!isMessageModalVisible);

  {/* Add New Friend Logic */ }
  const handleNewFriend = async () => {
    if (!addFriend) {
      setMessage("Missing Username!");
      toggleMessageModal();
      return;
    }

    try {
      // Fetch the friend's details by username
      const response = await fetch(API_URL + `:3000/api/request/users/${addFriend}`);

      if (!response.ok) throw new Error("User Not Found!");

      const friendData = await response.json();

      // Get the current signed-in user's ID  
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("User not authenticated!");

      const decoded = jwtDecode<CustomJwtPayload>(token);
      const currentUserId = decoded._id; // Get token's ID

      // Fetch the current user's friend list
      const userResponse = await fetch(API_URL + `:3000/api/request/users/${currentUserId}`);
      if (!userResponse.ok) throw new Error("Failed to fetch user data!");

      const userData = await userResponse.json();

      // Ensure friends list is an array and add the new friend ID
      const updatedFriends = Array.isArray(userData.friends) ? [...userData.friends, friendData._id] : [friendData._id];

      // Update the current user's friends array
      const addFriendResponse = await fetch(API_URL + `:3000/api/request/users/${currentUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friends: updatedFriends }),
      });

      const updateData = await addFriendResponse.json();

      if (addFriendResponse.ok) {
        setMessage(`${addFriend} has been added as a friend!`);
      } else {
        setMessage(updateData?.error || "Failed to add friend.");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      setMessage("User Not Found or Request Failed.");
    }

    toggleMessageModal();
  };

  {/* Populate Signed In User */ }
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    friends: [] as string[], // Store friend IDs initially
    friendUsernames: [] as string[], // Store friend usernames
  });

  // Fetch the current user's data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<CustomJwtPayload>(token); // Cast the decoded token
          const currentUserId = decoded._id;

          // Fetch user data
          const response = await fetch(API_URL + `:3000/api/request/users/${currentUserId}`);
          const userData = await response.json();

          // Fetch usernames for all friends
          const friendUsernames = await Promise.all(
            userData.friends.map(async (friendId: string) => {
              const friendResponse = await fetch(API_URL + `:3000/api/request/users/${friendId}`);
              const friendData = await friendResponse.json();
              return friendData.username; // Convert Friend ID's to their appropriate usernames
            })
          );

          setUserData({
            username: decoded.username || "Unknown User",
            email: decoded.email || "No email provided",
            bio: decoded.bio || "No bio available.",
            friends: userData.friends, // friend IDs
            friendUsernames,  // friend usernames
          });
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    // 
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        {/* Title of the Screen */}
        <ThemedText type="title">Profile Screen</ThemedText>
        {/* User Profile Image */}
        <ThemedView style={styles.avatarContainer}>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.avatar}
          />
        </ThemedView>
        {/* User Profile Data */}
        <ThemedText type="title" style={styles.name}>{userData.username}</ThemedText>
        <ThemedText type="body" style={styles.email}>{userData.email}</ThemedText>
        <ThemedText type="body" style={styles.bio}>{userData.bio}</ThemedText>
        <ThemedView style={styles.divider} />
        <ThemedText type="profile">Friends</ThemedText>
        {/* Add Friend's Button */}
        <ThemedButton onPress={toggleNewFriendVisible} style={styles.modalTitle} title="Add Friend" />
        <ThemedText type="body" style={styles.bio}>
          {userData.friendUsernames.length > 0 ? (
            userData.friendUsernames.map((friendUsernames, index) => (
                <TouchableOpacity key={index} style={styles.friendUsernames}>
                  <ThemedText style={styles.friendText}>{friendUsernames}</ThemedText> 
                </TouchableOpacity>
              ))
            ) : (
              <ThemedText type="body">You have no friends.</ThemedText>
            )}
        </ThemedText>

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

// Styles
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
  friendUsernames: {
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '90%', 
  }, 
  friendText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold', 
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
