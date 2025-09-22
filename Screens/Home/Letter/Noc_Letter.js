// import React from 'react'
// import { Text, View } from 'react-native'

// const Noc_Letter = () => {
//   return (
//     <View>
//       <Text>Noc_Letter</Text>
//     </View>
//   )
// }

// export default Noc_Letter







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { ag } from "@/assets/images/ag.js";
// import logo from '@/assets/images/agconstruction-1.png';
// import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   FlatList,
//   Image,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const getAuthHeaders = async () => {
//     const token = await AsyncStorage.getItem('jwtToken'); // Fixed typo: removed space
//     if (!token) {
//       throw new Error('No authentication token found');
//     }
//     return { Authorization: `Bearer ${token}` };
//   };
// // Custom numberToWords function
// const numberToWords = (num) => {
//   const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//   const thousands = ['', 'Thousand', 'Million', 'Billion'];

//   if (num === 0) return 'Zero';

//   const convertLessThanThousand = (n) => {
//     if (n === 0) return '';
//     if (n < 10) return units[n];
//     if (n < 20) return teens[n - 10];
//     if (n < 100) {
//       return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + units[n % 10] : ''}`;
//     }
//     return `${units[Math.floor(n / 100)]} Hundred${n % 100 ? ' ' + convertLessThanThousand(n % 100) : ''}`;
//   };

//   let word = '';
//   let thousandIndex = 0;

//   while (num > 0) {
//     const chunk = num % 1000;
//     if (chunk) {
//       word = `${convertLessThanThousand(chunk)} ${thousands[thousandIndex]}${word ? ' ' + word : ''}`;
//     }
//     num = Math.floor(num / 1000);
//     thousandIndex++;
//   }

//   return word.trim();
// };

// const Noc_Letter = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     bankName: '',
//     address: '',
//     blank: '',
//     coustomername: '',
//     aggrementDate: new Date(),
//     flatNo: '',
//     buildingNo: '',
//     streetNo: '',
//     localityName: '',
//     areaName: '',
//     pincode: '',
//     city: '',
//     transactionAmount: '',
//     transactionAmountWords: '',
//     facvoringName: '',
//     reciverBankName: '',
//     branchName: '',
//     acNO: '',
//     ifsc: '',
//   });

//   const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });
//   const [focusedInput, setFocusedInput] = useState(null);
//   const [showNocLetter, setShowNocLetter] = useState(false);
//   const [nocSingleLetter, setNocSingleLetter] = useState(null);
//   const [nocLetterTable, setNocLetterTable] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showActionMenu, setShowActionMenu] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'

//   const currentDate = new Date().toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   });

//   const handleChange = (name, value) => {
//     let updatedFormData = { ...formData, [name]: value };
//     if (name === 'transactionAmount') {
//       const numericValue = value.replace(/,/g, '');
//       if (!isNaN(numericValue) && numericValue !== '') {
//         updatedFormData.transactionAmount = numericValue;
//         updatedFormData.transactionAmountWords = numberToWords(parseInt(numericValue)) + ' Only';
//       } else {
//         updatedFormData.transactionAmount = '';
//         updatedFormData.transactionAmountWords = '';
//       }
//     }
//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async () => {
//     const requiredFields = [
//       'bankName',
//       'address',
//       'coustomername',
//       'flatNo',
//       'buildingNo',
//       'streetNo',
//       'localityName',
//       'areaName',
//       'pincode',
//       'city',
//       'transactionAmount',
//       'transactionAmountWords',
//       'facvoringName',
//       'reciverBankName',
//       'branchName',
//       'acNO',
//       'ifsc',
//     ];
//     const isFormComplete = requiredFields.every(
//       (field) => formData[field] && (typeof formData[field] !== 'string' || formData[field].trim())
//     );

//     if (!isFormComplete) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     const payload = {
//       ...formData,
//       aggrementDate: formData.aggrementDate.toISOString().split('T')[0],
//     };

//     try {
//       const headers = await getAuthHeaders();
//       if (isEditMode && editId) {
//         await axios.put(`${BASE_URL}/bankNoc/${editId}`, payload, { headers });
//         Alert.alert('Success', 'NOC Letter Updated Successfully');
//       } else {
//         await axios.post(`${BASE_URL}/createBankNoc`, payload, { headers });
//         Alert.alert('Success', 'NOC Letter Submitted Successfully');
//       }

//       setFormData({
//         bankName: '',
//         address: '',
//         blank: '',
//         coustomername: '',
//         aggrementDate: new Date(),
//         flatNo: '',
//         buildingNo: '',
//         streetNo: '',
//         localityName: '',
//         areaName: '',
//         pincode: '',
//         city: '',
//         transactionAmount: '',
//         transactionAmountWords: '',
//         facvoringName: '',
//         reciverBankName: '',
//         branchName: '',
//         acNO: '',
//         ifsc: '',
//       });
//       setIsEditMode(false);
//       setEditId(null);
//       setRefreshKey(refreshKey + 1);
//       setActiveTab('list'); // Switch to list view after submission
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       Alert.alert('Error', 'Failed to submit form. Please try again.');
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       bankName: item.bankName || '',
//       address: item.address || '',
//       blank: item.blank || '',
//       coustomername: item.coustomername || '',
//       aggrementDate: item.aggrementDate ? new Date(item.aggrementDate) : new Date(),
//       flatNo: item.flatNo || '',
//       buildingNo: item.buildingNo || '',
//       streetNo: item.streetNo || '',
//       localityName: item.localityName || '',
//       areaName: item.areaName || '',
//       pincode: item.pincode || '',
//       city: item.city || '',
//       transactionAmount: item.transactionAmount || '',
//       transactionAmountWords: item.transactionAmountWords || '',
//       facvoringName: item.facvoringName || '',
//       reciverBankName: item.reciverBankName || '',
//       branchName: item.branchName || '',
//       acNO: item.acNO || '',
//       ifsc: item.ifsc || '',
//     });
//     setEditId(item.id);
//     setIsEditMode(true);
//     setShowActionMenu(null);
//     setActiveTab('form'); // Switch to form view for editing
//   };

//   const handleDelete = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this NOC letter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const headers = await getAuthHeaders();
//               await axios.delete(`${BASE_URL}/bankNoc/${id}`, { headers });
//               setRefreshKey(refreshKey + 1);
//               Alert.alert('Success', 'NOC letter deleted successfully');
//             } catch (error) {
//               console.error('Error deleting NOC letter:', error);
//               Alert.alert('Error', 'Failed to delete NOC letter');
//             }
//           },
//         },
//       ]
//     );
//     setShowActionMenu(null);
//   };

//   const handleView = async (id) => {
//     try {
//       const headers = await getAuthHeaders();
//       const response = await axios.get(`${BASE_URL}/bankNoc/${id}`, { headers });
//       setNocSingleLetter(response.data);
//       setShowNocLetter(true);
//       setShowActionMenu(null);
//     } catch (error) {
//       console.error('Error fetching NOC letter:', error);
//       Alert.alert('Error', 'Failed to fetch NOC letter details');
//     }
//   };

//   const generatePDF = async (data) => {
//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             max-width: 800px;
//             margin: 20px auto;
//             padding: 20px;
//             line-height: 1.8;
//             color: #000;
//           }
//           .header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 20px;
//           }
//           .logo {
//             height: 80px;
//             width: auto;
//           }
//           .contact-info {
//             text-align: right;
//             font-size: 14px;
//             color: #000;
//           }
//           .contact-row {
//             display: flex;
//             justify-content: flex-end;
//             align-items: center;
//             margin-bottom: 5px;
//           }
//           .icon-box {
//             background-color: #d34508;
//             padding: 8px;
//             border-radius: 2px;
//             margin-left: 10px;
//           }
//           .divider {
//             border-top: 3px solid rgb(167, 5, 86);
//             margin: 10px 0;
//           }
//           .content {
//             font-size: 16px;
//             line-height: 1.8;
//             margin-left: 40px;
//           }
//           .content h2 {
//             font-size: 18px;
//             margin-bottom: 20px;
//           }
//           .content b {
//             font-weight: bold;
//           }
//           .recipient-info {
//             display: flex;
//             justify-content: space-between;
//             padding: 20px 0;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <img src="${ag}" alt="ROYAALMEDE" class="logo">
//           <div class="contact-info">
//             <div class="contact-row">
//               <div>
//                 <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar,</p>
//                 <p>Hudkeshwar Road, Nagpur - 440034</p>
//               </div>
//               <div class="icon-box"><i class="fa fa-map-marker"></i></div>
//             </div>
//             <div class="contact-row">
//               <p>agconstructions220@gmail.com</p>
//               <div class="icon-box"><i class="fa fa-envelope"></i></div>
//             </div>
//             <div class="contact-row">
//               <p>www.agconstructionnagpur.in</p>
//               <div class="icon-box"><i class="fa fa-globe"></i></div>
//             </div>
//             <div class="contact-row">
//               <p>+91 7620 419 075</p>
//               <div class="icon-box"><i class="fa fa-phone"></i></div>
//             </div>
//           </div>
//         </div>
//         <div class="divider"></div>
//         <div class="content">
//           <div class="recipient-info">
//             <div>
//               <p>The Assistant General Manager</p>
//               <p>${data.bankName}</p>
//               <p>${data.city}</p>
//             </div>
//             <p>Date: ${currentDate}</p>
//           </div>
//           <p style="margin-top: 30px;">TO,</p>
//           <p>I/We, <b>${data.coustomername}</b>, hereby certify that:</p>
//           <p style="margin-top: 20px;">
//             1. I/We have transferable rights to the property described below, which has been allotted
//             by me/us to Mr. ${data.coustomername}, hereinafter referred to as “the purchasers”, subject
//             to the due and proper performance and compliances of all the terms and conditions of the
//             Allotment Letter/Sale Agreement dated ${new Date(data.aggrementDate).toLocaleDateString('en-GB')} (hereinafter referred to as the “Sale document”)
//           </p>
//           <p style="margin-top: 20px;"><b>Description of the property:</b></p>
//           <p>Flat No./ House No. ${data.flatNo}</p>
//           <p>Building No./Name: ${data.buildingNo}</p>
//           <p>Street No./Name: ${data.streetNo}</p>
//           <p>Locality Name: ${data.localityName}</p>
//           <p>Area Name: ${data.areaName}</p>
//           <p>City Name: ${data.city}</p>
//           <p>Pin Code: ${data.pincode}</p>
//           <p style="margin-top: 20px;">
//             2. That the total consideration for this transaction is Rs.${data.transactionAmount}/- (${data.transactionAmountWords})
//             towards sale document.
//           </p>
//           <p>
//             3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.
//           </p>
//           <p>
//             4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs,
//             charges, risks and consequences mortgaging the said property to ${data.bankName}
//             (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank
//             to them subject to the due and proper performance and compliances of all the terms and
//             conditions of the sale document by the said purchasers.
//           </p>
//           <p style="margin-top: 20px;">
//             5. We have borrowed from ${data.bankName} (name of the financial institution) whose NOC
//             for this transaction is enclosed herewith / We have not borrowed from any financial institution
//             for the purchase/development of the property and have not created and will not create any
//             encumbrances on the property allotted to the said purchasers during the currency of the loan
//             sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance
//             and compliances of all the terms and conditions of the sale document by the said purchasers.
//           </p>
//           <p>
//             6. After creation of proper charge/mortgage and after receipt of the copies thereof and after
//             receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable
//             to accept ${data.bankName} as a nominee of the above named purchaser for the property
//             described above and once the nomination favoring the Bank has been registered and advice
//             sent to the Bank of having done so, I/We note not to change the same without the written
//             NOC of the Bank.
//           </p>
//           <p>
//             7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt
//             of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake
//             to inform the society about the Bank’s charge on the said flat as and when the society is formed.
//           </p>
//           <p>
//             8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “${data.facvoringName} (Name), ${data.reciverBankName} (Bank Name) ${data.branchName} Branch, Account No.${data.acNO}”.
//           </p>
//           <p style="margin-top: 20px;">
//             company/firm vide ____________________ (description of document of delegation of authority to the signatory.)
//           </p>
//           <p style="margin-top: 30px;">Yours faithfully,</p>
//           <p style="margin-top: 60px;">Authorized Signatory.</p>
//           <p>Name –</p>
//           <p>Place –</p>
//           <p>Date: ${currentDate}</p>
//         </div>
//       </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({ html });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, { dialogTitle: `${data.coustomername}_noc_letter.pdf` });
//         Alert.alert('Success', 'PDF generated and ready to share!');
//       } else {
//         Alert.alert('Error', 'Sharing is not available on this device.');
//       }
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   useEffect(() => {
//     const fetchNocLetters = async () => {
//       try {
//         setLoading(true);
//         const headers = await getAuthHeaders();
//         const response = await axios.get(`${BASE_URL}/bankNoc`, { headers });
//         const sortedData = [...response.data].sort((a, b) => b.id - a.id);
//         setNocLetterTable(sortedData);
//         setFilteredData(sortedData);
//       } catch (error) {
//         console.error('Error fetching NOC letters:', error);
//         Alert.alert('Error', 'Failed to fetch NOC letters');
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     };
//     fetchNocLetters();
//   }, [refreshKey]);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredData(nocLetterTable);
//     } else {
//       const filtered = nocLetterTable.filter(
//         (item) =>
//           item.coustomername.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.city.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchQuery, nocLetterTable]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setRefreshKey(refreshKey + 1);
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const renderInput = (field, index) => {
//     const isFocused = focusedInput === field.key;

//     return (
//       <View key={index} style={styles.inputGroup}>
//         <Text style={styles.label}>{field.label}</Text>
//         <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
//           <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
//             <MaterialIcons
//               name={field.icon}
//               size={24}
//               color={isFocused ? '#6A5ACD' : '#8A8A8A'}
//               style={styles.inputIcon}
//             />
//             <TextInput
//               style={[styles.input, field.multiline && styles.multilineInput]}
//               placeholder={field.label}
//               value={formData[field.key]}
//               onChangeText={(text) => handleChange(field.key, text)}
//               onFocus={() => setFocusedInput(field.key)}
//               onBlur={() => setFocusedInput(null)}
//               placeholderTextColor="#999"
//               keyboardType={field.keyboardType}
//               autoCapitalize={field.autoCapitalize}
//               multiline={field.multiline}
//             />
//           </View>
//         </BlurView>
//       </View>
//     );
//   };

//   const renderDateField = (field) => {
//     const isFocused = focusedInput === field.key;

//     return (
//       <View key={field.key} style={styles.inputGroup}>
//         <Text style={styles.label}>{field.label}</Text>
//         <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
//           <TouchableOpacity
//             style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}
//             onPress={() => setShowDatePicker({ field: field.key, visible: true })}
//           >
//             <MaterialIcons
//               name="event"
//               size={24}
//               color={isFocused ? '#6A5ACD' : '#8A8A8A'}
//               style={styles.inputIcon}
//             />
//             <Text style={styles.dateText}>{formatDate(formData[field.key])}</Text>
//           </TouchableOpacity>
//         </BlurView>
//         {showDatePicker.visible && showDatePicker.field === field.key && (
//           <DateTimePicker
//             value={formData[field.key]}
//             mode="date"
//             display="default"
//             onChange={(event, selectedDate) => {
//               setShowDatePicker({ field: null, visible: false });
//               if (selectedDate) {
//                 setFormData({ ...formData, [field.key]: selectedDate });
//               }
//             }}
//           />
//         )}
//       </View>
//     );
//   };

//   const formFields = [
//     { label: 'Bank Name', icon: 'account-balance', key: 'bankName' },
//     { label: 'Address', icon: 'location-on', key: 'address', multiline: true },
//     { label: 'Blank', icon: 'description', key: 'blank' },
//     { label: 'Customer Name', icon: 'person', key: 'coustomername' },
//     { label: 'Agreement Date', icon: 'event', key: 'aggrementDate', type: 'date' },
//     { label: 'Flat No', icon: 'home', key: 'flatNo' },
//     { label: 'Building No', icon: 'business', key: 'buildingNo' },
//     { label: 'Street No', icon: 'location-on', key: 'streetNo' },
//     { label: 'Locality Name', icon: 'location-on', key: 'localityName' },
//     { label: 'Area Name', icon: 'location-on', key: 'areaName' },
//     { label: 'Pincode', icon: 'location-on', key: 'pincode', keyboardType: 'numeric' },
//     { label: 'City', icon: 'location-city', key: 'city' },
//     { label: 'Transaction Amount', icon: 'attach-money', key: 'transactionAmount', keyboardType: 'numeric' },
//     { label: 'Favouring Name', icon: 'person', key: 'facvoringName' },
//     { label: 'Receiver Bank Name', icon: 'account-balance', key: 'reciverBankName' },
//     { label: 'Branch Name', icon: 'location-on', key: 'branchName' },
//     { label: 'Account No', icon: 'account-box', key: 'acNO' },
//     { label: 'IFSC Code', icon: 'code', key: 'ifsc' },
//   ];

//   const renderNocItem = ({ item, index }) => (
//     <TouchableOpacity
//       style={[styles.offerCard, index % 2 === 0 ? styles.evenCard : styles.oddCard]}
//       onPress={() => handleView(item.id)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.avatarContainer}>
//           <Text style={styles.avatarText}>{item.coustomername.charAt(0).toUpperCase()}</Text>
//         </View>
//         <View style={styles.cardHeaderContent}>
//           <Text style={styles.cardName}>{item.coustomername}</Text>
//           <Text style={styles.cardPosition}>{item.bankName}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.moreButton}
//           onPress={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
//         >
//           <Feather name="more-vertical" size={20} color="#6b7280" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.cardDetails}>
//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="home" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>Flat No: {item.flatNo}</Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Feather name="calendar" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>
//               Date: {new Date(item.aggrementDate).toLocaleDateString('en-GB')}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="map-pin" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
//               City: {item.city}
//             </Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Feather name="credit-card" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>A/C No: {item.acNO}</Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="dollar-sign" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>Amount: ₹{item.transactionAmount}</Text>
//           </View>
//         </View>
//       </View>

//       {showActionMenu === item.id && (
//         <View style={styles.actionMenu}>
//           <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleView(item.id)}>
//             <Feather name="eye" size={16} color="#6A5ACD" />
//             <Text style={styles.actionMenuText}>View</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleEdit(item)}>
//             <Feather name="edit" size={16} color="#3b82f6" />
//             <Text style={styles.actionMenuText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleDelete(item.id)}>
//             <Feather name="trash-2" size={16} color="#ef4444" />
//             <Text style={styles.actionMenuText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </TouchableOpacity>
//   );

//   const renderEmptyComponent = () => {
//     if (loading) {
//       return (
//         <View style={styles.emptyContainer}>
//           <ActivityIndicator size="large" color="#6A5ACD" />
//           <Text style={styles.emptyText}>Loading NOC letters...</Text>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.emptyContainer}>
//         <Feather name="file-text" size={60} color="#d1d5db" />
//         <Text style={styles.emptyTitle}>No NOC letters found</Text>
//         <Text style={styles.emptyText}>
//           {searchQuery ? 'Try a different search term' : 'Create your first NOC letter above'}
//         </Text>
//       </View>
//     );
//   };

//   const renderFormView = () => (
//     <ScrollView
//       style={styles.formScrollView}
//       contentContainerStyle={styles.formScrollViewContent}
//       showsVerticalScrollIndicator={true}
//       nestedScrollEnabled={true}
//     >
//       <View style={styles.formContainer}>
//         {formFields.map((field, index) =>
//           field.type === 'date' ? renderDateField(field) : renderInput(field, index)
//         )}

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <LinearGradient
//             colors={['#6A5ACD', '#483D8B', '#191970']}
//             style={styles.submitButtonGradient}
//           >
//             <Text style={styles.submitButtonText}>
//               {isEditMode ? 'Update' : 'Submit'}
//             </Text>
//             <MaterialIcons name="send" size={24} color="#fff" />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );

//   const renderListView = () => (
//     <View style={styles.tableContainer}>
//       <View style={styles.searchContainer}>
//         <Feather name="search" size={20} color="#6A5ACD" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by name or bank..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholderTextColor="#9ca3af"
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchQuery('')}>
//             <Feather name="x" size={20} color="#6A5ACD" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.tableStats}>
//         <Text style={styles.tableStatsText}>
//           {filteredData.length} {filteredData.length === 1 ? 'NOC letter' : 'NOC letters'}
//         </Text>
//         <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
//           <Feather name="refresh-cw" size={16} color="#6A5ACD" />
//           <Text style={styles.refreshButtonText}>Refresh</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredData}
//         renderItem={renderNocItem}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={renderEmptyComponent}
//         showsVerticalScrollIndicator={true}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6A5ACD']} />
//         }
//         nestedScrollEnabled={true}
//         style={styles.flatList}
//         contentContainerStyle={styles.flatListContent}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <StatusBar barStyle="light-content" backgroundColor="#6A5ACD" /> */}
//       <LinearGradient colors={['#6A5ACD', '#483D8B', '#191970']} style={styles.gradient}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.keyboardView}
//         >
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <MaterialIcons name="arrow-back" size={30} color="white" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>NOC Letter</Text>
//             <View style={styles.spacer} />
//           </View>

//           <View style={styles.tabContainer}>
//             <TouchableOpacity
//               style={[styles.tabButton, activeTab === 'form' && styles.activeTabButton]}
//               onPress={() => setActiveTab('form')}
//             >
//               <Feather 
//                 name="edit" 
//                 size={18} 
//                 color={activeTab === 'form' ? '#6A5ACD' : '#6b7280'} 
//               />
//               <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
//                 {isEditMode ? 'Edit Letter' : 'New Letter'}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
//               onPress={() => setActiveTab('list')}
//             >
//               <Feather 
//                 name="list" 
//                 size={18} 
//                 color={activeTab === 'list' ? '#6A5ACD' : '#6b7280'} 
//               />
//               <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
//                 All Letters
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.contentContainer}>
//             <BlurView intensity={20} style={styles.cardBlur}>
//               <View style={styles.card}>
//                 {activeTab === 'form' ? renderFormView() : renderListView()}
//               </View>
//             </BlurView>
//           </View>
//         </KeyboardAvoidingView>
//       </LinearGradient>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showNocLetter}
//         onRequestClose={() => setShowNocLetter(false)}
//       >
//         <View style={styles.modalContainer}>
//           <BlurView intensity={90} style={styles.modalBlur}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>NOC Letter</Text>
//               <TouchableOpacity
//                 style={styles.closeModalButton}
//                 onPress={() => setShowNocLetter(false)}
//               >
//                 <Feather name="x" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>

//             {nocSingleLetter && (
//               <View style={styles.letterContainer}>
//                 <View style={styles.letterButtons}>
//                   <TouchableOpacity
//                     style={styles.downloadButton}
//                     onPress={() => generatePDF(nocSingleLetter)}
//                   >
//                     <Text style={styles.downloadButtonText}>Download PDF</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView
//                   style={styles.letterScroll}
//                   contentContainerStyle={styles.letterScrollContent}
//                   showsVerticalScrollIndicator={true}
//                   nestedScrollEnabled={true}
//                 >
//                   <View style={styles.letterContent}>
//                     <View style={styles.headerContainer}>
//                       <Image source={logo} style={styles.logo} resizeMode="contain" />
//                       <View style={styles.contactInfo}>
//                         <View style={styles.contactRow}>
//                           <View>
//                             <Text style={styles.contactText}>
//                               Plot No. 28, 1st Floor, Govind Prabhau Nagar,
//                             </Text>
//                             <Text style={styles.contactText}>
//                               Hudkeshwar Road, Nagpur - 440034
//                             </Text>
//                           </View>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="map-marker" size={15} color="#fff" />
//                           </View>
//                         </View>
//                         <View style={styles.contactRow}>
//                           <Text style={styles.contactText}>royaalmede@gmail.com</Text>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="envelope" size={15} color="#fff" />
//                           </View>
//                         </View>
//                         <View style={styles.contactRow}>
//                           <Text style={styles.contactText}>www.royaalmede.co.in</Text>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="globe" size={15} color="#fff" />
//                           </View>
//                         </View>
//                         <View style={styles.contactRow}>
//                           <Text style={styles.contactText}>9028999253 | 9373450092</Text>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="phone" size={15} color="#fff" />
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <View style={styles.dividerContainer}>
//                       <View style={[styles.divider, { borderWidth: 3 }]} />
//                     </View>

//                     <View style={styles.contentContainer}>
//                       <View style={styles.contentRow}>
//                         <View style={styles.recipientInfo}>
//                           <View>
//                             <Text style={styles.letterText}>The Assistant General Manager</Text>
//                             <Text style={styles.letterText}>{nocSingleLetter.bankName}</Text>
//                             <Text style={styles.letterText}>{nocSingleLetter.city}</Text>
//                           </View>
//                           <Text style={styles.letterText}>Date: {currentDate}</Text>
//                         </View>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 30 }]}>
//                         <Text style={styles.letterText}>TO,</Text>
//                         <Text style={styles.letterText}>
//                           I/We, <Text style={styles.boldText}>{nocSingleLetter.coustomername}</Text>, hereby certify that:
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           1. I/We have transferable rights to the property described below, which has been allotted
//                           by me/us to Mr. <Text style={styles.boldText}>{nocSingleLetter.coustomername}</Text>, hereinafter referred to as “the purchasers”, subject
//                           to the due and proper performance and compliances of all the terms and conditions of the
//                           Allotment Letter/Sale Agreement dated{' '}
//                           <Text style={styles.boldText}>{new Date(nocSingleLetter.aggrementDate).toLocaleDateString('en-GB')}</Text> (hereinafter referred to as the “Sale document”)
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterHeading}>Description of the property:</Text>
//                       </View>
//                       <View style={styles.contentRow}>
//                         <Text style={styles.letterText}>
//                           Flat No./ House No. <Text style={styles.boldText}>{nocSingleLetter.flatNo}</Text>
//                         </Text>
//                         <Text style={styles.letterText}>
//                           Building No./Name: <Text style={styles.boldText}>{nocSingleLetter.buildingNo}</Text>
//                         </Text>
//                         <Text style={styles.letterText}>
//                           Street No./Name: <Text style={styles.boldText}>{nocSingleLetter.streetNo}</Text>
//                         </Text>
//                         <Text style={styles.letterText}>
//                           Locality Name: <Text style={styles.boldText}>{nocSingleLetter.localityName}</Text>
//                         </Text>
//                         <Text style={styles.letterText}>
//                           Area Name: <Text style={styles.boldText}>{nocSingleLetter.areaName}</Text>
//                         </Text>
//                         <Text style={styles.letterText}>
//                           City Name: <Text style={styles.boldText}>{nocSingleLetter.city}</Text>
//                         </Text>
//                         <Text style={styles.letterText}>
//                           Pin Code: <Text style={styles.boldText}>{nocSingleLetter.pincode}</Text>
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           2. That the total consideration for this transaction is Rs.
//                           <Text style={styles.boldText}>{nocSingleLetter.transactionAmount}</Text>/- (
//                           <Text style={styles.boldText}>{nocSingleLetter.transactionAmountWords}</Text>)
//                           towards sale document.
//                         </Text>
//                       </View>
//                       <View style={styles.contentRow}>
//                         <Text style={styles.letterText}>
//                           3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.
//                         </Text>
//                       </View>
//                       <View style={styles.contentRow}>
//                         <Text style={styles.letterText}>
//                           4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs,
//                           charges, risks and consequences mortgaging the said property to{' '}
//                           <Text style={styles.boldText}>{nocSingleLetter.bankName}</Text> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank
//                           to them subject to the due and proper performance and compliances of all the terms and
//                           conditions of the sale document by the said purchasers.
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           5. We have borrowed from <Text style={styles.boldText}>{nocSingleLetter.bankName}</Text> (name of the financial institution) whose NOC
//                           for this transaction is enclosed herewith / We have not borrowed from any financial institution
//                           for the purchase/development of the property and have not created and will not create any
//                           encumbrances on the property allotted to the said purchasers during the currency of the loan
//                           sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance
//                           and compliances of all the terms and conditions of the sale document by the said purchasers.
//                         </Text>
//                       </View>
//                       <View style={styles.contentRow}>
//                         <Text style={styles.letterText}>
//                           6. After creation of proper charge/mortgage and after receipt of the copies thereof and after
//                           receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable
//                           to accept <Text style={styles.boldText}>{nocSingleLetter.bankName}</Text> as a nominee of the above named purchaser for the property
//                           described above and once the nomination favoring the Bank has been registered and advice
//                           sent to the Bank of having done so, I/We note not to change the same without the written
//                           NOC of the Bank.
//                         </Text>
//                       </View>
//                       <View style={styles.contentRow}>
//                         <Text style={styles.letterText}>
//                           7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt
//                           of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake
//                           to inform the society about the Bank’s charge on the said flat as and when the society is formed.
//                         </Text>
//                       </View>
//                       <View style={styles.contentRow}>
//                         <Text style={styles.letterText}>
//                           8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “
//                           <Text style={styles.boldText}>{nocSingleLetter.facvoringName}</Text> (Name), <Text style={styles.boldText}>{nocSingleLetter.reciverBankName}</Text> (Bank Name) <Text style={styles.boldText}>{nocSingleLetter.branchName}</Text> Branch, Account No.<Text style={styles.boldText}>{nocSingleLetter.acNO}</Text>”.
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           company/firm vide ____________________ (description of document of delegation of authority to the signatory.)
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 30 }]}>
//                         <Text style={styles.letterText}>Yours faithfully,</Text>
//                         <Text style={[styles.letterText, { marginTop: 60 }]}>Authorized Signatory.</Text>
//                         <Text style={styles.letterText}>Name –</Text>
//                         <Text style={styles.letterText}>Place –</Text>
//                         <Text style={styles.letterText}>Date: {currentDate}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 </ScrollView>
//               </View>
//             )}
//           </BlurView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: Platform.OS === 'ios' ? 50 : 30,
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   backButton: {
//     padding: 5,
//   },
//   spacer: {
//     width: 40,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     marginHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   tabButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   activeTabButton: {
//     backgroundColor: 'rgba(106, 90, 205, 0.1)',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#6b7280',
//     marginLeft: 8,
//   },
//   activeTabText: {
//     color: '#6A5ACD',
//     fontWeight: '600',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   cardBlur: {
//     flex: 1,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 25,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   formScrollView: {
//     flex: 1,
//   },
//   formScrollViewContent: {
//     paddingBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#483D8B',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   blurContainer: {
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(248,249,250,0.7)',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//   },
//   inputWrapperFocused: {
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderWidth: 2,
//     borderColor: '#6A5ACD',
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 15,
//     fontSize: 16,
//     color: '#333',
//   },
//   multilineInput: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//     paddingVertical: 15,
//   },
//   submitButton: {
//     marginTop: 20,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   submitButtonGradient: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//     marginRight: 10,
//   },
//   tableContainer: {
//     flex: 1,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f9fafb',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#1f2937',
//   },
//   tableStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   tableStatsText: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   refreshButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f3f4f6',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   refreshButtonText: {
//     fontSize: 14,
//     color: '#6A5ACD',
//     marginLeft: 4,
//   },
//   flatList: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   offerCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginBottom: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     position: 'relative',
//   },
//   evenCard: {
//     backgroundColor: '#fff',
//   },
//   oddCard: {
//     backgroundColor: '#f9fafb',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   avatarContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#6A5ACD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   cardHeaderContent: {
//     flex: 1,
//   },
//   cardName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 2,
//   },
//   cardPosition: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   moreButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f3f4f6',
//   },
//   cardDetails: {
//     backgroundColor: '#f9fafb',
//     borderRadius: 12,
//     padding: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   detailItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   detailIcon: {
//     marginRight: 6,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#4b5563',
//     flex: 1,
//   },
//   actionMenu: {
//     position: 'absolute',
//     top: 60,
//     right: 16,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//     zIndex: 10,
//   },
//   actionMenuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   actionMenuText: {
//     fontSize: 14,
//     marginLeft: 8,
//     color: '#4b5563',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 40,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginTop: 20,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4b5563',
//     marginTop: 16,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#9ca3af',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalBlur: {
//     width: width * 0.9,
//     maxWidth: 450,
//     flex: 1,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#6A5ACD',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   closeModalButton: {
//     padding: 5,
//   },
//   letterContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   letterButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 15,
//     backgroundColor: '#f9fafb',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   downloadButton: {
//     backgroundColor: '#6A5ACD',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   downloadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   letterScroll: {
//     flex: 1,
//   },
//   letterScrollContent: {
//     paddingBottom: 20,
//     minHeight: 800,
//   },
//   letterContent: {
//     padding: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     height: 80,
//     width: 100,
//   },
//   contactInfo: {
//     flex: 2,
//     alignItems: 'flex-end',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//     justifyContent: 'flex-end',
//   },
//   iconWrapper: {
//     backgroundColor: '#d34508',
//     padding: 8,
//     borderRadius: 2,
//     marginLeft: 10,
//   },
//   contactText: {
//     color: '#000',
//     fontSize: 14,
//     marginRight: 10,
//   },
//   dividerContainer: {
//     marginBottom: 10,
//   },
//   divider: {
//     borderColor: 'rgb(167, 5, 86)',
//     marginBottom: 2,
//   },
//   contentRow: {
//     marginBottom: 10,
//   },
//   recipientInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 20,
//   },
//   letterHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//   },
//   letterText: {
//     fontSize: 16,
//     color: '#333',
//     lineHeight: 24,
//     marginTop: 5,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
// });

// export default Noc_Letter;











// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { ag } from "@/assets/images/ag.js";
// import logo from '@/assets/images/agconstruction-1.png';
// import { Feather } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // Custom numberToWords function
// const numberToWords = (num) => {
//   const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//   const thousands = ['', 'Thousand', 'Million', 'Billion'];

//   if (num === 0) return 'Zero';

//   const convertLessThanThousand = (n) => {
//     if (n === 0) return '';
//     if (n < 10) return units[n];
//     if (n < 20) return teens[n - 10];
//     if (n < 100) {
//       return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + units[n % 10] : ''}`;
//     }
//     return `${units[Math.floor(n / 100)]} Hundred${n % 100 ? ' ' + convertLessThanThousand(n % 100) : ''}`;
//   };

//   let word = '';
//   let thousandIndex = 0;

//   while (num > 0) {
//     const chunk = num % 1000;
//     if (chunk) {
//       word = `${convertLessThanThousand(chunk)} ${thousands[thousandIndex]}${word ? ' ' + word : ''}`;
//     }
//     num = Math.floor(num / 1000);
//     thousandIndex++;
//   }

//   return word.trim();
// };

// const getAuthHeaders = async () => {
//   const token = await AsyncStorage.getItem('jwtToken');
//   if (!token) {
//     throw new Error('No authentication token found');
//   }
//   return { Authorization: `Bearer ${token}` };
// };

// const Noc_Letter = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     bankName: '',
//     address: '',
//     customerName: '',
//     agreementDate: new Date(),
//     flatNo: '',
//     buildingNo: '',
//     streetNo: '',
//     localityName: '',
//     areaName: '',
//     pincode: '',
//     city: '',
//     transactionAmount: '',
//     transactionAmountWords: '',
//     favoringName: '',
//     receiverBankName: '',
//     branchName: '',
//     accountNo: '',
//     ifsc: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [nocLetters, setNocLetters] = useState([]);
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState('form');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (name, value) => {
//     let updatedFormData = { ...formData, [name]: value };
//     if (name === 'transactionAmount') {
//       const numericValue = value.replace(/,/g, '');
//       if (!isNaN(numericValue) && numericValue !== '') {
//         updatedFormData.transactionAmount = numericValue;
//         updatedFormData.transactionAmountWords = numberToWords(parseInt(numericValue)) + ' Only';
//       } else {
//         updatedFormData.transactionAmount = '';
//         updatedFormData.transactionAmountWords = '';
//       }
//     }
//     setFormData(updatedFormData);
//   };

//   const fetchNocLetters = async () => {
//     try {
//       setRefreshing(true);
//       const headers = await getAuthHeaders();
//       const response = await axios.get(`${BASE_URL}/bankNoc`, { headers });
//       setNocLetters(response.data.sort((a, b) => b.id - a.id));
//     } catch (err) {
//       console.error('Failed to fetch NOC letters:', err);
//       Alert.alert('Error', 'Failed to load NOC letters.');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchNocLetters();
//   }, []);

//   const handleSubmit = async () => {
//     const requiredFields = [
//       'bankName',
//       'address',
//       'customerName',
//       'flatNo',
//       'buildingNo',
//       'streetNo',
//       'localityName',
//       'areaName',
//       'pincode',
//       'city',
//       'transactionAmount',
//       'favoringName',
//       'receiverBankName',
//       'branchName',
//       'accountNo',
//       'ifsc',
//     ];
//     const isFormComplete = requiredFields.every(
//       (field) => formData[field] && formData[field].trim()
//     );

//     if (!isFormComplete) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     setIsSubmitting(true);
//     const payload = {
//       ...formData,
//       agreementDate: formData.agreementDate.toISOString().split('T')[0],
//       transactionAmount: parseFloat(formData.transactionAmount) || 0,
//     };

//     try {
//       const headers = await getAuthHeaders();
//       if (editId) {
//         await axios.put(`${BASE_URL}/bankNoc/${editId}`, payload, { headers });
//         Alert.alert('Success', 'NOC Letter updated successfully!');
//         setEditId(null);
//       } else {
//         await axios.post(`${BASE_URL}/createBankNoc`, payload, { headers });
//         Alert.alert('Success', 'NOC Letter successfully submitted!');
//       }

//       setFormData({
//         bankName: '',
//         address: '',
//         customerName: '',
//         agreementDate: new Date(),
//         flatNo: '',
//         buildingNo: '',
//         streetNo: '',
//         localityName: '',
//         areaName: '',
//         pincode: '',
//         city: '',
//         transactionAmount: '',
//         transactionAmountWords: '',
//         favoringName: '',
//         receiverBankName: '',
//         branchName: '',
//         accountNo: '',
//         ifsc: '',
//       });
//       fetchNocLetters();
//       setSelectedLetter(null);
//       setActiveTab('list');
//     } catch (err) {
//       console.error('Failed to submit/update NOC letter:', err);
//       Alert.alert('Error', 'Operation failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditLetter = (letter) => {
//     setEditId(letter.id);
//     setFormData({
//       bankName: letter.bankName || '',
//       address: letter.address || '',
//       customerName: letter.customerName || '',
//       agreementDate: letter.agreementDate ? new Date(letter.agreementDate) : new Date(),
//       flatNo: letter.flatNo || '',
//       buildingNo: letter.buildingNo || '',
//       streetNo: letter.streetNo || '',
//       localityName: letter.localityName || '',
//       areaName: letter.areaName || '',
//       pincode: letter.pincode || '',
//       city: letter.city || '',
//       transactionAmount: letter.transactionAmount?.toString() || '',
//       transactionAmountWords: letter.transactionAmountWords || '',
//       favoringName: letter.favoringName || '',
//       receiverBankName: letter.receiverBankName || '',
//       branchName: letter.branchName || '',
//       accountNo: letter.accountNo || '',
//       ifsc: letter.ifsc || '',
//     });
//     setActiveTab('form');
//   };

//   const handleDeleteLetter = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this NOC letter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const headers = await getAuthHeaders();
//               await axios.delete(`${BASE_URL}/bankNoc/${id}`, { headers });
//               Alert.alert('Success', 'Deleted successfully');
//               fetchNocLetters();
//             } catch (error) {
//               console.error('Error deleting NOC letter:', error);
//               Alert.alert('Error', 'Failed to delete NOC letter');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const generatePDF = async (data) => {
//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           @page {
//             margin: 0.3in;
//             size: A4;
//           }
//           body {
//             font-family: 'Arial', sans-serif;
//             margin: 0;
//             padding: 20px;
//             color: #333;
//             line-height: 1.4;
//             font-size: 12px;
//           }
//           .company-container {
//             display: flex;
//             align-items: flex-start;
//             margin-bottom: 20px;
//             gap: 20px;
//           }
//           .company-logo-container {
//             flex-shrink: 0;
//           }
//           .company-logo {
//             height: 215px;
//             width: auto;
//           }
//           .company-details {
//             flex: 1;
//           }
//           .company-details h3 {
//             margin: 0 0 10px 0;
//             font-size: 14px;
//             font-weight: bold;
//             color: #333;
//           }
//           .detail-row {
//             display: flex;
//             align-items: center;
//             margin-bottom: 8px;
//           }
//           .icon-box {
//             width: 25px;
//             height: 25px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-right: 8px;
//           }
//           .detail-text {
//             margin: 0;
//             font-size: 12px;
//             color: #333;
//           }
//           .line-thick {
//             border: none;
//             height: 2px;
//             background-color: #333;
//             margin: 15px 0;
//           }
//           .letter-title {
//             text-align: center;
//             font-size: 16px;
//             font-weight: bold;
//             margin: 10px 0;
//             color: #333;
//           }
//           .letter-details {
//             margin-top: 20px;
//           }
//           .recipient-info {
//             display: flex;
//             justify-content: space-between;
//             margin-bottom: 20px;
//           }
//           .recipient-info p {
//             margin: 5px 0;
//             font-size: 12px;
//           }
//           .letter-content {
//             margin-bottom: 20px;
//           }
//           .letter-content p {
//             margin: 10px 0;
//             font-size: 12px;
//             line-height: 1.6;
//           }
//           .letter-content strong {
//             font-weight: bold;
//           }
//           .property-table {
//             width: 100%;
//             border-collapse: collapse;
//             border: 1px solid #e5e7eb;
//             border-radius: 8px;
//             overflow: hidden;
//             margin-bottom: 20px;
//           }
//           .property-table td {
//             padding: 8px 12px;
//             border-right: 1px solid #e5e7eb;
//             border-bottom: 1px solid #e5e7eb;
//             font-size: 11px;
//           }
//           .property-table td:last-child {
//             border-right: none;
//           }
//           .property-table tr:last-child td {
//             border-bottom: none;
//           }
//           .section-title {
//             font-size: 14px;
//             font-weight: bold;
//             margin-bottom: 10px;
//             color: #483D8B;
//             text-align: center;
//             padding-bottom: 5px;
//             border-bottom: 2px solid #483D8B;
//           }
//           .footer {
//             text-align: center;
//             margin-top: 30px;
//             font-size: 10px;
//             color: #666;
//           }
//           @media print {
//             body {
//               -webkit-print-color-adjust: exact;
//               print-color-adjust: exact;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="company-container">
//           <div class="company-logo-container">
//             <img class="company-logo" src="${ag}" alt="AG Construction Logo">
//           </div>
//           <div class="company-details">
//             <h3>AG Construction</h3>
//             <div class="detail-row">
//               <div class="detail-text">
//                 <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</p>
//                 <p>Hudkeshwar Road, Nagpur - 440034</p>
//               </div>
//             </div>
//             <div class="detail-row">
//               <div class="icon-box">
//                 <span style="font-size: 16px;">📧</span>
//               </div>
//               <p class="detail-text">agconstructions220@gmail.com</p>
//             </div>
//             <div class="detail-row">
//               <div class="icon-box">
//                 <span style="font-size: 16px;">🌐</span>
//               </div>
//               <p class="detail-text">www.agconstructionnagpur.in</p>
//             </div>
//             <div class="detail-row">
//               <div class="icon-box">
//                 <span style="font-size: 16px;">📞</span>
//               </div>
//               <p class="detail-text">+91 7620 419 075</p>
//             </div>
//           </div>
//         </div>
        
//         <hr class="line-thick">
        
//         <h3 class="letter-title">No Objection Certificate</h3>
        
//         <div class="letter-details">
//           <div class="recipient-info">
//             <div>
//               <p>The Assistant General Manager</p>
//               <p>${data.bankName}</p>
//               <p>${data.city}</p>
//             </div>
//             <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
//           </div>
          
//           <div class="letter-content">
//             <p>TO,</p>
//             <p>I/We, <strong>${data.customerName}</strong>, hereby certify that:</p>
//             <p>1. I/We have transferable rights to the property described below, allotted to Mr. <strong>${data.customerName}</strong> (hereinafter referred to as “the purchasers”), subject to the terms and conditions of the Allotment Letter/Sale Agreement dated <strong>${formatDate(data.agreementDate)}</strong> (hereinafter referred to as the “Sale document”).</p>
            
//             <h3 class="section-title">Description of the Property</h3>
//             <table class="property-table">
//               <tr>
//                 <td>Flat No./House No.</td>
//                 <td>${data.flatNo}</td>
//               </tr>
//               <tr>
//                 <td>Building No./Name</td>
//                 <td>${data.buildingNo}</td>
//               </tr>
//               <tr>
//                 <td>Street No./Name</td>
//                 <td>${data.streetNo}</td>
//               </tr>
//               <tr>
//                 <td>Locality Name</td>
//                 <td>${data.localityName}</td>
//               </tr>
//               <tr>
//                 <td>Area Name</td>
//                 <td>${data.areaName}</td>
//               </tr>
//               <tr>
//                 <td>City Name</td>
//                 <td>${data.city}</td>
//               </tr>
//               <tr>
//                 <td>Pin Code</td>
//                 <td>${data.pincode}</td>
//               </tr>
//             </table>
            
//             <p>2. The total consideration for this transaction is <strong>${formatCurrency(data.transactionAmount)}</strong> (<strong>${data.transactionAmountWords}</strong>) towards the sale document.</p>
//             <p>3. The title of the property described above is clear, marketable, and free from all encumbrances and doubts.</p>
//             <p>4. I/We confirm that I/we have no objection to the said purchasers mortgaging the said property to <strong>${data.bankName}</strong> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank, subject to the terms and conditions of the sale document.</p>
//             <p>5. I/We have not borrowed from any financial institution for the purchase/development of the property and have not created, nor will create, any encumbrances on the property allotted to the said purchasers during the currency of the loan sanctioned by the Bank.</p>
//             <p>6. After creation of proper charge/mortgage and receipt of copies thereof, and after proper nomination in favor of the Bank from the said purchasers, we agree to accept <strong>${data.bankName}</strong> as a nominee of the above-named purchaser for the property described above. Once the nomination is registered and advice is sent to the Bank, I/We will not change it without the written NOC of the Bank.</p>
//             <p>7. After creation of charge/mortgage and receipt of copies thereof, and after proper nomination in favor of the Bank, I/We undertake to inform the society about the Bank’s charge on the said flat as and when the society is formed.</p>
//             <p>8. Payment for this transaction should be made by crossed cheque/transfer of funds favoring “<strong>${data.favoringName}</strong>, <strong>${data.receiverBankName}</strong>, <strong>${data.branchName}</strong> Branch, Account No. <strong>${data.accountNo}</strong>, IFSC: <strong>${data.ifsc}</strong>”.</p>
//             <p>9. Company/firm vide ____________________ (description of document of delegation of authority to the signatory).</p>
//             <p style="margin-top: 30px;">Yours faithfully,</p>
//             <p style="margin-top: 60px;">Authorized Signatory</p>
//             <p>Name: ____________________</p>
//             <p>Place: ____________________</p>
//             <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
//           </div>
//         </div>
        
//         <div class="footer">
//           <p>Generated by AG Construction System</p>
//           <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
//         </div>
//       </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({
//         html,
//         base64: false,
//       });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, {
//           mimeType: 'application/pdf',
//           dialogTitle: `NOC_Letter_${data.customerName}.pdf`,
//           UTI: 'public.pdf',
//         });
//         Alert.alert('Success', 'PDF generated and ready to share!');
//       } else {
//         Alert.alert('Error', 'Sharing is not available on this device.');
//       }
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       Alert.alert('Error', 'Failed to generate PDF. Please try again.');
//     }
//   };

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 2,
//     }).format(amount);

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString('en-IN') : 'N/A';

//   const formFields = [
//     { label: 'Bank Name', key: 'bankName', required: true },
//     { label: 'Address', key: 'address', required: true, multiline: true },
//     { label: 'Customer Name', key: 'customerName', required: true },
//     { label: 'Agreement Date', key: 'agreementDate', type: 'date', required: true },
//     { label: 'Flat No.', key: 'flatNo', required: true },
//     { label: 'Building No.', key: 'buildingNo', required: true },
//     { label: 'Street No.', key: 'streetNo', required: true },
//     { label: 'Locality Name', key: 'localityName', required: true },
//     { label: 'Area Name', key: 'areaName', required: true },
//     { label: 'Pincode', key: 'pincode', required: true, keyboardType: 'numeric' },
//     { label: 'City', key: 'city', required: true },
//     { label: 'Transaction Amount (₹)', key: 'transactionAmount', required: true, keyboardType: 'numeric' },
//     { label: 'Favouring Name', key: 'favoringName', required: true },
//     { label: 'Receiver Bank Name', key: 'receiverBankName', required: true },
//     { label: 'Branch Name', key: 'branchName', required: true },
//     { label: 'Account No.', key: 'accountNo', required: true },
//     { label: 'IFSC Code', key: 'ifsc', required: true },
//   ];

//   const renderInput = (field, index) => (
//     <View key={index} style={styles.inputGroup}>
//       <Text style={styles.label}>{field.label}{field.required && <Text style={styles.required}>*</Text>}</Text>
//       <BlurView intensity={40} style={styles.blurContainer}>
//         <TextInput
//           style={[styles.input, field.multiline && styles.multilineInput]}
//           placeholder={field.label}
//           value={formData[field.key]}
//           onChangeText={(text) => handleChange(field.key, text)}
//           keyboardType={field.keyboardType || 'default'}
//           placeholderTextColor="#999"
//           editable={!isSubmitting}
//           multiline={field.multiline}
//           textAlignVertical={field.multiline ? 'top' : 'center'}
//         />
//       </BlurView>
//     </View>
//   );

//   const renderDateField = (field) => (
//     <View key={field.key} style={styles.inputGroup}>
//       <Text style={styles.label}>{field.label}{field.required && <Text style={styles.required}>*</Text>}</Text>
//       <BlurView intensity={40} style={styles.blurContainer}>
//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowDatePicker(true)}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.dateText}>{formatDate(formData[field.key])}</Text>
//         </TouchableOpacity>
//       </BlurView>
//       {showDatePicker && (
//         <DateTimePicker
//           value={formData[field.key]}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) {
//               setFormData({ ...formData, [field.key]: selectedDate });
//             }
//           }}
//         />
//       )}
//     </View>
//   );

//   const renderFormView = () => (
//     <ScrollView
//       style={styles.formScrollView}
//       contentContainerStyle={styles.formScrollViewContent}
//       showsVerticalScrollIndicator={true}
//     >
//       <View style={styles.formContainer}>
//         <Text style={styles.formTitle}>AG Construction NOC Letter Form</Text>
//         {formFields.map((field, index) =>
//           field.type === 'date' ? renderDateField(field) : renderInput(field, index)
//         )}
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <LinearGradient
//             colors={['#6A5ACD', '#483D8B', '#191970']}
//             style={styles.submitButtonGradient}
//           >
//             <Text style={styles.submitButtonText}>
//               {isSubmitting ? 'Generating...' : (editId ? 'Update NOC Letter' : 'Generate NOC Letter')}
//             </Text>
//             <Feather name="send" size={24} color="#fff" />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );

//   const renderLetterItem = ({ item }) => (
//     <View style={styles.letterCard}>
//       <View style={styles.cardHeader}>
//         <View style={styles.avatarContainer}>
//           <Text style={styles.avatarText}>{item.customerName}</Text>
//         </View>
//         <View style={styles.cardHeaderContent}>
//           <Text style={styles.cardName}>{item.customerName}</Text>
//           <Text style={styles.cardPosition}>{item.bankName}</Text>
//         </View>
//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.showButton]}
//             onPress={() => setSelectedLetter(item)}
//           >
//             <Feather name="eye" size={18} color="#6A5ACD" />
//             <Text style={styles.actionButtonText}>Show</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.editButton]}
//             onPress={() => handleEditLetter(item)}
//           >
//             <Feather name="edit" size={18} color="#3b82f6" />
//             <Text style={styles.actionButtonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.deleteButton]}
//             onPress={() => handleDeleteLetter(item.id)}
//           >
//             <Feather name="trash-2" size={18} color="#ef4444" />
//             <Text style={styles.actionButtonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.cardDetails}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>Flat No: {item.flatNo}</Text>
//           <Text style={styles.detailText}>City: {item.city}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>Date: {formatDate(item.agreementDate)}</Text>
//           <Text style={styles.detailText}>A/C No: {item.accountNo}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>Amount: {formatCurrency(item.transactionAmount)}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   const renderListView = () => (
//     <View style={styles.tableContainer}>
//       <Text style={styles.listTitle}>All NOC Letters</Text>
//       <FlatList
//         data={nocLetters}
//         renderItem={renderLetterItem}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Feather name="file-text" size={60} color="#d1d5db" />
//             <Text style={styles.emptyTitle}>No NOC letters found</Text>
//             <Text style={styles.emptyText}>Create a new NOC letter to get started</Text>
//           </View>
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchNocLetters}
//             colors={['#6A5ACD']}
//             tintColor="#6A5ACD"
//           />
//         }
//         style={styles.flatList}
//         contentContainerStyle={styles.flatListContent}
//       />
//     </View>
//   );

//   const renderLetterView = () => (
//     <View style={styles.letterContainer}>
//       <ScrollView
//         style={styles.letterScroll}
//         contentContainerStyle={styles.letterScrollContent}
//         showsVerticalScrollIndicator={true}
//       >
//         <View style={styles.letterContent}>
//           <View style={styles.companyContainer}>
//             <View style={styles.logoContainer}>
//               <Image source={logo} style={styles.companyLogo} resizeMode="contain" />
//             </View>
//             <View style={styles.companyDetails}>
//               <Text style={styles.companyName}>AG Construction</Text>
//               <View style={styles.addressContainer}>
//                 <Text style={styles.addressText}>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</Text>
//                 <Text style={styles.addressText}>Hudkeshwar Road, Nagpur - 440034</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}>📧</Text>
//                 </View>
//                 <Text style={styles.contactText}>agconstructions220@gmail.com</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}>🌐</Text>
//                 </View>
//                 <Text style={styles.contactText}>www.agconstructionnagpur.in</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}>📞</Text>
//                 </View>
//                 <Text style={styles.contactText}>+91 7620 419 075</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.separator} />

//           <Text style={styles.letterTitle}>No Objection Certificate</Text>

//           <View style={styles.recipientInfo}>
//             <View>
//               <Text style={styles.infoText}>The Assistant General Manager</Text>
//               <Text style={styles.infoText}>{selectedLetter.bankName}</Text>
//               <Text style={styles.infoText}>{selectedLetter.city}</Text>
//             </View>
//             <Text style={styles.infoText}>Date: {new Date().toLocaleDateString('en-IN')}</Text>
//           </View>

//           <View style={styles.letterContentInner}>
//             <Text style={styles.infoText}>
//               <Text style={styles.boldText}>TO,</Text>
//             </Text>
//             <Text style={styles.infoText}>
//               I/We, <Text style={styles.boldText}>{selectedLetter.customerName}</Text>, hereby certify that:
//             </Text>
//             <Text style={styles.infoText}>
//               1. I/We have transferable rights to the property described below, allotted to Mr. <Text style={styles.boldText}>{selectedLetter.customerName}</Text>, hereinafter referred to as “the purchasers”, subject to the terms and conditions of the Allotment Letter/Sale Agreement dated <Text style={styles.boldText}>{formatDate(selectedLetter.agreementDate)}</Text> (hereinafter referred to as the “Sale document”).
//             </Text>
            
//             <Text style={styles.sectionTitle}>Description of the Property</Text>
//             <View style={styles.table}>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>Flat No./House No.</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.flatNo}</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>Building No./Name</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.buildingNo}</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>Street No./Name</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.streetNo}</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>Locality Name</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.localityName}</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>Area Name</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.areaName}</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>City Name</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.city}</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>Pin Code</Text>
//                 <Text style={styles.tableCellRight}>{selectedLetter.pincode}</Text>
//               </View>
//             </View>
            
//             <Text style={styles.infoText}>
//               2. The total consideration for this transaction is <Text style={styles.boldText}>{formatCurrency(selectedLetter.transactionAmount)}</Text> (<Text style={styles.boldText}>{selectedLetter.transactionAmountWords}</Text>) towards the sale document.
//             </Text>
//             <Text style={styles.infoText}>
//               3. The title of the property described above is clear, marketable, and free from all encumbrances and doubts.
//             </Text>
//             <Text style={styles.infoText}>
//               4. I/We confirm that I/we have no objection to the said purchasers mortgaging the said property to <Text style={styles.boldText}>{selectedLetter.bankName}</Text> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank, subject to the terms and conditions of the sale document.
//             </Text>
//             <Text style={styles.infoText}>
//               5. I/We have not borrowed from any financial institution for the purchase/development of the property and have not created, nor will create, any encumbrances on the property allotted to the said purchasers during the currency of the loan sanctioned by the Bank.
//             </Text>
//             <Text style={styles.infoText}>
//               6. After creation of proper charge/mortgage and receipt of copies thereof, and after proper nomination in favor of the Bank from the said purchasers, we agree to accept <Text style={styles.boldText}>{selectedLetter.bankName}</Text> as a nominee of the above-named purchaser for the property described above. Once the nomination is registered and advice is sent to the Bank, I/We will not change it without the written NOC of the Bank.
//             </Text>
//             <Text style={styles.infoText}>
//               7. After creation of charge/mortgage and receipt of copies thereof, and after proper nomination in favor of the Bank, I/We undertake to inform the society about the Bank’s charge on the said flat as and when the society is formed.
//             </Text>
//             <Text style={styles.infoText}>
//               8. Payment for this transaction should be made by crossed cheque/transfer of funds favoring “<Text style={styles.boldText}>{selectedLetter.favoringName}</Text>, <Text style={styles.boldText}>{selectedLetter.receiverBankName}</Text>, <Text style={styles.boldText}>{selectedLetter.branchName}</Text> Branch, Account No. <Text style={styles.boldText}>{selectedLetter.accountNo}</Text>, IFSC: <Text style={styles.boldText}>{selectedLetter.ifsc}</Text>”.
//             </Text>
//             <Text style={styles.infoText}>
//               9. Company/firm vide ____________________ (description of document of delegation of authority to the signatory).
//             </Text>
//             <Text style={[styles.infoText, { marginTop: 30 }]}>Yours faithfully,</Text>
//             <Text style={[styles.infoText, { marginTop: 60 }]}>Authorized Signatory</Text>
//             <Text style={styles.infoText}>Name: ____________________</Text>
//             <Text style={styles.infoText}>Place: ____________________</Text>
//             <Text style={styles.infoText}>Date: {new Date().toLocaleDateString('en-IN')}</Text>
//           </View>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Generated by AG Construction System</Text>
//             <Text style={styles.footerText}>Date: {new Date().toLocaleDateString('en-IN')}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.downloadButton}
//         onPress={() => generatePDF(selectedLetter)}
//       >
//         <LinearGradient
//           colors={['#6A5ACD', '#483D8B', '#191970']}
//           style={styles.downloadButtonGradient}
//         >
//           <Feather name="download" size={20} color="#fff" style={styles.downloadIcon} />
//           <Text style={styles.downloadButtonText}>Download PDF</Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
//   );

//   const closeLetterView = () => {
//     setSelectedLetter(null);
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={['#6A5ACD', '#483D8B', '#191970']} style={styles.gradient}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.keyboardView}
//         >
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <Feather name="arrow-left" size={30} color="white" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>NOC Letter</Text>
//             <View style={styles.spacer} />
//           </View>

//           {!selectedLetter && (
//             <View style={styles.tabContainer}>
//               <TouchableOpacity
//                 style={[styles.tabButton, activeTab === 'form' && styles.activeTabButton]}
//                 onPress={() => setActiveTab('form')}
//                 disabled={isSubmitting}
//               >
//                 <Feather
//                   name="edit-3"
//                   size={18}
//                   color={activeTab === 'form' ? '#6A5ACD' : '#6b7280'}
//                 />
//                 <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
//                   {editId ? 'Edit Letter' : 'New Letter'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
//                 onPress={() => setActiveTab('list')}
//                 disabled={isSubmitting}
//               >
//                 <Feather
//                   name="list"
//                   size={18}
//                   color={activeTab === 'list' ? '#6A5ACD' : '#6b7280'}
//                 />
//                 <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
//                   All Letters
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           <View style={styles.contentContainer}>
//             <BlurView intensity={20} style={styles.cardBlur}>
//               <View style={styles.card}>
//                 {selectedLetter ? (
//                   renderLetterView()
//                 ) : activeTab === 'form' ? (
//                   renderFormView()
//                 ) : (
//                   renderListView()
//                 )}
//               </View>
//             </BlurView>
//           </View>

//           {selectedLetter && (
//             <TouchableOpacity style={styles.closeButton} onPress={closeLetterView}>
//               <Feather name="x" size={24} color="#6A5ACD" />
//             </TouchableOpacity>
//           )}
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: Platform.OS === 'ios' ? 50 : 30,
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   backButton: {
//     padding: 5,
//   },
//   spacer: {
//     width: 40,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     marginHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   tabButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   activeTabButton: {
//     backgroundColor: 'rgba(106, 90, 205, 0.1)',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#6b7280',
//     marginLeft: 8,
//   },
//   activeTabText: {
//     color: '#6A5ACD',
//     fontWeight: '600',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   cardBlur: {
//     flex: 1,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 25,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   formScrollView: {
//     flex: 1,
//   },
//   formScrollViewContent: {
//     paddingBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   formTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#483D8B',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#483D8B',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   required: {
//     color: '#ef4444',
//   },
//   blurContainer: {
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   input: {
//     backgroundColor: 'rgba(248,249,250,0.7)',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     fontSize: 16,
//     color: '#333',
//   },
//   multilineInput: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//   },
//   submitButton: {
//     marginTop: 20,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   submitButtonGradient: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//     marginRight: 10,
//   },
//   tableContainer: {
//     flex: 1,
//   },
//   listTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#483D8B',
//     marginBottom: 15,
//   },
//   flatList: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   letterCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginBottom: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   avatarContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#6A5ACD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   cardHeaderContent: {
//     flex: 1,
//   },
//   cardName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 2,
//   },
//   cardPosition: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   showButton: {
//     backgroundColor: 'rgba(106, 90, 205, 0.1)',
//   },
//   editButton: {
//     backgroundColor: 'rgba(59, 130, 246, 0.1)',
//   },
//   deleteButton: {
//     backgroundColor: 'rgba(239, 68, 68, 0.1)',
//   },
//   actionButtonText: {
//     fontSize: 10,
//     marginTop: 2,
//     color: '#4b5563',
//   },
//   cardDetails: {
//     backgroundColor: '#f9fafb',
//     borderRadius: 12,
//     padding: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#4b5563',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 40,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     marginTop: 20,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#4b5563',
//     marginTop: 16,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#9ca3af',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   letterContainer: {
//     flex: 1,
//   },
//   letterScroll: {
//     flex: 1,
//   },
//   letterScrollContent: {
//     paddingBottom: 20,
//   },
//   letterContent: {
//     padding: 20,
//   },
//   companyContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 15,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   logoContainer: {
//     marginRight: 15,
//   },
//   companyLogo: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   companyDetails: {
//     flex: 1,
//   },
//   companyName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   addressContainer: {
//     marginBottom: 10,
//   },
//   addressText: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 2,
//     lineHeight: 14,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   iconContainer: {
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   icon: {
//     fontSize: 14,
//   },
//   contactText: {
//     fontSize: 12,
//     color: '#666',
//   },
//   separator: {
//     height: 2,
//     backgroundColor: '#333',
//     marginVertical: 10,
//   },
//   letterTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//     marginVertical: 10,
//   },
//   recipientInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   letterContentInner: {
//     backgroundColor: '#f9fafb',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 8,
//     lineHeight: 18,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#483D8B',
//     marginBottom: 10,
//     textAlign: 'center',
//     paddingBottom: 5,
//     borderBottomWidth: 2,
//     borderBottomColor: '#483D8B',
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     marginBottom: 20,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   tableCell: {
//     fontSize: 13,
//     color: '#4b5563',
//     flex: 1,
//   },
//   tableCellRight: {
//     fontSize: 13,
//     color: '#4b5563',
//     flex: 1,
//     textAlign: 'right',
//   },
//   footer: {
//     alignItems: 'center',
//     marginTop: 20,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb',
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   downloadButton: {
//     margin: 20,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   downloadButtonGradient: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   downloadIcon: {
//     marginRight: 10,
//   },
//   downloadButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 80,
//     right: 30,
//     zIndex: 1000,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 20,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
// });

// export default Noc_Letter;








// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { ag } from "@/assets/images/ag.js";
// import logo from '@/assets/images/agconstruction-1.png';
// import { Feather } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // Custom numberToWords function
// const numberToWords = (num) => {
//   const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//   const thousands = ['', 'Thousand', 'Million', 'Billion'];

//   if (num === 0) return 'Zero';

//   const convertLessThanThousand = (n) => {
//     if (n === 0) return '';
//     if (n < 10) return units[n];
//     if (n < 20) return teens[n - 10];
//     if (n < 100) {
//       return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + units[n % 10] : ''}`;
//     }
//     return `${units[Math.floor(n / 100)]} Hundred${n % 100 ? ' ' + convertLessThanThousand(n % 100) : ''}`;
//   };

//   let word = '';
//   let thousandIndex = 0;

//   while (num > 0) {
//     const chunk = num % 1000;
//     if (chunk) {
//       word = `${convertLessThanThousand(chunk)} ${thousands[thousandIndex]}${word ? ' ' + word : ''}`;
//     }
//     num = Math.floor(num / 1000);
//     thousandIndex++;
//   }

//   return word.trim();
// };

// const getAuthHeaders = async () => {
//   const token = await AsyncStorage.getItem('jwtToken');
//   if (!token) {
//     throw new Error('No authentication token found');
//   }
//   return { Authorization: `Bearer ${token}` };
// };

// const Noc_Letter = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     bankName: '',
//     address: '',
//     blank: '',
//     customerName: '',
//     agreementDate: new Date(),
//     flatNo: '',
//     buildingNo: '',
//     streetNo: '',
//     localityName: '',
//     areaName: '',
//     pincode: '',
//     city: '',
//     transactionAmount: '',
//     transactionAmountWords: '',
//     favoringName: '',
//     receiverBankName: '',
//     branchName: '',
//     accountNo: '',
//     ifsc: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [nocLetters, setNocLetters] = useState([]);
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState('form');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (name, value) => {
//     let updatedFormData = { ...formData, [name]: value };
//     if (name === 'transactionAmount') {
//       const numericValue = value.replace(/,/g, '');
//       if (!isNaN(numericValue) && numericValue !== '') {
//         updatedFormData.transactionAmount = numericValue;
//         updatedFormData.transactionAmountWords = numberToWords(parseInt(numericValue)) + ' only';
//       } else {
//         updatedFormData.transactionAmount = '';
//         updatedFormData.transactionAmountWords = '';
//       }
//     }
//     setFormData(updatedFormData);
//   };

//   const fetchNocLetters = async () => {
//     try {
//       setRefreshing(true);
//       const headers = await getAuthHeaders();
//       const response = await axios.get(`${BASE_URL}/bankNoc`, { headers });
//       setNocLetters(response.data.sort((a, b) => b.id - a.id));
//     } catch (err) {
//       console.error('Failed to fetch NOC letters:', err);
//       Alert.alert('Error', 'Failed to load NOC letters.');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchNocLetters();
//   }, []);

//   const handleSubmit = async () => {
//     const requiredFields = [
//       'bankName',
//       'address',
//       'blank',
//       'customerName',
//       'flatNo',
//       'buildingNo',
//       'streetNo',
//       'localityName',
//       'areaName',
//       'pincode',
//       'city',
//       'transactionAmount',
//       'favoringName',
//       'receiverBankName',
//       'branchName',
//       'accountNo',
//       'ifsc',
//     ];
//     const isFormComplete = requiredFields.every(
//       (field) => formData[field] && formData[field].trim()
//     );

//     if (!isFormComplete) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     setIsSubmitting(true);
//     const payload = {
//       ...formData,
//       agreementDate: formData.agreementDate.toISOString().split('T')[0],
//       transactionAmount: parseFloat(formData.transactionAmount) || 0,
//     };

//     try {
//       const headers = await getAuthHeaders();
//       if (editId) {
//         await axios.put(`${BASE_URL}/bankNoc/${editId}`, payload, { headers });
//         Alert.alert('Success', 'NOC Letter updated successfully!');
//         setEditId(null);
//       } else {
//         await axios.post(`${BASE_URL}/createBankNoc`, payload, { headers });
//         Alert.alert('Success', 'NOC Letter successfully submitted!');
//       }

//       setFormData({
//         bankName: '',
//         address: '',
//         blank: '',
//         customerName: '',
//         agreementDate: new Date(),
//         flatNo: '',
//         buildingNo: '',
//         streetNo: '',
//         localityName: '',
//         areaName: '',
//         pincode: '',
//         city: '',
//         transactionAmount: '',
//         transactionAmountWords: '',
//         favoringName: '',
//         receiverBankName: '',
//         branchName: '',
//         accountNo: '',
//         ifsc: '',
//       });
//       fetchNocLetters();
//       setSelectedLetter(null);
//       setActiveTab('list');
//     } catch (err) {
//       console.error('Failed to submit/update NOC letter:', err);
//       Alert.alert('Error', 'Operation failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditLetter = (letter) => {
//     setEditId(letter.id);
//     setFormData({
//       bankName: letter.bankName || '',
//       address: letter.address || '',
//       blank: letter.blank || '',
//       customerName: letter.coustomername || '',
//       agreementDate: letter.aggrementDate ? new Date(letter.aggrementDate) : new Date(),
//       flatNo: letter.flatNo || '',
//       buildingNo: letter.buildingNo || '',
//       streetNo: letter.streetNo || '',
//       localityName: letter.localityName || '',
//       areaName: letter.areaName || '',
//       pincode: letter.pincode || '',
//       city: letter.city || '',
//       transactionAmount: letter.transactionAmount?.toString() || '',
//       transactionAmountWords: letter.transactionAmountWords || '',
//       favoringName: letter.facvoringName || '',
//       receiverBankName: letter.reciverBankName || '',
//       branchName: letter.branchName || '',
//       accountNo: letter.acNO || '',
//       ifsc: letter.ifsc || '',
//     });
//     setActiveTab('form');
//   };

//   const handleDeleteLetter = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this NOC letter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const headers = await getAuthHeaders();
//               await axios.delete(`${BASE_URL}/bankNoc/${id}`, { headers });
//               Alert.alert('Success', 'Deleted successfully');
//               fetchNocLetters();
//             } catch (error) {
//               console.error('Error deleting NOC letter:', error);
//               Alert.alert('Error', 'Failed to delete NOC letter');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const generatePDF = async (data) => {
//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           @page {
//             margin: 0.5in;
//             size: A4;
//           }
//           body {
//             font-family: 'Arial', sans-serif;
//             margin: 0;
//             padding: 40px;
//             color: #000;
//             line-height: 1.4;
//             font-size: 12px;
//           }
//           .company-container {
//             display: flex;
//             align-items: flex-start;
//             margin-bottom: 20px;
//             gap: 20px;
//           }
//           .company-logo-container {
//             flex-shrink: 0;
//           }
//           .company-logo {
//             height: 100px;
//             width: auto;
//           }
//           .company-details {
//             flex: 1;
//           }
//           .company-details h3 {
//             margin: 0 0 10px 0;
//             font-size: 14px;
//             font-weight: bold;
//             color: #000;
//           }
//           .detail-row {
//             display: flex;
//             align-items: center;
//             margin-bottom: 8px;
//           }
//           .icon-box {
//             width: 25px;
//             height: 25px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin-right: 8px;
//           }
//           .detail-text {
//             margin: 0;
//             font-size: 12px;
//             color: #000;
//           }
//           .line-thick {
//             border: none;
//             height: 2px;
//             background-color: #000;
//             margin: 20px 0;
//           }
//           .recipient-info {
//             margin-bottom: 20px;
//           }
//           .recipient-info p {
//             margin: 5px 0 5px 40px;
//             font-size: 12px;
//           }
//           .letter-content {
//             margin-bottom: 20px;
//           }
//           .letter-content p {
//             margin: 10px 40px;
//             font-size: 12px;
//             line-height: 1.6;
//           }
//           .letter-content strong {
//             font-weight: bold;
//           }
//           .date-right {
//             text-align: right;
//             margin-right: 150px;
//             margin-top: 25px;
//             font-size: 12px;
//           }
//           @media print {
//             body {
//               -webkit-print-color-adjust: exact;
//               print-color-adjust: exact;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="company-container">
//           <div class="company-logo-container">
//             <img class="company-logo" src="${ag}" alt="AG Construction Logo">
//           </div>
//           <div class="company-details">
//             <h3>Address</h3>
//             <div class="detail-row">
//               <div class="detail-text">
//                 <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</p>
//                 <p>Hudkeshwar Road, Nagpur - 440034</p>
//               </div>
//             </div>
//             <div class="detail-row">
//               <div class="icon-box">
//                 <span style="font-size: 16px;">📧</span>
//               </div>
//               <p class="detail-text">agconstructions220@gmail.com</p>
//             </div>
//             <div class="detail-row">
//               <div class="icon-box">
//                 <span style="font-size: 16px;">🌐</span>
//               </div>
//               <p class="detail-text">www.agconstructionnagpur.in</p>
//             </div>
//             <div class="detail-row">
//               <div class="icon-box">
//                 <span style="font-size: 16px;">📞</span>
//               </div>
//               <p class="detail-text">+91 7620 419 075</p>
//             </div>
//           </div>
//         </div>
        
//         <hr class="line-thick">
        
//         <p class="date-right">Date: ${new Date().toLocaleDateString('en-GB')}</p>
        
//         <div class="recipient-info">
//           <p>The Assistant General Manager</p>
//           <p>${data.bankName}</p>
//           <p>${data.city}</p>
//         </div>
        
//         <div class="letter-content">
//           <p>TO,</p>
//           <p>I/We, <strong>${data.customerName}</strong>, hereby certify that:</p>
//           <p>1. I/We have transferable rights to the property described below, which has been allotted by me/us to Mr. <strong>${data.customerName}</strong>, hereinafter referred to as “the purchasers”, subject to the due and proper performance and compliances of all the terms and conditions of the Allotment Letter/Sale Agreement dated <strong>${new Date(data.agreementDate).toLocaleDateString('en-GB')}</strong> (hereinafter referred to as the “Sale document”).</p>
          
//           <p style="margin-top: 20px;"><strong>Description of the property:</strong></p>
//           <p>Flat No./House No. ${data.flatNo}</p>
//           <p>Building No./Name: ${data.buildingNo}</p>
//           <p>Street No./Name: ${data.streetNo}</p>
//           <p>Locality Name: ${data.localityName}</p>
//           <p>Area Name: ${data.areaName}</p>
//           <p>City Name: ${data.city}</p>
//           <p>Pin Code: ${data.pincode}</p>
          
//           <p>2. The total consideration for this transaction is Rs. ${data.transactionAmount}/- (<strong>${data.transactionAmountWords}</strong>) towards sale document.</p>
//           <p>3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.</p>
//           <p>4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs, charges, risks and consequences mortgaging the said property to <strong>${data.bankName}</strong> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.</p>
//           <p>5. We have not borrowed from any financial institution for the purchase/development of the property and have not created and will not create any encumbrances on the property allotted to the said purchasers during the currency of the loan sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.</p>
//           <p style="margin-top: 50px;">6. After creation of proper charge/mortgage and after receipt of the copies thereof and after receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable to accept <strong>${data.bankName}</strong> as a nominee of the above named purchaser for the property described above and once the nomination favoring the Bank has been registered and advice sent to the Bank of having done so, I/We agree not to change the same without the written NOC of the Bank.</p>
//           <p>7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake to inform the society about the Bank’s charge on the said flat as and when the society is formed.</p>
//           <p>8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “<strong>${data.favoringName}</strong>, <strong>${data.receiverBankName}</strong>, <strong>${data.branchName}</strong> Branch, Account No. <strong>${data.accountNo}</strong>, IFSC: <strong>${data.ifsc}</strong>”.</p>
//           <p style="margin-top: 20px;">company/firm vide ____________________ (description of document of delegation of authority to the signatory).</p>
//           <p style="margin-top: 60px;">Yours faithfully,</p>
//           <p style="margin-top: 90px;">Authorized Signatory</p>
//           <p>Name: ____________________</p>
//           <p>Place: ____________________</p>
//           <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
//         </div>
//       </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({
//         html,
//         base64: false,
//       });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, {
//           mimeType: 'application/pdf',
//           dialogTitle: `NOC_Letter_${data.customerName}.pdf`,
//           UTI: 'public.pdf',
//         });
//         Alert.alert('Success', 'PDF generated and ready to share!');
//       } else {
//         Alert.alert('Error', 'Sharing is not available on this device.');
//       }
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       Alert.alert('Error', 'Failed to generate PDF. Please try again.');
//     }
//   };

//   const formatDate = (date) =>
//     date ? new Date(date).toLocaleDateString('en-GB') : 'N/A';

//   const formFields = [
//     { label: 'Bank Name', key: 'bankName', required: true },
//     { label: 'Address', key: 'address', required: true, multiline: true },
//     { label: 'Blank', key: 'blank', required: true },
//     { label: 'Customer Name', key: 'customerName', required: true },
//     { label: 'Agreement Date', key: 'agreementDate', type: 'date', required: true },
//     { label: 'Flat No.', key: 'flatNo', required: true },
//     { label: 'Building No.', key: 'buildingNo', required: true },
//     { label: 'Street No.', key: 'streetNo', required: true },
//     { label: 'Locality Name', key: 'localityName', required: true },
//     { label: 'Area Name', key: 'areaName', required: true },
//     { label: 'Pincode', key: 'pincode', required: true, keyboardType: 'numeric' },
//     { label: 'City', key: 'city', required: true },
//     { label: 'Transaction Amount (₹)', key: 'transactionAmount', required: true, keyboardType: 'numeric' },
//     { label: 'Favouring Name', key: 'favoringName', required: true },
//     { label: 'Receiver Bank Name', key: 'receiverBankName', required: true },
//     { label: 'Branch Name', key: 'branchName', required: true },
//     { label: 'Account No.', key: 'accountNo', required: true },
//     { label: 'IFSC Code', key: 'ifsc', required: true },
//   ];

//   const renderInput = (field, index) => (
//     <View key={index} style={styles.inputGroup}>
//       <Text style={styles.label}>{field.label}{field.required && <Text style={styles.required}>*</Text>}</Text>
//       <BlurView intensity={40} style={styles.blurContainer}>
//         <TextInput
//           style={[styles.input, field.multiline && styles.multilineInput]}
//           placeholder={field.label}
//           value={formData[field.key]}
//           onChangeText={(text) => handleChange(field.key, text)}
//           keyboardType={field.keyboardType || 'default'}
//           placeholderTextColor="#999"
//           editable={!isSubmitting}
//           multiline={field.multiline}
//           textAlignVertical={field.multiline ? 'top' : 'center'}
//         />
//       </BlurView>
//     </View>
//   );

//   const renderDateField = (field) => (
//     <View key={field.key} style={styles.inputGroup}>
//       <Text style={styles.label}>{field.label}{field.required && <Text style={styles.required}>*</Text>}</Text>
//       <BlurView intensity={40} style={styles.blurContainer}>
//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowDatePicker(true)}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.dateText}>{formatDate(formData[field.key])}</Text>
//         </TouchableOpacity>
//       </BlurView>
//       {showDatePicker && (
//         <DateTimePicker
//           value={formData[field.key]}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) {
//               setFormData({ ...formData, [field.key]: selectedDate });
//             }
//           }}
//         />
//       )}
//     </View>
//   );

//   const renderFormView = () => (
//     <ScrollView
//       style={styles.formScrollView}
//       contentContainerStyle={styles.formScrollViewContent}
//       showsVerticalScrollIndicator={true}
//     >
//       <View style={styles.formContainer}>
//         <Text style={styles.formTitle}>NOC Form</Text>
//         {formFields.map((field, index) =>
//           field.type === 'date' ? renderDateField(field) : renderInput(field, index)
//         )}
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <LinearGradient
//             colors={['#6A5ACD', '#483D8B', '#191970']}
//             style={styles.submitButtonGradient}
//           >
//             <Text style={styles.submitButtonText}>
//               {isSubmitting ? 'Submitting...' : (editId ? 'Update' : 'Submit')}
//             </Text>
//             <Feather name="send" size={24} color="#fff" />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );

//   const renderLetterItem = ({ item }) => (
//     <View style={styles.letterCard}>
//       <View style={styles.cardHeader}>
//         <View style={styles.cardHeaderContent}>
//           <Text style={styles.cardName}>{item.coustomername}</Text>
//           <Text style={styles.cardPosition}>{item.bankName}</Text>
//         </View>
//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.viewButton]}
//             onPress={() => setSelectedLetter(item)}
//           >
//             <Feather name="eye" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>View</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.editButton]}
//             onPress={() => handleEditLetter(item)}
//           >
//             <Feather name="edit" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.deleteButton]}
//             onPress={() => handleDeleteLetter(item.id)}
//           >
//             <Feather name="trash-2" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.cardDetails}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>Account No: {item.acNO}</Text>
//           <Text style={styles.detailText}>Branch: {item.branchName}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>IFSC: {item.ifsc}</Text>
//           <Text style={styles.detailText}>City: {item.city}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>Amount: Rs. {item.transactionAmount}/-</Text>
//           <Text style={styles.detailText}>Pincode: {item.pincode}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   const renderListView = () => (
//     <View style={styles.tableContainer}>
//       <Text style={styles.listTitle}>All NOC Letters</Text>
//       <FlatList
//         data={nocLetters}
//         renderItem={renderLetterItem}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Feather name="file-text" size={60} color="#d1d5db" />
//             <Text style={styles.emptyTitle}>No NOC letters found</Text>
//             <Text style={styles.emptyText}>Create a new NOC letter to get started</Text>
//           </View>
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchNocLetters}
//             colors={['#4CAF50']}
//             tintColor="#4CAF50"
//           />
//         }
//         style={styles.flatList}
//         contentContainerStyle={styles.flatListContent}
//       />
//     </View>
//   );

//   const renderLetterView = () => (
//     <View style={styles.letterContainer}>
//       <ScrollView
//         style={styles.letterScroll}
//         contentContainerStyle={styles.letterScrollContent}
//         showsVerticalScrollIndicator={true}
//       >
//         <View style={styles.letterContent}>
//           <View style={styles.companyContainer}>
//             <View style={styles.logoContainer}>
//               <Image source={logo} style={styles.companyLogo} resizeMode="contain" />
//             </View>
//             <View style={styles.companyDetails}>
//               <Text style={styles.companyName}>Address</Text>
//               <View style={styles.addressContainer}>
//                 <Text style={styles.addressText}>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</Text>
//                 <Text style={styles.addressText}>Hudkeshwar Road, Nagpur - 440034</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}>📧</Text>
//                 </View>
//                 <Text style={styles.contactText}>agconstructions220@gmail.com</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}>🌐</Text>
//                 </View>
//                 <Text style={styles.contactText}>www.agconstructionnagpur.in</Text>
//               </View>
//               <View style={styles.contactRow}>
//                 <View style={styles.iconContainer}>
//                   <Text style={styles.icon}>📞</Text>
//                 </View>
//                 <Text style={styles.contactText}>+91 7620 419 075</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.separator} />

//           <Text style={styles.dateRight}>Date: {new Date().toLocaleDateString('en-GB')}</Text>

//           <View style={styles.recipientInfo}>
//             <Text style={styles.infoText}>The Assistant General Manager</Text>
//             <Text style={styles.infoText}>{selectedLetter.bankName}</Text>
//             <Text style={styles.infoText}>{selectedLetter.city}</Text>
//           </View>

//           <View style={styles.letterContentInner}>
//             <Text style={styles.infoText}>TO,</Text>
//             <Text style={styles.infoText}>
//               I/We, <Text style={styles.boldText}>{selectedLetter.coustomername}</Text>, hereby certify that:
//             </Text>
//             <Text style={styles.infoText}>
//               1. I/We have transferable rights to the property described below, which has been allotted by me/us to Mr. <Text style={styles.boldText}>{selectedLetter.coustomername}</Text>, hereinafter referred to as “the purchasers”, subject to the due and proper performance and compliances of all the terms and conditions of the Allotment Letter/Sale Agreement dated <Text style={styles.boldText}>{formatDate(selectedLetter.aggrementDate)}</Text> (hereinafter referred to as the “Sale document”).
//             </Text>
//             <Text style={[styles.infoText, { marginTop: 20 }]}>
//               <Text style={styles.boldText}>Description of the property:</Text>
//             </Text>
//             <Text style={styles.infoText}>Flat No./House No. {selectedLetter.flatNo}</Text>
//             <Text style={styles.infoText}>Building No./Name: {selectedLetter.buildingNo}</Text>
//             <Text style={styles.infoText}>Street No./Name: {selectedLetter.streetNo}</Text>
//             <Text style={styles.infoText}>Locality Name: {selectedLetter.localityName}</Text>
//             <Text style={styles.infoText}>Area Name: {selectedLetter.areaName}</Text>
//             <Text style={styles.infoText}>City Name: {selectedLetter.city}</Text>
//             <Text style={styles.infoText}>Pin Code: {selectedLetter.pincode}</Text>
//             <Text style={styles.infoText}>
//               2. The total consideration for this transaction is Rs. {selectedLetter.transactionAmount}/- (<Text style={styles.boldText}>{selectedLetter.transactionAmountWords}</Text>) towards sale document.
//             </Text>
//             <Text style={styles.infoText}>
//               3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.
//             </Text>
//             <Text style={styles.infoText}>
//               4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs, charges, risks and consequences mortgaging the said property to <Text style={styles.boldText}>{selectedLetter.bankName}</Text> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.
//             </Text>
//             <Text style={styles.infoText}>
//               5. We have not borrowed from any financial institution for the purchase/development of the property and have not created and will not create any encumbrances on the property allotted to the said purchasers during the currency of the loan sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.
//             </Text>
//             <Text style={[styles.infoText, { marginTop: 50 }]}>
//               6. After creation of proper charge/mortgage and after receipt of the copies thereof and after receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable to accept <Text style={styles.boldText}>{selectedLetter.bankName}</Text> as a nominee of the above named purchaser for the property described above and once the nomination favoring the Bank has been registered and advice sent to the Bank of having done so, I/We agree not to change the same without the written NOC of the Bank.
//             </Text>
//             <Text style={styles.infoText}>
//               7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake to inform the society about the Bank’s charge on the said flat as and when the society is formed.
//             </Text>
//             <Text style={styles.infoText}>
//               8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “<Text style={styles.boldText}>{selectedLetter.favoringName}</Text>, <Text style={styles.boldText}>{selectedLetter.receiverBankName}</Text>, <Text style={styles.boldText}>{selectedLetter.branchName}</Text> Branch, Account No. <Text style={styles.boldText}>{selectedLetter.accountNo}</Text>, IFSC: <Text style={styles.boldText}>{selectedLetter.ifsc}</Text>”.
//             </Text>
//             <Text style={[styles.infoText, { marginTop: 20 }]}>
//               company/firm vide ____________________ (description of document of delegation of authority to the signatory).
//             </Text>
//             <Text style={[styles.infoText, { marginTop: 60 }]}>Yours faithfully,</Text>
//             <Text style={[styles.infoText, { marginTop: 90 }]}>Authorized Signatory</Text>
//             <Text style={styles.infoText}>Name: ____________________</Text>
//             <Text style={styles.infoText}>Place: ____________________</Text>
//             <Text style={styles.infoText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.downloadButton, styles.downloadButtonGradient]}
//           onPress={() => generatePDF(selectedLetter)}
//         >
//           <Feather name="download" size={20} color="#fff" style={styles.downloadIcon} />
//           <Text style={styles.downloadButtonText}>Download</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.downloadButton, styles.closeButtonGradient]}
//           onPress={() => setSelectedLetter(null)}
//         >
//           <Feather name="x" size={20} color="#fff" style={styles.downloadIcon} />
//           <Text style={styles.downloadButtonText}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={['#6A5ACD', '#483D8B', '#191970']} style={styles.gradient}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.keyboardView}
//         >
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//               <Feather name="arrow-left" size={30} color="white" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>NOC Letter</Text>
//             <View style={styles.spacer} />
//           </View>

//           {!selectedLetter && (
//             <View style={styles.tabContainer}>
//               <TouchableOpacity
//                 style={[styles.tabButton, activeTab === 'form' && styles.activeTabButton]}
//                 onPress={() => setActiveTab('form')}
//                 disabled={isSubmitting}
//               >
//                 <Feather
//                   name="edit-3"
//                   size={18}
//                   color={activeTab === 'form' ? '#4CAF50' : '#6b7280'}
//                 />
//                 <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
//                   {editId ? 'Edit Letter' : 'New Letter'}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
//                 onPress={() => setActiveTab('list')}
//                 disabled={isSubmitting}
//               >
//                 <Feather
//                   name="list"
//                   size={18}
//                   color={activeTab === 'list' ? '#4CAF50' : '#6b7280'}
//                 />
//                 <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
//                   All Letters
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           <View style={styles.contentContainer}>
//             <BlurView intensity={20} style={styles.cardBlur}>
//               <View style={styles.card}>
//                 {selectedLetter ? (
//                   renderLetterView()
//                 ) : activeTab === 'form' ? (
//                   renderFormView()
//                 ) : (
//                   renderListView()
//                 )}
//               </View>
//             </BlurView>
//           </View>
//         </KeyboardAvoidingView>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: Platform.OS === 'ios' ? 50 : 30,
//     paddingHorizontal: 20,
//     paddingBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   backButton: {
//     padding: 5,
//   },
//   spacer: {
//     width: 40,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     marginHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 15,
//   },
//   tabButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   activeTabButton: {
//     backgroundColor: 'rgba(76, 175, 80, 0.1)',
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#6b7280',
//     marginLeft: 8,
//   },
//   activeTabText: {
//     color: '#4CAF50',
//     fontWeight: '600',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   cardBlur: {
//     flex: 1,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 25,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   formScrollView: {
//     flex: 1,
//   },
//   formScrollViewContent: {
//     paddingBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   formTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   required: {
//     color: '#ff0000',
//   },
//   blurContainer: {
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     color: '#333',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   multilineInput: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//   },
//   submitButton: {
//     marginTop: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   submitButtonGradient: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//     marginRight: 10,
//   },
//   tableContainer: {
//     flex: 1,
//   },
//   listTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   flatList: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   letterCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardHeaderContent: {
//     flex: 1,
//   },
//   cardName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 2,
//   },
//   cardPosition: {
//     fontSize: 14,
//     color: '#666',
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   actionButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   viewButton: {
//     backgroundColor: '#4CAF50',
//   },
//   editButton: {
//     backgroundColor: '#2196F3',
//   },
//   deleteButton: {
//     backgroundColor: '#F44336',
//   },
//   actionButtonText: {
//     fontSize: 12,
//     color: '#fff',
//     marginTop: 2,
//   },
//   cardDetails: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     padding: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 40,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginTop: 20,
//   },
//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 16,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   letterContainer: {
//     flex: 1,
//   },
//   letterScroll: {
//     flex: 1,
//   },
//   letterScrollContent: {
//     paddingBottom: 20,
//   },
//   letterContent: {
//     padding: 20,
//   },
//   companyContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//   },
//   logoContainer: {
//     marginRight: 20,
//   },
//   companyLogo: {
//     width: 100,
//     height: 100,
//   },
//   companyDetails: {
//     flex: 1,
//   },
//   companyName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 10,
//   },
//   addressContainer: {
//     marginBottom: 10,
//   },
//   addressText: {
//     fontSize: 12,
//     color: '#000',
//     marginBottom: 2,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   iconContainer: {
//     width: 25,
//     height: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   icon: {
//     fontSize: 16,
//   },
//   contactText: {
//     fontSize: 12,
//     color: '#000',
//   },
//   separator: {
//     height: 2,
//     backgroundColor: '#000',
//     marginVertical: 20,
//   },
//   dateRight: {
//     fontSize: 12,
//     color: '#000',
//     textAlign: 'right',
//     marginRight: 150,
//     marginTop: 25,
//   },
//   recipientInfo: {
//     marginBottom: 20,
//   },
//   letterContentInner: {
//     paddingHorizontal: 40,
//   },
//   infoText: {
//     fontSize: 12,
//     color: '#000',
//     marginBottom: 10,
//     lineHeight: 18,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//     margin: 20,
//   },
//   downloadButton: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     flex: 1,
//   },
//   downloadButtonGradient: {
//     backgroundColor: '#4CAF50',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   closeButtonGradient: {
//     backgroundColor: '#F44336',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   downloadIcon: {
//     marginRight: 10,
//   },
//   downloadButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//   },
// });

// export default Noc_Letter;













import { BASE_URL } from '@/Api/BASE_URL.js';
import { ag } from "@/assets/images/ag.js";
import logo from '@/assets/images/agconstruction-1.png';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Custom numberToWords function
const numberToWords = (num) => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands = ['', 'Thousand', 'Million', 'Billion'];

  if (num === 0) return 'Zero';

  const convertLessThanThousand = (n) => {
    if (n === 0) return '';
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + units[n % 10] : ''}`;
    }
    return `${units[Math.floor(n / 100)]} Hundred${n % 100 ? ' ' + convertLessThanThousand(n % 100) : ''}`;
  };

  let word = '';
  let thousandIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk) {
      word = `${convertLessThanThousand(chunk)} ${thousands[thousandIndex]}${word ? ' ' + word : ''}`;
    }
    num = Math.floor(num / 1000);
    thousandIndex++;
  }

  return word.trim();
};

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return { Authorization: `Bearer ${token}` };
};

const Noc_Letter = ({ navigation }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    address: '',
    blank: '',
    customerName: '',
    agreementDate: new Date(),
    flatNo: '',
    buildingNo: '',
    streetNo: '',
    localityName: '',
    areaName: '',
    pincode: '',
    city: '',
    transactionAmount: '',
    transactionAmountWords: '',
    favoringName: '',
    receiverBankName: '',
    branchName: '',
    accountNo: '',
    ifsc: '',
  });
  const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });
  const [focusedInput, setFocusedInput] = useState(null);
  const [nocLetters, setNocLetters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleChange = (name, value) => {
    let updatedFormData = { ...formData, [name]: value };
    if (name === 'transactionAmount') {
      const numericValue = value.replace(/,/g, '');
      if (!isNaN(numericValue) && numericValue !== '') {
        updatedFormData.transactionAmount = numericValue;
        updatedFormData.transactionAmountWords = numberToWords(parseInt(numericValue)) + ' only';
      } else {
        updatedFormData.transactionAmount = '';
        updatedFormData.transactionAmountWords = '';
      }
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'bankName',
      'address',
      'blank',
      'customerName',
      'flatNo',
      'buildingNo',
      'streetNo',
      'localityName',
      'areaName',
      'pincode',
      'city',
      'transactionAmount',
      'favoringName',
      'receiverBankName',
      'branchName',
      'accountNo',
      'ifsc',
    ];
    const isFormComplete = requiredFields.every(
      (field) => formData[field] && formData[field].trim()
    );

    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const payload = {
      ...formData,
      agreementDate: formData.agreementDate.toISOString().split('T')[0],
      transactionAmount: parseFloat(formData.transactionAmount) || 0,
    };

    try {
      const headers = await getAuthHeaders();
      if (isEditMode && editId) {
        await axios.put(`${BASE_URL}/bankNoc/${editId}`, payload, { headers });
        Alert.alert('Success', 'NOC Letter Updated Successfully');
      } else {
        await axios.post(`${BASE_URL}/createBankNoc`, payload, { headers });
        Alert.alert('Success', 'NOC Letter Submitted Successfully');
      }

      setFormData({
        bankName: '',
        address: '',
        blank: '',
        customerName: '',
        agreementDate: new Date(),
        flatNo: '',
        buildingNo: '',
        streetNo: '',
        localityName: '',
        areaName: '',
        pincode: '',
        city: '',
        transactionAmount: '',
        transactionAmountWords: '',
        favoringName: '',
        receiverBankName: '',
        branchName: '',
        accountNo: '',
        ifsc: '',
      });
      setIsEditMode(false);
      setEditId(null);
      setRefreshKey(refreshKey + 1);
      setActiveTab('list');
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again.');
    }
  };

  const handleEdit = (item) => {
    const parsedDate = item.aggrementDate || item.agreementDate
      ? new Date(item.aggrementDate || item.agreementDate)
      : new Date();
    setFormData({
      bankName: item.bankName || '',
      address: item.address || '',
      blank: item.blank || '',
      customerName: item.coustomername || item.customerName || '',
      agreementDate: isNaN(parsedDate) ? new Date() : parsedDate,
      flatNo: item.flatNo || '',
      buildingNo: item.buildingNo || '',
      streetNo: item.streetNo || '',
      localityName: item.localityName || '',
      areaName: item.areaName || '',
      pincode: item.pincode || '',
      city: item.city || '',
      transactionAmount: item.transactionAmount?.toString() || '',
      transactionAmountWords: item.transactionAmountWords || '',
      favoringName: item.facvoringName || item.favoringName || '',
      receiverBankName: item.reciverBankName || item.receiverBankName || '',
      branchName: item.branchName || '',
      accountNo: item.acNO || item.accountNo || '',
      ifsc: item.ifsc || '',
    });
    setEditId(item.id);
    setIsEditMode(true);
    setActiveTab('form');
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this NOC letter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const headers = await getAuthHeaders();
              await axios.delete(`${BASE_URL}/bankNoc/${id}`, { headers });
              setRefreshKey(refreshKey + 1);
              Alert.alert('Success', 'NOC letter deleted successfully');
            } catch (error) {
              console.error('Error deleting NOC letter:', error);
              Alert.alert('Error', 'Failed to delete NOC letter');
            }
          },
        },
      ]
    );
  };

  const handleView = (item) => {
    setSelectedLetter({
      ...item,
      agreementDate: item.aggrementDate || item.agreementDate
        ? new Date(item.aggrementDate || item.agreementDate)
        : new Date(),
    });
  };

  const generatePDF = async (data) => {
    const agreementDate = data.agreementDate && !isNaN(new Date(data.agreementDate))
      ? new Date(data.agreementDate).toLocaleDateString('en-GB')
      : 'N/A';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page {
            margin: 0.3in;
            size: A4;
          }
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.4;
            font-size: 12px;
          }
          .company-container {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            gap: 20px;
          }
          .company-logo-container {
            flex-shrink: 0;
          }
          .company-logo {
            height: 215px;
            width: auto;
          }
          .company-details {
            flex: 1;
          }
          .company-details h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
          .detail-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
          }
          .icon-box {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
          }
          .detail-text {
            margin: 0;
            font-size: 12px;
            color: #333;
          }
          .line-thick {
            border: none;
            height: 2px;
            background-color: #333;
            margin: 15px 0;
          }
          .letter-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
            color: #333;
          }
          .letter-details {
            margin-top: 20px;
          }
          .recipient-info {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .recipient-info p {
            margin: 5px 0;
            font-size: 12px;
          }
          .recipient-info strong {
            color: #333;
          }
          .letter-content {
            font-size: 12px;
            line-height: 1.6;
          }
          .letter-content p {
            margin-bottom: 10px;
          }
          .letter-content strong {
            font-weight: bold;
          }
          .signature {
            margin-top: 30px;
            text-align: left;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 10px;
            color: #666;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="company-container">
          <div class="company-logo-container">
            <img class="company-logo" src="${ag}" alt="AG Construction Logo">
          </div>
          <div class="company-details">
            <h3>AG Construction</h3>
            <div class="detail-row">
              <div class="detail-text">
                <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</p>
                <p>Hudkeshwar Road, Nagpur - 440034</p>
              </div>
            </div>
            <div class="detail-row">
              <div class="icon-box">
                <span style="font-size: 16px;">📧</span>
              </div>
              <p class="detail-text">agconstructions220@gmail.com</p>
            </div>
            <div class="detail-row">
              <div class="icon-box">
                <span style="font-size: 16px;">🌐</span>
              </div>
              <p class="detail-text">www.agconstructionnagpur.in</p>
            </div>
            <div class="detail-row">
              <div class="icon-box">
                <span style="font-size: 16px;">📞</span>
              </div>
              <p class="detail-text">+91 7620 419 075</p>
            </div>
          </div>
        </div>
        
        <hr class="line-thick">
        
        <h3 class="letter-title">NOC Letter</h3>
        
        <div class="letter-details">
          <div class="recipient-info">
            <p><strong>To:</strong> The Assistant General Manager</p>
            <p><strong>Bank:</strong> ${data.bankName || 'N/A'}</p>
            <p><strong>City:</strong> ${data.city || 'N/A'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
          </div>
          
          <div class="letter-content">
            <p>I/We, <strong>${data.coustomername || data.customerName || 'Unknown'}</strong>, hereby certify that:</p>
            <p>1. I/We have transferable rights to the property described below, which has been allotted by me/us to Mr. <strong>${data.coustomername || data.customerName || 'Unknown'}</strong>, hereinafter referred to as “the purchasers”, subject to the due and proper performance and compliances of all the terms and conditions of the Allotment Letter/Sale Agreement dated <strong>${agreementDate}</strong> (hereinafter referred to as the “Sale document”).</p>
            
            <p style="margin-top: 20px;"><strong>Description of the property:</strong></p>
            <p>Flat No./House No.: ${data.flatNo || 'N/A'}</p>
            <p>Building No./Name: ${data.buildingNo || 'N/A'}</p>
            <p>Street No./Name: ${data.streetNo || 'N/A'}</p>
            <p>Locality Name: ${data.localityName || 'N/A'}</p>
            <p>Area Name: ${data.areaName || 'N/A'}</p>
            <p>City Name: ${data.city || 'N/A'}</p>
            <p>Pin Code: ${data.pincode || 'N/A'}</p>
            
            <p>2. The total consideration for this transaction is Rs. ${data.transactionAmount || 'N/A'}/- (<strong>${data.transactionAmountWords || 'N/A'}</strong>) towards sale document.</p>
            <p>3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.</p>
            <p>4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs, charges, risks and consequences mortgaging the said property to <strong>${data.bankName || 'N/A'}</strong> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.</p>
            <p>5. We have not borrowed from any financial institution for the purchase/development of the property and have not created and will not create any encumbrances on the property allotted to the said purchasers during the currency of the loan sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.</p>
            <p>6. After creation of proper charge/mortgage and after receipt of the copies thereof and after receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable to accept <strong>${data.bankName || 'N/A'}</strong> as a nominee of the above named purchaser for the property described above and once the nomination favoring the Bank has been registered and advice sent to the Bank of having done so, I/We agree not to change the same without the written NOC of the Bank.</p>
            <p>7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake to inform the society about the Bank’s charge on the said flat as and when the society is formed.</p>
            <p>8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “<strong>${data.favoringName || data.facvoringName || 'N/A'}</strong>, <strong>${data.receiverBankName || data.reciverBankName || 'N/A'}</strong>, <strong>${data.branchName || 'N/A'}</strong> Branch, Account No. <strong>${data.accountNo || data.acNO || 'N/A'}</strong>, IFSC: <strong>${data.ifsc || 'N/A'}</strong>”.</p>
            <p style="margin-top: 20px;">Company/Firm vide ${data.blank || 'N/A'} (description of document of delegation of authority to the signatory).</p>
            <p style="margin-top: 30px;">Yours faithfully,</p>
            <div class="signature">
              <p>Authorized Signatory</p>
              <p>Name: ____________________</p>
              <p>Place: ____________________</p>
              <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Generated by AG Construction System</p>
          <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { dialogTitle: `NOC_Letter_${data.coustomername || data.customerName || 'Unknown'}.pdf` });
        Alert.alert('Success', 'PDF generated and ready to share!');
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  useEffect(() => {
    const fetchNocLetters = async () => {
      try {
        setLoading(true);
        const headers = await getAuthHeaders();
        const response = await axios.get(`${BASE_URL}/bankNoc`, { headers });
        console.log('API Response:', response.data); // Debug: Log API response
        const sortedData = response.data
          .map(item => ({
            ...item,
            agreementDate: item.aggrementDate || item.agreementDate
              ? new Date(item.aggrementDate || item.agreementDate)
              : new Date(),
            coustomername: item.coustomername || item.customerName || 'Unknown',
            bankName: item.bankName || 'N/A',
            localityName: item.localityName || 'N/A',
            flatNo: item.flatNo || 'N/A',
            buildingNo: item.buildingNo || 'N/A',
            streetNo: item.streetNo || 'N/A',
            areaName: item.areaName || 'N/A',
            pincode: item.pincode || 'N/A',
            city: item.city || 'N/A',
            transactionAmount: item.transactionAmount || 'N/A',
            transactionAmountWords: item.transactionAmountWords || 'N/A',
            favoringName: item.facvoringName || item.favoringName || 'N/A',
            receiverBankName: item.reciverBankName || item.receiverBankName || 'N/A',
            branchName: item.branchName || 'N/A',
            accountNo: item.acNO || item.accountNo || 'N/A',
            ifsc: item.ifsc || 'N/A',
            blank: item.blank || 'N/A',
          }))
          .filter(item => !isNaN(item.agreementDate)) // Ensure valid dates
          .sort((a, b) => b.id - a.id);
        setNocLetters(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error('Error fetching NOC letters:', error);
        Alert.alert('Error', 'Failed to fetch NOC letters');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchNocLetters();
  }, [refreshKey]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(nocLetters);
    } else {
      const filtered = nocLetters.filter(
        (letter) =>
          (letter.coustomername || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (letter.bankName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (letter.localityName || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, nocLetters]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
  };

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date))) {
      return 'N/A';
    }
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formFields = [
    { label: 'Bank Name', key: 'bankName', required: true },
    { label: 'Address', key: 'address', required: true, multiline: true },
    { label: 'Document Description', key: 'blank', required: true },
    { label: 'Customer Name', key: 'customerName', required: true },
    { label: 'Agreement Date', key: 'agreementDate', type: 'date', required: true },
    { label: 'Flat No.', key: 'flatNo', required: true },
    { label: 'Building No.', key: 'buildingNo', required: true },
    { label: 'Street No.', key: 'streetNo', required: true },
    { label: 'Locality Name', key: 'localityName', required: true },
    { label: 'Area Name', key: 'areaName', required: true },
    { label: 'Pincode', key: 'pincode', required: true, keyboardType: 'numeric' },
    { label: 'City', key: 'city', required: true },
    { label: 'Transaction Amount (₹)', key: 'transactionAmount', required: true, keyboardType: 'numeric' },
    { label: 'Favouring Name', key: 'favoringName', required: true },
    { label: 'Receiver Bank Name', key: 'receiverBankName', required: true },
    { label: 'Branch Name', key: 'branchName', required: true },
    { label: 'Account No.', key: 'accountNo', required: true },
    { label: 'IFSC Code', key: 'ifsc', required: true },
  ];

  const renderInput = (field, index) => {
    const isFocused = focusedInput === field.key;

    return (
      <View key={index} style={styles.inputGroup}>
        <Text style={styles.label}>{field.label}{field.required && <Text style={styles.required}>*</Text>}</Text>
        <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
          <TextInput
            style={[styles.input, field.multiline && styles.multilineInput]}
            placeholder={field.label}
            value={formData[field.key]}
            onChangeText={(text) => handleChange(field.key, text)}
            onFocus={() => setFocusedInput(field.key)}
            onBlur={() => setFocusedInput(null)}
            placeholderTextColor="#999"
            keyboardType={field.keyboardType || 'default'}
            editable={!loading}
            multiline={field.multiline}
            textAlignVertical={field.multiline ? 'top' : 'center'}
          />
        </BlurView>
      </View>
    );
  };

  const renderDateField = (field) => {
    const isFocused = focusedInput === field.key;

    return (
      <View key={field.key} style={styles.inputGroup}>
        <Text style={styles.label}>{field.label}{field.required && <Text style={styles.required}>*</Text>}</Text>
        <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker({ field: field.key, visible: true })}
            disabled={loading}
          >
            <MaterialIcons
              name="event"
              size={24}
              color={isFocused ? '#6A5ACD' : '#8A8A8A'}
              style={styles.inputIcon}
            />
            <Text style={styles.dateText}>{formatDate(formData[field.key])}</Text>
          </TouchableOpacity>
        </BlurView>
        {showDatePicker.visible && showDatePicker.field === field.key && (
          <DateTimePicker
            value={formData[field.key] || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker({ field: null, visible: false });
              if (selectedDate) {
                setFormData({ ...formData, [field.key]: selectedDate });
              }
            }}
          />
        )}
      </View>
    );
  };

  const renderLetterItem = ({ item, index }) => {
    const customerName = item.coustomername || item.customerName || 'Unknown';
    return (
      <View style={styles.slipCard}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{customerName.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.cardHeaderContent}>
            <Text style={styles.cardName}>{customerName}</Text>
            <Text style={styles.cardPosition}>{item.bankName || 'N/A'}</Text>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.showButton]}
              onPress={() => handleView(item)}
            >
              <Feather name="eye" size={18} color="#6A5ACD" />
              <Text style={styles.actionButtonText}>Show</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleEdit(item)}
            >
              <Feather name="edit" size={18} color="#3b82f6" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(item.id)}
            >
              <Feather name="trash-2" size={18} color="#ef4444" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Account No: {item.accountNo || item.acNO || 'N/A'}</Text>
            <Text style={styles.detailText}>Branch: {item.branchName || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>IFSC: {item.ifsc || 'N/A'}</Text>
            <Text style={styles.detailText}>City: {item.city || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Amount: Rs. {item.transactionAmount || 'N/A'}/-</Text>
            <Text style={styles.detailText}>Pincode: {item.pincode || 'N/A'}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#6A5ACD" />
          <Text style={styles.emptyText}>Loading NOC letters...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Feather name="file-text" size={60} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No NOC letters found</Text>
        <Text style={styles.emptyText}>
          {searchQuery ? 'Try a different search term' : 'Create your first NOC letter to get started'}
        </Text>
      </View>
    );
  };

  const renderFormView = () => (
    <ScrollView
      style={styles.formScrollView}
      contentContainerStyle={styles.formScrollViewContent}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>AG Construction NOC Letter Form</Text>
        {formFields.map((field, index) =>
          field.type === 'date' ? renderDateField(field) : renderInput(field, index)
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          <LinearGradient
            colors={['#6A5ACD', '#483D8B', '#191970']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : (isEditMode ? 'Update NOC Letter' : 'Generate NOC Letter')}
            </Text>
            <Feather name="send" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderListView = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.listTitle}>All NOC Letters</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6A5ACD" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by customer, bank, or locality..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color="#6A5ACD" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderLetterItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6A5ACD']} />
        }
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );

  const renderLetterView = () => (
    <View style={styles.slipContainer}>
      <ScrollView
        style={styles.slipScroll}
        contentContainerStyle={styles.slipScrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.slipContent}>
          <View style={styles.companyContainer}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.companyLogo} resizeMode="contain" />
            </View>
            <View style={styles.companyDetails}>
              <Text style={styles.companyName}>AG Construction</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</Text>
                <Text style={styles.addressText}>Hudkeshwar Road, Nagpur - 440034</Text>
              </View>
              <View style={styles.contactRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📧</Text>
                </View>
                <Text style={styles.contactText}>agconstructions220@gmail.com</Text>
              </View>
              <View style={styles.contactRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🌐</Text>
                </View>
                <Text style={styles.contactText}>www.agconstructionnagpur.in</Text>
              </View>
              <View style={styles.contactRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📞</Text>
                </View>
                <Text style={styles.contactText}>+91 7620 419 075</Text>
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <Text style={styles.letterTitle}>NOC Letter</Text>

          <View style={styles.employeeInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>To:</Text> The Assistant General Manager
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Bank:</Text> {selectedLetter.bankName || 'N/A'}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>City:</Text> {selectedLetter.city || 'N/A'}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Date:</Text> {new Date().toLocaleDateString('en-GB')}
            </Text>
          </View>

          <View style={styles.letterContent}>
            <Text style={styles.infoText}>
              I/We, <Text style={styles.boldText}>{selectedLetter.coustomername || selectedLetter.customerName || 'Unknown'}</Text>, hereby certify that:
            </Text>
            <Text style={styles.infoText}>
              1. I/We have transferable rights to the property described below, which has been allotted by me/us to Mr. <Text style={styles.boldText}>{selectedLetter.coustomername || selectedLetter.customerName || 'Unknown'}</Text>, hereinafter referred to as “the purchasers”, subject to the due and proper performance and compliances of all the terms and conditions of the Allotment Letter/Sale Agreement dated <Text style={styles.boldText}>{formatDate(selectedLetter.aggrementDate || selectedLetter.agreementDate)}</Text> (hereinafter referred to as the “Sale document”).
            </Text>
            <Text style={[styles.infoText, { marginTop: 20 }]}>
              <Text style={styles.boldText}>Description of the property:</Text>
            </Text>
            <Text style={styles.infoText}>Flat No./House No.: {selectedLetter.flatNo || 'N/A'}</Text>
            <Text style={styles.infoText}>Building No./Name: {selectedLetter.buildingNo || 'N/A'}</Text>
            <Text style={styles.infoText}>Street No./Name: {selectedLetter.streetNo || 'N/A'}</Text>
            <Text style={styles.infoText}>Locality Name: {selectedLetter.localityName || 'N/A'}</Text>
            <Text style={styles.infoText}>Area Name: {selectedLetter.areaName || 'N/A'}</Text>
            <Text style={styles.infoText}>City Name: {selectedLetter.city || 'N/A'}</Text>
            <Text style={styles.infoText}>Pin Code: {selectedLetter.pincode || 'N/A'}</Text>
            <Text style={styles.infoText}>
              2. The total consideration for this transaction is Rs. {selectedLetter.transactionAmount || 'N/A'}/- (<Text style={styles.boldText}>{selectedLetter.transactionAmountWords || 'N/A'}</Text>) towards sale document.
            </Text>
            <Text style={styles.infoText}>
              3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.
            </Text>
            <Text style={styles.infoText}>
              4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs, charges, risks and consequences mortgaging the said property to <Text style={styles.boldText}>{selectedLetter.bankName || 'N/A'}</Text> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.
            </Text>
            <Text style={styles.infoText}>
              5. We have not borrowed from any financial institution for the purchase/development of the property and have not created and will not create any encumbrances on the property allotted to the said purchasers during the currency of the loan sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance and compliances of all the terms and conditions of the sale document by the said purchasers.
            </Text>
            <Text style={styles.infoText}>
              6. After creation of proper charge/mortgage and after receipt of the copies thereof and after receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable to accept <Text style={styles.boldText}>{selectedLetter.bankName || 'N/A'}</Text> as a nominee of the above named purchaser for the property described above and once the nomination favoring the Bank has been registered and advice sent to the Bank of having done so, I/We agree not to change the same without the written NOC of the Bank.
            </Text>
            <Text style={styles.infoText}>
              7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake to inform the society about the Bank’s charge on the said flat as and when the society is formed.
            </Text>
            <Text style={styles.infoText}>
              8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “<Text style={styles.boldText}>{selectedLetter.favoringName || selectedLetter.facvoringName || 'N/A'}</Text>, <Text style={styles.boldText}>{selectedLetter.receiverBankName || selectedLetter.reciverBankName || 'N/A'}</Text>, <Text style={styles.boldText}>{selectedLetter.branchName || 'N/A'}</Text> Branch, Account No. <Text style={styles.boldText}>{selectedLetter.accountNo || selectedLetter.acNO || 'N/A'}</Text>, IFSC: <Text style={styles.boldText}>{selectedLetter.ifsc || 'N/A'}</Text>”.
            </Text>
            <Text style={styles.infoText}>
              Company/Firm vide <Text style={styles.boldText}>{selectedLetter.blank || 'N/A'}</Text> (description of document of delegation of authority to the signatory).
            </Text>
            <Text style={styles.infoText}>Yours faithfully,</Text>
            <Text style={[styles.infoText, styles.signature]}>Authorized Signatory</Text>
            <Text style={styles.infoText}>Name: ____________________</Text>
            <Text style={styles.infoText}>Place: ____________________</Text>
            <Text style={styles.infoText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Generated by AG Construction System</Text>
            <Text style={styles.footerText}>Date: {new Date().toLocaleDateString('en-IN')}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => generatePDF(selectedLetter)}
      >
        <LinearGradient
          colors={['#6A5ACD', '#483D8B', '#191970']}
          style={styles.downloadButtonGradient}
        >
          <Feather name="download" size={20} color="#fff" style={styles.downloadIcon} />
          <Text style={styles.downloadButtonText}>Download PDF</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const closeLetterView = () => {
    setSelectedLetter(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6A5ACD', '#483D8B', '#191970']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>NOC Letter</Text>
            <View style={styles.spacer} />
          </View>

          {!selectedLetter && (
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'form' && styles.activeTabButton]}
                onPress={() => setActiveTab('form')}
              >
                <Feather
                  name="edit-3"
                  size={18}
                  color={activeTab === 'form' ? '#6A5ACD' : '#6b7280'}
                />
                <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
                  {isEditMode ? 'Edit Letter' : 'New Letter'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
                onPress={() => setActiveTab('list')}
              >
                <Feather
                  name="list"
                  size={18}
                  color={activeTab === 'list' ? '#6A5ACD' : '#6b7280'}
                />
                <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
                  All Letters
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.contentContainer}>
            <BlurView intensity={20} style={styles.cardBlur}>
              <View style={styles.card}>
                {selectedLetter ? (
                  renderLetterView()
                ) : activeTab === 'form' ? (
                  renderFormView()
                ) : (
                  renderListView()
                )}
              </View>
            </BlurView>
          </View>

          {selectedLetter && (
            <TouchableOpacity style={styles.closeButton} onPress={closeLetterView}>
              <Feather name="x" size={24} color="#6A5ACD" />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 5,
  },
  spacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#6A5ACD',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardBlur: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  formScrollView: {
    flex: 1,
  },
  formScrollViewContent: {
    paddingBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#483D8B',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#483D8B',
    marginBottom: 8,
    marginLeft: 4,
  },
  required: {
    color: '#ef4444',
  },
  blurContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248,249,250,0.7)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(248,249,250,0.7)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputIcon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginRight: 10,
  },
  tableContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#483D8B',
    marginBottom: 15,
  },
  slipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A5ACD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardHeaderContent: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  cardPosition: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showButton: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
  },
  editButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  actionButtonText: {
    fontSize: 10,
    marginTop: 2,
    color: '#4b5563',
  },
  cardDetails: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  slipContainer: {
    flex: 1,
  },
  slipScroll: {
    flex: 1,
  },
  slipScrollContent: {
    paddingBottom: 20,
  },
  slipContent: {
    padding: 20,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logoContainer: {
    marginRight: 15,
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  addressContainer: {
    marginBottom: 10,
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    lineHeight: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    fontSize: 14,
  },
  contactText: {
    fontSize: 12,
    color: '#666',
  },
  separator: {
    height: 2,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  letterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 10,
  },
  employeeInfo: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  letterContent: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  signature: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'left',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5,
    textAlign: 'center',
  },
  downloadButton: {
    margin: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  downloadIcon: {
    marginRight: 10,
  },
  downloadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    right: 30,
    zIndex: 1000,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Noc_Letter;