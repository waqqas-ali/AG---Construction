import App from '@/App.js'
import React from 'react'

const index = () => {
  return (
    <App/>
  )
}

export default index


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useEffect, useState } from 'react';
// import { FlatList, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function App() {
//   const [number, setNumber] = useState('');
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchCallHistory();
//   }, []);

//   const handleCall = async (phoneNumber) => {
//     const telLink = `tel:${phoneNumber}`;
//     Linking.openURL(telLink);

//     // Save to custom history
//     const newEntry = {
//       id: Date.now().toString(),
//       number: phoneNumber,
//       timestamp: new Date().toLocaleString(),
//     };

//     const updatedHistory = [newEntry, ...history];
//     setHistory(updatedHistory);
//     await AsyncStorage.setItem('callHistory', JSON.stringify(updatedHistory));
//   };

//   const fetchCallHistory = async () => {
//     const savedHistory = await AsyncStorage.getItem('callHistory');
//     if (savedHistory) {
//       setHistory(JSON.parse(savedHistory));
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.historyItem}>
//       <Text style={styles.historyText}>{item.number}</Text>
//       <Text style={styles.timestamp}>{item.timestamp}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter Number:</Text>
//       <TextInput
//         keyboardType="phone-pad"
//         value={number}
//         onChangeText={setNumber}
//         placeholder="Enter phone number"
//         style={styles.input}
//       />

//       {number.length > 0 && (
//         <TouchableOpacity onPress={() => handleCall(number)} style={styles.callButton}>
//           <Text style={styles.callText}>Call {number}</Text>
//         </TouchableOpacity>
//       )}

//       <Text style={styles.label}>Call History:</Text>
//       <FlatList
//         data={history}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ListEmptyComponent={<Text>No call history yet.</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, paddingTop: 50, backgroundColor: '#fff', flex: 1 },
//   label: { fontSize: 18, marginBottom: 10 },
//   input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 8, padding: 10, marginBottom: 20 },
//   callButton: { backgroundColor: '#0a84ff', padding: 15, borderRadius: 10, marginBottom: 30 },
//   callText: { color: '#fff', fontSize: 18, textAlign: 'center' },
//   historyItem: { marginBottom: 10, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
//   historyText: { fontSize: 16, fontWeight: 'bold' },
//   timestamp: { fontSize: 12, color: '#555' },
// });
