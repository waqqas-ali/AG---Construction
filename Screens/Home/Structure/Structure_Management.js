// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const Structure_Management = ({ navigation }) => { // Added navigation for the add button
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // --- API LOGIC (UNCHANGED) ---
//   const getAllProjects = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       if (!jwtToken) {
//         throw new Error('No JWT token found');
//       }

//       const response = await axios.get(`${BASE_URL}/getAllProjects`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       setProjects(response.data);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch projects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProjects();
//   }, []);

//   const InfoRow = ({ icon, label, value }) => (
//     <View style={styles.detailRow}>
//       <Ionicons name={icon} size={20} color="#555" style={styles.detailIcon} />
//       <Text style={styles.label}>{label}</Text>
//       <Text style={styles.value}>{value}</Text>
//     </View>
//   );

//   const renderProjectCard = ({ item }) => (
//     <TouchableOpacity style={styles.card} activeOpacity={0.7}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.projectName}>{item.name || 'Unnamed Project'}</Text>
//         <View style={[styles.statusBadge, item.status === 'IN_PROGRESS' ? styles.inProgress : styles.completed]}>
//           <Text style={[styles.statusText, item.status === 'IN_PROGRESS' ? styles.inProgressText : styles.completedText]}>
//             {item.status?.replace('_', ' ') || 'UNKNOWN'}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.details}>
//         <InfoRow icon="business-outline" label="Building Size" value={item.buildingSize || 'N/A'} />
//         <InfoRow icon="grid-outline" label="Total Flats" value={item.totalflat || 'N/A'} />
//         <InfoRow icon="map-outline" label="Land Area" value={item.land?.area ? `${item.land.area} sq.ft` : 'N/A'} />
//         <InfoRow icon="cash-outline" label="Total Amount" value={item.land?.totalAmount ? `₹${item.land.totalAmount.toLocaleString('en-IN')}` : 'N/A'} />
//         <InfoRow 
//           icon="location-outline" 
//           label="Address" 
//           value={item.land?.address?.street || item.land?.address?.city ? `${item.land.address.street || ''}, ${item.land.address.city || ''}` : 'N/A'}
//         />
//       </View>
//     </TouchableOpacity>
//   );

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.infoText}>Loading projects...</Text>
//         </View>
//       );
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="cloud-offline-outline" size={60} color="#D32F2F" />
//           <Text style={styles.errorText}>Error: {error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllProjects}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={projects}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderProjectCard}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <View style={styles.centeredContainer}>
//             <Ionicons name="file-tray-stacked-outline" size={60} color="#888" />
//             <Text style={styles.infoText}>No projects found.</Text>
//             <Text style={styles.infoSubText}>Tap the '+' to add your first project.</Text>
//           </View>
//         }
//       />
//     );
//   };
  
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Projects</Text>
//       </View>
//       {renderContent()}
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
//     shadowColor: '#007AFF',
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
//     shadowOpacity: 0.05,
//     shadowRadius: 12,
//     elevation: 5,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   projectName: {
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
// });

// export default Structure_Management;












// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const Structure_Management = ({ navigation }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const getAllProjects = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       if (!jwtToken) {
//         throw new Error('No JWT token found');
//       }

//       const response = await axios.get(`${BASE_URL}/getAllProjects`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       });

//       setProjects(response.data);
//       console.log(JSON.stringify(response.data, null, 2));

//     } catch (err) {
//       setError(err.message || 'Failed to fetch projects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await getAllProjects();
//     setRefreshing(false);
//   }, []);

//   useEffect(() => {
//     getAllProjects();
//   }, []);

//   const handleProjectPress = (project) => {
//     navigation.navigate('Structure_Details', { id: project.id, name: project.name });
//   };

//   const handleAddProject = () => {
//     navigation.navigate('AddProject');
//   };

//   const InfoRow = ({ icon, label, value }) => (
//     <View style={styles.detailRow}>
//       <Ionicons name={icon} size={20} color="#555" style={styles.detailIcon} />
//       <Text style={styles.label}>{label}</Text>
//       <Text style={styles.value}>{value}</Text>
//     </View>
//   );

//   const renderProjectCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.7}
//       onPress={() => handleProjectPress(item)}
//     >
//       <View style={styles.cardHeader}>
//         <Text style={styles.projectName}>{item.name || 'Unnamed Project'}</Text>
//         <View style={[styles.statusBadge, item.status === 'IN_PROGRESS' ? styles.inProgress : styles.completed]}>
//           <Text style={[styles.statusText, item.status === 'IN_PROGRESS' ? styles.inProgressText : styles.completedText]}>
//             {item.status?.replace('_', ' ') || 'UNKNOWN'}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.details}>
//         <InfoRow icon="business-outline" label="Building Size" value={item.buildingSize || 'N/A'} />
//         <InfoRow icon="grid-outline" label="Total Flats" value={item.totalflat || 'N/A'} />
//         <InfoRow icon="map-outline" label="Land Area" value={item.land?.area ? `${item.land.area} sq.ft` : 'N/A'} />
//         <InfoRow icon="cash-outline" label="Total Amount" value={item.land?.totalAmount ? `₹${item.land.totalAmount.toLocaleString('en-IN')}` : 'N/A'} />
//         <InfoRow
//           icon="location-outline"
//           label="Address"
//           value={item.land?.address?.street || item.land?.address?.city ? `${item.land.address.street || ''}, ${item.land.address.city || ''}` : 'N/A'}
//         />
//       </View>
//     </TouchableOpacity>
//   );

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.infoText}>Loading projects...</Text>
//         </View>
//       );
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="cloud-offline-outline" size={60} color="#D32F2F" />
//           <Text style={styles.errorText}>Error: {error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={getAllProjects}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//     return (
//       <FlatList
//         data={projects}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderProjectCard}
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
//             <Text style={styles.infoText}>No projects found.</Text>
//             <Text style={styles.infoSubText}>Tap the '+' to add your first project.</Text>
//           </View>
//         }
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Projects</Text>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//       {renderContent()}
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
//     shadowOpacity: 0.05,
//     shadowRadius: 12,
//     elevation: 5,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   projectName: {
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
// });

// export default Structure_Management;





import { BASE_URL } from '@/Api/BASE_URL.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Structure_Management = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getAllProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }

      const response = await axios.get(`${BASE_URL}/getAllProjects`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setProjects(response.data);
      console.log(JSON.stringify(response.data, null, 2));
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllProjects();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleProjectPress = (project) => {
    navigation.navigate('Structure_Details', { id: project.id, name: project.name });
  };

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={20} color="#555" style={styles.detailIcon} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderProjectCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleProjectPress(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.projectName}>{item.name || 'Unnamed Project'}</Text>
        <View style={[styles.statusBadge, item.status === 'IN_PROGRESS' ? styles.inProgress : styles.completed]}>
          <Text style={[styles.statusText, item.status === 'IN_PROGRESS' ? styles.inProgressText : styles.completedText]}>
            {item.status?.replace('_', ' ') || 'UNKNOWN'}
          </Text>
        </View>
      </View>
      <View style={styles.details}>
        <InfoRow icon="business-outline" label="Building Size" value={item.buildingSize || 'N/A'} />
        <InfoRow icon="grid-outline" label="Total Flats" value={item.totalflat || 'N/A'} />
        <InfoRow icon="map-outline" label="Land Area" value={item.land?.area ? `${item.land.area} sq.ft` : 'N/A'} />
        <InfoRow icon="cash-outline" label="Total Amount" value={item.land?.totalAmount ? `₹${item.land.totalAmount.toLocaleString('en-IN')}` : 'N/A'} />
        <InfoRow
          icon="location-outline"
          label="Address"
          value={
            item.land?.address?.street || item.land?.address?.city
              ? `${item.land.address.street || ''}, ${item.land.address.city || ''}`
              : 'N/A'
          }
        />
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.infoText}>Loading projects...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centeredContainer}>
          <Ionicons name="cloud-offline-outline" size={60} color="#D32F2F" />
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={getAllProjects}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderProjectCard}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.centeredContainer}>
            <Ionicons name="file-tray-stacked-outline" size={60} color="#888" />
            <Text style={styles.infoText}>No projects found.</Text>
            <Text style={styles.infoSubText}>Tap the '+' to add your first project.</Text>
          </View>
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        {/* <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity> */}
      </View>
      {renderContent()}
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
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  projectName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  inProgress: { backgroundColor: '#FFF5E1' },
  inProgressText: { color: '#FFA800' },
  completed: { backgroundColor: '#E6F4EA' },
  completedText: { color: '#2E7D32' },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
    width: 20,
  },
  label: {
    fontSize: 15,
    color: '#666666',
    flex: 0.45,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    flex: 0.55,
    textAlign: 'right',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
  },
  infoSubText: {
    marginTop: 5,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
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
    elevation: 2,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Structure_Management;