// import React from 'react'
// import { Text, View } from 'react-native'
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const FlatOwner = () => {
//   return (
//     <View>
//       <Text>FlatOwner</Text>
//     </View>
//   )
// }

// export default FlatOwner


// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

// const FlatOwner = ({ route }) => {
//   const { bookingId, customerName } = route.params; // Get params from navigation
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         // Retrieve JWT token from AsyncStorage
//         const token = await AsyncStorage.getItem('jwtToken');
//         if (!token) {
//           setError('No authentication token found');
//           setLoading(false);
//           return;
//         }

//         // Make API call to fetch booking details
//         const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setBookingData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch booking details');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchBookingData();
//   }, [bookingId]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Booking Details for {customerName}</Text>
//       {bookingData ? (
//         <>
//           {/* Booking Details */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Booking Information</Text>
//             <Text>Booking ID: {bookingData.id}</Text>
//             <Text>Deal Price: ₹{bookingData.dealPrice}</Text>
//             <Text>Token Amount: ₹{bookingData.tokenAmount}</Text>
//             <Text>Agreement Amount: ₹{bookingData.agreementAmount}</Text>
//             <Text>Stamp Duty: ₹{bookingData.stampDutyAmount}</Text>
//             <Text>Registration Amount: ₹{bookingData.registrationAmount}</Text>
//             <Text>GST Amount: ₹{bookingData.gstAmount}</Text>
//             <Text>
//               Electric/Water Amount:{' '}
//               {bookingData.electricWaterAmmount ?? 'N/A'}
//             </Text>
//             <Text>
//               Legal Charges: {bookingData.legalChargesAmmout ?? 'N/A'}
//             </Text>
//             <Text>Booked On: {bookingData.bookedOn ?? 'N/A'}</Text>
//             <Text>Status: {bookingData.bookingStatus}</Text>
//           </View>

//           {/* Customer Details */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Customer Information</Text>
//             <Text>Name: {bookingData.customer.name}</Text>
//             <Text>Phone: {bookingData.customer.phoneNumber}</Text>
//             <Text>Email: {bookingData.customer.email || 'N/A'}</Text>
//             <Text>Aadhar: {bookingData.customer.aadharNumber || 'N/A'}</Text>
//             <Text>Address: {bookingData.customer.address}</Text>
//             <Text>PAN Card: {bookingData.customer.panCard || 'N/A'}</Text>
//             <Text>Agent Name: {bookingData.customer.agentName || 'N/A'}</Text>
//             <Text>Brokerage: {bookingData.customer.brokerage || 'N/A'}</Text>
//             <Text>Loan: {bookingData.customer.loan}</Text>
//             <Text>
//               Bank Name: {bookingData.customer.bankName ?? 'N/A'}
//             </Text>
//             <Text>
//               Loan Amount: {bookingData.customer.loanAmount ?? 'N/A'}
//             </Text>
//           </View>

//           {/* Residency Details */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Residency Information</Text>
//             <Text>Name: {bookingData.residency.name}</Text>
//             <Text>Type: {bookingData.residency.residencyType}</Text>
//             <Text>Flat Type: {bookingData.residency.flatType}</Text>
//             <Text>Availability: {bookingData.residency.availabilityStatus}</Text>
//             <Text>Floor: {bookingData.residency.floorNumber}</Text>
//             <Text>Identifier: {bookingData.residency.identifier}</Text>
//             <Text>Price: ₹{bookingData.residency.price}</Text>
//           </View>

//           {/* Installment Details */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Installment Information</Text>
//             {bookingData.bookingInstallments.length > 0 ? (
//               bookingData.bookingInstallments.map((installment) => (
//                 <View key={installment.id} style={styles.installment}>
//                   <Text>Installment ID: {installment.id}</Text>
//                   <Text>Date: {installment.installmentDate}</Text>
//                   <Text>Amount: ₹{installment.installmentAmount}</Text>
//                   <Text>Status: {installment.installmentStatus}</Text>
//                   <Text>Remark: {installment.remark}</Text>
//                 </View>
//               ))
//             ) : (
//               <Text>No installments available</Text>
//             )}
//           </View>
//         </>
//       ) : (
//         <Text>No booking data available</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   installment: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default FlatOwner;













// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
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
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const FlatOwner = ({ route, navigation }) => {
//   const { bookingId, customerName } = route.params;
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // Bank Details Form
//   const [showBankDetailModal, setShowBankDetailModal] = useState(false);
//   const [bankName, setBankName] = useState('');
//   const [loanAmount, setLoanAmount] = useState('');

//   // Installment Form
//   const [showInstallmentModal, setShowInstallmentModal] = useState(false);
//   const [installmentDate, setInstallmentDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [installmentAmount, setInstallmentAmount] = useState('');
//   const [installmentType, setInstallmentType] = useState('');
//   const [note, setNote] = useState('');

//   // Installment Details
//   const [showInstallmentDetailsModal, setShowInstallmentDetailsModal] = useState(false);
//   const [installmentDetails, setInstallmentDetails] = useState(null);

//   // Edit Installment Form
//   const [showEditInstallmentModal, setShowEditInstallmentModal] = useState(false);
//   const [installmentId, setInstallmentId] = useState('');
//   const [editInstallmentDate, setEditInstallmentDate] = useState(new Date());
//   const [editInstallmentAmount, setEditInstallmentAmount] = useState('');
//   const [editInstallmentType, setEditInstallmentType] = useState('');
//   const [editInstallmentRemark, setEditInstallmentRemark] = useState('');
//   const [showEditDatePicker, setShowEditDatePicker] = useState(false);

//   // Edit Customer Form
//   const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
//   const [customerBookingId, setCustomerBookingId] = useState('');
//   const [dealPrice, setDealPrice] = useState('');
//   const [tokenAmount, setTokenAmount] = useState('');
//   const [agreementAmount, setAgreementAmount] = useState('');
//   const [stampDutyAmount, setStampDutyAmount] = useState('');
//   const [registrationAmount, setRegistrationAmount] = useState('');
//   const [gstAmount, setGstAmount] = useState('');
//   const [electricWaterAmount, setElectricWaterAmount] = useState('');
//   const [legalChargesAmount, setLegalChargesAmount] = useState('');
//   const [bookedOn, setBookedOn] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [panCard, setPanCard] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [brokerage, setBrokerage] = useState('');

//   // Customer Slip
//   const [showCustomerSlipModal, setShowCustomerSlipModal] = useState(false);

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         if (!token) {
//           setError('No authentication token found');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         setBookingData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch booking details');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchBookingData();
//   }, [bookingId, refreshKey]);

//   // Handlers
//   const handleAddBankDetails = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         bankName,
//         loanAmount: loanAmount.replace(/,/g, ''),
//       };
//       const response = await axios.post(
//         `${BASE_URL}/addLoanDetails/${bookingData?.customer?.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if (response.status === 200) {
//         Alert.alert('Success', 'Bank details added successfully');
//         setBankName('');
//         setLoanAmount('');
//         setShowBankDetailModal(false);
//         setRefreshKey((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add bank details');
//     }
//   };

//   const handleCancelBooking = async () => {
//     Alert.alert(
//       'Confirm Cancellation',
//       'Are you sure you want to cancel the booking?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, cancel it!',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');
//               await axios.put(
//                 `${BASE_URL}/cancelBooking/${bookingId}`,
//                 {},
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                   },
//                 }
//               );
//               Alert.alert('Success', 'Booking has been cancelled');
//               setRefreshKey((prev) => prev + 1);
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to cancel booking');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleAddInstallment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = [
//         {
//           installmentDate: installmentDate.toISOString().split('T')[0],
//           installmentAmount: installmentAmount.replace(/,/g, ''),
//           installmentStatus: installmentType,
//           remark: note,
//         },
//       ];
//       await axios.post(`${BASE_URL}/${bookingId}/addInstallment`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       Alert.alert('Success', 'Payment added successfully');
//       setShowInstallmentModal(false);
//       setInstallmentDate(new Date());
//       setInstallmentAmount('');
//       setInstallmentType('');
//       setNote('');
//       setRefreshKey((prev) => prev + 1);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add installment');
//     }
//   };

//   const handleShowInstallments = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setInstallmentDetails(response.data);
//       setShowInstallmentDetailsModal(true);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch installment details');
//     }
//   };

//   const handleEditInstallment = async (id) => {
//     setInstallmentId(id);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(
//         `${BASE_URL}/getBookingInstallmentById/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setEditInstallmentAmount(response.data.installmentAmount);
//       setEditInstallmentDate(new Date(response.data.installmentDate));
//       setEditInstallmentType(response.data.installmentStatus);
//       setEditInstallmentRemark(response.data.remark);
//       setShowEditInstallmentModal(true);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch installment details');
//     }
//   };

//   const handleUpdateInstallment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         installmentDate: editInstallmentDate.toISOString().split('T')[0],
//         installmentAmount: editInstallmentAmount.replace(/,/g, ''),
//         remark: editInstallmentRemark,
//         installmentStatus: editInstallmentType,
//       };
//       const response = await axios.put(
//         `${BASE_URL}/updateBookingInstallment/${installmentId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if (response.status === 200) {
//         Alert.alert('Success', 'Installment updated successfully');
//         setShowEditInstallmentModal(false);
//         handleShowInstallments();
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to update installment');
//     }
//   };

//   const handleDeleteInstallment = async (id) => {
//     Alert.alert(
//       'Confirm Deletion',
//       'Are you sure you want to delete this installment?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');
//               await axios.delete(`${BASE_URL}/deleteBookingInstallment/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               Alert.alert('Success', 'Installment has been deleted');
//               setRefreshKey((prev) => prev + 1);
//               setInstallmentDetails((prev) => ({
//                 ...prev,
//                 bookingInstallments: prev.bookingInstallments.filter(
//                   (installment) => installment.id !== id
//                 ),
//               }));
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to delete installment');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleEditCustomer = async () => {
//     setCustomerBookingId(bookingData.id);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(
//         `${BASE_URL}/getBookingCoustomerId/${bookingData.customer?.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setDealPrice(response.data.dealPrice);
//       setTokenAmount(response.data.tokenAmount);
//       setAgreementAmount(response.data.agreementAmount);
//       setStampDutyAmount(response.data.stampDutyAmount);
//       setRegistrationAmount(response.data.registrationAmount);
//       setGstAmount(response.data.gstAmount);
//       setElectricWaterAmount(response.data.electricWaterAmmount);
//       setLegalChargesAmount(response.data.legalChargesAmmout);
//       setBookedOn(response.data.bookedOn);
//       setBookingStatus(response.data.bookingStatus);
//       setName(response.data.customer.name);
//       setPhoneNumber(response.data.customer.phoneNumber);
//       setEmail(response.data.customer.email);
//       setAadharNumber(response.data.customer.aadharNumber);
//       setAddress(response.data.customer.address);
//       setPanCard(response.data.customer.panCard);
//       setAgentName(response.data.customer.agentName);
//       setBrokerage(response.data.customer.brokerage);
//       setBankName(response.data.customer.bankName || '');
//       setLoanAmount(response.data.customer.loanAmount || '');
//       setShowEditCustomerModal(true);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch customer details');
//     }
//   };

//   const handleUpdateCustomer = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         dealPrice,
//         tokenAmount,
//         agreementAmount,
//         stampDutyAmount,
//         registrationAmount,
//         gstAmount,
//         electricWaterAmmount: electricWaterAmount,
//         legalChargesAmmout: legalChargesAmount,
//         bookedOn,
//         bookingStatus,
//         customerDto: {
//           name,
//           phoneNumber,
//           email,
//           aadharNumber,
//           address,
//           panCard,
//           agentName,
//           brokerage,
//           bankName,
//           loanAmount: loanAmount.replace(/,/g, ''),
//         },
//       };
//       const response = await axios.put(
//         `${BASE_URL}/updateBooking/${customerBookingId}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if (response.status === 200) {
//         Alert.alert('Success', 'Customer details updated successfully');
//         setShowEditCustomerModal(false);
//         setRefreshKey((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to update customer details');
//     }
//   };

//   const handleGenerateSlip = async () => {
//     const htmlContent = `
//       <html>
//         <body style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>AG - Construction</h2>
//           <p>Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34</p>
//           <p>CONTACT: +91-9028999253 | 9373450092</p>
//           <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
//           <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//               <td style="padding: 5px;"><strong>Flat No / Plot No</strong></td>
//               <td style="padding: 5px;"><strong>${bookingData.residency.identifier}</strong></td>
//             </tr>
//             <tr>
//               <td style="padding: 5px;"><strong>Area</strong></td>
//               <td style="padding: 5px;"><strong>${bookingData.customer.address}</strong></td>
//             </tr>
//             <tr>
//               <td style="padding: 5px;"><strong>Location</strong></td>
//               <td style="padding: 5px;"><strong>${bookingData.residency.name}</strong></td>
//             </tr>
//           </table>
//           <p style="margin-top: 20px;">
//             RECEIVED with thanks from <strong>${bookingData.customer.name}</strong> the sum of
//             Rupees <strong>₹${bookingData.dealPrice.toLocaleString()}</strong> by Cheque / Cash / Draft No.
//             <strong>${bookingData.residency.identifier}</strong> flat / plot address
//             <strong>${bookingData.customer.address}</strong> in part / full / advance payment.
//           </p>
//           <p><strong>₹${bookingData.dealPrice.toLocaleString()}</strong></p>
//           <p><strong>Balance Amount: ₹${(
//             bookingData.dealPrice -
//             (bookingData.agreementAmount + bookingData.tokenAmount)
//           ).toLocaleString()}</strong></p>
//           <p><strong>Total Payable: ₹${(
//             bookingData.agreementAmount + bookingData.tokenAmount
//           ).toLocaleString()}</strong></p>
//           <div style="display: flex; justify-content: space-between; margin-top: 40px;">
//             <div>Customer Signature</div>
//             <div>Authorised Signature</div>
//           </div>
//         </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         base64: false,
//       });
//       await Sharing.shareAsync(uri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Share Customer Slip',
//         UTI: 'com.adobe.pdf',
//       });
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to generate or share PDF');
//     }
//   };

//   const handlePrintInstallments = async () => {
//     if (!installmentDetails) return;

//     const htmlContent = `
//       <html>
//         <body style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2>Customer Installments</h2>
//           <h3>Property Summary</h3>
//           <p><strong>Project:</strong> ${installmentDetails.residencyName}</p>
//           <p><strong>Customer:</strong> ${installmentDetails.customerName}</p>
//           <p><strong>Plot No:</strong> ${installmentDetails.identifier}</p>
//           <p><strong>Deal Price:</strong> ₹${installmentDetails.dealPrice.toLocaleString()}</p>
//           <p><strong>Agreement Price:</strong> ₹${installmentDetails.agreementAmount.toLocaleString()}</p>
//           <p><strong>Token Amount:</strong> ₹${installmentDetails.tokenAmount.toLocaleString()}</p>
//           <p><strong>Remaining:</strong> ₹${installmentDetails.remainingAmount.toLocaleString()}</p>
//           <h3>Installments</h3>
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead>
//               <tr>
//                 <th style="border: 1px solid #000; padding: 5px;">Date</th>
//                 <th style="border: 1px solid #000; padding: 5px;">Amount</th>
//                 <th style="border: 1px solid #000; padding: 5px;">Method</th>
//                 <th style="border: 1px solid #000; padding: 5px;">Note</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${installmentDetails.bookingInstallments
//                 .map(
//                   (item) => `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 5px;">${new Date(
//                     item.installmentDate
//                   ).toLocaleDateString('en-GB')}</td>
//                   <td style="border: 1px solid #000; padding: 5px;">₹${item.installmentAmount.toLocaleString()}</td>
//                   <td style="border: 1px solid #000; padding: 5px;">${item.installmentStatus}</td>
//                   <td style="border: 1px solid #000; padding: 5px;">${item.remark}</td>
//                 </tr>
//               `
//                 )
//                 .join('')}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         base64: false,
//       });
//       await Sharing.shareAsync(uri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Share Installment Details',
//         UTI: 'com.adobe.pdf',
//       });
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to generate or share PDF');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Flat Owner Management</Text>
//         <Text style={styles.subtitle}>Comprehensive property and customer management system</Text>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionBar}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => setShowCustomerSlipModal(true)}
//         >
//           <Icon name="file-document" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Customer Slip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#6b7280' }]}
//           onPress={() => setShowBankDetailModal(true)}
//         >
//           <Icon name="bank" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Add Bank Details</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#22c55e' }]}
//           onPress={() => setShowInstallmentModal(true)}
//         >
//           <Icon name="plus" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Add Installment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#0ea5e9' }]}
//           onPress={handleShowInstallments}
//         >
//           <Icon name="eye" size={20} color="#fff" />
//           <Text style={styles.buttonText}>View Installments</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#ef4444' }]}
//           onPress={handleCancelBooking}
//         >
//           <Icon name="close" size={20} color="#fff" />
//           <Text style={styles.buttonText}>Cancel Booking</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Customer Details */}
//       {bookingData && (
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>
//               Flat No: {bookingData.residency?.identifier || 'N/A'}
//             </Text>
//             <TouchableOpacity
//               style={styles.editButton}
//               onPress={handleEditCustomer}
//             >
//               <Icon name="pencil" size={20} color="#fff" />
//               <Text style={styles.buttonText}>Edit Details</Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.customerName}>{bookingData.customer?.name}</Text>
//           <Text style={styles.customerPhone}>{bookingData.customer?.phoneNumber}</Text>

//           {/* Customer Information */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Customer Information</Text>
//             <View style={styles.infoItem}>
//               <Icon name="email" size={20} color="#666" />
//               <Text>Email: {bookingData.customer?.email || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="card-account-details" size={20} color="#666" />
//               <Text>PAN Card: {bookingData.customer?.panCard || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="credit-card" size={20} color="#666" />
//               <Text>Aadhar: {bookingData.customer?.aadharNumber || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="map-marker" size={20} color="#666" />
//               <Text>Address: {bookingData.customer?.address || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="handshake" size={20} color="#666" />
//               <Text>Agent: {bookingData.customer?.agentName || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="currency-inr" size={20} color="#666" />
//               <Text>Brokerage: {bookingData.customer?.brokerage?.toLocaleString() || 'N/A'}</Text>
//             </View>
//           </View>

//           {/* Property Details */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Property Details</Text>
//             <View style={styles.infoItem}>
//               <Icon name="office-building" size={20} color="#666" />
//               <Text>Project: {bookingData.residency?.name || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document-outline" size={20} color="#666" />
//               <Text>Flat Type: {bookingData.residency?.flatType || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="home-variant" size={20} color="#666" />
//               <Text>Type: {bookingData.residency?.residencyType || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="numeric" size={20} color="#666" />
//               <Text>Floor: {bookingData.residency?.floorNumber || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="currency-inr" size={20} color="#666" />
//               <Text>Price: ₹{bookingData.residency?.price?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="information-outline" size={20} color="#666" />
//               <Text>Status: {bookingData.residency?.availabilityStatus || 'N/A'}</Text>
//             </View>
//           </View>

//           {/* Deal Information */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Deal Information</Text>
//             <View style={styles.infoItem}>
//               <Icon name="calendar" size={20} color="#666" />
//               <Text>
//                 Booked On: {bookingData.bookedOn
//                   ? new Date(bookingData.bookedOn).toLocaleDateString('en-GB')
//                   : 'N/A'}
//               </Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="book-open" size={20} color="#666" />
//               <Text>Status: {bookingData.bookingStatus || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="currency-inr" size={20} color="#666" />
//               <Text>Deal Price: ₹{bookingData.dealPrice?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="currency-inr" size={20} color="#666" />
//               <Text>Token: ₹{bookingData.tokenAmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document" size={20} color="#666" />
//               <Text>Agreement: ₹{bookingData.agreementAmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document" size={20} color="#666" />
//               <Text>Stamp Duty: ₹{bookingData.stampDutyAmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document" size={20} color="#666" />
//               <Text>Electric/Water: ₹{bookingData.electricWaterAmmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document" size={20} color="#666" />
//               <Text>GST: ₹{bookingData.gstAmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document" size={20} color="#666" />
//               <Text>Legal Charges: ₹{bookingData.legalChargesAmmout?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="file-document" size={20} color="#666" />
//               <Text>Registration: ₹{bookingData.registrationAmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="bank" size={20} color="#666" />
//               <Text>Bank: {bookingData.customer?.bankName || 'N/A'}</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Icon name="currency-inr" size={20} color="#666" />
//               <Text>Loan Amount: ₹{bookingData.customer?.loanAmount?.toLocaleString() || 'N/A'}</Text>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Bank Details Modal */}
//       <Modal
//         visible={showBankDetailModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowBankDetailModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Bank Details</Text>
//               <TouchableOpacity onPress={() => setShowBankDetailModal(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Bank Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={bankName}
//                 onChangeText={setBankName}
//                 placeholder="Enter bank name"
//               />
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Loan Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={loanAmount}
//                 onChangeText={setLoanAmount}
//                 placeholder="Enter loan amount"
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={styles.formActions}>
//               <TouchableOpacity
//                 style={[styles.button, { backgroundColor: '#6b7280' }]}
//                 onPress={() => setShowBankDetailModal(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleAddBankDetails}
//               >
//                 <Icon name="content-save" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>Save Details</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Add Installment Modal */}
//       <Modal
//         visible={showInstallmentModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowInstallmentModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Installment</Text>
//               <TouchableOpacity onPress={() => setShowInstallmentModal(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Installment Date</Text>
//               <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//                 <Text style={styles.input}>
//                   {installmentDate.toLocaleDateString('en-GB')}
//                 </Text>
//               </TouchableOpacity>
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={installmentDate}
//                   mode="date"
//                   display="default"
//                   onChange={(event, selectedDate) => {
//                     setShowDatePicker(false);
//                     if (selectedDate) setInstallmentDate(selectedDate);
//                   }}
//                 />
//               )}
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={installmentAmount}
//                 onChangeText={setInstallmentAmount}
//                 placeholder="Enter installment amount"
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Payment Method</Text>
//               <Picker
//                 selectedValue={installmentType}
//                 onValueChange={(itemValue) => setInstallmentType(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Payment Method" value="" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Note</Text>
//               <TextInput
//                 style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
//                 value={note}
//                 onChangeText={setNote}
//                 placeholder="Add a note..."
//                 multiline
//               />
//             </View>
//             <View style={styles.formActions}>
//               <TouchableOpacity
//                 style={[styles.button, { backgroundColor: '#6b7280' }]}
//                 onPress={() => setShowInstallmentModal(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.button, { backgroundColor: '#22c55e' }]}
//                 onPress={handleAddInstallment}
//               >
//                 <Icon name="plus" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>Add Installment</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Installment Details Modal */}
//       <Modal
//         visible={showInstallmentDetailsModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowInstallmentDetailsModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContentLarge}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Customer Installments</Text>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity
//                   style={[styles.button, { backgroundColor: '#22c55e' }]}
//                   onPress={handlePrintInstallments}
//                 >
//                   <Icon name="printer" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Print</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => setShowInstallmentDetailsModal(false)}
//                 >
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             {installmentDetails && (
//               <>
//                 <View style={styles.section}>
//                   <Text style={styles.sectionTitle}>Property Summary</Text>
//                   <Text>Project: {installmentDetails.residencyName}</Text>
//                   <Text>Customer: {installmentDetails.customerName}</Text>
//                   <Text>Plot No: {installmentDetails.identifier}</Text>
//                   <Text>Deal Price: ₹{installmentDetails.dealPrice.toLocaleString()}</Text>
//                   <Text>Agreement Price: ₹{installmentDetails.agreementAmount.toLocaleString()}</Text>
//                   <Text>Token Amount: ₹{installmentDetails.tokenAmount.toLocaleString()}</Text>
//                   <Text>Remaining: ₹{installmentDetails.remainingAmount.toLocaleString()}</Text>
//                 </View>
//                 <FlatList
//                   data={installmentDetails.bookingInstallments}
//                   keyExtractor={(item) => item.id.toString()}
//                   renderItem={({ item }) => (
//                     <View style={styles.installment}>
//                       <Text>
//                         Date: {new Date(item.installmentDate).toLocaleDateString('en-GB')}
//                       </Text>
//                       <Text>Amount: ₹{item.installmentAmount.toLocaleString()}</Text>
//                       <Text>Method: {item.installmentStatus}</Text>
//                       <Text>Note: {item.remark}</Text>
//                       <View style={styles.actionButtons}>
//                         <TouchableOpacity
//                           style={[styles.actionButton, { backgroundColor: '#0ea5e9' }]}
//                           onPress={() => handleEditInstallment(item.id)}
//                         >
//                           <Icon name="pencil" size={20} color="#fff" />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
//                           onPress={() => handleDeleteInstallment(item.id)}
//                         >
//                           <Icon name="delete" size={20} color="#fff" />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   )}
//                 />
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Installment Modal */}
//       <Modal
//         visible={showEditInstallmentModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowEditInstallmentModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Installment</Text>
//               <TouchableOpacity onPress={() => setShowEditInstallmentModal(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Date</Text>
//               <TouchableOpacity onPress={() => setShowEditDatePicker(true)}>
//                 <Text style={styles.input}>
//                   {editInstallmentDate.toLocaleDateString('en-GB')}
//                 </Text>
//               </TouchableOpacity>
//               {showEditDatePicker && (
//                 <DateTimePicker
//                   value={editInstallmentDate}
//                   mode="date"
//                   display="default"
//                   onChange={(event, selectedDate) => {
//                     setShowEditDatePicker(false);
//                     if (selectedDate) setEditInstallmentDate(selectedDate);
//                   }}
//                 />
//               )}
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={editInstallmentAmount}
//                 onChangeText={setEditInstallmentAmount}
//                 placeholder="Enter amount"
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Payment Method</Text>
//               <Picker
//                 selectedValue={editInstallmentType}
//                 onValueChange={(itemValue) => setEditInstallmentType(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Payment Method" value="" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Remark</Text>
//               <TextInput
//                 style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
//                 value={editInstallmentRemark}
//                 onChangeText={setEditInstallmentRemark}
//                 placeholder="Add a remark..."
//                 multiline
//               />
//             </View>
//             <View style={styles.formActions}>
//               <TouchableOpacity
//                 style={[styles.button, { backgroundColor: '#6b7280' }]}
//                 onPress={() => setShowEditInstallmentModal(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleUpdateInstallment}
//               >
//                 <Icon name="content-save" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>Update</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Customer Modal */}
//       <Modal
//         visible={showEditCustomerModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowEditCustomerModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <ScrollView style={styles.modalContentLarge}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Customer Details</Text>
//               <TouchableOpacity onPress={() => setShowEditCustomerModal(false)}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.formSection}>
//               <Text style={styles.sectionTitle}>Booking Details</Text>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Deal Price</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={dealPrice}
//                   onChangeText={setDealPrice}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Token Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={tokenAmount}
//                   onChangeText={setTokenAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Agreement Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={agreementAmount}
//                   onChangeText={setAgreementAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Stamp Duty</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={stampDutyAmount}
//                   onChangeText={setStampDutyAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Registration Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={registrationAmount}
//                   onChangeText={setRegistrationAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>GST Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={gstAmount}
//                   onChangeText={setGstAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Electric Water Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={electricWaterAmount}
//                   onChangeText={setElectricWaterAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Legal Charges Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={legalChargesAmount}
//                   onChangeText={setLegalChargesAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Booked On</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={bookedOn}
//                   onChangeText={setBookedOn}
//                   placeholder="YYYY-MM-DD"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Booking Status</Text>
//                 <Picker
//                   selectedValue={bookingStatus}
//                   onValueChange={(itemValue) => setBookingStatus(itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="PENDING" value="PENDING" />
//                   <Picker.Item label="COMPLETE" value="COMPLETE" />
//                   <Picker.Item label="CANCELLED" value="CANCELLED" />
//                 </Picker>
//               </View>
//             </View>
//             <View style={styles.formSection}>
//               <Text style={styles.sectionTitle}>Customer Information</Text>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={name}
//                   onChangeText={setName}
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={phoneNumber}
//                   onChangeText={setPhoneNumber}
//                   keyboardType="phone-pad"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Email</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Aadhar Number</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={aadharNumber}
//                   onChangeText={setAadharNumber}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>PAN Number</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={panCard}
//                   onChangeText={setPanCard}
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Agent Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={agentName}
//                   onChangeText={setAgentName}
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Brokerage</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={brokerage}
//                   onChangeText={setBrokerage}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Bank Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={bankName}
//                   onChangeText={setBankName}
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Loan Amount</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={loanAmount}
//                   onChangeText={setLoanAmount}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.formGroup}>
//                 <Text style={styles.label}>Address</Text>
//                 <TextInput
//                   style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
//                   value={address}
//                   onChangeText={setAddress}
//                   multiline
//                 />
//               </View>
//             </View>
//             <View style={styles.formActions}>
//               <TouchableOpacity
//                 style={[styles.button, { backgroundColor: '#6b7280' }]}
//                 onPress={() => setShowEditCustomerModal(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleUpdateCustomer}
//               >
//                 <Icon name="content-save" size={20} color="#fff" />
//                 <Text style={styles.buttonText}>Update Details</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>

//       {/* Customer Slip Modal */}
//       <Modal
//         visible={showCustomerSlipModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowCustomerSlipModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContentLarge}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Customer Slip</Text>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity
//                   style={[styles.button, { backgroundColor: '#22c55e' }]}
//                   onPress={handleGenerateSlip}
//                 >
//                   <Icon name="download" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Download PDF</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => setShowCustomerSlipModal(false)}
//                 >
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             {bookingData && (
//               <View style={styles.slipContent}>
//                 <Text style={styles.slipHeader}>AG - Construction</Text>
//                 <Text style={styles.slipText}>
//                   Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34
//                 </Text>
//                 <Text style={styles.slipText}>CONTACT: +91-9028999253 | 9373450092</Text>
//                 <Text style={styles.slipText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
//                 <View style={styles.slipTable}>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableLabel}>Flat No / Plot No</Text>
//                     <Text style={styles.slipTableValue}>{bookingData.residency.identifier}</Text>
//                   </View>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableLabel}>Area</Text>
//                     <Text style={styles.slipTableValue}>{bookingData.customer.address}</Text>
//                   </View>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableLabel}>Location</Text>
//                     <Text style={styles.slipTableValue}>{bookingData.residency.name}</Text>
//                   </View>
//                 </View>
//                 <Text style={styles.slipText}>
//                   RECEIVED with thanks from <Text style={styles.bold}>{bookingData.customer.name}</Text> the sum of
//                   Rupees <Text style={styles.bold}>₹{bookingData.dealPrice.toLocaleString()}</Text> by Cheque / Cash / Draft No.
//                   <Text style={styles.bold}>{bookingData.residency.identifier}</Text> flat / plot address
//                   <Text style={styles.bold}>{bookingData.customer.address}</Text> in part / full / advance payment.
//                 </Text>
//                 <Text style={styles.slipText}>
//                   <Text style={styles.bold}>₹{bookingData.dealPrice.toLocaleString()}</Text>
//                 </Text>
//                 <Text style={styles.slipText}>
//                   <Text style={styles.bold}>
//                     Balance Amount: ₹{(
//                       bookingData.dealPrice -
//                       (bookingData.agreementAmount + bookingData.tokenAmount)
//                     ).toLocaleString()}
//                   </Text>
//                 </Text>
//                 <Text style={styles.slipText}>
//                   <Text style={styles.bold}>
//                     Total Payable: ₹{(
//                       bookingData.agreementAmount + bookingData.tokenAmount
//                     ).toLocaleString()}
//                   </Text>
//                 </Text>
//                 <View style={styles.slipSignatures}>
//                   <Text>Customer Signature</Text>
//                   <Text>Authorised Signature</Text>
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   actionBar: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3b82f6',
//     padding: 10,
//     borderRadius: 5,
//     margin: 5,
//     flex: 1,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#0ea5e9',
//     padding: 8,
//     borderRadius: 5,
//   },
//   customerName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   customerPhone: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 10,
//   },
//   section: {
//     marginTop: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#333',
//   },
//   infoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     width: '90%',
//     maxHeight: '80%',
//   },
//   modalContentLarge: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     width: '90%',
//     maxHeight: '90%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   formActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   installment: {
//     backgroundColor: '#f9f9f9',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   actionButton: {
//     padding: 8,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   slipContent: {
//     padding: 10,
//   },
//   slipHeader: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   slipText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   slipTable: {
//     marginBottom: 20,
//   },
//   slipTableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   slipTableLabel: {
//     fontWeight: '600',
//   },
//   slipTableValue: {
//     fontWeight: 'bold',
//   },
//   slipSignatures: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default FlatOwner;










// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from 'react-native';

// const FlatOwner = () => {
//   const { bookingId, customerName } = useRoute().params;
//   const navigation = useNavigation();
//   const letterRef = useRef();

//   // State management
//   const [customerDetail, setCustomerDetail] = useState(null);
//   const [bankName, setBankName] = useState('');
//   const [loanAmount, setLoanAmount] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [showBankDetailForm, setShowBankDetailForm] = useState(false);
//   const [showInstallmentForm, setShowInstallmentForm] = useState(false);
//   const [installmentDate, setInstallmentDate] = useState(new Date());
//   const [installmentAmount, setInstallmentAmount] = useState('');
//   const [selectInstallmentType, setSelectInstallmentType] = useState('');
//   const [showCustomerInstallmentCard, setShowCustomerInstallmentCard] = useState(false);
//   const [customerInstallmentData, setCustomerInstallmentData] = useState(null);
//   const [customerSlip, setCustomerSlip] = useState(false);
//   const [note, setNote] = useState('');
//   const [showCustomerInstallmentEditForm, setShowCustomerInstallmentEditForm] = useState(false);
//   const [installmentId, setInstallmentId] = useState('');
//   const [installmentEditFormDate, setInstallmentEditFormDate] = useState(new Date());
//   const [installmentEditFormAmount, setInstallmentEditFormAmount] = useState('');
//   const [installmentEditFormPaymentMethod, setInstallmentEditFormPaymentMethod] = useState('');
//   const [installmentEditFormRemark, setInstallmentEditFormRemark] = useState('');
//   const [showEditCustomerForm, setShowEditCustomerForm] = useState(false);
//   const [customerBookingUpdateId, setCustomerBookingUpdateId] = useState('');
//   const [dealPrice, setDealPrice] = useState('');
//   const [tokenAmount, setTokenAmount] = useState('');
//   const [agreementAmount, setAgreementAmount] = useState('');
//   const [stampDutyAmount, setStampDutyAmount] = useState('');
//   const [registrationAmount, setRegistrationAmount] = useState('');
//   const [gstAmount, setGstAmount] = useState('');
//   const [electricWaterAmount, setElectricWaterAmount] = useState('');
//   const [legalChargesAmount, setLegalChargesAmount] = useState('');
//   const [bookedOn, setBookedOn] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [panCard, setPanCard] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [brokerage, setBrokerage] = useState('');
//   const [customerBookingId, setCustomerBookingId] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch customer profile
//   useEffect(() => {
//     const fetchCustomerProfile = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         if (!token) {
//           setError('No authentication token found');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         setCustomerId(response?.data?.customer?.id);
//         setCustomerDetail(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch customer details');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchCustomerProfile();
//   }, [bookingId, refreshKey]);

//   // Handlers
//   const handleSubmitLoan = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         bankName,
//         loanAmount: loanAmount.replace(/,/g, ''),
//       };

//       const response = await axios.post(`${BASE_URL}/addLoanDetails/${customerId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Bank details added successfully');
//         setBankName('');
//         setLoanAmount('');
//         setRefreshKey((prev) => prev + 1);
//         setShowBankDetailForm(false);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add bank details');
//     }
//   };

//   const handleCancelBooking = async () => {
//     Alert.alert(
//       'Are you sure?',
//       'Do you want to cancel the booking?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, cancel it!',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');
//               await axios.put(`${BASE_URL}/cancelBooking/${bookingId}`, {}, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               Alert.alert('Success', 'Booking has been cancelled');
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to cancel booking');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const handleAddFlatInstallment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = [{
//         installmentDate: installmentDate.toISOString().split('T')[0],
//         installmentAmount: installmentAmount.replace(/,/g, ''),
//         installmentStatus: selectInstallmentType,
//         remark: note,
//       }];

//       await axios.post(`${BASE_URL}/${bookingId}/addInstallment`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       Alert.alert('Success', 'Payment added successfully');
//       setShowInstallmentForm(false);
//  Mussolini
//       setInstallmentDate(new Date());
//       setInstallmentAmount('');
//       setSelectInstallmentType('');
//       setNote('');
//       setRefreshKey((prev) => prev + 1);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add installment');
//     }
//   };

//   const handleShowInstallment = async () => {
//     setShowCustomerInstallmentCard(true);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setCustomerInstallmentData(response.data);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch installments');
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const htmlContent = `
//         <div style="padding: 20px;">
//           <h2>AG - Construction</h2>
//           <p>Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34</p>
//           <p>CONTACT: +91-9028999253 | 9373450092</p>
//           <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
//           <div>
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr><td><strong>Flat No / Plot No</strong></td><td><strong>${customerDetail.residency.identifier}</strong></td></tr>
//               <tr><td><strong>Area</strong></td><td><strong>${customerDetail.customer.address}</strong></td></tr>
//               <tr><td><strong>Location</strong></td><td><strong>${customerDetail.residency.name}</strong></td></tr>
//             </table>
//           </div>
//           <p>RECEIVED with thanks from <strong>${customerDetail.customer.name}</strong> the sum of Rupees <strong>₹${customerDetail.dealPrice.toLocaleString()}</strong> by Cheque / Cash / Draft No. <strong>${customerDetail.residency.identifier}</strong> flat / plot address <strong>${customerDetail.customer.address}</strong> in part / full / advance payment.</p>
//           <p><strong>Balance Amount: ₹${(customerDetail.dealPrice - (customerDetail.agreementAmount + customerDetail.tokenAmount)).toLocaleString()}</strong></p>
//           <p><strong>Total Payable: ₹${(customerDetail.agreementAmount + customerDetail.tokenAmount).toLocaleString()}</strong></p>
//           <div style="display: flex; justify-content: space-between;">
//             <div>Customer Signature</div>
//             <div>Authorised Signature</div>
//           </div>
//         </div>
//       `;

//       const { uri } = await Print.printToFileAsync({ html: htmlContent });
//       await Sharing.shareAsync(uri);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   const handleEditInstallment = async (id) => {
//     setInstallmentId(id);
//     setShowCustomerInstallmentEditForm(true);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getBookingInstallmentById/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setInstallmentEditFormAmount(response.data.installmentAmount.toString());
//       setInstallmentEditFormDate(new Date(response.data.installmentDate));
//       setInstallmentEditFormPaymentMethod(response.data.installmentStatus);
//       setInstallmentEditFormRemark(response.data.remark);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch installment details');
//     }
//   };

//   const handleSubmitEditInstallment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         installmentDate: installmentEditFormDate.toISOString().split('T')[0],
//         installmentAmount: installmentEditFormAmount.replace(/,/g, ''),
//         remark: installmentEditFormRemark,
//         installmentStatus: installmentEditFormPaymentMethod,
//       };

//       const response = await axios.put(`${BASE_URL}/updateBookingInstallment/${installmentId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Installment updated successfully');
//         handleShowInstallment();
//         setShowCustomerInstallmentEditForm(false);
//         setInstallmentEditFormDate(new Date());
//         setInstallmentEditFormAmount('');
//         setInstallmentEditFormRemark('');
//         setInstallmentEditFormPaymentMethod('');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to update installment');
//     }
//   };

//   const handleDeleteInstallment = async (id) => {
//     Alert.alert(
//       'Are you sure?',
//       'Do you want to delete this installment?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');
//               await axios.delete(`${BASE_URL}/deleteBookingInstallment/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               Alert.alert('Success', 'Installment has been deleted');
//               setRefreshKey((prev) => prev + 1);
//               setCustomerInstallmentData((prev) => ({
//                 ...prev,
//                 bookingInstallments: prev.bookingInstallments.filter((item) => item.id !== id),
//               }));
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to delete installment');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const handlePrintInstallment = async () => {
//     try {
//       const htmlContent = `
//         <div style="padding: 20px;">
//           <h3>Property Summary</h3>
//           <p><strong>Project:</strong> ${customerInstallmentData.residencyName}</p>
//           <p><strong>Customer:</strong> ${customerInstallmentData.customerName}</p>
//           <p><strong>Plot No:</strong> ${customerInstallmentData.identifier}</p>
//           <p><strong>Deal Price:</strong> ₹${customerInstallmentData.dealPrice.toLocaleString()}</p>
//           <p><strong>Agreement Price:</strong> ₹${customerInstallmentData.agreementAmount.toLocaleString()}</p>
//           <p><strong>Token Amount:</strong> ₹${customerInstallmentData.tokenAmount.toLocaleString()}</p>
//           <p><strong>Remaining:</strong> ₹${customerInstallmentData.remainingAmount.toLocaleString()}</p>
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead>
//               <tr><th>Date</th><th>Amount</th><th>Method</th><th>Note</th></tr>
//             </thead>
//             <tbody>
//               ${customerInstallmentData.bookingInstallments
//                 .map(
//                   (item) => `
//                 <tr>
//                   <td>${new Date(item.installmentDate).toLocaleDateString('en-GB')}</td>
//                   <td>₹${item.installmentAmount.toLocaleString()}</td>
//                   <td>${item.installmentStatus}</td>
//                   <td>${item.remark}</td>
//                 </tr>
//               `,
//                 )
//                 .join('')}
//             </tbody>
//           </table>
//         </div>
//       `;

//       const { uri } = await Print.printToFileAsync({ html: htmlContent });
//       await Sharing.shareAsync(uri);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to print installments');
//     }
//   };

//   const handleEditCustomerDetail = async (customerId, bookingId) => {
//     setCustomerBookingUpdateId(customerId);
//     setCustomerBookingId(bookingId);
//     setShowEditCustomerForm(true);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getBookingCoustomerId/${customerId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       setAgreementAmount(response.data.agreementAmount.toString());
//       setDealPrice(response.data.dealPrice.toString());
//       setTokenAmount(response.data.tokenAmount.toString());
//       setStampDutyAmount(response.data.stampDutyAmount.toString());
//       setRegistrationAmount(response.data.registrationAmount.toString());
//       setGstAmount(response.data.gstAmount.toString());
//       setElectricWaterAmount(response.data.electricWaterAmmount?.toString() || '');
//       setLegalChargesAmount(response.data.legalChargesAmmout?.toString() || '');
//       setBookedOn(response.data.bookedOn);
//       setBookingStatus(response.data.bookingStatus);
//       setName(response.data.customer.name);
//       setPhoneNumber(response.data.customer.phoneNumber);
//       setEmail(response.data.customer.email || '');
//       setAadharNumber(response.data.customer.aadharNumber || '');
//       setAddress(response.data.customer.address);
//       setPanCard(response.data.customer.panCard || '');
//       setAgentName(response.data.customer.agentName || '');
//       setBrokerage(response.data.customer.brokerage?.toString() || '');
//       setBankName(response.data.customer.bankName || '');
//       setLoanAmount(response.data.customer.loanAmount?.toString() || '');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch customer details');
//     }
//   };

//   const handleUpdateCustomerDetail = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         dealPrice,
//         tokenAmount,
//         agreementAmount,
//         stampDutyAmount,
//         registrationAmount,
//         gstAmount,
//         electricWaterAmmount: electricWaterAmount,
//         legalChargesAmmout: legalChargesAmount,
//         bookedOn,
//         bookingStatus,
//         customerDto: {
//           name,
//           phoneNumber,
//           email,
//           aadharNumber,
//           address,
//           panCard,
//           agentName,
//           brokerage,
//           bankName,
//           loanAmount: loanAmount.replace(/,/g, ''),
//         },
//       };

//       const response = await axios.put(`${BASE_URL}/updateBooking/${customerBookingId}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Customer details updated successfully');
//         setRefreshKey((prev) => prev + 1);
//         setShowEditCustomerForm(false);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to update customer details');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>
//           <Ionicons name="business" size={24} color="#fff" /> Flat Owner Management
//         </Text>
//         <Text style={styles.subtitle}>Comprehensive property and customer management system</Text>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionBar}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setCustomerSlip(true)}>
//           <Ionicons name="document-text" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Customer Slip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowBankDetailForm(true)}>
//           <Ionicons name="cash" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Add Bank Details</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowInstallmentForm(true)}>
//           <Ionicons name="add" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Add Installment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={handleShowInstallment}>
//           <Ionicons name="eye" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>View Installments</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={handleCancelBooking}>
//           <Ionicons name="close" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Cancel Booking</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Customer Details Card */}
//       {customerDetail && (
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>
//               <Ionicons name="business" size={20} color="#333" /> Flat No: {customerDetail.residency?.identifier || 'N/A'}
//             </Text>
//             <TouchableOpacity
//               style={styles.editButton}
//               onPress={() => handleEditCustomerDetail(customerDetail.customer?.id, customerDetail.id)}
//             >
//               <Ionicons name="pencil" size={20} color="#fff" />
//               <Text style={styles.editButtonText}>Edit Details</Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.cardSubtitle}>{customerDetail.customer?.name || 'N/A'}</Text>
//           <Text style={styles.cardSubtitle}>{customerDetail.customer?.phoneNumber || 'N/A'}</Text>

//           <View style={styles.detailsGrid}>
//             {/* Customer Information */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>
//                 <Ionicons name="person" size={18} color="#333" /> Customer Information
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="mail" size={16} color="#666" /> Email: {customerDetail.customer?.email || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="card" size={16} color="#666" /> PAN Card: {customerDetail.customer?.panCard || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="id-card" size={16} color="#666" /> Aadhar: {customerDetail.customer?.aadharNumber || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="home" size={16} color="#666" /> Address: {customerDetail.customer?.address || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="people" size={16} color="#666" /> Agent: {customerDetail.customer?.agentName || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Brokerage: {customerDetail.customer?.brokerage?.toLocaleString() || 'N/A'}
//               </Text>
//             </View>

//             {/* Residency Information */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>
//                 <Ionicons name="business" size={18} color="#333" /> Property Details
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="business" size={16} color="#666" /> Project: {customerDetail.residency?.name || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="home" size={16} color="#666" /> Flat Type: {customerDetail.residency?.flatType || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="home" size={16} color="#666" /> Type: {customerDetail.residency?.residencyType || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="layers" size={16} color="#666" /> Floor: {customerDetail.residency?.floorNumber || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Price: ₹{customerDetail.residency?.price?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="information-circle" size={16} color="#666" /> Status: {customerDetail.residency?.availabilityStatus || 'N/A'}
//               </Text>
//             </View>

//             {/* Deal Information */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>
//                 <Ionicons name="document" size={18} color="#333" /> Deal Information
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="calendar" size={16} color="#666" /> Booked On: {customerDetail.bookedOn ? new Date(customerDetail.bookedOn).toLocaleDateString('en-GB') : 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="book" size={16} color="#666" /> Status: {customerDetail.bookingStatus || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Deal Price: ₹{customerDetail.dealPrice?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Token: ₹{customerDetail.tokenAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Agreement: ₹{customerDetail.agreementAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Stamp Duty: ₹{customerDetail.stampDutyAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Electric/Water: ₹{customerDetail.electricWaterAmmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> GST Amount: ₹{customerDetail.gstAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Legal Charges: ₹{customerDetail.legalChargesAmmout?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Registration: ₹{customerDetail.registrationAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Bank: {customerDetail.customer?.bankName || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Bank Amount: ₹{customerDetail.customer?.loanAmount?.toLocaleString() || 'N/A'}
//               </Text>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Bank Details Modal */}
//       <Modal visible={showBankDetailForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Bank Details</Text>
//               <TouchableOpacity onPress={() => setShowBankDetailForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.form}>
//               <Text style={styles.label}>Bank Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={bankName}
//                 onChangeText={setBankName}
//                 placeholder="Enter bank name"
//               />
//               <Text style={styles.label}>Loan Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={loanAmount}
//                 onChangeText={setLoanAmount}
//                 keyboardType="numeric"
//                 placeholder="Enter loan amount"
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowBankDetailForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleSubmitLoan}>
//                   <Ionicons name="save" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Save Details</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Installment Form Modal */}
//       <Modal visible={showInstallmentForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Installment</Text>
//               <TouchableOpacity onPress={() => setShowInstallmentForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.form}>
//               <Text style={styles.label}>Installment Date</Text>
//               <DateTimePicker
//                 value={installmentDate}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) => date && setInstallmentDate(date)}
//               />
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={installmentAmount}
//                 onChangeText={setInstallmentAmount}
//                 keyboardType="numeric"
//                 placeholder="Enter installment amount"
//               />
//               <Text style={styles.label}>Payment Method</Text>
//               <Picker
//                 selectedValue={selectInstallmentType}
//                 onValueChange={setSelectInstallmentType}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Payment Method" value="" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//               <Text style={styles.label}>Note</Text>
//               <TextInput
//                 style={[styles.input, styles.textarea]}
//                 value={note}
//                 onChangeText={setNote}
//                 multiline
//                 numberOfLines={3}
//                 placeholder="Add a note..."
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowInstallmentForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.primaryButton]}
//                   onPress={handleAddFlatInstallment}
//                 >
//                   <Ionicons name="add" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Add Installment</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Installment Details Modal */}
//       <Modal visible={showCustomerInstallmentCard} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modal, styles.modalLarge]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Customer Installments</Text>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handlePrintInstallment}>
//                   <Ionicons name="print" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Print</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setShowCustomerInstallmentCard(false)}>
//                   <Ionicons name="close" size={24} color="#333" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             {customerInstallmentData && (
//               <View style={styles.installmentContent}>
//                 <Text style={styles.sectionTitle}>Property Summary</Text>
//                 <View style={styles.summaryGrid}>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Project:</Text> {customerInstallmentData.residencyName}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Customer:</Text> {customerInstallmentData.customerName}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Plot No:</Text> {customerInstallmentData.identifier}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Deal Price:</Text> ₹{customerInstallmentData.dealPrice?.toLocaleString() || 'N/A'}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Agreement Price:</Text> ₹{customerInstallmentData.agreementAmount?.toLocaleString() || 'N/A'}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Token Amount:</Text> ₹{customerInstallmentData.tokenAmount?.toLocaleString()}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Remaining:</Text> ₹{customerInstallmentData.remainingAmount?.toLocaleString()}
// _angles                  </Text>
//                 </View>
//                 <View style={styles.tableContainer}>
//                   <View style={styles.tableHeader}>
//                     <Text style={styles.tableHeaderText}>Date</Text>
//                     <Text style={styles.tableHeaderText}>Amount</Text>
//                     <Text style={styles.tableHeaderText}>Method</Text>
//                     <Text style={styles.tableHeaderText}>Note</Text>
//                     <Text style={styles.tableHeaderText}>Actions</Text>
//                   </View>
//                   {customerInstallmentData.bookingInstallments.map((item) => (
//                     <View key={item.id} style={styles.tableRow}>
//                       <Text style={styles.tableCell}>{new Date(item.installmentDate).toLocaleDateString('en-GB')}</Text>
//                       <Text style={styles.tableCell}>₹{item.installmentAmount.toLocaleString()}</Text>
//                       <Text style={styles.tableCell}>{item.installmentStatus}</Text>
//                       <Text style={styles.tableCell}>{item.remark}</Text>
//                       <View style={styles.tableCell}>
//                         <TouchableOpacity style={styles.actionButtonSmall} onPress={() => handleEditInstallment(item.id)}>
//                           <Ionicons name="pencil" size={16} color="#fff" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={[styles.actionButtonSmall, styles.deleteButton]} onPress={() => handleDeleteInstallment(item.id)}>
//                           <Ionicons name="trash" size={16} color="#fff" />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Installment Modal */}
//       <Modal visible={showCustomerInstallmentEditForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Installment</Text>
//               <TouchableOpacity onPress={() => setShowCustomerInstallmentEditForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.form}>
//               <Text style={styles.label}>Date</Text>
//               <DateTimePicker
//                 value={installmentEditFormDate}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) => date && setInstallmentEditFormDate(date)}
//               />
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={installmentEditFormAmount}
//                 onChangeText={setInstallmentEditFormAmount}
//                 keyboardType="numeric"
//                 placeholder="Enter amount"
//               />
//               <Text style={styles.label}>Payment Method</Text>
//               <Picker
//                 selectedValue={installmentEditFormPaymentMethod}
//                 onValueChange={setInstallmentEditFormPaymentMethod}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Payment Method" value="" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//               <Text style={styles.label}>Remark</Text>
//               <TextInput
//                 style={[styles.input, styles.textarea]}
//                 value={installmentEditFormRemark}
//                 onChangeText={setInstallmentEditFormRemark}
//                 multiline
//                 numberOfLines={3}
//                 placeholder="Enter remark"
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowCustomerInstallmentEditForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.primaryButton]}
//                   onPress={handleSubmitEditInstallment}
//                 >
//                   <Ionicons name="save" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Update</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Customer Form Modal */}
//       <Modal visible={showEditCustomerForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modal, styles.modalLarge]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Customer Details</Text>
//               <TouchableOpacity onPress={() => setShowEditCustomerForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <ScrollView style={styles.form}>
//               <Text style={styles.sectionTitle}>Booking Details</Text>
//               <Text style={styles.label}>Deal Price</Text>
//               <TextInput
//                 style={styles.input}
//                 value={dealPrice}
//                 onChangeText={setDealPrice}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Token Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={tokenAmount}
//                 onChangeText={setTokenAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Agreement Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={agreementAmount}
//                 onChangeText={setAgreementAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Stamp Duty</Text>
//               <TextInput
//                 style={styles.input}
//                 value={stampDutyAmount}
//                 onChangeText={setStampDutyAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Registration Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={registrationAmount}
//                 onChangeText={setRegistrationAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>GST Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={gstAmount}
//                 onChangeText={setGstAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Electric Water Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={electricWaterAmount}
//                 onChangeText={setElectricWaterAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Legal Charges Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={legalChargesAmount}
//                 onChangeText={setLegalChargesAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Booked On</Text>
//               <DateTimePicker
//                 value={bookedOn ? new Date(bookedOn) : new Date()}
//                 mode="date"
//                 display="default"
//                 onChange={(event, date) => date && setBookedOn(date.toISOString().split('T')[0])}
//               />
//               <Text style={styles.label}>Booking Status</Text>
//               <Picker
//                 selectedValue={bookingStatus}
//                 onValueChange={setBookingStatus}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="PENDING" value="PENDING" />
//                 <Picker.Item label="COMPLETE" value="COMPLETE" />
//                 <Picker.Item label="CANCELLED" value="CANCELLED" />
//               </Picker>

//               <Text style={styles.sectionTitle}>Customer Information</Text>
//               <Text style={styles.label}>Name</Text>
//               <TextInput style={styles.input} value={name} onChangeText={setName} />
//               <Text style={styles.label}>Phone Number</Text>
//               <TextInput
//                 style={styles.input}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 keyboardType="phone-pad"
//               />
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//               />
//               <Text style={styles.label}>Aadhar Number</Text>
//               <TextInput
//                 style={styles.input}
//                 value={aadharNumber}
//                 onChangeText={setAadharNumber}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>PAN Number</Text>
//               <TextInput style={styles.input} value={panCard} onChangeText={setPanCard} />
//               <Text style={styles.label}>Agent Name</Text>
//               <TextInput style={styles.input} value={agentName} onChangeText={setAgentName} />
//               <Text style={styles.label}>Brokerage</Text>
//               <TextInput
//                 style={styles.input}
//                 value={brokerage}
//                 onChangeText={setBrokerage}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Bank Name</Text>
//               <TextInput style={styles.input} value={bankName} onChangeText={setBankName} />
//               <Text style={styles.label}>Loan Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={loanAmount}
//                 onChangeText={setLoanAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Address</Text>
//               <TextInput
//                 style={[styles.input, styles.textarea]}
//                 value={address}
//                 onChangeText={setAddress}
//                 multiline
//                 numberOfLines={3}
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowEditCustomerForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.primaryButton]}
//                   onPress={handleUpdateCustomerDetail}
//                 >
//                   <Ionicons name="save" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Update Details</Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>

//       {/* Customer Slip Modal */}
//       <Modal visible={customerSlip} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modal, styles.modalLarge]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Customer Slip</Text>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleDownload}>
//                   <Ionicons name="download" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Download PDF</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setCustomerSlip(false)}>
//                   <Ionicons name="close" size={24} color="#333" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.slipContent}>
//               <Text style={styles.slipHeader}>AG - Construction</Text>
//               <Text style={styles.slipText}>
//                 Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34
//               </Text>
//               <Text style={styles.slipText}>CONTACT: +91-9028999253 | 9373450092</Text>
//               <Text style={styles.slipText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
//               <View style={styles.slipDetails}>
//                 <View style={styles.slipTable}>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableCell}>Flat No / Plot No</Text>
//                     <Text style={styles.slipTableCell}>{customerDetail?.residency?.identifier}</Text>
//                   </View>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableCell}>Area</Text>
//                     <Text style={styles.slipTableCell}>{customerDetail?.customer?.address}</Text>
//                   </View>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableCell}>Location</Text>
//                     <Text style={styles.slipTableCell}>{customerDetail?.residency?.name}</Text>
//                   </View>
//                 </View>
//               </View>
//               <Text style={styles.slipText}>
//                 RECEIVED with thanks from <Text style={styles.bold}>{customerDetail?.customer?.name}</Text> the sum of
//                 Rupees <Text style={styles.bold}>₹{customerDetail?.dealPrice?.toLocaleString()}</Text> by Cheque / Cash /
//                 Draft No. <Text style={styles.bold}>{customerDetail?.residency?.identifier}</Text> flat / plot address{' '}
//                 <Text style={styles.bold}>{customerDetail?.customer?.address}</Text> in part / full / advance payment.
//               </Text>
//               <Text style={styles.slipText}>
//                 <Text style={styles.bold}>
//                   Balance Amount: ₹{(customerDetail?.dealPrice - (customerDetail?.agreementAmount + customerDetail?.tokenAmount))?.toLocaleString()}
//                 </Text>
//               </Text>
//               <Text style={styles.slipText}>
//                 <Text style={styles.bold}>
//                   Total Payable: ₹{(customerDetail?.agreementAmount + customerDetail?.tokenAmount)?.toLocaleString()}
//                 </Text>
//               </Text>
//               <View style={styles.slipSignatures}>
//                 <Text>Customer Signature</Text>
//                 <Text>Authorised Signature</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: '#4a90e2',
//     padding: 20,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#fff',
//     marginTop: 5,
//   },
//   actionBar: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4a90e2',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   actionButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   cancelButton: {
//     backgroundColor: '#ef4444',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   cardSubtitle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4a90e2',
//     padding: 8,
//     borderRadius: 5,
//   },
//   editButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//   },
//   detailsGrid: {
//     marginTop: 10,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   infoItem: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modal: {
//     backgroundColor: '#fff',
//     width: '90%',
//     borderRadius: 8,
//     padding: 20,
//   },
//   modalLarge: {
//     width: '95%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   form: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 14,
//   },
//   textarea: {
//     height: 80,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   formActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   primaryButton: {
//     backgroundColor: '#4a90e2',
//   },
//   cancelButton: {
//     backgroundColor: '#6b7280',
//   },
//   buttonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   installmentContent: {
//     marginBottom: 20,
//   },
//   summaryGrid: {
//     marginBottom: 20,
//   },
//   summaryItem: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   summaryLabel: {
//     fontWeight: '600',
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   tableHeaderText: {
//     flex: 1,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   tableCell: {
//     flex: 1,
//     fontSize: 14,
//   },
//   actionButtonSmall: {
//     backgroundColor: '#4a90e2',
//     padding: 5,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   deleteButton: {
//     backgroundColor: '#ef4444',
//   },
//   slipContent: {
//     padding: 20,
//   },
//   slipHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   slipText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   slipDetails: {
//     marginVertical: 10,
//   },
//   slipTable: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   slipTableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   slipTableCell: {
//     flex: 1,
//     padding: 5,
//     fontSize: 14,
//   },
//   slipSignatures: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default FlatOwner;














// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const FlatOwner = () => {
//   const { bookingId, customerName } = useRoute().params;
//   const navigation = useNavigation();
//   const letterRef = useRef();

//   // State management
//   const [customerDetail, setCustomerDetail] = useState(null);
//   const [bankName, setBankName] = useState('');
//   const [loanAmount, setLoanAmount] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [showBankDetailForm, setShowBankDetailForm] = useState(false);
//   const [showInstallmentForm, setShowInstallmentForm] = useState(false);
//   const [installmentDate, setInstallmentDate] = useState(new Date());
//   const [installmentAmount, setInstallmentAmount] = useState('');
//   const [selectInstallmentType, setSelectInstallmentType] = useState('');
//   const [showCustomerInstallmentCard, setShowCustomerInstallmentCard] = useState(false);
//   const [customerInstallmentData, setCustomerInstallmentData] = useState(null);
//   const [customerSlip, setCustomerSlip] = useState(false);
//   const [note, setNote] = useState('');
//   const [showCustomerInstallmentEditForm, setShowCustomerInstallmentEditForm] = useState(false);
//   const [installmentId, setInstallmentId] = useState('');
//   const [installmentEditFormDate, setInstallmentEditFormDate] = useState(new Date());
//   const [installmentEditFormAmount, setInstallmentEditFormAmount] = useState('');
//   const [installmentEditFormPaymentMethod, setInstallmentEditFormPaymentMethod] = useState('');
//   const [installmentEditFormRemark, setInstallmentEditFormRemark] = useState('');
//   const [showEditCustomerForm, setShowEditCustomerForm] = useState(false);
//   const [customerBookingUpdateId, setCustomerBookingUpdateId] = useState('');
//   const [dealPrice, setDealPrice] = useState('');
//   const [tokenAmount, setTokenAmount] = useState('');
//   const [agreementAmount, setAgreementAmount] = useState('');
//   const [stampDutyAmount, setStampDutyAmount] = useState('');
//   const [registrationAmount, setRegistrationAmount] = useState('');
//   const [gstAmount, setGstAmount] = useState('');
//   const [electricWaterAmount, setElectricWaterAmount] = useState('');
//   const [legalChargesAmount, setLegalChargesAmount] = useState('');
//   const [bookedOn, setBookedOn] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [panCard, setPanCard] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [brokerage, setBrokerage] = useState('');
//   const [customerBookingId, setCustomerBookingId] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // States for controlling DateTimePicker visibility
//   const [showInstallmentDatePicker, setShowInstallmentDatePicker] = useState(false);
//   const [showEditInstallmentDatePicker, setShowEditInstallmentDatePicker] = useState(false);
//   const [showBookedOnDatePicker, setShowBookedOnDatePicker] = useState(false);

//   // Fetch customer profile
//   useEffect(() => {
//     const fetchCustomerProfile = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         if (!token) {
//           setError('No authentication token found');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         setCustomerId(response?.data?.customer?.id);
//         setCustomerDetail(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch customer details');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchCustomerProfile();
//   }, [bookingId, refreshKey]);

//   // Handlers
//   const handleSubmitLoan = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         bankName,
//         loanAmount: loanAmount.replace(/,/g, ''),
//       };

//       const response = await axios.post(`${BASE_URL}/addLoanDetails/${customerId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Bank details added successfully');
//         setBankName('');
//         setLoanAmount('');
//         setRefreshKey((prev) => prev + 1);
//         setShowBankDetailForm(false);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add bank details');
//     }
//   };

//   const handleCancelBooking = async () => {
//     Alert.alert(
//       'Are you sure?',
//       'Do you want to cancel the booking?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Yes, cancel it!',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');
//               await axios.put(`${BASE_URL}/cancelBooking/${bookingId}`, {}, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               Alert.alert('Success', 'Booking has been cancelled');
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to cancel booking');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const handleAddFlatInstallment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = [{
//         installmentDate: installmentDate.toISOString().split('T')[0],
//         installmentAmount: installmentAmount.replace(/,/g, ''),
//         installmentStatus: selectInstallmentType,
//         remark: note,
//       }];

//       await axios.post(`${BASE_URL}/${bookingId}/addInstallment`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       Alert.alert('Success', 'Payment added successfully');
//       setShowInstallmentForm(false);
//       setInstallmentDate(new Date());
//       setInstallmentAmount('');
//       setSelectInstallmentType('');
//       setNote('');
//       setRefreshKey((prev) => prev + 1);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to add installment');
//     }
//   };

//   const handleShowInstallment = async () => {
//     setShowCustomerInstallmentCard(true);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setCustomerInstallmentData(response.data);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch installments');
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const htmlContent = `
//         <div style="padding: 20px;">
//           <h2>AG - Construction</h2>
//           <p>Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34</p>
//           <p>CONTACT: +91-9028999253 | 9373450092</p>
//           <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
//           <div>
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr><td><strong>Flat No / Plot No</strong></td><td><strong>${customerDetail.residency.identifier}</strong></td></tr>
//               <tr><td><strong>Area</strong></td><td><strong>${customerDetail.customer.address}</strong></td></tr>
//               <tr><td><strong>Location</strong></td><td><strong>${customerDetail.residency.name}</strong></td></tr>
//             </table>
//           </div>
//           <p>RECEIVED with thanks from <strong>${customerDetail.customer.name}</strong> the sum of Rupees <strong>₹${customerDetail.dealPrice.toLocaleString()}</strong> by Cheque / Cash / Draft No. <strong>${customerDetail.residency.identifier}</strong> flat / plot address <strong>${customerDetail.customer.address}</strong> in part / full / advance payment.</p>
//           <p><strong>Balance Amount: ₹${(customerDetail.dealPrice - (customerDetail.agreementAmount + customerDetail.tokenAmount)).toLocaleString()}</strong></p>
//           <p><strong>Total Payable: ₹${(customerDetail.agreementAmount + customerDetail.tokenAmount).toLocaleString()}</strong></p>
//           <div style="display: flex; justify-content: space-between;">
//             <div>Customer Signature</div>
//             <div>Authorised Signature</div>
//           </div>
//         </div>
//       `;

//       const { uri } = await Print.printToFileAsync({ html: htmlContent });
//       await Sharing.shareAsync(uri);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   const handleEditInstallment = async (id) => {
//     setInstallmentId(id);
//     setShowCustomerInstallmentEditForm(true);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getBookingInstallmentById/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setInstallmentEditFormAmount(response.data.installmentAmount.toString());
//       setInstallmentEditFormDate(new Date(response.data.installmentDate));
//       setInstallmentEditFormPaymentMethod(response.data.installmentStatus);
//       setInstallmentEditFormRemark(response.data.remark);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch installment details');
//     }
//   };

//   const handleSubmitEditInstallment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const formData = {
//         installmentDate: installmentEditFormDate.toISOString().split('T')[0],
//         installmentAmount: installmentEditFormAmount.replace(/,/g, ''),
//         remark: installmentEditFormRemark,
//         installmentStatus: installmentEditFormPaymentMethod,
//       };

//       const response = await axios.put(`${BASE_URL}/updateBookingInstallment/${installmentId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Installment updated successfully');
//         handleShowInstallment();
//         setShowCustomerInstallmentEditForm(false);
//         setInstallmentEditFormDate(new Date());
//         setInstallmentEditFormAmount('');
//         setInstallmentEditFormRemark('');
//         setInstallmentEditFormPaymentMethod('');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to update installment');
//     }
//   };

//   const handleDeleteInstallment = async (id) => {
//     Alert.alert(
//       'Are you sure?',
//       'Do you want to delete this installment?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');
//               await axios.delete(`${BASE_URL}/deleteBookingInstallment/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               Alert.alert('Success', 'Installment has been deleted');
//               setRefreshKey((prev) => prev + 1);
//               setCustomerInstallmentData((prev) => ({
//                 ...prev,
//                 bookingInstallments: prev.bookingInstallments.filter((item) => item.id !== id),
//               }));
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to delete installment');
//             }
//           },
//         },
//       ],
//     );
//   };

//   const handlePrintInstallment = async () => {
//     try {
//       const htmlContent = `
//         <div style="padding: 20px;">
//           <h3>Property Summary</h3>
//           <p><strong>Project:</strong> ${customerInstallmentData.residencyName}</p>
//           <p><strong>Customer:</strong> ${customerInstallmentData.customerName}</p>
//           <p><strong>Plot No:</strong> ${customerInstallmentData.identifier}</p>
//           <p><strong>Deal Price:</strong> ₹${customerInstallmentData.dealPrice.toLocaleString()}</p>
//           <p><strong>Agreement Price:</strong> ₹${customerInstallmentData.agreementAmount.toLocaleString()}</p>
//           <p><strong>Token Amount:</strong> ₹${customerInstallmentData.tokenAmount.toLocaleString()}</p>
//           <p><strong>Remaining:</strong> ₹${customerInstallmentData.remainingAmount.toLocaleString()}</p>
//           <table style="width: 100%; border-collapse: collapse;">
//             <thead>
//               <tr><th>Date</th><th>Amount</th><th>Method</th><th>Note</th></tr>
//             </thead>
//             <tbody>
//               ${customerInstallmentData.bookingInstallments
//                 .map(
//                   (item) => `
//                 <tr>
//                   <td>${new Date(item.installmentDate).toLocaleDateString('en-GB')}</td>
//                   <td>₹${item.installmentAmount.toLocaleString()}</td>
//                   <td>${item.installmentStatus}</td>
//                   <td>${item.remark}</td>
//                 </tr>
//               `,
//                 )
//                 .join('')}
//             </tbody>
//           </table>
//         </div>
//       `;

//       const { uri } = await Print.printToFileAsync({ html: htmlContent });
//       await Sharing.shareAsync(uri);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to print installments');
//     }
//   };

//   const handleEditCustomerDetail = async (customerId, bookingId) => {
//     setCustomerBookingUpdateId(customerId);
//     setCustomerBookingId(bookingId);
//     setShowEditCustomerForm(true);
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getBookingCoustomerId/${customerId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       setAgreementAmount(response.data.agreementAmount.toString());
//       setDealPrice(response.data.dealPrice.toString());
//       setTokenAmount(response.data.tokenAmount.toString());
//       setStampDutyAmount(response.data.stampDutyAmount.toString());
//       setRegistrationAmount(response.data.registrationAmount.toString());
//       setGstAmount(response.data.gstAmount.toString());
//       setElectricWaterAmount(response.data.electricWaterAmmount?.toString() || '');
//       setLegalChargesAmount(response.data.legalChargesAmmout?.toString() || '');
//       setBookedOn(response.data.bookedOn);
//       setBookingStatus(response.data.bookingStatus);
//       setName(response.data.customer.name);
//       setPhoneNumber(response.data.customer.phoneNumber);
//       setEmail(response.data.customer.email || '');
//       setAadharNumber(response.data.customer.aadharNumber || '');
//       setAddress(response.data.customer.address);
//       setPanCard(response.data.customer.panCard || '');
//       setAgentName(response.data.customer.agentName || '');
//       setBrokerage(response.data.customer.brokerage?.toString() || '');
//       setBankName(response.data.customer.bankName || '');
//       setLoanAmount(response.data.customer.loanAmount?.toString() || '');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to fetch customer details');
//     }
//   };

//   const handleUpdateCustomerDetail = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         dealPrice,
//         tokenAmount,
//         agreementAmount,
//         stampDutyAmount,
//         registrationAmount,
//         gstAmount,
//         electricWaterAmmount: electricWaterAmount,
//         legalChargesAmmout: legalChargesAmount,
//         bookedOn,
//         bookingStatus,
//         customerDto: {
//           name,
//           phoneNumber,
//           email,
//           aadharNumber,
//           address,
//           panCard,
//           agentName,
//           brokerage,
//           bankName,
//           loanAmount: loanAmount.replace(/,/g, ''),
//         },
//       };

//       const response = await axios.put(`${BASE_URL}/updateBooking/${customerBookingId}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Customer details updated successfully');
//         setRefreshKey((prev) => prev + 1);
//         setShowEditCustomerForm(false);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to update customer details');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>
//           <Ionicons name="business" size={24} color="#fff" /> Flat Owner Management
//         </Text>
//         <Text style={styles.subtitle}>Comprehensive property and customer management system</Text>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionBar}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setCustomerSlip(true)}>
//           <Ionicons name="document-text" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Customer Slip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowBankDetailForm(true)}>
//           <Ionicons name="cash" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Add Bank Details</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => setShowInstallmentForm(true)}>
//           <Ionicons name="add" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Add Installment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={handleShowInstallment}>
//           <Ionicons name="eye" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>View Installments</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={handleCancelBooking}>
//           <Ionicons name="close" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Cancel Booking</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Customer Details Card */}
//       {customerDetail && (
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>
//               <Ionicons name="business" size={20} color="#333" /> Flat No: {customerDetail.residency?.identifier || 'N/A'}
//             </Text>
//             <TouchableOpacity
//               style={styles.editButton}
//               onPress={() => handleEditCustomerDetail(customerDetail.customer?.id, customerDetail.id)}
//             >
//               <Ionicons name="pencil" size={20} color="#fff" />
//               <Text style={styles.editButtonText}>Edit Details</Text>
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.cardSubtitle}>{customerDetail.customer?.name || 'N/A'}</Text>
//           <Text style={styles.cardSubtitle}>{customerDetail.customer?.phoneNumber || 'N/A'}</Text>

//           <View style={styles.detailsGrid}>
//             {/* Customer Information */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>
//                 <Ionicons name="person" size={18} color="#333" /> Customer Information
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="mail" size={16} color="#666" /> Email: {customerDetail.customer?.email || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="card" size={16} color="#666" /> PAN Card: {customerDetail.customer?.panCard || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="id-card" size={16} color="#666" /> Aadhar: {customerDetail.customer?.aadharNumber || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="home" size={16} color="#666" /> Address: {customerDetail.customer?.address || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="people" size={16} color="#666" /> Agent: {customerDetail.customer?.agentName || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Brokerage: {customerDetail.customer?.brokerage?.toLocaleString() || 'N/A'}
//               </Text>
//             </View>

//             {/* Residency Information */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>
//                 <Ionicons name="business" size={18} color="#333" /> Property Details
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="business" size={16} color="#666" /> Project: {customerDetail.residency?.name || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="home" size={16} color="#666" /> Flat Type: {customerDetail.residency?.flatType || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="home" size={16} color="#666" /> Type: {customerDetail.residency?.residencyType || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="layers" size={16} color="#666" /> Floor: {customerDetail.residency?.floorNumber || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Price: ₹{customerDetail.residency?.price?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="information-circle" size={16} color="#666" /> Status: {customerDetail.residency?.availabilityStatus || 'N/A'}
//               </Text>
//             </View>

//             {/* Deal Information */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>
//                 <Ionicons name="document" size={18} color="#333" /> Deal Information
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="calendar" size={16} color="#666" /> Booked On: {customerDetail.bookedOn ? new Date(customerDetail.bookedOn).toLocaleDateString('en-GB') : 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="book" size={16} color="#666" /> Status: {customerDetail.bookingStatus || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Deal Price: ₹{customerDetail.dealPrice?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Token: ₹{customerDetail.tokenAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Agreement: ₹{customerDetail.agreementAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Stamp Duty: ₹{customerDetail.stampDutyAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Electric/Water: ₹{customerDetail.electricWaterAmmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> GST Amount: ₹{customerDetail.gstAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Legal Charges: ₹{customerDetail.legalChargesAmmout?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="document" size={16} color="#666" /> Registration: ₹{customerDetail.registrationAmount?.toLocaleString() || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Bank: {customerDetail.customer?.bankName || 'N/A'}
//               </Text>
//               <Text style={styles.infoItem}>
//                 <Ionicons name="cash" size={16} color="#666" /> Bank Amount: ₹{customerDetail.customer?.loanAmount?.toLocaleString() || 'N/A'}
//               </Text>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Bank Details Modal */}
//       <Modal visible={showBankDetailForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Bank Details</Text>
//               <TouchableOpacity onPress={() => setShowBankDetailForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.form}>
//               <Text style={styles.label}>Bank Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={bankName}
//                 onChangeText={setBankName}
//                 placeholder="Enter bank name"
//               />
//               <Text style={styles.label}>Loan Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={loanAmount}
//                 onChangeText={setLoanAmount}
//                 keyboardType="numeric"
//                 placeholder="Enter loan amount"
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowBankDetailForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleSubmitLoan}>
//                   <Ionicons name="save" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Save Details</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Installment Form Modal */}
//       <Modal visible={showInstallmentForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Installment</Text>
//               <TouchableOpacity onPress={() => setShowInstallmentForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.form}>
//               <Text style={styles.label}>Installment Date</Text>
//               <TouchableOpacity
//                 style={styles.input}
//                 onPress={() => setShowInstallmentDatePicker(true)}
//               >
//                 <Text style={styles.dateText}>
//                   {installmentDate.toISOString().split('T')[0] || 'Select Date'}
//                 </Text>
//               </TouchableOpacity>
//               {showInstallmentDatePicker && (
//                 <DateTimePicker
//                   value={installmentDate}
//                   mode="date"
//                   display="default"
//                   onChange={(event, date) => {
//                     setShowInstallmentDatePicker(false);
//                     if (date) setInstallmentDate(date);
//                   }}
//                 />
//               )}
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={installmentAmount}
//                 onChangeText={setInstallmentAmount}
//                 keyboardType="numeric"
//                 placeholder="Enter installment amount"
//               />
//               <Text style={styles.label}>Payment Method</Text>
//               <Picker
//                 selectedValue={selectInstallmentType}
//                 onValueChange={setSelectInstallmentType}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Payment Method" value="" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//               <Text style={styles.label}>Note</Text>
//               <TextInput
//                 style={[styles.input, styles.textarea]}
//                 value={note}
//                 onChangeText={setNote}
//                 multiline
//                 numberOfLines={3}
//                 placeholder="Add a note..."
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowInstallmentForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.primaryButton]}
//                   onPress={handleAddFlatInstallment}
//                 >
//                   <Ionicons name="add" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Add Installment</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Installment Details Modal */}
//       <Modal visible={showCustomerInstallmentCard} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modal, styles.modalLarge]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Customer Installments</Text>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handlePrintInstallment}>
//                   <Ionicons name="print" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Print</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setShowCustomerInstallmentCard(false)}>
//                   <Ionicons name="close" size={24} color="#333" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             {customerInstallmentData && (
//               <View style={styles.installmentContent}>
//                 <Text style={styles.sectionTitle}>Property Summary</Text>
//                 <View style={styles.summaryGrid}>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Project:</Text> {customerInstallmentData.residencyName}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Customer:</Text> {customerInstallmentData.customerName}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Plot No:</Text> {customerInstallmentData.identifier}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Deal Price:</Text> ₹{customerInstallmentData.dealPrice?.toLocaleString() || 'N/A'}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Agreement Price:</Text> ₹{customerInstallmentData.agreementAmount?.toLocaleString() || 'N/A'}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Token Amount:</Text> ₹{customerInstallmentData.tokenAmount?.toLocaleString()}
//                   </Text>
//                   <Text style={styles.summaryItem}>
//                     <Text style={styles.summaryLabel}>Remaining:</Text> ₹{customerInstallmentData.remainingAmount?.toLocaleString()}
//                   </Text>
//                 </View>
//                 <View style={styles.tableContainer}>
//                   <View style={styles.tableHeader}>
//                     <Text style={styles.tableHeaderText}>Date</Text>
//                     <Text style={styles.tableHeaderText}>Amount</Text>
//                     <Text style={styles.tableHeaderText}>Method</Text>
//                     <Text style={styles.tableHeaderText}>Note</Text>
//                     <Text style={styles.tableHeaderText}>Actions</Text>
//                   </View>
//                   {customerInstallmentData.bookingInstallments.map((item) => (
//                     <View key={item.id} style={styles.tableRow}>
//                       <Text style={styles.tableCell}>{new Date(item.installmentDate).toLocaleDateString('en-GB')}</Text>
//                       <Text style={styles.tableCell}>₹{item.installmentAmount.toLocaleString()}</Text>
//                       <Text style={styles.tableCell}>{item.installmentStatus}</Text>
//                       <Text style={styles.tableCell}>{item.remark}</Text>
//                       <View style={styles.tableCell}>
//                         <TouchableOpacity style={styles.actionButtonSmall} onPress={() => handleEditInstallment(item.id)}>
//                           <Ionicons name="pencil" size={16} color="#fff" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={[styles.actionButtonSmall, styles.deleteButton]} onPress={() => handleDeleteInstallment(item.id)}>
//                           <Ionicons name="trash" size={16} color="#fff" />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Installment Modal */}
//       <Modal visible={showCustomerInstallmentEditForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modal}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Installment</Text>
//               <TouchableOpacity onPress={() => setShowCustomerInstallmentEditForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.form}>
//               <Text style={styles.label}>Date</Text>
//               <TouchableOpacity
//                 style={styles.input}
//                 onPress={() => setShowEditInstallmentDatePicker(true)}
//               >
//                 <Text style={styles.dateText}>
//                   {installmentEditFormDate.toISOString().split('T')[0] || 'Select Date'}
//                 </Text>
//               </TouchableOpacity>
//               {showEditInstallmentDatePicker && (
//                 <DateTimePicker
//                   value={installmentEditFormDate}
//                   mode="date"
//                   display="default"
//                   onChange={(event, date) => {
//                     setShowEditInstallmentDatePicker(false);
//                     if (date) setInstallmentEditFormDate(date);
//                   }}
//                 />
//               )}
//               <Text style={styles.label}>Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={installmentEditFormAmount}
//                 onChangeText={setInstallmentEditFormAmount}
//                 keyboardType="numeric"
//                 placeholder="Enter amount"
//               />
//               <Text style={styles.label}>Payment Method</Text>
//               <Picker
//                 selectedValue={installmentEditFormPaymentMethod}
//                 onValueChange={setInstallmentEditFormPaymentMethod}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Payment Method" value="" />
//                 <Picker.Item label="Cash" value="CASH" />
//                 <Picker.Item label="Cheque" value="CHECK" />
//                 <Picker.Item label="UPI" value="UPI" />
//                 <Picker.Item label="RTGS" value="RTGS" />
//                 <Picker.Item label="NEFT" value="NEFT" />
//               </Picker>
//               <Text style={styles.label}>Remark</Text>
//               <TextInput
//                 style={[styles.input, styles.textarea]}
//                 value={installmentEditFormRemark}
//                 onChangeText={setInstallmentEditFormRemark}
//                 multiline
//                 numberOfLines={3}
//                 placeholder="Enter remark"
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowCustomerInstallmentEditForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.primaryButton]}
//                   onPress={handleSubmitEditInstallment}
//                 >
//                   <Ionicons name="save" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Update</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Customer Form Modal */}
//       <Modal visible={showEditCustomerForm} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modal, styles.modalLarge]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Edit Customer Details</Text>
//               <TouchableOpacity onPress={() => setShowEditCustomerForm(false)}>
//                 <Ionicons name="close" size={24} color="#333" />
//               </TouchableOpacity>
//             </View>
//             <ScrollView style={styles.form}>
//               <Text style={styles.sectionTitle}>Booking Details</Text>
//               <Text style={styles.label}>Deal Price</Text>
//               <TextInput
//                 style={styles.input}
//                 value={dealPrice}
//                 onChangeText={setDealPrice}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Token Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={tokenAmount}
//                 onChangeText={setTokenAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Agreement Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={agreementAmount}
//                 onChangeText={setAgreementAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Stamp Duty</Text>
//               <TextInput
//                 style={styles.input}
//                 value={stampDutyAmount}
//                 onChangeText={setStampDutyAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Registration Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={registrationAmount}
//                 onChangeText={setRegistrationAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>GST Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={gstAmount}
//                 onChangeText={setGstAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Electric Water Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={electricWaterAmount}
//                 onChangeText={setElectricWaterAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Legal Charges Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={legalChargesAmount}
//                 onChangeText={setLegalChargesAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Booked On</Text>
//               <TouchableOpacity
//                 style={styles.input}
//                 onPress={() => setShowBookedOnDatePicker(true)}
//               >
//                 <Text style={styles.dateText}>
//                   {bookedOn || 'Select Date'}
//                 </Text>
//               </TouchableOpacity>
//               {showBookedOnDatePicker && (
//                 <DateTimePicker
//                   value={bookedOn ? new Date(bookedOn) : new Date()}
//                   mode="date"
//                   display="default"
//                   onChange={(event, date) => {
//                     setShowBookedOnDatePicker(false);
//                     if (date) setBookedOn(date.toISOString().split('T')[0]);
//                   }}
//                 />
//               )}
//               <Text style={styles.label}>Booking Status</Text>
//               <Picker
//                 selectedValue={bookingStatus}
//                 onValueChange={setBookingStatus}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="PENDING" value="PENDING" />
//                 <Picker.Item label="COMPLETE" value="COMPLETE" />
//                 <Picker.Item label="CANCELLED" value="CANCELLED" />
//               </Picker>
//               <Text style={styles.sectionTitle}>Customer Information</Text>
//               <Text style={styles.label}>Name</Text>
//               <TextInput style={styles.input} value={name} onChangeText={setName} />
//               <Text style={styles.label}>Phone Number</Text>
//               <TextInput
//                 style={styles.input}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 keyboardType="phone-pad"
//               />
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//               />
//               <Text style={styles.label}>Aadhar Number</Text>
//               <TextInput
//                 style={styles.input}
//                 value={aadharNumber}
//                 onChangeText={setAadharNumber}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>PAN Number</Text>
//               <TextInput style={styles.input} value={panCard} onChangeText={setPanCard} />
//               <Text style={styles.label}>Agent Name</Text>
//               <TextInput style={styles.input} value={agentName} onChangeText={setAgentName} />
//               <Text style={styles.label}>Brokerage</Text>
//               <TextInput
//                 style={styles.input}
//                 value={brokerage}
//                 onChangeText={setBrokerage}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Bank Name</Text>
//               <TextInput style={styles.input} value={bankName} onChangeText={setBankName} />
//               <Text style={styles.label}>Loan Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={loanAmount}
//                 onChangeText={setLoanAmount}
//                 keyboardType="numeric"
//               />
//               <Text style={styles.label}>Address</Text>
//               <TextInput
//                 style={[styles.input, styles.textarea]}
//                 value={address}
//                 onChangeText={setAddress}
//                 multiline
//                 numberOfLines={3}
//               />
//               <View style={styles.formActions}>
//                 <TouchableOpacity
//                   style={[styles.button, styles.cancelButton]}
//                   onPress={() => setShowEditCustomerForm(false)}
//                 >
//                   <Text style={styles.buttonText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.button, styles.primaryButton]}
//                   onPress={handleUpdateCustomerDetail}
//                 >
//                   <Ionicons name="save" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Update Details</Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>

//       {/* Customer Slip Modal */}
//       <Modal visible={customerSlip} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modal, styles.modalLarge]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Customer Slip</Text>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleDownload}>
//                   <Ionicons name="download" size={20} color="#fff" />
//                   <Text style={styles.buttonText}>Download PDF</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setCustomerSlip(false)}>
//                   <Ionicons name="close" size={24} color="#333" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.slipContent}>
//               <Text style={styles.slipHeader}>AG - Construction</Text>
//               <Text style={styles.slipText}>
//                 Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34
//               </Text>
//               <Text style={styles.slipText}>CONTACT: +91-9028999253 | 9373450092</Text>
//               <Text style={styles.slipText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
//               <View style={styles.slipDetails}>
//                 <View style={styles.slipTable}>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableCell}>Flat No / Plot No</Text>
//                     <Text style={styles.slipTableCell}>{customerDetail?.residency?.identifier}</Text>
//                   </View>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableCell}>Area</Text>
//                     <Text style={styles.slipTableCell}>{customerDetail?.customer?.address}</Text>
//                   </View>
//                   <View style={styles.slipTableRow}>
//                     <Text style={styles.slipTableCell}>Location</Text>
//                     <Text style={styles.slipTableCell}>{customerDetail?.residency?.name}</Text>
//                   </View>
//                 </View>
//               </View>
//               <Text style={styles.slipText}>
//                 RECEIVED with thanks from <Text style={styles.bold}>{customerDetail?.customer?.name}</Text> the sum of
//                 Rupees <Text style={styles.bold}>₹{customerDetail?.dealPrice?.toLocaleString()}</Text> by Cheque / Cash /
//                 Draft No. <Text style={styles.bold}>{customerDetail?.residency?.identifier}</Text> flat / plot address{' '}
//                 <Text style={styles.bold}>{customerDetail?.customer?.address}</Text> in part / full / advance payment.
//               </Text>
//               <Text style={styles.slipText}>
//                 <Text style={styles.bold}>
//                   Balance Amount: ₹{(customerDetail?.dealPrice - (customerDetail?.agreementAmount + customerDetail?.tokenAmount))?.toLocaleString()}
//                 </Text>
//               </Text>
//               <Text style={styles.slipText}>
//                 <Text style={styles.bold}>
//                   Total Payable: ₹{(customerDetail?.agreementAmount + customerDetail?.tokenAmount)?.toLocaleString()}
//                 </Text>
//               </Text>
//               <View style={styles.slipSignatures}>
//                 <Text>Customer Signature</Text>
//                 <Text>Authorised Signature</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: '#4a90e2',
//     padding: 20,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#fff',
//     marginTop: 5,
//   },
//   actionBar: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4a90e2',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   actionButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   cancelButton: {
//     backgroundColor: '#ef4444',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   cardSubtitle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   editButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4a90e2',
//     padding: 8,
//     borderRadius: 5,
//   },
//   editButtonText: {
//     color: '#fff',
//     marginLeft: 5,
//   },
//   detailsGrid: {
//     marginTop: 10,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   infoItem: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modal: {
//     backgroundColor: '#fff',
//     width: '90%',
//     borderRadius: 8,
//     padding: 20,
//   },
//   modalLarge: {
//     width: '95%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   form: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 14,
//   },
//   textarea: {
//     height: 80,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   formActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   primaryButton: {
//     backgroundColor: '#4a90e2',
//   },
//   cancelButton: {
//     backgroundColor: '#6b7280',
//   },
//   buttonText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   installmentContent: {
//     marginBottom: 20,
//   },
//   summaryGrid: {
//     marginBottom: 20,
//   },
//   summaryItem: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   summaryLabel: {
//     fontWeight: '600',
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   tableHeaderText: {
//     flex: 1,
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   tableCell: {
//     flex: 1,
//     fontSize: 14,
//   },
//   actionButtonSmall: {
//     backgroundColor: '#4a90e2',
//     padding: 5,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   deleteButton: {
//     backgroundColor: '#ef4444',
//   },
//   slipContent: {
//     padding: 20,
//   },
//   slipHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   slipText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   slipDetails: {
//     marginVertical: 10,
//   },
//   slipTable: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   slipTableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   slipTableCell: {
//     flex: 1,
//     padding: 5,
//     fontSize: 14,
//   },
//   slipSignatures: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default FlatOwner;








import { BASE_URL } from '@/Api/BASE_URL.js';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const FlatOwner = () => {
  const { bookingId, customerName } = useRoute().params;
  const navigation = useNavigation();
  const letterRef = useRef();

  // State management
  const [customerDetail, setCustomerDetail] = useState(null);
  const [bankName, setBankName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showBankDetailForm, setShowBankDetailForm] = useState(false);
  const [showInstallmentForm, setShowInstallmentForm] = useState(false);
  const [installmentDate, setInstallmentDate] = useState(new Date());
  const [installmentAmount, setInstallmentAmount] = useState('');
  const [selectInstallmentType, setSelectInstallmentType] = useState('');
  const [showCustomerInstallmentCard, setShowCustomerInstallmentCard] = useState(false);
  const [customerInstallmentData, setCustomerInstallmentData] = useState(null);
  const [customerSlip, setCustomerSlip] = useState(false);
  const [note, setNote] = useState('');
  const [showCustomerInstallmentEditForm, setShowCustomerInstallmentEditForm] = useState(false);
  const [installmentId, setInstallmentId] = useState('');
  const [installmentEditFormDate, setInstallmentEditFormDate] = useState(new Date());
  const [installmentEditFormAmount, setInstallmentEditFormAmount] = useState('');
  const [installmentEditFormPaymentMethod, setInstallmentEditFormPaymentMethod] = useState('');
  const [installmentEditFormRemark, setInstallmentEditFormRemark] = useState('');
  const [showEditCustomerForm, setShowEditCustomerForm] = useState(false);
  const [customerBookingUpdateId, setCustomerBookingUpdateId] = useState('');
  const [dealPrice, setDealPrice] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [agreementAmount, setAgreementAmount] = useState('');
  const [stampDutyAmount, setStampDutyAmount] = useState('');
  const [registrationAmount, setRegistrationAmount] = useState('');
  const [gstAmount, setGstAmount] = useState('');
  const [electricWaterAmount, setElectricWaterAmount] = useState('');
  const [legalChargesAmount, setLegalChargesAmount] = useState('');
  const [bookedOn, setBookedOn] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [address, setAddress] = useState('');
  const [panCard, setPanCard] = useState('');
  const [agentName, setAgentName] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [customerBookingId, setCustomerBookingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // States for controlling DateTimePicker visibility
  const [showInstallmentDatePicker, setShowInstallmentDatePicker] = useState(false);
  const [showEditInstallmentDatePicker, setShowEditInstallmentDatePicker] = useState(false);
  const [showBookedOnDatePicker, setShowBookedOnDatePicker] = useState(false);

  // Fetch customer profile
  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCustomerId(response?.data?.customer?.id);
        setCustomerDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customer details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCustomerProfile();
  }, [bookingId, refreshKey]);

  // Handle pull-to-refresh for installments
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    if (showCustomerInstallmentCard) {
      await handleShowInstallment();
    }
    setRefreshing(false);
  }, [showCustomerInstallmentCard]);

  // Handlers
  const handleSubmitLoan = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const formData = {
        bankName,
        loanAmount: loanAmount.replace(/,/g, ''),
      };

      const response = await axios.post(`${BASE_URL}/addLoanDetails/${customerId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Bank details added successfully');
        setBankName('');
        setLoanAmount('');
        setRefreshKey((prev) => prev + 1);
        setShowBankDetailForm(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add bank details');
    }
  };

  const handleCancelBooking = async () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to cancel the booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, cancel it!',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('jwtToken');
              await axios.put(`${BASE_URL}/cancelBooking/${bookingId}`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              Alert.alert('Success', 'Booking has been cancelled');
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to cancel booking');
            }
          },
        },
      ],
    );
  };

  const handleAddFlatInstallment = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const formData = [{
        installmentDate: installmentDate.toISOString().split('T')[0],
        installmentAmount: installmentAmount.replace(/,/g, ''),
        installmentStatus: selectInstallmentType,
        remark: note,
      }];

      await axios.post(`${BASE_URL}/${bookingId}/addInstallment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Alert.alert('Success', 'Payment added successfully');
      setShowInstallmentForm(false);
      setInstallmentDate(new Date());
      setInstallmentAmount('');
      setSelectInstallmentType('');
      setNote('');
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add installment');
    }
  };

  const handleShowInstallment = async () => {
    setShowCustomerInstallmentCard(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCustomerInstallmentData(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch installments');
    }
  };

  const handleDownload = async () => {
    try {
      const htmlContent = `
        <div style="padding: 20px;">
          <h2>AG - Construction</h2>
          <p>Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34</p>
          <p>CONTACT: +91-9028999253 | 9373450092</p>
          <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
          <div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td><strong>Flat No / Plot No</strong></td><td><strong>${customerDetail.residency.identifier}</strong></td></tr>
              <tr><td><strong>Area</strong></td><td><strong>${customerDetail.customer.address}</strong></td></tr>
              <tr><td><strong>Location</strong></td><td><strong>${customerDetail.residency.name}</strong></td></tr>
            </table>
          </div>
          <p>RECEIVED with thanks from <strong>${customerDetail.customer.name}</strong> the sum of Rupees <strong>₹${customerDetail.dealPrice.toLocaleString()}</strong> by Cheque / Cash / Draft No. <strong>${customerDetail.residency.identifier}</strong> flat / plot address <strong>${customerDetail.customer.address}</strong> in part / full / advance payment.</p>
          <p><strong>Balance Amount: ₹${(customerDetail.dealPrice - (customerDetail.agreementAmount + customerDetail.tokenAmount)).toLocaleString()}</strong></p>
          <p><strong>Total Payable: ₹${(customerDetail.agreementAmount + customerDetail.tokenAmount).toLocaleString()}</strong></p>
          <div style="display: flex; justify-content: space-between;">
            <div>Customer Signature</div>
            <div>Authorised Signature</div>
          </div>
        </div>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const handleEditInstallment = async (id) => {
    setInstallmentId(id);
    setShowCustomerInstallmentEditForm(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/getBookingInstallmentById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setInstallmentEditFormAmount(response.data.installmentAmount.toString());
      setInstallmentEditFormDate(new Date(response.data.installmentDate));
      setInstallmentEditFormPaymentMethod(response.data.installmentStatus);
      setInstallmentEditFormRemark(response.data.remark);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch installment details');
    }
  };

  const handleSubmitEditInstallment = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const formData = {
        installmentDate: installmentEditFormDate.toISOString().split('T')[0],
        installmentAmount: installmentEditFormAmount.replace(/,/g, ''),
        remark: installmentEditFormRemark,
        installmentStatus: installmentEditFormPaymentMethod,
      };

      const response = await axios.put(`${BASE_URL}/updateBookingInstallment/${installmentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Installment updated successfully');
        handleShowInstallment();
        setShowCustomerInstallmentEditForm(false);
        setInstallmentEditFormDate(new Date());
        setInstallmentEditFormAmount('');
        setInstallmentEditFormRemark('');
        setInstallmentEditFormPaymentMethod('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update installment');
    }
  };

  const handleDeleteInstallment = async (id) => {
    Alert.alert(
      'Are you sure?',
      'Do you want to delete this installment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('jwtToken');
              await axios.delete(`${BASE_URL}/deleteBookingInstallment/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              Alert.alert('Success', 'Installment has been deleted');
              setRefreshKey((prev) => prev + 1);
              setCustomerInstallmentData((prev) => ({
                ...prev,
                bookingInstallments: prev.bookingInstallments.filter((item) => item.id !== id),
              }));
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to delete installment');
            }
          },
        },
      ],
    );
  };

  const handlePrintInstallment = async () => {
    try {
      const htmlContent = `
        <div style="padding: 20px;">
          <h3>Property Summary</h3>
          <p><strong>Project:</strong> ${customerInstallmentData.residencyName}</p>
          <p><strong>Customer:</strong> ${customerInstallmentData.customerName}</p>
          <p><strong>Plot No:</strong> ${customerInstallmentData.identifier}</p>
          <p><strong>Deal Price:</strong> ₹${customerInstallmentData.dealPrice.toLocaleString()}</p>
          <p><strong>Agreement Price:</strong> ₹${customerInstallmentData.agreementAmount.toLocaleString()}</p>
          <p><strong>Token Amount:</strong> ₹${customerInstallmentData.tokenAmount.toLocaleString()}</p>
          <p><strong>Remaining:</strong> ₹${customerInstallmentData.remainingAmount.toLocaleString()}</p>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr><th>Date</th><th>Amount</th><th>Method</th><th>Note</th></tr>
            </thead>
            <tbody>
              ${customerInstallmentData.bookingInstallments
                .map(
                  (item) => `
                <tr>
                  <td>${new Date(item.installmentDate).toLocaleDateString('en-GB')}</td>
                  <td>₹${item.installmentAmount.toLocaleString()}</td>
                  <td>${item.installmentStatus}</td>
                  <td>${item.remark}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to print installments');
    }
  };

  const handleEditCustomerDetail = async (customerId, bookingId) => {
    setCustomerBookingUpdateId(customerId);
    setCustomerBookingId(bookingId);
    setShowEditCustomerForm(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/getBookingCoustomerId/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setAgreementAmount(response.data.agreementAmount.toString());
      setDealPrice(response.data.dealPrice.toString());
      setTokenAmount(response.data.tokenAmount.toString());
      setStampDutyAmount(response.data.stampDutyAmount.toString());
      setRegistrationAmount(response.data.registrationAmount.toString());
      setGstAmount(response.data.gstAmount.toString());
      setElectricWaterAmount(response.data.electricWaterAmmount?.toString() || '');
      setLegalChargesAmount(response.data.legalChargesAmmout?.toString() || '');
      setBookedOn(response.data.bookedOn);
      setBookingStatus(response.data.bookingStatus);
      setName(response.data.customer.name);
      setPhoneNumber(response.data.customer.phoneNumber);
      setEmail(response.data.customer.email || '');
      setAadharNumber(response.data.customer.aadharNumber || '');
      setAddress(response.data.customer.address);
      setPanCard(response.data.customer.panCard || '');
      setAgentName(response.data.customer.agentName || '');
      setBrokerage(response.data.customer.brokerage?.toString() || '');
      setBankName(response.data.customer.bankName || '');
      setLoanAmount(response.data.customer.loanAmount?.toString() || '');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch customer details');
    }
  };

  const handleUpdateCustomerDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const payload = {
        dealPrice,
        tokenAmount,
        agreementAmount,
        stampDutyAmount,
        registrationAmount,
        gstAmount,
        electricWaterAmmount: electricWaterAmount,
        legalChargesAmmout: legalChargesAmount,
        bookedOn,
        bookingStatus,
        customerDto: {
          name,
          phoneNumber,
          email,
          aadharNumber,
          address,
          panCard,
          agentName,
          brokerage,
          bankName,
          loanAmount: loanAmount.replace(/,/g, ''),
        },
      };

      const response = await axios.put(`${BASE_URL}/updateBooking/${customerBookingId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Customer details updated successfully');
        setRefreshKey((prev) => prev + 1);
        setShowEditCustomerForm(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update customer details');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading customer details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="error" size={48} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#007AFF']}
          tintColor="#007AFF"
        />
      }
    >
      {/* Header */}
      <LinearGradient
        colors={['#007AFF', '#004C99']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>
            <MaterialIcons name="business" size={24} color="#fff" /> Flat Owner Management
          </Text>
        </View>
        <Text style={styles.subtitle}>Manage {customerName}'s Property</Text>
      </LinearGradient>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.actionButton, styles.slipButton]}
          onPress={() => setCustomerSlip(true)}
        >
          <MaterialIcons name="description" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Customer Slip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.bankButton]}
          onPress={() => setShowBankDetailForm(true)}
        >
          <MaterialIcons name="account-balance" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Add Bank Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.installmentButton]}
          onPress={() => setShowInstallmentForm(true)}
        >
          <MaterialIcons name="add-circle" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Add Installment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={handleShowInstallment}
        >
          <MaterialIcons name="visibility" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>View Installments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={handleCancelBooking}
        >
          <MaterialIcons name="cancel" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Details Card */}
      {customerDetail && (
        <View style={styles.card}>
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                <MaterialIcons name="business" size={20} color="#1F2937" /> Flat No: {customerDetail.residency?.identifier || 'N/A'}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditCustomerDetail(customerDetail.customer?.id, customerDetail.id)}
              >
                <MaterialIcons name="edit" size={20} color="#fff" />
                <Text style={styles.editButtonText}>Edit Details</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardSubtitle}>{customerDetail.customer?.name || 'N/A'}</Text>
            <Text style={styles.cardSubtitle}>{customerDetail.customer?.phoneNumber || 'N/A'}</Text>

            <View style={styles.detailsGrid}>
              {/* Customer Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  <MaterialIcons name="person" size={18} color="#1F2937" /> Customer Information
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="email" size={16} color="#6B7280" /> Email: {customerDetail.customer?.email || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="credit-card" size={16} color="#6B7280" /> PAN Card: {customerDetail.customer?.panCard || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="badge" size={16} color="#6B7280" /> Aadhar: {customerDetail.customer?.aadharNumber || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="home" size={16} color="#6B7280" /> Address: {customerDetail.customer?.address || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="group" size={16} color="#6B7280" /> Agent: {customerDetail.customer?.agentName || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="money" size={16} color="#6B7280" /> Brokerage: ₹{customerDetail.customer?.brokerage?.toLocaleString() || 'N/A'}
                </Text>
              </View>

              {/* Residency Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  <MaterialIcons name="business" size={18} color="#1F2937" /> Property Details
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="business" size={16} color="#6B7280" /> Project: {customerDetail.residency?.name || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="home" size={16} color="#6B7280" /> Flat Type: {customerDetail.residency?.flatType || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="home" size={16} color="#6B7280" /> Type: {customerDetail.residency?.residencyType || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="layers" size={16} color="#6B7280" /> Floor: {customerDetail.residency?.floorNumber || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="money" size={16} color="#6B7280" /> Price: ₹{customerDetail.residency?.price?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="info" size={16} color="#6B7280" /> Status: {customerDetail.residency?.availabilityStatus || 'N/A'}
                </Text>
              </View>

              {/* Deal Information */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  <MaterialIcons name="description" size={18} color="#1F2937" /> Deal Information
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="calendar-today" size={16} color="#6B7280" /> Booked On: {customerDetail.bookedOn ? new Date(customerDetail.bookedOn).toLocaleDateString('en-GB') : 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="book" size={16} color="#6B7280" /> Status: {customerDetail.bookingStatus || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="money" size={16} color="#6B7280" /> Deal Price: ₹{customerDetail.dealPrice?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="money" size={16} color="#6B7280" /> Token: ₹{customerDetail.tokenAmount?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="description" size={16} color="#6B7280" /> Agreement: ₹{customerDetail.agreementAmount?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="description" size={16} color="#6B7280" /> Stamp Duty: ₹{customerDetail.stampDutyAmount?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="description" size={16} color="#6B7280" /> Electric/Water: ₹{customerDetail.electricWaterAmmount?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="description" size={16} color="#6B7280" /> GST Amount: ₹{customerDetail.gstAmount?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="description" size={16} color="#6B7280" /> Legal Charges: ₹{customerDetail.legalChargesAmmout?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="description" size={16} color="#6B7280" /> Registration: ₹{customerDetail.registrationAmount?.toLocaleString() || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="account-balance" size={16} color="#6B7280" /> Bank: {customerDetail.customer?.bankName || 'N/A'}
                </Text>
                <Text style={styles.infoItem}>
                  <MaterialIcons name="money" size={16} color="#6B7280" /> Bank Amount: ₹{customerDetail.customer?.loanAmount?.toLocaleString() || 'N/A'}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Bank Details Modal */}
      <Modal visible={showBankDetailForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Bank Details</Text>
                <TouchableOpacity onPress={() => setShowBankDetailForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Bank Name</Text>
                <TextInput
                  style={styles.input}
                  value={bankName}
                  onChangeText={setBankName}
                  placeholder="Enter bank name"
                />
                <Text style={styles.label}>Loan Amount</Text>
                <TextInput
                  style={styles.input}
                  value={loanAmount}
                  onChangeText={setLoanAmount}
                  keyboardType="numeric"
                  placeholder="Enter loan amount"
                />
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setShowBankDetailForm(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleSubmitLoan}
                  >
                    <MaterialIcons name="save" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Save Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Installment Form Modal */}
      <Modal visible={showInstallmentForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Installment</Text>
                <TouchableOpacity onPress={() => setShowInstallmentForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Installment Date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowInstallmentDatePicker(true)}
                >
                  <Text style={styles.dateText}>
                    {installmentDate.toISOString().split('T')[0] || 'Select Date'}
                  </Text>
                  <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
                </TouchableOpacity>
                {showInstallmentDatePicker && (
                  <DateTimePicker
                    value={installmentDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowInstallmentDatePicker(false);
                      if (date) setInstallmentDate(date);
                    }}
                  />
                )}
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  value={installmentAmount}
                  onChangeText={setInstallmentAmount}
                  keyboardType="numeric"
                  placeholder="Enter installment amount"
                />
                <Text style={styles.label}>Payment Method</Text>
                <Picker
                  selectedValue={selectInstallmentType}
                  onValueChange={setSelectInstallmentType}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Payment Method" value="" />
                  <Picker.Item label="Cash" value="CASH" />
                  <Picker.Item label="Cheque" value="CHECK" />
                  <Picker.Item label="UPI" value="UPI" />
                  <Picker.Item label="RTGS" value="RTGS" />
                  <Picker.Item label="NEFT" value="NEFT" />
                </Picker>
                <Text style={styles.label}>Note</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={note}
                  onChangeText={setNote}
                  multiline
                  numberOfLines={3}
                  placeholder="Add a note..."
                />
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setShowInstallmentForm(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleAddFlatInstallment}
                  >
                    <MaterialIcons name="add" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Add Installment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Installment Details Modal */}
      <Modal visible={showCustomerInstallmentCard} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, styles.modalLarge]}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Customer Installments</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handlePrintInstallment}>
                    <MaterialIcons name="print" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Print</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowCustomerInstallmentCard(false)}>
                    <MaterialIcons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
              {customerInstallmentData && (
                <ScrollView
                  style={styles.installmentContent}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={['#007AFF']}
                      tintColor="#007AFF"
                    />
                  }
                >
                  <Text style={styles.sectionTitle}>Property Summary</Text>
                  <View style={styles.summaryGrid}>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Project:</Text> {customerInstallmentData.residencyName}
                    </Text>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Customer:</Text> {customerInstallmentData.customerName}
                    </Text>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Plot No:</Text> {customerInstallmentData.identifier}
                    </Text>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Deal Price:</Text> ₹{customerInstallmentData.dealPrice?.toLocaleString() || 'N/A'}
                    </Text>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Agreement Price:</Text> ₹{customerInstallmentData.agreementAmount?.toLocaleString() || 'N/A'}
                    </Text>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Token Amount:</Text> ₹{customerInstallmentData.tokenAmount?.toLocaleString()}
                    </Text>
                    <Text style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Remaining:</Text> ₹{customerInstallmentData.remainingAmount?.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                      <Text style={styles.tableHeaderText}>Date</Text>
                      <Text style={styles.tableHeaderText}>Amount</Text>
                      <Text style={styles.tableHeaderText}>Method</Text>
                      <Text style={styles.tableHeaderText}>Note</Text>
                      <Text style={styles.tableHeaderText}>Actions</Text>
                    </View>
                    {customerInstallmentData.bookingInstallments.length === 0 ? (
                      <View style={styles.emptyContainer}>
                        <MaterialIcons name="inbox" size={48} color="#6B7280" />
                        <Text style={styles.emptyText}>No installments found</Text>
                        <Text style={styles.emptySubText}>Add an installment or pull to refresh</Text>
                      </View>
                    ) : (
                      customerInstallmentData.bookingInstallments.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                          <Text style={styles.tableCell}>{new Date(item.installmentDate).toLocaleDateString('en-GB')}</Text>
                          <Text style={styles.tableCell}>₹{item.installmentAmount.toLocaleString()}</Text>
                          <Text style={styles.tableCell}>{item.installmentStatus}</Text>
                          <Text style={styles.tableCell}>{item.remark}</Text>
                          <View style={styles.tableCell}>
                            <TouchableOpacity
                              style={styles.actionButtonSmall}
                              onPress={() => handleEditInstallment(item.id)}
                            >
                              <MaterialIcons name="edit" size={16} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.actionButtonSmall, styles.deleteButton]}
                              onPress={() => handleDeleteInstallment(item.id)}
                            >
                              <MaterialIcons name="delete" size={16} color="#fff" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))
                    )}
                  </View>
                </ScrollView>
              )}
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Edit Installment Modal */}
      <Modal visible={showCustomerInstallmentEditForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Installment</Text>
                <TouchableOpacity onPress={() => setShowCustomerInstallmentEditForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowEditInstallmentDatePicker(true)}
                >
                  <Text style={styles.dateText}>
                    {installmentEditFormDate.toISOString().split('T')[0] || 'Select Date'}
                  </Text>
                  <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
                </TouchableOpacity>
                {showEditInstallmentDatePicker && (
                  <DateTimePicker
                    value={installmentEditFormDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowEditInstallmentDatePicker(false);
                      if (date) setInstallmentEditFormDate(date);
                    }}
                  />
                )}
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  value={installmentEditFormAmount}
                  onChangeText={setInstallmentEditFormAmount}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                />
                <Text style={styles.label}>Payment Method</Text>
                <Picker
                  selectedValue={installmentEditFormPaymentMethod}
                  onValueChange={setInstallmentEditFormPaymentMethod}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Payment Method" value="" />
                  <Picker.Item label="Cash" value="CASH" />
                  <Picker.Item label="Cheque" value="CHECK" />
                  <Picker.Item label="UPI" value="UPI" />
                  <Picker.Item label="RTGS" value="RTGS" />
                  <Picker.Item label="NEFT" value="NEFT" />
                </Picker>
                <Text style={styles.label}>Remark</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={installmentEditFormRemark}
                  onChangeText={setInstallmentEditFormRemark}
                  multiline
                  numberOfLines={3}
                  placeholder="Enter remark"
                />
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setShowCustomerInstallmentEditForm(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleSubmitEditInstallment}
                  >
                    <MaterialIcons name="save" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Edit Customer Form Modal */}
      <Modal visible={showEditCustomerForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, styles.modalLarge]}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Customer Details</Text>
                <TouchableOpacity onPress={() => setShowEditCustomerForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.form}>
                <Text style={styles.sectionTitle}>Booking Details</Text>
                <Text style={styles.label}>Deal Price</Text>
                <TextInput
                  style={styles.input}
                  value={dealPrice}
                  onChangeText={setDealPrice}
                  keyboardType="numeric"
                  placeholder="Enter deal price"
                />
                <Text style={styles.label}>Token Amount</Text>
                <TextInput
                  style={styles.input}
                  value={tokenAmount}
                  onChangeText={setTokenAmount}
                  keyboardType="numeric"
                  placeholder="Enter token amount"
                />
                <Text style={styles.label}>Agreement Amount</Text>
                <TextInput
                  style={styles.input}
                  value={agreementAmount}
                  onChangeText={setAgreementAmount}
                  keyboardType="numeric"
                  placeholder="Enter agreement amount"
                />
                <Text style={styles.label}>Stamp Duty</Text>
                <TextInput
                  style={styles.input}
                  value={stampDutyAmount}
                  onChangeText={setStampDutyAmount}
                  keyboardType="numeric"
                  placeholder="Enter stamp duty"
                />
                <Text style={styles.label}>Registration Amount</Text>
                <TextInput
                  style={styles.input}
                  value={registrationAmount}
                  onChangeText={setRegistrationAmount}
                  keyboardType="numeric"
                  placeholder="Enter registration amount"
                />
                <Text style={styles.label}>GST Amount</Text>
                <TextInput
                  style={styles.input}
                  value={gstAmount}
                  onChangeText={setGstAmount}
                  keyboardType="numeric"
                  placeholder="Enter GST amount"
                />
                <Text style={styles.label}>Electric Water Amount</Text>
                <TextInput
                  style={styles.input}
                  value={electricWaterAmount}
                  onChangeText={setElectricWaterAmount}
                  keyboardType="numeric"
                  placeholder="Enter electric/water amount"
                />
                <Text style={styles.label}>Legal Charges Amount</Text>
                <TextInput
                  style={styles.input}
                  value={legalChargesAmount}
                  onChangeText={setLegalChargesAmount}
                  keyboardType="numeric"
                  placeholder="Enter legal charges"
                />
                <Text style={styles.label}>Booked On</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowBookedOnDatePicker(true)}
                >
                  <Text style={styles.dateText}>
                    {bookedOn || 'Select Date'}
                  </Text>
                  <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
                </TouchableOpacity>
                {showBookedOnDatePicker && (
                  <DateTimePicker
                    value={bookedOn ? new Date(bookedOn) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowBookedOnDatePicker(false);
                      if (date) setBookedOn(date.toISOString().split('T')[0]);
                    }}
                  />
                )}
                <Text style={styles.label}>Booking Status</Text>
                <Picker
                  selectedValue={bookingStatus}
                  onValueChange={setBookingStatus}
                  style={styles.picker}
                >
                  <Picker.Item label="PENDING" value="PENDING" />
                  <Picker.Item label="COMPLETE" value="COMPLETE" />
                  <Picker.Item label="CANCELLED" value="CANCELLED" />
                </Picker>
                <Text style={styles.sectionTitle}>Customer Information</Text>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="Enter email"
                />
                <Text style={styles.label}>Aadhar Number</Text>
                <TextInput
                  style={styles.input}
                  value={aadharNumber}
                  onChangeText={setAadharNumber}
                  keyboardType="numeric"
                  placeholder="Enter Aadhar number"
                />
                <Text style={styles.label}>PAN Number</Text>
                <TextInput
                  style={styles.input}
                  value={panCard}
                  onChangeText={setPanCard}
                  placeholder="Enter PAN number"
                />
                <Text style={styles.label}>Agent Name</Text>
                <TextInput
                  style={styles.input}
                  value={agentName}
                  onChangeText={setAgentName}
                  placeholder="Enter agent name"
                />
                <Text style={styles.label}>Brokerage</Text>
                <TextInput
                  style={styles.input}
                  value={brokerage}
                  onChangeText={setBrokerage}
                  keyboardType="numeric"
                  placeholder="Enter brokerage"
                />
                <Text style={styles.label}>Bank Name</Text>
                <TextInput
                  style={styles.input}
                  value={bankName}
                  onChangeText={setBankName}
                  placeholder="Enter bank name"
                />
                <Text style={styles.label}>Loan Amount</Text>
                <TextInput
                  style={styles.input}
                  value={loanAmount}
                  onChangeText={setLoanAmount}
                  keyboardType="numeric"
                  placeholder="Enter loan amount"
                />
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  numberOfLines={3}
                  placeholder="Enter address"
                />
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setShowEditCustomerForm(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleUpdateCustomerDetail}
                  >
                    <MaterialIcons name="save" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Update Details</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Customer Slip Modal */}
      <Modal visible={customerSlip} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, styles.modalLarge]}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Customer Slip</Text>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleDownload}>
                    <MaterialIcons name="file-download" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Download PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCustomerSlip(false)}>
                    <MaterialIcons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.slipContent}>
                <Text style={styles.slipHeader}>AG - Construction</Text>
                <Text style={styles.slipText}>
                  Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34
                </Text>
                <Text style={styles.slipText}>CONTACT: +91-9028999253 | 9373450092</Text>
                <Text style={styles.slipText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
                <View style={styles.slipDetails}>
                  <View style={styles.slipTable}>
                    <View style={styles.slipTableRow}>
                      <Text style={styles.slipTableCell}>Flat No / Plot No</Text>
                      <Text style={styles.slipTableCell}>{customerDetail?.residency?.identifier}</Text>
                    </View>
                    <View style={styles.slipTableRow}>
                      <Text style={styles.slipTableCell}>Area</Text>
                      <Text style={styles.slipTableCell}>{customerDetail?.customer?.address}</Text>
                    </View>
                    <View style={styles.slipTableRow}>
                      <Text style={styles.slipTableCell}>Location</Text>
                      <Text style={styles.slipTableCell}>{customerDetail?.residency?.name}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.slipText}>
                  RECEIVED with thanks from <Text style={styles.bold}>{customerDetail?.customer?.name}</Text> the sum of
                  Rupees <Text style={styles.bold}>₹{customerDetail?.dealPrice?.toLocaleString()}</Text> by Cheque / Cash /
                  Draft No. <Text style={styles.bold}>{customerDetail?.residency?.identifier}</Text> flat / plot address{' '}
                  <Text style={styles.bold}>{customerDetail?.customer?.address}</Text> in part / full / advance payment.
                </Text>
                <Text style={styles.slipText}>
                  <Text style={styles.bold}>
                    Balance Amount: ₹{(customerDetail?.dealPrice - (customerDetail?.agreementAmount + customerDetail?.tokenAmount))?.toLocaleString()}
                  </Text>
                </Text>
                <Text style={styles.slipText}>
                  <Text style={styles.bold}>
                    Total Payable: ₹{(customerDetail?.agreementAmount + customerDetail?.tokenAmount)?.toLocaleString()}
                  </Text>
                </Text>
                <View style={styles.slipSignatures}>
                  <Text>Customer Signature</Text>
                  <Text>Authorised Signature</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#E5EEFF',
    textAlign: 'center',
    marginTop: 6,
  },
  actionBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    minWidth: 140,
  },
  slipButton: {
    backgroundColor: '#3B82F6',
  },
  bankButton: {
    backgroundColor: '#10B981',
  },
  installmentButton: {
    backgroundColor: '#F59E0B',
  },
  viewButton: {
    backgroundColor: '#8B5CF6',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsGrid: {
    marginTop: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoItem: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  modalLarge: {
    width: '95%',
    maxWidth: 600,
  },
  modalGradient: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#1F2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textarea: {
    height: 80,
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  installmentContent: {
    marginBottom: 20,
  },
  summaryGrid: {
    marginBottom: 20,
  },
  summaryItem: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  summaryLabel: {
    fontWeight: '600',
    color: '#1F2937',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  actionButtonSmall: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  slipContent: {
    padding: 20,
  },
  slipHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  slipText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  slipDetails: {
    marginVertical: 12,
  },
  slipTable: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  slipTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
  },
  slipTableCell: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  slipSignatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bold: {
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    textAlign: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default FlatOwner;