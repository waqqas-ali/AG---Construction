// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     FlatList,
//     RefreshControl,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');
// const isTablet = screenWidth >= 768;

// const LeadManagement = ({ navigation }) => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getAllLeads`, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });
//       setLeads(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//       Alert.alert('Error', 'Failed to fetch leads. Please try again.');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchLeads();
//     setRefreshing(false);
//   };

//   const handleAddLead = () => {
//     navigation.navigate('Add_Edit_Lead');
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'SUCCESS':
//         return { bg: '#E8F5E8', text: '#2E7D32', border: '#4CAF50' };
//       case 'PENDING':
//         return { bg: '#FFF8E1', text: '#F57C00', border: '#FF9800' };
//       default:
//         return { bg: '#FFEBEE', text: '#C62828', border: '#F44336' };
//     }
//   };

//   const renderLeadCard = ({ item, index }) => {
//     const statusColors = getStatusColor(item.status);
    
//     return (
//       <View style={[
//         styles.card,
//         isTablet && styles.cardTablet,
//         { marginTop: index === 0 ? 0 : 16 }
//       ]}>
//         {/* Card Header */}
//         <View style={styles.cardHeader}>
//           <View style={styles.nameContainer}>
//             <Text style={styles.name} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <Text style={styles.company} numberOfLines={1}>
//               {item.companyName}
//             </Text>
//           </View>
//           <View style={[
//             styles.statusBadge,
//             { 
//               backgroundColor: statusColors.bg,
//               borderColor: statusColors.border,
//             }
//           ]}>
//             <Text style={[styles.statusText, { color: statusColors.text }]}>
//               {item.status}
//             </Text>
//           </View>
//         </View>

//         {/* Card Content */}
//         <View style={styles.cardContent}>
//           <View style={styles.detailRow}>
//             <Ionicons name="briefcase-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.jobTitle}</Text>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Ionicons name="mail-outline" size={16} color="#666" />
//             <Text style={styles.detailText} numberOfLines={1}>
//               {item.email}
//             </Text>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Ionicons name="call-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.phoneNumber}</Text>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Ionicons name="location-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.foundOn}</Text>
//           </View>
          
//           {item.remark && (
//             <View style={styles.remarkContainer}>
//               <Text style={styles.remarkText} numberOfLines={2}>
//                 {item.remark}
//               </Text>
//               <Text style={styles.remarkDate}>{item.remarkdate}</Text>
//             </View>
//           )}
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionContainer}>
//           <View style={styles.primaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => Alert.alert('Steps', `View steps for ${item.name}`)}
//             >
//               <Ionicons name="list-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>Steps</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => Alert.alert('View', `View details for ${item.name}`)}
//             >
//               <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>View</Text>
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.secondaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => navigation.navigate('Add_Edit_Lead', { id: item.id })}
//             >
//               <Ionicons name="create-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Edit</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => Alert.alert('Add Review', `Add review for ${item.name}`)}
//             >
//               <Ionicons name="star-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Review</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.actionButton, styles.deleteButton]}
//               onPress={() => Alert.alert('Delete', `Delete lead ${item.name}?`)}
//             >
//               <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyState}>
//       <Ionicons name="people-outline" size={64} color="#CCC" />
//       <Text style={styles.emptyTitle}>No Leads Found</Text>
//       <Text style={styles.emptySubtitle}>
//         Start by adding your first lead to get started
//       </Text>
//       <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead}>
//         <Text style={styles.emptyButtonText}>Add First Lead</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.title}>Lead Management</Text>
//           <Text style={styles.subtitle}>
//             {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLead}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.loadingText}>Loading leads...</Text>
//         </View>
//       ) : leads.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={leads}
//           renderItem={renderLeadCard}
//           keyExtractor={(item) => item.email}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#007AFF']}
//               tintColor="#007AFF"
//             />
//           }
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   listContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 4,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//   },
//   cardTablet: {
//     maxWidth: isTablet ? screenWidth * 0.8 : '100%',
//     alignSelf: 'center',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   nameContainer: {
//     flex: 1,
//     marginRight: 12,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   company: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   statusBadge: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   cardContent: {
//     marginBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 12,
//     flex: 1,
//   },
//   remarkContainer: {
//     backgroundColor: '#F8F9FA',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#007AFF',
//   },
//   remarkText: {
//     fontSize: 14,
//     color: '#333',
//     fontStyle: 'italic',
//     marginBottom: 4,
//   },
//   remarkDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   actionContainer: {
//     gap: 12,
//   },
//   primaryActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   secondaryActions: {
//     flexDirection: 'row',
//     gap: 8,
//     flexWrap: 'wrap',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     gap: 6,
//     minWidth: 80,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     flex: 1,
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     flex: 1,
//   },
//   secondaryButtonText: {
//     color: '#007AFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   deleteButton: {
//     backgroundColor: '#FF3B30',
//     flex: 1,
//   },
//   deleteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     gap: 16,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   emptyButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   emptyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default LeadManagement;







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     FlatList,
//     Modal,
//     Platform,
//     RefreshControl,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');
// const isTablet = screenWidth >= 768;

// const LeadManagement = ({ navigation }) => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedStatus, setSelectedStatus] = useState('FOLLOW_UP');
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getAllLeads`, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });
//       setLeads(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//       Alert.alert('Error', 'Failed to fetch leads. Please try again.');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchLeads();
//     setRefreshing(false);
//   };

//   const handleAddLead = () => {
//     navigation.navigate('Add_Edit_Lead');
//   };

//   const handleStepsPress = (lead) => {
//     setSelectedLead(lead);
//     setSelectedDate(new Date());
//     setSelectedStatus('FOLLOW_UP');
//     setModalVisible(true);
//   };

//   const handleSaveStep = async () => {
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       await axios.post(
//         `${BASE_URL}/updateLeadStatus`,
//         {
//           leadId: selectedLead.id,
//           status: selectedStatus,
//           date: selectedDate.toISOString(),
//         },
//         {
//           headers: { Authorization: `Bearer ${jwtToken}` },
//         }
//       );
//       setModalVisible(false);
//       fetchLeads(); // Refresh leads after update
//       Alert.alert('Success', 'Lead status updated successfully');
//     } catch (error) {
//       console.error('Error updating lead status:', error);
//       Alert.alert('Error', 'Failed to update lead status. Please try again.');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'SUCCESS':
//         return { bg: '#E8F5E8', text: '#2E7D32', border: '#4CAF50' };
//       case 'PENDING':
//         return { bg: '#FFF8E1', text: '#F57C00', border: '#FF9800' };
//       default:
//         return { bg: '#FFEBEE', text: '#C62828', border: '#F44336' };
//     }
//   };

//   const renderLeadCard = ({ item, index }) => {
//     const statusColors = getStatusColor(item.status);
    
//     return (
//       <View style={[
//         styles.card,
//         isTablet && styles.cardTablet,
//         { marginTop: index === 0 ? 0 : 16 }
//       ]}>
//         <View style={styles.cardHeader}>
//           <View style={styles.nameContainer}>
//             <Text style={styles.name} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <Text style={styles.company} numberOfLines={1}>
//               {item.companyName}
//             </Text>
//           </View>
//           <View style={[
//             styles.statusBadge,
//             { 
//               backgroundColor: statusColors.bg,
//               borderColor: statusColors.border,
//             }
//           ]}>
//             <Text style={[styles.statusText, { color: statusColors.text }]}>
//               {item.status}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.cardContent}>
//           <View style={styles.detailRow}>
//             <Ionicons name="briefcase-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.jobTitle}</Text>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Ionicons name="mail-outline" size={16} color="#666" />
//             <Text style={styles.detailText} numberOfLines={1}>
//               {item.email}
//             </Text>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Ionicons name="call-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.phoneNumber}</Text>
//           </View>
          
//           <View style={styles.detailRow}>
//             <Ionicons name="location-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.foundOn}</Text>
//           </View>
          
//           {item.remark && (
//             <View style={styles.remarkContainer}>
//               <Text style={styles.remarkText} numberOfLines={2}>
//                 {item.remark}
//               </Text>
//               <Text style={styles.remarkDate}>{item.remarkdate}</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.actionContainer}>
//           <View style={styles.primaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => handleStepsPress(item)}
//             >
//               <Ionicons name="list-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>Steps</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => Alert.alert('View', `View details for ${item.name}`)}
//             >
//               <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>View</Text>
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.secondaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => navigation.navigate('Add_Edit_Lead', { id: item.id })}
//             >
//               <Ionicons name="create-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Edit</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => Alert.alert('Add Review', `Add review for ${item.name}`)}
//             >
//               <Ionicons name="star-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Review</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.actionButton, styles.deleteButton]}
//               onPress={() => Alert.alert('Delete', `Delete lead ${item.name}?`)}
//             >
//               <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyState}>
//       <Ionicons name="people-outline" size={64} color="#CCC" />
//       <Text style={styles.emptyTitle}>No Leads Found</Text>
//       <Text style={styles.emptySubtitle}>
//         Start by adding your first lead to get started
//       </Text>
//       <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead}>
//         <Text style={styles.emptyButtonText}>Add First Lead</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.title}>Lead Management</Text>
//           <Text style={styles.subtitle}>
//             {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLead}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.loadingText}>Loading leads...</Text>
//         </View>
//       ) : leads.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={leads}
//           renderItem={renderLeadCard}
//           keyExtractor={(item) => item.email}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#007AFF']}
//               tintColor="#007AFF"
//             />
//           }
//         />
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>
//                 Update Status for {selectedLead?.name}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.modalContent}>
//               <Text style={styles.modalLabel}>Status</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={selectedStatus}
//                   onValueChange={(itemValue) => setSelectedStatus(itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Follow Up" value="FOLLOW_UP" />
//                   <Picker.Item label="Under Review" value="UNDER_REVIEW" />
//                   <Picker.Item label="Demo" value="DEMO" />
//                   <Picker.Item label="Negotiation" value="NEGOTIATION" />
//                   <Picker.Item label="Success" value="SUCCESS" />
//                   <Picker.Item label="Inactive" value="INACTIVE" />
//                 </Picker>
//               </View>

//               <Text style={styles.modalLabel}>Date</Text>
//               <TouchableOpacity
//                 style={styles.dateButton}
//                 onPress={() => setShowDatePicker(true)}
//               >
//                 <Text style={styles.dateButtonText}>
//                   {selectedDate.toLocaleDateString()}
//                 </Text>
//                 <Ionicons name="calendar-outline" size={20} color="#007AFF" />
//               </TouchableOpacity>

//               {showDatePicker && (
//                 <DateTimePicker
//                   value={selectedDate}
//                   mode="date"
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(event, date) => {
//                     setShowDatePicker(Platform.OS === 'ios');
//                     if (date) setSelectedDate(date);
//                   }}
//                 />
//               )}
//             </View>

//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.saveButton]}
//                 onPress={handleSaveStep}
//               >
//                 <Text style={styles.saveButtonText}>Save</Text>
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
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   listContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 4,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//   },
//   cardTablet: {
//     maxWidth: isTablet ? screenWidth * 0.8 : '100%',
//     alignSelf: 'center',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   nameContainer: {
//     flex: 1,
//     marginRight: 12,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   company: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   statusBadge: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   cardContent: {
//     marginBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 12,
//     flex: 1,
//   },
//   remarkContainer: {
//     backgroundColor: '#F8F9FA',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#007AFF',
//   },
//   remarkText: {
//     fontSize: 14,
//     color: '#333',
//     fontStyle: 'italic',
//     marginBottom: 4,
//   },
//   remarkDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   actionContainer: {
//     gap: 12,
//   },
//   primaryActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   secondaryActions: {
//     flexDirection: 'row',
//     gap: 8,
//     flexWrap: 'wrap',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     gap: 6,
//     minWidth: 80,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     flex: 1,
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     flex: 1,
//   },
//   secondaryButtonText: {
//     color: '#007AFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   deleteButton: {
//     backgroundColor: '#FF3B30',
//     flex: 1,
//   },
//   deleteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     gap: 16,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   emptyButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   emptyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     width: isTablet ? screenWidth * 0.6 : screenWidth * 0.9,
//     maxWidth: 500,
//     padding: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     marginBottom: 20,
//   },
//   modalLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   picker: {
//     height: Platform.OS === 'ios' ? 150 : 50,
//   },
//   dateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   modalActions: {
//     flexDirection: 'row',
//     gap: 12,
//     justifyContent: 'flex-end',
//   },
//   modalButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   saveButton: {
//     backgroundColor: '#007AFF',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default LeadManagement;








// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     FlatList,
//     Modal,
//     Platform,
//     RefreshControl,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');
// const isTablet = screenWidth >= 768;

// const LeadManagement = ({ navigation }) => {
//   const [leads, setLeads] = useState([]);
//   const [filteredLeads, setFilteredLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState('');
//   const [filterLead, setFilterLead] = useState('All');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [reviewModalVisible, setReviewModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [reviewDate, setReviewDate] = useState(new Date());
//   const [reviewRemark, setReviewRemark] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showReviewDatePicker, setShowReviewDatePicker] = useState(false);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   useEffect(() => {
//     const filtered = leads.filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredLeads(
//       filterLead === 'All'
//         ? filtered
//         : filtered.filter((item) => item.status === filterLead)
//     );
//   }, [search, leads, filterLead]);

//   const fetchLeads = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('jwtToken');

//       const response = await axios.get(`${BASE_URL}/getAllLeads`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const sortedLeads = response.data.sort((a, b) => b.id - a.id);
//       setLeads(sortedLeads);
//       setFilteredLeads(
//         filterLead === 'All'
//           ? sortedLeads
//           : sortedLeads.filter((item) => item.status === filterLead)
//       );
//       setLoading(false);

//     } catch (error) {
//       console.error('Error fetching leads:', error);
//       Alert.alert('Error', 'Failed to fetch leads. Please try again.');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchLeads();
//     setRefreshing(false);
//   };

//   const handleAddLead = () => {
//     navigation.navigate('Add_Edit_Lead');
//   };

//   const handleStepsPress = (lead) => {
//     setSelectedLead(lead);
//     setSelectedDate(new Date());
//     setSelectedStatus('');
//     setModalVisible(true);
//   };

//   const handleViewLead = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');

//       const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setSelectedLead(response.data);
//       setDetailModalVisible(true);
//     } catch (error) {
//       console.error('Error fetching lead details:', error);
//       Alert.alert('Error', 'Failed to fetch lead details.');
//     }
//   };

//   const handleDeleteLead = async (id) => {
//     Alert.alert(
//       'Delete Lead',
//       'Are you sure you want to delete this lead? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');

//               await axios.delete(`${BASE_URL}/deleteLead/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               setLeads((prev) => prev.filter((lead) => lead.id !== id));
//               Alert.alert('Success', 'Lead deleted successfully.');
//             } catch (error) {
//               console.error('Error deleting lead:', error);
//               Alert.alert('Error', 'Failed to delete lead.');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleAddReview = (lead) => {
//     setSelectedLead(lead);
//     setReviewDate(new Date());
//     setReviewRemark('');
//     setReviewModalVisible(true);
//   };

//   const handleSaveStep = async () => {
//     if (!selectedStatus) {
//       Alert.alert('Error', 'Please select a status.');
//       return;
//     }
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');

//       const leadLogs = [{
//         logDate: selectedDate.toISOString().split('T')[0],
//         status: selectedStatus,
//       }];

//       await axios.post(
//         `${BASE_URL}/${selectedLead.id}/addLogs`,
//         leadLogs,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setLeads((prevLeads) =>
//         prevLeads.map((lead) =>
//           lead.id === selectedLead.id
//             ? {
//                 ...lead,
//                 status: selectedStatus,
//                 dates: { ...lead.dates, [selectedStatus]: selectedDate.toISOString().split('T')[0] },
//               }
//             : lead
//         )
//       );
//       setModalVisible(false);
//       Alert.alert('Success', 'Lead status updated successfully.');
//     } catch (error) {
//       console.error('Error updating lead:', error);
//       Alert.alert('Error', 'Failed to update lead status.');
//     }
//   };

//   const handleSaveReview = async () => {
//     if (!reviewRemark) {
//       Alert.alert('Error', 'Please enter a remark.');
//       return;
//     }
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//     //   const myToken = token ? JSON.parse(token).token : null;
//     //   if (!myToken) throw new Error('No token found');

//       await axios.post(
//         `${BASE_URL}/remark/${selectedLead.id}/remark`,
//         {
//           remark: reviewRemark,
//           remarkdate: reviewDate.toISOString().split('T')[0],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setReviewModalVisible(false);
//       Alert.alert('Success', 'Review added successfully.');
//       fetchLeads();
//     } catch (error) {
//       console.error('Error adding review:', error);
//       Alert.alert('Error', 'Failed to add review.');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'SUCCESS':
//         return { bg: '#E8F5E8', text: '#2E7D32', border: '#4CAF50' };
//       case 'FOLLOW_UP':
//       case 'UNDER_REVIEW':
//       case 'DEMO':
//       case 'NEGOTIATION':
//         return { bg: '#FFF8E1', text: '#F57C00', border: '#FF9800' };
//       default:
//         return { bg: '#FFEBEE', text: '#C62828', border: '#F44336' };
//     }
//   };

//   const renderLeadCard = ({ item }) => {
//     const statusColors = getStatusColor(item.status);
//     return (
//       <View style={[styles.card, isTablet && styles.cardTablet]}>
//         <View style={styles.cardHeader}>
//           <View style={styles.nameContainer}>
//             <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
//             <Text style={styles.company} numberOfLines={1}>{item.companyName}</Text>
//           </View>
//           <View style={[styles.statusBadge, { backgroundColor: statusColors.bg, borderColor: statusColors.border }]}>
//             <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
//           </View>
//         </View>
//         <View style={styles.cardContent}>
//           <View style={styles.detailRow}>
//             <Ionicons name="briefcase-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.jobTitle}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="mail-outline" size={16} color="#666" />
//             <Text style={styles.detailText} numberOfLines={1}>{item.email}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="call-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.phoneNumber}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="calendar-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>
//               {new Date(item.foundOn).toLocaleDateString('en-GB')}
//             </Text>
//           </View>
//           {item.remark && (
//             <View style={styles.remarkContainer}>
//               <Text style={styles.remarkText} numberOfLines={2}>{item.remark}</Text>
//               <Text style={styles.remarkDate}>
//                 {new Date(item.remarkdate || new Date()).toLocaleDateString('en-GB')}
//               </Text>
//             </View>
//           )}
//         </View>
//         <View style={styles.actionContainer}>
//           <View style={styles.primaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => handleStepsPress(item)}
//             >
//               <Ionicons name="list-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>Steps</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => handleViewLead(item.id)}
//             >
//               <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>View</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.secondaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => navigation.navigate('Add_Edit_Lead', { id: item.id })}
//             >
//               <Ionicons name="create Outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Edit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => handleAddReview(item)}
//             >
//               <Ionicons name="star-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Review</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.deleteButton]}
//               onPress={() => handleDeleteLead(item.id)}
//             >
//               <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyState}>
//       <Ionicons name="people-outline" size={64} color="#CCC" />
//       <Text style={styles.emptyTitle}>No Leads Found</Text>
//       <Text style={styles.emptySubtitle}>Start by adding your first lead to get started</Text>
//       <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead}>
//         <Text style={styles.emptyButtonText}>Add First Lead</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderFilterButtons = () => (
//     <View style={styles.filterContainer}>
//       {['All', 'NEW_LEAD', 'FOLLOW_UP', 'UNDER_REVIEW', 'DEMO', 'NEGOTIATION', 'SUCCESS'].map((status) => (
//         <TouchableOpacity
//           key={status}
//           style={[styles.filterButton, filterLead === status && styles.filterButtonActive]}
//           onPress={() => setFilterLead(status)}
//         >
//           <Text style={[styles.filterButtonText, filterLead === status && styles.filterButtonTextActive]}>
//             {status.replace('_', ' ')}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.title}>Lead Management</Text>
//           <Text style={styles.subtitle}>
//             {filteredLeads.length} {filteredLeads.length === 1 ? 'Lead' : 'Leads'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLead}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search leads..."
//           value={search}
//           onChangeText={setSearch}
//         />
//       </View>

//       {renderFilterButtons()}

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.loadingText}>Loading leads...</Text>
//         </View>
//       ) : filteredLeads.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={filteredLeads}
//           renderItem={renderLeadCard}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#007AFF']}
//               tintColor="#007AFF"
//             />
//           }
//         />
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>
//                 Update Status for {selectedLead?.name}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalLabel}>Status</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={selectedStatus}
//                   onValueChange={(itemValue) => setSelectedStatus(itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Status" value="" />
//                   <Picker.Item label="Follow Up" value="FOLLOW_UP" />
//                   <Picker.Item label="Under Review" value="UNDER_REVIEW" />
//                   <Picker.Item label="Demo" value="DEMO" />
//                   <Picker.Item label="Negotiation" value="NEGOTIATION" />
//                   <Picker.Item label="Success" value="SUCCESS" />
//                   <Picker.Item label="Inactive" value="INACTIVE" />
//                 </Picker>
//               </View>
//               <Text style={styles.modalLabel}>Date</Text>
//               <TouchableOpacity
//                 style={styles.dateButton}
//                 onPress={() => setShowDatePicker(true)}
//               >
//                 <Text style={styles.dateButtonText}>
//                   {selectedDate.toLocaleDateString('en-GB')}
//                 </Text>
//                 <Ionicons name="calendar-outline" size={20} color="#007AFF" />
//               </TouchableOpacity>
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={selectedDate}
//                   mode="date"
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(event, date) => {
//                     setShowDatePicker(Platform.OS === 'ios');
//                     if (date) setSelectedDate(date);
//                   }}
//                 />
//               )}
//             </View>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.saveButton]}
//                 onPress={handleSaveStep}
//               >
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={reviewModalVisible}
//         onRequestClose={() => setReviewModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Review for {selectedLead?.name}</Text>
//               <TouchableOpacity
//                 onPress={() => setReviewModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalLabel}>Review Date</Text>
//               <TouchableOpacity
//                 style={styles.dateButton}
//                 onPress={() => setShowReviewDatePicker(true)}
//               >
//                 <Text style={styles.dateButtonText}>
//                   {reviewDate.toLocaleDateString('en-GB')}
//                 </Text>
//                 <Ionicons name="calendar-outline" size={20} color="#007AFF" />
//               </TouchableOpacity>
//               {showReviewDatePicker && (
//                 <DateTimePicker
//                   value={reviewDate}
//                   mode="date"
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(event, date) => {
//                     setShowReviewDatePicker(Platform.OS === 'ios');
//                     if (date) setReviewDate(date);
//                   }}
//                 />
//               )}
//               <Text style={styles.modalLabel}>Remark</Text>
//               <TextInput
//                 style={styles.reviewInput}
//                 placeholder="Add Remark"
//                 value={reviewRemark}
//                 onChangeText={setReviewRemark}
//                 multiline
//               />
//             </View>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setReviewModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.saveButton]}
//                 onPress={handleSaveReview}
//               >
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={detailModalVisible}
//         onRequestClose={() => setDetailModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Lead Details</Text>
//               <TouchableOpacity
//                 onPress={() => setDetailModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             {selectedLead && (
//               <View style={styles.modalContent}>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Name:</Text> {selectedLead.name}</Text>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Found On:</Text> {new Date(selectedLead.foundOn).toLocaleDateString('en-GB')}</Text>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Job Title:</Text> {selectedLead.jobTitle}</Text>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Email:</Text> {selectedLead.email}</Text>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Phone:</Text> {selectedLead.phoneNumber}</Text>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Company:</Text> {selectedLead.companyName}</Text>
//                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Status:</Text> {selectedLead.status}</Text>
//                 {selectedLead.leadLogs?.length > 0 && (
//                   <View style={styles.logsContainer}>
//                     <Text style={styles.modalLabel}>Lead Logs:</Text>
//                     {selectedLead.leadLogs.map((log) => (
//                       <View key={log.id} style={styles.logItem}>
//                         <Text style={styles.detailText}>
//                           <Text style={styles.detailLabel}>Log Date:</Text> {new Date(log.logDate).toLocaleDateString('en-GB')}
//                         </Text>
//                         <Text style={styles.detailText}>
//                           <Text style={styles.detailLabel}>Status:</Text> {log.status}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//                 {selectedLead.remark && (
//                   <View style={styles.remarkContainer}>
//                     <Text style={styles.modalLabel}>Customer Remark:</Text>
//                     <Text style={styles.detailText}>{selectedLead.remark}</Text>
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Remark Date:</Text> {new Date(selectedLead.remarkdate || new Date()).toLocaleDateString('en-GB')}
//                     </Text>
//                   </View>
//                 )}
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 20,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//     color: '#333',
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     gap: 8,
//     marginBottom: 12,
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   filterButtonActive: {
//     backgroundColor: '#007AFF',
//     borderColor: '#007AFF',
//   },
//   filterButtonText: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '600',
//   },
//   filterButtonTextActive: {
//     color: '#FFFFFF',
//   },
//   listContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 4,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//   },
//   cardTablet: {
//     maxWidth: isTablet ? screenWidth * 0.8 : '100%',
//     alignSelf: 'center',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   nameContainer: {
//     flex: 1,
//     marginRight: 12,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   company: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   statusBadge: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   cardContent: {
//     marginBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 12,
//     flex: 1,
//   },
//   remarkContainer: {
//     backgroundColor: '#F8F9FA',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#007AFF',
//   },
//   remarkText: {
//     fontSize: 14,
//     color: '#333',
//     fontStyle: 'italic',
//     marginBottom: 4,
//   },
//   remarkDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   actionContainer: {
//     gap: 12,
//   },
//   primaryActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   secondaryActions: {
//     flexDirection: 'row',
//     gap: 8,
//     flexWrap: 'wrap',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     gap: 6,
//     minWidth: 80,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     flex: 1,
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     flex: 1,
//   },
//   secondaryButtonText: {
//     color: '#007AFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   deleteButton: {
//     backgroundColor: '#FF3B30',
//     flex: 1,
//   },
//   deleteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     gap: 16,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   emptyButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   emptyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     width: isTablet ? screenWidth * 0.6 : screenWidth * 0.9,
//     maxWidth: 500,
//     padding: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     marginBottom: 20,
//   },
//   modalLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   picker: {
//     height: Platform.OS === 'ios' ? 150 : 50,
//   },
//   dateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   reviewInput: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   modalActions: {
//     flexDirection: 'row',
//     gap: 12,
//     justifyContent: 'flex-end',
//   },
//   modalButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   saveButton: {
//     backgroundColor: '#007AFF',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   logsContainer: {
//     marginTop: 16,
//   },
//   logItem: {
//     marginBottom: 12,
//     paddingLeft: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#007AFF',
//   },
//   detailLabel: {
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
// });

// export default LeadManagement;











// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     FlatList,
//     Modal,
//     Platform,
//     RefreshControl,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const { width: screenWidth } = Dimensions.get('window');
// const isTablet = screenWidth >= 768;

// const LeadManagement = ({ navigation }) => {
//   const [leads, setLeads] = useState([]);
//   const [filteredLeads, setFilteredLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState('');
//   const [filterLead, setFilterLead] = useState('All');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [reviewModalVisible, setReviewModalVisible] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [reviewDate, setReviewDate] = useState(new Date());
//   const [reviewRemark, setReviewRemark] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showReviewDatePicker, setShowReviewDatePicker] = useState(false);

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   useEffect(() => {
//     const filtered = leads.filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredLeads(
//       filterLead === 'All'
//         ? filtered
//         : filtered.filter((item) => item.status === filterLead)
//     );
//   }, [search, leads, filterLead]);

//   const fetchLeads = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('jwtToken');

//       const response = await axios.get(`${BASE_URL}/getAllLeads`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const sortedLeads = response.data.sort((a, b) => b.id - a.id);
//       setLeads(sortedLeads);
//       setFilteredLeads(
//         filterLead === 'All'
//           ? sortedLeads
//           : sortedLeads.filter((item) => item.status === filterLead)
//       );
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching leads:', error);
//       Alert.alert('Error', 'Failed to fetch leads. Please try again.');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchLeads();
//     setRefreshing(false);
//   };

//   const handleAddLead = () => {
//     navigation.navigate('Add_Edit_Lead');
//   };

//   const handleStepsPress = (lead) => {
//     setSelectedLead(lead);
//     setSelectedDate(new Date());
//     setSelectedStatus('');
//     setModalVisible(true);
//   };

//   const handleViewLead = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');

//       const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setSelectedLead(response.data);
//       setDetailModalVisible(true);
//     } catch (error) {
//       console.error('Error fetching lead details:', error);
//       Alert.alert('Error', 'Failed to fetch lead details.');
//     }
//   };

//   const handleDeleteLead = async (id) => {
//     Alert.alert(
//       'Delete Lead',
//       'Are you sure you want to delete this lead? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await AsyncStorage.getItem('jwtToken');

//               await axios.delete(`${BASE_URL}/deleteLead/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               setLeads((prev) => prev.filter((lead) => lead.id !== id));
//               Alert.alert('Success', 'Lead deleted successfully.');
//             } catch (error) {
//               console.error('Error deleting lead:', error);
//               Alert.alert('Error', 'Failed to delete lead.');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleAddReview = (lead) => {
//     setSelectedLead(lead);
//     setReviewDate(new Date());
//     setReviewRemark('');
//     setReviewModalVisible(true);
//   };

//   const handleSaveStep = async () => {
//     if (!selectedStatus) {
//       Alert.alert('Error', 'Please select a status.');
//       return;
//     }
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');

//       const leadLogs = [{
//         logDate: selectedDate.toISOString().split('T')[0],
//         status: selectedStatus,
//       }];

//       await axios.post(
//         `${BASE_URL}/${selectedLead.id}/addLogs`,
//         leadLogs,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setLeads((prevLeads) =>
//         prevLeads.map((lead) =>
//           lead.id === selectedLead.id
//             ? {
//                 ...lead,
//                 status: selectedStatus,
//                 dates: { ...lead.dates, [selectedStatus]: selectedDate.toISOString().split('T')[0] },
//               }
//             : lead
//         )
//       );
//       setModalVisible(false);
//       Alert.alert('Success', 'Lead status updated successfully.');
//     } catch (error) {
//       console.error('Error updating lead:', error);
//       Alert.alert('Error', 'Failed to update lead status.');
//     }
//   };

//   const handleSaveReview = async () => {
//     if (!reviewRemark) {
//       Alert.alert('Error', 'Please enter a remark.');
//       return;
//     }
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');

//       await axios.post(
//         `${BASE_URL}/remark/${selectedLead.id}/remark`,
//         {
//           remark: reviewRemark,
//           remarkdate: reviewDate.toISOString().split('T')[0],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       setReviewModalVisible(false);
//       Alert.alert('Success', 'Review added successfully.');
//       fetchLeads();
//     } catch (error) {
//       console.error('Error adding review:', error);
//       Alert.alert('Error', 'Failed to add review.');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'SUCCESS':
//         return { bg: '#E8F5E8', text: '#2E7D32', border: '#4CAF50' };
//       case 'FOLLOW_UP':
//       case 'UNDER_REVIEW':
//       case 'DEMO':
//       case 'NEGOTIATION':
//         return { bg: '#FFF8E1', text: '#F57C00', border: '#FF9800' };
//       default:
//         return { bg: '#FFEBEE', text: '#C62828', border: '#F44336' };
//     }
//   };

//   const renderLeadCard = ({ item }) => {
//     const statusColors = getStatusColor(item.status);
//     return (
//       <View style={[styles.card, isTablet && styles.cardTablet]}>
//         <View style={styles.cardHeader}>
//           <View style={styles.nameContainer}>
//             <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
//             <Text style={styles.company} numberOfLines={1}>{item.companyName}</Text>
//           </View>
//           <View style={[styles.statusBadge, { backgroundColor: statusColors.bg, borderColor: statusColors.border }]}>
//             <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
//           </View>
//         </View>
//         <View style={styles.cardContent}>
//           <View style={styles.detailRow}>
//             <Ionicons name="briefcase-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.jobTitle}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="mail-outline" size={16} color="#666" />
//             <Text style={styles.detailText} numberOfLines={1}>{item.email}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="call-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>{item.phoneNumber}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Ionicons name="calendar-outline" size={16} color="#666" />
//             <Text style={styles.detailText}>
//               {new Date(item.foundOn).toLocaleDateString('en-GB')}
//             </Text>
//           </View>
//           {item.remark && (
//             <View style={styles.remarkContainer}>
//               <Text style={styles.remarkText} numberOfLines={2}>{item.remark}</Text>
//               <Text style={styles.remarkDate}>
//                 {new Date(item.remarkdate || new Date()).toLocaleDateString('en-GB')}
//               </Text>
//             </View>
//           )}
//         </View>
//         <View style={styles.actionContainer}>
//           <View style={styles.primaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => handleStepsPress(item)}
//             >
//               <Ionicons name="list-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>Steps</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//               onPress={() => handleViewLead(item.id)}
//             >
//               <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.primaryButtonText}>View</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.secondaryActions}>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => navigation.navigate('Add_Edit_Lead', { id: item.id })}
//             >
//               <Ionicons name="create-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Edit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.secondaryButton]}
//               onPress={() => handleAddReview(item)}
//             >
//               <Ionicons name="star-outline" size={16} color="#007AFF" />
//               <Text style={styles.secondaryButtonText}>Review</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.deleteButton]}
//               onPress={() => handleDeleteLead(item.id)}
//             >
//               <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyState}>
//       <Ionicons name="people-outline" size={64} color="#CCC" />
//       <Text style={styles.emptyTitle}>No Leads Found</Text>
//       <Text style={styles.emptySubtitle}>Start by adding your first lead to get started</Text>
//       <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead}>
//         <Text style={styles.emptyButtonText}>Add First Lead</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderFilterButtons = () => (
//     <View style={styles.filterContainer}>
//       {['All', 'NEW_LEAD', 'FOLLOW_UP', 'UNDER_REVIEW', 'DEMO', 'NEGOTIATION', 'SUCCESS'].map((status) => (
//         <TouchableOpacity
//           key={status}
//           style={[styles.filterButton, filterLead === status && styles.filterButtonActive]}
//           onPress={() => setFilterLead(status)}
//         >
//           <Text style={[styles.filterButtonText, filterLead === status && styles.filterButtonTextActive]}>
//             {status.replace('_', ' ')}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.title}>Lead Management</Text>
//           <Text style={styles.subtitle}>
//             {filteredLeads.length} {filteredLeads.length === 1 ? 'Lead' : 'Leads'}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLead}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search leads..."
//           value={search}
//           onChangeText={setSearch}
//         />
//       </View>

//       {renderFilterButtons()}

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.loadingText}>Loading leads...</Text>
//         </View>
//       ) : filteredLeads.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={filteredLeads}
//           renderItem={renderLeadCard}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#007AFF']}
//               tintColor="#007AFF"
//             />
//           }
//         />
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>
//                 Update Status for {selectedLead?.name}
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalLabel}>Status</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={selectedStatus}
//                   onValueChange={(itemValue) => setSelectedStatus(itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Status" value="" />
//                   <Picker.Item label="Follow Up" value="FOLLOW_UP" />
//                   <Picker.Item label="Under Review" value="UNDER_REVIEW" />
//                   <Picker.Item label="Demo" value="DEMO" />
//                   <Picker.Item label="Negotiation" value="NEGOTIATION" />
//                   <Picker.Item label="Success" value="SUCCESS" />
//                   <Picker.Item label="Inactive" value="INACTIVE" />
//                 </Picker>
//               </View>
//               <Text style={styles.modalLabel}>Date</Text>
//               <TouchableOpacity
//                 style={styles.dateButton}
//                 onPress={() => setShowDatePicker(true)}
//               >
//                 <Text style={styles.dateButtonText}>
//                   {selectedDate.toLocaleDateString('en-GB')}
//                 </Text>
//                 <Ionicons name="calendar-outline" size={20} color="#007AFF" />
//               </TouchableOpacity>
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={selectedDate}
//                   mode="date"
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(event, date) => {
//                     setShowDatePicker(Platform.OS === 'ios');
//                     if (date) setSelectedDate(date);
//                   }}
//                 />
//               )}
//             </View>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.saveButton]}
//                 onPress={handleSaveStep}
//               >
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={reviewModalVisible}
//         onRequestClose={() => setReviewModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add Review for {selectedLead?.name}</Text>
//               <TouchableOpacity
//                 onPress={() => setReviewModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalLabel}>Review Date</Text>
//               <TouchableOpacity
//                 style={styles.dateButton}
//                 onPress={() => setShowReviewDatePicker(true)}
//               >
//                 <Text style={styles.dateButtonText}>
//                   {reviewDate.toLocaleDateString('en-GB')}
//                 </Text>
//                 <Ionicons name="calendar-outline" size={20} color="#007AFF" />
//               </TouchableOpacity>
//               {showReviewDatePicker && (
//                 <DateTimePicker
//                   value={reviewDate}
//                   mode="date"
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(event, date) => {
//                     setShowReviewDatePicker(Platform.OS === 'ios');
//                     if (date) setReviewDate(date);
//                   }}
//                 />
//               )}
//               <Text style={styles.modalLabel}>Remark</Text>
//               <TextInput
//                 style={styles.reviewInput}
//                 placeholder="Add Remark"
//                 value={reviewRemark}
//                 onChangeText={setReviewRemark}
//                 multiline
//               />
//             </View>
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setReviewModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.saveButton]}
//                 onPress={handleSaveReview}
//               >
//                 <Text style={styles.saveButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={detailModalVisible}
//         onRequestClose={() => setDetailModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modalContainer, styles.detailModalContainer]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Lead Details: {selectedLead?.name}</Text>
//               <TouchableOpacity
//                 onPress={() => setDetailModalVisible(false)}
//                 style={styles.closeButton}
//               >
//                 <Ionicons name="close" size={24} color="#666" />
//               </TouchableOpacity>
//             </View>
//             {selectedLead && (
//               <View style={styles.modalContent}>
//                 <View style={styles.detailSection}>
//                   <Text style={styles.sectionTitle}>Personal Information</Text>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="person-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Name: </Text>{selectedLead.name}
//                     </Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="briefcase-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Job Title: </Text>{selectedLead.jobTitle}
//                     </Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="business-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Company: </Text>{selectedLead.companyName}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.sectionTitle}>Contact Information</Text>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="mail-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Email: </Text>{selectedLead.email}
//                     </Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="call-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Phone: </Text>{selectedLead.phoneNumber}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.sectionTitle}>Lead Information</Text>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="calendar-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Found On: </Text>
//                       {new Date(selectedLead.foundOn).toLocaleDateString('en-GB')}
//                     </Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Ionicons name="flag-outline" size={20} color="#666" />
//                     <Text style={styles.detailText}>
//                       <Text style={styles.detailLabel}>Status: </Text>{selectedLead.status}
//                     </Text>
//                   </View>
//                 </View>

//                 {selectedLead.leadLogs?.length > 0 && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.sectionTitle}>Lead Logs</Text>
//                     <FlatList
//                       data={selectedLead.leadLogs}
//                       renderItem={({ item: log }) => (
//                         <View style={styles.logItem}>
//                           <View style={styles.detailRow}>
//                             <Ionicons name="calendar-outline" size={20} color="#666" />
//                             <Text style={styles.detailText}>
//                               <Text style={styles.detailLabel}>Log Date: </Text>
//                               {new Date(log.logDate).toLocaleDateString('en-GB')}
//                             </Text>
//                           </View>
//                           <View style={styles.detailRow}>
//                             <Ionicons name="flag-outline" size={20} color="#666" />
//                             <Text style={styles.detailText}>
//                               <Text style={styles.detailLabel}>Status: </Text>{log.status}
//                             </Text>
//                           </View>
//                         </View>
//                       )}
//                       keyExtractor={(log) => log.id.toString()}
//                       style={styles.logsContainer}
//                     />
//                   </View>
//                 )}

//                 {selectedLead.remark && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.sectionTitle}>Customer Remark</Text>
//                     <View style={styles.remarkContainer}>
//                       <Text style={styles.remarkText}>{selectedLead.remark}</Text>
//                       <Text style={styles.remarkDate}>
//                         <Text style={styles.detailLabel}>Remark Date: </Text>
//                         {new Date(selectedLead.remarkdate || new Date()).toLocaleDateString('en-GB')}
//                       </Text>
//                     </View>
//                   </View>
//                 )}
//               </View>
//             )}
//             <View style={styles.modalActions}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setDetailModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Close</Text>
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
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 20,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//     color: '#333',
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     gap: 8,
//     marginBottom: 12,
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   filterButtonActive: {
//     backgroundColor: '#007AFF',
//     borderColor: '#007AFF',
//   },
//   filterButtonText: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '600',
//   },
//   filterButtonTextActive: {
//     color: '#FFFFFF',
//   },
//   listContainer: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 4,
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//   },
//   cardTablet: {
//     maxWidth: isTablet ? screenWidth * 0.8 : '100%',
//     alignSelf: 'center',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   nameContainer: {
//     flex: 1,
//     marginRight: 12,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   company: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   statusBadge: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   cardContent: {
//     marginBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   detailText: {
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 12,
//     flex: 1,
//   },
//   remarkContainer: {
//     backgroundColor: '#F8F9FA',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#007AFF',
//   },
//   remarkText: {
//     fontSize: 14,
//     color: '#333',
//     fontStyle: 'italic',
//     marginBottom: 4,
//   },
//   remarkDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   actionContainer: {
//     gap: 12,
//   },
//   primaryActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   secondaryActions: {
//     flexDirection: 'row',
//     gap: 8,
//     flexWrap: 'wrap',
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     gap: 6,
//     minWidth: 80,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     flex: 1,
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     flex: 1,
//   },
//   secondaryButtonText: {
//     color: '#007AFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   deleteButton: {
//     backgroundColor: '#FF3B30',
//     flex: 1,
//   },
//   deleteButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//     gap: 16,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   emptyButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     marginTop: 8,
//   },
//   emptyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     width: isTablet ? screenWidth * 0.6 : screenWidth * 0.9,
//     maxWidth: 500,
//     padding: 20,
//   },
//   detailModalContainer: {
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     flex: 1,
//   },
//   closeButton: {
//     padding: 8,
//   },
//   modalContent: {
//     marginBottom: 20,
//   },
//   modalLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   picker: {
//     height: Platform.OS === 'ios' ? 150 : 50,
//   },
//   dateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   reviewInput: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   modalActions: {
//     flexDirection: 'row',
//     gap: 12,
//     justifyContent: 'flex-end',
//   },
//   modalButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   saveButton: {
//     backgroundColor: '#007AFF',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   logsContainer: {
//     marginTop: 16,
//     maxHeight: 150,
//   },
//   logItem: {
//     marginBottom: 12,
//     paddingLeft: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: '#007AFF',
//   },
//   detailLabel: {
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   detailSection: {
//     marginBottom: 20,
//     padding: 12,
//     backgroundColor: '#F8F9FA',
//     borderRadius: 8,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 12,
//   },
// });

// export default LeadManagement;







// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import DateTimePicker from "@react-native-community/datetimepicker"
// import { Picker } from "@react-native-picker/picker"
// import axios from "axios"
// import { BlurView } from "expo-blur"
// import { useEffect, useState } from "react"
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     FlatList,
//     Modal,
//     Platform,
//     RefreshControl,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native"

// const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
// const isTablet = screenWidth >= 768
// const isLargeScreen = screenWidth >= 1024

// const LeadManagement = ({ navigation }) => {
//   const [leads, setLeads] = useState([])
//   const [filteredLeads, setFilteredLeads] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [search, setSearch] = useState("")
//   const [filterLead, setFilterLead] = useState("All")
//   const [modalVisible, setModalVisible] = useState(false)
//   const [reviewModalVisible, setReviewModalVisible] = useState(false)
//   const [detailModalVisible, setDetailModalVisible] = useState(false)
//   const [selectedLead, setSelectedLead] = useState(null)
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   const [selectedStatus, setSelectedStatus] = useState("")
//   const [reviewDate, setReviewDate] = useState(new Date())
//   const [reviewRemark, setReviewRemark] = useState("")
//   const [showDatePicker, setShowDatePicker] = useState(false)
//   const [showReviewDatePicker, setShowReviewDatePicker] = useState(false)

//   useEffect(() => {
//     fetchLeads()
//   }, [])

//   useEffect(() => {
//     const filtered = leads.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
//     setFilteredLeads(filterLead === "All" ? filtered : filtered.filter((item) => item.status === filterLead))
//   }, [search, leads, filterLead])

//   const fetchLeads = async () => {
//     try {
//       setLoading(true)
//       const token = await AsyncStorage.getItem("jwtToken")
//       const response = await axios.get(`${BASE_URL}/getAllLeads`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       const sortedLeads = response.data.sort((a, b) => b.id - a.id)
//       setLeads(sortedLeads)
//       setFilteredLeads(filterLead === "All" ? sortedLeads : sortedLeads.filter((item) => item.status === filterLead))
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching leads:", error)
//       Alert.alert("Error", "Failed to fetch leads. Please try again.")
//       setLoading(false)
//     }
//   }

//   const onRefresh = async () => {
//     setRefreshing(true)
//     await fetchLeads()
//     setRefreshing(false)
//   }

//   const handleAddLead = () => {
//     navigation.navigate("Add_Edit_Lead")
//   }

//   const handleStepsPress = (lead) => {
//     setSelectedLead(lead)
//     setSelectedDate(new Date())
//     setSelectedStatus("")
//     setModalVisible(true)
//   }

//   const handleViewLead = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       setSelectedLead(response.data)
//       setDetailModalVisible(true)
//     } catch (error) {
//       console.error("Error fetching lead details:", error)
//       Alert.alert("Error", "Failed to fetch lead details.")
//     }
//   }

//   const handleDeleteLead = async (id) => {
//     Alert.alert("Delete Lead", "Are you sure you want to delete this lead? This action cannot be undone.", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const token = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/deleteLead/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             })
//             setLeads((prev) => prev.filter((lead) => lead.id !== id))
//             Alert.alert("Success", "Lead deleted successfully.")
//           } catch (error) {
//             console.error("Error deleting lead:", error)
//             Alert.alert("Error", "Failed to delete lead.")
//           }
//         },
//       },
//     ])
//   }

//   const handleAddReview = (lead) => {
//     setSelectedLead(lead)
//     setReviewDate(new Date())
//     setReviewRemark("")
//     setReviewModalVisible(true)
//   }

//   const handleSaveStep = async () => {
//     if (!selectedStatus) {
//       Alert.alert("Error", "Please select a status.")
//       return
//     }
//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       const leadLogs = [
//         {
//           logDate: selectedDate.toISOString().split("T")[0],
//           status: selectedStatus,
//         },
//       ]
//       await axios.post(`${BASE_URL}/${selectedLead.id}/addLogs`, leadLogs, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       setLeads((prevLeads) =>
//         prevLeads.map((lead) =>
//           lead.id === selectedLead.id
//             ? {
//                 ...lead,
//                 status: selectedStatus,
//                 dates: {
//                   ...lead.dates,
//                   [selectedStatus]: selectedDate.toISOString().split("T")[0],
//                 },
//               }
//             : lead,
//         ),
//       )
//       setModalVisible(false)
//       Alert.alert("Success", "Lead status updated successfully.")
//     } catch (error) {
//       console.error("Error updating lead:", error)
//       Alert.alert("Error", "Failed to update lead status.")
//     }
//   }

//   const handleSaveReview = async () => {
//     if (!reviewRemark) {
//       Alert.alert("Error", "Please enter a remark.")
//       return
//     }
//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       await axios.post(
//         `${BASE_URL}/remark/${selectedLead.id}/remark`,
//         {
//           remark: reviewRemark,
//           remarkdate: reviewDate.toISOString().split("T")[0],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )
//       setReviewModalVisible(false)
//       Alert.alert("Success", "Review added successfully.")
//       fetchLeads()
//     } catch (error) {
//       console.error("Error adding review:", error)
//       Alert.alert("Error", "Failed to add review.")
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "SUCCESS":
//         return {
//           bg: "rgba(34, 197, 94, 0.1)",
//           text: "#059669",
//           border: "#10b981",
//           icon: "checkmark-circle",
//         }
//       case "FOLLOW_UP":
//         return {
//           bg: "rgba(251, 191, 36, 0.1)",
//           text: "#d97706",
//           border: "#f59e0b",
//           icon: "time",
//         }
//       case "UNDER_REVIEW":
//         return {
//           bg: "rgba(99, 102, 241, 0.1)",
//           text: "#4f46e5",
//           border: "#6366f1",
//           icon: "eye",
//         }
//       case "DEMO":
//         return {
//           bg: "rgba(168, 85, 247, 0.1)",
//           text: "#7c3aed",
//           border: "#8b5cf6",
//           icon: "play-circle",
//         }
//       case "NEGOTIATION":
//         return {
//           bg: "rgba(236, 72, 153, 0.1)",
//           text: "#be185d",
//           border: "#ec4899",
//           icon: "chatbubbles",
//         }
//       default:
//         return {
//           bg: "rgba(239, 68, 68, 0.1)",
//           text: "#dc2626",
//           border: "#ef4444",
//           icon: "alert-circle",
//         }
//     }
//   }

//   const renderLeadCard = ({ item, index }) => {
//     const statusColors = getStatusColor(item.status)
//     const cardDelay = index * 50

//     return (
//       <View style={[styles.card, isTablet && styles.cardTablet]}>
//         <View style={styles.cardGradient}>
//           <View style={styles.cardHeader}>
//             <View style={styles.avatarContainer}>
//               <View style={[styles.avatar, { backgroundColor: statusColors.bg }]}>
//                 <Text style={[styles.avatarText, { color: statusColors.text }]}>
//                   {item.name.charAt(0).toUpperCase()}
//                 </Text>
//               </View>
//               <View style={styles.nameContainer}>
//                 <Text style={styles.name} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//                 <Text style={styles.company} numberOfLines={1}>
//                   {item.companyName}
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={[
//                 styles.statusBadge,
//                 {
//                   backgroundColor: statusColors.bg,
//                   borderColor: statusColors.border,
//                 },
//               ]}
//             >
//               <Ionicons name={statusColors.icon} size={12} color={statusColors.text} style={styles.statusIcon} />
//               <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status.replace("_", " ")}</Text>
//             </View>
//           </View>

//           <View style={styles.cardContent}>
//             <View style={styles.infoGrid}>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="briefcase" size={16} color="#6366f1" />
//                 </View>
//                 <Text style={styles.infoText} numberOfLines={1}>
//                   {item.jobTitle}
//                 </Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="mail" size={16} color="#059669" />
//                 </View>
//                 <Text style={styles.infoText} numberOfLines={1}>
//                   {item.email}
//                 </Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="call" size={16} color="#dc2626" />
//                 </View>
//                 <Text style={styles.infoText}>{item.phoneNumber}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="calendar" size={16} color="#7c3aed" />
//                 </View>
//                 <Text style={styles.infoText}>{new Date(item.foundOn).toLocaleDateString("en-GB")}</Text>
//               </View>
//             </View>

//             {item.remark && (
//               <View style={styles.remarkContainer}>
//                 <View style={styles.remarkHeader}>
//                   <Ionicons name="chatbubble-ellipses" size={14} color="#6366f1" />
//                   <Text style={styles.remarkLabel}>Latest Remark</Text>
//                 </View>
//                 <Text style={styles.remarkText} numberOfLines={2}>
//                   {item.remark}
//                 </Text>
//                 <Text style={styles.remarkDate}>
//                   {new Date(item.remarkdate || new Date()).toLocaleDateString("en-GB")}
//                 </Text>
//               </View>
//             )}
//           </View>

//           <View style={styles.actionContainer}>
//             <View style={styles.primaryActions}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.primaryButton]}
//                 onPress={() => handleStepsPress(item)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="list" size={16} color="#FFFFFF" />
//                 <Text style={styles.primaryButtonText}>Steps</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.primaryButton]}
//                 onPress={() => handleViewLead(item.id)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="eye" size={16} color="#FFFFFF" />
//                 <Text style={styles.primaryButtonText}>View</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.secondaryActions}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.secondaryButton]}
//                 onPress={() => navigation.navigate("Add_Edit_Lead", { id: item.id })}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="create" size={14} color="#6366f1" />
//                 <Text style={styles.secondaryButtonText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.secondaryButton]}
//                 onPress={() => handleAddReview(item)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="star" size={14} color="#f59e0b" />
//                 <Text style={styles.secondaryButtonText}>Review</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.deleteButton]}
//                 onPress={() => handleDeleteLead(item.id)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="trash" size={14} color="#FFFFFF" />
//                 <Text style={styles.deleteButtonText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   }

//   const renderEmptyState = () => (
//     <View style={styles.emptyState}>
//       <View style={styles.emptyIconContainer}>
//         <Ionicons name="people-outline" size={80} color="#e5e7eb" />
//       </View>
//       <Text style={styles.emptyTitle}>No Leads Found</Text>
//       <Text style={styles.emptySubtitle}>Start building your pipeline by adding your first lead</Text>
//       <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead} activeOpacity={0.8}>
//         <Ionicons name="add" size={20} color="#FFFFFF" />
//         <Text style={styles.emptyButtonText}>Add First Lead</Text>
//       </TouchableOpacity>
//     </View>
//   )

//   const renderFilterButtons = () => (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
//       {[
//         { key: "All", label: "All", icon: "apps" },
//         { key: "NEW_LEAD", label: "New", icon: "add-circle" },
//         { key: "FOLLOW_UP", label: "Follow Up", icon: "time" },
//         { key: "UNDER_REVIEW", label: "Review", icon: "eye" },
//         { key: "DEMO", label: "Demo", icon: "play-circle" },
//         { key: "NEGOTIATION", label: "Negotiation", icon: "chatbubbles" },
//         { key: "SUCCESS", label: "Success", icon: "checkmark-circle" },
//       ].map((filter) => (
//         <TouchableOpacity
//           key={filter.key}
//           style={[styles.filterButton, filterLead === filter.key && styles.filterButtonActive]}
//           onPress={() => setFilterLead(filter.key)}
//           activeOpacity={0.8}
//         >
//           <Ionicons name={filter.icon} size={16} color={filterLead === filter.key ? "#FFFFFF" : "#6b7280"} />
//           <Text style={[styles.filterButtonText, filterLead === filter.key && styles.filterButtonTextActive]}>
//             {filter.label}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   )

//   const renderModal = (visible, onClose, title, children, actions) => (
//     <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose} statusBarTranslucent>
//       <BlurView intensity={20} style={styles.modalOverlay}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>{title}</Text>
//             <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.8}>
//               <Ionicons name="close" size={24} color="#6b7280" />
//             </TouchableOpacity>
//           </View>
//           <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
//             {children}
//           </ScrollView>
//           <View style={styles.modalActions}>{actions}</View>
//         </View>
//       </BlurView>
//     </Modal>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.title}>Lead Management</Text>
//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>{filteredLeads.length}</Text>
//               <Text style={styles.statLabel}>{filteredLeads.length === 1 ? "Lead" : "Leads"}</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>{leads.filter((l) => l.status === "SUCCESS").length}</Text>
//               <Text style={styles.statLabel}>Converted</Text>
//             </View>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLead} activeOpacity={0.8}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputContainer}>
//           <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search leads by name..."
//             value={search}
//             onChangeText={setSearch}
//             placeholderTextColor="#9ca3af"
//           />
//           {search.length > 0 && (
//             <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.8}>
//               <Ionicons name="close-circle" size={20} color="#9ca3af" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Filters */}
//       {renderFilterButtons()}

//       {/* Content */}
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#6366f1" />
//           <Text style={styles.loadingText}>Loading your leads...</Text>
//         </View>
//       ) : filteredLeads.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={filteredLeads}
//           renderItem={renderLeadCard}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6366f1"]} tintColor="#6366f1" />
//           }
//           numColumns={isLargeScreen ? 2 : 1}
//           columnWrapperStyle={isLargeScreen ? styles.row : null}
//         />
//       )}

//       {/* Status Update Modal */}
//       {renderModal(
//         modalVisible,
//         () => setModalVisible(false),
//         `Update Status for ${selectedLead?.name}`,
//         <>
//           <Text style={styles.modalLabel}>Status</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedStatus}
//               onValueChange={(itemValue) => setSelectedStatus(itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Status" value="" />
//               <Picker.Item label="Follow Up" value="FOLLOW_UP" />
//               <Picker.Item label="Under Review" value="UNDER_REVIEW" />
//               <Picker.Item label="Demo" value="DEMO" />
//               <Picker.Item label="Negotiation" value="NEGOTIATION" />
//               <Picker.Item label="Success" value="SUCCESS" />
//               <Picker.Item label="Inactive" value="INACTIVE" />
//             </Picker>
//           </View>
//           <Text style={styles.modalLabel}>Date</Text>
//           <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
//             <Text style={styles.dateButtonText}>{selectedDate.toLocaleDateString("en-GB")}</Text>
//             <Ionicons name="calendar" size={20} color="#6366f1" />
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={selectedDate}
//               mode="date"
//               display={Platform.OS === "ios" ? "inline" : "default"}
//               onChange={(event, date) => {
//                 setShowDatePicker(Platform.OS === "ios")
//                 if (date) setSelectedDate(date)
//               }}
//             />
//           )}
//         </>,
//         <>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.cancelButton]}
//             onPress={() => setModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.saveButton]}
//             onPress={handleSaveStep}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           </TouchableOpacity>
//         </>,
//       )}

//       {/* Review Modal */}
//       {renderModal(
//         reviewModalVisible,
//         () => setReviewModalVisible(false),
//         `Add Review for ${selectedLead?.name}`,
//         <>
//           <Text style={styles.modalLabel}>Review Date</Text>
//           <TouchableOpacity style={styles.dateButton} onPress={() => setShowReviewDatePicker(true)} activeOpacity={0.8}>
//             <Text style={styles.dateButtonText}>{reviewDate.toLocaleDateString("en-GB")}</Text>
//             <Ionicons name="calendar" size={20} color="#6366f1" />
//           </TouchableOpacity>
//           {showReviewDatePicker && (
//             <DateTimePicker
//               value={reviewDate}
//               mode="date"
//               display={Platform.OS === "ios" ? "inline" : "default"}
//               onChange={(event, date) => {
//                 setShowReviewDatePicker(Platform.OS === "ios")
//                 if (date) setReviewDate(date)
//               }}
//             />
//           )}
//           <Text style={styles.modalLabel}>Remark</Text>
//           <TextInput
//             style={styles.reviewInput}
//             placeholder="Add your review or remark here..."
//             value={reviewRemark}
//             onChangeText={setReviewRemark}
//             multiline
//             placeholderTextColor="#9ca3af"
//           />
//         </>,
//         <>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.cancelButton]}
//             onPress={() => setReviewModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.saveButton]}
//             onPress={handleSaveReview}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.saveButtonText}>Save Review</Text>
//           </TouchableOpacity>
//         </>,
//       )}

//       {/* Detail Modal */}
//       {renderModal(
//         detailModalVisible,
//         () => setDetailModalVisible(false),
//         `${selectedLead?.name} - Lead Details`,
//         selectedLead && (
//           <>
//             <View style={styles.detailSection}>
//               <Text style={styles.sectionTitle}>Personal Information</Text>
//               <View style={styles.detailGrid}>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="person" size={20} color="#6366f1" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Full Name</Text>
//                     <Text style={styles.detailValue}>{selectedLead.name}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="briefcase" size={20} color="#059669" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Job Title</Text>
//                     <Text style={styles.detailValue}>{selectedLead.jobTitle}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="business" size={20} color="#dc2626" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Company</Text>
//                     <Text style={styles.detailValue}>{selectedLead.companyName}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.detailSection}>
//               <Text style={styles.sectionTitle}>Contact Information</Text>
//               <View style={styles.detailGrid}>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="mail" size={20} color="#7c3aed" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Email Address</Text>
//                     <Text style={styles.detailValue}>{selectedLead.email}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="call" size={20} color="#f59e0b" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Phone Number</Text>
//                     <Text style={styles.detailValue}>{selectedLead.phoneNumber}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.detailSection}>
//               <Text style={styles.sectionTitle}>Lead Information</Text>
//               <View style={styles.detailGrid}>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="calendar" size={20} color="#ec4899" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Found On</Text>
//                     <Text style={styles.detailValue}>{new Date(selectedLead.foundOn).toLocaleDateString("en-GB")}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="flag" size={20} color="#10b981" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Current Status</Text>
//                     <Text style={styles.detailValue}>{selectedLead.status}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {selectedLead.leadLogs?.length > 0 && (
//               <View style={styles.detailSection}>
//                 <Text style={styles.sectionTitle}>Activity Timeline</Text>
//                 <FlatList
//                   data={selectedLead.leadLogs}
//                   renderItem={({ item: log }) => (
//                     <View style={styles.logItem}>
//                       <View style={styles.logIcon}>
//                         <Ionicons name="checkmark" size={12} color="#FFFFFF" />
//                       </View>
//                       <View style={styles.logContent}>
//                         <Text style={styles.logStatus}>{log.status}</Text>
//                         <Text style={styles.logDate}>{new Date(log.logDate).toLocaleDateString("en-GB")}</Text>
//                       </View>
//                     </View>
//                   )}
//                   keyExtractor={(log) => log.id.toString()}
//                   style={styles.logsContainer}
//                   scrollEnabled={false}
//                 />
//               </View>
//             )}

//             {selectedLead.remark && (
//               <View style={styles.detailSection}>
//                 <Text style={styles.sectionTitle}>Latest Remark</Text>
//                 <View style={styles.remarkDetailContainer}>
//                   <Text style={styles.remarkDetailText}>{selectedLead.remark}</Text>
//                   <Text style={styles.remarkDetailDate}>
//                     {new Date(selectedLead.remarkdate || new Date()).toLocaleDateString("en-GB")}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </>
//         ),
//         <>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.cancelButton]}
//             onPress={() => setDetailModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cancelButtonText}>Close</Text>
//           </TouchableOpacity>
//         </>,
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   header: {
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     paddingBottom: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   statItem: {
//     alignItems: "center",
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#6366f1",
//   },
//   statLabel: {
//     fontSize: 12,
//     color: "#6b7280",
//     fontWeight: "500",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   statDivider: {
//     width: 1,
//     height: 32,
//     backgroundColor: "#e5e7eb",
//     marginHorizontal: 16,
//   },
//   addButton: {
//     backgroundColor: "#6366f1",
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#6366f1",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   searchContainer: {
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     height: 52,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   filterContainer: {
//     paddingHorizontal: 24,
//     paddingBottom: 16,
//     gap: 12,
//   },
//   filterButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 24,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     gap: 6,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   filterButtonActive: {
//     backgroundColor: "#6366f1",
//     borderColor: "#6366f1",
//   },
//   filterButtonText: {
//     fontSize: 14,
//     color: "#6b7280",
//     fontWeight: "600",
//   },
//   filterButtonTextActive: {
//     color: "#FFFFFF",
//   },
//   listContainer: {
//     padding: 24,
//     paddingBottom: 40,
//   },
//   row: {
//     justifyContent: "space-between",
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 16,
//     elevation: 4,
//     overflow: "hidden",
//   },
//   cardTablet: {
//     maxWidth: isTablet ? (isLargeScreen ? screenWidth * 0.45 : screenWidth * 0.8) : "100%",
//     alignSelf: isLargeScreen ? "stretch" : "center",
//   },
//   cardGradient: {
//     padding: 24,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 20,
//   },
//   avatarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginRight: 16,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   nameContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 2,
//   },
//   company: {
//     fontSize: 14,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   statusBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     gap: 4,
//   },
//   statusIcon: {
//     marginRight: 2,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: "600",
//     textTransform: "capitalize",
//   },
//   cardContent: {
//     marginBottom: 24,
//   },
//   infoGrid: {
//     gap: 12,
//   },
//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   infoText: {
//     fontSize: 15,
//     color: "#374151",
//     fontWeight: "500",
//     flex: 1,
//   },
//   remarkContainer: {
//     backgroundColor: "#f8fafc",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: "#6366f1",
//   },
//   remarkHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//     gap: 6,
//   },
//   remarkLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6366f1",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   remarkText: {
//     fontSize: 14,
//     color: "#374151",
//     lineHeight: 20,
//     marginBottom: 8,
//   },
//   remarkDate: {
//     fontSize: 12,
//     color: "#9ca3af",
//     fontWeight: "500",
//   },
//   actionContainer: {
//     gap: 12,
//   },
//   primaryActions: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   secondaryActions: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     gap: 6,
//     flex: 1,
//   },
//   primaryButton: {
//     backgroundColor: "#6366f1",
//   },
//   primaryButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   secondaryButton: {
//     backgroundColor: "#f8fafc",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   secondaryButtonText: {
//     color: "#374151",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   deleteButton: {
//     backgroundColor: "#ef4444",
//   },
//   deleteButtonText: {
//     color: "#FFFFFF",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 40,
//     gap: 20,
//   },
//   emptyIconContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#111827",
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: "#6b7280",
//     textAlign: "center",
//     lineHeight: 24,
//   },
//   emptyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#6366f1",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 16,
//     gap: 8,
//     marginTop: 8,
//   },
//   emptyButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContainer: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 24,
//     width: isTablet ? screenWidth * 0.7 : screenWidth * 0.9,
//     maxWidth: 600,
//     maxHeight: screenHeight * 0.8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.25,
//     shadowRadius: 25,
//     elevation: 25,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f3f4f6",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//     flex: 1,
//     marginRight: 16,
//   },
//   closeButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     padding: 24,
//     maxHeight: screenHeight * 0.5,
//   },
//   modalLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     marginBottom: 20,
//     backgroundColor: "#f9fafb",
//   },
//   picker: {
//     height: Platform.OS === "ios" ? 150 : 50,
//   },
//   dateButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     backgroundColor: "#f9fafb",
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   reviewInput: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     minHeight: 100,
//     textAlignVertical: "top",
//     backgroundColor: "#f9fafb",
//     color: "#111827",
//   },
//   modalActions: {
//     flexDirection: "row",
//     gap: 12,
//     padding: 24,
//     borderTopWidth: 1,
//     borderTopColor: "#f3f4f6",
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   cancelButton: {
//     backgroundColor: "#f3f4f6",
//   },
//   cancelButtonText: {
//     color: "#6b7280",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   saveButton: {
//     backgroundColor: "#6366f1",
//   },
//   saveButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   detailSection: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 16,
//   },
//   detailGrid: {
//     gap: 16,
//   },
//   detailItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 12,
//   },
//   detailContent: {
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: 4,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   logsContainer: {
//     marginTop: 8,
//   },
//   logItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     gap: 12,
//   },
//   logIcon: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "#10b981",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logContent: {
//     flex: 1,
//   },
//   logStatus: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#111827",
//     textTransform: "capitalize",
//   },
//   logDate: {
//     fontSize: 12,
//     color: "#6b7280",
//     marginTop: 2,
//   },
//   remarkDetailContainer: {
//     backgroundColor: "#f8fafc",
//     padding: 16,
//     borderRadius: 12,
//     borderLeftWidth: 4,
//     borderLeftColor: "#6366f1",
//   },
//   remarkDetailText: {
//     fontSize: 15,
//     color: "#374151",
//     lineHeight: 22,
//     marginBottom: 8,
//   },
//   remarkDetailDate: {
//     fontSize: 12,
//     color: "#9ca3af",
//     fontWeight: "500",
//   },
// })

// export default LeadManagement





// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import DateTimePicker from "@react-native-community/datetimepicker"
// import { Picker } from "@react-native-picker/picker"
// import axios from "axios"
// import { BlurView } from "expo-blur"
// import { useEffect, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   FlatList,
//   Modal,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native"

// const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
// const isTablet = screenWidth >= 768
// const isLargeScreen = screenWidth >= 1024

// const LeadManagement = ({ navigation }) => {
//   const [leads, setLeads] = useState([])
//   const [filteredLeads, setFilteredLeads] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [search, setSearch] = useState("")
//   const [filterLead, setFilterLead] = useState("All")
//   const [modalVisible, setModalVisible] = useState(false)
//   const [reviewModalVisible, setReviewModalVisible] = useState(false)
//   const [detailModalVisible, setDetailModalVisible] = useState(false)
//   const [selectedLead, setSelectedLead] = useState(null)
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   const [selectedStatus, setSelectedStatus] = useState("")
//   const [reviewDate, setReviewDate] = useState(new Date())
//   const [reviewRemark, setReviewRemark] = useState("")
//   const [showDatePicker, setShowDatePicker] = useState(false)
//   const [showReviewDatePicker, setShowReviewDatePicker] = useState(false)

//   useEffect(() => {
//     fetchLeads()
//   }, [])

//   useEffect(() => {
//     const filtered = leads.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
//     setFilteredLeads(filterLead === "All" ? filtered : filtered.filter((item) => item.status === filterLead))
//   }, [search, leads, filterLead])

//   const fetchLeads = async () => {
//     try {
//       setLoading(true)
//       const token = await AsyncStorage.getItem("jwtToken")
//       const response = await axios.get(`${BASE_URL}/getAllLeads`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       const sortedLeads = response.data.sort((a, b) => b.id - a.id)
//       setLeads(sortedLeads)
//       setFilteredLeads(filterLead === "All" ? sortedLeads : sortedLeads.filter((item) => item.status === filterLead))
//       setLoading(false)
//     } catch (error) {
//       console.error("Error fetching leads:", error)
//       Alert.alert("Error", "Failed to fetch leads. Please try again.")
//       setLoading(false)
//     }
//   }

//   const onRefresh = async () => {
//     setRefreshing(true)
//     await fetchLeads()
//     setRefreshing(false)
//   }

//   const handleAddLead = () => {
//     navigation.navigate("Add_Edit_Lead")
//   }

//   const handleStepsPress = (lead) => {
//     setSelectedLead(lead)
//     setSelectedDate(new Date())
//     setSelectedStatus("")
//     setModalVisible(true)
//   }

//   const handleViewLead = async (id) => {
//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       setSelectedLead(response.data)
//       setDetailModalVisible(true)
//     } catch (error) {
//       console.error("Error fetching lead details:", error)
//       Alert.alert("Error", "Failed to fetch lead details.")
//     }
//   }

//   const handleDeleteLead = async (id) => {
//     Alert.alert("Delete Lead", "Are you sure you want to delete this lead? This action cannot be undone.", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const token = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/deleteLead/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             })
//             setLeads((prev) => prev.filter((lead) => lead.id !== id))
//             Alert.alert("Success", "Lead deleted successfully.")
//           } catch (error) {
//             console.error("Error deleting lead:", error)
//             Alert.alert("Error", "Failed to delete lead.")
//           }
//         },
//       },
//     ])
//   }

//   const handleAddReview = (lead) => {
//     setSelectedLead(lead)
//     setReviewDate(new Date())
//     setReviewRemark("")
//     setReviewModalVisible(true)
//   }

//   const handleSaveStep = async () => {
//     if (!selectedStatus) {
//       Alert.alert("Error", "Please select a status.")
//       return
//     }
//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       const leadLogs = [
//         {
//           logDate: selectedDate.toISOString().split("T")[0],
//           status: selectedStatus,
//         },
//       ]
//       await axios.post(`${BASE_URL}/${selectedLead.id}/addLogs`, leadLogs, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       setLeads((prevLeads) =>
//         prevLeads.map((lead) =>
//           lead.id === selectedLead.id
//             ? {
//                 ...lead,
//                 status: selectedStatus,
//                 dates: {
//                   ...lead.dates,
//                   [selectedStatus]: selectedDate.toISOString().split("T")[0],
//                 },
//               }
//             : lead,
//         ),
//       )
//       setModalVisible(false)
//       Alert.alert("Success", "Lead status updated successfully.")
//     } catch (error) {
//       console.error("Error updating lead:", error)
//       Alert.alert("Error", "Failed to update lead status.")
//     }
//   }

//   const handleSaveReview = async () => {
//     if (!reviewRemark) {
//       Alert.alert("Error", "Please enter a remark.")
//       return
//     }
//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       await axios.post(
//         `${BASE_URL}/remark/${selectedLead.id}/remark`,
//         {
//           remark: reviewRemark,
//           remarkdate: reviewDate.toISOString().split("T")[0],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )
//       setReviewModalVisible(false)
//       Alert.alert("Success", "Review added successfully.")
//       fetchLeads()
//     } catch (error) {
//       console.error("Error adding review:", error)
//       Alert.alert("Error", "Failed to add review.")
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "SUCCESS":
//         return {
//           bg: "rgba(34, 197, 94, 0.1)",
//           text: "#059669",
//           border: "#10b981",
//           icon: "checkmark-circle",
//         }
//       case "FOLLOW_UP":
//         return {
//           bg: "rgba(251, 191, 36, 0.1)",
//           text: "#d97706",
//           border: "#f59e0b",
//           icon: "time",
//         }
//       case "UNDER_REVIEW":
//         return {
//           bg: "rgba(99, 102, 241, 0.1)",
//           text: "#4f46e5",
//           border: "#6366f1",
//           icon: "eye",
//         }
//       case "DEMO":
//         return {
//           bg: "rgba(168, 85, 247, 0.1)",
//           text: "#7c3aed",
//           border: "#8b5cf6",
//           icon: "play-circle",
//         }
//       case "NEGOTIATION":
//         return {
//           bg: "rgba(236, 72, 153, 0.1)",
//           text: "#be185d",
//           border: "#ec4899",
//           icon: "chatbubbles",
//         }
//       default:
//         return {
//           bg: "rgba(239, 68, 68, 0.1)",
//           text: "#dc2626",
//           border: "#ef4444",
//           icon: "alert-circle",
//         }
//     }
//   }

//   const renderLeadCard = ({ item, index }) => {
//     const statusColors = getStatusColor(item.status)
//     const cardDelay = index * 50

//     return (
//       <View style={[styles.card, isTablet && styles.cardTablet]}>
//         <View style={styles.cardGradient}>
//           <View style={styles.cardHeader}>
//             <View style={styles.avatarContainer}>
//               <View style={[styles.avatar, { backgroundColor: statusColors.bg }]}>
//                 <Text style={[styles.avatarText, { color: statusColors.text }]}>
//                   {item.name.charAt(0).toUpperCase()}
//                 </Text>
//               </View>
//               <View style={styles.nameContainer}>
//                 <Text style={styles.name} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//                 <Text style={styles.company} numberOfLines={1}>
//                   {item.companyName}
//                 </Text>
//               </View>
//             </View>
//             <View
//               style={[
//                 styles.statusBadge,
//                 {
//                   backgroundColor: statusColors.bg,
//                   borderColor: statusColors.border,
//                 },
//               ]}
//             >
//               <Ionicons name={statusColors.icon} size={12} color={statusColors.text} style={styles.statusIcon} />
//               <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status.replace("_", " ")}</Text>
//             </View>
//           </View>

//           <View style={styles.cardContent}>
//             <View style={styles.infoGrid}>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="briefcase" size={16} color="#6366f1" />
//                 </View>
//                 <Text style={styles.infoText} numberOfLines={1}>
//                   {item.jobTitle}
//                 </Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="mail" size={16} color="#059669" />
//                 </View>
//                 <Text style={styles.infoText} numberOfLines={1}>
//                   {item.email}
//                 </Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="call" size={16} color="#dc2626" />
//                 </View>
//                 <Text style={styles.infoText}>{item.phoneNumber}</Text>
//               </View>
//               <View style={styles.infoItem}>
//                 <View style={styles.infoIconContainer}>
//                   <Ionicons name="calendar" size={16} color="#7c3aed" />
//                 </View>
//                 <Text style={styles.infoText}>{new Date(item.foundOn).toLocaleDateString("en-GB")}</Text>
//               </View>
//             </View>

//             {item.remark && (
//               <View style={styles.remarkContainer}>
//                 <View style={styles.remarkHeader}>
//                   <Ionicons name="chatbubble-ellipses" size={14} color="#6366f1" />
//                   <Text style={styles.remarkLabel}>Latest Remark</Text>
//                 </View>
//                 <Text style={styles.remarkText} numberOfLines={2}>
//                   {item.remark}
//                 </Text>
//                 <Text style={styles.remarkDate}>
//                   {new Date(item.remarkdate || new Date()).toLocaleDateString("en-GB")}
//                 </Text>
//               </View>
//             )}
//           </View>

//           <View style={styles.actionContainer}>
//             <View style={styles.primaryActions}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.primaryButton]}
//                 onPress={() => handleStepsPress(item)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="list" size={16} color="#FFFFFF" />
//                 <Text style={styles.primaryButtonText}>Steps</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.primaryButton]}
//                 onPress={() => handleViewLead(item.id)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="eye" size={16} color="#FFFFFF" />
//                 <Text style={styles.primaryButtonText}>View</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.secondaryActions}>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.secondaryButton]}
//                 onPress={() => navigation.navigate("Add_Edit_Lead", { id: item.id })}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="create" size={14} color="#6366f1" />
//                 <Text style={styles.secondaryButtonText}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.secondaryButton]}
//                 onPress={() => handleAddReview(item)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="star" size={14} color="#f59e0b" />
//                 <Text style={styles.secondaryButtonText}>Review</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.deleteButton]}
//                 onPress={() => handleDeleteLead(item.id)}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="trash" size={14} color="#FFFFFF" />
//                 <Text style={styles.deleteButtonText}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   }

//   const renderEmptyState = () => (
//     <View style={styles.emptyState}>
//       <View style={styles.emptyIconContainer}>
//         <Ionicons name="people-outline" size={80} color="#e5e7eb" />
//       </View>
//       <Text style={styles.emptyTitle}>No Leads Found</Text>
//       <Text style={styles.emptySubtitle}>Start building your pipeline by adding your first lead</Text>
//       <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead} activeOpacity={0.8}>
//         <Ionicons name="add" size={20} color="#FFFFFF" />
//         <Text style={styles.emptyButtonText}>Add First Lead</Text>
//       </TouchableOpacity>
//     </View>
//   )

//   const renderFilterButtons = () => {
//     const filters = [
//       { key: "All", label: "All", icon: "apps", count: leads.length },
//       { key: "NEW_LEAD", label: "New", icon: "add-circle", count: leads.filter((l) => l.status === "NEW_LEAD").length },
//       {
//         key: "FOLLOW_UP",
//         label: "Follow Up",
//         icon: "time",
//         count: leads.filter((l) => l.status === "FOLLOW_UP").length,
//       },
//       {
//         key: "UNDER_REVIEW",
//         label: "Review",
//         icon: "eye",
//         count: leads.filter((l) => l.status === "UNDER_REVIEW").length,
//       },
//       { key: "DEMO", label: "Demo", icon: "play-circle", count: leads.filter((l) => l.status === "DEMO").length },
//       {
//         key: "NEGOTIATION",
//         label: "Negotiation",
//         icon: "chatbubbles",
//         count: leads.filter((l) => l.status === "NEGOTIATION").length,
//       },
//       {
//         key: "SUCCESS",
//         label: "Success",
//         icon: "checkmark-circle",
//         count: leads.filter((l) => l.status === "SUCCESS").length,
//       },
//     ]

//     return (
//       <View style={styles.filterWrapper}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filterContainer}
//           bounces={false}
//           decelerationRate="fast"
//         >
//           {filters.map((filter, index) => (
//             <TouchableOpacity
//               key={filter.key}
//               style={[
//                 styles.filterButton,
//                 filterLead === filter.key && styles.filterButtonActive,
//                 index === 0 && styles.filterButtonFirst,
//                 index === filters.length - 1 && styles.filterButtonLast,
//               ]}
//               onPress={() => setFilterLead(filter.key)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.filterButtonContent}>
//                 <Ionicons
//                   name={filter.icon}
//                   size={isTablet ? 18 : 16}
//                   color={filterLead === filter.key ? "#FFFFFF" : "#6b7280"}
//                 />
//                 <Text
//                   style={[
//                     styles.filterButtonText,
//                     filterLead === filter.key && styles.filterButtonTextActive,
//                     isTablet && styles.filterButtonTextTablet,
//                   ]}
//                 >
//                   {filter.label}
//                 </Text>
//                 {filter.count > 0 && (
//                   <View style={[styles.filterBadge, filterLead === filter.key && styles.filterBadgeActive]}>
//                     <Text style={[styles.filterBadgeText, filterLead === filter.key && styles.filterBadgeTextActive]}>
//                       {filter.count}
//                     </Text>
//                   </View>
//                 )}
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     )
//   }

//   const renderModal = (visible, onClose, title, children, actions) => (
//     <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose} statusBarTranslucent>
//       <BlurView intensity={20} style={styles.modalOverlay}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>{title}</Text>
//             <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.8}>
//               <Ionicons name="close" size={24} color="#6b7280" />
//             </TouchableOpacity>
//           </View>
//           <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
//             {children}
//           </ScrollView>
//           <View style={styles.modalActions}>{actions}</View>
//         </View>
//       </BlurView>
//     </Modal>
//   )

//   return (
//     <View style={styles.container}>
//       {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}

//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.title}>Lead Management</Text>
//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>{filteredLeads.length}</Text>
//               <Text style={styles.statLabel}>{filteredLeads.length === 1 ? "Lead" : "Leads"}</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>{leads.filter((l) => l.status === "SUCCESS").length}</Text>
//               <Text style={styles.statLabel}>Converted</Text>
//             </View>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLead} activeOpacity={0.8}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputContainer}>
//           <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search leads by name..."
//             value={search}
//             onChangeText={setSearch}
//             placeholderTextColor="#9ca3af"
//           />
//           {search.length > 0 && (
//             <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.8}>
//               <Ionicons name="close-circle" size={20} color="#9ca3af" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Filters */}
//       {renderFilterButtons()}

//       {/* Content */}
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#6366f1" />
//           <Text style={styles.loadingText}>Loading your leads...</Text>
//         </View>
//       ) : filteredLeads.length === 0 ? (
//         renderEmptyState()
//       ) : (
//         <FlatList
//           data={filteredLeads}
//           renderItem={renderLeadCard}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6366f1"]} tintColor="#6366f1" />
//           }
//           numColumns={isLargeScreen ? 2 : 1}
//           columnWrapperStyle={isLargeScreen ? styles.row : null}
//         />
//       )}

//       {/* Status Update Modal */}
//       {renderModal(
//         modalVisible,
//         () => setModalVisible(false),
//         `Update Status for ${selectedLead?.name}`,
//         <>
//           <Text style={styles.modalLabel}>Status</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedStatus}
//               onValueChange={(itemValue) => setSelectedStatus(itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Status" value="" />
//               <Picker.Item label="Follow Up" value="FOLLOW_UP" />
//               <Picker.Item label="Under Review" value="UNDER_REVIEW" />
//               <Picker.Item label="Demo" value="DEMO" />
//               <Picker.Item label="Negotiation" value="NEGOTIATION" />
//               <Picker.Item label="Success" value="SUCCESS" />
//               <Picker.Item label="Inactive" value="INACTIVE" />
//             </Picker>
//           </View>
//           <Text style={styles.modalLabel}>Date</Text>
//           <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
//             <Text style={styles.dateButtonText}>{selectedDate.toLocaleDateString("en-GB")}</Text>
//             <Ionicons name="calendar" size={20} color="#6366f1" />
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={selectedDate}
//               mode="date"
//               display={Platform.OS === "ios" ? "inline" : "default"}
//               onChange={(event, date) => {
//                 setShowDatePicker(Platform.OS === "ios")
//                 if (date) setSelectedDate(date)
//               }}
//             />
//           )}
//         </>,
//         <>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.cancelButton]}
//             onPress={() => setModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.saveButton]}
//             onPress={handleSaveStep}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           </TouchableOpacity>
//         </>,
//       )}

//       {/* Review Modal */}
//       {renderModal(
//         reviewModalVisible,
//         () => setReviewModalVisible(false),
//         `Add Review for ${selectedLead?.name}`,
//         <>
//           <Text style={styles.modalLabel}>Review Date</Text>
//           <TouchableOpacity style={styles.dateButton} onPress={() => setShowReviewDatePicker(true)} activeOpacity={0.8}>
//             <Text style={styles.dateButtonText}>{reviewDate.toLocaleDateString("en-GB")}</Text>
//             <Ionicons name="calendar" size={20} color="#6366f1" />
//           </TouchableOpacity>
//           {showReviewDatePicker && (
//             <DateTimePicker
//               value={reviewDate}
//               mode="date"
//               display={Platform.OS === "ios" ? "inline" : "default"}
//               onChange={(event, date) => {
//                 setShowReviewDatePicker(Platform.OS === "ios")
//                 if (date) setReviewDate(date)
//               }}
//             />
//           )}
//           <Text style={styles.modalLabel}>Remark</Text>
//           <TextInput
//             style={styles.reviewInput}
//             placeholder="Add your review or remark here..."
//             value={reviewRemark}
//             onChangeText={setReviewRemark}
//             multiline
//             placeholderTextColor="#9ca3af"
//           />
//         </>,
//         <>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.cancelButton]}
//             onPress={() => setReviewModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.saveButton]}
//             onPress={handleSaveReview}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.saveButtonText}>Save Review</Text>
//           </TouchableOpacity>
//         </>,
//       )}

//       {/* Detail Modal */}
//       {renderModal(
//         detailModalVisible,
//         () => setDetailModalVisible(false),
//         `${selectedLead?.name} - Lead Details`,
//         selectedLead && (
//           <>
//             <View style={styles.detailSection}>
//               <Text style={styles.sectionTitle}>Personal Information</Text>
//               <View style={styles.detailGrid}>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="person" size={20} color="#6366f1" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Full Name</Text>
//                     <Text style={styles.detailValue}>{selectedLead.name}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="briefcase" size={20} color="#059669" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Job Title</Text>
//                     <Text style={styles.detailValue}>{selectedLead.jobTitle}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="business" size={20} color="#dc2626" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Company</Text>
//                     <Text style={styles.detailValue}>{selectedLead.companyName}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.detailSection}>
//               <Text style={styles.sectionTitle}>Contact Information</Text>
//               <View style={styles.detailGrid}>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="mail" size={20} color="#7c3aed" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Email Address</Text>
//                     <Text style={styles.detailValue}>{selectedLead.email}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="call" size={20} color="#f59e0b" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Phone Number</Text>
//                     <Text style={styles.detailValue}>{selectedLead.phoneNumber}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.detailSection}>
//               <Text style={styles.sectionTitle}>Lead Information</Text>
//               <View style={styles.detailGrid}>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="calendar" size={20} color="#ec4899" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Found On</Text>
//                     <Text style={styles.detailValue}>{new Date(selectedLead.foundOn).toLocaleDateString("en-GB")}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.detailItem}>
//                   <Ionicons name="flag" size={20} color="#10b981" />
//                   <View style={styles.detailContent}>
//                     <Text style={styles.detailLabel}>Current Status</Text>
//                     <Text style={styles.detailValue}>{selectedLead.status}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {selectedLead.leadLogs?.length > 0 && (
//               <View style={styles.detailSection}>
//                 <Text style={styles.sectionTitle}>Activity Timeline</Text>
//                 <FlatList
//                   data={selectedLead.leadLogs}
//                   renderItem={({ item: log }) => (
//                     <View style={styles.logItem}>
//                       <View style={styles.logIcon}>
//                         <Ionicons name="checkmark" size={12} color="#FFFFFF" />
//                       </View>
//                       <View style={styles.logContent}>
//                         <Text style={styles.logStatus}>{log.status}</Text>
//                         <Text style={styles.logDate}>{new Date(log.logDate).toLocaleDateString("en-GB")}</Text>
//                       </View>
//                     </View>
//                   )}
//                   keyExtractor={(log) => log.id.toString()}
//                   style={styles.logsContainer}
//                   scrollEnabled={false}
//                 />
//               </View>
//             )}

//             {selectedLead.remark && (
//               <View style={styles.detailSection}>
//                 <Text style={styles.sectionTitle}>Latest Remark</Text>
//                 <View style={styles.remarkDetailContainer}>
//                   <Text style={styles.remarkDetailText}>{selectedLead.remark}</Text>
//                   <Text style={styles.remarkDetailDate}>
//                     {new Date(selectedLead.remarkdate || new Date()).toLocaleDateString("en-GB")}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </>
//         ),
//         <>
//           <TouchableOpacity
//             style={[styles.modalButton, styles.cancelButton]}
//             onPress={() => setDetailModalVisible(false)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cancelButtonText}>Close</Text>
//           </TouchableOpacity>
//         </>,
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   header: {
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     paddingBottom: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },
//   statsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   statItem: {
//     alignItems: "center",
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#6366f1",
//   },
//   statLabel: {
//     fontSize: 12,
//     color: "#6b7280",
//     fontWeight: "500",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   statDivider: {
//     width: 1,
//     height: 32,
//     backgroundColor: "#e5e7eb",
//     marginHorizontal: 16,
//   },
//   addButton: {
//     backgroundColor: "#6366f1",
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#6366f1",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   searchContainer: {
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     height: 52,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   filterWrapper: {
//     paddingVertical: 12,
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#f3f4f6",
//   },
//   filterContainer: {
//     paddingHorizontal: 20,
//     gap: isTablet ? 16 : 12,
//     alignItems: "center",
//   },
//   filterButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: isTablet ? 12 : 10,
//     paddingHorizontal: isTablet ? 20 : 16,
//     borderRadius: isTablet ? 28 : 24,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1.5,
//     borderColor: "#e5e7eb",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//     minHeight: isTablet ? 48 : 44,
//     minWidth: isTablet ? 80 : 70,
//   },
//   filterButtonFirst: {
//     marginLeft: 4,
//   },
//   filterButtonLast: {
//     marginRight: 4,
//   },
//   filterButtonActive: {
//     backgroundColor: "#6366f1",
//     borderColor: "#6366f1",
//     shadowColor: "#6366f1",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 6,
//     transform: [{ scale: 1.02 }],
//   },
//   filterButtonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: isTablet ? 8 : 6,
//   },
//   filterButtonText: {
//     fontSize: isTablet ? 15 : 14,
//     color: "#6b7280",
//     fontWeight: "600",
//     letterSpacing: 0.2,
//   },
//   filterButtonTextTablet: {
//     fontSize: 16,
//   },
//   filterButtonTextActive: {
//     color: "#FFFFFF",
//   },
//   filterBadge: {
//     backgroundColor: "#f3f4f6",
//     borderRadius: isTablet ? 12 : 10,
//     paddingHorizontal: isTablet ? 8 : 6,
//     paddingVertical: isTablet ? 3 : 2,
//     minWidth: isTablet ? 24 : 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   filterBadgeActive: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//   },
//   filterBadgeText: {
//     fontSize: isTablet ? 12 : 11,
//     fontWeight: "700",
//     color: "#6b7280",
//   },
//   filterBadgeTextActive: {
//     color: "#FFFFFF",
//   },
//   listContainer: {
//     padding: 24,
//     paddingBottom: 40,
//   },
//   row: {
//     justifyContent: "space-between",
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 16,
//     elevation: 4,
//     overflow: "hidden",
//   },
//   cardTablet: {
//     maxWidth: isTablet ? (isLargeScreen ? screenWidth * 0.45 : screenWidth * 0.8) : "100%",
//     alignSelf: isLargeScreen ? "stretch" : "center",
//   },
//   cardGradient: {
//     padding: 24,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 20,
//   },
//   avatarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginRight: 16,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   avatarText: {
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   nameContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 2,
//   },
//   company: {
//     fontSize: 14,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   statusBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     gap: 4,
//   },
//   statusIcon: {
//     marginRight: 2,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: "600",
//     textTransform: "capitalize",
//   },
//   cardContent: {
//     marginBottom: 24,
//   },
//   infoGrid: {
//     gap: 12,
//   },
//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   infoIconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   infoText: {
//     fontSize: 15,
//     color: "#374151",
//     fontWeight: "500",
//     flex: 1,
//   },
//   remarkContainer: {
//     backgroundColor: "#f8fafc",
//     padding: 16,
//     borderRadius: 12,
//     marginTop: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: "#6366f1",
//   },
//   remarkHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//     gap: 6,
//   },
//   remarkLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6366f1",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   remarkText: {
//     fontSize: 14,
//     color: "#374151",
//     lineHeight: 20,
//     marginBottom: 8,
//   },
//   remarkDate: {
//     fontSize: 12,
//     color: "#9ca3af",
//     fontWeight: "500",
//   },
//   actionContainer: {
//     gap: 12,
//   },
//   primaryActions: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   secondaryActions: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     gap: 6,
//     flex: 1,
//   },
//   primaryButton: {
//     backgroundColor: "#6366f1",
//   },
//   primaryButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   secondaryButton: {
//     backgroundColor: "#f8fafc",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   secondaryButtonText: {
//     color: "#374151",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   deleteButton: {
//     backgroundColor: "#ef4444",
//   },
//   deleteButtonText: {
//     color: "#FFFFFF",
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: "#6b7280",
//     fontWeight: "500",
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 40,
//     gap: 20,
//   },
//   emptyIconContainer: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#111827",
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: "#6b7280",
//     textAlign: "center",
//     lineHeight: 24,
//   },
//   emptyButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#6366f1",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 16,
//     gap: 8,
//     marginTop: 8,
//   },
//   emptyButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContainer: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 24,
//     width: isTablet ? screenWidth * 0.7 : screenWidth * 0.9,
//     maxWidth: 600,
//     maxHeight: screenHeight * 0.8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.25,
//     shadowRadius: 25,
//     elevation: 25,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f3f4f6",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//     flex: 1,
//     marginRight: 16,
//   },
//   closeButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#f3f4f6",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     padding: 24,
//     maxHeight: screenHeight * 0.5,
//   },
//   modalLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     marginBottom: 20,
//     backgroundColor: "#f9fafb",
//   },
//   picker: {
//     height: Platform.OS === "ios" ? 150 : 50,
//   },
//   dateButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     backgroundColor: "#f9fafb",
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   reviewInput: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     minHeight: 100,
//     textAlignVertical: "top",
//     backgroundColor: "#f9fafb",
//     color: "#111827",
//   },
//   modalActions: {
//     flexDirection: "row",
//     gap: 12,
//     padding: 24,
//     borderTopWidth: 1,
//     borderTopColor: "#f3f4f6",
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   cancelButton: {
//     backgroundColor: "#f3f4f6",
//   },
//   cancelButtonText: {
//     color: "#6b7280",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   saveButton: {
//     backgroundColor: "#6366f1",
//   },
//   saveButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   detailSection: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 16,
//   },
//   detailGrid: {
//     gap: 16,
//   },
//   detailItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 12,
//   },
//   detailContent: {
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: 4,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   logsContainer: {
//     marginTop: 8,
//   },
//   logItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     gap: 12,
//   },
//   logIcon: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "#10b981",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logContent: {
//     flex: 1,
//   },
//   logStatus: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#111827",
//     textTransform: "capitalize",
//   },
//   logDate: {
//     fontSize: 12,
//     color: "#6b7280",
//     marginTop: 2,
//   },
//   remarkDetailContainer: {
//     backgroundColor: "#f8fafc",
//     padding: 16,
//     borderRadius: 12,
//     borderLeftWidth: 4,
//     borderLeftColor: "#6366f1",
//   },
//   remarkDetailText: {
//     fontSize: 15,
//     color: "#374151",
//     lineHeight: 22,
//     marginBottom: 8,
//   },
//   remarkDetailDate: {
//     fontSize: 12,
//     color: "#9ca3af",
//     fontWeight: "500",
//   },
// })

// export default LeadManagement





"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"
import { BlurView } from "expo-blur"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// Enhanced responsive helper functions
const getResponsiveWidth = (percentage) => (screenWidth * percentage) / 100
const getResponsiveHeight = (percentage) => (screenHeight * percentage) / 100
const getResponsiveFontSize = (size) => {
  const scale = screenWidth / 375 // Base width (iPhone X)
  const newSize = size * scale
  return Math.max(Math.min(newSize, size * 1.3), size * 0.8) // Limit scaling between 0.8x and 1.3x
}
const getResponsivePadding = (size) => {
  const scale = screenWidth / 375
  return Math.max(Math.min(size * scale, size * 1.2), size * 0.7)
}

// Device type detection
const isSmallPhone = screenWidth < 350
const isPhone = screenWidth < 768
const isTablet = screenWidth >= 768 && screenWidth < 1024
const isLargeTablet = screenWidth >= 1024
const isLandscape = screenWidth > screenHeight

// Responsive dimensions
const HORIZONTAL_PADDING = getResponsiveWidth(isPhone ? 6 : isTablet ? 4 : 3)
const CARD_MARGIN = getResponsiveWidth(isPhone ? 2 : 1.5)
const GRID_COLUMNS = isLargeTablet ? 3 : isTablet ? 2 : 1

const LeadManagement = ({ navigation }) => {
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState("")
  const [filterLead, setFilterLead] = useState("All")
  const [modalVisible, setModalVisible] = useState(false)
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedStatus, setSelectedStatus] = useState("")
  const [reviewDate, setReviewDate] = useState(new Date())
  const [reviewRemark, setReviewRemark] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showReviewDatePicker, setShowReviewDatePicker] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    const filtered = leads.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredLeads(filterLead === "All" ? filtered : filtered.filter((item) => item.status === filterLead))
  }, [search, leads, filterLead])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("jwtToken")
      const response = await axios.get(`${BASE_URL}/getAllLeads`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const sortedLeads = response.data.sort((a, b) => b.id - a.id)
      setLeads(sortedLeads)
      setFilteredLeads(filterLead === "All" ? sortedLeads : sortedLeads.filter((item) => item.status === filterLead))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching leads:", error)
      Alert.alert("Error", "Failed to fetch leads. Please try again.")
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchLeads()
    setRefreshing(false)
  }

  const handleAddLead = () => {
    navigation.navigate("Add_Edit_Lead")
  }

  const handleStepsPress = (lead) => {
    setSelectedLead(lead)
    setSelectedDate(new Date())
    setSelectedStatus("")
    setModalVisible(true)
  }

  const handleViewLead = async (id) => {
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      setSelectedLead(response.data)
      setDetailModalVisible(true)
    } catch (error) {
      console.error("Error fetching lead details:", error)
      Alert.alert("Error", "Failed to fetch lead details.")
    }
  }

  const handleDeleteLead = async (id) => {
    Alert.alert("Delete Lead", "Are you sure you want to delete this lead? This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("jwtToken")
            await axios.delete(`${BASE_URL}/deleteLead/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
            setLeads((prev) => prev.filter((lead) => lead.id !== id))
            Alert.alert("Success", "Lead deleted successfully.")
          } catch (error) {
            console.error("Error deleting lead:", error)
            Alert.alert("Error", "Failed to delete lead.")
          }
        },
      },
    ])
  }

  const handleAddReview = (lead) => {
    setSelectedLead(lead)
    setReviewDate(new Date())
    setReviewRemark("")
    setReviewModalVisible(true)
  }

  const handleSaveStep = async () => {
    if (!selectedStatus) {
      Alert.alert("Error", "Please select a status.")
      return
    }
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      const leadLogs = [
        {
          logDate: selectedDate.toISOString().split("T")[0],
          status: selectedStatus,
        },
      ]
      await axios.post(`${BASE_URL}/${selectedLead.id}/addLogs`, leadLogs, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === selectedLead.id
            ? {
                ...lead,
                status: selectedStatus,
                dates: {
                  ...lead.dates,
                  [selectedStatus]: selectedDate.toISOString().split("T")[0],
                },
              }
            : lead,
        ),
      )
      setModalVisible(false)
      Alert.alert("Success", "Lead status updated successfully.")
    } catch (error) {
      console.error("Error updating lead:", error)
      Alert.alert("Error", "Failed to update lead status.")
    }
  }

  const handleSaveReview = async () => {
    if (!reviewRemark) {
      Alert.alert("Error", "Please enter a remark.")
      return
    }
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      await axios.post(
        `${BASE_URL}/remark/${selectedLead.id}/remark`,
        {
          remark: reviewRemark,
          remarkdate: reviewDate.toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      setReviewModalVisible(false)
      Alert.alert("Success", "Review added successfully.")
      fetchLeads()
    } catch (error) {
      console.error("Error adding review:", error)
      Alert.alert("Error", "Failed to add review.")
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS":
        return {
          bg: "rgba(34, 197, 94, 0.1)",
          text: "#059669",
          border: "#10b981",
          icon: "checkmark-circle",
        }
      case "FOLLOW_UP":
        return {
          bg: "rgba(251, 191, 36, 0.1)",
          text: "#d97706",
          border: "#f59e0b",
          icon: "time",
        }
      case "UNDER_REVIEW":
        return {
          bg: "rgba(99, 102, 241, 0.1)",
          text: "#4f46e5",
          border: "#6366f1",
          icon: "eye",
        }
      case "DEMO":
        return {
          bg: "rgba(168, 85, 247, 0.1)",
          text: "#7c3aed",
          border: "#8b5cf6",
          icon: "play-circle",
        }
      case "NEGOTIATION":
        return {
          bg: "rgba(236, 72, 153, 0.1)",
          text: "#be185d",
          border: "#ec4899",
          icon: "chatbubbles",
        }
      default:
        return {
          bg: "rgba(239, 68, 68, 0.1)",
          text: "#dc2626",
          border: "#ef4444",
          icon: "alert-circle",
        }
    }
  }

  const renderLeadCard = ({ item, index }) => {
    const statusColors = getStatusColor(item.status)
    return (
      <View style={[styles.card, isTablet && styles.cardTablet]}>
        <View style={styles.cardGradient}>
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: statusColors.bg }]}>
                <Text style={[styles.avatarText, { color: statusColors.text }]}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.company} numberOfLines={1}>
                  {item.companyName}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: statusColors.bg,
                  borderColor: statusColors.border,
                },
              ]}
            >
              <Ionicons
                name={statusColors.icon}
                size={getResponsiveFontSize(12)}
                color={statusColors.text}
                style={styles.statusIcon}
              />
              <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status.replace("_", " ")}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="briefcase" size={getResponsiveFontSize(16)} color="#6366f1" />
                </View>
                <Text style={styles.infoText} numberOfLines={1}>
                  {item.jobTitle}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="mail" size={getResponsiveFontSize(16)} color="#059669" />
                </View>
                <Text style={styles.infoText} numberOfLines={1}>
                  {item.email}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="call" size={getResponsiveFontSize(16)} color="#dc2626" />
                </View>
                <Text style={styles.infoText}>{item.phoneNumber}</Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="calendar" size={getResponsiveFontSize(16)} color="#7c3aed" />
                </View>
                <Text style={styles.infoText}>{new Date(item.foundOn).toLocaleDateString("en-GB")}</Text>
              </View>
            </View>
            {item.remark && (
              <View style={styles.remarkContainer}>
                <View style={styles.remarkHeader}>
                  <Ionicons name="chatbubble-ellipses" size={getResponsiveFontSize(14)} color="#6366f1" />
                  <Text style={styles.remarkLabel}>Latest Remark</Text>
                </View>
                <Text style={styles.remarkText} numberOfLines={2}>
                  {item.remark}
                </Text>
                <Text style={styles.remarkDate}>
                  {new Date(item.remarkdate || new Date()).toLocaleDateString("en-GB")}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.primaryActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
                onPress={() => handleStepsPress(item)}
                activeOpacity={0.8}
              >
                <Ionicons name="list" size={getResponsiveFontSize(16)} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Steps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
                onPress={() => handleViewLead(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="eye" size={getResponsiveFontSize(16)} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>View</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.secondaryActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => navigation.navigate("Add_Edit_Lead", { id: item.id })}
                activeOpacity={0.8}
              >
                <Ionicons name="create" size={getResponsiveFontSize(14)} color="#6366f1" />
                <Text style={styles.secondaryButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => handleAddReview(item)}
                activeOpacity={0.8}
              >
                <Ionicons name="star" size={getResponsiveFontSize(14)} color="#f59e0b" />
                <Text style={styles.secondaryButtonText}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteLead(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash" size={getResponsiveFontSize(14)} color="#FFFFFF" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="people-outline" size={getResponsiveFontSize(80)} color="#e5e7eb" />
      </View>
      <Text style={styles.emptyTitle}>No Leads Found</Text>
      <Text style={styles.emptySubtitle}>Start building your pipeline by adding your first lead</Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleAddLead} activeOpacity={0.8}>
        <Ionicons name="add" size={getResponsiveFontSize(20)} color="#FFFFFF" />
        <Text style={styles.emptyButtonText}>Add First Lead</Text>
      </TouchableOpacity>
    </View>
  )

  const renderFilterButtons = () => {
    const filters = [
      { key: "All", label: "All", icon: "apps", count: leads.length },
      { key: "NEW_LEAD", label: "New", icon: "add-circle", count: leads.filter((l) => l.status === "NEW_LEAD").length },
      {
        key: "FOLLOW_UP",
        label: "Follow Up",
        icon: "time",
        count: leads.filter((l) => l.status === "FOLLOW_UP").length,
      },
      {
        key: "UNDER_REVIEW",
        label: "Review",
        icon: "eye",
        count: leads.filter((l) => l.status === "UNDER_REVIEW").length,
      },
      { key: "DEMO", label: "Demo", icon: "play-circle", count: leads.filter((l) => l.status === "DEMO").length },
      {
        key: "NEGOTIATION",
        label: "Negotiation",
        icon: "chatbubbles",
        count: leads.filter((l) => l.status === "NEGOTIATION").length,
      },
      {
        key: "SUCCESS",
        label: "Success",
        icon: "checkmark-circle",
        count: leads.filter((l) => l.status === "SUCCESS").length,
      },
    ]

    return (
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
          bounces={false}
          decelerationRate="fast"
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                filterLead === filter.key && styles.filterButtonActive,
                index === 0 && styles.filterButtonFirst,
                index === filters.length - 1 && styles.filterButtonLast,
              ]}
              onPress={() => setFilterLead(filter.key)}
              activeOpacity={0.7}
            >
              <View style={styles.filterButtonContent}>
                <Ionicons
                  name={filter.icon}
                  size={getResponsiveFontSize(16)}
                  color={filterLead === filter.key ? "#FFFFFF" : "#6b7280"}
                />
                <Text style={[styles.filterButtonText, filterLead === filter.key && styles.filterButtonTextActive]}>
                  {filter.label}
                </Text>
                {filter.count > 0 && (
                  <View style={[styles.filterBadge, filterLead === filter.key && styles.filterBadgeActive]}>
                    <Text style={[styles.filterBadgeText, filterLead === filter.key && styles.filterBadgeTextActive]}>
                      {filter.count}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }

  const renderModal = (visible, onClose, title, children, actions) => (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose} statusBarTranslucent>
      <BlurView intensity={20} style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.8}>
              <Ionicons name="close" size={getResponsiveFontSize(24)} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
          <View style={styles.modalActions}>{actions}</View>
        </View>
      </BlurView>
    </Modal>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Lead Management</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{filteredLeads.length}</Text>
              <Text style={styles.statLabel}>{filteredLeads.length === 1 ? "Lead" : "Leads"}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{leads.filter((l) => l.status === "SUCCESS").length}</Text>
              <Text style={styles.statLabel}>Converted</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddLead} activeOpacity={0.8}>
          <Ionicons name="add" size={getResponsiveFontSize(24)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={getResponsiveFontSize(20)} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search leads by name..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#9ca3af"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.8}>
              <Ionicons name="close-circle" size={getResponsiveFontSize(20)} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      {renderFilterButtons()}

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading your leads...</Text>
        </View>
      ) : filteredLeads.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredLeads}
          renderItem={renderLeadCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6366f1"]} tintColor="#6366f1" />
          }
          numColumns={GRID_COLUMNS}
          columnWrapperStyle={GRID_COLUMNS > 1 ? styles.row : null}
          key={GRID_COLUMNS} // Force re-render when columns change
        />
      )}

      {/* Status Update Modal */}
      {renderModal(
        modalVisible,
        () => setModalVisible(false),
        `Update Status for ${selectedLead?.name}`,
        <>
          <Text style={styles.modalLabel}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Follow Up" value="FOLLOW_UP" />
              <Picker.Item label="Under Review" value="UNDER_REVIEW" />
              <Picker.Item label="Demo" value="DEMO" />
              <Picker.Item label="Negotiation" value="NEGOTIATION" />
              <Picker.Item label="Success" value="SUCCESS" />
              <Picker.Item label="Inactive" value="INACTIVE" />
            </Picker>
          </View>
          <Text style={styles.modalLabel}>Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
            <Text style={styles.dateButtonText}>{selectedDate.toLocaleDateString("en-GB")}</Text>
            <Ionicons name="calendar" size={getResponsiveFontSize(20)} color="#6366f1" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === "ios")
                if (date) setSelectedDate(date)
              }}
            />
          )}
        </>,
        <>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.saveButton]}
            onPress={handleSaveStep}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </>,
      )}

      {/* Review Modal */}
      {renderModal(
        reviewModalVisible,
        () => setReviewModalVisible(false),
        `Add Review for ${selectedLead?.name}`,
        <>
          <Text style={styles.modalLabel}>Review Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowReviewDatePicker(true)} activeOpacity={0.8}>
            <Text style={styles.dateButtonText}>{reviewDate.toLocaleDateString("en-GB")}</Text>
            <Ionicons name="calendar" size={getResponsiveFontSize(20)} color="#6366f1" />
          </TouchableOpacity>
          {showReviewDatePicker && (
            <DateTimePicker
              value={reviewDate}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(event, date) => {
                setShowReviewDatePicker(Platform.OS === "ios")
                if (date) setReviewDate(date)
              }}
            />
          )}
          <Text style={styles.modalLabel}>Remark</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Add your review or remark here..."
            value={reviewRemark}
            onChangeText={setReviewRemark}
            multiline
            placeholderTextColor="#9ca3af"
          />
        </>,
        <>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setReviewModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.saveButton]}
            onPress={handleSaveReview}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Review</Text>
          </TouchableOpacity>
        </>,
      )}

      {/* Detail Modal */}
      {renderModal(
        detailModalVisible,
        () => setDetailModalVisible(false),
        `${selectedLead?.name} - Lead Details`,
        selectedLead && (
          <>
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <Ionicons name="person" size={getResponsiveFontSize(20)} color="#6366f1" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Full Name</Text>
                    <Text style={styles.detailValue}>{selectedLead.name}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="briefcase" size={getResponsiveFontSize(20)} color="#059669" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Job Title</Text>
                    <Text style={styles.detailValue}>{selectedLead.jobTitle}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="business" size={getResponsiveFontSize(20)} color="#dc2626" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Company</Text>
                    <Text style={styles.detailValue}>{selectedLead.companyName}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <Ionicons name="mail" size={getResponsiveFontSize(20)} color="#7c3aed" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Email Address</Text>
                    <Text style={styles.detailValue}>{selectedLead.email}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="call" size={getResponsiveFontSize(20)} color="#f59e0b" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Phone Number</Text>
                    <Text style={styles.detailValue}>{selectedLead.phoneNumber}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Lead Information</Text>
              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={getResponsiveFontSize(20)} color="#ec4899" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Found On</Text>
                    <Text style={styles.detailValue}>{new Date(selectedLead.foundOn).toLocaleDateString("en-GB")}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="flag" size={getResponsiveFontSize(20)} color="#10b981" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Current Status</Text>
                    <Text style={styles.detailValue}>{selectedLead.status}</Text>
                  </View>
                </View>
              </View>
            </View>
            {selectedLead.leadLogs?.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Activity Timeline</Text>
                <FlatList
                  data={selectedLead.leadLogs}
                  renderItem={({ item: log }) => (
                    <View style={styles.logItem}>
                      <View style={styles.logIcon}>
                        <Ionicons name="checkmark" size={getResponsiveFontSize(12)} color="#FFFFFF" />
                      </View>
                      <View style={styles.logContent}>
                        <Text style={styles.logStatus}>{log.status}</Text>
                        <Text style={styles.logDate}>{new Date(log.logDate).toLocaleDateString("en-GB")}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(log) => log.id.toString()}
                  style={styles.logsContainer}
                  scrollEnabled={false}
                />
              </View>
            )}
            {selectedLead.remark && (
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Latest Remark</Text>
                <View style={styles.remarkDetailContainer}>
                  <Text style={styles.remarkDetailText}>{selectedLead.remark}</Text>
                  <Text style={styles.remarkDetailDate}>
                    {new Date(selectedLead.remarkdate || new Date()).toLocaleDateString("en-GB")}
                  </Text>
                </View>
              </View>
            )}
          </>
        ),
        <>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setDetailModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Close</Text>
          </TouchableOpacity>
        </>,
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: getResponsiveHeight(2.5),
    paddingBottom: getResponsivePadding(24),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: getResponsiveFontSize(32),
    fontWeight: "800",
    color: "#111827",
    marginBottom: getResponsiveHeight(1),
    letterSpacing: -0.5,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: "#6366f1",
  },
  statLabel: {
    fontSize: getResponsiveFontSize(12),
    color: "#6b7280",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: getResponsiveHeight(4),
    backgroundColor: "#e5e7eb",
    marginHorizontal: getResponsiveWidth(4),
  },
  addButton: {
    backgroundColor: "#6366f1",
    width: getResponsiveWidth(15),
    height: getResponsiveWidth(15),
    borderRadius: getResponsiveWidth(7.5),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  searchContainer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: getResponsivePadding(16),
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: getResponsiveWidth(4),
    paddingHorizontal: getResponsivePadding(16),
    height: getResponsiveHeight(6.5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: getResponsiveWidth(3),
  },
  searchInput: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: "#111827",
    fontWeight: "500",
  },
  filterWrapper: {
    paddingVertical: getResponsivePadding(12),
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  filterContainer: {
    paddingHorizontal: getResponsivePadding(20),
    gap: getResponsiveWidth(3),
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(6),
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: getResponsiveHeight(5.5),
    minWidth: getResponsiveWidth(18),
  },
  filterButtonFirst: {
    marginLeft: getResponsiveWidth(1),
  },
  filterButtonLast: {
    marginRight: getResponsiveWidth(1),
  },
  filterButtonActive: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.02 }],
  },
  filterButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveWidth(2),
  },
  filterButtonText: {
    fontSize: getResponsiveFontSize(14),
    color: "#6b7280",
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  filterBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: getResponsiveWidth(2.5),
    paddingHorizontal: getResponsivePadding(6),
    paddingVertical: getResponsivePadding(2),
    minWidth: getResponsiveWidth(5),
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadgeActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  filterBadgeText: {
    fontSize: getResponsiveFontSize(11),
    fontWeight: "700",
    color: "#6b7280",
  },
  filterBadgeTextActive: {
    color: "#FFFFFF",
  },
  listContainer: {
    padding: HORIZONTAL_PADDING,
    paddingBottom: getResponsiveHeight(5),
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: getResponsiveWidth(5),
    marginBottom: getResponsiveHeight(2.5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    overflow: "hidden",
    flex: GRID_COLUMNS > 1 ? 1 : undefined,
    marginHorizontal: GRID_COLUMNS > 1 ? getResponsiveWidth(1) : 0,
  },
  cardTablet: {
    maxWidth: isTablet ? (isLargeTablet ? screenWidth * 0.3 : screenWidth * 0.45) : "100%",
  },
  cardGradient: {
    padding: getResponsivePadding(24),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: getResponsiveHeight(2.5),
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: getResponsiveWidth(4),
  },
  avatar: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    borderRadius: getResponsiveWidth(6),
    justifyContent: "center",
    alignItems: "center",
    marginRight: getResponsiveWidth(3),
  },
  avatarText: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: "#111827",
    marginBottom: getResponsiveHeight(0.3),
  },
  company: {
    fontSize: getResponsiveFontSize(14),
    color: "#6b7280",
    fontWeight: "500",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getResponsivePadding(6),
    paddingHorizontal: getResponsivePadding(12),
    borderRadius: getResponsiveWidth(5),
    borderWidth: 1,
    gap: getResponsiveWidth(1),
  },
  statusIcon: {
    marginRight: getResponsiveWidth(0.5),
  },
  statusText: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: "600",
    textTransform: "capitalize",
  },
  cardContent: {
    marginBottom: getResponsiveHeight(3),
  },
  infoGrid: {
    gap: getResponsiveHeight(1.5),
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconContainer: {
    width: getResponsiveWidth(8),
    height: getResponsiveWidth(8),
    borderRadius: getResponsiveWidth(4),
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: getResponsiveWidth(3),
  },
  infoText: {
    fontSize: getResponsiveFontSize(15),
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },
  remarkContainer: {
    backgroundColor: "#f8fafc",
    padding: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(3),
    marginTop: getResponsiveHeight(2),
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  remarkHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(1),
    gap: getResponsiveWidth(1.5),
  },
  remarkLabel: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: "600",
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  remarkText: {
    fontSize: getResponsiveFontSize(14),
    color: "#374151",
    lineHeight: getResponsiveHeight(2.5),
    marginBottom: getResponsiveHeight(1),
  },
  remarkDate: {
    fontSize: getResponsiveFontSize(12),
    color: "#9ca3af",
    fontWeight: "500",
  },
  actionContainer: {
    gap: getResponsiveHeight(1.5),
  },
  primaryActions: {
    flexDirection: "row",
    gap: getResponsiveWidth(3),
  },
  secondaryActions: {
    flexDirection: "row",
    gap: getResponsiveWidth(2),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(3),
    gap: getResponsiveWidth(1.5),
    flex: 1,
  },
  primaryButton: {
    backgroundColor: "#6366f1",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: getResponsiveFontSize(13),
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(13),
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: getResponsiveHeight(2),
  },
  loadingText: {
    fontSize: getResponsiveFontSize(16),
    color: "#6b7280",
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getResponsiveWidth(10),
    gap: getResponsiveHeight(2.5),
  },
  emptyIconContainer: {
    width: getResponsiveWidth(30),
    height: getResponsiveWidth(30),
    borderRadius: getResponsiveWidth(15),
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: getResponsiveHeight(1),
  },
  emptyTitle: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: getResponsiveFontSize(16),
    color: "#6b7280",
    textAlign: "center",
    lineHeight: getResponsiveHeight(3),
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366f1",
    paddingVertical: getResponsivePadding(16),
    paddingHorizontal: getResponsivePadding(32),
    borderRadius: getResponsiveWidth(4),
    gap: getResponsiveWidth(2),
    marginTop: getResponsiveHeight(1),
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: getResponsiveWidth(6),
    width: isTablet ? screenWidth * 0.7 : screenWidth * 0.9,
    maxWidth: 600,
    maxHeight: screenHeight * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 25,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: getResponsivePadding(24),
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    marginRight: getResponsiveWidth(4),
  },
  closeButton: {
    width: getResponsiveWidth(10),
    height: getResponsiveWidth(10),
    borderRadius: getResponsiveWidth(5),
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: getResponsivePadding(24),
    maxHeight: screenHeight * 0.5,
  },
  modalLabel: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
    color: "#111827",
    marginBottom: getResponsiveHeight(1),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: getResponsiveWidth(3),
    marginBottom: getResponsiveHeight(2.5),
    backgroundColor: "#f9fafb",
  },
  picker: {
    height: Platform.OS === "ios" ? getResponsiveHeight(18) : getResponsiveHeight(6),
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(16),
    marginBottom: getResponsiveHeight(2.5),
    backgroundColor: "#f9fafb",
  },
  dateButtonText: {
    fontSize: getResponsiveFontSize(16),
    color: "#111827",
    fontWeight: "500",
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(16),
    fontSize: getResponsiveFontSize(16),
    minHeight: getResponsiveHeight(12),
    textAlignVertical: "top",
    backgroundColor: "#f9fafb",
    color: "#111827",
  },
  modalActions: {
    flexDirection: "row",
    gap: getResponsiveWidth(3),
    padding: getResponsivePadding(24),
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  modalButton: {
    flex: 1,
    paddingVertical: getResponsivePadding(16),
    paddingHorizontal: getResponsivePadding(24),
    borderRadius: getResponsiveWidth(3),
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#6366f1",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
  },
  detailSection: {
    marginBottom: getResponsiveHeight(3),
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
    color: "#111827",
    marginBottom: getResponsiveHeight(2),
  },
  detailGrid: {
    gap: getResponsiveHeight(2),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: getResponsiveWidth(3),
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: getResponsiveHeight(0.5),
  },
  detailValue: {
    fontSize: getResponsiveFontSize(16),
    color: "#111827",
    fontWeight: "500",
  },
  logsContainer: {
    marginTop: getResponsiveHeight(1),
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(1.5),
    gap: getResponsiveWidth(3),
  },
  logIcon: {
    width: getResponsiveWidth(6),
    height: getResponsiveWidth(6),
    borderRadius: getResponsiveWidth(3),
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  logContent: {
    flex: 1,
  },
  logStatus: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    color: "#111827",
    textTransform: "capitalize",
  },
  logDate: {
    fontSize: getResponsiveFontSize(12),
    color: "#6b7280",
    marginTop: getResponsiveHeight(0.3),
  },
  remarkDetailContainer: {
    backgroundColor: "#f8fafc",
    padding: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(3),
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  remarkDetailText: {
    fontSize: getResponsiveFontSize(15),
    color: "#374151",
    lineHeight: getResponsiveHeight(2.8),
    marginBottom: getResponsiveHeight(1),
  },
  remarkDetailDate: {
    fontSize: getResponsiveFontSize(12),
    color: "#9ca3af",
    fontWeight: "500",
  },
})

export default LeadManagement
