// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   FlatList,
//   Modal,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([]);
//   const [filteredLands, setFilteredLands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const [addPartnerModalVisible, setAddPartnerModalVisible] = useState(false);
//   const [showModalVisible, setShowModalVisible] = useState(false);
//   const [selectedLandId, setSelectedLandId] = useState(null);
//   const [partnerName, setPartnerName] = useState('');
//   const [selectedLand, setSelectedLand] = useState(null);

//   const getAllLands = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       if (!jwtToken) {
//         throw new Error('No JWT token found');
//       }

//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       setLands(response.data);
//       setFilteredLands(response.data);
//       console.log(JSON.stringify(response.data, null, 2));
//     } catch (err) {
//       setError(err.message || 'Failed to fetch lands');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await getAllLands();
//     setRefreshing(false);
//   }, []);

//   useEffect(() => {
//     getAllLands();
//   }, []);

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredLands(filtered);
//   }, [searchText, lands]);

//   const handleLandPress = (land) => {
//     console.log('Card tapped:', land.id);
//   };

//   const handleShowLand = (land) => {
//     setSelectedLand(land);
//     setShowModalVisible(true);
//   };

//   const handleAddLand = () => {
//     navigation.navigate('Add_Edit_Land');
//   };

//   const handleDeleteLand = (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this land?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const jwtToken = await AsyncStorage.getItem('jwtToken');
//               await axios.delete(`${BASE_URL}/delete/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${jwtToken}`,
//                 },
//               });
//               getAllLands();
//               Alert.alert('Success', 'Land deleted successfully');
//             } catch (err) {
//               Alert.alert('Error', err.message || 'Failed to delete land');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleStartProject = (landId) => {
//     navigation.navigate('Flat_Management', { id: landId });
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     const date = new Date(dateStr);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const InfoRow = ({ icon, label, value }) => (
//     <View style={styles.detailRow}>
//       <Ionicons name={icon} size={20} color="#555" style={styles.detailIcon} />
//       <Text style={styles.label}>{label}</Text>
//       <Text style={styles.value}>{value}</Text>
//     </View>
//   );

//   const renderLandCard = ({ item }) => (
//     <View style={styles.card}>
//       <TouchableOpacity activeOpacity={0.7} onPress={() => handleLandPress(item)}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.landName}>
//             {item.owner?.name || item.address?.landmark || 'Unnamed Land'}
//           </Text>
//           {item.project && (
//             <View style={[styles.statusBadge, item.project.status === 'IN_PROGRESS' ? styles.inProgress : styles.completed]}>
//               <Text style={[styles.statusText, item.project.status === 'IN_PROGRESS' ? styles.inProgressText : styles.completedText]}>
//                 {item.project.status?.replace('_', ' ') || 'UNKNOWN'}
//               </Text>
//             </View>
//           )}
//         </View>
//         <View style={styles.details}>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ''}, ${item.address?.city || ''}`}
//           />
//           <InfoRow
//             icon="map-outline"
//             label="Area"
//             value={item.area ? `${item.area} sq.ft` : 'N/A'}
//           />
//           <InfoRow
//             icon="cash-outline"
//             label="Total Amount"
//             value={item.totalAmount ? `₹${item.totalAmount.toLocaleString('en-IN')}` : 'N/A'}
//           />
//           <InfoRow
//             icon="person-outline"
//             label="Purchaser"
//             value={item.purchaser?.name || 'N/A'}
//           />
//           <InfoRow
//             icon="calendar-outline"
//             label="Added On"
//             value={formatDate(item.landAddOnDate)}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Project"
//             value={item.project?.name || 'No Project'}
//           />
//         </View>
//       </TouchableOpacity>
//       <View style={styles.actionRow}>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.showButton]}
//           onPress={() => handleShowLand(item)}
//         >
//           <Ionicons name="eye-outline" size={20} color="#FFFFFF" />
//           <Text style={styles.actionButtonText}>Show</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.editButton]}
//           onPress={() => navigation.navigate('Add_Edit_Land', { id: item.id })}
//         >
//           <Ionicons name="pencil-outline" size={20} color="#FFFFFF" />
//           <Text style={styles.actionButtonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.deleteButton]}
//           onPress={() => handleDeleteLand(item.id)}
//         >
//           <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
//           <Text style={styles.actionButtonText}>Delete</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.addPartnerButton]}
//           onPress={() => navigation.navigate('Add_Edit_Partners', { landId: item.id })}
//         >
//           <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
//           <Text style={styles.actionButtonText}>Add Partner</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.startButton, item.project && styles.disabledButton]}
//           onPress={() => handleStartProject(item.id)}
//           disabled={item.project !== null}
//         >
//           <Ionicons name="play-outline" size={20} color="#FFFFFF" />
//           <Text style={styles.actionButtonText}>Start</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.infoText}>Loading lands...</Text>
//         </View>
//       );
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="cloud-offline-outline" size={60} color="#D32F2F" />
//           <Text style={styles.errorText}>Error: {error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllLands}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={styles.listContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={['#007AFF']}
//             tintColor="#007AFF"
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.centeredContainer}>
//             <Ionicons name="file-tray-stacked-outline" size={60} color="#888" />
//             <Text style={styles.infoText}>No lands found.</Text>
//             <Text style={styles.infoSubText}>Tap the '+' to add your first land.</Text>
//           </View>
//         }
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Land Management</Text>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLand}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by address or owner..."
//         value={searchText}
//         onChangeText={setSearchText}
//       />
//       {renderContent()}
//       <Modal
//         visible={showModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => {
//           setShowModalVisible(false);
//           setSelectedLand(null); // Reset selectedLand when closing
//         }}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowModalVisible(false)}
//             >
//               <Ionicons name="close" size={24} color="#1A1A1A" />
//             </TouchableOpacity>
//             <Text style={styles.modalTitle}>Land Participants</Text>
//             <View style={styles.participantList}>
//               {selectedLand?.partners?.length > 0 ? (
//                 selectedLand.partners.map((partner) => (
//                   <View key={partner.id || Math.random().toString()} style={styles.participantRow}>
//                     <Text style={styles.participantName}>Partner: {partner.name}</Text>
//                     <TouchableOpacity
//                       style={styles.payButton}
//                       onPress={() => {
//                         setShowModalVisible(false);
//                         navigation.navigate('View_Partner_Transactions', { partnerId: partner.id });
//                       }}
//                     >
//                       <Text style={styles.payButtonText}>View</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.payButton}
//                       onPress={() => {
//                         setShowModalVisible(false);
//                         navigation.navigate('Pay_Partner', { partnerId: partner.id });
//                       }}
//                     >
//                       <Text style={styles.payButtonText}>Pay</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))
//               ) : (
//                 <Text style={styles.noParticipantsText}>No partners added.</Text>
//               )}
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
//     backgroundColor: '#F7F8FA',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     paddingBottom: 15,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E8E8E8',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   searchInput: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 15,
//     margin: 20,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E8E8E8',
//   },
//   listContent: {
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginBottom: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   landName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//     flex: 1,
//     marginRight: 10,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//   },
//   inProgress: { backgroundColor: '#FFF5E1' },
//   inProgressText: { color: '#FFA800' },
//   completed: { backgroundColor: '#E6F4EA' },
//   completedText: { color: '#2E7D32' },
//   details: {
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingTop: 16,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   detailIcon: {
//     marginRight: 12,
//     width: 20,
//   },
//   label: {
//     fontSize: 15,
//     color: '#666666',
//     flex: 0.45,
//   },
//   value: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#1A1A1A',
//     flex: 0.55,
//     textAlign: 'right',
//   },
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     flex: 1,
//     minWidth: 80,
//     justifyContent: 'center',
//     elevation: 2,
//   },
//   showButton: { backgroundColor: '#007AFF' },
//   editButton: { backgroundColor: '#FFA800' },
//   deleteButton: { backgroundColor: '#D32F2F' },
//   addPartnerButton: { backgroundColor: '#2E7D32' },
//   startButton: { backgroundColor: '#007AFF' },
//   disabledButton: { backgroundColor: '#A0A0A0' },
//   actionButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   infoText: {
//     marginTop: 15,
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#666666',
//   },
//   infoSubText: {
//     marginTop: 5,
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#D32F2F',
//     textAlign: 'center',
//     marginTop: 15,
//     fontWeight: '500',
//   },
//   retryButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginTop: 20,
//     elevation: 2,
//   },
//   retryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     width: '90%',
//     maxWidth: 400,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1A1A1A',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   participantList: {
//     marginTop: 10,
//   },
//   participantRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E8E8E8',
//   },
//   participantName: {
//     fontSize: 16,
//     color: '#1A1A1A',
//     flex: 1,
//   },
//   payButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   payButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   noParticipantsText: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });

// export default Land_Management;







"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Animated,
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Enhanced responsive helper functions
const getResponsiveWidth = (percentage) => (SCREEN_WIDTH * percentage) / 100
const getResponsiveHeight = (percentage) => (SCREEN_HEIGHT * percentage) / 100
const getResponsiveFontSize = (size) => {
  const scale = SCREEN_WIDTH / 375 // Base width (iPhone X)
  const newSize = size * scale
  return Math.max(Math.min(newSize, size * 1.4), size * 0.7)
}
const getResponsivePadding = (size) => {
  const scale = SCREEN_WIDTH / 375
  return Math.max(Math.min(size * scale, size * 1.3), size * 0.8)
}

// Device type detection
const isSmallPhone = SCREEN_WIDTH < 350
const isPhone = SCREEN_WIDTH < 768
const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024
const isLargeTablet = SCREEN_WIDTH >= 1024
const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT
const isShortScreen = SCREEN_HEIGHT < 700

// Dynamic modal sizing
const getModalDimensions = () => {
  if (isLargeTablet) {
    return {
      width: isLandscape ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.65,
      maxHeight: SCREEN_HEIGHT * 0.8,
      borderRadius: getResponsiveWidth(3),
      padding: getResponsivePadding(24),
    }
  } else if (isTablet) {
    return {
      width: isLandscape ? SCREEN_WIDTH * 0.6 : SCREEN_WIDTH * 0.75,
      maxHeight: SCREEN_HEIGHT * 0.85,
      borderRadius: getResponsiveWidth(4),
      padding: getResponsivePadding(20),
    }
  } else if (isSmallPhone) {
    return {
      width: SCREEN_WIDTH * 0.95,
      maxHeight: SCREEN_HEIGHT * 0.9,
      borderRadius: getResponsiveWidth(4),
      padding: getResponsivePadding(16),
    }
  } else {
    return {
      width: SCREEN_WIDTH * 0.9,
      maxHeight: SCREEN_HEIGHT * 0.85,
      borderRadius: getResponsiveWidth(4),
      padding: getResponsivePadding(20),
    }
  }
}

const Land_Management = ({ navigation }) => {
  const [lands, setLands] = useState([])
  const [filteredLands, setFilteredLands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [showModalVisible, setShowModalVisible] = useState(false)
  const [selectedLand, setSelectedLand] = useState(null)
  const [fadeAnim] = useState(new Animated.Value(0))
  const [modalAnim] = useState(new Animated.Value(0))

  const modalDimensions = getModalDimensions()

  const getAllLands = async () => {
    setLoading(true)
    setError(null)
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken")
      if (!jwtToken) {
        throw new Error("No JWT token found")
      }
      const response = await axios.get(`${BASE_URL}/getAllland`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      setLands(response.data)
      setFilteredLands(response.data)
      console.log(JSON.stringify(response.data, null, 2))
    } catch (err) {
      setError(err.message || "Failed to fetch lands")
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await getAllLands()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    getAllLands()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    const filtered = lands.filter(
      (land) =>
        land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
    )
    setFilteredLands(filtered)
  }, [searchText, lands])

  const handleLandPress = (land) => {
    console.log("Card tapped:", land.id)
  }

  const handleShowLand = (land) => {
    setSelectedLand(land)
    setShowModalVisible(true)
    Animated.spring(modalAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start()
  }

  const handleCloseModal = () => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowModalVisible(false)
      setSelectedLand(null)
    })
  }

  const handleAddLand = () => {
    navigation.navigate("Add_Edit_Land")
  }

  const handleDeleteLand = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const jwtToken = await AsyncStorage.getItem("jwtToken")
            await axios.delete(`${BASE_URL}/delete/${id}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            getAllLands()
            Alert.alert("Success", "Land deleted successfully")
          } catch (err) {
            Alert.alert("Error", err.message || "Failed to delete land")
          }
        },
      },
    ])
  }

  const handleStartProject = (landId) => {
    navigation.navigate("Flat_Management", { id: landId })
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A"
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const formatCurrency = (amount) => {
    if (!amount) return "₹0"
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const formatArea = (area) => {
    if (!area) return "N/A"
    return `${area.toLocaleString()} sq ft`
  }

  // Enhanced InfoRow component with responsive design
  const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
    <View style={[styles.detailRow, isTablet && styles.detailRowTablet]}>
      <View style={styles.detailIconContainer}>
        <Ionicons name={icon} size={getResponsiveFontSize(18)} color={colors.primary} />
      </View>
      <Text style={[styles.label, isTablet && styles.labelTablet]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }, isTablet && styles.valueTablet]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  )

  // Enhanced ActionButton component
  const ActionButton = ({ onPress, icon, text, style, disabled = false }) => (
    <TouchableOpacity
      style={[
        styles.actionButton,
        style,
        disabled && styles.disabledButton,
        isTablet && styles.actionButtonTablet,
        isSmallPhone && styles.actionButtonSmall,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityLabel={text}
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={getResponsiveFontSize(16)} color="#FFFFFF" />
      <Text style={[styles.actionButtonText, isTablet && styles.actionButtonTextTablet]}>{text}</Text>
    </TouchableOpacity>
  )

  // Enhanced Partner Card component
  const PartnerCard = ({ partner }) => {
    const totalTransactions = partner.landTransactions?.length || 0
    const totalAmount =
      partner.landTransactions?.reduce((sum, transaction) => {
        return transaction.change === "CREDIT"
          ? sum + transaction.transactionAmount
          : sum - transaction.transactionAmount
      }, 0) || 0

    return (
      <View style={[styles.partnerCard, isTablet && styles.partnerCardTablet]}>
        <View style={styles.partnerHeader}>
          <View style={styles.partnerInfo}>
            <View style={[styles.partnerAvatar, isTablet && styles.partnerAvatarTablet]}>
              <Text style={[styles.partnerInitial, isTablet && styles.partnerInitialTablet]}>
                {partner.name?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.partnerDetails}>
              <Text style={[styles.partnerName, isTablet && styles.partnerNameTablet]}>{partner.name}</Text>
              <Text style={[styles.partnerLocation, isTablet && styles.partnerLocationTablet]}>
                <Ionicons name="location-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
                {partner.city || "N/A"}
              </Text>
              <Text style={[styles.partnerPhone, isTablet && styles.partnerPhoneTablet]}>
                <Ionicons name="call-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
                {partner.phoneNumber || "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.partnerStats}>
            <Text style={[styles.partnerStatsNumber, isTablet && styles.partnerStatsNumberTablet]}>
              {totalTransactions}
            </Text>
            <Text style={[styles.partnerStatsLabel, isTablet && styles.partnerStatsLabelTablet]}>Transactions</Text>
            <Text
              style={[
                styles.partnerStatsAmount,
                { color: totalAmount >= 0 ? colors.success : colors.error },
                isTablet && styles.partnerStatsAmountTablet,
              ]}
            >
              {formatCurrency(Math.abs(totalAmount))}
            </Text>
          </View>
        </View>
        <View style={[styles.partnerActions, isTablet && styles.partnerActionsTablet]}>
          <TouchableOpacity
            style={[styles.partnerButton, styles.viewButton, isTablet && styles.partnerButtonTablet]}
            onPress={() => {
              handleCloseModal()
              navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
            }}
            accessibilityLabel="View Transactions"
            accessibilityRole="button"
          >
            <Ionicons name="eye-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
            <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.partnerButton, styles.payButton, isTablet && styles.partnerButtonTablet]}
            onPress={() => {
              handleCloseModal()
              navigation.navigate("Pay_Partner", { partnerId: partner.id })
            }}
            accessibilityLabel="Pay Partner"
            accessibilityRole="button"
          >
            <Ionicons name="card-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
            <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderLandCard = ({ item, index }) => (
    <Animated.View
      style={[
        styles.card,
        isTablet && styles.cardTablet,
        isLargeTablet && styles.cardLargeTablet,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.95} onPress={() => handleLandPress(item)}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.landTitleContainer}>
            <Text style={[styles.landName, isTablet && styles.landNameTablet]} numberOfLines={2}>
              {item.address?.landmark || item.owner?.name || "Unnamed Land"}
            </Text>
            {item.project && (
              <View
                style={[
                  styles.statusBadge,
                  item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
                  ]}
                >
                  {item.project.status?.replace("_", " ") || "UNKNOWN"}
                </Text>
              </View>
            )}
          </View>
          {item.project && (
            <Text style={[styles.projectName, isTablet && styles.projectNameTablet]}>Project: {item.project.name}</Text>
          )}
        </View>

        {/* Financial Summary */}
        <View style={[styles.financialSummary, isTablet && styles.financialSummaryTablet]}>
          <View style={[styles.amountCard, { borderLeftColor: colors.success }]}>
            <View style={styles.amountHeader}>
              <Ionicons name="cash-outline" size={getResponsiveFontSize(20)} color={colors.success} />
              <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Total Amount</Text>
            </View>
            <Text style={[styles.amountValue, { color: colors.success }, isTablet && styles.amountValueTablet]}>
              {formatCurrency(item.totalAmount)}
            </Text>
          </View>
          <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
            <View style={styles.amountHeader}>
              <Ionicons name="resize-outline" size={getResponsiveFontSize(20)} color={colors.secondary} />
              <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Area</Text>
            </View>
            <Text style={[styles.amountValue, { color: colors.secondary }, isTablet && styles.amountValueTablet]}>
              {formatArea(item.area)}
            </Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.details}>
          <InfoRow
            icon="location-outline"
            label="Address"
            value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
          />
          <InfoRow
            icon="person-outline"
            label="Owner"
            value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
          />
          <InfoRow
            icon="business-outline"
            label="Purchaser"
            value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
          />
          <InfoRow icon="calendar-outline" label="Added On" value={formatDate(item.landAddOnDate)} />
          <InfoRow
            icon="briefcase-outline"
            label="Project"
            value={item.project?.name || "No Project"}
            valueColor={item.project ? colors.primary : colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
        <ActionButton
          onPress={() => handleShowLand(item)}
          icon="eye-outline"
          text="Details"
          style={styles.showButton}
        />
        <ActionButton
          onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
          icon="pencil-outline"
          text="Edit"
          style={styles.editButton}
        />
        <ActionButton
          onPress={() => handleDeleteLand(item.id)}
          icon="trash-outline"
          text="Delete"
          style={styles.deleteButton}
        />
      </View>
      <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
        <ActionButton
          onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
          icon="person-add-outline"
          text="Add Partner"
          style={styles.addPartnerButton}
        />
        <ActionButton
          onPress={() => handleStartProject(item.id)}
          disabled={!!item.project}
          icon="play-outline"
          text={ "Start Project"}
          style={item.project ? styles.manageButton : styles.startButton}
        />
      </View>
    </Animated.View>
  )

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, isTablet && styles.loadingTextTablet]}>Loading lands...</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.centeredContainer}>
          <Ionicons name="cloud-offline-outline" size={getResponsiveFontSize(60)} color={colors.error} />
          <Text style={[styles.errorText, isTablet && styles.errorTextTablet]}>Error: {error}</Text>
          <TouchableOpacity style={[styles.retryButton, isTablet && styles.retryButtonTablet]} onPress={getAllLands}>
            <Text style={[styles.retryButtonText, isTablet && styles.retryButtonTextTablet]}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <FlatList
        data={filteredLands}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderLandCard}
        contentContainerStyle={[styles.listContent, isTablet && styles.listContentTablet]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        numColumns={isLargeTablet ? 2 : 1}
        columnWrapperStyle={isLargeTablet ? styles.columnWrapper : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-stacked-outline" size={getResponsiveFontSize(80)} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, isTablet && styles.emptyTitleTablet]}>No lands found</Text>
            <Text style={[styles.emptySubtitle, isTablet && styles.emptySubtitleTablet]}>
              Tap the '+' button to add your first land property
            </Text>
          </View>
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <View>
          <Text style={[styles.title, isTablet && styles.titleTablet]}>Land Management</Text>
          <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
            {filteredLands.length} properties • Total Value:{" "}
            {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, isTablet && styles.addButtonTablet]}
          onPress={handleAddLand}
          activeOpacity={0.8}
          accessibilityLabel="Add Land"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={getResponsiveFontSize(24)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={[styles.searchContainer, isTablet && styles.searchContainerTablet]}>
        <Ionicons
          name="search-outline"
          size={getResponsiveFontSize(20)}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, isTablet && styles.searchInputTablet]}
          placeholder="Search by address, owner, or project..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
          accessibilityLabel="Search input"
          accessibilityRole="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Ionicons name="close-circle" size={getResponsiveFontSize(20)} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {renderContent()}

      {/* Enhanced Modal */}
      <Modal
        visible={showModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={handleCloseModal}
        accessibilityLabel="Land Details Modal"
        statusBarTranslucent={Platform.OS === "android"}
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: modalAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                width: modalDimensions.width,
                maxHeight: modalDimensions.maxHeight,
                borderRadius: modalDimensions.borderRadius,
                padding: modalDimensions.padding,
                transform: [
                  {
                    scale: modalAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
              isTablet && styles.modalContentTablet,
            ]}
          >
            {/* Modal Header */}
            <View style={[styles.modalHeader, isTablet && styles.modalHeaderTablet]}>
              <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>Land Details</Text>
              <TouchableOpacity
                style={[styles.closeButton, isTablet && styles.closeButtonTablet]}
                onPress={handleCloseModal}
                accessibilityLabel="Close Modal"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={getResponsiveFontSize(24)} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={[styles.modalScrollView, isTablet && styles.modalScrollViewTablet]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              {selectedLand && (
                <>
                  {/* Property Summary */}
                  <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
                    <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
                      Property Summary
                    </Text>
                    <Text style={[styles.modalLandName, isTablet && styles.modalLandNameTablet]}>
                      {selectedLand.address?.landmark || selectedLand.owner?.name || "Unnamed Land"}
                    </Text>
                    <Text style={[styles.modalLocation, isTablet && styles.modalLocationTablet]}>
                      {selectedLand.address?.city || "N/A"}, {selectedLand.address?.state || "N/A"}
                    </Text>
                  </View>

                  {/* Financial Overview */}
                  <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
                    <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
                      Financial Overview
                    </Text>
                    <View style={[styles.modalAmountGrid, isTablet && styles.modalAmountGridTablet]}>
                      <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
                        <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>
                          Total Amount
                        </Text>
                        <Text
                          style={[
                            styles.modalAmountValue,
                            { color: colors.success },
                            isTablet && styles.modalAmountValueTablet,
                          ]}
                        >
                          {formatCurrency(selectedLand.totalAmount)}
                        </Text>
                      </View>
                      <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
                        <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>Area</Text>
                        <Text
                          style={[
                            styles.modalAmountValue,
                            { color: colors.secondary },
                            isTablet && styles.modalAmountValueTablet,
                          ]}
                        >
                          {formatArea(selectedLand.area)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Partners Section */}
                  <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
                    <View style={[styles.partnersHeader, isTablet && styles.partnersHeaderTablet]}>
                      <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
                        Partners & Transactions
                      </Text>
                    </View>
                    {selectedLand?.partners?.length > 0 ? (
                      selectedLand.partners.map((partner, index) => (
                        <PartnerCard key={partner.id || index} partner={partner} />
                      ))
                    ) : (
                      <View style={[styles.noPartnersContainer, isTablet && styles.noPartnersContainerTablet]}>
                        <Ionicons name="people-outline" size={getResponsiveFontSize(48)} color={colors.textSecondary} />
                        <Text style={[styles.noPartnersText, isTablet && styles.noPartnersTextTablet]}>
                          No partners added yet
                        </Text>
                        <Text style={[styles.noPartnersSubtext, isTablet && styles.noPartnersSubtextTablet]}>
                          Add partners to start collaboration and track transactions
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  )
}

const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  background: "#F7F8FA",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#666666",
  border: "#E8E8E8",
  shadow: "#000000",
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getResponsivePadding(20),
    paddingTop: getResponsiveHeight(5),
    paddingBottom: getResponsivePadding(15),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTablet: {
    paddingHorizontal: getResponsivePadding(32),
    paddingTop: getResponsiveHeight(4),
    paddingBottom: getResponsivePadding(20),
  },
  title: {
    fontSize: getResponsiveFontSize(32),
    fontWeight: "bold",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  titleTablet: {
    fontSize: getResponsiveFontSize(36),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginTop: getResponsiveHeight(0.5),
    fontWeight: "500",
  },
  subtitleTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  addButton: {
    backgroundColor: colors.primary,
    width: getResponsiveWidth(11),
    height: getResponsiveWidth(11),
    borderRadius: getResponsiveWidth(5.5),
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonTablet: {
    width: getResponsiveWidth(9),
    height: getResponsiveWidth(9),
    borderRadius: getResponsiveWidth(4.5),
  },

  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: getResponsiveWidth(3),
    marginHorizontal: getResponsivePadding(20),
    marginVertical: getResponsiveHeight(2),
    paddingHorizontal: getResponsivePadding(15),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainerTablet: {
    marginHorizontal: getResponsivePadding(32),
    paddingHorizontal: getResponsivePadding(20),
  },
  searchIcon: {
    marginRight: getResponsiveWidth(3),
  },
  searchInput: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: colors.textPrimary,
    paddingVertical: getResponsivePadding(15),
  },
  searchInputTablet: {
    fontSize: getResponsiveFontSize(18),
    paddingVertical: getResponsivePadding(18),
  },
  clearButton: {
    padding: getResponsivePadding(4),
  },

  // List Styles
  listContent: {
    paddingHorizontal: getResponsivePadding(16),
    paddingVertical: getResponsivePadding(20),
  },
  listContentTablet: {
    paddingHorizontal: getResponsivePadding(32),
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: getResponsivePadding(8),
  },

  // Card Styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: getResponsiveWidth(4),
    marginBottom: getResponsiveHeight(2.5),
    padding: getResponsivePadding(20),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTablet: {
    padding: getResponsivePadding(24),
    marginBottom: getResponsiveHeight(3),
  },
  cardLargeTablet: {
    width: "48%",
    marginHorizontal: "1%",
  },
  cardHeader: {
    marginBottom: getResponsiveHeight(2),
  },
  landTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: getResponsiveHeight(1),
  },
  landName: {
    fontSize: getResponsiveFontSize(22),
    fontWeight: "bold",
    color: colors.textPrimary,
    flex: 1,
    marginRight: getResponsiveWidth(2.5),
    lineHeight: getResponsiveFontSize(26),
  },
  landNameTablet: {
    fontSize: getResponsiveFontSize(26),
    lineHeight: getResponsiveFontSize(30),
  },
  projectName: {
    fontSize: getResponsiveFontSize(15),
    color: colors.textSecondary,
    fontWeight: "500",
    fontStyle: "italic",
  },
  projectNameTablet: {
    fontSize: getResponsiveFontSize(17),
  },
  statusBadge: {
    paddingHorizontal: getResponsivePadding(12),
    paddingVertical: getResponsivePadding(6),
    borderRadius: getResponsiveWidth(4),
  },
  statusText: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: "600",
    textTransform: "uppercase",
  },
  inProgress: { backgroundColor: "#FFF5E1" },
  inProgressText: { color: "#FFA800" },
  completed: { backgroundColor: "#E6F4EA" },
  completedText: { color: "#2E7D32" },

  // Financial Summary Styles
  financialSummary: {
    flexDirection: "row",
    gap: getResponsiveWidth(3),
    marginBottom: getResponsiveHeight(2),
  },
  financialSummaryTablet: {
    gap: getResponsiveWidth(4),
  },
  amountCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(12),
    borderLeftWidth: 4,
  },
  amountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(0.5),
  },
  amountTitle: {
    fontSize: getResponsiveFontSize(13),
    color: colors.textSecondary,
    marginLeft: getResponsiveWidth(2),
    fontWeight: "500",
  },
  amountTitleTablet: {
    fontSize: getResponsiveFontSize(15),
  },
  amountValue: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "700",
  },
  amountValueTablet: {
    fontSize: getResponsiveFontSize(18),
  },

  // Details Styles
  details: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: getResponsivePadding(16),
    marginBottom: getResponsiveHeight(2),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(1.2),
  },
  detailRowTablet: {
    marginBottom: getResponsiveHeight(1.5),
  },
  detailIconContainer: {
    marginRight: getResponsiveWidth(3),
    width: getResponsiveWidth(5),
    alignItems: "center",
  },
  label: {
    fontSize: getResponsiveFontSize(15),
    color: colors.textSecondary,
    flex: 0.4,
    fontWeight: "500",
  },
  labelTablet: {
    fontSize: getResponsiveFontSize(17),
  },
  value: {
    fontSize: getResponsiveFontSize(15),
    fontWeight: "500",
    color: colors.textPrimary,
    flex: 0.6,
    textAlign: "right",
  },
  valueTablet: {
    fontSize: getResponsiveFontSize(17),
  },

  // Action Button Styles
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getResponsiveHeight(1),
    gap: getResponsiveWidth(2),
  },
  actionRowTablet: {
    gap: getResponsiveWidth(3),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(12),
    borderRadius: getResponsiveWidth(3),
    flex: 1,
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonTablet: {
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(16),
  },
  actionButtonSmall: {
    paddingVertical: getResponsivePadding(8),
    paddingHorizontal: getResponsivePadding(10),
  },
  showButton: { backgroundColor: colors.primary },
  editButton: { backgroundColor: colors.warning },
  deleteButton: { backgroundColor: colors.error },
  addPartnerButton: { backgroundColor: colors.success },
  startButton: { backgroundColor: colors.primary },
  manageButton: { backgroundColor: colors.secondary },
  disabledButton: { backgroundColor: "#A0A0A0" },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    marginLeft: getResponsiveWidth(2),
  },
  actionButtonTextTablet: {
    fontSize: getResponsiveFontSize(16),
  },

  // Loading and Error Styles
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: getResponsivePadding(20),
  },
  loadingText: {
    marginTop: getResponsiveHeight(2),
    fontSize: getResponsiveFontSize(18),
    fontWeight: "500",
    color: colors.textSecondary,
  },
  loadingTextTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  errorText: {
    fontSize: getResponsiveFontSize(18),
    color: colors.error,
    textAlign: "center",
    marginTop: getResponsiveHeight(2),
    fontWeight: "500",
  },
  errorTextTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(30),
    borderRadius: getResponsiveWidth(6),
    marginTop: getResponsiveHeight(2.5),
    elevation: 2,
  },
  retryButtonTablet: {
    paddingVertical: getResponsivePadding(15),
    paddingHorizontal: getResponsivePadding(40),
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(16),
    fontWeight: "bold",
  },
  retryButtonTextTablet: {
    fontSize: getResponsiveFontSize(18),
  },

  // Empty State Styles
  emptyContainer: {
    alignItems: "center",
    paddingVertical: getResponsiveHeight(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  emptyTitle: {
    fontSize: getResponsiveFontSize(22),
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: getResponsiveHeight(2),
    textAlign: "center",
  },
  emptyTitleTablet: {
    fontSize: getResponsiveFontSize(26),
  },
  emptySubtitle: {
    fontSize: getResponsiveFontSize(16),
    color: colors.textSecondary,
    marginTop: getResponsiveHeight(1),
    textAlign: "center",
    lineHeight: getResponsiveFontSize(22),
  },
  emptySubtitleTablet: {
    fontSize: getResponsiveFontSize(18),
    lineHeight: getResponsiveFontSize(24),
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 25,
  },
  modalContentTablet: {
    maxWidth: 600,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: getResponsivePadding(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: getResponsiveHeight(2),
  },
  modalHeaderTablet: {
    paddingBottom: getResponsivePadding(20),
    marginBottom: getResponsiveHeight(2.5),
  },
  modalTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  modalTitleTablet: {
    fontSize: getResponsiveFontSize(24),
  },
  closeButton: {
    padding: getResponsivePadding(8),
    borderRadius: getResponsiveWidth(4),
    backgroundColor: "#F3F4F6",
  },
  closeButtonTablet: {
    padding: getResponsivePadding(10),
  },
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalScrollViewTablet: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  modalScrollContent: {
    paddingBottom: getResponsivePadding(16),
  },

  // Modal Section Styles
  modalSection: {
    marginBottom: getResponsiveHeight(3),
  },
  modalSectionTablet: {
    marginBottom: getResponsiveHeight(4),
  },
  modalSectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: getResponsiveHeight(1.5),
  },
  modalSectionTitleTablet: {
    fontSize: getResponsiveFontSize(22),
    marginBottom: getResponsiveHeight(2),
  },
  modalLandName: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: getResponsiveHeight(0.5),
  },
  modalLandNameTablet: {
    fontSize: getResponsiveFontSize(28),
  },
  modalLocation: {
    fontSize: getResponsiveFontSize(16),
    color: colors.textSecondary,
    fontWeight: "500",
  },
  modalLocationTablet: {
    fontSize: getResponsiveFontSize(18),
  },

  // Modal Amount Grid Styles
  modalAmountGrid: {
    flexDirection: "row",
    gap: getResponsiveWidth(3),
  },
  modalAmountGridTablet: {
    gap: getResponsiveWidth(4),
  },
  modalAmountItem: {
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(16),
    flex: 1,
    alignItems: "center",
  },
  modalAmountItemTablet: {
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveWidth(4),
  },
  modalAmountLabel: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginBottom: getResponsiveHeight(0.5),
    fontWeight: "500",
  },
  modalAmountLabelTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  modalAmountValue: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
  },
  modalAmountValueTablet: {
    fontSize: getResponsiveFontSize(20),
  },

  // Partner Styles
  partnersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2),
  },
  partnersHeaderTablet: {
    marginBottom: getResponsiveHeight(2.5),
  },
  partnerCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(16),
    marginBottom: getResponsiveHeight(2),
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  partnerCardTablet: {
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveWidth(4),
  },
  partnerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: getResponsiveHeight(1.5),
  },
  partnerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  partnerAvatar: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    borderRadius: getResponsiveWidth(6),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  partnerAvatarTablet: {
    width: getResponsiveWidth(10),
    height: getResponsiveWidth(10),
    borderRadius: getResponsiveWidth(5),
  },
  partnerInitial: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  partnerInitialTablet: {
    fontSize: getResponsiveFontSize(18),
  },
  partnerDetails: {
    marginLeft: getResponsiveWidth(3),
    flex: 1,
  },
  partnerName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: getResponsiveHeight(0.3),
  },
  partnerNameTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  partnerLocation: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginBottom: getResponsiveHeight(0.2),
  },
  partnerLocationTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  partnerPhone: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
  },
  partnerPhoneTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  partnerStats: {
    alignItems: "flex-end",
  },
  partnerStatsNumber: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: colors.primary,
  },
  partnerStatsNumberTablet: {
    fontSize: getResponsiveFontSize(22),
  },
  partnerStatsLabel: {
    fontSize: getResponsiveFontSize(12),
    color: colors.textSecondary,
    marginBottom: getResponsiveHeight(0.5),
  },
  partnerStatsLabelTablet: {
    fontSize: getResponsiveFontSize(14),
  },
  partnerStatsAmount: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
  },
  partnerStatsAmountTablet: {
    fontSize: getResponsiveFontSize(18),
  },
  partnerActions: {
    flexDirection: "row",
    gap: getResponsiveWidth(2),
  },
  partnerActionsTablet: {
    gap: getResponsiveWidth(3),
  },
  partnerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getResponsivePadding(8),
    paddingHorizontal: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(2),
    flex: 1,
    justifyContent: "center",
  },
  partnerButtonTablet: {
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  viewButton: {
    backgroundColor: colors.primary,
  },
  payButton: {
    backgroundColor: colors.success,
  },
  partnerButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    marginLeft: getResponsiveWidth(1),
  },
  partnerButtonTextTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  noPartnersContainer: {
    alignItems: "center",
    paddingVertical: getResponsiveHeight(4),
  },
  noPartnersContainerTablet: {
    paddingVertical: getResponsiveHeight(5),
  },
  noPartnersText: {
    fontSize: getResponsiveFontSize(17),
    fontWeight: "500",
    color: colors.textPrimary,
    marginTop: getResponsiveHeight(1.5),
    textAlign: "center",
  },
  noPartnersTextTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  noPartnersSubtext: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginTop: getResponsiveHeight(0.5),
    textAlign: "center",
    lineHeight: getResponsiveFontSize(18),
  },
  noPartnersSubtextTablet: {
    fontSize: getResponsiveFontSize(16),
    lineHeight: getResponsiveFontSize(20),
  },
  addPartnerModalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.success,
    paddingVertical: getResponsivePadding(8),
    paddingHorizontal: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(3),
  },
  addPartnerModalButtonTablet: {
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  addPartnerModalButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    marginLeft: getResponsiveWidth(1),
  },
  addPartnerModalButtonTextTablet: {
    fontSize: getResponsiveFontSize(16),
  },
})

export default Land_Management













// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from "axios"
// import { useCallback, useEffect, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
//   FlatList,
//   Modal,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"

// const { width: SCREEN_WIDTH } = Dimensions.get("window")

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([])
//   const [filteredLands, setFilteredLands] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [searchText, setSearchText] = useState("")
//   const [addPartnerModalVisible, setAddPartnerModalVisible] = useState(false)
//   const [showModalVisible, setShowModalVisible] = useState(false)
//   const [selectedLandId, setSelectedLandId] = useState(null)
//   const [partnerName, setPartnerName] = useState("")
//   const [selectedLand, setSelectedLand] = useState(null)
//   const [fadeAnim] = useState(new Animated.Value(0))

//   const getAllLands = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const jwtToken = await AsyncStorage.getItem("jwtToken")
//       if (!jwtToken) {
//         throw new Error("No JWT token found")
//       }
//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       setLands(response.data)
//       setFilteredLands(response.data)
//       console.log(JSON.stringify(response.data, null, 2))
//     } catch (err) {
//       setError(err.message || "Failed to fetch lands")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await getAllLands()
//     setRefreshing(false)
//   }, [])

//   useEffect(() => {
//     getAllLands()
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.muza?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
//     )
//     setFilteredLands(filtered)
//   }, [searchText, lands])

//   const handleLandPress = (land) => {
//     console.log("Card tapped:", land.id)
//   }

//   const handleShowLand = (land) => {
//     setSelectedLand(land)
//     setShowModalVisible(true)
//   }

//   const handleAddLand = () => {
//     navigation.navigate("Add_Edit_Land")
//   }

//   const handleDeleteLand = (id) => {
//     Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const jwtToken = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//               },
//             })
//             getAllLands()
//             Alert.alert("Success", "Land deleted successfully")
//           } catch (err) {
//             Alert.alert("Error", err.message || "Failed to delete land")
//           }
//         },
//       },
//     ])
//   }

//   const handleStartProject = (landId) => {
//     navigation.navigate("Flat_Management", { landId })
//   }

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A"
//     const date = new Date(dateStr)
//     const day = String(date.getDate()).padStart(2, "0")
//     const month = String(date.getMonth() + 1).padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   const formatArea = (area) => {
//     if (!area) return "N/A"
//     return `${area.toLocaleString()} sq ft`
//   }

//   const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
//     <View style={styles.detailRow}>
//       <View style={styles.detailIcon}>
//         <Ionicons name={icon} size={wp("4.5%")} color={colors.primary} />
//       </View>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={[styles.value, { color: valueColor }]} numberOfLines={2}>
//         {value}
//       </Text>
//     </View>
//   )

//   const ActionButton = ({ onPress, icon, text, style, textStyle, disabled = false }) => (
//     <TouchableOpacity
//       style={[styles.actionButton, style, disabled && styles.disabledButton]}
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//     >
//       <Ionicons name={icon} size={wp("4%")} color="#FFFFFF" />
//       <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
//     </TouchableOpacity>
//   )

//   const AmountCard = ({ title, amount, icon, color }) => (
//     <View style={[styles.amountCard, { borderLeftColor: color }]}>
//       <View style={styles.amountHeader}>
//         <Ionicons name={icon} size={wp("5%")} color={color} />
//         <Text style={styles.amountTitle}>{title}</Text>
//       </View>
//       <Text style={[styles.amountValue, { color }]}>{formatCurrency(amount)}</Text>
//     </View>
//   )

//   const renderLandCard = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity onPress={() => handleLandPress(item)} activeOpacity={0.95}>
//         {/* Card Header */}
//         <View style={styles.cardHeader}>
//           <View style={styles.landTitleContainer}>
//             <Text style={styles.landName} numberOfLines={2}>
//               {item.address?.landmark || "Unnamed Land"}
//             </Text>
//             {item.project && (
//               <View
//                 style={[
//                   styles.statusBadge,
//                   item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.statusText,
//                     item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
//                   ]}
//                 >
//                   {item.project.status?.replace("_", " ") || "UNKNOWN"}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {item.project && <Text style={styles.projectName}>Project: {item.project.name}</Text>}
//         </View>

//         {/* Amount Cards */}
//         <View style={styles.amountContainer}>
//           <AmountCard title="Total Amount" amount={item.totalAmount} icon="cash-outline" color={colors.success} />
//           <AmountCard
//             title="Agreement"
//             amount={item.agreementAmount}
//             icon="document-text-outline"
//             color={colors.primary}
//           />
//         </View>

//         <View style={styles.amountContainer}>
//           <AmountCard title="Token Amount" amount={item.tokenAmount} icon="card-outline" color={colors.warning} />
//           <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="resize-outline" size={wp("5%")} color={colors.secondary} />
//               <Text style={styles.amountTitle}>Area</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.secondary }]}>{formatArea(item.area)}</Text>
//           </View>
//         </View>

//         {/* Location Details */}
//         <View style={styles.locationSection}>
//           <Text style={styles.sectionTitle}>Location Details</Text>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
//           />
//           <InfoRow icon="map-outline" label="Muza/Village" value={`${item.address?.muza || "N/A"}`} />
//           <InfoRow
//             icon="home-outline"
//             label="Plot Details"
//             value={`Kh.No: ${item.address?.khno || "N/A"}, Ph.No: ${item.address?.phno || "N/A"}, Plot: ${item.address?.plotno || "N/A"}`}
//           />
//           <InfoRow
//             icon="mail-outline"
//             label="Pincode"
//             value={`${item.address?.pincode || "N/A"}, ${item.address?.state || "N/A"}`}
//           />
//         </View>

//         {/* People Details */}
//         <View style={styles.peopleSection}>
//           <Text style={styles.sectionTitle}>Stakeholders</Text>
//           <InfoRow
//             icon="person-outline"
//             label="Owner"
//             value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Purchaser"
//             value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow icon="calendar-outline" label="Added Date" value={formatDate(item.landAddOnDate)} />
//         </View>

//         {/* Project Details */}
//         {item.project && (
//           <View style={styles.projectSection}>
//             <Text style={styles.sectionTitle}>Project Information</Text>
//             <InfoRow icon="business-outline" label="Project Name" value={item.project.name} />
//             <InfoRow icon="home-outline" label="Total Flats" value={`${item.project.totalflat || "N/A"} units`} />
//             <InfoRow
//               icon="resize-outline"
//               label="Building Size"
//               value={`${item.project.buildingSize || "N/A"} sq ft`}
//             />
//           </View>
//         )}

//         {/* Action Buttons */}
//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => handleShowLand(item)}
//             icon="eye-outline"
//             text="Details"
//             style={styles.showButton}
//           />
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
//             icon="create-outline"
//             text="Edit"
//             style={styles.editButton}
//           />
//           <ActionButton
//             onPress={() => handleDeleteLand(item.id)}
//             icon="trash-outline"
//             text="Delete"
//             style={styles.deleteButton}
//           />
//         </View>

//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
//             icon="person-add-outline"
//             text="Add Partner"
//             style={styles.addPartnerButton}
//           />
//           <ActionButton
//             onPress={() => handleStartProject(item.id)}
//             icon="play-outline"
//             text={item.project ? "Manage Project" : "Start Project"}
//             style={item.project ? styles.manageButton : styles.startButton}
//           />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   )

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color={colors.primary} />
//           <Text style={styles.loadingText}>Loading lands...</Text>
//         </View>
//       )
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="alert-circle-outline" size={wp("15%")} color={colors.error} />
//           <Text style={styles.errorText}>Oops! Something went wrong</Text>
//           <Text style={styles.errorSubText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllLands}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }

//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             tintColor={colors.primary}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="home-outline" size={wp("20%")} color={colors.textSecondary} />
//             <Text style={styles.emptyTitle}>No lands found</Text>
//             <Text style={styles.emptySubtitle}>Tap the '+' button to add your first land property</Text>
//           </View>
//         }
//       />
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Land Management</Text>
//           <Text style={styles.subtitle}>
//             {filteredLands.length} properties • Total Value:{" "}
//             {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLand} activeOpacity={0.8}>
//           <Ionicons name="add" size={wp("6%")} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={wp("5%")} color={colors.textSecondary} style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by location, owner, project..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton}>
//             <Ionicons name="close-circle" size={wp("5%")} color={colors.textSecondary} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {renderContent()}

//       {/* Enhanced Show Land Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showModalVisible}
//         onRequestClose={() => setShowModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Land Details</Text>
//               <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalVisible(false)}>
//                 <Ionicons name="close" size={wp("6%")} color={colors.textPrimary} />
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
//               {selectedLand && (
//                 <>
//                   {/* Land Summary */}
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Property Summary</Text>
//                     <Text style={styles.modalLandName}>{selectedLand.address?.landmark}</Text>
//                     <Text style={styles.modalLocation}>
//                       {selectedLand.address?.city}, {selectedLand.address?.state}
//                     </Text>
//                   </View>

//                   {/* Financial Overview */}
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Financial Overview</Text>
//                     <View style={styles.modalAmountGrid}>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Total Amount</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.success }]}>
//                           {formatCurrency(selectedLand.totalAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Agreement</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.primary }]}>
//                           {formatCurrency(selectedLand.agreementAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Token</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.warning }]}>
//                           {formatCurrency(selectedLand.tokenAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Area</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.secondary }]}>
//                           {formatArea(selectedLand.area)}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>

//                   {/* Partners Section */}
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Partners & Stakeholders</Text>
//                     {selectedLand?.partners?.length > 0 ? (
//                       selectedLand.partners.map((partner, index) => (
//                         <View key={index} style={styles.partnerCard}>
//                           <View style={styles.partnerInfo}>
//                             <Ionicons name="person-circle-outline" size={wp("8%")} color={colors.primary} />
//                             <View style={styles.partnerDetails}>
//                               <Text style={styles.partnerName}>{partner.name}</Text>
//                               <Text style={styles.partnerRole}>Partner</Text>
//                             </View>
//                           </View>
//                           <View style={styles.partnerActions}>
//                             <TouchableOpacity
//                               style={[styles.partnerButton, styles.viewButton]}
//                               onPress={() => {
//                                 setShowModalVisible(false)
//                                 navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//                               }}
//                             >
//                               <Text style={styles.partnerButtonText}>View</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                               style={[styles.partnerButton, styles.payButton]}
//                               onPress={() => {
//                                 setShowModalVisible(false)
//                                 navigation.navigate("Pay_Partner", { partnerId: partner.id })
//                               }}
//                             >
//                               <Text style={styles.partnerButtonText}>Pay</Text>
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       ))
//                     ) : (
//                       <View style={styles.noPartnersContainer}>
//                         <Ionicons name="people-outline" size={wp("12%")} color={colors.textSecondary} />
//                         <Text style={styles.noPartnersText}>No partners added yet</Text>
//                         <TouchableOpacity
//                           style={styles.addPartnerModalButton}
//                           onPress={() => {
//                             setShowModalVisible(false)
//                             navigation.navigate("Add_Edit_Partners", { landId: selectedLand.id })
//                           }}
//                         >
//                           <Text style={styles.addPartnerModalButtonText}>Add Partner</Text>
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                   </View>
//                 </>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const colors = {
//   primary: "#007AFF",
//   secondary: "#5856D6",
//   success: "#34C759",
//   warning: "#FF9500",
//   error: "#FF3B30",
//   background: "#F2F2F7",
//   surface: "#FFFFFF",
//   textPrimary: "#000000",
//   textSecondary: "#8E8E93",
//   border: "#C6C6C8",
//   shadow: "#000000",
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: wp("5%"),
//     paddingTop: hp("6%"),
//     paddingBottom: hp("2%"),
//     backgroundColor: colors.surface,
//     borderBottomLeftRadius: wp("6%"),
//     borderBottomRightRadius: wp("6%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   title: {
//     fontSize: wp("8%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     fontWeight: "500",
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.surface,
//     borderRadius: wp("4%"),
//     marginHorizontal: wp("5%"),
//     marginVertical: hp("2%"),
//     paddingHorizontal: wp("4%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   searchIcon: {
//     marginRight: wp("3%"),
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: wp("4%"),
//     color: colors.textPrimary,
//     paddingVertical: hp("1.8%"),
//   },
//   clearButton: {
//     padding: wp("1%"),
//   },
//   listContent: {
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("10%"),
//   },
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: wp("5%"),
//     marginBottom: hp("2.5%"),
//     padding: wp("5%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   cardHeader: {
//     marginBottom: hp("2%"),
//   },
//   landTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1%"),
//   },
//   landName: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     flex: 1,
//     marginRight: wp("3%"),
//     lineHeight: wp("6.5%"),
//   },
//   projectName: {
//     fontSize: wp("3.8%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//     fontStyle: "italic",
//   },
//   statusBadge: {
//     paddingHorizontal: wp("3%"),
//     paddingVertical: hp("0.8%"),
//     borderRadius: wp("4%"),
//   },
//   statusText: {
//     fontSize: wp("3%"),
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   inProgress: {
//     backgroundColor: "#FFF5E1",
//   },
//   inProgressText: {
//     color: "#FF9500",
//   },
//   completed: {
//     backgroundColor: "#E6F4EA",
//   },
//   completedText: {
//     color: "#34C759",
//   },
//   amountContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: hp("1.5%"),
//     gap: wp("2%"),
//   },
//   amountCard: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("3%"),
//     borderLeftWidth: 4,
//   },
//   amountHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("0.5%"),
//   },
//   amountTitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginLeft: wp("2%"),
//     fontWeight: "500",
//   },
//   amountValue: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   locationSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   peopleSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   projectSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   sectionTitle: {
//     fontSize: wp("4.2%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("1.2%"),
//   },
//   detailIcon: {
//     marginRight: wp("3%"),
//     width: wp("6%"),
//     alignItems: "center",
//   },
//   label: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     flex: 0.35,
//     fontWeight: "500",
//   },
//   value: {
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     flex: 0.65,
//     textAlign: "right",
//   },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: hp("2%"),
//     gap: wp("2%"),
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("3%"),
//     borderRadius: wp("3%"),
//     flex: 1,
//     justifyContent: "center",
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   showButton: {
//     backgroundColor: colors.primary,
//   },
//   editButton: {
//     backgroundColor: colors.warning,
//   },
//   deleteButton: {
//     backgroundColor: colors.error,
//   },
//   addPartnerButton: {
//     backgroundColor: colors.success,
//   },
//   startButton: {
//     backgroundColor: colors.secondary,
//   },
//   manageButton: {
//     backgroundColor: "#6366F1",
//   },
//   disabledButton: {
//     backgroundColor: "#A0A0A0",
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.2%"),
//     fontWeight: "600",
//     marginLeft: wp("1.5%"),
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: wp("5%"),
//   },
//   loadingText: {
//     marginTop: hp("2%"),
//     fontSize: wp("4.5%"),
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   errorText: {
//     fontSize: wp("5%"),
//     color: colors.error,
//     textAlign: "center",
//     marginTop: hp("2%"),
//     fontWeight: "600",
//   },
//   errorSubText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     textAlign: "center",
//     marginTop: hp("1%"),
//     marginHorizontal: wp("5%"),
//   },
//   retryButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: hp("1.5%"),
//     paddingHorizontal: wp("8%"),
//     borderRadius: wp("6%"),
//     marginTop: hp("3%"),
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   retryButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: hp("10%"),
//     paddingHorizontal: wp("10%"),
//   },
//   emptyTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginTop: hp("2%"),
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//     textAlign: "center",
//     lineHeight: wp("5.5%"),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: colors.surface,
//     borderTopLeftRadius: wp("6%"),
//     borderTopRightRadius: wp("6%"),
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("4%"),
//     maxHeight: hp("85%"),
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("2.5%"),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   modalTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//   },
//   closeButton: {
//     padding: wp("2%"),
//   },
//   modalScrollView: {
//     flex: 1,
//   },
//   modalSection: {
//     marginBottom: hp("3%"),
//   },
//   modalSectionTitle: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1.5%"),
//   },
//   modalLandName: {
//     fontSize: wp("6%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: hp("0.5%"),
//   },
//   modalLocation: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   modalAmountGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: wp("3%"),
//   },
//   modalAmountItem: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("4%"),
//     width: "47%",
//     alignItems: "center",
//   },
//   modalAmountLabel: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//     fontWeight: "500",
//   },
//   modalAmountValue: {
//     fontSize: wp("4.5%"),
//     fontWeight: "700",
//   },
//   partnerCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("4%"),
//     marginBottom: hp("1%"),
//   },
//   partnerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   partnerDetails: {
//     marginLeft: wp("3%"),
//     flex: 1,
//   },
//   partnerName: {
//     fontSize: wp("4.2%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//   },
//   partnerRole: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.3%"),
//   },
//   partnerActions: {
//     flexDirection: "row",
//     gap: wp("2%"),
//   },
//   partnerButton: {
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("2%"),
//   },
//   viewButton: {
//     backgroundColor: colors.primary,
//   },
//   payButton: {
//     backgroundColor: colors.success,
//   },
//   partnerButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//   },
//   noPartnersContainer: {
//     alignItems: "center",
//     paddingVertical: hp("4%"),
//   },
//   noPartnersText: {
//     fontSize: wp("4.2%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginTop: hp("1.5%"),
//     textAlign: "center",
//   },
//   addPartnerModalButton: {
//     backgroundColor: colors.success,
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("6%"),
//     borderRadius: wp("6%"),
//     marginTop: hp("2%"),
//   },
//   addPartnerModalButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.8%"),
//     fontWeight: "600",
//   },
// })

// export default Land_Management





// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from "axios"
// import { useCallback, useEffect, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
//   FlatList,
//   Modal,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native"
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"

// const { width: SCREEN_WIDTH } = Dimensions.get("window")

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([])
//   const [filteredLands, setFilteredLands] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [searchText, setSearchText] = useState("")
//   const [addPartnerModalVisible, setAddPartnerModalVisible] = useState(false)
//   const [showModalVisible, setShowModalVisible] = useState(false)
//   const [selectedLandId, setSelectedLandId] = useState(null)
//   const [partnerName, setPartnerName] = useState("")
//   const [selectedLand, setSelectedLand] = useState(null)
//   const [fadeAnim] = useState(new Animated.Value(0))

//   const getAllLands = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const jwtToken = await AsyncStorage.getItem("jwtToken")
//       if (!jwtToken) {
//         throw new Error("No JWT token found")
//       }
//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       setLands(response.data)
//       setFilteredLands(response.data)
//       console.log(JSON.stringify(response.data, null, 2))
//     } catch (err) {
//       setError(err.message || "Failed to fetch lands")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await getAllLands()
//     setRefreshing(false)
//   }, [])

//   useEffect(() => {
//     getAllLands()
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.muza?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
//     )
//     setFilteredLands(filtered)
//   }, [searchText, lands])

//   const handleLandPress = (land) => {
//     console.log("Card tapped:", land.id)
//   }

//   const handleShowLand = (land) => {
//     setSelectedLand(land)
//     setShowModalVisible(true)
//   }

//   const handleAddLand = () => {
//     navigation.navigate("Add_Edit_Land")
//   }

//   const handleDeleteLand = (id) => {
//     Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const jwtToken = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//               },
//             })
//             getAllLands()
//             Alert.alert("Success", "Land deleted successfully")
//           } catch (err) {
//             Alert.alert("Error", err.message || "Failed to delete land")
//           }
//         },
//       },
//     ])
//   }

//   const handleStartProject = (landId) => {
//     navigation.navigate("Flat_Management", { id : landId })
//   }

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A"
//     const date = new Date(dateStr)
//     const day = String(date.getDate()).padStart(2, "0")
//     const month = String(date.getMonth() + 1).padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   const formatArea = (area) => {
//     if (!area) return "N/A"
//     return `${area.toLocaleString()} sq ft`
//   }

//   const getTransactionIcon = (change, status) => {
//     if (change === "CREDIT") {
//       return "arrow-down-circle"
//     } else if (change === "DEBIT") {
//       return "arrow-up-circle"
//     }
//     return "swap-horizontal"
//   }

//   const getTransactionColor = (change) => {
//     if (change === "CREDIT") {
//       return colors.success
//     } else if (change === "DEBIT") {
//       return colors.error
//     }
//     return colors.textSecondary
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "UPI":
//         return colors.primary
//       case "CASH":
//         return colors.success
//       case "BANK":
//         return colors.secondary
//       case "CHEQUE":
//         return colors.warning
//       default:
//         return colors.textSecondary
//     }
//   }

//   const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
//     <View style={styles.detailRow}>
//       <View style={styles.detailIcon}>
//         <Ionicons name={icon} size={wp("4.5%")} color={colors.primary} />
//       </View>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={[styles.value, { color: valueColor }]} numberOfLines={2}>
//         {value}
//       </Text>
//     </View>
//   )

//   const ActionButton = ({ onPress, icon, text, style, textStyle, disabled = false }) => (
//     <TouchableOpacity
//       style={[styles.actionButton, style, disabled && styles.disabledButton]}
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//     >
//       <Ionicons name={icon} size={wp("4%")} color="#FFFFFF" />
//       <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
//     </TouchableOpacity>
//   )

//   const AmountCard = ({ title, amount, icon, color }) => (
//     <View style={[styles.amountCard, { borderLeftColor: color }]}>
//       <View style={styles.amountHeader}>
//         <Ionicons name={icon} size={wp("5%")} color={color} />
//         <Text style={styles.amountTitle}>{title}</Text>
//       </View>
//       <Text style={[styles.amountValue, { color }]}>{formatCurrency(amount)}</Text>
//     </View>
//   )

//   const TransactionItem = ({ transaction }) => (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionLeft}>
//         <View style={[styles.transactionIcon, { backgroundColor: getTransactionColor(transaction.change) + "20" }]}>
//           <Ionicons
//             name={getTransactionIcon(transaction.change, transaction.status)}
//             size={wp("5%")}
//             color={getTransactionColor(transaction.change)}
//           />
//         </View>
//         <View style={styles.transactionDetails}>
//           <Text style={styles.transactionNote}>{transaction.note || "No note"}</Text>
//           <Text style={styles.transactionDate}>{formatDate(transaction.transactionDate)}</Text>
//           <View style={styles.transactionMeta}>
//             <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + "20" }]}>
//               <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
//                 {transaction.status}
//               </Text>
//             </View>
//             <Text style={styles.madeByText}>by {transaction.madeBy}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.transactionRight}>
//         <Text style={[styles.transactionAmount, { color: getTransactionColor(transaction.change) }]}>
//           {transaction.change === "CREDIT" ? "+" : "-"}
//           {formatCurrency(transaction.transactionAmount)}
//         </Text>
//       </View>
//     </View>
//   )

//   const PartnerCard = ({ partner }) => {
//     const totalTransactions = partner.landTransactions?.length || 0
//     const totalAmount =
//       partner.landTransactions?.reduce((sum, transaction) => {
//         return transaction.change === "CREDIT"
//           ? sum + transaction.transactionAmount
//           : sum - transaction.transactionAmount
//       }, 0) || 0

//     return (
//       <View style={styles.partnerCard}>
//         <View style={styles.partnerHeader}>
//           <View style={styles.partnerInfo}>
//             <View style={styles.partnerAvatar}>
//               <Text style={styles.partnerInitial}>{partner.name?.charAt(0)?.toUpperCase()}</Text>
//             </View>
//             <View style={styles.partnerDetails}>
//               <Text style={styles.partnerName}>{partner.name}</Text>
//               <Text style={styles.partnerLocation}>
//                 <Ionicons name="location-outline" size={wp("3.5%")} color={colors.textSecondary} /> {partner.city}
//               </Text>
//               <Text style={styles.partnerPhone}>
//                 <Ionicons name="call-outline" size={wp("3.5%")} color={colors.textSecondary} /> {partner.phoneNumber}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.partnerStats}>
//             <Text style={styles.partnerStatsNumber}>{totalTransactions}</Text>
//             <Text style={styles.partnerStatsLabel}>Transactions</Text>
//             <Text style={[styles.partnerStatsAmount, { color: totalAmount >= 0 ? colors.success : colors.error }]}>
//               {formatCurrency(Math.abs(totalAmount))}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.partnerActions}>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.viewButton]}
//             onPress={() => {
//               setShowModalVisible(false)
//               navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//             }}
//           >
//             <Ionicons name="eye-outline" size={wp("4%")} color="#FFFFFF" />
//             <Text style={styles.partnerButtonText}>View All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.payButton]}
//             onPress={() => {
//               setShowModalVisible(false)
//               navigation.navigate("Pay_Partner", { partnerId: partner.id })
//             }}
//           >
//             <Ionicons name="card-outline" size={wp("4%")} color="#FFFFFF" />
//             <Text style={styles.partnerButtonText}>Pay</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Recent Transactions */}
//         {partner.landTransactions && partner.landTransactions.length > 0 && (
//           <View style={styles.recentTransactions}>
//             <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
//             {partner.landTransactions.slice(0, 3).map((transaction, index) => (
//               <TransactionItem key={transaction.id || index} transaction={transaction} />
//             ))}
//             {partner.landTransactions.length > 3 && (
//               <TouchableOpacity
//                 style={styles.viewMoreButton}
//                 onPress={() => {
//                   setShowModalVisible(false)
//                   navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//                 }}
//               >
//                 <Text style={styles.viewMoreText}>View {partner.landTransactions.length - 3} more transactions</Text>
//                 <Ionicons name="chevron-forward" size={wp("4%")} color={colors.primary} />
//               </TouchableOpacity>
//             )}
//           </View>
//         )}

//         {partner.landTransactions && partner.landTransactions.length === 0 && (
//           <View style={styles.noTransactions}>
//             <Ionicons name="receipt-outline" size={wp("8%")} color={colors.textSecondary} />
//             <Text style={styles.noTransactionsText}>No transactions yet</Text>
//           </View>
//         )}
//       </View>
//     )
//   }

//   const renderLandCard = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity onPress={() => handleLandPress(item)} activeOpacity={0.95}>
//         {/* Card Header */}
//         <View style={styles.cardHeader}>
//           <View style={styles.landTitleContainer}>
//             <Text style={styles.landName} numberOfLines={2}>
//               {item.address?.landmark || "Unnamed Land"}
//             </Text>
//             {item.project && (
//               <View
//                 style={[
//                   styles.statusBadge,
//                   item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.statusText,
//                     item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
//                   ]}
//                 >
//                   {item.project.status?.replace("_", " ") || "UNKNOWN"}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {item.project && <Text style={styles.projectName}>Project: {item.project.name}</Text>}
//         </View>

//         {/* Amount Cards */}
//         <View style={styles.amountContainer}>
//           <AmountCard title="Total Amount" amount={item.totalAmount} icon="cash-outline" color={colors.success} />
//           <AmountCard
//             title="Agreement"
//             amount={item.agreementAmount}
//             icon="document-text-outline"
//             color={colors.primary}
//           />
//         </View>

//         <View style={styles.amountContainer}>
//           <AmountCard title="Token Amount" amount={item.tokenAmount} icon="card-outline" color={colors.warning} />
//           <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="resize-outline" size={wp("5%")} color={colors.secondary} />
//               <Text style={styles.amountTitle}>Area</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.secondary }]}>{formatArea(item.area)}</Text>
//           </View>
//         </View>

//         {/* Location Details */}
//         <View style={styles.locationSection}>
//           <Text style={styles.sectionTitle}>Location Details</Text>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
//           />
//           <InfoRow icon="map-outline" label="Muza/Village" value={`${item.address?.muza || "N/A"}`} />
//           <InfoRow
//             icon="home-outline"
//             label="Plot Details"
//             value={`Kh.No: ${item.address?.khno || "N/A"}, Ph.No: ${item.address?.phno || "N/A"}, Plot: ${item.address?.plotno || "N/A"}`}
//           />
//           <InfoRow
//             icon="mail-outline"
//             label="Pincode"
//             value={`${item.address?.pincode || "N/A"}, ${item.address?.state || "N/A"}`}
//           />
//         </View>

//         {/* People Details */}
//         <View style={styles.peopleSection}>
//           <Text style={styles.sectionTitle}>Stakeholders</Text>
//           <InfoRow
//             icon="person-outline"
//             label="Owner"
//             value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Purchaser"
//             value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow icon="calendar-outline" label="Added Date" value={formatDate(item.landAddOnDate)} />
//         </View>

//         {/* Project Details */}
//         {item.project && (
//           <View style={styles.projectSection}>
//             <Text style={styles.sectionTitle}>Project Information</Text>
//             <InfoRow icon="business-outline" label="Project Name" value={item.project.name} />
//             <InfoRow icon="home-outline" label="Total Flats" value={`${item.project.totalflat || "N/A"} units`} />
//             <InfoRow
//               icon="resize-outline"
//               label="Building Size"
//               value={`${item.project.buildingSize || "N/A"} sq ft`}
//             />
//           </View>
//         )}

//         {/* Action Buttons */}
//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => handleShowLand(item)}
//             icon="eye-outline"
//             text="Details"
//             style={styles.showButton}
//           />
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
//             icon="create-outline"
//             text="Edit"
//             style={styles.editButton}
//           />
//           <ActionButton
//             onPress={() => handleDeleteLand(item.id)}
//             icon="trash-outline"
//             text="Delete"
//             style={styles.deleteButton}
//           />
//         </View>

//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
//             icon="person-add-outline"
//             text="Add Partner"
//             style={styles.addPartnerButton}
//           />
//           <ActionButton
//             onPress={() => handleStartProject(item.id)}
//             icon="play-outline"
//             text={item.project ? "Manage Project" : "Start Project"}
//             style={item.project ? styles.manageButton : styles.startButton}
//           />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   )

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color={colors.primary} />
//           <Text style={styles.loadingText}>Loading lands...</Text>
//         </View>
//       )
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="alert-circle-outline" size={wp("15%")} color={colors.error} />
//           <Text style={styles.errorText}>Oops! Something went wrong</Text>
//           <Text style={styles.errorSubText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllLands}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }

//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             tintColor={colors.primary}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="home-outline" size={wp("20%")} color={colors.textSecondary} />
//             <Text style={styles.emptyTitle}>No lands found</Text>
//             <Text style={styles.emptySubtitle}>Tap the '+' button to add your first land property</Text>
//           </View>
//         }
//       />
//     )
//   }

//   return (
//     <View style={styles.container}>

//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Land Management</Text>
//           <Text style={styles.subtitle}>
//             {filteredLands.length} properties • Total Value:{" "}
//             {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLand} activeOpacity={0.8}>
//           <Ionicons name="add" size={wp("6%")} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={wp("5%")} color={colors.textSecondary} style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by location, owner, project..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton}>
//             <Ionicons name="close-circle" size={wp("5%")} color={colors.textSecondary} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {renderContent()}

//       {/* Enhanced Show Land Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showModalVisible}
//         onRequestClose={() => setShowModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Land Details</Text>
//               <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalVisible(false)}>
//                 <Ionicons name="close" size={wp("6%")} color={colors.textPrimary} />
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
//               {selectedLand && (
//                 <>
//                   {/* Land Summary */}
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Property Summary</Text>
//                     <Text style={styles.modalLandName}>{selectedLand.address?.landmark}</Text>
//                     <Text style={styles.modalLocation}>
//                       {selectedLand.address?.city}, {selectedLand.address?.state}
//                     </Text>
//                   </View>

//                   {/* Financial Overview */}
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Financial Overview</Text>
//                     <View style={styles.modalAmountGrid}>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Total Amount</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.success }]}>
//                           {formatCurrency(selectedLand.totalAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Agreement</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.primary }]}>
//                           {formatCurrency(selectedLand.agreementAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Token</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.warning }]}>
//                           {formatCurrency(selectedLand.tokenAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Area</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.secondary }]}>
//                           {formatArea(selectedLand.area)}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>

//                   {/* Partners Section */}
//                   <View style={styles.modalSection}>
//                     <View style={styles.partnersHeader}>
//                       <Text style={styles.modalSectionTitle}>Partners & Transactions</Text>
//                       <TouchableOpacity
//                         style={styles.addPartnerModalButton}
//                         onPress={() => {
//                           setShowModalVisible(false)
//                           navigation.navigate("Add_Edit_Partners", { landId: selectedLand.id })
//                         }}
//                       >
//                         <Ionicons name="person-add" size={wp("4%")} color="#FFFFFF" />
//                         <Text style={styles.addPartnerModalButtonText}>Add Partner</Text>
//                       </TouchableOpacity>
//                     </View>

//                     {selectedLand?.partners?.length > 0 ? (
//                       selectedLand.partners.map((partner, index) => (
//                         <PartnerCard key={partner.id || index} partner={partner} />
//                       ))
//                     ) : (
//                       <View style={styles.noPartnersContainer}>
//                         <Ionicons name="people-outline" size={wp("12%")} color={colors.textSecondary} />
//                         <Text style={styles.noPartnersText}>No partners added yet</Text>
//                         <Text style={styles.noPartnersSubtext}>
//                           Add partners to start collaboration and track transactions
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const colors = {
//   primary: "#007AFF",
//   secondary: "#5856D6",
//   success: "#34C759",
//   warning: "#FF9500",
//   error: "#FF3B30",
//   background: "#F2F2F7",
//   surface: "#FFFFFF",
//   textPrimary: "#000000",
//   textSecondary: "#8E8E93",
//   border: "#C6C6C8",
//   shadow: "#000000",
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: wp("5%"),
//     paddingTop: hp("6%"),
//     paddingBottom: hp("2%"),
//     backgroundColor: colors.surface,
//     borderBottomLeftRadius: wp("6%"),
//     borderBottomRightRadius: wp("6%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   title: {
//     fontSize: wp("8%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     fontWeight: "500",
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.surface,
//     borderRadius: wp("4%"),
//     marginHorizontal: wp("5%"),
//     marginVertical: hp("2%"),
//     paddingHorizontal: wp("4%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   searchIcon: {
//     marginRight: wp("3%"),
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: wp("4%"),
//     color: colors.textPrimary,
//     paddingVertical: hp("1.8%"),
//   },
//   clearButton: {
//     padding: wp("1%"),
//   },
//   listContent: {
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("10%"),
//   },
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: wp("5%"),
//     marginBottom: hp("2.5%"),
//     padding: wp("5%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   cardHeader: {
//     marginBottom: hp("2%"),
//   },
//   landTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1%"),
//   },
//   landName: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     flex: 1,
//     marginRight: wp("3%"),
//     lineHeight: wp("6.5%"),
//   },
//   projectName: {
//     fontSize: wp("3.8%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//     fontStyle: "italic",
//   },
//   statusBadge: {
//     paddingHorizontal: wp("3%"),
//     paddingVertical: hp("0.8%"),
//     borderRadius: wp("4%"),
//   },
//   statusText: {
//     fontSize: wp("3%"),
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   inProgress: {
//     backgroundColor: "#FFF5E1",
//   },
//   inProgressText: {
//     color: "#FF9500",
//   },
//   completed: {
//     backgroundColor: "#E6F4EA",
//   },
//   completedText: {
//     color: "#34C759",
//   },
//   amountContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: hp("1.5%"),
//     gap: wp("2%"),
//   },
//   amountCard: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("3%"),
//     borderLeftWidth: 4,
//   },
//   amountHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("0.5%"),
//   },
//   amountTitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginLeft: wp("2%"),
//     fontWeight: "500",
//   },
//   amountValue: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   locationSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   peopleSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   projectSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   sectionTitle: {
//     fontSize: wp("4.2%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("1.2%"),
//   },
//   detailIcon: {
//     marginRight: wp("3%"),
//     width: wp("6%"),
//     alignItems: "center",
//   },
//   label: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     flex: 0.35,
//     fontWeight: "500",
//   },
//   value: {
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     flex: 0.65,
//     textAlign: "right",
//   },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: hp("2%"),
//     gap: wp("2%"),
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("3%"),
//     borderRadius: wp("3%"),
//     flex: 1,
//     justifyContent: "center",
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   showButton: {
//     backgroundColor: colors.primary,
//   },
//   editButton: {
//     backgroundColor: colors.warning,
//   },
//   deleteButton: {
//     backgroundColor: colors.error,
//   },
//   addPartnerButton: {
//     backgroundColor: colors.success,
//   },
//   startButton: {
//     backgroundColor: colors.secondary,
//   },
//   manageButton: {
//     backgroundColor: "#6366F1",
//   },
//   disabledButton: {
//     backgroundColor: "#A0A0A0",
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.2%"),
//     fontWeight: "600",
//     marginLeft: wp("1.5%"),
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: wp("5%"),
//   },
//   loadingText: {
//     marginTop: hp("2%"),
//     fontSize: wp("4.5%"),
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   errorText: {
//     fontSize: wp("5%"),
//     color: colors.error,
//     textAlign: "center",
//     marginTop: hp("2%"),
//     fontWeight: "600",
//   },
//   errorSubText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     textAlign: "center",
//     marginTop: hp("1%"),
//     marginHorizontal: wp("5%"),
//   },
//   retryButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: hp("1.5%"),
//     paddingHorizontal: wp("8%"),
//     borderRadius: wp("6%"),
//     marginTop: hp("3%"),
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   retryButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: hp("10%"),
//     paddingHorizontal: wp("10%"),
//   },
//   emptyTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginTop: hp("2%"),
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//     textAlign: "center",
//     lineHeight: wp("5.5%"),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: colors.surface,
//     borderTopLeftRadius: wp("6%"),
//     borderTopRightRadius: wp("6%"),
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("4%"),
//     maxHeight: hp("90%"),
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("2.5%"),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   modalTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//   },
//   closeButton: {
//     padding: wp("2%"),
//   },
//   modalScrollView: {
//     flex: 1,
//   },
//   modalSection: {
//     marginBottom: hp("3%"),
//   },
//   modalSectionTitle: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1.5%"),
//   },
//   modalLandName: {
//     fontSize: wp("6%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: hp("0.5%"),
//   },
//   modalLocation: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   modalAmountGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: wp("3%"),
//   },
//   modalAmountItem: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("4%"),
//     width: "47%",
//     alignItems: "center",
//   },
//   modalAmountLabel: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//     fontWeight: "500",
//   },
//   modalAmountValue: {
//     fontSize: wp("4.5%"),
//     fontWeight: "700",
//   },
//   partnersHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: hp("2%"),
//   },
//   partnerCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("4%"),
//     padding: wp("4%"),
//     marginBottom: hp("2%"),
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   partnerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1.5%"),
//   },
//   partnerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   partnerAvatar: {
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     backgroundColor: colors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   partnerInitial: {
//     fontSize: wp("5%"),
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   partnerDetails: {
//     marginLeft: wp("3%"),
//     flex: 1,
//   },
//   partnerName: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("0.3%"),
//   },
//   partnerLocation: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.2%"),
//   },
//   partnerPhone: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//   },
//   partnerStats: {
//     alignItems: "flex-end",
//   },
//   partnerStatsNumber: {
//     fontSize: wp("5%"),
//     fontWeight: "700",
//     color: colors.primary,
//   },
//   partnerStatsLabel: {
//     fontSize: wp("3%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//   },
//   partnerStatsAmount: {
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   partnerActions: {
//     flexDirection: "row",
//     gap: wp("2%"),
//     marginBottom: hp("1.5%"),
//   },
//   partnerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("2%"),
//     flex: 1,
//     justifyContent: "center",
//   },
//   viewButton: {
//     backgroundColor: colors.primary,
//   },
//   payButton: {
//     backgroundColor: colors.success,
//   },
//   partnerButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     marginLeft: wp("1%"),
//   },
//   recentTransactions: {
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//     paddingTop: hp("1.5%"),
//   },
//   recentTransactionsTitle: {
//     fontSize: wp("4%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   transactionItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("1%"),
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   transactionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   transactionIcon: {
//     width: wp("8%"),
//     height: wp("8%"),
//     borderRadius: wp("4%"),
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: wp("3%"),
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionNote: {
//     fontSize: wp("3.8%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginBottom: hp("0.2%"),
//   },
//   transactionDate: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.3%"),
//   },
//   transactionMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: wp("2%"),
//   },
//   madeByText: {
//     fontSize: wp("3%"),
//     color: colors.textSecondary,
//     fontStyle: "italic",
//   },
//   transactionRight: {
//     alignItems: "flex-end",
//   },
//   transactionAmount: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   viewMoreButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: hp("1%"),
//     marginTop: hp("0.5%"),
//   },
//   viewMoreText: {
//     fontSize: wp("3.5%"),
//     color: colors.primary,
//     fontWeight: "500",
//     marginRight: wp("1%"),
//   },
//   noTransactions: {
//     alignItems: "center",
//     paddingVertical: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//   },
//   noTransactionsText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//   },
//   noPartnersContainer: {
//     alignItems: "center",
//     paddingVertical: hp("4%"),
//   },
//   noPartnersText: {
//     fontSize: wp("4.2%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginTop: hp("1.5%"),
//     textAlign: "center",
//   },
//   noPartnersSubtext: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     textAlign: "center",
//     lineHeight: wp("4.5%"),
//   },
//   addPartnerModalButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.success,
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("4%"),
//   },
//   addPartnerModalButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     marginLeft: wp("1%"),
//   },
// })

// export default Land_Management







// "use client"
// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from "axios"
// import { useCallback, useEffect, useState } from "react"
// import { ActivityIndicator, Alert, Animated, Dimensions, FlatList, Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
// const { width: SCREEN_WIDTH } = Dimensions.get("window")

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([])
//   const [filteredLands, setFilteredLands] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [searchText, setSearchText] = useState("")
//   const [addPartnerModalVisible, setAddPartnerModalVisible] = useState(false)
//   const [showModalVisible, setShowModalVisible] = useState(false)
//   const [selectedLandId, setSelectedLandId] = useState(null)
//   const [partnerName, setPartnerName] = useState("")
//   const [selectedLand, setSelectedLand] = useState(null)
//   const [fadeAnim] = useState(new Animated.Value(0))

//   const getAllLands = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const jwtToken = await AsyncStorage.getItem("jwtToken")
//       if (!jwtToken) {
//         throw new Error("No JWT token found")
//       }
//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       setLands(response.data)
//       setFilteredLands(response.data)
//       console.log(JSON.stringify(response.data, null, 2))
//     } catch (err) {
//       setError(err.message || "Failed to fetch lands")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await getAllLands()
//     setRefreshing(false)
//   }, [])

//   useEffect(() => {
//     getAllLands()
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.muza?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
//     )
//     setFilteredLands(filtered)
//   }, [searchText, lands])

//   const handleLandPress = (land) => {
//     console.log("Card tapped:", land.id)
//   }

//   const handleShowLand = (land) => {
//     setSelectedLand(land)
//     setShowModalVisible(true)
//   }

//   const handleAddLand = () => {
//     navigation.navigate("Add_Edit_Land")
//   }

//   const handleDeleteLand = (id) => {
//     Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const jwtToken = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//               },
//             })
//             getAllLands()
//             Alert.alert("Success", "Land deleted successfully")
//           } catch (err) {
//             Alert.alert("Error", err.message || "Failed to delete land")
//           }
//         },
//       },
//     ])
//   }

//   const handleStartProject = (landId) => {
//     navigation.navigate("Flat_Management", { id: landId })
//   }

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A"
//     const date = new Date(dateStr)
//     const day = String(date.getDate()).padStart(2, "0")
//     const month = String(date.getMonth() + 1).padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   const formatArea = (area) => {
//     if (!area) return "N/A"
//     return `${area.toLocaleString()} sq ft`
//   }

//   const getTransactionIcon = (change, status) => {
//     if (change === "CREDIT") {
//       return "arrow-down-circle"
//     } else if (change === "DEBIT") {
//       return "arrow-up-circle"
//     }
//     return "swap-horizontal"
//   }

//   const getTransactionColor = (change) => {
//     if (change === "CREDIT") {
//       return colors.success
//     } else if (change === "DEBIT") {
//       return colors.error
//     }
//     return colors.textSecondary
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "UPI":
//         return colors.primary
//       case "CASH":
//         return colors.success
//       case "BANK":
//         return colors.secondary
//       case "CHEQUE":
//         return colors.warning
//       default:
//         return colors.textSecondary
//     }
//   }

//   const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
//     <View style={styles.detailRow}>
//       <View style={styles.detailIcon}>
//         <Ionicons name={icon} size={wp("4.5%")} color={colors.primary} />
//       </View>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={[styles.value, { color: valueColor }]} numberOfLines={2}>
//         {value}
//       </Text>
//     </View>
//   )

//   const ActionButton = ({ onPress, icon, text, style, textStyle, disabled = false }) => (
//     <TouchableOpacity
//       style={[styles.actionButton, style, disabled && styles.disabledButton]}
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//     >
//       <Ionicons name={icon} size={wp("4%")} color="#FFFFFF" />
//       <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
//     </TouchableOpacity>
//   )

//   const AmountCard = ({ title, amount, icon, color }) => (
//     <View style={[styles.amountCard, { borderLeftColor: color }]}>
//       <View style={styles.amountHeader}>
//         <Ionicons name={icon} size={wp("5%")} color={color} />
//         <Text style={styles.amountTitle}>{title}</Text>
//       </View>
//       <Text style={[styles.amountValue, { color }]}>{formatCurrency(amount)}</Text>
//     </View>
//   )

//   const TransactionItem = ({ transaction }) => (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionLeft}>
//         <View style={[styles.transactionIcon, { backgroundColor: getTransactionColor(transaction.change) + "20" }]}>
//           <Ionicons
//             name={getTransactionIcon(transaction.change, transaction.status)}
//             size={wp("5%")}
//             color={getTransactionColor(transaction.change)}
//           />
//         </View>
//         <View style={styles.transactionDetails}>
//           <Text style={styles.transactionNote}>{transaction.note || "No note"}</Text>
//           <Text style={styles.transactionDate}>{formatDate(transaction.transactionDate)}</Text>
//           <View style={styles.transactionMeta}>
//             <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + "20" }]}>
//               <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
//                 {transaction.status}
//               </Text>
//             </View>
//             <Text style={styles.madeByText}>by {transaction.madeBy}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.transactionRight}>
//         <Text style={[styles.transactionAmount, { color: getTransactionColor(transaction.change) }]}>
//           {transaction.change === "CREDIT" ? "+" : "-"}
//           {formatCurrency(transaction.transactionAmount)}
//         </Text>
//       </View>
//     </View>
//   )

//   const PartnerCard = ({ partner }) => {
//     const totalTransactions = partner.landTransactions?.length || 0
//     const totalAmount =
//       partner.landTransactions?.reduce((sum, transaction) => {
//         return transaction.change === "CREDIT"
//           ? sum + transaction.transactionAmount
//           : sum - transaction.transactionAmount
//       }, 0) || 0
//     return (
//       <View style={styles.partnerCard}>
//         <View style={styles.partnerHeader}>
//           <View style={styles.partnerInfo}>
//             <View style={styles.partnerAvatar}>
//               <Text style={styles.partnerInitial}>{partner.name?.charAt(0)?.toUpperCase()}</Text>
//             </View>
//             <View style={styles.partnerDetails}>
//               <Text style={styles.partnerName}>{partner.name}</Text>
//               <Text style={styles.partnerLocation}>
//                 <Ionicons name="location-outline" size={wp("3.5%")} color={colors.textSecondary} /> {partner.city}
//               </Text>
//               <Text style={styles.partnerPhone}>
//                 <Ionicons name="call-outline" size={wp("3.5%")} color={colors.textSecondary} /> {partner.phoneNumber}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.partnerStats}>
//             <Text style={styles.partnerStatsNumber}>{totalTransactions}</Text>
//             <Text style={styles.partnerStatsLabel}>Transactions</Text>
//             <Text style={[styles.partnerStatsAmount, { color: totalAmount >= 0 ? colors.success : colors.error }]}>
//               {formatCurrency(Math.abs(totalAmount))}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.partnerActions}>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.viewButton]}
//             onPress={() => {
//               setShowModalVisible(false)
//               navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//             }}
//           >
//             <Ionicons name="eye-outline" size={wp("4%")} color="#FFFFFF" />
//             <Text style={styles.partnerButtonText}>View All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.payButton]}
//             onPress={() => {
//               setShowModalVisible(false)
//               navigation.navigate("Pay_Partner", { partnerId: partner.id })
//             }}
//           >
//             <Ionicons name="card-outline" size={wp("4%")} color="#FFFFFF" />
//             <Text style={styles.partnerButtonText}>Pay</Text>
//           </TouchableOpacity>
//         </View>
//         {partner.landTransactions && partner.landTransactions.length > 0 && (
//           <View style={styles.recentTransactions}>
//             <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
//             {partner.landTransactions.slice(0, 3).map((transaction, index) => (
//               <TransactionItem key={transaction.id || index} transaction={transaction} />
//             ))}
//             {partner.landTransactions.length > 3 && (
//               <TouchableOpacity
//                 style={styles.viewMoreButton}
//                 onPress={() => {
//                   setShowModalVisible(false)
//                   navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//                 }}
//               >
//                 <Text style={styles.viewMoreText}>View {partner.landTransactions.length - 3} more transactions</Text>
//                 <Ionicons name="chevron-forward" size={wp("4%")} color={colors.primary} />
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//         {partner.landTransactions && partner.landTransactions.length === 0 && (
//           <View style={styles.noTransactions}>
//             <Ionicons name="receipt-outline" size={wp("8%")} color={colors.textSecondary} />
//             <Text style={styles.noTransactionsText}>No transactions yet</Text>
//           </View>
//         )}
//       </View>
//     )
//   }

//   const renderLandCard = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity onPress={() => handleLandPress(item)} activeOpacity={0.95}>
//         <View style={styles.cardHeader}>
//           <View style={styles.landTitleContainer}>
//             <Text style={styles.landName} numberOfLines={2}>
//               {item.address?.landmark || "Unnamed Land"}
//             </Text>
//             {item.project && (
//               <View
//                 style={[
//                   styles.statusBadge,
//                   item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.statusText,
//                     item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
//                   ]}
//                 >
//                   {item.project.status?.replace("_", " ") || "UNKNOWN"}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {item.project && <Text style={styles.projectName}>Project: {item.project.name}</Text>}
//         </View>
//         <View style={styles.amountContainer}>
//           <AmountCard title="Total Amount" amount={item.totalAmount} icon="cash-outline" color={colors.success} />
//           <AmountCard
//             title="Agreement"
//             amount={item.agreementAmount}
//             icon="document-text-outline"
//             color={colors.primary}
//           />
//         </View>
//         <View style={styles.amountContainer}>
//           <AmountCard title="Token Amount" amount={item.tokenAmount} icon="card-outline" color={colors.warning} />
//           <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="resize-outline" size={wp("5%")} color={colors.secondary} />
//               <Text style={styles.amountTitle}>Area</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.secondary }]}>{formatArea(item.area)}</Text>
//           </View>
//         </View>
//         <View style={styles.locationSection}>
//           <Text style={styles.sectionTitle}>Location Details</Text>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
//           />
//           <InfoRow icon="map-outline" label="Muza/Village" value={`${item.address?.muza || "N/A"}`} />
//           <InfoRow
//             icon="home-outline"
//             label="Plot Details"
//             value={`Kh.No: ${item.address?.khno || "N/A"}, Ph.No: ${item.address?.phno || "N/A"}, Plot: ${item.address?.plotno || "N/A"}`}
//           />
//           <InfoRow
//             icon="mail-outline"
//             label="Pincode"
//             value={`${item.address?.pincode || "N/A"}, ${item.address?.state || "N/A"}`}
//           />
//         </View>
//         <View style={styles.peopleSection}>
//           <Text style={styles.sectionTitle}>Stakeholders</Text>
//           <InfoRow
//             icon="person-outline"
//             label="Owner"
//             value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Purchaser"
//             value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow icon="calendar-outline" label="Added Date" value={formatDate(item.landAddOnDate)} />
//         </View>
//         {item.project && (
//           <View style={styles.projectSection}>
//             <Text style={styles.sectionTitle}>Project Information</Text>
//             <InfoRow icon="business-outline" label="Project Name" value={item.project.name} />
//             <InfoRow icon="home-outline" label="Total Flats" value={`${item.project.totalflat || "N/A"} units`} />
//             <InfoRow
//               icon="resize-outline"
//               label="Building Size"
//               value={`${item.project.buildingSize || "N/A"} sq ft`}
//             />
//           </View>
//         )}
//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => handleShowLand(item)}
//             icon="eye-outline"
//             text="Details"
//             style={styles.showButton}
//           />
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
//             icon="create-outline"
//             text="Edit"
//             style={styles.editButton}
//           />
//           <ActionButton
//             onPress={() => handleDeleteLand(item.id)}
//             icon="trash-outline"
//             text="Delete"
//             style={styles.deleteButton}
//           />
//         </View>
//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
//             icon="person-add-outline"
//             text="Add Partner"
//             style={styles.addPartnerButton}
//           />
//           <ActionButton
//             onPress={item.project ? undefined : () => handleStartProject(item.id)}
//             icon="play-outline"
//             text="Start Project"
//             style={item.project ? styles.disabledButton : styles.startButton}
//             disabled={!!item.project}
//           />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   )

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color={colors.primary} />
//           <Text style={styles.loadingText}>Loading lands...</Text>
//         </View>
//       )
//     }
//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="alert-circle-outline" size={wp("15%")} color={colors.error} />
//           <Text style={styles.errorText}>Oops! Something went wrong</Text>
//           <Text style={styles.errorSubText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllLands}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }
//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             bunchColor={colors.primary}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="home-outline" size={wp("20%")} color={colors.textSecondary} />
//             <Text style={styles.emptyTitle}>No lands found</Text>
//             <Text style={styles.emptySubtitle}>Tap the '+' button to add your first land property</Text>
//           </View>
//         }
//       />
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Land Management</Text>
//           <Text style={styles.subtitle}>
//             {filteredLands.length} properties • Total Value:{" "}
//             {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLand} activeOpacity={0.8}>
//           <Ionicons name="add" size={wp("6%")} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={wp("5%")} color={colors.textSecondary} style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by location, owner, project..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton}>
//             <Ionicons name="close-circle" size={wp("5%")} color={colors.textSecondary} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {renderContent()}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showModalVisible}
//         onRequestClose={() => setShowModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Land Details</Text>
//               <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalVisible(false)}>
//                 <Ionicons name="close" size={wp("6%")} color={colors.textPrimary} />
//               </TouchableOpacity>
//             </View>
//             <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
//               {selectedLand && (
//                 <>
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Property Summary</Text>
//                     <Text style={styles.modalLandName}>{selectedLand.address?.landmark}</Text>
//                     <Text style={styles.modalLocation}>
//                       {selectedLand.address?.city}, {selectedLand.address?.state}
//                     </Text>
//                   </View>
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Financial Overview</Text>
//                     <View style={styles.modalAmountGrid}>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Total Amount</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.success }]}>
//                           {formatCurrency(selectedLand.totalAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Agreement</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.primary }]}>
//                           {formatCurrency(selectedLand.agreementAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Token</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.warning }]}>
//                           {formatCurrency(selectedLand.tokenAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Area</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.secondary }]}>
//                           {formatArea(selectedLand.area)}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                   <View style={styles.modalSection}>
//                     <View style={styles.partnersHeader}>
//                       <Text style={styles.modalSectionTitle}>Partners & Transactions</Text>
//                       <TouchableOpacity
//                         style={styles.addPartnerModalButton}
//                         onPress={() => {
//                           setShowModalVisible(false)
//                           navigation.navigate("Add_Edit_Partners", { landId: selectedLand.id })
//                         }}
//                       >
//                         <Ionicons name="person-add" size={wp("4%")} color="#FFFFFF" />
//                         <Text style={styles.addPartnerModalButtonText}>Add Partner</Text>
//                       </TouchableOpacity>
//                     </View>
//                     {selectedLand?.partners?.length > 0 ? (
//                       selectedLand.partners.map((partner, index) => (
//                         <PartnerCard key={partner.id || index} partner={partner} />
//                       ))
//                     ) : (
//                       <View style={styles.noPartnersContainer}>
//                         <Ionicons name="people-outline" size={wp("12%")} color={colors.textSecondary} />
//                         <Text style={styles.noPartnersText}>No partners added yet</Text>
//                         <Text style={styles.noPartnersSubtext}>
//                           Add partners to start collaboration and track transactions
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const colors = {
//   primary: "#007AFF",
//   secondary: "#5856D6",
//   success: "#34C759",
//   warning: "#FF9500",
//   error: "#FF3B30",
//   background: "#F2F2F7",
//   surface: "#FFFFFF",
//   textPrimary: "#000000",
//   textSecondary: "#8E8E93",
//   border: "#C6C6C8",
//   shadow: "#000000",
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: wp("5%"),
//     paddingTop: hp("6%"),
//     paddingBottom: hp("2%"),
//     backgroundColor: colors.surface,
//     borderBottomLeftRadius: wp("6%"),
//     borderBottomRightRadius: wp("6%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   title: {
//     fontSize: wp("8%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     fontWeight: "500",
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.surface,
//     borderRadius: wp("4%"),
//     marginHorizontal: wp("5%"),
//     marginVertical: hp("2%"),
//     paddingHorizontal: wp("4%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   searchIcon: {
//     marginRight: wp("3%"),
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: wp("4%"),
//     color: colors.textPrimary,
//     paddingVertical: hp("1.8%"),
//   },
//   clearButton: {
//     padding: wp("1%"),
//   },
//   listContent: {
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("10%"),
//   },
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: wp("5%"),
//     marginBottom: hp("2.5%"),
//     padding: wp("5%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   cardHeader: {
//     marginBottom: hp("2%"),
//   },
//   landTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1%"),
//   },
//   landName: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     flex: 1,
//     marginRight: wp("3%"),
//     lineHeight: wp("6.5%"),
//   },
//   projectName: {
//     fontSize: wp("3.8%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//     fontStyle: "italic",
//   },
//   statusBadge: {
//     paddingHorizontal: wp("3%"),
//     paddingVertical: hp("0.8%"),
//     borderRadius: wp("4%"),
//   },
//   statusText: {
//     fontSize: wp("3%"),
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   inProgress: {
//     backgroundColor: "#FFF5E1",
//   },
//   inProgressText: {
//     color: "#FF9500",
//   },
//   completed: {
//     backgroundColor: "#E6F4EA",
//   },
//   completedText: {
//     color: "#34C759",
//   },
//   amountContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: hp("1.5%"),
//     gap: wp("2%"),
//   },
//   amountCard: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("3%"),
//     borderLeftWidth: 4,
//   },
//   amountHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("0.5%"),
//   },
//   amountTitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginLeft: wp("2%"),
//     fontWeight: "500",
//   },
//   amountValue: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   locationSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   peopleSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   projectSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   sectionTitle: {
//     fontSize: wp("4.2%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("1.2%"),
//   },
//   detailIcon: {
//     marginRight: wp("3%"),
//     width: wp("6%"),
//     alignItems: "center",
//   },
//   label: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     flex: 0.35,
//     fontWeight: "500",
//   },
//   value: {
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     flex: 0.65,
//     textAlign: "right",
//   },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: hp("2%"),
//     gap: wp("2%"),
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("3%"),
//     borderRadius: wp("3%"),
//     flex: 1,
//     justifyContent: "center",
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   showButton: {
//     backgroundColor: colors.primary,
//   },
//   editButton: {
//     backgroundColor: colors.warning,
//   },
//   deleteButton: {
//     backgroundColor: colors.error,
//   },
//   addPartnerButton: {
//     backgroundColor: colors.success,
//   },
//   startButton: {
//     backgroundColor: colors.secondary,
//   },
//   manageButton: {
//     backgroundColor: "#6366F1",
//   },
//   disabledButton: {
//     backgroundColor: "#A0A0A0",
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.2%"),
//     fontWeight: "600",
//     marginLeft: wp("1.5%"),
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: wp("5%"),
//   },
//   loadingText: {
//     marginTop: hp("2%"),
//     fontSize: wp("4.5%"),
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   errorText: {
//     fontSize: wp("5%"),
//     color: colors.error,
//     textAlign: "center",
//     marginTop: hp("2%"),
//     fontWeight: "600",
//   },
//   errorSubText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     textAlign: "center",
//     marginTop: hp("1%"),
//     marginHorizontal: wp("5%"),
//   },
//   retryButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: hp("1.5%"),
//     paddingHorizontal: wp("8%"),
//     borderRadius: wp("6%"),
//     marginTop: hp("3%"),
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   retryButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: hp("10%"),
//     paddingHorizontal: wp("10%"),
//   },
//   emptyTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginTop: hp("2%"),
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//     textAlign: "center",
//     lineHeight: wp("5.5%"),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: colors.surface,
//     borderTopLeftRadius: wp("6%"),
//     borderTopRightRadius: wp("6%"),
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("4%"),
//     maxHeight: hp("90%"),
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("2.5%"),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   modalTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//   },
//   closeButton: {
//     padding: wp("2%"),
//   },
//   modalScrollView: {
//     flex: 1,
//   },
//   modalSection: {
//     marginBottom: hp("3%"),
//   },
//   modalSectionTitle: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1.5%"),
//   },
//   modalLandName: {
//     fontSize: wp("6%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: hp("0.5%"),
//   },
//   modalLocation: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   modalAmountGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: wp("3%"),
//   },
//   modalAmountItem: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("4%"),
//     width: "47%",
//     alignItems: "center",
//   },
//   modalAmountLabel: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//     fontWeight: "500",
//   },
//   modalAmountValue: {
//     fontSize: wp("4.5%"),
//     fontWeight: "700",
//   },
//   partnersHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: hp("2%"),
//   },
//   partnerCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("4%"),
//     padding: wp("4%"),
//     marginBottom: hp("2%"),
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   partnerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1.5%"),
//   },
//   partnerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   partnerAvatar: {
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     backgroundColor: colors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   partnerInitial: {
//     fontSize: wp("5%"),
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   partnerDetails: {
//     marginLeft: wp("3%"),
//     flex: 1,
//   },
//   partnerName: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("0.3%"),
//   },
//   partnerLocation: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.2%"),
//   },
//   partnerPhone: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//   },
//   partnerStats: {
//     alignItems: "flex-end",
//   },
//   partnerStatsNumber: {
//     fontSize: wp("5%"),
//     fontWeight: "700",
//     color: colors.primary,
//   },
//   partnerStatsLabel: {
//     fontSize: wp("3%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//   },
//   partnerStatsAmount: {
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   partnerActions: {
//     flexDirection: "row",
//     gap: wp("2%"),
//     marginBottom: hp("1.5%"),
//   },
//   partnerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("2%"),
//     flex: 1,
//     justifyContent: "center",
//   },
//   viewButton: {
//     backgroundColor: colors.primary,
//   },
//   payButton: {
//     backgroundColor: colors.success,
//   },
//   partnerButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     marginLeft: wp("1%"),
//   },
//   recentTransactions: {
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//     paddingTop: hp("1.5%"),
//   },
//   recentTransactionsTitle: {
//     fontSize: wp("4%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   transactionItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("1%"),
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   transactionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   transactionIcon: {
//     width: wp("8%"),
//     height: wp("8%"),
//     borderRadius: wp("4%"),
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: wp("3%"),
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionNote: {
//     fontSize: wp("3.8%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginBottom: hp("0.2%"),
//   },
//   transactionDate: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.3%"),
//   },
//   transactionMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: wp("2%"),
//   },
//   madeByText: {
//     fontSize: wp("3%"),
//     color: colors.textSecondary,
//     fontStyle: "italic",
//   },
//   transactionRight: {
//     alignItems: "flex-end",
//   },
//   transactionAmount: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   viewMoreButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: hp("1%"),
//     marginTop: hp("0.5%"),
//   },
//   viewMoreText: {
//     fontSize: wp("3.5%"),
//     color: colors.primary,
//     fontWeight: "500",
//     marginRight: wp("1%"),
//   },
//   noTransactions: {
//     alignItems: "center",
//     paddingVertical: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//   },
//   noTransactionsText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//   },
//   noPartnersContainer: {
//     alignItems: "center",
//     paddingVertical: hp("4%"),
//   },
//   noPartnersText: {
//     fontSize: wp("4.2%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginTop: hp("1.5%"),
//     textAlign: "center",
//   },
//   noPartnersSubtext: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     textAlign: "center",
//     lineHeight: wp("4.5%"),
//   },
//   addPartnerModalButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.success,
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("4%"),
//   },
//   addPartnerModalButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     marginLeft: wp("1%"),
//   },
// })

// export default Land_Management






// "use client"
// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from "axios"
// import { useCallback, useEffect, useState } from "react"
// import { ActivityIndicator, Alert, Animated, Dimensions, FlatList, Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
// const { width: SCREEN_WIDTH } = Dimensions.get("window")

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([])
//   const [filteredLands, setFilteredLands] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [searchText, setSearchText] = useState("")
//   const [addPartnerModalVisible, setAddPartnerModalVisible] = useState(false)
//   const [showModalVisible, setShowModalVisible] = useState(false)
//   const [selectedLandId, setSelectedLandId] = useState(null)
//   const [partnerName, setPartnerName] = useState("")
//   const [selectedLand, setSelectedLand] = useState(null)
//   const [fadeAnim] = useState(new Animated.Value(0))

//   const getAllLands = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const jwtToken = await AsyncStorage.getItem("jwtToken")
//       if (!jwtToken) {
//         throw new Error("No JWT token found")
//       }
//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       setLands(response.data)
//       setFilteredLands(response.data)
//       console.log(JSON.stringify(response.data, null, 2))
//     } catch (err) {
//       setError(err.message || "Failed to fetch lands")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await getAllLands()
//     setRefreshing(false)
//   }, [])

//   useEffect(() => {
//     getAllLands()
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.muza?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
//     )
//     setFilteredLands(filtered)
//   }, [searchText, lands])

//   const handleLandPress = (land) => {
//     console.log("Card tapped:", land.id)
//   }

//   const handleShowLand = (land) => {
//     setSelectedLand(land)
//     setShowModalVisible(true)
//   }

//   const handleAddLand = () => {
//     navigation.navigate("Add_Edit_Land")
//   }

//   const handleDeleteLand = (id) => {
//     Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const jwtToken = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//               },
//             })
//             getAllLands()
//             Alert.alert("Success", "Land deleted successfully")
//           } catch (err) {
//             Alert.alert("Error", err.message || "Failed to delete land")
//           }
//         },
//       },
//     ])
//   }

//   const handleStartProject = (landId) => {
//     navigation.navigate("Flat_Management", { id: landId })
//   }

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A"
//     const date = new Date(dateStr)
//     const day = String(date.getDate()).padStart(2, "0")
//     const month = String(date.getMonth() + 1).padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   const formatArea = (area) => {
//     if (!area) return "N/A"
//     return `${area.toLocaleString()} sq ft`
//   }

//   const getTransactionIcon = (change, status) => {
//     if (change === "CREDIT") {
//       return "arrow-down-circle"
//     } else if (change === "DEBIT") {
//       return "arrow-up-circle"
//     }
//     return "swap-horizontal"
//   }

//   const getTransactionColor = (change) => {
//     if (change === "CREDIT") {
//       return colors.success
//     } else if (change === "DEBIT") {
//       return colors.error
//     }
//     return colors.textSecondary
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "UPI":
//         return colors.primary
//       case "CASH":
//         return colors.success
//       case "BANK":
//         return colors.secondary
//       case "CHEQUE":
//         return colors.warning
//       default:
//         return colors.textSecondary
//     }
//   }

//   const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
//     <View style={styles.detailRow}>
//       <View style={styles.detailIcon}>
//         <Ionicons name={icon} size={wp("4.5%")} color={colors.primary} />
//       </View>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={[styles.value, { color: valueColor }]} numberOfLines={2}>
//         {value}
//       </Text>
//     </View>
//   )

//   const ActionButton = ({ onPress, icon, text, style, textStyle, disabled = false }) => (
//     <TouchableOpacity
//       style={[styles.actionButton, style, disabled && styles.disabledButton]}
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//       accessibilityLabel={text}
//       accessibilityRole="button"
//     >
//       <Ionicons name={icon} size={wp("4%")} color="#FFFFFF" />
//       <Text style={[styles.actionButtonText, textStyle]}>{text}</Text>
//     </TouchableOpacity>
//   )

//   const AmountCard = ({ title, amount, icon, color }) => (
//     <View style={[styles.amountCard, { borderLeftColor: color }]}>
//       <View style={styles.amountHeader}>
//         <Ionicons name={icon} size={wp("5%")} color={color} />
//         <Text style={styles.amountTitle}>{title}</Text>
//       </View>
//       <Text style={[styles.amountValue, { color }]}>{formatCurrency(amount)}</Text>
//     </View>
//   )

//   const TransactionItem = ({ transaction }) => (
//     <View style={styles.transactionItem}>
//       <View style={styles.transactionLeft}>
//         <View style={[styles.transactionIcon, { backgroundColor: getTransactionColor(transaction.change) + "20" }]}>
//           <Ionicons
//             name={getTransactionIcon(transaction.change, transaction.status)}
//             size={wp("5%")}
//             color={getTransactionColor(transaction.change)}
//           />
//         </View>
//         <View style={styles.transactionDetails}>
//           <Text style={styles.transactionNote}>{transaction.note || "No note"}</Text>
//           <Text style={styles.transactionDate}>{formatDate(transaction.transactionDate)}</Text>
//           <View style={styles.transactionMeta}>
//             <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + "20" }]}>
//               <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
//                 {transaction.status}
//               </Text>
//             </View>
//             <Text style={styles.madeByText}>by {transaction.madeBy}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.transactionRight}>
//         <Text style={[styles.transactionAmount, { color: getTransactionColor(transaction.change) }]}>
//           {transaction.change === "CREDIT" ? "+" : "-"}
//           {formatCurrency(transaction.transactionAmount)}
//         </Text>
//       </View>
//     </View>
//   )

//   const PartnerCard = ({ partner }) => {
//     const totalTransactions = partner.landTransactions?.length || 0
//     const totalAmount =
//       partner.landTransactions?.reduce((sum, transaction) => {
//         return transaction.change === "CREDIT"
//           ? sum + transaction.transactionAmount
//           : sum - transaction.transactionAmount
//       }, 0) || 0
//     return (
//       <View style={styles.partnerCard}>
//         <View style={styles.partnerHeader}>
//           <View style={styles.partnerInfo}>
//             <View style={styles.partnerAvatar}>
//               <Text style={styles.partnerInitial}>{partner.name?.charAt(0)?.toUpperCase()}</Text>
//             </View>
//             <View style={styles.partnerDetails}>
//               <Text style={styles.partnerName}>{partner.name}</Text>
//               <Text style={styles.partnerLocation}>
//                 <Ionicons name="location-outline" size={wp("3.5%")} color={colors.textSecondary} /> {partner.city}
//               </Text>
//               <Text style={styles.partnerPhone}>
//                 <Ionicons name="call-outline" size={wp("3.5%")} color={colors.textSecondary} /> {partner.phoneNumber}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.partnerStats}>
//             <Text style={styles.partnerStatsNumber}>{totalTransactions}</Text>
//             <Text style={styles.partnerStatsLabel}>Transactions</Text>
//             <Text style={[styles.partnerStatsAmount, { color: totalAmount >= 0 ? colors.success : colors.error }]}>
//               {formatCurrency(Math.abs(totalAmount))}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.partnerActions}>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.viewButton]}
//             onPress={() => {
//               setShowModalVisible(false)
//               navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//             }}
//             accessibilityLabel="View All Transactions"
//             accessibilityRole="button"
//           >
//             <Ionicons name="eye-outline" size={wp("4%")} color="#FFFFFF" />
//             <Text style={styles.partnerButtonText}>View All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.payButton]}
//             onPress={() => {
//               setShowModalVisible(false)
//               navigation.navigate("Pay_Partner", { partnerId: partner.id })
//             }}
//             accessibilityLabel="Pay Partner"
//             accessibilityRole="button"
//           >
//             <Ionicons name="card-outline" size={wp("4%")} color="#FFFFFF" />
//             <Text style={styles.partnerButtonText}>Pay</Text>
//           </TouchableOpacity>
//         </View>
//         {partner.landTransactions && partner.landTransactions.length > 0 && (
//           <View style={styles.recentTransactions}>
//             <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
//             {partner.landTransactions.slice(0, 3).map((transaction, index) => (
//               <TransactionItem key={transaction.id || index} transaction={transaction} />
//             ))}
//             {partner.landTransactions.length > 3 && (
//               <TouchableOpacity
//                 style={styles.viewMoreButton}
//                 onPress={() => {
//                   setShowModalVisible(false)
//                   navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//                 }}
//                 accessibilityLabel="View More Transactions"
//                 accessibilityRole="button"
//               >
//                 <Text style={styles.viewMoreText}>View {partner.landTransactions.length - 3} more transactions</Text>
//                 <Ionicons name="chevron-forward" size={wp("4%")} color={colors.primary} />
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//         {partner.landTransactions && partner.landTransactions.length === 0 && (
//           <View style={styles.noTransactions}>
//             <Ionicons name="receipt-outline" size={wp("8%")} color={colors.textSecondary} />
//             <Text style={styles.noTransactionsText}>No transactions yet</Text>
//           </View>
//         )}
//       </View>
//     )
//   }

//   const renderLandCard = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity onPress={() => handleLandPress(item)} activeOpacity={0.95}>
//         <View style={styles.cardHeader}>
//           <View style={styles.landTitleContainer}>
//             <Text style={styles.landName} numberOfLines={2}>
//               {item.address?.landmark || "Unnamed Land"}
//             </Text>
//             {item.project && (
//               <View
//                 style={[
//                   styles.statusBadge,
//                   item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.statusText,
//                     item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
//                   ]}
//                 >
//                   {item.project.status?.replace("_", " ") || "UNKNOWN"}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {item.project && <Text style={styles.projectName}>Project: {item.project.name}</Text>}
//         </View>
//         <View style={styles.amountContainer}>
//           <AmountCard title="Total Amount" amount={item.totalAmount} icon="cash-outline" color={colors.success} />
//           <AmountCard
//             title="Agreement"
//             amount={item.agreementAmount}
//             icon="document-text-outline"
//             color={colors.primary}
//           />
//         </View>
//         <View style={styles.amountContainer}>
//           <AmountCard title="Token Amount" amount={item.tokenAmount} icon="card-outline" color={colors.warning} />
//           <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="resize-outline" size={wp("5%")} color={colors.secondary} />
//               <Text style={styles.amountTitle}>Area</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.secondary }]}>{formatArea(item.area)}</Text>
//           </View>
//         </View>
//         <View style={styles.locationSection}>
//           <Text style={styles.sectionTitle}>Location Details</Text>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
//           />
//           <InfoRow icon="map-outline" label="Muza/Village" value={`${item.address?.muza || "N/A"}`} />
//           <InfoRow
//             icon="home-outline"
//             label="Plot Details"
//             value={`Kh.No: ${item.address?.khno || "N/A"}, Ph.No: ${item.address?.phno || "N/A"}, Plot: ${item.address?.plotno || "N/A"}`}
//           />
//           <InfoRow
//             icon="mail-outline"
//             label="Pincode"
//             value={`${item.address?.pincode || "N/A"}, ${item.address?.state || "N/A"}`}
//           />
//         </View>
//         <View style={styles.peopleSection}>
//           <Text style={styles.sectionTitle}>Stakeholders</Text>
//           <InfoRow
//             icon="person-outline"
//             label="Owner"
//             value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Purchaser"
//             value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow icon="calendar-outline" label="Added Date" value={formatDate(item.landAddOnDate)} />
//         </View>
//         {item.project && (
//           <View style={styles.projectSection}>
//             <Text style={styles.sectionTitle}>Project Information</Text>
//             <InfoRow icon="business-outline" label="Project Name" value={item.project.name} />
//             <InfoRow icon="home-outline" label="Total Flats" value={`${item.project.totalflat || "N/A"} units`} />
//             <InfoRow
//               icon="resize-outline"
//               label="Building Size"
//               value={`${item.project.buildingSize || "N/A"} sq ft`}
//             />
//           </View>
//         )}
//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => handleShowLand(item)}
//             icon="eye-outline"
//             text="Details"
//             style={styles.showButton}
//           />
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
//             icon="create-outline"
//             text="Edit"
//             style={styles.editButton}
//           />
//           <ActionButton
//             onPress={() => handleDeleteLand(item.id)}
//             icon="trash-outline"
//             text="Delete"
//             style={styles.deleteButton}
//           />
//         </View>
//         <View style={styles.actionRow}>
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
//             icon="person-add-outline"
//             text="Add Partner"
//             style={styles.addPartnerButton}
//           />
//           <ActionButton
//             onPress={item.project ? undefined : () => handleStartProject(item.id)}
//             icon="play-outline"
//             text="Start Project"
//             style={item.project ? styles.disabledButton : styles.startButton}
//             disabled={!!item.project}
//           />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   )

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color={colors.primary} />
//           <Text style={styles.loadingText}>Loading lands...</Text>
//         </View>
//       )
//     }
//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="alert-circle-outline" size={wp("15%")} color={colors.error} />
//           <Text style={styles.errorText}>Oops! Something went wrong</Text>
//           <Text style={styles.errorSubText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllLands}>
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }
//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             tintColor={colors.primary} // Corrected from bunchColor to tintColor
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="home-outline" size={wp("20%")} color={colors.textSecondary} />
//             <Text style={styles.emptyTitle}>No lands found</Text>
//             <Text style={styles.emptySubtitle}>Tap the '+' button to add your first land property</Text>
//           </View>
//         }
//       />
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Land Management</Text>
//           <Text style={styles.subtitle}>
//             {filteredLands.length} properties • Total Value:{" "}
//             {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddLand} activeOpacity={0.8} accessibilityLabel="Add Land" accessibilityRole="button">
//           <Ionicons name="add" size={wp("6%")} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search-outline" size={wp("5%")} color={colors.textSecondary} style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search by location, owner, project..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchText}
//           onChangeText={setSearchText}
//           accessibilityLabel="Search input"
//           accessibilityRole="search"
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton} accessibilityLabel="Clear search" accessibilityRole="button">
//             <Ionicons name="close-circle" size={wp("5%")} color={colors.textSecondary} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {renderContent()}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showModalVisible}
//         onRequestClose={() => {
//           setShowModalVisible(false)
//           setSelectedLand(null) // Reset selectedLand when closing
//         }}
//         accessibilityLabel="Land Details Modal"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Land Details</Text>
//               <TouchableOpacity style={styles.closeButton} onPress={() => setShowModalVisible(false)} accessibilityLabel="Close Modal" accessibilityRole="button">
//                 <Ionicons name="close" size={wp("6%")} color={colors.textPrimary} />
//               </TouchableOpacity>
//             </View>
//             <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
//               {selectedLand ? (
//                 <>
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Property Summary</Text>
//                     <Text style={styles.modalLandName}>{selectedLand.address?.landmark}</Text>
//                     <Text style={styles.modalLocation}>
//                       {selectedLand.address?.city}, {selectedLand.address?.state}
//                     </Text>
//                   </View>
//                   <View style={styles.modalSection}>
//                     <Text style={styles.modalSectionTitle}>Financial Overview</Text>
//                     <View style={styles.modalAmountGrid}>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Total Amount</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.success }]}>
//                           {formatCurrency(selectedLand.totalAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Agreement</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.primary }]}>
//                           {formatCurrency(selectedLand.agreementAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Token</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.warning }]}>
//                           {formatCurrency(selectedLand.tokenAmount)}
//                         </Text>
//                       </View>
//                       <View style={styles.modalAmountItem}>
//                         <Text style={styles.modalAmountLabel}>Area</Text>
//                         <Text style={[styles.modalAmountValue, { color: colors.secondary }]}>
//                           {formatArea(selectedLand.area)}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                   <View style={styles.modalSection}>
//                     <View style={styles.partnersHeader}>
//                       <Text style={styles.modalSectionTitle}>Partners & Transactions</Text>
//                       <TouchableOpacity
//                         style={styles.addPartnerModalButton}
//                         onPress={() => {
//                           setShowModalVisible(false)
//                           navigation.navigate("Add_Edit_Partners", { landId: selectedLand.id })
//                         }}
//                         accessibilityLabel="Add Partner"
//                         accessibilityRole="button"
//                       >
//                         <Ionicons name="person-add" size={wp("4%")} color="#FFFFFF" />
//                         <Text style={styles.addPartnerModalButtonText}>Add Partner</Text>
//                       </TouchableOpacity>
//                     </View>
//                     {selectedLand?.partners?.length > 0 ? (
//                       selectedLand.partners.map((partner, index) => (
//                         <PartnerCard key={partner.id || index} partner={partner} />
//                       ))
//                     ) : (
//                       <View style={styles.noPartnersContainer}>
//                         <Ionicons name="people-outline" size={wp("12%")} color={colors.textSecondary} />
//                         <Text style={styles.noPartnersText}>No partners added yet</Text>
//                         <Text style={styles.noPartnersSubtext}>
//                           Add partners to start collaboration and track transactions
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </>
//               ) : null}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const colors = {
//   primary: "#007AFF",
//   secondary: "#5856D6",
//   success: "#34C759",
//   warning: "#FF9500",
//   error: "#FF3B30",
//   background: "#F2F2F7",
//   surface: "#FFFFFF",
//   textPrimary: "#000000",
//   textSecondary: "#8E8E93",
//   border: "#C6C6C8",
//   shadow: "#000000",
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: wp("5%"),
//     paddingTop: hp("6%"),
//     paddingBottom: hp("2%"),
//     backgroundColor: colors.surface,
//     borderBottomLeftRadius: wp("6%"),
//     borderBottomRightRadius: wp("6%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   title: {
//     fontSize: wp("8%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     fontWeight: "500",
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.surface,
//     borderRadius: wp("4%"),
//     marginHorizontal: wp("5%"),
//     marginVertical: hp("2%"),
//     paddingHorizontal: wp("4%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   searchIcon: {
//     marginRight: wp("3%"),
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: wp("4%"),
//     color: colors.textPrimary,
//     paddingVertical: hp("1.8%"),
//   },
//   clearButton: {
//     padding: wp("1%"),
//   },
//   listContent: {
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("10%"),
//   },
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: wp("5%"),
//     marginBottom: hp("2.5%"),
//     padding: wp("5%"),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   cardHeader: {
//     marginBottom: hp("2%"),
//   },
//   landTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1%"),
//   },
//   landName: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     flex: 1,
//     marginRight: wp("3%"),
//     lineHeight: wp("6.5%"),
//   },
//   projectName: {
//     fontSize: wp("3.8%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//     fontStyle: "italic",
//   },
//   statusBadge: {
//     paddingHorizontal: wp("3%"),
//     paddingVertical: hp("0.8%"),
//     borderRadius: wp("4%"),
//   },
//   statusText: {
//     fontSize: wp("3%"),
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   inProgress: {
//     backgroundColor: "#FFF5E1",
//   },
//   inProgressText: {
//     color: "#FF9500",
//   },
//   completed: {
//     backgroundColor: "#E6F4EA",
//   },
//   completedText: {
//     color: "#34C759",
//   },
//   amountContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: hp("1.5%"),
//     gap: wp("2%"),
//   },
//   amountCard: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("3%"),
//     borderLeftWidth: 4,
//   },
//   amountHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("0.5%"),
//   },
//   amountTitle: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginLeft: wp("2%"),
//     fontWeight: "500",
//   },
//   amountValue: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   locationSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   peopleSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   projectSection: {
//     marginTop: hp("2%"),
//     paddingTop: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   sectionTitle: {
//     fontSize: wp("4.2%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: hp("1.2%"),
//   },
//   detailIcon: {
//     marginRight: wp("3%"),
//     width: wp("6%"),
//     alignItems: "center",
//   },
//   label: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     flex: 0.35,
//     fontWeight: "500",
//   },
//   value: {
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     flex: 0.65,
//     textAlign: "right",
//   },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: hp("2%"),
//     gap: wp("2%"),
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1.2%"),
//     paddingHorizontal: wp("3%"),
//     borderRadius: wp("3%"),
//     flex: 1,
//     justifyContent: "center",
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   showButton: {
//     backgroundColor: colors.primary,
//   },
//   editButton: {
//     backgroundColor: colors.warning,
//   },
//   deleteButton: {
//     backgroundColor: colors.error,
//   },
//   addPartnerButton: {
//     backgroundColor: colors.success,
//   },
//   startButton: {
//     backgroundColor: colors.secondary,
//   },
//   manageButton: {
//     backgroundColor: "#6366F1",
//   },
//   disabledButton: {
//     backgroundColor: "#A0A0A0",
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.2%"),
//     fontWeight: "600",
//     marginLeft: wp("1.5%"),
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: wp("5%"),
//   },
//   loadingText: {
//     marginTop: hp("2%"),
//     fontSize: wp("4.5%"),
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   errorText: {
//     fontSize: wp("5%"),
//     color: colors.error,
//     textAlign: "center",
//     marginTop: hp("2%"),
//     fontWeight: "600",
//   },
//   errorSubText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     textAlign: "center",
//     marginTop: hp("1%"),
//     marginHorizontal: wp("5%"),
//   },
//   retryButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: hp("1.5%"),
//     paddingHorizontal: wp("8%"),
//     borderRadius: wp("6%"),
//     marginTop: hp("3%"),
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   retryButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: hp("10%"),
//     paddingHorizontal: wp("10%"),
//   },
//   emptyTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginTop: hp("2%"),
//     textAlign: "center",
//   },
//   emptySubtitle: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//     textAlign: "center",
//     lineHeight: wp("5.5%"),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: colors.surface,
//     borderTopLeftRadius: wp("6%"),
//     borderTopRightRadius: wp("6%"),
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("4%"),
//     maxHeight: hp("90%"),
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("2.5%"),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   modalTitle: {
//     fontSize: wp("5.5%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//   },
//   closeButton: {
//     padding: wp("2%"),
//   },
//   modalScrollView: {
//     flex: 1,
//   },
//   modalSection: {
//     marginBottom: hp("3%"),
//   },
//   modalSectionTitle: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1.5%"),
//   },
//   modalLandName: {
//     fontSize: wp("6%"),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: hp("0.5%"),
//   },
//   modalLocation: {
//     fontSize: wp("4%"),
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   modalAmountGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: wp("3%"),
//   },
//   modalAmountItem: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("3%"),
//     padding: wp("4%"),
//     width: "47%",
//     alignItems: "center",
//   },
//   modalAmountLabel: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//     fontWeight: "500",
//   },
//   modalAmountValue: {
//     fontSize: wp("4.5%"),
//     fontWeight: "700",
//   },
//   partnersHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: hp("2%"),
//   },
//   partnerCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: wp("4%"),
//     padding: wp("4%"),
//     marginBottom: hp("2%"),
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   partnerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: hp("1.5%"),
//   },
//   partnerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   partnerAvatar: {
//     width: wp("12%"),
//     height: wp("12%"),
//     borderRadius: wp("6%"),
//     backgroundColor: colors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   partnerInitial: {
//     fontSize: wp("5%"),
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   partnerDetails: {
//     marginLeft: wp("3%"),
//     flex: 1,
//   },
//   partnerName: {
//     fontSize: wp("4.5%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("0.3%"),
//   },
//   partnerLocation: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.2%"),
//   },
//   partnerPhone: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//   },
//   partnerStats: {
//     alignItems: "flex-end",
//   },
//   partnerStatsNumber: {
//     fontSize: wp("5%"),
//     fontWeight: "700",
//     color: colors.primary,
//   },
//   partnerStatsLabel: {
//     fontSize: wp("3%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.5%"),
//   },
//   partnerStatsAmount: {
//     fontSize: wp("4%"),
//     fontWeight: "600",
//   },
//   partnerActions: {
//     flexDirection: "row",
//     gap: wp("2%"),
//     marginBottom: hp("1.5%"),
//   },
//   partnerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("2%"),
//     flex: 1,
//     justifyContent: "center",
//   },
//   viewButton: {
//     backgroundColor: colors.primary,
//   },
//   payButton: {
//     backgroundColor: colors.success,
//   },
//   partnerButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     marginLeft: wp("1%"),
//   },
//   recentTransactions: {
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//     paddingTop: hp("1.5%"),
//   },
//   recentTransactionsTitle: {
//     fontSize: wp("4%"),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: hp("1%"),
//   },
//   transactionItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: hp("1%"),
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   transactionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   transactionIcon: {
//     width: wp("8%"),
//     height: wp("8%"),
//     borderRadius: wp("4%"),
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: wp("3%"),
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionNote: {
//     fontSize: wp("3.8%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginBottom: hp("0.2%"),
//   },
//   transactionDate: {
//     fontSize: wp("3.2%"),
//     color: colors.textSecondary,
//     marginBottom: hp("0.3%"),
//   },
//   transactionMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: wp("2%"),
//   },
//   madeByText: {
//     fontSize: wp("3%"),
//     color: colors.textSecondary,
//     fontStyle: "italic",
//   },
//   transactionRight: {
//     alignItems: "flex-end",
//   },
//   transactionAmount: {
//     fontSize: wp("4%"),
//     fontWeight: "700",
//   },
//   viewMoreButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: hp("1%"),
//     marginTop: hp("0.5%"),
//   },
//   viewMoreText: {
//     fontSize: wp("3.5%"),
//     color: colors.primary,
//     fontWeight: "500",
//     marginRight: wp("1%"),
//   },
//   noTransactions: {
//     alignItems: "center",
//     paddingVertical: hp("2%"),
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//   },
//   noTransactionsText: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("1%"),
//   },
//   noPartnersContainer: {
//     alignItems: "center",
//     paddingVertical: hp("4%"),
//   },
//   noPartnersText: {
//     fontSize: wp("4.2%"),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginTop: hp("1.5%"),
//     textAlign: "center",
//   },
//   noPartnersSubtext: {
//     fontSize: wp("3.5%"),
//     color: colors.textSecondary,
//     marginTop: hp("0.5%"),
//     textAlign: "center",
//     lineHeight: wp("4.5%"),
//   },
//   addPartnerModalButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.success,
//     paddingVertical: hp("1%"),
//     paddingHorizontal: wp("4%"),
//     borderRadius: wp("4%"),
//   },
//   addPartnerModalButtonText: {
//     color: "#FFFFFF",
//     fontSize: wp("3.5%"),
//     fontWeight: "600",
//     marginLeft: wp("1%"),
//   },
// })

// export default Land_Management









// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from "axios"
// import { useCallback, useEffect, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
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
//   View,
// } from "react-native"
// import { widthPercentageToDP as wp } from "react-native-responsive-screen"

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// // Enhanced responsive helper functions with device detection
// const getResponsiveWidth = (percentage) => (SCREEN_WIDTH * percentage) / 100
// const getResponsiveHeight = (percentage) => (SCREEN_HEIGHT * percentage) / 100
// const getResponsiveFontSize = (size) => {
//   const scale = SCREEN_WIDTH / 375 // Base width (iPhone X)
//   const newSize = size * scale
//   return Math.max(Math.min(newSize, size * 1.4), size * 0.7) // Enhanced scaling range
// }

// // Enhanced device type detection
// const isSmallPhone = SCREEN_WIDTH < 350
// const isPhone = SCREEN_WIDTH < 768
// const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024
// const isLargeTablet = SCREEN_WIDTH >= 1024
// const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT
// const isShortScreen = SCREEN_HEIGHT < 700
// const isTallScreen = SCREEN_HEIGHT > 900

// // Dynamic modal sizing based on device
// const getModalDimensions = () => {
//   if (isLargeTablet) {
//     return {
//       width: isLandscape ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.7,
//       maxHeight: SCREEN_HEIGHT * 0.85,
//       borderRadius: wp("4%"),
//       padding: wp("6%"),
//     }
//   } else if (isTablet) {
//     return {
//       width: isLandscape ? SCREEN_WIDTH * 0.6 : SCREEN_WIDTH * 0.8,
//       maxHeight: SCREEN_HEIGHT * 0.8,
//       borderRadius: wp("5%"),
//       padding: wp("5%"),
//     }
//   } else if (isSmallPhone) {
//     return {
//       width: SCREEN_WIDTH,
//       maxHeight: SCREEN_HEIGHT * 0.95,
//       borderRadius: 0,
//       padding: wp("4%"),
//     }
//   } else {
//     return {
//       width: SCREEN_WIDTH,
//       maxHeight: SCREEN_HEIGHT * 0.9,
//       borderRadius: wp("6%"),
//       padding: wp("5%"),
//     }
//   }
// }

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([])
//   const [filteredLands, setFilteredLands] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [searchText, setSearchText] = useState("")
//   const [showModalVisible, setShowModalVisible] = useState(false)
//   const [selectedLand, setSelectedLand] = useState(null)
//   const [fadeAnim] = useState(new Animated.Value(0))
//   const [modalAnim] = useState(new Animated.Value(0))

//   const modalDimensions = getModalDimensions()

//   const getAllLands = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const jwtToken = await AsyncStorage.getItem("jwtToken")
//       if (!jwtToken) {
//         throw new Error("No JWT token found")
//       }
//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       setLands(response.data)
//       setFilteredLands(response.data)
//     } catch (err) {
//       setError(err.message || "Failed to fetch lands")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await getAllLands()
//     setRefreshing(false)
//   }, [])

//   useEffect(() => {
//     getAllLands()
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.muza?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
//     )
//     setFilteredLands(filtered)
//   }, [searchText, lands])

//   const handleLandPress = (land) => {
//     console.log("Card tapped:", land.id)
//   }

//   // Enhanced modal opening with animation
//   const handleShowLand = (land) => {
//     setSelectedLand(land)
//     setShowModalVisible(true)
//     Animated.spring(modalAnim, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 100,
//       friction: 8,
//     }).start()
//   }

//   // Enhanced modal closing with animation
//   const handleCloseModal = () => {
//     Animated.timing(modalAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setShowModalVisible(false)
//       setSelectedLand(null)
//     })
//   }

//   const handleAddLand = () => {
//     navigation.navigate("Add_Edit_Land")
//   }

//   const handleDeleteLand = (id) => {
//     Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const jwtToken = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//               },
//             })
//             getAllLands()
//             Alert.alert("Success", "Land deleted successfully")
//           } catch (err) {
//             Alert.alert("Error", err.message || "Failed to delete land")
//           }
//         },
//       },
//     ])
//   }

//   const handleStartProject = (landId) => {
//     navigation.navigate("Flat_Management", { id: landId })
//   }

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A"
//     const date = new Date(dateStr)
//     const day = String(date.getDate()).padStart(2, "0")
//     const month = String(date.getMonth() + 1).padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   const formatArea = (area) => {
//     if (!area) return "N/A"
//     return `${area.toLocaleString()} sq ft`
//   }

//   const getTransactionIcon = (change, status) => {
//     if (change === "CREDIT") {
//       return "arrow-down-circle"
//     } else if (change === "DEBIT") {
//       return "arrow-up-circle"
//     }
//     return "swap-horizontal"
//   }

//   const getTransactionColor = (change) => {
//     if (change === "CREDIT") {
//       return colors.success
//     } else if (change === "DEBIT") {
//       return colors.error
//     }
//     return colors.textSecondary
//   }

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case "UPI":
//         return colors.primary
//       case "CASH":
//         return colors.success
//       case "BANK":
//         return colors.secondary
//       case "CHEQUE":
//         return colors.warning
//       default:
//         return colors.textSecondary
//     }
//   }

//   // Responsive Info Row component
//   const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
//     <View style={[styles.detailRow, isTablet && styles.detailRowTablet]}>
//       <View style={styles.detailIcon}>
//         <Ionicons name={icon} size={getResponsiveFontSize(18)} color={colors.primary} />
//       </View>
//       <Text style={[styles.label, isTablet && styles.labelTablet]}>{label}</Text>
//       <Text style={[styles.value, { color: valueColor }, isTablet && styles.valueTablet]} numberOfLines={2}>
//         {value}
//       </Text>
//     </View>
//   )

//   // Responsive Action Button component
//   const ActionButton = ({ onPress, icon, text, style, textStyle, disabled = false }) => (
//     <TouchableOpacity
//       style={[
//         styles.actionButton,
//         style,
//         disabled && styles.disabledButton,
//         isTablet && styles.actionButtonTablet,
//         isSmallPhone && styles.actionButtonSmall,
//       ]}
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//       accessibilityLabel={text}
//       accessibilityRole="button"
//     >
//       <Ionicons name={icon} size={getResponsiveFontSize(16)} color="#FFFFFF" />
//       <Text style={[styles.actionButtonText, textStyle, isTablet && styles.actionButtonTextTablet]}>{text}</Text>
//     </TouchableOpacity>
//   )

//   // Responsive Amount Card component
//   const AmountCard = ({ title, amount, icon, color }) => (
//     <View style={[styles.amountCard, { borderLeftColor: color }, isTablet && styles.amountCardTablet]}>
//       <View style={styles.amountHeader}>
//         <Ionicons name={icon} size={getResponsiveFontSize(20)} color={color} />
//         <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>{title}</Text>
//       </View>
//       <Text style={[styles.amountValue, { color }, isTablet && styles.amountValueTablet]}>
//         {formatCurrency(amount)}
//       </Text>
//     </View>
//   )

//   // Enhanced Transaction Item with responsive design
//   const TransactionItem = ({ transaction }) => (
//     <View style={[styles.transactionItem, isTablet && styles.transactionItemTablet]}>
//       <View style={styles.transactionLeft}>
//         <View style={[styles.transactionIcon, { backgroundColor: getTransactionColor(transaction.change) + "20" }]}>
//           <Ionicons
//             name={getTransactionIcon(transaction.change, transaction.status)}
//             size={getResponsiveFontSize(20)}
//             color={getTransactionColor(transaction.change)}
//           />
//         </View>
//         <View style={styles.transactionDetails}>
//           <Text style={[styles.transactionNote, isTablet && styles.transactionNoteTablet]}>
//             {transaction.note || "No note"}
//           </Text>
//           <Text style={[styles.transactionDate, isTablet && styles.transactionDateTablet]}>
//             {formatDate(transaction.transactionDate)}
//           </Text>
//           <View style={styles.transactionMeta}>
//             <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + "20" }]}>
//               <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
//                 {transaction.status}
//               </Text>
//             </View>
//             <Text style={[styles.madeByText, isTablet && styles.madeByTextTablet]}>by {transaction.madeBy}</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.transactionRight}>
//         <Text style={[styles.transactionAmount, { color: getTransactionColor(transaction.change) }]}>
//           {transaction.change === "CREDIT" ? "+" : "-"}
//           {formatCurrency(transaction.transactionAmount)}
//         </Text>
//       </View>
//     </View>
//   )

//   // Enhanced Partner Card with responsive design
//   const PartnerCard = ({ partner }) => {
//     const totalTransactions = partner.landTransactions?.length || 0
//     const totalAmount =
//       partner.landTransactions?.reduce((sum, transaction) => {
//         return transaction.change === "CREDIT"
//           ? sum + transaction.transactionAmount
//           : sum - transaction.transactionAmount
//       }, 0) || 0

//     return (
//       <View style={[styles.partnerCard, isTablet && styles.partnerCardTablet]}>
//         <View style={styles.partnerHeader}>
//           <View style={styles.partnerInfo}>
//             <View style={[styles.partnerAvatar, isTablet && styles.partnerAvatarTablet]}>
//               <Text style={[styles.partnerInitial, isTablet && styles.partnerInitialTablet]}>
//                 {partner.name?.charAt(0)?.toUpperCase()}
//               </Text>
//             </View>
//             <View style={styles.partnerDetails}>
//               <Text style={[styles.partnerName, isTablet && styles.partnerNameTablet]}>{partner.name}</Text>
//               <Text style={[styles.partnerLocation, isTablet && styles.partnerLocationTablet]}>
//                 <Ionicons name="location-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
//                 {partner.city}
//               </Text>
//               <Text style={[styles.partnerPhone, isTablet && styles.partnerPhoneTablet]}>
//                 <Ionicons name="call-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
//                 {partner.phoneNumber}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.partnerStats}>
//             <Text style={[styles.partnerStatsNumber, isTablet && styles.partnerStatsNumberTablet]}>
//               {totalTransactions}
//             </Text>
//             <Text style={[styles.partnerStatsLabel, isTablet && styles.partnerStatsLabelTablet]}>Transactions</Text>
//             <Text
//               style={[
//                 styles.partnerStatsAmount,
//                 { color: totalAmount >= 0 ? colors.success : colors.error },
//                 isTablet && styles.partnerStatsAmountTablet,
//               ]}
//             >
//               {formatCurrency(Math.abs(totalAmount))}
//             </Text>
//           </View>
//         </View>
//         <View style={[styles.partnerActions, isTablet && styles.partnerActionsTablet]}>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.viewButton, isTablet && styles.partnerButtonTablet]}
//             onPress={() => {
//               handleCloseModal()
//               navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//             }}
//             accessibilityLabel="View All Transactions"
//             accessibilityRole="button"
//           >
//             <Ionicons name="eye-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
//             <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>View All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.payButton, isTablet && styles.partnerButtonTablet]}
//             onPress={() => {
//               handleCloseModal()
//               navigation.navigate("Pay_Partner", { partnerId: partner.id })
//             }}
//             accessibilityLabel="Pay Partner"
//             accessibilityRole="button"
//           >
//             <Ionicons name="card-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
//             <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>Pay</Text>
//           </TouchableOpacity>
//         </View>
//         {partner.landTransactions && partner.landTransactions.length > 0 && (
//           <View style={styles.recentTransactions}>
//             <Text style={[styles.recentTransactionsTitle, isTablet && styles.recentTransactionsTitleTablet]}>
//               Recent Transactions
//             </Text>
//             {partner.landTransactions.slice(0, 3).map((transaction, index) => (
//               <TransactionItem key={transaction.id || index} transaction={transaction} />
//             ))}
//             {partner.landTransactions.length > 3 && (
//               <TouchableOpacity
//                 style={styles.viewMoreButton}
//                 onPress={() => {
//                   handleCloseModal()
//                   navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//                 }}
//                 accessibilityLabel="View More Transactions"
//                 accessibilityRole="button"
//               >
//                 <Text style={[styles.viewMoreText, isTablet && styles.viewMoreTextTablet]}>
//                   View {partner.landTransactions.length - 3} more transactions
//                 </Text>
//                 <Ionicons name="chevron-forward" size={getResponsiveFontSize(16)} color={colors.primary} />
//               </TouchableOpacity>
//             )}
//           </View>
//         )}
//         {partner.landTransactions && partner.landTransactions.length === 0 && (
//           <View style={styles.noTransactions}>
//             <Ionicons name="receipt-outline" size={getResponsiveFontSize(32)} color={colors.textSecondary} />
//             <Text style={[styles.noTransactionsText, isTablet && styles.noTransactionsTextTablet]}>
//               No transactions yet
//             </Text>
//           </View>
//         )}
//       </View>
//     )
//   }

//   const renderLandCard = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.card,
//         isTablet && styles.cardTablet,
//         isLargeTablet && styles.cardLargeTablet,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity onPress={() => handleLandPress(item)} activeOpacity={0.95}>
//         <View style={styles.cardHeader}>
//           <View style={styles.landTitleContainer}>
//             <Text style={[styles.landName, isTablet && styles.landNameTablet]} numberOfLines={2}>
//               {item.address?.landmark || "Unnamed Land"}
//             </Text>
//             {item.project && (
//               <View
//                 style={[
//                   styles.statusBadge,
//                   item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.statusText,
//                     item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
//                   ]}
//                 >
//                   {item.project.status?.replace("_", " ") || "UNKNOWN"}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {item.project && (
//             <Text style={[styles.projectName, isTablet && styles.projectNameTablet]}>Project: {item.project.name}</Text>
//           )}
//         </View>
//         <View style={[styles.amountContainer, isTablet && styles.amountContainerTablet]}>
//           <AmountCard title="Total Amount" amount={item.totalAmount} icon="cash-outline" color={colors.success} />
//           <AmountCard
//             title="Agreement"
//             amount={item.agreementAmount}
//             icon="document-text-outline"
//             color={colors.primary}
//           />
//         </View>
//         <View style={[styles.amountContainer, isTablet && styles.amountContainerTablet]}>
//           <AmountCard title="Token Amount" amount={item.tokenAmount} icon="card-outline" color={colors.warning} />
//           <View style={[styles.amountCard, { borderLeftColor: colors.secondary }, isTablet && styles.amountCardTablet]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="resize-outline" size={getResponsiveFontSize(20)} color={colors.secondary} />
//               <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Area</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.secondary }, isTablet && styles.amountValueTablet]}>
//               {formatArea(item.area)}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.locationSection}>
//           <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Location Details</Text>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
//           />
//           <InfoRow icon="map-outline" label="Muza/Village" value={`${item.address?.muza || "N/A"}`} />
//           <InfoRow
//             icon="home-outline"
//             label="Plot Details"
//             value={`Kh.No: ${item.address?.khno || "N/A"}, Ph.No: ${item.address?.phno || "N/A"}, Plot: ${item.address?.plotno || "N/A"}`}
//           />
//           <InfoRow
//             icon="mail-outline"
//             label="Pincode"
//             value={`${item.address?.pincode || "N/A"}, ${item.address?.state || "N/A"}`}
//           />
//         </View>
//         <View style={styles.peopleSection}>
//           <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Stakeholders</Text>
//           <InfoRow
//             icon="person-outline"
//             label="Owner"
//             value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Purchaser"
//             value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow icon="calendar-outline" label="Added Date" value={formatDate(item.landAddOnDate)} />
//         </View>
//         {item.project && (
//           <View style={styles.projectSection}>
//             <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>Project Information</Text>
//             <InfoRow icon="business-outline" label="Project Name" value={item.project.name} />
//             <InfoRow icon="home-outline" label="Total Flats" value={`${item.project.totalflat || "N/A"} units`} />
//             <InfoRow
//               icon="resize-outline"
//               label="Building Size"
//               value={`${item.project.buildingSize || "N/A"} sq ft`}
//             />
//           </View>
//         )}
//         <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
//           <ActionButton
//             onPress={() => handleShowLand(item)}
//             icon="eye-outline"
//             text="Details"
//             style={styles.showButton}
//           />
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
//             icon="create-outline"
//             text="Edit"
//             style={styles.editButton}
//           />
//           <ActionButton
//             onPress={() => handleDeleteLand(item.id)}
//             icon="trash-outline"
//             text="Delete"
//             style={styles.deleteButton}
//           />
//         </View>
//         <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
//           <ActionButton
//             onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
//             icon="person-add-outline"
//             text="Add Partner"
//             style={styles.addPartnerButton}
//           />
//           <ActionButton
//             onPress={item.project ? undefined : () => handleStartProject(item.id)}
//             icon="play-outline"
//             text="Start Project"
//             style={item.project ? styles.disabledButton : styles.startButton}
//             disabled={!!item.project}
//           />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   )

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color={colors.primary} />
//           <Text style={[styles.loadingText, isTablet && styles.loadingTextTablet]}>Loading lands...</Text>
//         </View>
//       )
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="alert-circle-outline" size={getResponsiveFontSize(60)} color={colors.error} />
//           <Text style={[styles.errorText, isTablet && styles.errorTextTablet]}>Oops! Something went wrong</Text>
//           <Text style={[styles.errorSubText, isTablet && styles.errorSubTextTablet]}>{error}</Text>
//           <TouchableOpacity style={[styles.retryButton, isTablet && styles.retryButtonTablet]} onPress={getAllLands}>
//             <Text style={[styles.retryButtonText, isTablet && styles.retryButtonTextTablet]}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }

//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={[styles.listContent, isTablet && styles.listContentTablet]}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             tintColor={colors.primary}
//           />
//         }
//         numColumns={isLargeTablet ? 2 : 1}
//         columnWrapperStyle={isLargeTablet ? styles.columnWrapper : null}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="home-outline" size={getResponsiveFontSize(80)} color={colors.textSecondary} />
//             <Text style={[styles.emptyTitle, isTablet && styles.emptyTitleTablet]}>No lands found</Text>
//             <Text style={[styles.emptySubtitle, isTablet && styles.emptySubtitleTablet]}>
//               Tap the '+' button to add your first land property
//             </Text>
//           </View>
//         }
//       />
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.header, isTablet && styles.headerTablet]}>
//         <View>
//           <Text style={[styles.title, isTablet && styles.titleTablet]}>Land Management</Text>
//           <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
//             {filteredLands.length} properties • Total Value:{" "}
//             {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={[styles.addButton, isTablet && styles.addButtonTablet]}
//           onPress={handleAddLand}
//           activeOpacity={0.8}
//           accessibilityLabel="Add Land"
//           accessibilityRole="button"
//         >
//           <Ionicons name="add" size={getResponsiveFontSize(24)} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <View style={[styles.searchContainer, isTablet && styles.searchContainerTablet]}>
//         <Ionicons
//           name="search-outline"
//           size={getResponsiveFontSize(20)}
//           color={colors.textSecondary}
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={[styles.searchInput, isTablet && styles.searchInputTablet]}
//           placeholder="Search by location, owner, project..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchText}
//           onChangeText={setSearchText}
//           accessibilityLabel="Search input"
//           accessibilityRole="search"
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity
//             onPress={() => setSearchText("")}
//             style={styles.clearButton}
//             accessibilityLabel="Clear search"
//             accessibilityRole="button"
//           >
//             <Ionicons name="close-circle" size={getResponsiveFontSize(20)} color={colors.textSecondary} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {renderContent()}

//       {/* Enhanced Responsive Modal */}
//       <Modal
//         animationType="none"
//         transparent={true}
//         visible={showModalVisible}
//         onRequestClose={handleCloseModal}
//         accessibilityLabel="Land Details Modal"
//         statusBarTranslucent={Platform.OS === "android"}
//       >
//         <Animated.View
//           style={[
//             styles.modalOverlay,
//             {
//               opacity: modalAnim,
//             },
//           ]}
//         >
//           <Animated.View
//             style={[
//               styles.modalContent,
//               {
//                 width: modalDimensions.width,
//                 maxHeight: modalDimensions.maxHeight,
//                 borderTopLeftRadius: modalDimensions.borderRadius,
//                 borderTopRightRadius: modalDimensions.borderRadius,
//                 padding: modalDimensions.padding,
//                 transform: [
//                   {
//                     translateY: modalAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [SCREEN_HEIGHT, 0],
//                     }),
//                   },
//                 ],
//               },
//               isTablet && styles.modalContentTablet,
//               isLargeTablet && styles.modalContentLargeTablet,
//             ]}
//           >
//             <View style={[styles.modalHeader, isTablet && styles.modalHeaderTablet]}>
//               <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>Land Details</Text>
//               <TouchableOpacity
//                 style={[styles.closeButton, isTablet && styles.closeButtonTablet]}
//                 onPress={handleCloseModal}
//                 accessibilityLabel="Close Modal"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="close" size={getResponsiveFontSize(24)} color={colors.textPrimary} />
//               </TouchableOpacity>
//             </View>
//             <ScrollView
//               style={[styles.modalScrollView, isTablet && styles.modalScrollViewTablet]}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={[styles.modalScrollContent, isTablet && styles.modalScrollContentTablet]}
//             >
//               {selectedLand && (
//                 <>
//                   {/* Property Summary */}
//                   <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
//                     <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
//                       Property Summary
//                     </Text>
//                     <Text style={[styles.modalLandName, isTablet && styles.modalLandNameTablet]}>
//                       {selectedLand.address?.landmark || "Unnamed Land"}
//                     </Text>
//                     <Text style={[styles.modalLocation, isTablet && styles.modalLocationTablet]}>
//                       {selectedLand.address?.city || "N/A"}, {selectedLand.address?.state || "N/A"}
//                     </Text>
//                   </View>

//                   {/* Financial Overview */}
//                   <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
//                     <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
//                       Financial Overview
//                     </Text>
//                     <View style={[styles.modalAmountGrid, isTablet && styles.modalAmountGridTablet]}>
//                       <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
//                         <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>
//                           Total Amount
//                         </Text>
//                         <Text
//                           style={[
//                             styles.modalAmountValue,
//                             { color: colors.success },
//                             isTablet && styles.modalAmountValueTablet,
//                           ]}
//                         >
//                           {formatCurrency(selectedLand.totalAmount)}
//                         </Text>
//                       </View>
//                       <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
//                         <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>
//                           Agreement
//                         </Text>
//                         <Text
//                           style={[
//                             styles.modalAmountValue,
//                             { color: colors.primary },
//                             isTablet && styles.modalAmountValueTablet,
//                           ]}
//                         >
//                           {formatCurrency(selectedLand.agreementAmount)}
//                         </Text>
//                       </View>
//                       <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
//                         <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>Token</Text>
//                         <Text
//                           style={[
//                             styles.modalAmountValue,
//                             { color: colors.warning },
//                             isTablet && styles.modalAmountValueTablet,
//                           ]}
//                         >
//                           {formatCurrency(selectedLand.tokenAmount)}
//                         </Text>
//                       </View>
//                       <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
//                         <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>Area</Text>
//                         <Text
//                           style={[
//                             styles.modalAmountValue,
//                             { color: colors.secondary },
//                             isTablet && styles.modalAmountValueTablet,
//                           ]}
//                         >
//                           {formatArea(selectedLand.area)}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>

//                   {/* Partners & Transactions Section */}
//                   <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
//                     <View style={[styles.partnersHeader, isTablet && styles.partnersHeaderTablet]}>
//                       <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
//                         Partners & Transactions
//                       </Text>
//                       <TouchableOpacity
//                         style={[styles.addPartnerModalButton, isTablet && styles.addPartnerModalButtonTablet]}
//                         onPress={() => {
//                           handleCloseModal()
//                           navigation.navigate("Add_Edit_Partners", { landId: selectedLand.id })
//                         }}
//                         accessibilityLabel="Add Partner"
//                         accessibilityRole="button"
//                       >
//                         <Ionicons name="person-add" size={getResponsiveFontSize(16)} color="#FFFFFF" />
//                         <Text
//                           style={[styles.addPartnerModalButtonText, isTablet && styles.addPartnerModalButtonTextTablet]}
//                         >
//                           Add Partner
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                     {selectedLand?.partners?.length > 0 ? (
//                       selectedLand.partners.map((partner, index) => (
//                         <PartnerCard key={partner.id || index} partner={partner} />
//                       ))
//                     ) : (
//                       <View style={[styles.noPartnersContainer, isTablet && styles.noPartnersContainerTablet]}>
//                         <Ionicons name="people-outline" size={getResponsiveFontSize(48)} color={colors.textSecondary} />
//                         <Text style={[styles.noPartnersText, isTablet && styles.noPartnersTextTablet]}>
//                           No partners added yet
//                         </Text>
//                         <Text style={[styles.noPartnersSubtext, isTablet && styles.noPartnersSubtextTablet]}>
//                           Add partners to start collaboration and track transactions
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </>
//               )}
//             </ScrollView>
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </View>
//   )
// }

// const colors = {
//   primary: "#007AFF",
//   secondary: "#5856D6",
//   success: "#34C759",
//   warning: "#FF9500",
//   error: "#FF3B30",
//   background: "#F2F2F7",
//   surface: "#FFFFFF",
//   textPrimary: "#000000",
//   textSecondary: "#8E8E93",
//   border: "#C6C6C8",
//   shadow: "#000000",
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   // Header Styles
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: getResponsiveWidth(5),
//     paddingTop: getResponsiveHeight(6),
//     paddingBottom: getResponsiveHeight(2),
//     backgroundColor: colors.surface,
//     borderBottomLeftRadius: getResponsiveWidth(6),
//     borderBottomRightRadius: getResponsiveWidth(6),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   headerTablet: {
//     paddingHorizontal: getResponsiveWidth(8),
//     paddingTop: getResponsiveHeight(4),
//     paddingBottom: getResponsiveHeight(3),
//   },
//   title: {
//     fontSize: getResponsiveFontSize(32),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: -0.5,
//   },
//   titleTablet: {
//     fontSize: getResponsiveFontSize(36),
//   },
//   subtitle: {
//     fontSize: getResponsiveFontSize(13),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(0.5),
//     fontWeight: "500",
//   },
//   subtitleTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     width: getResponsiveWidth(12),
//     height: getResponsiveWidth(12),
//     borderRadius: getResponsiveWidth(6),
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   addButtonTablet: {
//     width: getResponsiveWidth(10),
//     height: getResponsiveWidth(10),
//     borderRadius: getResponsiveWidth(5),
//   },

//   // Search Styles
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.surface,
//     borderRadius: getResponsiveWidth(4),
//     marginHorizontal: getResponsiveWidth(5),
//     marginVertical: getResponsiveHeight(2),
//     paddingHorizontal: getResponsiveWidth(4),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   searchContainerTablet: {
//     marginHorizontal: getResponsiveWidth(8),
//     paddingHorizontal: getResponsiveWidth(6),
//   },
//   searchIcon: {
//     marginRight: getResponsiveWidth(3),
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: getResponsiveFontSize(16),
//     color: colors.textPrimary,
//     paddingVertical: getResponsiveHeight(1.8),
//   },
//   searchInputTablet: {
//     fontSize: getResponsiveFontSize(18),
//     paddingVertical: getResponsiveHeight(2.2),
//   },
//   clearButton: {
//     padding: getResponsiveWidth(1),
//   },

//   // List Styles
//   listContent: {
//     paddingHorizontal: getResponsiveWidth(5),
//     paddingBottom: getResponsiveHeight(10),
//   },
//   listContentTablet: {
//     paddingHorizontal: getResponsiveWidth(8),
//   },
//   columnWrapper: {
//     justifyContent: "space-between",
//     paddingHorizontal: getResponsiveWidth(2),
//   },

//   // Card Styles
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: getResponsiveWidth(5),
//     marginBottom: getResponsiveHeight(2.5),
//     padding: getResponsiveWidth(5),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   cardTablet: {
//     padding: getResponsiveWidth(6),
//     marginBottom: getResponsiveHeight(3),
//   },
//   cardLargeTablet: {
//     width: "48%",
//     marginHorizontal: "1%",
//   },
//   cardHeader: {
//     marginBottom: getResponsiveHeight(2),
//   },
//   landTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: getResponsiveHeight(1),
//   },
//   landName: {
//     fontSize: getResponsiveFontSize(22),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     flex: 1,
//     marginRight: getResponsiveWidth(3),
//     lineHeight: getResponsiveFontSize(26),
//   },
//   landNameTablet: {
//     fontSize: getResponsiveFontSize(26),
//     lineHeight: getResponsiveFontSize(30),
//   },
//   projectName: {
//     fontSize: getResponsiveFontSize(15),
//     color: colors.textSecondary,
//     fontWeight: "500",
//     fontStyle: "italic",
//   },
//   projectNameTablet: {
//     fontSize: getResponsiveFontSize(17),
//   },
//   statusBadge: {
//     paddingHorizontal: getResponsiveWidth(3),
//     paddingVertical: getResponsiveHeight(0.8),
//     borderRadius: getResponsiveWidth(4),
//   },
//   statusText: {
//     fontSize: getResponsiveFontSize(12),
//     fontWeight: "600",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//   },
//   inProgress: {
//     backgroundColor: "#FFF5E1",
//   },
//   inProgressText: {
//     color: "#FF9500",
//   },
//   completed: {
//     backgroundColor: "#E6F4EA",
//   },
//   completedText: {
//     color: "#34C759",
//   },

//   // Amount Card Styles
//   amountContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: getResponsiveHeight(1.5),
//     gap: getResponsiveWidth(2),
//   },
//   amountContainerTablet: {
//     gap: getResponsiveWidth(3),
//   },
//   amountCard: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     borderRadius: getResponsiveWidth(3),
//     padding: getResponsiveWidth(3),
//     borderLeftWidth: 4,
//   },
//   amountCardTablet: {
//     padding: getResponsiveWidth(4),
//     borderRadius: getResponsiveWidth(4),
//   },
//   amountHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: getResponsiveHeight(0.5),
//   },
//   amountTitle: {
//     fontSize: getResponsiveFontSize(13),
//     color: colors.textSecondary,
//     marginLeft: getResponsiveWidth(2),
//     fontWeight: "500",
//   },
//   amountTitleTablet: {
//     fontSize: getResponsiveFontSize(15),
//   },
//   amountValue: {
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "700",
//   },
//   amountValueTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },

//   // Section Styles
//   locationSection: {
//     marginTop: getResponsiveHeight(2),
//     paddingTop: getResponsiveHeight(2),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   peopleSection: {
//     marginTop: getResponsiveHeight(2),
//     paddingTop: getResponsiveHeight(2),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   projectSection: {
//     marginTop: getResponsiveHeight(2),
//     paddingTop: getResponsiveHeight(2),
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//   },
//   sectionTitle: {
//     fontSize: getResponsiveFontSize(17),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(1),
//   },
//   sectionTitleTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },

//   // Detail Row Styles
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: getResponsiveHeight(1.2),
//   },
//   detailRowTablet: {
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   detailIcon: {
//     marginRight: getResponsiveWidth(3),
//     width: getResponsiveWidth(6),
//     alignItems: "center",
//   },
//   label: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     flex: 0.35,
//     fontWeight: "500",
//   },
//   labelTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   value: {
//     fontSize: getResponsiveFontSize(14),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     flex: 0.65,
//     textAlign: "right",
//   },
//   valueTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },

//   // Action Button Styles
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: getResponsiveHeight(2),
//     gap: getResponsiveWidth(2),
//   },
//   actionRowTablet: {
//     gap: getResponsiveWidth(3),
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(1.2),
//     paddingHorizontal: getResponsiveWidth(3),
//     borderRadius: getResponsiveWidth(3),
//     flex: 1,
//     justifyContent: "center",
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   actionButtonTablet: {
//     paddingVertical: getResponsiveHeight(1.5),
//     paddingHorizontal: getResponsiveWidth(4),
//   },
//   actionButtonSmall: {
//     paddingVertical: getResponsiveHeight(1),
//     paddingHorizontal: getResponsiveWidth(2),
//   },
//   showButton: {
//     backgroundColor: colors.primary,
//   },
//   editButton: {
//     backgroundColor: colors.warning,
//   },
//   deleteButton: {
//     backgroundColor: colors.error,
//   },
//   addPartnerButton: {
//     backgroundColor: colors.success,
//   },
//   startButton: {
//     backgroundColor: colors.secondary,
//   },
//   disabledButton: {
//     backgroundColor: "#A0A0A0",
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(13),
//     fontWeight: "600",
//     marginLeft: getResponsiveWidth(1.5),
//   },
//   actionButtonTextTablet: {
//     fontSize: getResponsiveFontSize(15),
//   },

//   // Loading and Error Styles
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: getResponsiveWidth(5),
//   },
//   loadingText: {
//     marginTop: getResponsiveHeight(2),
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   loadingTextTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   errorText: {
//     fontSize: getResponsiveFontSize(20),
//     color: colors.error,
//     textAlign: "center",
//     marginTop: getResponsiveHeight(2),
//     fontWeight: "600",
//   },
//   errorTextTablet: {
//     fontSize: getResponsiveFontSize(24),
//   },
//   errorSubText: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     textAlign: "center",
//     marginTop: getResponsiveHeight(1),
//     marginHorizontal: getResponsiveWidth(5),
//   },
//   errorSubTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   retryButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: getResponsiveHeight(1.5),
//     paddingHorizontal: getResponsiveWidth(8),
//     borderRadius: getResponsiveWidth(6),
//     marginTop: getResponsiveHeight(3),
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   retryButtonTablet: {
//     paddingVertical: getResponsiveHeight(2),
//     paddingHorizontal: getResponsiveWidth(10),
//   },
//   retryButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "600",
//   },
//   retryButtonTextTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },

//   // Empty State Styles
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(10),
//     paddingHorizontal: getResponsiveWidth(10),
//   },
//   emptyTitle: {
//     fontSize: getResponsiveFontSize(22),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginTop: getResponsiveHeight(2),
//     textAlign: "center",
//   },
//   emptyTitleTablet: {
//     fontSize: getResponsiveFontSize(26),
//   },
//   emptySubtitle: {
//     fontSize: getResponsiveFontSize(16),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(1),
//     textAlign: "center",
//     lineHeight: getResponsiveFontSize(22),
//   },
//   emptySubtitleTablet: {
//     fontSize: getResponsiveFontSize(18),
//     lineHeight: getResponsiveFontSize(24),
//   },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: isTablet || isLargeTablet ? "center" : "flex-end",
//     alignItems: isTablet || isLargeTablet ? "center" : "stretch",
//   },
//   modalContent: {
//     backgroundColor: colors.surface,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 20,
//     elevation: 25,
//   },
//   modalContentTablet: {
//     borderRadius: getResponsiveWidth(4),
//     margin: getResponsiveWidth(4),
//   },
//   modalContentLargeTablet: {
//     borderRadius: getResponsiveWidth(3),
//     margin: getResponsiveWidth(6),
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: getResponsiveHeight(2),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//     marginBottom: getResponsiveHeight(2),
//   },
//   modalHeaderTablet: {
//     paddingBottom: getResponsiveHeight(2.5),
//     marginBottom: getResponsiveHeight(2.5),
//   },
//   modalTitle: {
//     fontSize: getResponsiveFontSize(22),
//     fontWeight: "700",
//     color: colors.textPrimary,
//   },
//   modalTitleTablet: {
//     fontSize: getResponsiveFontSize(26),
//   },
//   closeButton: {
//     padding: getResponsiveWidth(2),
//     borderRadius: getResponsiveWidth(4),
//     backgroundColor: "#F3F4F6",
//   },
//   closeButtonTablet: {
//     padding: getResponsiveWidth(2.5),
//   },
//   modalScrollView: {
//     flex: 1,
//   },
//   modalScrollViewTablet: {
//     maxHeight: isTablet ? SCREEN_HEIGHT * 0.6 : SCREEN_HEIGHT * 0.7,
//   },
//   modalScrollContent: {
//     paddingBottom: getResponsiveHeight(2),
//   },
//   modalScrollContentTablet: {
//     paddingBottom: getResponsiveHeight(3),
//   },

//   // Modal Section Styles
//   modalSection: {
//     marginBottom: getResponsiveHeight(3),
//   },
//   modalSectionTablet: {
//     marginBottom: getResponsiveHeight(4),
//   },
//   modalSectionTitle: {
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   modalSectionTitleTablet: {
//     fontSize: getResponsiveFontSize(22),
//     marginBottom: getResponsiveHeight(2),
//   },
//   modalLandName: {
//     fontSize: getResponsiveFontSize(24),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(0.5),
//   },
//   modalLandNameTablet: {
//     fontSize: getResponsiveFontSize(28),
//   },
//   modalLocation: {
//     fontSize: getResponsiveFontSize(16),
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   modalLocationTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },

//   // Modal Amount Grid Styles
//   modalAmountGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: getResponsiveWidth(3),
//   },
//   modalAmountGridTablet: {
//     gap: getResponsiveWidth(4),
//   },
//   modalAmountItem: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: getResponsiveWidth(3),
//     padding: getResponsiveWidth(4),
//     width: "47%",
//     alignItems: "center",
//   },
//   modalAmountItemTablet: {
//     padding: getResponsiveWidth(5),
//     borderRadius: getResponsiveWidth(4),
//     width: "48%",
//   },
//   modalAmountLabel: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.5),
//     fontWeight: "500",
//   },
//   modalAmountLabelTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   modalAmountValue: {
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "700",
//   },
//   modalAmountValueTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },

//   // Partner Styles
//   partnersHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: getResponsiveHeight(2),
//   },
//   partnersHeaderTablet: {
//     marginBottom: getResponsiveHeight(2.5),
//   },
//   partnerCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: getResponsiveWidth(4),
//     padding: getResponsiveWidth(4),
//     marginBottom: getResponsiveHeight(2),
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   partnerCardTablet: {
//     padding: getResponsiveWidth(5),
//     borderRadius: getResponsiveWidth(5),
//   },
//   partnerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   partnerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   partnerAvatar: {
//     width: getResponsiveWidth(12),
//     height: getResponsiveWidth(12),
//     borderRadius: getResponsiveWidth(6),
//     backgroundColor: colors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   partnerAvatarTablet: {
//     width: getResponsiveWidth(10),
//     height: getResponsiveWidth(10),
//     borderRadius: getResponsiveWidth(5),
//   },
//   partnerInitial: {
//     fontSize: getResponsiveFontSize(20),
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   partnerInitialTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },
//   partnerDetails: {
//     marginLeft: getResponsiveWidth(3),
//     flex: 1,
//   },
//   partnerName: {
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(0.3),
//   },
//   partnerNameTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   partnerLocation: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.2),
//   },
//   partnerLocationTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   partnerPhone: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//   },
//   partnerPhoneTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   partnerStats: {
//     alignItems: "flex-end",
//   },
//   partnerStatsNumber: {
//     fontSize: getResponsiveFontSize(20),
//     fontWeight: "700",
//     color: colors.primary,
//   },
//   partnerStatsNumberTablet: {
//     fontSize: getResponsiveFontSize(22),
//   },
//   partnerStatsLabel: {
//     fontSize: getResponsiveFontSize(12),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.5),
//   },
//   partnerStatsLabelTablet: {
//     fontSize: getResponsiveFontSize(14),
//   },
//   partnerStatsAmount: {
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "600",
//   },
//   partnerStatsAmountTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },
//   partnerActions: {
//     flexDirection: "row",
//     gap: getResponsiveWidth(2),
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   partnerActionsTablet: {
//     gap: getResponsiveWidth(3),
//   },
//   partnerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(1),
//     paddingHorizontal: getResponsiveWidth(4),
//     borderRadius: getResponsiveWidth(2),
//     flex: 1,
//     justifyContent: "center",
//   },
//   partnerButtonTablet: {
//     paddingVertical: getResponsiveHeight(1.2),
//     paddingHorizontal: getResponsiveWidth(5),
//   },
//   viewButton: {
//     backgroundColor: colors.primary,
//   },
//   payButton: {
//     backgroundColor: colors.success,
//   },
//   partnerButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(14),
//     fontWeight: "600",
//     marginLeft: getResponsiveWidth(1),
//   },
//   partnerButtonTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },

//   // Transaction Styles
//   recentTransactions: {
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//     paddingTop: getResponsiveHeight(1.5),
//   },
//   recentTransactionsTitle: {
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(1),
//   },
//   recentTransactionsTitleTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },
//   transactionItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(1),
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   transactionItemTablet: {
//     paddingVertical: getResponsiveHeight(1.2),
//   },
//   transactionLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   transactionIcon: {
//     width: getResponsiveWidth(8),
//     height: getResponsiveWidth(8),
//     borderRadius: getResponsiveWidth(4),
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: getResponsiveWidth(3),
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionNote: {
//     fontSize: getResponsiveFontSize(15),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(0.2),
//   },
//   transactionNoteTablet: {
//     fontSize: getResponsiveFontSize(17),
//   },
//   transactionDate: {
//     fontSize: getResponsiveFontSize(13),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.3),
//   },
//   transactionDateTablet: {
//     fontSize: getResponsiveFontSize(15),
//   },
//   transactionMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: getResponsiveWidth(2),
//   },
//   madeByText: {
//     fontSize: getResponsiveFontSize(12),
//     color: colors.textSecondary,
//     fontStyle: "italic",
//   },
//   madeByTextTablet: {
//     fontSize: getResponsiveFontSize(14),
//   },
//   transactionRight: {
//     alignItems: "flex-end",
//   },
//   transactionAmount: {
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "700",
//   },
//   viewMoreButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: getResponsiveHeight(1),
//     marginTop: getResponsiveHeight(0.5),
//   },
//   viewMoreText: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.primary,
//     fontWeight: "500",
//     marginRight: getResponsiveWidth(1),
//   },
//   viewMoreTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   noTransactions: {
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(2),
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//   },
//   noTransactionsText: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(1),
//   },
//   noTransactionsTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   noPartnersContainer: {
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(4),
//   },
//   noPartnersContainerTablet: {
//     paddingVertical: getResponsiveHeight(5),
//   },
//   noPartnersText: {
//     fontSize: getResponsiveFontSize(17),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginTop: getResponsiveHeight(1.5),
//     textAlign: "center",
//   },
//   noPartnersTextTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   noPartnersSubtext: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(0.5),
//     textAlign: "center",
//     lineHeight: getResponsiveFontSize(18),
//   },
//   noPartnersSubtextTablet: {
//     fontSize: getResponsiveFontSize(16),
//     lineHeight: getResponsiveFontSize(20),
//   },
//   addPartnerModalButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.success,
//     paddingVertical: getResponsiveHeight(1),
//     paddingHorizontal: getResponsiveWidth(4),
//     borderRadius: getResponsiveWidth(4),
//   },
//   addPartnerModalButtonTablet: {
//     paddingVertical: getResponsiveHeight(1.2),
//     paddingHorizontal: getResponsiveWidth(5),
//   },
//   addPartnerModalButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(14),
//     fontWeight: "600",
//     marginLeft: getResponsiveWidth(1),
//   },
//   addPartnerModalButtonTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
// })

// export default Land_Management
