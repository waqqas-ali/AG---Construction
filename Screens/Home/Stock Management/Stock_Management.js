// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';
// import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ActivityIndicator } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { MaterialIcons } from '@expo/vector-icons';

// const Stock_Management = ({ navigation }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch JWT token from AsyncStorage
//   const getToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       return token;
//     } catch (error) {
//       console.error('Error fetching token:', error);
//       Alert.alert('Error', 'Authentication token not found');
//       return null;
//     }
//   };

//   // Fetch all projects
//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.get(`${BASE_URL}/getAllProjects`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setProjects(response.data || []);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//       Alert.alert('Error', 'Failed to load projects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Handle pull-to-refresh
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchProjects();
//     setRefreshing(false);
//   }, []);

//   // Render project item in FlatList
//   const renderProject = ({ item }) => (
//     <TouchableOpacity
//       style={styles.projectItem}
//       onPress={() => navigation.navigate('All_Stocks', { projectId: item.id, name: item.name })}
//       activeOpacity={0.7}
//     >
//       <LinearGradient
//         colors={['#ffffff', '#f8f9fa']}
//         style={styles.projectCard}
//       >
//         <View style={styles.projectContent}>
//           <Text style={styles.projectText}>{item.name}</Text>
//           <MaterialIcons name="arrow-forward" size={24} color="#007AFF" />
//         </View>
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#007AFF', '#005BB5']}
//         style={styles.headerContainer}
//       >
//         <Text style={styles.header}>Stock Management</Text>
//         <Text style={styles.subHeader}>Project List</Text>
//       </LinearGradient>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text style={styles.loadingText}>Loading projects...</Text>
//         </View>
//       ) : projects.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <MaterialIcons name="inbox" size={48} color="#666" />
//           <Text style={styles.emptyText}>No projects available</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={projects}
//           renderItem={renderProject}
//           keyExtractor={(item) => item.id.toString()}
//           style={styles.list}
//           contentContainerStyle={styles.listContent}
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
//     backgroundColor: '#f1f3f5',
//   },
//   headerContainer: {
//     padding: 20,
//     paddingTop: 40,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   subHeader: {
//     fontSize: 16,
//     color: '#e6f0ff',
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   list: {
//     flex: 1,
//   },
//   listContent: {
//     padding: 15,
//     paddingBottom: 20,
//   },
//   projectItem: {
//     marginBottom: 12,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   projectCard: {
//     padding: 15,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   projectContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   projectText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 10,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default Stock_Management;






import { BASE_URL } from '@/Api/BASE_URL.js';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Animated, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stock_Management = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch JWT token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found');
      }
      return token;
    } catch (error) {
      console.error('Error fetching token:', error);
      Alert.alert('Error', 'Authentication token not found');
      return null;
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/getAllProjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      Alert.alert('Error', 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProjects();
    setRefreshing(false);
  }, []);

  // Render project item in FlatList with cart-like design
  const renderProject = ({ item }) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        style={styles.projectItem}
        onPress={() => navigation.navigate('All_Stocks', { projectId: item.id, name: item.name })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.projectCard, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="folder" size={24} color="#007AFF" />
              </View>
              <Text style={styles.projectName} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.projectDetail}>Project ID: {item.id}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
            </View>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#007AFF', '#004C99']}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <MaterialIcons name="inventory" size={32} color="#fff" />
          <Text style={styles.header}>Stock Management</Text>
        </View>
        <Text style={styles.subHeader}>Your Projects</Text>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading projects...</Text>
        </View>
      ) : projects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={48} color="#6B7280" />
          <Text style={styles.emptyText}>No projects available</Text>
          <Text style={styles.emptySubText}>Pull to refresh or check back later</Text>
        </View>
      ) : (
        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']}
              tintColor="#007AFF"
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
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
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: '400',
    color: '#E5EEFF',
    textAlign: 'center',
    marginTop: 6,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  projectItem: {
    marginBottom: 16,
  },
  projectCard: {
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectDetail: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
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

export default Stock_Management;