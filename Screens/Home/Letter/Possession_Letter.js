// import React from 'react'
// import { Text, View } from 'react-native'

// const Possession_Letter = () => {
//   return (
//     <View>
//       <Text>Possession_Letter</Text>
//     </View>
//   )
// }

// export default Possession_Letter






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
// const PossessionLetter = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     fromName: '',
//     date: new Date(),
//     toName: '',
//     name: '',
//     flatNo: '',
//     residencyName: '',
//     address: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });
//   const [focusedInput, setFocusedInput] = useState(null);
//   const [showPossession, setShowPossession] = useState(false);
//   const [letterData, setLetterData] = useState(null);
//   const [possessionTable, setPossessionTable] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
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
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const requiredFields = ['fromName', 'toName', 'name', 'flatNo', 'residencyName', 'address'];
//     const isFormComplete = requiredFields.every(
//       (field) => formData[field] && (typeof formData[field] !== 'string' || formData[field].trim())
//     );

//     if (!isFormComplete) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     const payload = {
//       ...formData,
//       date: formData.date.toISOString().split('T')[0],
//     };

//     try {
//       const headers = await getAuthHeaders();
//       if (isEditMode && editId) {
//         await axios.put(`${BASE_URL}/PossessionLetter/${editId}`, payload, { headers });
//         Alert.alert('Success', 'Possession Letter Updated Successfully');
//       } else {
//         await axios.post(`${BASE_URL}/createPossessionLetter`, payload, { headers });
//         Alert.alert('Success', 'Possession Letter Submitted Successfully');
//       }

//       setFormData({
//         fromName: '',
//         date: new Date(),
//         toName: '',
//         name: '',
//         flatNo: '',
//         residencyName: '',
//         address: '',
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
//       fromName: item.fromName || '',
//       date: item.date ? new Date(item.date) : new Date(),
//       toName: item.toName || '',
//       name: item.name || '',
//       flatNo: item.flatNo || '',
//       residencyName: item.residencyName || '',
//       address: item.address || '',
//     });
//     setEditId(item.id);
//     setIsEditMode(true);
//     setShowActionMenu(null);
//     setActiveTab('form'); // Switch to form view for editing
//   };

//   const handleDelete = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this possession letter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const headers = await getAuthHeaders();
//               await axios.delete(`${BASE_URL}/PossessionLetter/${id}`, { headers });
//               setRefreshKey(refreshKey + 1);
//               Alert.alert('Success', 'Possession letter deleted successfully');
//             } catch (error) {
//               console.error('Error deleting possession letter:', error);
//               Alert.alert('Error', 'Failed to delete possession letter');
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
//       const response = await axios.get(`${BASE_URL}/PossessionLetter/${id}`, { headers });
//       setLetterData(response.data);
//       setShowPossession(true);
//       setShowActionMenu(null);
//     } catch (error) {
//       console.error('Error fetching possession letter:', error);
//       Alert.alert('Error', 'Failed to fetch possession letter details');
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
//             border-top: 1px solid rgb(167, 5, 86);
//             margin-bottom: 2px;
//           }
//           .divider-thick {
//             border-top: 3px solid rgb(167, 5, 86);
//             margin-top: 4px;
//           }
//           .content {
//             font-size: 16px;
//             line-height: 1.8;
//             margin-left: 50px;
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
//         <div class="divider-thick"></div>
//         <div class="content">
//           <div class="recipient-info">
//             <div>
//               <p>From: <b>${data.fromName}</b></p>
//               <p>To: Mr./Mrs./Ms. <b>${data.toName}</b></p>
//             </div>
//             <p>Date: ${new Date(data.date).toLocaleDateString('en-GB')}</p>
//           </div>
//           <h2>Sub: Handing over possession of</h2>
//           <p>Dear Sir/Madam,</p>
//           <p>I, the undersigned, Mr./Mrs./Ms. <b>${data.name}</b>, state that I have transferred my above flat to you, Mr./Mrs./Ms. <b>${data.toName}</b>, and have since received full payment towards the transfer of above Flat <b>${data.flatNo}</b> and Shares of Society. Since, <b>${data.address}</b>, <b>${data.residencyName}</b>, I have received full payment from you, I relinquish my rights for the above flat and hand over possession of the same, and you are at liberty to use and/or to sell, transfer, sublet at your will as you may wish within the rules and regulations of the society, and I will have no objection or rights for the said flat.</p>
//           <p style="margin-top: 30px;">Yours faithfully,</p>
//           <p style="margin-top: 50px;">(AG - Constrction)</p>
//         </div>
//       </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({ html });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, { dialogTitle: `${data.name}_possession_letter.pdf` });
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
//     const fetchPossessionLetters = async () => {
//       try {
//         setLoading(true);
//         const headers = await getAuthHeaders();
//         const response = await axios.get(`${BASE_URL}/PossessionLetter`, { headers });
//         const sortedData = [...response.data].sort((a, b) => b.id - a.id);
//         setPossessionTable(sortedData);
//         setFilteredData(sortedData);
//       } catch (error) {
//         console.error('Error fetching possession letters:', error);
//         Alert.alert('Error', 'Failed to fetch possession letters');
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     };
//     fetchPossessionLetters();
//   }, [refreshKey]);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredData(possessionTable);
//     } else {
//       const filtered = possessionTable.filter(
//         (item) =>
//           item.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.toName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.residencyName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchQuery, possessionTable]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setRefreshKey(refreshKey + 1);
//   };

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });

//     const sortedData = [...filteredData].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'asc' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setFilteredData(sortedData);
//   };

//   const renderSortIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return <Feather name="chevron-down" size={14} color="#9ca3af" />;
//     }
//     return sortConfig.direction === 'asc' ? (
//       <Feather name="chevron-up" size={14} color="#6A5ACD" />
//     ) : (
//       <Feather name="chevron-down" size={14} color="#6A5ACD" />
//     );
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
//     { label: 'From', icon: 'person', key: 'fromName' },
//     { label: 'Date', icon: 'event', key: 'date', type: 'date' },
//     { label: 'To Name', icon: 'person', key: 'toName' },
//     { label: 'Name', icon: 'person', key: 'name' },
//     { label: 'Flat Number', icon: 'home', key: 'flatNo', keyboardType: 'numeric' },
//     { label: 'Residency Name', icon: 'business', key: 'residencyName' },
//     { label: 'Address', icon: 'location-on', key: 'address', multiline: true },
//   ];

//   const renderPossessionItem = ({ item, index }) => (
//     <TouchableOpacity
//       style={[styles.offerCard, index % 2 === 0 ? styles.evenCard : styles.oddCard]}
//       onPress={() => handleView(item.id)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.avatarContainer}>
//           <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
//         </View>
//         <View style={styles.cardHeaderContent}>
//           <Text style={styles.cardName}>{item.name}</Text>
//           <Text style={styles.cardPosition}>{item.residencyName}</Text>
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
//             <Feather name="user" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>From: {item.fromName}</Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Feather name="user" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>To: {item.toName}</Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="home" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>Flat No: {item.flatNo}</Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Feather name="calendar" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>
//               Date: {new Date(item.date).toLocaleDateString('en-GB')}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="map-pin" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
//               Address: {item.address}
//             </Text>
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
//           <Text style={styles.emptyText}>Loading possession letters...</Text>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.emptyContainer}>
//         <Feather name="file-text" size={60} color="#d1d5db" />
//         <Text style={styles.emptyTitle}>No possession letters found</Text>
//         <Text style={styles.emptyText}>
//           {searchQuery ? 'Try a different search term' : 'Create your first possession letter above'}
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
//           placeholder="Search by name or residency..."
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
//           {filteredData.length} {filteredData.length === 1 ? 'possession letter' : 'possession letters'}
//         </Text>
//         <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
//           <Feather name="refresh-cw" size={16} color="#6A5ACD" />
//           <Text style={styles.refreshButtonText}>Refresh</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredData}
//         renderItem={renderPossessionItem}
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
//             <Text style={styles.headerTitle}>Possession Letter</Text>
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
//         visible={showPossession}
//         onRequestClose={() => setShowPossession(false)}
//       >
//         <View style={styles.modalContainer}>
//           <BlurView intensity={90} style={styles.modalBlur}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Possession Letter</Text>
//               <TouchableOpacity
//                 style={styles.closeModalButton}
//                 onPress={() => setShowPossession(false)}
//               >
//                 <Feather name="x" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>
            
//             {letterData && (
//               <View style={styles.letterContainer}>
//                 <View style={styles.letterButtons}>
//                   <TouchableOpacity
//                     style={styles.downloadButton}
//                     onPress={() => generatePDF(letterData)}
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
//                             Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar,
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
//                           <Text style={styles.contactText}>agconstructions220@gmail.com</Text>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="envelope" size={15} color="#fff" />
//                           </View>
//                         </View>
//                         <View style={styles.contactRow}>
//                           <Text style={styles.contactText}>www.agconstructionnagpur.in</Text>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="globe" size={15} color="#fff" />
//                           </View>
//                         </View>
//                         <View style={styles.contactRow}>
//                           <Text style={styles.contactText}>+91 7620 419 075</Text>
//                           <View style={styles.iconWrapper}>
//                             <FontAwesome name="phone" size={15} color="#fff" />
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                     <View style={styles.dividerContainer}>
//                       <View style={[styles.divider, { borderWidth: 1 }]} />
//                       <View style={[styles.divider, { borderWidth: 3 }]} />
//                     </View>

//                     <View style={styles.contentContainer}>
//                       <View style={styles.contentRow}>
//                         <View style={styles.recipientInfo}>
//                           <View>
//                             <Text style={styles.letterText}>
//                               From: <Text style={styles.boldText}>{letterData.fromName}</Text>
//                             </Text>
//                             <Text style={styles.letterText}>
//                               To: Mr./Mrs./Ms. <Text style={styles.boldText}>{letterData.toName}</Text>
//                             </Text>
//                           </View>
//                           <Text style={styles.letterText}>
//                             Date: {new Date(letterData.date).toLocaleDateString('en-GB')}
//                           </Text>
//                         </View>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterHeading}>Sub: Handing over possession of</Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>Dear Sir/Madam,</Text>
//                         <Text style={styles.letterText}>
//                           I, the undersigned, Mr./Mrs./Ms. <Text style={styles.boldText}>{letterData.name}</Text>,
//                           state that I have transferred my above flat to you, Mr./Mrs./Ms.{' '}
//                           <Text style={styles.boldText}>{letterData.toName}</Text>, and have since received
//                           full payment towards the transfer of above Flat{' '}
//                           <Text style={styles.boldText}>{letterData.flatNo}</Text> and Shares of Society.
//                           Since, <Text style={styles.boldText}>{letterData.address}</Text>,{' '}
//                           <Text style={styles.boldText}>{letterData.residencyName}</Text>, I have received
//                           full payment from you, I relinquish my rights for the above flat and hand over
//                           possession of the same, and you are at liberty to use and/or to sell, transfer,
//                           sublet at your will as you may wish within the rules and regulations of the society,
//                           and I will have no objection or rights for the said flat.
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 30 }]}>
//                         <Text style={styles.letterText}>Yours faithfully,</Text>
//                         <Text style={[styles.letterText, { marginTop: 50 }]}>
//                           (AG - Construction)
//                         </Text>
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
//     marginBottom: 15,
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
//     marginBottom: 8,
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
//     fontSize: 13,
//     marginRight: 10,
//   },
//   dividerContainer: {
//     marginBottom: 20,
//   },
//   divider: {
//     borderColor: 'rgb(167, 5, 86)',
//     marginBottom: 4,
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
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
// });

// export default PossessionLetter;









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
//   Dimensions,
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

// const { width } = Dimensions.get('window');

// const getAuthHeaders = async () => {
//   const token = await AsyncStorage.getItem('jwtToken');
//   if (!token) {
//     throw new Error('No authentication token found');
//   }
//   return { Authorization: `Bearer ${token}` };
// };

// const PossessionLetter = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     fromName: '',
//     date: new Date(),
//     toName: '',
//     name: '',
//     flatNo: '',
//     residencyName: '',
//     address: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [possessionLetters, setPossessionLetters] = useState([]);
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activeTab, setActiveTab] = useState('form');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const requiredFields = ['fromName', 'toName', 'name', 'flatNo', 'residencyName', 'address'];
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
//       date: formData.date.toISOString().split('T')[0],
//     };

//     try {
//       const headers = await getAuthHeaders();
//       if (isEditMode && editId) {
//         await axios.put(`${BASE_URL}/PossessionLetter/${editId}`, payload, { headers });
//         Alert.alert('Success', 'Possession Letter updated successfully!');
//       } else {
//         await axios.post(`${BASE_URL}/createPossessionLetter`, payload, { headers });
//         Alert.alert('Success', 'Possession Letter submitted successfully!');
//       }

//       setFormData({
//         fromName: '',
//         date: new Date(),
//         toName: '',
//         name: '',
//         flatNo: '',
//         residencyName: '',
//         address: '',
//       });
//       setIsEditMode(false);
//       setEditId(null);
//       fetchPossessionLetters();
//       setSelectedLetter(null);
//       setActiveTab('list');
//     } catch (err) {
//       console.error('Failed to submit/update possession letter:', err);
//       Alert.alert('Error', 'Operation failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fetchPossessionLetters = async () => {
//     try {
//       setRefreshing(true);
//       const headers = await getAuthHeaders();
//       const response = await axios.get(`${BASE_URL}/PossessionLetter`, { headers });
//       const sortedData = [...response.data].sort((a, b) => b.id - a.id);
//       setPossessionLetters(sortedData);
//     } catch (err) {
//       console.error('Failed to fetch possession letters:', err);
//       Alert.alert('Error', 'Failed to load possession letters.');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchPossessionLetters();
//   }, []);

//   const handleEdit = (item) => {
//     setFormData({
//       fromName: item.fromName || '',
//       date: item.date ? new Date(item.date) : new Date(),
//       toName: item.toName || '',
//       name: item.name || '',
//       flatNo: item.flatNo || '',
//       residencyName: item.residencyName || '',
//       address: item.address || '',
//     });
//     setEditId(item.id);
//     setIsEditMode(true);
//     setActiveTab('form');
//   };

//   const handleDelete = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this possession letter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const headers = await getAuthHeaders();
//               await axios.delete(`${BASE_URL}/PossessionLetter/${id}`, { headers });
//               Alert.alert('Success', 'Possession letter deleted successfully');
//               fetchPossessionLetters();
//             } catch (error) {
//               console.error('Error deleting possession letter:', error);
//               Alert.alert('Error', 'Failed to delete possession letter');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleView = (item) => {
//     setSelectedLetter(item);
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
//             display: flex;
//             justify-content: space-between;
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
//           .letter-content h2 {
//             margin: 20px 40px 20px 40px;
//             font-size: 14px;
//             font-weight: bold;
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
        
//         <p class="date-right">Date: ${new Date(data.date).toLocaleDateString('en-GB')}</p>
        
//         <div class="recipient-info">
//           <div>
//             <p>From: <strong>${data.fromName}</strong></p>
//             <p>To: Mr./Mrs./Ms. <strong>${data.toName}</strong></p>
//           </div>
//         </div>
        
//         <div class="letter-content">
//           <h2>Sub: Handing over possession of</h2>
//           <p>Dear Sir/Madam,</p>
//           <p>I, the undersigned, Mr./Mrs./Ms. <strong>${data.name}</strong>, state that I have transferred my above flat to you, Mr./Mrs./Ms. <strong>${data.toName}</strong>, and have since received full payment towards the transfer of above Flat <strong>${data.flatNo}</strong> and Shares of Society. Since, <strong>${data.address}</strong>, <strong>${data.residencyName}</strong>, I have received full payment from you, I relinquish my rights for the above flat and hand over possession of the same, and you are at liberty to use and/or to sell, transfer, sublet at your will as you may wish within the rules and regulations of the society, and I will have no objection or rights for the said flat.</p>
//           <p style="margin-top: 30px;">Yours faithfully,</p>
//           <p style="margin-top: 50px;">(AG - Construction)</p>
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
//           dialogTitle: `${data.name}_possession_letter.pdf`,
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
//     { label: 'From', key: 'fromName', required: true },
//     { label: 'Date', key: 'date', type: 'date', required: true },
//     { label: 'To Name', key: 'toName', required: true },
//     { label: 'Name', key: 'name', required: true },
//     { label: 'Flat Number', key: 'flatNo', required: true, keyboardType: 'numeric' },
//     { label: 'Residency Name', key: 'residencyName', required: true },
//     { label: 'Address', key: 'address', required: true, multiline: true },
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
//         <Text style={styles.formTitle}>Possession Letter Form</Text>
//         {formFields.map((field, index) =>
//           field.type === 'date' ? renderDateField(field) : renderInput(field, index)
//         )}
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <LinearGradient
//             colors={['#4CAF50', '#388E3C', '#2E7D32']}
//             style={styles.submitButtonGradient}
//           >
//             <Text style={styles.submitButtonText}>
//               {isSubmitting ? 'Submitting...' : (isEditMode ? 'Update' : 'Submit')}
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
//           <Text style={styles.cardName}>{item.name}</Text>
//           <Text style={styles.cardPosition}>{item.residencyName}</Text>
//         </View>
//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.viewButton]}
//             onPress={() => handleView(item)}
//           >
//             <Feather name="eye" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>View</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.editButton]}
//             onPress={() => handleEdit(item)}
//           >
//             <Feather name="edit" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.deleteButton]}
//             onPress={() => handleDelete(item.id)}
//           >
//             <Feather name="trash-2" size={18} color="#fff" />
//             <Text style={styles.actionButtonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.cardDetails}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>From: {item.fromName}</Text>
//           <Text style={styles.detailText}>To: {item.toName}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText}>Flat No: {item.flatNo}</Text>
//           <Text style={styles.detailText}>Date: {formatDate(item.date)}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
//             Address: {item.address}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );

//   const renderListView = () => (
//     <View style={styles.tableContainer}>
//       <Text style={styles.listTitle}>All Possession Letters</Text>
//       <FlatList
//         data={possessionLetters}
//         renderItem={renderLetterItem}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Feather name="file-text" size={60} color="#d1d5db" />
//             <Text style={styles.emptyTitle}>No possession letters found</Text>
//             <Text style={styles.emptyText}>Create a new possession letter to get started</Text>
//           </View>
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchPossessionLetters}
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

//           <Text style={styles.dateRight}>Date: {formatDate(selectedLetter.date)}</Text>

//           <View style={styles.recipientInfo}>
//             <Text style={styles.infoText}>From: <Text style={styles.boldText}>{selectedLetter.fromName}</Text></Text>
//             <Text style={styles.infoText}>To: Mr./Mrs./Ms. <Text style={styles.boldText}>{selectedLetter.toName}</Text></Text>
//           </View>

//           <View style={styles.letterContentInner}>
//             <Text style={styles.letterHeading}>Sub: Handing over possession of</Text>
//             <Text style={styles.infoText}>Dear Sir/Madam,</Text>
//             <Text style={styles.infoText}>
//               I, the undersigned, Mr./Mrs./Ms. <Text style={styles.boldText}>{selectedLetter.name}</Text>,
//               state that I have transferred my above flat to you, Mr./Mrs./Ms.{' '}
//               <Text style={styles.boldText}>{selectedLetter.toName}</Text>, and have since received
//               full payment towards the transfer of above Flat{' '}
//               <Text style={styles.boldText}>{selectedLetter.flatNo}</Text> and Shares of Society.
//               Since, <Text style={styles.boldText}>{selectedLetter.address}</Text>,{' '}
//               <Text style={styles.boldText}>{selectedLetter.residencyName}</Text>, I have received
//               full payment from you, I relinquish my rights for the above flat and hand over
//               possession of the same, and you are at liberty to use and/or to sell, transfer,
//               sublet at your will as you may wish within the rules and regulations of the society,
//               and I will have no objection or rights for the said flat.
//             </Text>
//             <Text style={[styles.infoText, { marginTop: 30 }]}>Yours faithfully,</Text>
//             <Text style={[styles.infoText, { marginTop: 50 }]}>(AG - Construction)</Text>
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
//             <Text style={styles.headerTitle}>Possession Letter</Text>
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
//                   {isEditMode ? 'Edit Letter' : 'New Letter'}
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
//   letterHeading: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 20,
//     marginTop: 20,
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

// export default PossessionLetter;












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

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return { Authorization: `Bearer ${token}` };
};

const PossessionLetter = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fromName: '',
    date: new Date(),
    toName: '',
    name: '',
    flatNo: '',
    residencyName: '',
    address: '',
  });
  const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });
  const [focusedInput, setFocusedInput] = useState(null);
  const [possessionLetters, setPossessionLetters] = useState([]);
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredFields = ['fromName', 'toName', 'name', 'flatNo', 'residencyName', 'address'];
    const isFormComplete = requiredFields.every(
      (field) => formData[field] && formData[field].trim()
    );

    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const payload = {
      ...formData,
      date: formData.date.toISOString().split('T')[0],
    };

    try {
      const headers = await getAuthHeaders();
      if (isEditMode && editId) {
        await axios.put(`${BASE_URL}/PossessionLetter/${editId}`, payload, { headers });
        Alert.alert('Success', 'Possession Letter Updated Successfully');
      } else {
        await axios.post(`${BASE_URL}/createPossessionLetter`, payload, { headers });
        Alert.alert('Success', 'Possession Letter Submitted Successfully');
      }

      setFormData({
        fromName: '',
        date: new Date(),
        toName: '',
        name: '',
        flatNo: '',
        residencyName: '',
        address: '',
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
    setFormData({
      fromName: item.fromName || '',
      date: item.date ? new Date(item.date) : new Date(),
      toName: item.toName || '',
      name: item.name || '',
      flatNo: item.flatNo || '',
      residencyName: item.residencyName || '',
      address: item.address || '',
    });
    setEditId(item.id);
    setIsEditMode(true);
    setActiveTab('form');
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this possession letter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const headers = await getAuthHeaders();
              await axios.delete(`${BASE_URL}/PossessionLetter/${id}`, { headers });
              setRefreshKey(refreshKey + 1);
              Alert.alert('Success', 'Possession letter deleted successfully');
            } catch (error) {
              console.error('Error deleting possession letter:', error);
              Alert.alert('Error', 'Failed to delete possession letter');
            }
          },
        },
      ]
    );
  };

  const handleView = (item) => {
    setSelectedLetter(item);
  };

  const generatePDF = async (data) => {
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
        
        <h3 class="letter-title">Possession Letter</h3>
        
        <div class="letter-details">
          <div class="recipient-info">
            <p><strong>From:</strong> ${data.fromName}</p>
            <p><strong>To:</strong> Mr./Mrs./Ms. ${data.toName}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-GB')}</p>
          </div>
          
          <div class="letter-content">
            <p>Dear Sir/Madam,</p>
            <p>I, the undersigned, Mr./Mrs./Ms. <strong>${data.name}</strong>, state that I have transferred my above flat to you, Mr./Mrs./Ms. <strong>${data.toName}</strong>, and have since received full payment towards the transfer of Flat <strong>${data.flatNo}</strong> and Shares of Society. Since, <strong>${data.address}</strong>, <strong>${data.residencyName}</strong>, I have received full payment from you, I relinquish my rights for the above flat and hand over possession of the same, and you are at liberty to use and/or to sell, transfer, sublet at your will as you may wish within the rules and regulations of the society, and I will have no objection or rights for the said flat.</p>
            <p>We wish you all the best for your new residence.</p>
            <p>Yours faithfully,</p>
            <div class="signature">
              <p>For AG Construction</p>
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
        await Sharing.shareAsync(uri, { dialogTitle: `Possession_letter_${data.name}.pdf` });
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
    const fetchPossessionLetters = async () => {
      try {
        setLoading(true);
        const headers = await getAuthHeaders();
        const response = await axios.get(`${BASE_URL}/PossessionLetter`, { headers });
        const sortedData = [...response.data].sort((a, b) => b.id - a.id);
        setPossessionLetters(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error('Error fetching possession letters:', error);
        Alert.alert('Error', 'Failed to fetch possession letters');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchPossessionLetters();
  }, [refreshKey]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(possessionLetters);
    } else {
      const filtered = possessionLetters.filter(
        (letter) =>
          letter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          letter.toName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          letter.residencyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, possessionLetters]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formFields = [
    { label: 'From', key: 'fromName' },
    { label: 'Date', key: 'date', type: 'date' },
    { label: 'To Name', key: 'toName' },
    { label: 'Name', key: 'name' },
    { label: 'Flat Number', key: 'flatNo', keyboardType: 'numeric' },
    { label: 'Residency Name', key: 'residencyName' },
    { label: 'Address', key: 'address', multiline: true },
  ];

  const renderInput = (field, index) => {
    const isFocused = focusedInput === field.key;

    return (
      <View key={index} style={styles.inputGroup}>
        <Text style={styles.label}>{field.label}<Text style={styles.required}>*</Text></Text>
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
            autoCapitalize={field.autoCapitalize || 'none'}
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
        <Text style={styles.label}>{field.label}<Text style={styles.required}>*</Text></Text>
        <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker({ field: field.key, visible: true })}
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
            value={formData[field.key]}
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

  const renderLetterItem = ({ item, index }) => (
    <View style={styles.slipCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.cardHeaderContent}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardPosition}>{item.residencyName}</Text>
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
          <Text style={styles.detailText}>From: {item.fromName}</Text>
          <Text style={styles.detailText}>To: {item.toName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Flat No: {item.flatNo}</Text>
          <Text style={styles.detailText}>Date: {new Date(item.date).toLocaleDateString('en-GB')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
            Address: {item.address}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#6A5ACD" />
          <Text style={styles.emptyText}>Loading possession letters...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Feather name="file-text" size={60} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No possession letters found</Text>
        <Text style={styles.emptyText}>
          {searchQuery ? 'Try a different search term' : 'Create your first possession letter to get started'}
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
        <Text style={styles.formTitle}>AG Construction Possession Letter Form</Text>
        {formFields.map((field, index) =>
          field.type === 'date' ? renderDateField(field) : renderInput(field, index)
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#6A5ACD', '#483D8B', '#191970']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {isEditMode ? 'Update Possession Letter' : 'Generate Possession Letter'}
            </Text>
            <Feather name="send" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderListView = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.listTitle}>All Possession Letters</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6A5ACD" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, to name, or residency..."
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

          <Text style={styles.letterTitle}>Possession Letter</Text>

          <View style={styles.employeeInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>From:</Text> {selectedLetter.fromName}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>To:</Text> Mr./Mrs./Ms. {selectedLetter.toName}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Date:</Text> {formatDate(new Date(selectedLetter.date))}
            </Text>
          </View>

          <View style={styles.letterContent}>
            <Text style={styles.infoText}>Dear Sir/Madam,</Text>
            <Text style={styles.infoText}>
              I, the undersigned, Mr./Mrs./Ms. <Text style={styles.boldText}>{selectedLetter.name}</Text>,
              state that I have transferred my above flat to you, Mr./Mrs./Ms.{' '}
              <Text style={styles.boldText}>{selectedLetter.toName}</Text>, and have since received
              full payment towards the transfer of Flat{' '}
              <Text style={styles.boldText}>{selectedLetter.flatNo}</Text> and Shares of Society.
              Since, <Text style={styles.boldText}>{selectedLetter.address}</Text>,{' '}
              <Text style={styles.boldText}>{selectedLetter.residencyName}</Text>, I have received
              full payment from you, I relinquish my rights for the above flat and hand over
              possession of the same, and you are at liberty to use and/or to sell, transfer,
              sublet at your will as you may wish within the rules and regulations of the society,
              and I will have no objection or rights for the said flat.
            </Text>
            <Text style={styles.infoText}>We wish you all the best for your new residence.</Text>
            <Text style={styles.infoText}>Yours faithfully,</Text>
            <Text style={[styles.infoText, styles.signature]}>For AG Construction</Text>
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
            <Text style={styles.headerTitle}>Possession Letter</Text>
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

export default PossessionLetter;