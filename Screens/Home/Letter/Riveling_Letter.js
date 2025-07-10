// import React from 'react'
// import { Text, View } from 'react-native'

// const Riveling_Letter = () => {
//   return (
//     <View>
//       <Text>Riveling_Letter</Text>
//     </View>
//   )
// }

// export default Riveling_Letter







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
// const RelievingLetter = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     currentDate: new Date(),
//     resignationDate: new Date(),
//     lastWorkingDate: new Date(),
//     designation: '',
//     department: '',
//     location: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });
//   const [focusedInput, setFocusedInput] = useState(null);
//   const [showRelievingLetter, setShowRelievingLetter] = useState(false);
//   const [letterData, setLetterData] = useState(null);
//   const [relievingTable, setRelievingTable] = useState([]);
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

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const requiredFields = [
//       'employeeName',
//       'currentDate',
//       'resignationDate',
//       'lastWorkingDate',
//       'designation',
//       'department',
//       'location',
//     ];
//     const isFormComplete = requiredFields.every(
//       (field) => formData[field] && (typeof formData[field] !== 'string' || formData[field].trim())
//     );

//     if (!isFormComplete) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     const payload = {
//       employeeName: formData.employeeName,
//       currentDate: formData.currentDate.toISOString().split('T')[0],
//       resignationDate: formData.resignationDate.toISOString().split('T')[0],
//       lastworkingdate: formData.lastWorkingDate.toISOString().split('T')[0],
//       designation: formData.designation,
//       department: formData.department,
//       location: formData.location,
//     };

//     try {
//       const headers = await getAuthHeaders();
//       if (isEditMode && editId) {
//         await axios.put(`${BASE_URL}/updateRelievingLatter/${editId}`, payload, { headers });
//         Alert.alert('Success', 'Relieving Letter Updated Successfully');
//       } else {
//         await axios.post(`${BASE_URL}/createRelievinglatter`, payload, { headers });
//         Alert.alert('Success', 'Relieving Letter Submitted Successfully');
//       }

//       setFormData({
//         employeeName: '',
//         currentDate: new Date(),
//         resignationDate: new Date(),
//         lastWorkingDate: new Date(),
//         designation: '',
//         department: '',
//         location: '',
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
//       employeeName: item.employeeName || '',
//       currentDate: item.currentDate ? new Date(item.currentDate) : new Date(),
//       resignationDate: item.resignationDate ? new Date(item.resignationDate) : new Date(),
//       lastWorkingDate: item.lastworkingdate ? new Date(item.lastworkingdate) : new Date(),
//       designation: item.designation || '',
//       department: item.department || '',
//       location: item.location || '',
//     });
//     setEditId(item.id);
//     setIsEditMode(true);
//     setShowActionMenu(null);
//     setActiveTab('form'); // Switch to form view for editing
//   };

//   const handleDelete = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this relieving letter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const headers = await getAuthHeaders();
//               await axios.delete(`${BASE_URL}/deleteRelievingLatter/${id}`, { headers });
//               setRefreshKey(refreshKey + 1);
//               Alert.alert('Success', 'Relieving letter deleted successfully');
//             } catch (error) {
//               console.error('Error deleting relieving letter:', error);
//               Alert.alert('Error', 'Failed to delete relieving letter');
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
//       const response = await axios.get(`${BASE_URL}/getAllRelievingLatterbyid/${id}`, { headers });
//       setLetterData(response.data);
//       setShowRelievingLetter(true);
//       setShowActionMenu(null);
//     } catch (error) {
//       console.error('Error fetching relieving letter:', error);
//       Alert.alert('Error', 'Failed to fetch relieving letter details');
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
//             text-align: center;
//             margin-bottom: 20px;
//           }
//           .content b {
//             font-weight: bold;
//           }
//           .employee-info {
//             display: flex;
//             justify-content: space-between;
//             padding: 20px 0;
//           }
//           .list {
//             margin-left: 22px;
//             margin-bottom: 20px;
//           }
//           .list li {
//             margin-bottom: 5px;
//           }
//           .signature {
//             margin-top: 40px;
//             text-align: left;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <img src="${ag}" alt="ROYAALMEDE" class="logo">
//           <div class="contact-info">
//             <div class="contact-row">
//               <div>
//                 <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole nagar,</p>
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
//           <div class="employee-info">
//             <div>
//               <p>Name: <b>${data.employeeName}</b></p>
//             </div>
//             <p>Date: ${new Date(data.currentDate).toLocaleDateString('en-GB')}</p>
//           </div>
//           <h2>Subject - Relieving Letter Cum Experience Letter</h2>
//           <p>Dear <b>${data.employeeName}</b>,</p>
//           <p>
//             With reference to your resignation dated <b>${new Date(data.resignationDate).toLocaleDateString('en-GB')}</b>,
//             the same has been accepted, and you are relieved from your services w.e.f the close of business hours of
//             <b>${data.lastworkingdate ? new Date(data.lastworkingdate).toLocaleDateString('en-GB') : 'N/A'}</b>.
//           </p>
//           <p>The details of your employment with Royaalmede Jan Dhan Multi Urban Nidhi LID are as below:</p>
//           <ol class="list">
//             <li>Date of Joining: <b>${data.currentDate ? new Date(data.currentDate).toLocaleDateString('en-GB') : 'N/A'}</b></li>
//             <li>Last Working Date: <b>${data.lastworkingdate ? new Date(data.lastworkingdate).toLocaleDateString('en-GB') : 'N/A'}</b></li>
//             <li>Designation: <b>${data.designation}</b></li>
//             <li>Department: <b>${data.department}</b></li>
//             <li>Location: <b>${data.location}</b></li>
//           </ol>
//           <p>We wish you all the best for your future endeavors.</p>
//           <p>Thank you.</p>
//           <p>For Royaalmede Jan Dhan Multi Urban Nidhi LID</p>
//           <div class="signature">
//             <p>Chief Executive Officer</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     try {
//       const { uri } = await Print.printToFileAsync({ html });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, { dialogTitle: `Relieving_letter_${data.employeeName}.pdf` });
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
//     const fetchRelievingLetters = async () => {
//       try {
//         setLoading(true);
//         const headers = await getAuthHeaders();
//         const response = await axios.get(`${BASE_URL}/getAllRelievingLatter`, { headers });
//         const sortedData = [...response.data].sort((a, b) => b.id - a.id);
//         setRelievingTable(sortedData);
//         setFilteredData(sortedData);
//       } catch (error) {
//         console.error('Error fetching relieving letters:', error);
//         Alert.alert('Error', 'Failed to fetch relieving letters');
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     };
//     fetchRelievingLetters();
//   }, [refreshKey]);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredData(relievingTable);
//     } else {
//       const filtered = relievingTable.filter(
//         (letter) =>
//           letter.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           letter.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           letter.department.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchQuery, relievingTable]);

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
//     { label: 'Employee Name', icon: 'person', key: 'employeeName' },
//     { label: 'Current Date', icon: 'event', key: 'currentDate', type: 'date' },
//     { label: 'Resignation Date', icon: 'event', key: 'resignationDate', type: 'date' },
//     { label: 'Last Working Date', icon: 'event', key: 'lastWorkingDate', type: 'date' },
//     { label: 'Designation', icon: 'work', key: 'designation' },
//     { label: 'Department', icon: 'business', key: 'department' },
//     { label: 'Location', icon: 'location-on', key: 'location' },
//   ];

//   const renderRelievingItem = ({ item, index }) => (
//     <TouchableOpacity
//       style={[styles.offerCard, index % 2 === 0 ? styles.evenCard : styles.oddCard]}
//       onPress={() => handleView(item.id)}
//       activeOpacity={0.7}
//     >
//       <View style={styles.cardHeader}>
//         <View style={styles.avatarContainer}>
//           <Text style={styles.avatarText}>{item.employeeName.charAt(0).toUpperCase()}</Text>
//         </View>
//         <View style={styles.cardHeaderContent}>
//           <Text style={styles.cardName}>{item.employeeName}</Text>
//           <Text style={styles.cardPosition}>{item.designation}</Text>
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
//             <Feather name="briefcase" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>{item.department}</Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Feather name="map-pin" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>{item.location}</Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="calendar" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>
//               Created: {new Date(item.currentDate).toLocaleDateString('en-GB')}
//             </Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Feather name="calendar" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>
//               Resignation: {new Date(item.resignationDate).toLocaleDateString('en-GB')}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.detailRow}>
//           <View style={styles.detailItem}>
//             <Feather name="calendar" size={14} color="#6A5ACD" style={styles.detailIcon} />
//             <Text style={styles.detailText}>
//               Last Working: {item.lastworkingdate ? new Date(item.lastworkingdate).toLocaleDateString('en-GB') : 'N/A'}
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
//           <Text style={styles.emptyText}>Loading relieving letters...</Text>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.emptyContainer}>
//         <Feather name="file-text" size={60} color="#d1d5db" />
//         <Text style={styles.emptyTitle}>No relieving letters found</Text>
//         <Text style={styles.emptyText}>
//           {searchQuery ? 'Try a different search term' : 'Create your first relieving letter above'}
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
//           placeholder="Search by name, designation or department..."
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
//           {filteredData.length} {filteredData.length === 1 ? 'relieving letter' : 'relieving letters'}
//         </Text>
//         <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
//           <Feather name="refresh-cw" size={16} color="#6A5ACD" />
//           <Text style={styles.refreshButtonText}>Refresh</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredData}
//         renderItem={renderRelievingItem}
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
//             <Text style={styles.headerTitle}>Relieving Letter</Text>
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
//         visible={showRelievingLetter}
//         onRequestClose={() => setShowRelievingLetter(false)}
//       >
//         <View style={styles.modalContainer}>
//           <BlurView intensity={90} style={styles.modalBlur}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Relieving Letter</Text>
//               <TouchableOpacity
//                 style={styles.closeModalButton}
//                 onPress={() => setShowRelievingLetter(false)}
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
//                               Name: <Text style={styles.boldText}>{letterData.employeeName}</Text>
//                             </Text>
//                           </View>
//                           <Text style={styles.letterText}>
//                             Date: {new Date(letterData.currentDate).toLocaleDateString('en-GB')}
//                           </Text>
//                         </View>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterHeading}>
//                           Subject - Relieving Letter Cum Experience Letter
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           Dear <Text style={styles.boldText}>{letterData.employeeName}</Text>,
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           With reference to your resignation dated{' '}
//                           <Text style={styles.boldText}>
//                             {new Date(letterData.resignationDate).toLocaleDateString('en-GB')}
//                           </Text>, the same has been accepted, and you are relieved from your services
//                           w.e.f the close of business hours of{' '}
//                           <Text style={styles.boldText}>
//                             {letterData.lastworkingdate
//                               ? new Date(letterData.lastworkingdate).toLocaleDateString('en-GB')
//                               : 'N/A'}
//                           </Text>.
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           The details of your employment with Royaalmede Jan Dhan Multi Urban Nidhi LID are as below:
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 10 }]}>
//                         {[
//                           { text: `Date of Joining: ${letterData.currentDate ? new Date(letterData.currentDate).toLocaleDateString('en-GB') : 'N/A'}`, bold: letterData.currentDate ? new Date(letterData.currentDate).toLocaleDateString('en-GB') : 'N/A' },
//                           { text: `Last Working Date: ${letterData.lastworkingdate ? new Date(letterData.lastworkingdate).toLocaleDateString('en-GB') : 'N/A'}`, bold: letterData.lastworkingdate ? new Date(letterData.lastworkingdate).toLocaleDateString('en-GB') : 'N/A' },
//                           { text: `Designation: ${letterData.designation}`, bold: letterData.designation },
//                           { text: `Department: ${letterData.department}`, bold: letterData.department },
//                           { text: `Location: ${letterData.location}`, bold: letterData.location },
//                         ].map((item, index) => (
//                           <View key={index} style={styles.listItem}>
//                             <Text style={styles.letterText}>
//                               {index + 1}. {item.text.replace(item.bold, '')}
//                               <Text style={styles.boldText}>{item.bold}</Text>
//                             </Text>
//                           </View>
//                         ))}
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 20 }]}>
//                         <Text style={styles.letterText}>
//                           We wish you all the best for your future endeavors.
//                         </Text>
//                         <Text style={styles.letterText}>Thank you.</Text>
//                         <Text style={styles.letterText}>
//                           For Royaalmede Jan Dhan Multi Urban Nidhi LID
//                         </Text>
//                       </View>
//                       <View style={[styles.contentRow, { marginTop: 30 }]}>
//                         <Text style={styles.letterText}>Chief Executive Officer</Text>
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
//     textAlign: 'center',
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
//   listItem: {
//     marginBottom: 5,
//     marginLeft: 22,
//   },
// });

// export default RelievingLetter;









import { BASE_URL } from '@/Api/BASE_URL.js'; // Assuming config is set up
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SalarySlip = ({ navigation }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    designation: '',
    department: '',
    monthYear: '',
    paidDays: '',
    uanNo: '',
    bankAccountNo: '',
    dateOfJoining: '',
    basic: '',
    hra: '',
    bonus: '',
    allowance: '',
    pfAmount: '',
    professionalTax: '',
    otherDeductions: '',
    loan: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [salarySlips, setSalarySlips] = useState([]);
  const [editId, setEditId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchSalarySlips = async () => {
    try {
      setRefreshing(true);
      const headers = await getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/salary-slips`, { headers });
      setSalarySlips(response.data);
    } catch (err) {
      console.error('Failed to fetch salary slips:', err);
      Alert.alert('Error', 'Failed to load salary slips.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSalarySlips();
  }, []);

  const handleSubmit = async () => {
    const requiredFields = [
      'employeeId',
      'employeeName',
      'designation',
      'department',
      'monthYear',
      'paidDays',
      'basic',
    ];
    const isFormComplete = requiredFields.every(
      (field) => formData[field] && formData[field].trim()
    );

    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const data = {
      ...formData,
      basic: parseFloat(formData.basic) || 0,
      hra: parseFloat(formData.hra) || 0,
      bonus: parseFloat(formData.bonus) || 0,
      allowance: parseFloat(formData.allowance) || 0,
      pfAmount: parseFloat(formData.pfAmount) || 0,
      professionalTax: parseFloat(formData.professionalTax) || 0,
      otherDeductions: parseFloat(formData.otherDeductions) || 0,
      loan: parseFloat(formData.loan) || 0,
      paidDays: parseInt(formData.paidDays) || 0,
    };

    const payload = {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      designation: data.designation,
      department: data.department,
      month: formatMonthYear(data.monthYear).split(' ')[0],
      year: parseInt(data.monthYear.split('-')[0]),
      paidDays: data.paidDays,
      uanNo: data.uanNo,
      bankAccountNo: data.bankAccountNo,
      dateOfJoining: data.dateOfJoining,
      basic: data.basic,
      hra: data.hra,
      bonus: data.bonus,
      allowance: data.allowance,
      pfAmount: data.pfAmount,
      professionalTax: data.professionalTax,
      otherDeductions: data.otherDeductions,
      loan: data.loan,
    };

    try {
      const headers = await getAuthHeaders();
      if (editId) {
        await axios.put(`${BASE_URL}/salary-slips/${editId}`, payload, { headers });
        Alert.alert('Success', 'Salary slip updated successfully!');
        setEditId(null);
      } else {
        await axios.post(`${BASE_URL}/salary-slips`, payload, { headers });
        Alert.alert('Success', 'Salary slip successfully submitted!');
      }

      setFormData({
        employeeId: '',
        employeeName: '',
        designation: '',
        department: '',
        monthYear: '',
        paidDays: '',
        uanNo: '',
        bankAccountNo: '',
        dateOfJoining: '',
        basic: '',
        hra: '',
        bonus: '',
        allowance: '',
        pfAmount: '',
        professionalTax: '',
        otherDeductions: '',
        loan: '',
      });
      fetchSalarySlips();
      setSubmittedData(null);
      setActiveTab('list');
    } catch (err) {
      console.error('Failed to submit/update salary slip:', err);
      Alert.alert('Error', 'Operation failed. Please try again.');
    }
  };

  const handleEditSlip = (slip) => {
    setEditId(slip.id);
    setFormData({
      employeeId: slip.employeeId,
      employeeName: slip.employeeName,
      designation: slip.designation,
      department: slip.department,
      monthYear: `${slip.year}-${String(
        new Date(`${slip.month} 1, ${slip.year}`).getMonth() + 1
      ).padStart(2, '0')}`,
      paidDays: slip.paidDays.toString(),
      uanNo: slip.uanNo || '',
      bankAccountNo: slip.bankAccountNo || '',
      dateOfJoining: slip.dateOfJoining ? slip.dateOfJoining.slice(0, 10) : '',
      basic: slip.basic.toString(),
      hra: slip.hra.toString(),
      bonus: slip.bonus.toString(),
      allowance: slip.allowance.toString(),
      pfAmount: slip.pfAmount.toString(),
      professionalTax: slip.professionalTax.toString(),
      otherDeductions: slip.otherDeductions.toString(),
      loan: slip.loan.toString(),
    });
    setActiveTab('form');
  };

  const handleDeleteSlip = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this salary slip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const headers = await getAuthHeaders();
              await axios.delete(`${BASE_URL}/salary-slips/${id}`, { headers });
              Alert.alert('Success', 'Deleted successfully');
              fetchSalarySlips();
            } catch (error) {
              console.error('Error deleting salary slip:', error);
              Alert.alert('Error', 'Failed to delete salary slip');
            }
          },
        },
      ]
    );
  };

  const handleDownloadPDF = async (data) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
          }
          .subtitle {
            font-size: 18px;
            color: #6A5ACD;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #483D8B;
          }
          .info-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .info-item {
            width: 48%;
            margin-bottom: 10px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table th, .table td {
            border: 1px solid #e5e7eb;
            padding: 8px;
            text-align: left;
          }
          .table th {
            background-color: #f3f4f6;
            font-weight: bold;
          }
          .total {
            font-weight: bold;
            background-color: #f9fafb;
          }
          .net-salary {
            font-size: 18px;
            font-weight: bold;
            color: #6A5ACD;
            text-align: right;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">AG Construction</h1>
          <h2 class="subtitle">Salary Slip</h2>
          <p>Month: ${data.month}</p>
        </div>
        <div class="section">
          <div class="info-grid">
            <div class="info-item"><strong>Employee Name:</strong> ${data.employeeName}</div>
            <div class="info-item"><strong>Employee ID:</strong> ${data.employeeId}</div>
            <div class="info-item"><strong>Designation:</strong> ${data.designation}</div>
            <div class="info-item"><strong>Department:</strong> ${data.department}</div>
            <div class="info-item"><strong>Paid Days:</strong> ${data.paidDays}</div>
            <div class="info-item"><strong>UAN No.:</strong> ${data.uanNo || 'N/A'}</div>
            <div class="info-item"><strong>Bank Account No.:</strong> ${data.bankAccountNo || 'N/A'}</div>
            <div class="info-item"><strong>Date of Joining:</strong> ${formatDate(data.dateOfJoining)}</div>
          </div>
        </div>
        <div class="section">
          <div style="display: flex; justify-content: space-between;">
            <div style="width: 48%;">
              <div class="section-title">Earnings</div>
              <table class="table">
                <tbody>
                  <tr><td>Basic Salary</td><td>${formatCurrency(data.basic)}</td></tr>
                  <tr><td>HRA</td><td>${formatCurrency(data.hra)}</td></tr>
                  <tr><td>Conveyance</td><td>${formatCurrency(data.allowance)}</td></tr>
                  <tr><td>Bonus</td><td>${formatCurrency(data.bonus)}</td></tr>
                  <tr class="total"><td>Total Earnings</td><td>${formatCurrency(calculateTotalAddition(data))}</td></tr>
                </tbody>
              </table>
            </div>
            <div style="width: 48%;">
              <div class="section-title">Deductions</div>
              <table class="table">
                <tbody>
                  <tr><td>Provident Fund</td><td>${formatCurrency(data.pfAmount)}</td></tr>
                  <tr><td>Professional Tax</td><td>${formatCurrency(data.professionalTax)}</td></tr>
                  <tr><td>Other Deductions</td><td>${formatCurrency(data.otherDeductions)}</td></tr>
                  <tr><td>Loan</td><td>${formatCurrency(data.loan)}</td></tr>
                  <tr class="total"><td>Total Deductions</td><td>${formatCurrency(calculateTotalDeductions(data))}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="net-salary">
          <p>Net Salary: ${formatCurrency(calculateNetSalary(data))}</p>
        </div>
        <div class="footer">
          <p>Generated by AG Construction</p>
          <p>Date: ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: `Salary_Slip_${data.employeeId}_${data.month}.pdf`,
        });
        Alert.alert('Success', 'PDF generated and ready to share!');
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const calculateTotalAddition = (data) =>
    data ? data.basic + data.hra + data.bonus + data.allowance : 0;

  const calculateTotalDeductions = (data) =>
    data
      ? data.pfAmount + data.professionalTax + data.otherDeductions + data.loan
      : 0;

  const calculateNetSalary = (data) =>
    data ? calculateTotalAddition(data) - calculateTotalDeductions(data) : 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  const formatMonthYear = (monthYear) => {
    if (!monthYear) return 'N/A';
    const [year, month] = monthYear.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString('en-IN') : 'N/A';

  const handleMonthChange = (event, selectedDate) => {
    setShowMonthPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      handleChange('monthYear', `${year}-${month}`);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      handleChange('dateOfJoining', `${year}-${month}-${day}`);
    }
  };

  const formFields = [
    { label: 'Employee ID', key: 'employeeId', required: true },
    { label: 'Employee Name', key: 'employeeName', required: true },
    { label: 'Designation', key: 'designation', required: true },
    { label: 'Department', key: 'department', required: true },
    { label: 'Month & Year', key: 'monthYear', type: 'month', required: true },
    { label: 'Paid Days', key: 'paidDays', type: 'number', required: true },
    { label: 'UAN No.', key: 'uanNo' },
    { label: 'Bank Account No.', key: 'bankAccountNo' },
    { label: 'Date of Joining', key: 'dateOfJoining', type: 'date' },
    { label: 'Basic Salary (₹)', key: 'basic', type: 'number', required: true },
    { label: 'HRA (₹)', key: 'hra', type: 'number' },
    { label: 'Bonus (₹)', key: 'bonus', type: 'number' },
    { label: 'Conveyance Allowance (₹)', key: 'allowance', type: 'number' },
    { label: 'Provident Fund (₹)', key: 'pfAmount', type: 'number' },
    { label: 'Professional Tax (₹)', key: 'professionalTax', type: 'number' },
    { label: 'Other Deductions (₹)', key: 'otherDeductions', type: 'number' },
    { label: 'Loan (₹)', key: 'loan', type: 'number' },
  ];

  const renderInput = (field, index) => {
    if (field.type === 'month') {
      return (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <BlurView intensity={40} style={styles.blurContainer}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowMonthPicker(true)}
            >
              <Text style={styles.inputText}>
                {formData.monthYear || 'Select Month & Year'}
              </Text>
            </TouchableOpacity>
            {showMonthPicker && (
              <DateTimePicker
                value={
                  formData.monthYear
                    ? new Date(formData.monthYear + '-01')
                    : new Date()
                }
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={handleMonthChange}
                maximumDate={new Date()}
              />
            )}
          </BlurView>
        </View>
      );
    }
    if (field.type === 'date') {
      return (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <BlurView intensity={40} style={styles.blurContainer}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.inputText}>
                {formData.dateOfJoining || 'Select Date'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={
                  formData.dateOfJoining
                    ? new Date(formData.dateOfJoining)
                    : new Date()
                }
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </BlurView>
        </View>
      );
    }
    return (
      <View key={index} style={styles.inputGroup}>
        <Text style={styles.label}>{field.label}</Text>
        <BlurView intensity={40} style={styles.blurContainer}>
          <TextInput
            style={styles.input}
            placeholder={field.label}
            value={formData[field.key]}
            onChangeText={(text) => handleChange(field.key, text)}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
            placeholderTextColor="#999"
          />
        </BlurView>
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
        {formFields.map((field, index) => renderInput(field, index))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#6A5ACD', '#483D8B', '#191970']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {editId ? 'Update Salary Slip' : 'Generate Salary Slip'}
            </Text>
            <Feather name="send" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderSlipItem = ({ item }) => (
    <View style={styles.slipCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.employeeName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.cardHeaderContent}>
          <Text style={styles.cardName}>{item.employeeName}</Text>
          <Text style={styles.cardPosition}>{item.designation}</Text>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setSubmittedData(item)}
        >
          <Feather name="eye" size={20} color="#6A5ACD" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditSlip(item)}
        >
          <Feather name="edit" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteSlip(item.id)}
        >
          <Feather name="trash-2" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Employee ID: {item.employeeId}</Text>
          <Text style={styles.detailText}>Department: {item.department}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Month: {item.month}</Text>
          <Text style={styles.detailText}>Year: {item.year}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Paid Days: {item.paidDays}</Text>
        </View>
      </View>
    </View>
  );

  const renderListView = () => (
    <View style={styles.tableContainer}>
      <FlatList
        data={salarySlips}
        renderItem={renderSlipItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="file-text" size={60} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No salary slips found</Text>
            <Text style={styles.emptyText}>Create a new salary slip above</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchSalarySlips}
            colors={['#6A5ACD']}
          />
        }
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );

  const renderSlipView = () => (
    <View style={styles.slipContainer}>
      <ScrollView
        style={styles.slipScroll}
        contentContainerStyle={styles.slipScrollContent}
      >
        <View style={styles.slipContent}>
          <View style={styles.slipHeader}>
            <Text style={styles.slipTitle}>AG Construction</Text>
            <Text style={styles.slipSubtitle}>Salary Slip</Text>
            <Text style={styles.slipMonth}>Month: {submittedData.month}</Text>
          </View>
          <View style={styles.employeeInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Employee Name:</Text> {submittedData.employeeName}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Employee ID:</Text> {submittedData.employeeId}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Designation:</Text> {submittedData.designation}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Department:</Text> {submittedData.department}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Paid Days:</Text> {submittedData.paidDays}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>UAN No.:</Text> {submittedData.uanNo || 'N/A'}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Bank Account No.:</Text> {submittedData.bankAccountNo || 'N/A'}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Date of Joining:</Text> {formatDate(submittedData.dateOfJoining)}
            </Text>
          </View>
          <View style={styles.tablesContainer}>
            <View style={styles.earningsContainer}>
              <Text style={styles.sectionTitle}>Earnings</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Basic Salary</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.basic)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>HRA</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.hra)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Conveyance</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.allowance)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Bonus</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.bonus)}</Text>
                </View>
                <View style={[styles.tableRow, styles.totalRow]}>
                  <Text style={[styles.tableCell, styles.boldText]}>Total Earnings</Text>
                  <Text style={[styles.tableCell, styles.boldText]}>
                    {formatCurrency(calculateTotalAddition(submittedData))}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.deductionsContainer}>
              <Text style={styles.sectionTitle}>Deductions</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Provident Fund</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.pfAmount)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Professional Tax</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.professionalTax)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Other Deductions</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.otherDeductions)}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>Loan</Text>
                  <Text style={styles.tableCell}>{formatCurrency(submittedData.loan)}</Text>
                </View>
                <View style={[styles.tableRow, styles.totalRow]}>
                  <Text style={[styles.tableCell, styles.boldText]}>Total Deductions</Text>
                  <Text style={[styles.tableCell, styles.boldText]}>
                    {formatCurrency(calculateTotalDeductions(submittedData))}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.netSalaryContainer}>
            <Text style={styles.netSalaryText}>
              <Text style={styles.boldText}>Net Salary:</Text> {formatCurrency(calculateNetSalary(submittedData))}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Generated by AG Construction</Text>
            <Text style={styles.footerText}>Date: {new Date().toLocaleDateString('en-IN')}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => handleDownloadPDF(submittedData)}
      >
        <LinearGradient
          colors={['#6A5ACD', '#483D8B', '#191970']}
          style={styles.downloadButtonGradient}
        >
          <Text style={styles.downloadButtonText}>Download PDF</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

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
            <Text style={styles.headerTitle}>Salary Slip</Text>
            <View style={styles.spacer} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'form' && styles.activeTabButton]}
              onPress={() => setActiveTab('form')}
            >
              <Feather
                name="edit"
                size={18}
                color={activeTab === 'form' ? '#6A5ACD' : '#6b7280'}
              />
              <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
                {editId ? 'Edit Slip' : 'New Slip'}
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
                All Slips
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <BlurView intensity={20} style={styles.cardBlur}>
              <View style={styles.card}>
                {activeTab === 'form' ? renderFormView() : submittedData ? renderSlipView() : renderListView()}
              </View>
            </BlurView>
          </View>
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
  blurContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: 'rgba(248,249,250,0.7)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
  },
  inputText: {
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
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
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
  actionButton: {
    padding: 8,
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
  slipHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  slipTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  slipSubtitle: {
    fontSize: 18,
    color: '#6A5ACD',
    marginTop: 5,
  },
  slipMonth: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 5,
  },
  employeeInfo: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  tablesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  earningsContainer: {
    width: '48%',
  },
  deductionsContainer: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#483D8B',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  totalRow: {
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    fontSize: 14,
    color: '#4b5563',
  },
  netSalaryContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  netSalaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A5ACD',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
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
  downloadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SalarySlip;