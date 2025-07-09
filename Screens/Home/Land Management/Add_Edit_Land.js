// // import React from 'react'
// // import { Text, View } from 'react-native'
// // import { BASE_URL } from '@/Api/BASE_URL.js';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import axios from 'axios';

// // const Add_Edit_Land = () => {
// //   return (
// //     <View>
// //       <Text>Add_Edit_Land</Text>
// //     </View>
// //   )
// // }

// // export default Add_Edit_Land






// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import React, { useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const Add_Edit_Land = ({ route, navigation }) => {
//   const isEditMode = !!route.params?.land;
//   const land = route.params?.land || {};

//   const [formData, setFormData] = useState({
//     owner: {
//       name: land.owner?.name || '',
//       phoneNumber: land.owner?.phoneNumber || '',
//       email: land.owner?.email || '',
//       aadharNumber: land.owner?.aadharNumber || '',
//     },
//     purchaser: {
//       name: land.purchaser?.name || '',
//       phoneNumber: land.purchaser?.phoneNumber || '',
//       email: land.purchaser?.email || '',
//       aadharNumber: land.purchaser?.aadharNumber || '',
//     },
//     area: land.area?.toString() || '',
//     tokenAmount: land.tokenAmount?.toString() || '',
//     agreementAmount: land.agreementAmount?.toString() || '',
//     totalAmount: land.totalAmount?.toString() || '',
//     address: {
//       city: land.address?.city || '',
//       landmark: land.address?.landmark || '',
//       pincode: land.address?.pincode || '',
//       country: land.address?.country || '',
//       state: land.address?.state || '',
//       muza: land.address?.muza || '',
//       khno: land.address?.khno || '',
//       phno: land.address?.phno || '',
//       plotno: land.address?.plotno || '',
//     },
//     landAddOnDate: land.landAddOnDate ? new Date(land.landAddOnDate) : new Date(),
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (
//       !formData.owner.name ||
//       !formData.purchaser.name ||
//       !formData.area ||
//       !formData.tokenAmount ||
//       !formData.agreementAmount ||
//       !formData.totalAmount ||
//       !formData.address.city ||
//       !formData.address.landmark
//     ) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       if (!jwtToken) {
//         throw new Error('No JWT token found');
//       }

//       const payload = {
//         owner: {
//           name: formData.owner.name,
//           phoneNumber: formData.owner.phoneNumber,
//           email: formData.owner.email,
//           aadharNumber: formData.owner.aadharNumber,
//         },
//         purchaser: {
//           name: formData.purchaser.name,
//           phoneNumber: formData.purchaser.phoneNumber,
//           email: formData.purchaser.email,
//           aadharNumber: formData.purchaser.aadharNumber,
//         },
//         area: parseInt(formData.area),
//         tokenAmount: parseInt(formData.tokenAmount),
//         agreementAmount: parseInt(formData.agreementAmount),
//         totalAmount: parseInt(formData.totalAmount),
//         address: {
//           city: formData.address.city,
//           landmark: formData.address.landmark,
//           pincode: formData.address.pincode,
//           country: formData.address.country,
//           state: formData.address.state,
//           muza: formData.address.muza,
//           khno: formData.address.khno,
//           phno: formData.address.phno,
//           plotno: formData.address.plotno,
//         },
//         landAddOnDate: formData.landAddOnDate.toISOString().split('T')[0],
//       };

//       if (isEditMode) {
//         await axios.put(`${BASE_URL}/update-land/${land.id}`, payload, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         Alert.alert('Success', 'Land updated successfully', [
//           { text: 'OK', onPress: () => navigation.goBack() },
//         ]);
//       } else {
//         await axios.post(`${BASE_URL}/create`, payload, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         Alert.alert('Success', 'Land added successfully', [
//           { text: 'OK', onPress: () => navigation.goBack() },
//         ]);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || `Failed to ${isEditMode ? 'update' : 'add'} land`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setFormData({ ...formData, landAddOnDate: selectedDate });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
//         </TouchableOpacity>
//         <Text style={styles.title}>{isEditMode ? 'Edit Land' : 'Add New Land'}</Text>
//         <View style={{ width: 24 }} />
//       </View>
//       <ScrollView contentContainerStyle={styles.form}>
//         <Text style={styles.sectionTitle}>Owner Details</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Owner Name *"
//           value={formData.owner.name}
//           onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, name: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Owner Phone Number"
//           value={formData.owner.phoneNumber}
//           onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, phoneNumber: text } })}
//           keyboardType="phone-pad"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Owner Email"
//           value={formData.owner.email}
//           onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, email: text } })}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Owner Aadhar Number"
//           value={formData.owner.aadharNumber}
//           onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, aadharNumber: text } })}
//           keyboardType="numeric"
//         />

//         <Text style={styles.sectionTitle}>Purchaser Details</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Purchaser Name *"
//           value={formData.purchaser.name}
//           onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, name: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Purchaser Phone Number"
//           value={formData.purchaser.phoneNumber}
//           onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, phoneNumber: text } })}
//           keyboardType="phone-pad"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Purchaser Email"
//           value={formData.purchaser.email}
//           onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, email: text } })}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Purchaser Aadhar Number"
//           value={formData.purchaser.aadharNumber}
//           onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, aadharNumber: text } })}
//           keyboardType="numeric"
//         />

//         <Text style={styles.sectionTitle}>Land Details</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Area (sq.ft) *"
//           value={formData.area}
//           onChangeText={(text) => setFormData({ ...formData, area: text })}
//           keyboardType="numeric"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Token Amount (₹) *"
//           value={formData.tokenAmount}
//           onChangeText={(text) => setFormData({ ...formData, tokenAmount: text })}
//           keyboardType="numeric"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Agreement Amount (₹) *"
//           value={formData.agreementAmount}
//           onChangeText={(text) => setFormData({ ...formData, agreementAmount: text })}
//           keyboardType="numeric"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Total Amount (₹) *"
//           value={formData.totalAmount}
//           onChangeText={(text) => setFormData({ ...formData, totalAmount: text })}
//           keyboardType="numeric"
//         />
//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text style={formData.landAddOnDate ? styles.dateText : styles.placeholderText}>
//             {formData.landAddOnDate
//               ? formData.landAddOnDate.toISOString().split('T')[0]
//               : 'Select Date Added *'}
//           </Text>
//         </TouchableOpacity>
//         {showDatePicker && (
//           <DateTimePicker
//             value={formData.landAddOnDate}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}

//         <Text style={styles.sectionTitle}>Address Details</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Landmark *"
//           value={formData.address.landmark}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, landmark: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="City *"
//           value={formData.address.city}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, city: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Pincode"
//           value={formData.address.pincode}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, pincode: text } })}
//           keyboardType="numeric"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="State"
//           value={formData.address.state}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, state: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Country"
//           value={formData.address.country}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, country: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Muza"
//           value={formData.address.muza}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, muza: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Kh.No"
//           value={formData.address.khno}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, khno: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Ph.No"
//           value={formData.address.phno}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, phno: text } })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Plot No"
//           value={formData.address.plotno}
//           onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, plotno: text } })}
//         />

//         <TouchableOpacity
//           style={[styles.submitButton, loading && styles.disabledButton]}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#FFFFFF" />
//           ) : (
//             <Text style={styles.submitButtonText}>{isEditMode ? 'Update Land' : 'Add Land'}</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F8FA',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E8E8E8',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//     flex: 1,
//     textAlign: 'center',
//   },
//   form: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginVertical: 10,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E8E8E8',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#1A1A1A',
//   },
//   placeholderText: {
//     fontSize: 16,
//     color: '#999',
//   },
//   submitButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   disabledButton: {
//     backgroundColor: '#A0C4FF',
//   },
// });

// export default Add_Edit_Land;









import { BASE_URL } from '@/Api/BASE_URL.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Add_Edit_Land = ({ route, navigation }) => {
  const isEditMode = !!route.params?.id;
  const landId = route.params?.id;

  const [formData, setFormData] = useState({
    owner: { name: '', phoneNumber: '', email: '', aadharNumber: '' },
    purchaser: { name: '', phoneNumber: '', email: '', aadharNumber: '' },
    area: '',
    tokenAmount: '',
    agreementAmount: '',
    totalAmount: '',
    address: {
      city: '',
      landmark: '',
      pincode: '',
      country: '',
      state: '',
      muza: '',
      khno: '',
      phno: '',
      plotno: '',
    },
    landAddOnDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchLandData = async () => {
        setLoading(true);
        try {
          const jwtToken = await AsyncStorage.getItem('jwtToken');
          if (!jwtToken) {
            throw new Error('No JWT token found');
          }

          const response = await axios.get(`${BASE_URL}/land/${landId}`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          });

          const land = response.data;
          setFormData({
            owner: {
              name: land.owner?.name || '',
              phoneNumber: land.owner?.phoneNumber || '',
              email: land.owner?.email || '',
              aadharNumber: land.owner?.aadharNumber || '',
            },
            purchaser: {
              name: land.purchaser?.name || '',
              phoneNumber: land.purchaser?.phoneNumber || '',
              email: land.purchaser?.email || '',
              aadharNumber: land.purchaser?.aadharNumber || '',
            },
            area: land.area?.toString() || '',
            tokenAmount: land.tokenAmount?.toString() || '',
            agreementAmount: land.agreementAmount?.toString() || '',
            totalAmount: land.totalAmount?.toString() || '',
            address: {
              city: land.address?.city || '',
              landmark: land.address?.landmark || '',
              pincode: land.address?.pincode || '',
              country: land.address?.country || '',
              state: land.address?.state || '',
              muza: land.address?.muza || '',
              khno: land.address?.khno || '',
              phno: land.address?.phno || '',
              plotno: land.address?.plotno || '',
            },
            landAddOnDate: land.landAddOnDate ? new Date(land.landAddOnDate) : new Date(),
          });
        } catch (err) {
          setFetchError(err.message || 'Failed to fetch land data');
        } finally {
          setLoading(false);
        }
      };
      fetchLandData();
    }
  }, [isEditMode, landId]);

  const validateForm = () => {
    const errors = [];
    if (!formData.owner.name) errors.push('Owner Name is required');
    if (!formData.purchaser.name) errors.push('Purchaser Name is required');
    if (!formData.area || isNaN(parseInt(formData.area))) errors.push('Area must be a valid number');
    if (!formData.tokenAmount || isNaN(parseInt(formData.tokenAmount))) errors.push('Token Amount must be a valid number');
    if (!formData.agreementAmount || isNaN(parseInt(formData.agreementAmount))) errors.push('Agreement Amount must be a valid number');
    if (!formData.totalAmount || isNaN(parseInt(formData.totalAmount))) errors.push('Total Amount must be a valid number');
    if (!formData.address.city) errors.push('City is required');
    if (!formData.address.landmark) errors.push('Landmark is required');
    if (formData.owner.email && !/\S+@\S+\.\S+/.test(formData.owner.email)) errors.push('Owner Email is invalid');
    if (formData.purchaser.email && !/\S+@\S+\.\S+/.test(formData.purchaser.email)) errors.push('Purchaser Email is invalid');
    if (formData.owner.aadharNumber && !/^\d{12}$/.test(formData.owner.aadharNumber)) errors.push('Owner Aadhar Number must be 12 digits');
    if (formData.purchaser.aadharNumber && !/^\d{12}$/.test(formData.purchaser.aadharNumber)) errors.push('Purchaser Aadhar Number must be 12 digits');
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return;
    }

    setLoading(true);
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }

      const payload = {
        owner: {
          name: formData.owner.name,
          phoneNumber: formData.owner.phoneNumber,
          email: formData.owner.email,
          aadharNumber: formData.owner.aadharNumber,
        },
        purchaser: {
          name: formData.purchaser.name,
          phoneNumber: formData.purchaser.phoneNumber,
          email: formData.purchaser.email,
          aadharNumber: formData.purchaser.aadharNumber,
        },
        area: parseInt(formData.area),
        tokenAmount: parseInt(formData.tokenAmount),
        agreementAmount: parseInt(formData.agreementAmount),
        totalAmount: parseInt(formData.totalAmount),
        address: {
          city: formData.address.city,
          landmark: formData.address.landmark,
          pincode: formData.address.pincode,
          country: formData.address.country,
          state: formData.address.state,
          muza: formData.address.muza,
          khno: formData.address.khno,
          phno: formData.address.phno,
          plotno: formData.address.plotno,
        },
        landAddOnDate: formData.landAddOnDate.toISOString().split('T')[0],
      };

      if (isEditMode) {
        await axios.put(`${BASE_URL}/update/${landId}`, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        Alert.alert('Success', 'Land updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await axios.post(`${BASE_URL}/create`, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        Alert.alert('Success', 'Land added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message || `Failed to ${isEditMode ? 'update' : 'add'} land`);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, landAddOnDate: selectedDate });
    }
  };

  if (fetchError) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="cloud-offline-outline" size={60} color="#D32F2F" />
        <Text style={styles.errorText}>Error: {fetchError}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading && isEditMode) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.infoText}>Loading land data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>{isEditMode ? 'Edit Land' : 'Add New Land'}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Owner Details</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Owner Name *"
              value={formData.owner.name}
              onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, name: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Owner Phone Number"
              value={formData.owner.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, phoneNumber: text } })}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Owner Email"
              value={formData.owner.email}
              onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, email: text } })}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Owner Aadhar Number"
              value={formData.owner.aadharNumber}
              onChangeText={(text) => setFormData({ ...formData, owner: { ...formData.owner, aadharNumber: text } })}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.sectionTitle}>Purchaser Details</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Purchaser Name *"
              value={formData.purchaser.name}
              onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, name: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Purchaser Phone Number"
              value={formData.purchaser.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, phoneNumber: text } })}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Purchaser Email"
              value={formData.purchaser.email}
              onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, email: text } })}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Purchaser Aadhar Number"
              value={formData.purchaser.aadharNumber}
              onChangeText={(text) => setFormData({ ...formData, purchaser: { ...formData.purchaser, aadharNumber: text } })}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.sectionTitle}>Land Details</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="map-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Area (sq.ft) *"
              value={formData.area}
              onChangeText={(text) => setFormData({ ...formData, area: text })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="cash-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Token Amount (₹) *"
              value={formData.tokenAmount}
              onChangeText={(text) => setFormData({ ...formData, tokenAmount: text })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="cash-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Agreement Amount (₹) *"
              value={formData.agreementAmount}
              onChangeText={(text) => setFormData({ ...formData, agreementAmount: text })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="cash-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Total Amount (₹) *"
              value={formData.totalAmount}
              onChangeText={(text) => setFormData({ ...formData, totalAmount: text })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="calendar-outline" size={20} color="#555" style={styles.inputIcon} />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={formData.landAddOnDate ? styles.dateText : styles.placeholderText}>
                {formData.landAddOnDate
                  ? formData.landAddOnDate.toISOString().split('T')[0]
                  : 'Select Date Added *'}
              </Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={formData.landAddOnDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.sectionTitle}>Address Details</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Landmark *"
              value={formData.address.landmark}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, landmark: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="City *"
              value={formData.address.city}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, city: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="pin-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={formData.address.pincode}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, pincode: text } })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="earth-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.address.state}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, state: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="earth-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={formData.address.country}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, country: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="map-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Muza"
              value={formData.address.muza}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, muza: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="map-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Kh.No"
              value={formData.address.khno}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, khno: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="map-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ph.No"
              value={formData.address.phno}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, phno: text } })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="map-outline" size={20} color="#555" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Plot No"
              value={formData.address.plotno}
              onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, plotno: text } })}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>{isEditMode ? 'Update Land' : 'Add Land'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 15,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
    paddingRight: 15,
    color: '#1A1A1A',
  },
  dateText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A0C4FF',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Add_Edit_Land;