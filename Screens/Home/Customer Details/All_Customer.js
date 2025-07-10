// // import React from 'react'
// // import { Text, View } from 'react-native'
// // import { BASE_URL } from '@/Api/BASE_URL.js'; // Ensure this path is correct
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';

// // const All_Customer = () => {
// //   return (
// //     <View>
// //       <Text>All_Customer</Text>
// //     </View>
// //   )
// // }

// // export default All_Customer





// // import { BASE_URL } from '@/Api/BASE_URL.js'; // Ensure this path is correct
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useRoute } from '@react-navigation/native';
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import {
// //     ActivityIndicator,
// //     Alert,
// //     Dimensions,
// //     FlatList,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View,
// // } from 'react-native';
// // import { RFPercentage } from 'react-native-responsive-fontsize';

// // const { width } = Dimensions.get('window');

// // const All_Customer = ({ navigation }) => {
// //   const route = useRoute();
// //   const { id, name } = route.params || {}; // Get id and name from navigation params
// //   const [residencies, setResidencies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchResidencies = async () => {
// //       try {
// //         if (!id) {
// //           setError('No project ID provided');
// //           setLoading(false);
// //           return;
// //         }

// //         const token = await AsyncStorage.getItem('jwtToken');
// //         if (!token) {
// //           setError('No token found');
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await axios.get(`${BASE_URL}/residenciesByProject/${id}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         setResidencies(response.data);
// //         setLoading(false);
// //         console.log( JSON.stringify(response.data, null, 2));
// //       } catch (err) {
// //         setError(err.message || 'Failed to fetch residencies');
// //         setLoading(false);
// //       }
// //     };

// //     fetchResidencies();
// //   }, [id]); // Re-run if id changes

// //   const handleResidencyPress = (residency) => {
// //     Alert.alert('Residency Selected', `You tapped on ${residency.name || 'Unnamed Residency'}`);
// //     // Add navigation or other logic here (e.g., navigate to residency details)
// //   };

// //   const renderResidency = ({ item, index }) => (
// //     <TouchableOpacity
// //       style={styles.card}
// //       onPress={() => navigation.navigate('FlatOwner', { bookingId, customerName })}
// //       activeOpacity={0.8}
// //     >
// //       <Text style={styles.cardTitle}>{item.name || 'Unnamed Residency'}</Text>
// //       <Text style={styles.cardSubtitle}>{item.address || 'No address available'}</Text>
// //     </TouchableOpacity>
// //   );

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#007AFF" />
// //         <Text style={styles.loadingText}>Loading Residencies...</Text>
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.errorText}>Error: {error}</Text>
// //         <TouchableOpacity
// //           style={styles.retryButton}
// //           onPress={() => {
// //             setLoading(true);
// //             setError(null);
// //             fetchResidencies();
// //           }}
// //         >
// //           <Text style={styles.retryButtonText}>Retry</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>
// //         Residencies for {name || 'Project'}
// //       </Text>
// //       <FlatList
// //         data={residencies}
// //         renderItem={renderResidency}
// //         keyExtractor={(item, index) => index.toString()}
// //         contentContainerStyle={styles.listContainer}
// //         ListEmptyComponent={
// //           <Text style={styles.emptyText}>No residencies found</Text>
// //         }
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F5F5F5',
// //     paddingHorizontal: width * 0.05,
// //     paddingTop: 20,
// //   },
// //   title: {
// //     fontSize: RFPercentage(3.5),
// //     fontWeight: '700',
// //     color: '#333',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   listContainer: {
// //     paddingBottom: 20,
// //   },
// //   card: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 12,
// //     padding: 15,
// //     marginVertical: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 5,
// //     width: width * 0.9,
// //     alignSelf: 'center',
// //   },
// //   cardTitle: {
// //     fontSize: RFPercentage(2.2),
// //     fontWeight: '600',
// //     color: '#333',
// //   },
// //   cardSubtitle: {
// //     fontSize: RFPercentage(1.8),
// //     color: '#666',
// //     marginTop: 5,
// //   },
// //   loadingText: {
// //     fontSize: RFPercentage(2),
// //     color: '#333',
// //     marginTop: 10,
// //   },
// //   errorText: {
// //     fontSize: RFPercentage(2),
// //     color: '#D32F2F',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   retryButton: {
// //     backgroundColor: '#007AFF',
// //     borderRadius: 8,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //   },
// //   retryButtonText: {
// //     fontSize: RFPercentage(2),
// //     color: '#FFFFFF',
// //     fontWeight: '600',
// //     textAlign: 'center',
// //   },
// //   emptyText: {
// //     fontSize: RFPercentage(2),
// //     color: '#666',
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// // });

// // export default All_Customer;




// // import { BASE_URL } from '@/Api/BASE_URL.js'; // Ensure this path is correct
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import {
// //     ActivityIndicator,
// //     Dimensions,
// //     FlatList,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View,
// // } from 'react-native';
// // import { RFPercentage } from 'react-native-responsive-fontsize';

// // const { width } = Dimensions.get('window');

// // const All_Customer = () => {
// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const { id, name } = route.params || {}; // Get project id and name from navigation params
// //   const [residencies, setResidencies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchResidencies = async () => {
// //       try {
// //         if (!id) {
// //           setError('No project ID provided');
// //           setLoading(false);
// //           return;
// //         }

// //         const token = await AsyncStorage.getItem('jwtToken');
// //         if (!token) {
// //           setError('No token found');
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await axios.get(`${BASE_URL}/residenciesByProject/${id}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         setResidencies(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message || 'Failed to fetch residencies');
// //         setLoading(false);
// //       }
// //     };

// //     fetchResidencies();
// //   }, [id]);

// //   const renderResidency = ({ item, index }) => (
// //     <TouchableOpacity
// //       style={styles.card}
// //       onPress={() => navigation.navigate('FlatOwner', { bookingId: item.booking.id, customerName: item.name || 'Unnamed Residency' })}
// //       activeOpacity={0.8}
// //     >
// //       <Text style={styles.cardTitle}>{item.name || 'Unnamed Residency'}</Text>
// //       <Text style={styles.cardSubtitle}>{item.floorNumber || 'No address available'}</Text>
// //       <Text style={styles.cardSubtitle}>{item.identifier || 'No address available'}</Text>
// //       <Text style={styles.cardSubtitle}>{item.booking.bookingStatus || 'No status available'}</Text>
// //         <Text style={styles.cardSubtitle}>{item.price|| 'No price available'}</Text>
// //     </TouchableOpacity>
// //   );

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" color="#007AFF" />
// //         <Text style={styles.loadingText}>Loading Residencies...</Text>
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.errorText}>Error: {error}</Text>
// //         <TouchableOpacity
// //           style={styles.retryButton}
// //           onPress={() => {
// //             setLoading(true);
// //             setError(null);
// //             fetchResidencies();
// //           }}
// //         >
// //           <Text style={styles.retryButtonText}>Retry</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>
// //     {name || 'Project'}
// //       </Text>
// //       <FlatList
// //         data={residencies}
// //         renderItem={renderResidency}
// //         keyExtractor={(item, index) => item.id?.toString() || index.toString()}
// //         contentContainerStyle={styles.listContainer}
// //         ListEmptyComponent={
// //           <Text style={styles.emptyText}>No residencies found</Text>
// //         }
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F5F5F5',
// //     paddingHorizontal: width * 0.05,
// //     paddingTop: 20,
// //   },
// //   title: {
// //     fontSize: RFPercentage(3.5),
// //     fontWeight: '700',
// //     color: '#333',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   listContainer: {
// //     paddingBottom: 20,
// //   },
// //   card: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 12,
// //     padding: 15,
// //     marginVertical: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 5,
// //     width: width * 0.9,
// //     alignSelf: 'center',
// //   },
// //   cardTitle: {
// //     fontSize: RFPercentage(2.2),
// //     fontWeight: '600',
// //     color: '#333',
// //   },
// //   cardSubtitle: {
// //     fontSize: RFPercentage(1.8),
// //     color: '#666',
// //     marginTop: 5,
// //   },
// //   loadingText: {
// //     fontSize: RFPercentage(2),
// //     color: '#333',
// //     marginTop: 10,
// //   },
// //   errorText: {
// //     fontSize: RFPercentage(2),
// //     color: '#D32F2F',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   retryButton: {
// //     backgroundColor: '#007AFF',
// //     borderRadius: 8,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //   },
// //   retryButtonText: {
// //     fontSize: RFPercentage(2),
// //     color: '#FFFFFF',
// //     fontWeight: '600',
// //     textAlign: 'center',
// //   },
// //   emptyText: {
// //     fontSize: RFPercentage(2),
// //     color: '#666',
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// // });

// // export default All_Customer;





// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Dimensions,
//     FlatList,
//     Platform,
//     RefreshControl,
//     SafeAreaView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { RFPercentage } from 'react-native-responsive-fontsize';

// const { width, height } = Dimensions.get('window');

// const All_Customer = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { id, name } = route.params || {};
//   const [residencies, setResidencies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchResidencies = useCallback(async () => {
//     try {
//       if (!id) {
//         setError('No project ID provided');
//         setLoading(false);
//         return;
//       }

//       const token = await AsyncStorage.getItem('jwtToken');
//       if (!token) {
//         setError('No token found');
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`${BASE_URL}/residenciesByProject/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setResidencies(response.data);
//       setError(null);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch residencies');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchResidencies();
//   }, [fetchResidencies]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchResidencies();
//   }, [fetchResidencies]);

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'confirmed':
//       case 'active':
//         return '#4CAF50';
//       case 'pending':
//         return '#FF9800';
//       case 'cancelled':
//         return '#F44336';
//       default:
//         return '#9E9E9E';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'confirmed':
//       case 'active':
//         return 'checkmark-circle';
//       case 'pending':
//         return 'time';
//       case 'cancelled':
//         return 'close-circle';
//       default:
//         return 'help-circle';
//     }
//   };

//   const formatPrice = (price) => {
//     if (!price) return 'Price not available';
//     return `$${parseFloat(price).toLocaleString()}`;
//   };

//   const renderResidency = ({ item, index }) => {
//     const status = item.booking?.bookingStatus || 'Unknown';
//     const statusColor = getStatusColor(status);
//     const statusIcon = getStatusIcon(status);

//     return (
//       <TouchableOpacity
//         style={[styles.card, { marginTop: index === 0 ? 0 : 12 }]}
//         onPress={() =>
//           navigation.navigate('FlatOwner', {
//             bookingId: item.booking?.id,
//             customerName: item.name || 'Unnamed Residency',
//           })
//         }
//         activeOpacity={0.7}
//       >
//         <View style={styles.cardHeader}>
//           <View style={styles.cardTitleContainer}>
//             <Text style={styles.cardTitle} numberOfLines={1}>
//               {item.name || 'Unnamed Residency'}
//             </Text>
//             <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
//               <Ionicons name={statusIcon} size={12} color="#FFFFFF" />
//               <Text style={styles.statusText}>{status}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.cardContent}>
//           <View style={styles.infoRow}>
//             <Ionicons name="business" size={16} color="#666" />
//             <Text style={styles.infoText}>
//               Floor: {item.floorNumber || 'Not specified'}
//             </Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Ionicons name="location" size={16} color="#666" />
//             <Text style={styles.infoText}>
//               ID: {item.identifier || 'Not specified'}
//             </Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Ionicons name="cash" size={16} color="#666" />
//             <Text style={[styles.infoText, styles.priceText]}>
//               {formatPrice(item.price)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.cardFooter}>
//           <Ionicons name="chevron-forward" size={20} color="#007AFF" />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <Ionicons name="home-outline" size={80} color="#E0E0E0" />
//       <Text style={styles.emptyTitle}>No Residencies Found</Text>
//       <Text style={styles.emptySubtitle}>
//         There are no residencies available for this project yet.
//       </Text>
//       <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
//         <Ionicons name="refresh" size={20} color="#007AFF" />
//         <Text style={styles.refreshButtonText}>Refresh</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderErrorState = () => (
//     <View style={styles.errorContainer}>
//       <Ionicons name="alert-circle-outline" size={80} color="#F44336" />
//       <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
//       <Text style={styles.errorSubtitle}>{error}</Text>
//       <TouchableOpacity style={styles.retryButton} onPress={fetchResidencies}>
//         <Ionicons name="refresh" size={20} color="#FFFFFF" />
//         <Text style={styles.retryButtonText}>Try Again</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderLoadingState = () => (
//     <View style={styles.loadingContainer}>
//       <ActivityIndicator size="large" color="#007AFF" />
//       <Text style={styles.loadingText}>Loading Residencies...</Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//         {renderLoadingState()}
//       </SafeAreaView>
//     );
//   }

//   if (error && !refreshing) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//         {renderErrorState()}
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle} numberOfLines={1}>
//             {name || 'Project Residencies'}
//           </Text>
//           <Text style={styles.headerSubtitle}>
//             {residencies.length} {residencies.length === 1 ? 'Residency' : 'Residencies'}
//           </Text>
//         </View>
//       </View>

//       <FlatList
//         data={residencies}
//         renderItem={renderResidency}
//         keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//         contentContainerStyle={[
//           styles.listContainer,
//           residencies.length === 0 && styles.emptyListContainer,
//         ]}
//         ListEmptyComponent={renderEmptyState}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={['#007AFF']}
//             tintColor="#007AFF"
//           />
//         }
//         showsVerticalScrollIndicator={false}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.05,
//     paddingVertical: 16,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   backButton: {
//     padding: 8,
//     marginRight: 12,
//   },
//   headerTitleContainer: {
//     flex: 1,
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2.8),
//     fontWeight: '700',
//     color: '#333',
//   },
//   headerSubtitle: {
//     fontSize: RFPercentage(1.8),
//     color: '#666',
//     marginTop: 2,
//   },
//   listContainer: {
//     paddingHorizontal: width * 0.05,
//     paddingVertical: 16,
//   },
//   emptyListContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 12,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   cardHeader: {
//     marginBottom: 12,
//   },
//   cardTitleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   cardTitle: {
//     fontSize: RFPercentage(2.4),
//     fontWeight: '600',
//     color: '#333',
//     flex: 1,
//     marginRight: 12,
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontSize: RFPercentage(1.4),
//     color: '#FFFFFF',
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   cardContent: {
//     marginBottom: 12,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   infoText: {
//     fontSize: RFPercentage(1.9),
//     color: '#666',
//     marginLeft: 8,
//     flex: 1,
//   },
//   priceText: {
//     fontWeight: '600',
//     color: '#333',
//   },
//   cardFooter: {
//     alignItems: 'flex-end',
//   },
//   separator: {
//     height: 12,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.1,
//   },
//   loadingText: {
//     fontSize: RFPercentage(2.2),
//     color: '#666',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.1,
//   },
//   errorTitle: {
//     fontSize: RFPercentage(2.8),
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   errorSubtitle: {
//     fontSize: RFPercentage(2),
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 8,
//     lineHeight: 24,
//   },
//   retryButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007AFF',
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     marginTop: 24,
//   },
//   retryButtonText: {
//     fontSize: RFPercentage(2.2),
//     color: '#FFFFFF',
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.1,
//   },
//   emptyTitle: {
//     fontSize: RFPercentage(2.8),
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   emptySubtitle: {
//     fontSize: RFPercentage(2),
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 8,
//     lineHeight: 24,
//   },
//   refreshButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#007AFF',
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     marginTop: 24,
//   },
//   refreshButtonText: {
//     fontSize: RFPercentage(2.2),
//     color: '#007AFF',
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });

// export default All_Customer;







import { BASE_URL } from '@/Api/BASE_URL.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 60 - CARD_MARGIN * 2) / 2; // 60 for horizontal padding, margin for spacing

const All_Customer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, name } = route.params || {};
  const [residencies, setResidencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchResidencies = useCallback(async () => {
    try {
      if (!id) {
        setError('No project ID provided');
        setLoading(false);
        return;
      }

      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/residenciesByProject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResidencies(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch residencies');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    fetchResidencies();
  }, [fetchResidencies]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResidencies();
  }, [fetchResidencies]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return ['#4CAF50', '#66BB6A'];
      case 'pending':
        return ['#FF9800', '#FFB74D'];
      case 'cancelled':
        return ['#F44336', '#EF5350'];
      default:
        return ['#9E9E9E', '#BDBDBD'];
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return `$${parseFloat(price).toLocaleString()}`;
  };

  const renderResidency = ({ item, index }) => {
    const status = item.booking?.bookingStatus || 'Unknown';
    const statusColors = getStatusColor(status);
    const statusIcon = getStatusIcon(status);
    const isEven = index % 2 === 0;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            marginLeft: isEven ? 0 : CARD_MARGIN,
            marginRight: isEven ? CARD_MARGIN : 0,
          }
        ]}
        onPress={() =>
          navigation.navigate('FlatOwner', {
            bookingId: item.booking?.id,
            customerName: item.name || 'Unnamed Residency',
          })
        }
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA']}
          style={styles.cardGradient}
        >
          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <LinearGradient
              colors={statusColors}
              style={styles.statusBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={statusIcon} size={10} color="#FFFFFF" />
            </LinearGradient>
          </View>

          {/* Main Content */}
          <View style={styles.cardContent}>
            {/* Title */}
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.name || 'Unnamed Residency'}
            </Text>

            {/* Info Items */}
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <Ionicons name="business" size={14} color="#007AFF" />
                </View>
                <Text style={styles.infoText} numberOfLines={1}>
                  Floor {item.floorNumber || 'N/A'}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location" size={14} color="#007AFF" />
                </View>
                <Text style={styles.infoText} numberOfLines={1}>
                  {item.identifier || 'No ID'}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <Ionicons name="cash" size={14} color="#4CAF50" />
                </View>
                <Text style={[styles.infoText, styles.priceText]} numberOfLines={1}>
                  {formatPrice(item.price)}
                </Text>
              </View>
            </View>

            {/* Status Text */}
            <View style={styles.statusTextContainer}>
              <Text style={[styles.statusText, { color: statusColors[0] }]}>
                {status}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#007AFF" />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['#E3F2FD', '#F3E5F5']}
        style={styles.emptyGradient}
      >
        <Ionicons name="home-outline" size={60} color="#007AFF" />
        <Text style={styles.emptyTitle}>No Residencies Found</Text>
        <Text style={styles.emptySubtitle}>
          There are no residencies available for this project yet.
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <LinearGradient
            colors={['#007AFF', '#0056CC']}
            style={styles.refreshButtonGradient}
          >
            <Ionicons name="refresh" size={18} color="#FFFFFF" />
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <LinearGradient
        colors={['#FFEBEE', '#FCE4EC']}
        style={styles.errorGradient}
      >
        <Ionicons name="alert-circle-outline" size={60} color="#F44336" />
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorSubtitle}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchResidencies}>
          <LinearGradient
            colors={['#F44336', '#D32F2F']}
            style={styles.retryButtonGradient}
          >
            <Ionicons name="refresh" size={18} color="#FFFFFF" />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <LinearGradient
        colors={['#E8F5E8', '#F3E5F5']}
        style={styles.loadingGradient}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Residencies...</Text>
      </LinearGradient>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
        {renderLoadingState()}
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
        {renderErrorState()}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
      
      {/* Header */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonContainer}>
            <Ionicons name="arrow-back" size={22} color="#333" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {name || 'Project Residencies'}
          </Text>
          <View style={styles.headerSubtitleContainer}>
            <Ionicons name="home" size={14} color="#007AFF" />
            <Text style={styles.headerSubtitle}>
              {residencies.length} {residencies.length === 1 ? 'Residency' : 'Residencies'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Grid List */}
      <FlatList
        data={residencies}
        renderItem={renderResidency}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
        contentContainerStyle={[
          styles.listContainer,
          residencies.length === 0 && styles.emptyListContainer,
        ]}
        columnWrapperStyle={residencies.length > 0 ? styles.row : null}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    paddingTop : 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    marginRight: 16,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: RFPercentage(2.6),
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: RFPercentage(1.7),
    color: '#666',
    marginLeft: 6,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardGradient: {
    padding: 16,
    minHeight: 180,
  },
  statusContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  statusBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: RFPercentage(2.1),
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoText: {
    fontSize: RFPercentage(1.6),
    color: '#666',
    flex: 1,
  },
  priceText: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  statusTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statusText: {
    fontSize: RFPercentage(1.5),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  separator: {
    height: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  loadingGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: RFPercentage(2),
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  errorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
  },
  errorSubtitle: {
    fontSize: RFPercentage(1.8),
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    fontSize: RFPercentage(1.9),
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  emptyGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: RFPercentage(1.8),
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  refreshButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  refreshButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  refreshButtonText: {
    fontSize: RFPercentage(1.9),
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default All_Customer;