// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const View_Partner_Transactions = ({ route }) => {
//   const { partnerId } = route.params;
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/partner/${partnerId}/transactions`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
      
//       setTransactions(response.data.landTransactions);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch transactions');
//       setLoading(false);
//     }
//   };

//   const handleEdit = async (transactionId) => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       // Placeholder for edit API call
//       // await axios.put(`${BASE_URL}/partner/${partnerId}/transactions/${transactionId}`, {
//       //   // Update payload here
//       // }, {
//       //   headers: {
//       //     Authorization: `Bearer ${jwtToken}`,
//       //   },
//       // });
//       console.log(`Edit transaction ${transactionId}`);
//       // You can add navigation to an edit screen or show a modal here
//     } catch (err) {
//       setError('Failed to edit transaction');
//     }
//   };

//   const handleDelete = async (transactionId) => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       // Placeholder for delete API call
//       // await axios.delete(`${BASE_URL}/partner/${partnerId}/transactions/${transactionId}`, {
//       //   headers: {
//       //     Authorization: `Bearer ${jwtToken}`,
//       //   },
//       // });
//       setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
//       console.log(`Delete transaction ${transactionId}`);
//     } catch (err) {
//       setError('Failed to delete transaction');
//     }
//   };

//   const renderTransaction = ({ item }) => (
//     <View style={styles.transactionCard}>
//       <Text style={styles.date}>{new Date(item.transactionDate).toLocaleDateString()}</Text>
//       <Text style={styles.amount}>Amount: ₹{item.transactionAmount}</Text>
//       <Text style={styles.note}>Note: {item.note}</Text>
//       <Text style={[styles.change, { color: item.change === 'CREDIT' ? '#2ecc71' : '#e74c3c' }]}>
//         {item.change}
//       </Text>
//       <Text style={styles.status}>Status: {item.status}</Text>
//       <Text style={styles.madeBy}>By: {item.madeBy}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.editButton]}
//           onPress={() => handleEdit(item.id)}
//         >
//           <Text style={styles.buttonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, styles.deleteButton]}
//           onPress={() => handleDelete(item.id)}
//         >
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.error}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Partner Transactions</Text>
//       {transactions.length === 0 ? (
//         <Text style={styles.noTransactions}>No transactions found</Text>
//       ) : (
//         <FlatList
//           data={transactions}
//           renderItem={renderTransaction}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.list}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   transactionCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   amount: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   note: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   change: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   status: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   madeBy: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 8,
//   },
//   button: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   editButton: {
//     backgroundColor: '#3498db',
//   },
//   deleteButton: {
//     backgroundColor: '#e74c3c',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     fontSize: 16,
//     color: '#e74c3c',
//   },
//   noTransactions: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 20,
//   },
//   list: {
//     paddingBottom: 16,
//   },
// });

// export default View_Partner_Transactions;







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const View_Partner_Transactions = ({ route }) => {
//   const { partnerId } = route.params;
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [editAmount, setEditAmount] = useState('');
//   const [editNote, setEditNote] = useState('');
//   const [editStatus, setEditStatus] = useState('UPI');
//   const [editChange, setEditChange] = useState('CREDIT');
//   const [editDate, setEditDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [editLoading, setEditLoading] = useState(false);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/partner/${partnerId}/transactions`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
      
//       setTransactions(response.data.landTransactions);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch transactions');
//       setLoading(false);
//     }
//   };

//   const fetchTransactionById = async (transactionId) => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/SinglePartnerPaymentById/${transactionId}`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       const transaction = response.data; // Assuming response.data contains the transaction object
//       setSelectedTransaction(transaction);
//       setEditAmount(transaction.transactionAmount.toString());
//       setEditNote(transaction.note || '');
//       setEditStatus(transaction.status || 'UPI');
//       setEditChange(transaction.change || 'CREDIT');
//       setEditDate(new Date(transaction.transactionDate));
//       setModalVisible(true);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to fetch transaction details');
//     }
//   };

//   const handleEdit = (transactionId) => {
//     fetchTransactionById(transactionId);
//   };

//   const handleUpdate = async () => {
//     if (!editAmount || isNaN(editAmount) || Number(editAmount) <= 0) {
//       Alert.alert('Error', 'Please enter a valid amount');
//       return;
//     }

//     setEditLoading(true);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         id: selectedTransaction.id,
//         transactionDate: editDate.toISOString().split('T')[0],
//         transactionAmount: Number(editAmount),
//         note: editNote,
//         change: editChange,
//         madeBy: 'PARTNER',
//         status: editStatus,
//       };

//       await axios.put(`${BASE_URL}/UpdatePartner/payment/${selectedTransaction.id}`, payload, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       // Update the transactions list
//       setTransactions(transactions.map((t) =>
//         t.id === selectedTransaction.id ? { ...t, ...payload } : t
//       ));
//       setModalVisible(false);
//       Alert.alert('Success', 'Payment updated successfully');
//     } catch (err) {
//       Alert.alert('Error', 'Failed to update payment');
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const handleDelete = async (transactionId) => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       await axios.delete(`${BASE_URL}/DeletePartner/payment/${transactionId}`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });
//       setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
//       Alert.alert('Success', 'Transaction deleted successfully');
//     } catch (err) {
//       Alert.alert('Error', 'Failed to delete transaction');
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setEditDate(selectedDate);
//     }
//   };

//   const renderTransaction = ({ item }) => (
//     <View style={styles.transactionCard}>
//       <Text style={styles.date}>{new Date(item.transactionDate).toLocaleDateString()}</Text>
//       <Text style={styles.amount}>Amount: ₹{item.transactionAmount}</Text>
//       <Text style={styles.note}>Note: {item.note}</Text>
//       <Text style={[styles.change, { color: item.change === 'CREDIT' ? '#2ecc71' : '#e74c3c' }]}>
//         {item.change}
//       </Text>
//       <Text style={styles.status}>Status: {item.status}</Text>
//       <Text style={styles.madeBy}>By: {item.madeBy}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.editButton]}
//           onPress={() => handleEdit(item.id)}
//         >
//           <Text style={styles.buttonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, styles.deleteButton]}
//           onPress={() => handleDelete(item.id)}
//         >
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.error}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Partner Transactions</Text>
//       {transactions.length === 0 ? (
//         <Text style={styles.noTransactions}>No transactions found</Text>
//       ) : (
//         <FlatList
//           data={transactions}
//           renderItem={renderTransaction}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.list}
//         />
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalHeader}>Edit Payment</Text>

//             <Text style={styles.label}>Amount</Text>
//             <TextInput
//               style={styles.input}
//               value={editAmount}
//               onChangeText={setEditAmount}
//               keyboardType="numeric"
//               placeholder="Enter amount"
//             />

//             <Text style={styles.label}>Note</Text>
//             <TextInput
//               style={styles.input}
//               value={editNote}
//               onChangeText={setEditNote}
//               placeholder="Enter note (optional)"
//             />

//             <Text style={styles.label}>Payment Status</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={editStatus}
//                 onValueChange={(itemValue) => setEditStatus(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//             </View>

//             <Text style={styles.label}>Change Type</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={editChange}
//                 onValueChange={(itemValue) => setEditChange(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Credit" value="CREDIT" />
//                 <Picker.Item label="Debit" value="DEBIT" />
//               </Picker>
//             </View>

//             <Text style={styles.label}>Date</Text>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Text style={styles.dateText}>{editDate.toLocaleDateString()}</Text>
//             </TouchableOpacity>
//             {showDatePicker && (
//               <DateTimePicker
//                 value={editDate}
//                 mode="date"
//                 display="default"
//                 onChange={handleDateChange}
//               />
//             )}

//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.updateButton, editLoading && styles.disabledButton]}
//                 onPress={handleUpdate}
//                 disabled={editLoading}
//               >
//                 <Text style={styles.buttonText}>
//                   {editLoading ? 'Processing...' : 'Update'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   transactionCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   amount: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   note: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   change: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   status: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   madeBy: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 8,
//   },
//   button: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   editButton: {
//     backgroundColor: '#3498db',
//   },
//   deleteButton: {
//     backgroundColor: '#e74c3c',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     fontSize: 16,
//     color: '#e74c3c',
//   },
//   noTransactions: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 20,
//   },
//   list: {
//     paddingBottom: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 8,
//     width: '90%',
//     maxWidth: 400,
//   },
//   modalHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#f5f5f5',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   pickerContainer: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 16,
//   },
//   picker: {
//     height: 50,
//   },
//   dateButton: {
//     backgroundColor: '#f5f5f5',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 16,
//   },
//   dateText: {
//     fontSize: 16,
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 8,
//   },
//   modalButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   updateButton: {
//     backgroundColor: '#2ecc71',
//   },
//   cancelButton: {
//     backgroundColor: '#e74c3c',
//   },
//   disabledButton: {
//     backgroundColor: '#95a5a6',
//   },
// });

// export default View_Partner_Transactions;





import { BASE_URL } from '@/Api/BASE_URL.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const View_Partner_Transactions = ({ route }) => {
  const { partnerId } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editStatus, setEditStatus] = useState('UPI');
  const [editChange, setEditChange] = useState('CREDIT');
  const [editDate, setEditDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/partner/${partnerId}/transactions`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      
      setTransactions(response.data.landTransactions);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch transactions');
      setLoading(false);
    }
  };

  const fetchTransactionById = async (transactionId) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/SinglePartnerPaymentById/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const transaction = response.data; // Assuming response.data contains the transaction object
      setSelectedTransaction(transaction);
      setEditAmount(transaction.transactionAmount.toString());
      setEditNote(transaction.note || '');
      setEditStatus(transaction.status || 'UPI');
      setEditChange(transaction.change || 'CREDIT');
      setEditDate(new Date(transaction.transactionDate));
      setModalVisible(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch transaction details');
    }
  };

  const handleEdit = (transactionId) => {
    fetchTransactionById(transactionId);
  };

  const handleUpdate = async () => {
    if (!editAmount || isNaN(editAmount) || Number(editAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setEditLoading(true);
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const payload = {
        id: selectedTransaction.id,
        transactionDate: editDate.toISOString().split('T')[0],
        transactionAmount: Number(editAmount),
        note: editNote,
        change: editChange,
        madeBy: 'PARTNER',
        status: editStatus,
      };

      await axios.put(`${BASE_URL}/UpdatePartner/payment/${selectedTransaction.id}`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      // Update the transactions list
      setTransactions(transactions.map((t) =>
        t.id === selectedTransaction.id ? { ...t, ...payload } : t
      ));
      setModalVisible(false);
      Alert.alert('Success', 'Payment updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update payment');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (transactionId) => {
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      await axios.delete(`${BASE_URL}/partner/transaction/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
      Alert.alert('Success', 'Transaction deleted successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete transaction');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditDate(selectedDate);
    }
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.date}>{new Date(item.transactionDate).toLocaleDateString()}</Text>
      <Text style={styles.amount}>Amount: ₹{item.transactionAmount}</Text>
      <Text style={styles.note}>Note: {item.note}</Text>
      <Text style={[styles.change, { color: item.change === 'CREDIT' ? '#2ecc71' : '#e74c3c' }]}>
        {item.change}
      </Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.madeBy}>By: {item.madeBy}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEdit(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Partner Transactions</Text>
      {transactions.length === 0 ? (
        <Text style={styles.noTransactions}>No transactions found</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Payment</Text>

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              value={editAmount}
              onChangeText={setEditAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              value={editNote}
              onChangeText={setEditNote}
              placeholder="Enter note (optional)"
            />

            <Text style={styles.label}>Payment Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editStatus}
                onValueChange={(itemValue) => setEditStatus(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="UPI" value="UPI" />
                <Picker.Item label="Cash" value="CASH" />
                <Picker.Item label="Cheque" value="CHEQUE" />
                <Picker.Item label="RTGS" value="RTGS" />
                <Picker.Item label="NEFT" value="NEFT" />
              </Picker>
            </View>

            <Text style={styles.label}>Change Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editChange}
                onValueChange={(itemValue) => setEditChange(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Credit" value="CREDIT" />
                <Picker.Item label="Debit" value="DEBIT" />
              </Picker>
            </View>

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{editDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={editDate}
                mode="date"
                display="default"
          onChange={handleDateChange}
              />
            )}

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.updateButton, editLoading && styles.disabledButton]}
                onPress={handleUpdate}
                disabled={editLoading}
              >
                <Text style={styles.buttonText}>
                  {editLoading ? 'Processing...' : 'Update'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    marginBottom: 4,
  },
  madeBy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: '#e74c3c',
  },
  noTransactions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  list: {
    paddingBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#2ecc71',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
});

export default View_Partner_Transactions;