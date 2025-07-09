// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     FlatList,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const Flat_List = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { schemeId, schemeName } = route.params || {};

//   // Core state management
//   const [showFlatModal, setShowFlatModal] = useState(false);
//   const [showCustomerModal, setShowCustomerModal] = useState(false);
//   const [showFlatDetailModal, setShowFlatDetailModal] = useState(false);
//   const [flats, setFlats] = useState([]);
//   const [selectedFlat, setSelectedFlat] = useState({});
//   const [flatId, setFlatId] = useState('');
//   const [bookingId, setBookingId] = useState('');
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [filterStatus, setFilterStatus] = useState('ALL');

//   // Form states
//   const [residencyType, setResidencyType] = useState('');
//   const [flatType, setFlatType] = useState('');
//   const [availability, setAvailability] = useState('');
//   const [floorNumber, setFloorNumber] = useState('');
//   const [flatNumber, setFlatNumber] = useState('');
//   const [flatPrice, setFlatPrice] = useState('');

//   // Customer form states
//   const [dealPrice, setDealPrice] = useState('');
//   const [tokenAmount, setTokenAmount] = useState('');
//   const [agreementAmount, setAgreementAmount] = useState('');
//   const [stampDutyAmount, setStampDutyAmount] = useState('');
//   const [registrationAmount, setRegistrationAmount] = useState('');
//   const [gstAmount, setGstAmount] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [panCard, setPanCard] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [brokerage, setBrokerage] = useState('');
//   const [loan, setLoan] = useState('');

//   // Fetch flats
//   useEffect(() => {
//     const fetchFlats = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         if (!token) {
//           Alert.alert('Error', 'Authentication token not found');
//           return;
//         }
//         const response = await axios.get(`${BASE_URL}/project/${schemeId}`, {
//           headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//         });
//         setFlats(response.data);
//       } catch (error) {
//         console.error('Fetch flats error:', error);
//         Alert.alert('Error', 'Failed to fetch flats');
//       }
//     };
//     fetchFlats();
//   }, [schemeId, refreshKey]);

//   // Filter and group flats
//   const filteredFlats = flats.filter(
//     (flat) => filterStatus === 'ALL' || flat.availabilityStatus === filterStatus
//   );
//   const groupedFlats = filteredFlats.reduce((acc, flat) => {
//     if (!acc[flat.floorNumber]) acc[flat.floorNumber] = [];
//     acc[flat.floorNumber].push(flat);
//     return acc;
//   }, {});
//   const sortedFloors = Object.keys(groupedFlats).sort((a, b) => b - a);

//   // API handlers
//   const handleAddFlat = async () => {
//     if (!residencyType || !flatType || !availability || !floorNumber || !flatNumber || !flatPrice) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const obj = {
//         name: schemeName,
//         residencyType,
//         flatType,
//         availabilityStatus: availability,
//         floorNumber,
//         identifier: flatNumber,
//         price: flatPrice.replace(/,/g, ''),
//         projectId: schemeId,
//       };
//       await axios.post(`${BASE_URL}/createResidency`, obj, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       Alert.alert('Success', 'Flat added successfully');
//       setShowFlatModal(false);
//       resetForm();
//       setRefreshKey(refreshKey + 1);
//     } catch (error) {
//       console.error('Add flat error:', error);
//       Alert.alert('Error', 'Failed to add flat');
//     }
//   };

//   const handleFlatDetail = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/allResidencybyid/${id}`, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       setSelectedFlat(response.data);
//       setFlatId(id);
//       setBookingId(response.data?.booking?.id || '');
//       setShowFlatDetailModal(true);
//     } catch (error) {
//       console.error('Fetch flat detail error:', error);
//       Alert.alert('Error', 'Failed to fetch flat details');
//     }
//   };

//   const handleAddCustomer = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         dealPrice: dealPrice.replace(/,/g, ''),
//         tokenAmount: tokenAmount.replace(/,/g, ''),
//         agreementAmount: agreementAmount.replace(/,/g, ''),
//         stampDutyAmount: stampDutyAmount.replace(/,/g, ''),
//         registrationAmount: registrationAmount.replace(/,/g, ''),
//         gstAmount: gstAmount.replace(/,/g, ''),
//         electricWaterAmmount: '',
//         legalChargesAmmout: '',
//         bookedOn: new Date().toISOString().split('T')[0],
//         bookingStatus,
//         customerDto: { name: customerName, phoneNumber, email, aadharNumber, address, panCard, agentName, brokerage, loan },
//         residencyDto: { id: flatId },
//       };
//       const response = await axios.post(`${BASE_URL}/createBooking`, formData, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       Alert.alert('Success', 'Customer added successfully');
//       navigation.navigate('FlatOwner', { bookingId: response.data.id });
//       setShowCustomerModal(false);
//       resetCustomerForm();
//     } catch (error) {
//       console.error('Add customer error:', error);
//       Alert.alert('Error', 'Failed to add customer');
//     }
//   };

//   const handleDeleteFlat = async (id) => {
//     Alert.alert('Confirm Delete', 'Are you sure you want to delete this flat?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             const token = await AsyncStorage.getItem('jwtToken');
//             await axios.delete(`${BASE_URL}/deleteResidency/${id}`, {
//               headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//             });
//             Alert.alert('Success', 'Flat deleted');
//             setRefreshKey(refreshKey + 1);
//           } catch (error) {
//             console.error('Delete flat error:', error);
//             Alert.alert('Error', 'Failed to delete flat');
//           }
//         },
//       },
//     ]);
//   };

//   const resetForm = () => {
//     setResidencyType('');
//     setFlatType('');
//     setAvailability('');
//     setFloorNumber('');
//     setFlatNumber('');
//     setFlatPrice('');
//   };

//   const resetCustomerForm = () => {
//     setDealPrice('');
//     setTokenAmount('');
//     setAgreementAmount('');
//     setStampDutyAmount('');
//     setRegistrationAmount('');
//     setGstAmount('');
//     setBookingStatus('');
//     setCustomerName('');
//     setPhoneNumber('');
//     setEmail('');
//     setAadharNumber('');
//     setAddress('');
//     setPanCard('');
//     setAgentName('');
//     setBrokerage('');
//     setLoan('');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>{schemeName || 'Flat Management'}</Text>
//         <TouchableOpacity style={styles.addButton} onPress={() => setShowFlatModal(true)}>
//           <Ionicons name="add" size={20} color="#fff" />
//           <Text style={styles.addButtonText}>Add Flat</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Filter */}
//       <View style={styles.filterContainer}>
//         <Picker
//           style={styles.picker}
//           selectedValue={filterStatus}
//           onValueChange={setFilterStatus}
//         >
//           <Picker.Item label="All Units" value="ALL" />
//           <Picker.Item label="Available" value="AVAILABLE" />
//           <Picker.Item label="Booked" value="BOOKED" />
//         </Picker>
//       </View>

//       {/* Flats List */}
//       <FlatList
//         data={sortedFloors}
//         keyExtractor={(item) => item}
//         renderItem={({ item: floor }) => (
//           <View style={styles.floorContainer}>
//             <View style={styles.floorHeader}>
//               <Text style={styles.floorTitle}>Floor {floor}</Text>
//               <Text style={styles.floorCount}>{groupedFlats[floor].length} Flats</Text>
//             </View>
//             <FlatList
//               data={groupedFlats[floor]}
//               keyExtractor={(item) => item.id}
//               numColumns={2}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[styles.flatCard, item.availabilityStatus === 'AVAILABLE' ? styles.availableCard : styles.bookedCard]}
//                   onPress={() => handleFlatDetail(item.id)}
//                 >
//                 <Text style={styles.flatNumber}>{item.identifier}</Text>
//                 <Text style={styles.flatType}>{item.flatType.replace('_', ' ')}</Text>
//                 <Text style={styles.flatPrice}>₹{Number(item.price).toLocaleString()}</Text>
//                 <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeleteFlat(item.id)}>
//                   <Ionicons name="trash" size={20} color="#fff" />
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}
//     />

//     {/* Flat Detail Modal */}
//     <Modal visible={showFlatDetailModal} animationType="slide" transparent>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Flat Details</Text>
//             <TouchableOpacity onPress={() => setShowFlatDetailModal(false)}>
//               <Ionicons name="close" size={24} color="#333" />
//             </TouchableOpacity>
//           </View>
//           <ScrollView>
//             <Text style={styles.detailText}>Scheme: {schemeName}</Text>
//             <Text style={styles.detailText}>Flat Number: {selectedFlat.identifier}</Text>
//             <Text style={[styles.detailText, selectedFlat.availabilityStatus === 'AVAILABLE' ? styles.availableText : styles.bookedText]}>
//               Status: {selectedFlat.availabilityStatus}
//             </Text>
//             <Text style={styles.detailText}>Type: {selectedFlat.flatType?.replace('_', ' ')}</Text>
//             <Text style={styles.detailText}>Floor: {selectedFlat.floorNumber}</Text>
//             <Text style={styles.detailText}>Price: ₹{Number(selectedFlat.price).toLocaleString()}</Text>
//           </ScrollView>
//           <View style={styles.modalActions}>
//             {selectedFlat.availabilityStatus === 'BOOKED' ? (
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => navigation.navigate('FlatOwner', { bookingId })}
//               >
//                 <Text style={styles.modalButtonText}>View Customer</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={styles.modalButton} onPress={() => { setShowFlatDetailModal(false); setShowCustomerModal(true); }}>
//                 <Text style={styles.modalButtonText}>Add Customer</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </View>
//     </Modal>

//     {/* Add Flat Modal */}
//     <Modal visible={showFlatModal} animationType="slide" transparent>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Add New Flat</Text>
//             <TouchableOpacity onPress={() => setShowFlatModal(false)}>
//               <Ionicons name="close" size={24} color="#333" />
//             </TouchableOpacity>
//           </View>
//           <ScrollView>
//             <Text style={styles.formLabel}>Residency Type</Text>
//             <Picker style={styles.picker} selectedValue={residencyType} onValueChange={setResidencyType}>
//               <Picker.Item label="Select Type" value="" />
//               <Picker.Item label="Flat" value="FLAT" />
//               <Picker.Item label="House" value="HOUSE" />
//               <Picker.Item label="Other" value="OTHER" />
//             </Picker>
//             <Text style={styles.formLabel}>Flat Type</Text>
//             <Picker style={styles.picker} selectedValue={flatType} onValueChange={setFlatType}>
//               <Picker.Item label="Select Flat Type" value="" />
//               <Picker.Item label="1 BHK" value="ONE_BHK" />
//               <Picker.Item label="2 BHK" value="TWO_BHK" />
//               <Picker.Item label="3 BHK" value="THREE_BHK" />
//               <Picker.Item label="4 BHK" value="FOUR_BHK" />
//               <Picker.Item label="5 BHK" value="FIVE_BHK" />
//             </Picker>
//             <Text style={styles.formLabel}>Availability</Text>
//             <Picker style={styles.picker} selectedValue={availability} onValueChange={setAvailability}>
//               <Picker.Item label="Select Status" value="" />
//               <Picker.Item label="Available" value="AVAILABLE" />
//             </Picker>
//             <Text style={styles.formLabel}>Floor Number</Text>
//             <TextInput style={styles.input} value={floorNumber} onChangeText={setFloorNumber} keyboardType="numeric" />
//             <Text style={styles.formLabel}>Flat Number</Text>
//             <TextInput style={styles.input} value={flatNumber} onChangeText={setFlatNumber} />
//             <Text style={styles.formLabel}>Price (₹)</Text>
//             <TextInput style={styles.input} value={flatPrice} onChangeText={setFlatPrice} keyboardType="numeric" />
//           </ScrollView>
//           <View style={styles.modalActions}>
//             <TouchableOpacity style={styles.cancelButton} onPress={() => setShowFlatModal(false)}>
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.submitButton} onPress={handleAddFlat}>
//               <Text style={styles.buttonText}>Add Flat</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>

//     {/* Customer Modal */}
//     <Modal visible={showCustomerModal} animationType="slide" transparent>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Add Customer</Text>
//             <TouchableOpacity onPress={() => setShowCustomerModal(false)}>
//               <Ionicons name="close" size={24} color="#333" />
//             </TouchableOpacity>
//           </View>
//           <ScrollView>
//             <Text style={styles.formLabel}>Deal Price</Text>
//             <TextInput style={styles.input} value={dealPrice} onChangeText={setDealPrice} keyboardType="numeric" />
//             <Text style={styles.formLabel}>Token Amount</Text>
//             <TextInput style={styles.input} value={tokenAmount} onChangeText={setTokenAmount} keyboardType="numeric" />
//             <Text style={styles.formLabel}>Agreement Amount</Text>
//             <TextInput style={styles.input} value={agreementAmount} onChangeText={setAgreementAmount} keyboardType="numeric" />
//             <Text style={styles.formLabel}>Registration Amount</Text>
//             <TextInput style={styles.input} value={registrationAmount} onChangeText={setRegistrationAmount} keyboardType="numeric" />
//             <Text style={styles.formLabel}>GST Amount</Text>
//             <TextInput style={styles.input} value={gstAmount} onChangeText={setGstAmount} keyboardType="numeric" />
//             <Text style={styles.formLabel}>Booking Status</Text>
//             <Picker style={styles.picker} selectedValue={bookingStatus} onValueChange={setBookingStatus}>
//               <Picker.Item label="Select Status" value="" />
//               <Picker.Item label="Complete" value="COMPLETE" />
//               <Picker.Item label="Pending" value="PENDING" />
//             </Picker>
//             <Text style={styles.formLabel}>Customer Name</Text>
//             <TextInput style={styles.input} value={customerName} onChangeText={setCustomerName} />
//             <Text style={styles.formLabel}>Phone Number</Text>
//             <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
//             <Text style={styles.formLabel}>Email</Text>
//             <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
//             <Text style={styles.formLabel}>Aadhar Number</Text>
//             <TextInput style={styles.input} value={aadharNumber} onChangeText={setAadharNumber} />
//             <Text style={styles.formLabel}>PAN Card</Text>
//             <TextInput style={styles.input} value={panCard} onChangeText={setPanCard} />
//             <Text style={styles.formLabel}>Address</Text>
//             <TextInput style={[styles.input, { height: 80 }]} value={address} onChangeText={setAddress} multiline />
//             <Text style={styles.formLabel}>Agent Name</Text>
//             <TextInput style={styles.input} value={agentName} onChangeText={setAgentName} />
//             <Text style={styles.formLabel}>Brokerage</Text>
//             <TextInput style={styles.input} value={brokerage} onChangeText={setBrokerage} keyboardType="numeric" />
//             <Text style={styles.formLabel}>Loan Status</Text>
//             <Picker style={styles.picker} selectedValue={loan} onValueChange={setLoan}>
//               <Picker.Item label="Select Status" value="" />
//               <Picker.Item label="Yes" value="YES" />
//               <Picker.Item label="No" value="NO" />
//             </Picker>
//           </ScrollView>
//           <View style={styles.modalActions}>
//             <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCustomerModal(false)}>
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.submitButton} onPress={handleAddCustomer}>
//               <Text style={styles.buttonText}>Add Customer</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   </View>
// );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F7',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007AFF',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   filterContainer: {
//     marginBottom: 16,
//   },
//   picker: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   floorContainer: {
//     marginBottom: 16,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   floorHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   floorTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   floorCount: {
//     fontSize: 14,
//     color: '#666',
//     backgroundColor: '#F0F0F0',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//   },
//   flatCard: {
//     flex: 1,
//     margin: 8,
//     padding: 12,
//     borderRadius: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     position: 'relative',
//   },
//   availableCard: {
//     backgroundColor: '#4CAF50',
//   },
//   bookedCard: {
//     backgroundColor: '#FF3B30',
//   },
//   flatNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   flatType: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     opacity: 0.9,
//   },
//   flatPrice: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     fontWeight: '500',
//   },
//   deleteIcon: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     borderRadius: 12,
//     padding: 4,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 20,
//     width: '90%',
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#1A1A1A',
//     marginVertical: 8,
//   },
//   availableText: {
//     color: '#4CAF50',
//   },
//   bookedText: {
//     color: '#FF3B30',
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 16,
//   },
//   modalButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginLeft: 8,
//   },
//   modalButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   formLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#1A1A1A',
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   input: {
//     backgroundColor: '#F7F7F7',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     marginBottom: 12,
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flex: 1,
//     marginHorizontal: 8,
//     alignItems: 'center',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flex: 1,
//     marginHorizontal: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Flat_List;









"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from "@react-native-picker/picker"
import { useNavigation, useRoute } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import {
    Alert,
    Dimensions,
    FlatList,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
const isTablet = screenWidth >= 768

const Flat_List = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { schemeId, schemeName } = route.params || {}

  // Core state management
  const [showFlatModal, setShowFlatModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [showFlatDetailModal, setShowFlatDetailModal] = useState(false)
  const [flats, setFlats] = useState([])
  const [selectedFlat, setSelectedFlat] = useState({})
  const [flatId, setFlatId] = useState("")
  const [bookingId, setBookingId] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [filterStatus, setFilterStatus] = useState("ALL")

  // Form states
  const [residencyType, setResidencyType] = useState("")
  const [flatType, setFlatType] = useState("")
  const [availability, setAvailability] = useState("")
  const [floorNumber, setFloorNumber] = useState("")
  const [flatNumber, setFlatNumber] = useState("")
  const [flatPrice, setFlatPrice] = useState("")

  // Customer form states
  const [dealPrice, setDealPrice] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [agreementAmount, setAgreementAmount] = useState("")
  const [stampDutyAmount, setStampDutyAmount] = useState("")
  const [registrationAmount, setRegistrationAmount] = useState("")
  const [gstAmount, setGstAmount] = useState("")
  const [bookingStatus, setBookingStatus] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [aadharNumber, setAadharNumber] = useState("")
  const [address, setAddress] = useState("")
  const [panCard, setPanCard] = useState("")
  const [agentName, setAgentName] = useState("")
  const [brokerage, setBrokerage] = useState("")
  const [loan, setLoan] = useState("")

  // Fetch flats
  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken")
        if (!token) {
          Alert.alert("Error", "Authentication token not found")
          return
        }
        const response = await axios.get(`${BASE_URL}/project/${schemeId}`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        })
        setFlats(response.data)
      } catch (error) {
        console.error("Fetch flats error:", error)
        Alert.alert("Error", "Failed to fetch flats")
      }
    }
    fetchFlats()
  }, [schemeId, refreshKey])

  // Filter and group flats
  const filteredFlats = flats.filter((flat) => filterStatus === "ALL" || flat.availabilityStatus === filterStatus)

  const groupedFlats = filteredFlats.reduce((acc, flat) => {
    if (!acc[flat.floorNumber]) acc[flat.floorNumber] = []
    acc[flat.floorNumber].push(flat)
    return acc
  }, {})

  const sortedFloors = Object.keys(groupedFlats).sort((a, b) => b - a)

  // API handlers
  const handleAddFlat = async () => {
    if (!residencyType || !flatType || !availability || !floorNumber || !flatNumber || !flatPrice) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      const obj = {
        name: schemeName,
        residencyType,
        flatType,
        availabilityStatus: availability,
        floorNumber,
        identifier: flatNumber,
        price: flatPrice.replace(/,/g, ""),
        projectId: schemeId,
      }
      await axios.post(`${BASE_URL}/createResidency`, obj, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      Alert.alert("Success", "Flat added successfully")
      setShowFlatModal(false)
      resetForm()
      setRefreshKey(refreshKey + 1)
    } catch (error) {
      console.error("Add flat error:", error)
      Alert.alert("Error", "Failed to add flat")
    }
  }

  const handleFlatDetail = async (id) => {
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      const response = await axios.get(`${BASE_URL}/allResidencybyid/${id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      setSelectedFlat(response.data)
      setFlatId(id)
      setBookingId(response.data?.booking?.id || "")
      setShowFlatDetailModal(true)
    } catch (error) {
      console.error("Fetch flat detail error:", error)
      Alert.alert("Error", "Failed to fetch flat details")
    }
  }

  const handleAddCustomer = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      const formData = {
        dealPrice: dealPrice.replace(/,/g, ""),
        tokenAmount: tokenAmount.replace(/,/g, ""),
        agreementAmount: agreementAmount.replace(/,/g, ""),
        stampDutyAmount: stampDutyAmount.replace(/,/g, ""),
        registrationAmount: registrationAmount.replace(/,/g, ""),
        gstAmount: gstAmount.replace(/,/g, ""),
        electricWaterAmmount: "",
        legalChargesAmmout: "",
        bookedOn: new Date().toISOString().split("T")[0],
        bookingStatus,
        customerDto: {
          name: customerName,
          phoneNumber,
          email,
          aadharNumber,
          address,
          panCard,
          agentName,
          brokerage,
          loan,
        },
        residencyDto: { id: flatId },
      }
      const response = await axios.post(`${BASE_URL}/createBooking`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      Alert.alert("Success", "Customer added successfully")
      navigation.navigate("FlatOwner", { bookingId: response.data.id })
      setShowCustomerModal(false)
      resetCustomerForm()
    } catch (error) {
      console.error("Add customer error:", error)
      Alert.alert("Error", "Failed to add customer")
    }
  }

  const handleDeleteFlat = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this flat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("jwtToken")
            await axios.delete(`${BASE_URL}/deleteResidency/${id}`, {
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            })
            Alert.alert("Success", "Flat deleted")
            setRefreshKey(refreshKey + 1)
          } catch (error) {
            console.error("Delete flat error:", error)
            Alert.alert("Error", "Failed to delete flat")
          }
        },
      },
    ])
  }

  const resetForm = () => {
    setResidencyType("")
    setFlatType("")
    setAvailability("")
    setFloorNumber("")
    setFlatNumber("")
    setFlatPrice("")
  }

  const resetCustomerForm = () => {
    setDealPrice("")
    setTokenAmount("")
    setAgreementAmount("")
    setStampDutyAmount("")
    setRegistrationAmount("")
    setGstAmount("")
    setBookingStatus("")
    setCustomerName("")
    setPhoneNumber("")
    setEmail("")
    setAadharNumber("")
    setAddress("")
    setPanCard("")
    setAgentName("")
    setBrokerage("")
    setLoan("")
  }

  const getStatusColor = (status) => {
    return status === "AVAILABLE" ? "#10B981" : "#EF4444"
  }

  const getStatusGradient = (status) => {
    return status === "AVAILABLE" ? ["#10B981", "#059669"] : ["#EF4444", "#DC2626"]
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {schemeName || "Flat Management"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {filteredFlats.length} {filteredFlats.length === 1 ? "Unit" : "Units"}
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowFlatModal(true)} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <View style={styles.filterContainer}>
          <Ionicons name="filter" size={20} color="#6B7280" style={styles.filterIcon} />
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={filterStatus}
              onValueChange={setFilterStatus}
              dropdownIconColor="#6B7280"
            >
              <Picker.Item label="All Units" value="ALL" />
              <Picker.Item label="Available" value="AVAILABLE" />
              <Picker.Item label="Booked" value="BOOKED" />
            </Picker>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#F0FDF4" }]}>
            <Text style={[styles.statNumber, { color: "#10B981" }]}>
              {flats.filter((f) => f.availabilityStatus === "AVAILABLE").length}
            </Text>
            <Text style={[styles.statLabel, { color: "#059669" }]}>Available</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#FEF2F2" }]}>
            <Text style={[styles.statNumber, { color: "#EF4444" }]}>
              {flats.filter((f) => f.availabilityStatus === "BOOKED").length}
            </Text>
            <Text style={[styles.statLabel, { color: "#DC2626" }]}>Booked</Text>
          </View>
        </View>
      </View>

      {/* Flats List */}
      <FlatList
        data={sortedFloors}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item: floor }) => (
          <View style={styles.floorContainer}>
            <View style={styles.floorHeader}>
              <View style={styles.floorTitleContainer}>
                <View style={styles.floorIconContainer}>
                  <Ionicons name="business" size={20} color="#6366F1" />
                </View>
                <View>
                  <Text style={styles.floorTitle}>Floor {floor}</Text>
                  <Text style={styles.floorSubtitle}>
                    {groupedFlats[floor].length} {groupedFlats[floor].length === 1 ? "unit" : "units"}
                  </Text>
                </View>
              </View>
            </View>

            <FlatList
              data={groupedFlats[floor]}
              keyExtractor={(item) => item.id}
              numColumns={isTablet ? 3 : 2}
              key={isTablet ? "tablet" : "phone"}
              scrollEnabled={false}
              columnWrapperStyle={!isTablet ? null : styles.row}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.flatCard, { backgroundColor: getStatusColor(item.availabilityStatus) }]}
                  onPress={() => handleFlatDetail(item.id)}
                  activeOpacity={0.9}
                >
                  <View style={styles.flatCardHeader}>
                    <View style={styles.flatNumberContainer}>
                      <Text style={styles.flatNumber}>{item.identifier}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteFlat(item.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.flatCardContent}>
                    <Text style={styles.flatType}>{item.flatType.replace("_", " ")}</Text>
                    <Text style={styles.flatPrice}>₹{Number(item.price).toLocaleString("en-IN")}</Text>
                  </View>

                  <View style={styles.flatCardFooter}>
                    <View style={[styles.statusBadge, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}>
                      <Text style={styles.statusText}>{item.availabilityStatus}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />

      {/* Flat Detail Modal */}
      <Modal visible={showFlatDetailModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.detailModalContent]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Flat Details</Text>
                <Text style={styles.detailValue}>{schemeName}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowFlatDetailModal(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.detailCard}>
                <View style={styles.detailRow}>
                  <Ionicons name="home" size={20} color="#6366F1" />
                  <Text style={styles.detailLabel}>Flat Number</Text>
                  <Text style={styles.detailValue}>{selectedFlat.identifier}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="checkmark-circle" size={20} color={getStatusColor(selectedFlat.availabilityStatus)} />
                  <Text style={styles.detailLabel}>Status</Text>
                  <View
                    style={[
                      styles.statusBadgeDetail,
                      { backgroundColor: getStatusColor(selectedFlat.availabilityStatus) },
                    ]}
                  >
                    <Text style={styles.statusTextDetail}>{selectedFlat.availabilityStatus}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="grid" size={20} color="#6366F1" />
                  <Text style={styles.detailLabel}>Type</Text>
                  <Text style={styles.detailValue}>{selectedFlat.flatType?.replace("_", " ")}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="layers" size={20} color="#6366F1" />
                  <Text style={styles.detailLabel}>Floor</Text>
                  <Text style={styles.detailValue}>{selectedFlat.floorNumber}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="cash" size={20} color="#6366F1" />
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={[styles.detailValue, styles.priceText]}>
                    ₹{Number(selectedFlat.price).toLocaleString("en-IN")}
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              {selectedFlat.availabilityStatus === "BOOKED" ? (
                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => navigation.navigate("FlatOwner", { bookingId, customerName })}
                >
                  <Ionicons name="person" size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>View Customer</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => {
                    setShowFlatDetailModal(false)
                    setShowCustomerModal(true)
                  }}
                >
                  <Ionicons name="person-add" size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Add Customer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Flat Modal */}
      <Modal visible={showFlatModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Add New Flat</Text>
                <Text style={styles.modalSubtitle}>Create a new unit</Text>
              </View>
              <TouchableOpacity onPress={() => setShowFlatModal(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Residency Type</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker style={styles.formPicker} selectedValue={residencyType} onValueChange={setResidencyType}>
                      <Picker.Item label="Select Type" value="" />
                      <Picker.Item label="Flat" value="FLAT" />
                      <Picker.Item label="House" value="HOUSE" />
                      <Picker.Item label="Other" value="OTHER" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Flat Type</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker style={styles.formPicker} selectedValue={flatType} onValueChange={setFlatType}>
                      <Picker.Item label="Select Flat Type" value="" />
                      <Picker.Item label="1 BHK" value="ONE_BHK" />
                      <Picker.Item label="2 BHK" value="TWO_BHK" />
                      <Picker.Item label="3 BHK" value="THREE_BHK" />
                      <Picker.Item label="4 BHK" value="FOUR_BHK" />
                      <Picker.Item label="5 BHK" value="FIVE_BHK" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Availability</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker style={styles.formPicker} selectedValue={availability} onValueChange={setAvailability}>
                      <Picker.Item label="Select Status" value="" />
                      <Picker.Item label="Available" value="AVAILABLE" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Floor Number</Text>
                    <TextInput
                      style={styles.input}
                      value={floorNumber}
                      onChangeText={setFloorNumber}
                      keyboardType="numeric"
                      placeholder="e.g., 1"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Flat Number</Text>
                    <TextInput
                      style={styles.input}
                      value={flatNumber}
                      onChangeText={setFlatNumber}
                      placeholder="e.g., 101"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Price (₹)</Text>
                  <TextInput
                    style={styles.input}
                    value={flatPrice}
                    onChangeText={setFlatPrice}
                    keyboardType="numeric"
                    placeholder="e.g., 5000000"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => setShowFlatModal(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={handleAddFlat}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Add Flat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Customer Modal */}
      <Modal visible={showCustomerModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Add Customer</Text>
                <Text style={styles.modalSubtitle}>Customer & Booking Details</Text>
              </View>
              <TouchableOpacity onPress={() => setShowCustomerModal(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                {/* Financial Details Section */}
                <View style={styles.sectionHeader}>
                  <Ionicons name="cash" size={20} color="#6366F1" />
                  <Text style={styles.sectionTitle}>Financial Details</Text>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Deal Price</Text>
                    <TextInput
                      style={styles.input}
                      value={dealPrice}
                      onChangeText={setDealPrice}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Token Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={tokenAmount}
                      onChangeText={setTokenAmount}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Agreement Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={agreementAmount}
                      onChangeText={setAgreementAmount}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Registration Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={registrationAmount}
                      onChangeText={setRegistrationAmount}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>GST Amount</Text>
                  <TextInput
                    style={styles.input}
                    value={gstAmount}
                    onChangeText={setGstAmount}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Booking Status</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker style={styles.formPicker} selectedValue={bookingStatus} onValueChange={setBookingStatus}>
                      <Picker.Item label="Select Status" value="" />
                      <Picker.Item label="Complete" value="COMPLETE" />
                      <Picker.Item label="Pending" value="PENDING" />
                    </Picker>
                  </View>
                </View>

                {/* Customer Details Section */}
                <View style={styles.sectionHeader}>
                  <Ionicons name="person" size={20} color="#6366F1" />
                  <Text style={styles.sectionTitle}>Customer Details</Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Customer Name</Text>
                  <TextInput
                    style={styles.input}
                    value={customerName}
                    onChangeText={setCustomerName}
                    placeholder="Enter full name"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                      placeholder="Enter phone"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      placeholder="Enter email"
                    />
                  </View>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Aadhar Number</Text>
                    <TextInput
                      style={styles.input}
                      value={aadharNumber}
                      onChangeText={setAadharNumber}
                      placeholder="Enter Aadhar"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>PAN Card</Text>
                    <TextInput style={styles.input} value={panCard} onChangeText={setPanCard} placeholder="Enter PAN" />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Address</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={3}
                    placeholder="Enter complete address"
                  />
                </View>

                {/* Agent Details Section */}
                <View style={styles.sectionHeader}>
                  <Ionicons name="briefcase" size={20} color="#6366F1" />
                  <Text style={styles.sectionTitle}>Agent Details</Text>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Agent Name</Text>
                    <TextInput
                      style={styles.input}
                      value={agentName}
                      onChangeText={setAgentName}
                      placeholder="Enter agent name"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Brokerage</Text>
                    <TextInput
                      style={styles.input}
                      value={brokerage}
                      onChangeText={setBrokerage}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.formLabel}>Loan Status</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker style={styles.formPicker} selectedValue={loan} onValueChange={setLoan}>
                      <Picker.Item label="Select Status" value="" />
                      <Picker.Item label="Yes" value="YES" />
                      <Picker.Item label="No" value="NO" />
                    </Picker>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => setShowCustomerModal(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={handleAddCustomer}>
                <Ionicons name="person-add" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Add Customer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: isTablet ? 28 : 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  filterSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterIcon: {
    marginRight: 12,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  picker: {
    height: 50,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    padding: 20,
  },
  floorContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  floorTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  floorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  floorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  floorSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  row: {
    justifyContent: "space-between",
  },
  flatCard: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 16,
    minHeight: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  flatCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  flatNumberContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  flatNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  deleteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 6,
    borderRadius: 8,
  },
  flatCardContent: {
    flex: 1,
    justifyContent: "center",
  },
  flatType: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 4,
    fontWeight: "500",
  },
  flatPrice: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  flatCardFooter: {
    marginTop: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "100%",
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  detailModalContent: {
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  closeButton: {
    padding: 4,
  },
  detailCard: {
    margin: 24,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  detailLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
  priceText: {
    color: "#059669",
    fontWeight: "700",
  },
  statusBadgeDetail: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusTextDetail: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  formContainer: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
  },
  formPicker: {
    height: 50,
  },
  modalActions: {
    flexDirection: "row",
    padding: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Flat_List
