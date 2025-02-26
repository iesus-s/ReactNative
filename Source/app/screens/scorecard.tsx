import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedTextInput } from '../components/ThemedTextInput'; 
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomJwtPayload } from '../constants/jwtPayload';

export default function ScorecardScreen() {
  const router = useRouter();

  // Error Modal
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const toggleMessageModal = () => setMessageModalVisible(!isMessageModalVisible);
  const [message, setMessage] = useState(''); 
  const [creatorID, setCreatorID] = useState<string | null>(null);
 
  const [course, setFacility] = useState('');
  const [holeSelection, setSelected] = useState<number>(0); // Track the selected circle

  const options = ['9 hole', '18 hole', '27 hole', '36 hole'];
  // Needs handleHole logic
  const handleHole = (index: number) => {
    setSelected(index);
  }; 
  
  const [players, setTeamMembers] = useState<string[]>(["Guest"]); 

  const [newMember, setNewMember] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode<CustomJwtPayload>(token); // Cast the decoded token
          setTeamMembers([decoded.username || "Guest"]);

          setCreatorID(decoded._id);
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    }; 
    fetchUserData();
  }, []); 

  const addMember = () => {
    if (newMember.trim() !== '') {
      setTeamMembers([...players, newMember.trim()]);
      setNewMember('');
    }
  };

  const removeMember = (index: number) => {
    setTeamMembers(players.filter((_, i) => i !== index));
  };

  // Handle Create Game
  const handleCreateGame = async () => { 
    if (!course) {
      setMessage('Missing Facility Name!');
      toggleMessageModal();
      console.log('Creator ID:', creatorID);
      return;
    } 
    else if (players.length === 0) {
      setMessage('Missing Team Members!');
      toggleMessageModal();
      return;
    } 
    else try {
      // Map Players to Scores
      const scores: { [key: string]: any } = {};
      players.forEach(player => {
        scores[player] = {};
        // For each player, create hole scores
        for (let hole = 1; hole <= (holeSelection+1) * 9; hole++) {
          scores[player][`hole${hole}`] = 0; // Default score of 0 for each hole
        }
      })
      const response = await fetch('http://192.168.5.34:3000/api/request/scorecards/user/create/' + creatorID, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, players, holeSelection, scores, date: Date() }),
      });
        const data = await response.json();
        if (response.ok) {
          // Handle success response
          setMessage('Game created successfully!');
          toggleMessageModal();
          router.push("/screens/session");

        } 
        else {
          setMessage(`Failed to create game: ${data.message || 'Unknown error'}`);
          toggleMessageModal(); 
        }
      } 
      catch (error) {  
        setMessage('Failed to Create Game!');
        toggleMessageModal();
      }
  };

  return (
    // PLACE SCROLLVIEW AND THEMEDVIEW CONTAINER BY DEFAULT IN ALL SCREENS
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Scorecard Screen</ThemedText> 

        {/* Facility Name Section */}
        <ThemedText type="body">Facility Name</ThemedText>
        <ThemedTextInput placeholder="Please enter a location" value={course}
          style={styles.gameTitles} onChangeText={setFacility}/>

        {/* Hole Selection Section */}
        <ThemedText type="body">Hole Selection</ThemedText>
        <ThemedView style={styles.grid}>
          {options.map((option, index) => (
            <ThemedView key={index} style={styles.itemContainer}>
              <TouchableOpacity style={[styles.circle, holeSelection === index && styles.selected]}
                onPress={() => handleHole(index)}/>
              <ThemedText type="body">{option}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Team Members Section */}
        <ThemedText type="body">Team Members</ThemedText>
        <ThemedView style={styles.listContainer}>
          {players.map((member, index) => (
            <ThemedView key={index} style={styles.memberContainer}>
              <ThemedText type="body" style={styles.teamber}>{member}</ThemedText> {/* Just display the username */}
              <TouchableOpacity style={styles.removeButton} onPress={() => removeMember(index)}>
                <ThemedText type="body" style={styles.remove}>Remove</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.addMemberContainer}>
          <ThemedTextInput placeholder="Add new member"
            value={newMember} onChangeText={setNewMember}/> 
          <ThemedButton style={styles.buttonContainer} onPress={addMember} title="Add"/>
        </ThemedView>

        <ThemedButton onPress={router.back} style={styles.goBack} title="Go Back"/>
        <ThemedButton onPress={handleCreateGame} style={styles.goSubmit} title="Submit" />
        
        {/* Message Modal */}
          <Modal visible={isMessageModalVisible} transparent animationType="fade" 
                  onRequestClose={toggleMessageModal}>
            <ThemedView style={styles.modalOverlay}>
              <ThemedView style={styles.modalContainer}>
                <ThemedText type="request" style={styles.modalTitle}>{message}</ThemedText>
                <ThemedView style={styles.buttonModal}>
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
    paddingBottom: 70,
  },
  goBack: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    marginTop: 50,
  },
  goSubmit: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    marginTop: 50,
  },
  gameTitles: {
    width: 300,
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 500,
    height: 50,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#ccc',
    margin: 10,
  },
  selected: {
    backgroundColor: '#218838',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
  },
  teamber: {
    marginRight: 10, 
  },
  listContainer: { 
    flexWrap: 'wrap', 
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,   
  },
  memberContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center', 
    borderBottomColor: '#ccc',  
    marginBottom: 10, 
    width: '100%', 
    paddingLeft: 50,
    paddingRight: 50,
  },
  addMemberContainer: { 
    alignItems: 'center',  
    marginTop: 10, 
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5, 
    justifyContent: 'center',  
    alignItems: 'center', 
  }, 
  remove: { 
    textAlign: 'center', 
  },    
  buttonContainer: { 
    marginBottom: 20,   
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
  buttonModal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  
    marginTop: 20,  
  },
});
