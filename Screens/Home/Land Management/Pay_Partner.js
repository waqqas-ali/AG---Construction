// import React from 'react'
// import { Text, View } from 'react-native'
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Pay_Partner = () => {
//   return (
//     <View>
//       <Text>Pay_Partner</Text>
//     </View>
//   )
// }

// export default Pay_Partner


// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const Pay_Partner = ({ route }) => {
//   const { partnerId } = route.params;
//   const [amount, setAmount] = useState('');
//   const [note, setNote] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('UPI');
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       Alert.alert('Error', 'Please enter a valid amount');
//       return;
//     }

//     setLoading(true);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         transactionAmount: Number(amount),
//         transactionDate: date.toISOString().split('T')[0],
//         note: note || 'Payment',
//         change: 'CREDIT',
//         madeBy: 'PARTNER',
//         status: paymentMethod,
//       };

//       await axios.post(`${BASE_URL}/partnerpayment/${partnerId}`, payload, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       Alert.alert('Success', 'Payment recorded successfully');
//       setAmount('');
//       setNote('');
//       setPaymentMethod('UPI');
//       setDate(new Date());
//     } catch (err) {
//       Alert.alert('Error', 'Failed to record payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Make Payment</Text>

//       <Text style={styles.label}>Amount (₹)</Text>
//       <TextInput
//         style={styles.input}
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         placeholder="Enter amount"
//       />

//       <Text style={styles.label}>Payment Method</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={paymentMethod}
//           onValueChange={(itemValue) => setPaymentMethod(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="UPI" value="UPI" />
//           <Picker.Item label="Cash" value="CASH" />
//           <Picker.Item label="Bank Transfer" value="BANK_TRANSFER" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Date</Text>
//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowDatePicker(true)}
//       >
//         <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//         />
//       )}

//       <Text style={styles.label}>Note</Text>
//       <TextInput
//         style={[styles.input, styles.noteInput]}
//         value={note}
//         onChangeText={setNote}
//         placeholder="Enter note (optional)"
//         multiline
//       />

//       <TouchableOpacity
//         style={[styles.submitButton, loading && styles.disabledButton]}
//         onPress={handleSubmit}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? 'Processing...' : 'Make Payment'}
//         </Text>
//       </TouchableOpacity>
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
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#333',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     fontSize: 16,
//   },
//   noteInput: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 16,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   dateButton: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   submitButton: {
//     backgroundColor: '#2ecc71',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   disabledButton: {
//     backgroundColor: '#95a5a6',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default Pay_Partner;






// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const Pay_Partner = ({ route }) => {
//   const { partnerId } = route.params;
//   const [amount, setAmount] = useState('');
//   const [note, setNote] = useState('');
//   const [status, setStatus] = useState('UPI');
//   const [change, setChange] = useState('CREDIT');
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       Alert.alert('Error', 'Please enter a valid amount');
//       return;
//     }

//     setLoading(true);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         transactionDate: date.toISOString().split('T')[0],
//         transactionAmount: Number(amount),
//         note,
//         change,
//         madeBy: 'PARTNER',
//         status,
//       };

//       await axios.post(`${BASE_URL}/addpayment/partner/${partnerId}`, payload, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       Alert.alert('Success', 'Payment recorded successfully');
//       setAmount('');
//       setNote('');
//       setStatus('UPI');
//       setChange('CREDIT');
//       setDate(new Date());
//     } catch (err) {
//       Alert.alert('Error', 'Failed to record payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Make Partner Payment</Text>

//       <Text style={styles.label}>Amount</Text>
//       <TextInput
//         style={styles.input}
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         placeholder="Enter amount"
//       />

//       <Text style={styles.label}>Note</Text>
//       <TextInput
//         style={styles.input}
//         value={note}
//         onChangeText={setNote}
//         placeholder="Enter note (optional)"
//       />

//       <Text style={styles.label}>Payment Status</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={status}
//           onValueChange={(itemValue) => setStatus(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="UPI" value="UPI" />
//           <Picker.Item label="Cash" value="CASH" />
//           <Picker.Item label="Bank Transfer" value="BANK_TRANSFER" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Change Type</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={change}
//           onValueChange={(itemValue) => setChange(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Credit" value="CREDIT" />
//           <Picker.Item label="Debit" value="DEBIT" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Date</Text>
//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowDatePicker(true)}
//       >
//         <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}

//       <TouchableOpacity
//         style={[styles.submitButton, loading && styles.disabledButton]}
//         onPress={handleSubmit}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? 'Processing...' : 'Submit Payment'}
//         </Text>
//       </TouchableOpacity>
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
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 16,
//   },
//   picker: {
//     height: 50,
//   },
//   dateButton: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 16,
//   },
//   dateText: {
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: '#2ecc71',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#95a5a6',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Pay_Partner;





import { BASE_URL } from '@/Api/BASE_URL.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Pay_Partner = ({ route }) => {
  const { partnerId } = route.params;
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('UPI');
  const [change, setChange] = useState('CREDIT');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const payload = {
        transactionDate: date.toISOString().split('T')[0],
        transactionAmount: Number(amount),
        note,
        change,
        madeBy: 'PARTNER',
        status,
      };

      await axios.post(`${BASE_URL}/addpayment/partner/${partnerId}`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      Alert.alert('Success', 'Payment recorded successfully');
      setAmount('');
      setNote('');
      setStatus('UPI');
      setChange('CREDIT');
      setDate(new Date());
    } catch (err) {
      Alert.alert('Error', 'Failed to record payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Make Partner Payment</Text>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Enter note (optional)"
      />

      <Text style={styles.label}>Payment Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
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
          selectedValue={change}
          onValueChange={(itemValue) => setChange(itemValue)}
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
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Submit Payment'}
        </Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Pay_Partner;