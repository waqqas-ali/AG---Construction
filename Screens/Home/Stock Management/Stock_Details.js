// import React from 'react'
// import { Text, View } from 'react-native'

// const Stock_Details = () => {
//   return (
//     <View>
//       <Text>Stock_Details</Text>
//     </View>
//   )
// }

// export default Stock_Details





// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useState } from 'react';
// import {
//     Alert,
//     Button,
//     FlatList,
//     Modal,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const Stock_Details = () => {
//   const route = useRoute();
//   const { projectId, name } = route.params; // Get projectId and name from navigation params

//   const [refreshKey, setRefreshKey] = useState(0);
//   const [existingStockId, setExistingStockId] = useState('');
//   const [showExistingAddStockForm, setShowExistingAddStockForm] = useState(false);
//   const [existingStockAmount, setExistingStockAmount] = useState('');
//   const [existingStockQuantity, setExistingStockQuantity] = useState('');
//   const [existingStockUsedId, setExistingStockUsedId] = useState('');
//   const [existingStockUsedFormShow, setExistingStockUsedFormShow] = useState(false);
//   const [usedQuantity, setUsedQuantity] = useState('');
//   const [historyUsedStock, setHistoryUsedStock] = useState([]);
//   const [stockOutDetailsShow, setStockOutDetailsShow] = useState(false);
//   const [showAddStockDetails, setShowAddStockDetails] = useState(false);
//   const [stockInData, setStockInData] = useState([]);
//   const [loading, setLoading] = useState(false);

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

//   // Handle adding existing stock
//   const handleAddExistingStock = (id) => {
//     setExistingStockId(id);
//     setShowExistingAddStockForm(true);
//     setStockOutDetailsShow(false);
//     setShowAddStockDetails(false);
//   };

//   // Handle updating existing stock
//   const handleUpdateExistingStock = async () => {
//     if (!existingStockAmount || !existingStockQuantity) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }
//     if (isNaN(existingStockAmount) || isNaN(existingStockQuantity)) {
//       Alert.alert('Error', 'Price and Quantity must be numbers');
//       return;
//     }

//     const data = new URLSearchParams();
//     data.append('price', existingStockAmount);
//     data.append('quantityString', existingStockQuantity);

//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.post(
//         `${BASE_URL}/products/${existingStockId}/add-stock`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Details Added Successfully');
//         setRefreshKey(refreshKey + 1);
//         setExistingStockAmount('');
//         setExistingStockQuantity('');
//         setShowExistingAddStockForm(false);
//       }
//     } catch (error) {
//       console.error('Error adding stock:', error);
//       Alert.alert('Error', 'Failed to add stock');
//     }
//   };

//   // Handle stock usage
//   const handleStockUsed = (id) => {
//     setExistingStockUsedId(id);
//     setExistingStockUsedFormShow(true);
//     setStockOutDetailsShow(false);
//     setShowAddStockDetails(false);
//   };

//   // Handle adding used quantity
//   const handleAddUsedQuantity = async () => {
//     if (!usedQuantity) {
//       Alert.alert('Error', 'Please enter used quantity');
//       return;
//     }
//     if (isNaN(usedQuantity)) {
//       Alert.alert('Error', 'Used Quantity must be a number');
//       return;
//     }

//     const body = {
//       quantityUsed: parseInt(usedQuantity, 10),
//     };

//     try {
//       const token = await getToken();
//       if (!token) {
//         Alert.alert('Error', 'Token is unavailable');
//         return;
//       }

//       const response = await axios.post(
//         `${BASE_URL}/products/${existingStockUsedId}/use-stock`,
//         body,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Quantity removed successfully');
//         setRefreshKey(refreshKey + 1);
//         setUsedQuantity('');
//         setExistingStockUsedFormShow(false);
//       }
//     } catch (error) {
//       console.error('Error using stock:', error);
//       Alert.alert('Error', error.response?.data?.message || 'Failed to remove quantity');
//     }
//   };

//   // Fetch stock usage history
//   const handleCheckHistory = async (id) => {
//     setShowAddStockDetails(false);
//     setStockOutDetailsShow(true);
//     setLoading(true);
//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.get(`${BASE_URL}/products/${id}/usages`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setHistoryUsedStock(response.data || []);
//     } catch (error) {
//       console.error('Error fetching usage history:', error);
//       Alert.alert('Error', 'Failed to load usage history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch stock-in history
//   const handleShowAddStoreDetail = async (id) => {
//     setStockOutDetailsShow(false);
//     setShowAddStockDetails(true);
//     setLoading(true);
//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.get(`${BASE_URL}/products/${id}/stock-in-history`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       setStockInData(response.data || []);
//     } catch (error) {
//       console.error('Error fetching stock-in history:', error);
//       Alert.alert('Error', 'Failed to load stock-in history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render stock-out history item
//   const renderStockOutItem = ({ item, index }) => {
//     const dateObj = new Date(item.usedAt);
//     const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
//       dateObj.getMonth() + 1
//     ).padStart(2, '0')}-${dateObj.getFullYear()}`;

//     return (
//       <View style={styles.historyItem}>
//         <Text style={styles.historyText}>{index + 1}</Text>
//         <Text style={styles.historyText}>{item.quantityUsed}</Text>
//         <Text style={styles.historyText}>{formattedDate}</Text>
//       </View>
//     );
//   };

//   // Render stock-in history item
//   const renderStockInItem = ({ item }) => (
//     <View style={styles.historyItem}>
//       <Text style={styles.historyText}>{item.id}</Text>
//       <Text style={styles.historyText}>{item.quantityAddedValue}</Text>
//       <Text style={styles.historyText}>{item.priceAdded}</Text>
//       <Text style={styles.historyText}>
//         {new Date(item.addedAt).toLocaleDateString()}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{name} Stock Details</Text>

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => handleAddExistingStock(projectId)}
//         >
//           <Text style={styles.buttonText}>Stock In</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => handleStockUsed(projectId)}
//         >
//           <Text style={styles.buttonText}>Stock Out</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => handleCheckHistory(projectId)}
//         >
//           <Text style={styles.buttonText}>View Used Stock</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => handleShowAddStoreDetail(projectId)}
//         >
//           <Text style={styles.buttonText}>View Added Stock</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Add Existing Stock Modal */}
//       <Modal visible={showExistingAddStockForm} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalHeader}>Add Stock</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Price"
//             value={existingStockAmount}
//             onChangeText={setExistingStockAmount}
//             keyboardType="numeric"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Quantity"
//             value={existingStockQuantity}
//             onChangeText={setExistingStockQuantity}
//             keyboardType="numeric"
//           />
//           <View style={styles.modalButtons}>
//             <Button title="Submit" onPress={handleUpdateExistingStock} />
//             <Button
//               title="Cancel"
//               onPress={() => setShowExistingAddStockForm(false)}
//               color="grey"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* Use Stock Modal */}
//       <Modal visible={existingStockUsedFormShow} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalHeader}>Use Stock</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Used Quantity"
//             value={usedQuantity}
//             onChangeText={setUsedQuantity}
//             keyboardType="numeric"
//           />
//           <View style={styles.modalButtons}>
//             <Button title="Submit" onPress={handleAddUsedQuantity} />
//             <Button
//               title="Cancel"
//               onPress={() => setExistingStockUsedFormShow(false)}
//               color="grey"
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* Stock Out History */}
//       {stockOutDetailsShow && (
//         <View style={styles.historyContainer}>
//           <Text style={styles.historyHeader}>Stock Out Details</Text>
//           {loading ? (
//             <Text style={styles.loadingText}>Loading...</Text>
//           ) : historyUsedStock.length === 0 ? (
//             <Text style={styles.emptyText}>No history found</Text>
//           ) : (
//             <FlatList
//               data={historyUsedStock}
//               renderItem={renderStockOutItem}
//               keyExtractor={(_, index) => index.toString()}
//               ListHeaderComponent={() => (
//                 <View style={styles.historyHeaderRow}>
//                   <Text style={styles.historyHeaderText}>Sr No</Text>
//                   <Text style={styles.historyHeaderText}>Quantity Used</Text>
//                   <Text style={styles.historyHeaderText}>Date Used</Text>
//                 </View>
//               )}
//             />
//           )}
//         </View>
//       )}

//       {/* Stock In History */}
//       {showAddStockDetails && (
//         <View style={styles.historyContainer}>
//           <Text style={styles.historyHeader}>Stock In Details</Text>
//           {loading ? (
//             <Text style={styles.loadingText}>Loading...</Text>
//           ) : stockInData.length === 0 ? (
//             <Text style={styles.emptyText}>No history found</Text>
//           ) : (
//             <FlatList
//               data={stockInData}
//               renderItem={renderStockInItem}
//               keyExtractor={(item) => item.id.toString()}
//               ListHeaderComponent={() => (
//                 <View style={styles.historyHeaderRow}>
//                   <Text style={styles.historyHeaderText}>ID</Text>
//                   <Text style={styles.historyHeaderText}>Quantity Added</Text>
//                   <Text style={styles.historyHeaderText}>Price Added</Text>
//                   <Text style={styles.historyHeaderText}>Added At</Text>
//                 </View>
//               )}
//             />
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     margin: 5,
//     flex: 1,
//     alignItems: 'center',
//     minWidth: 140,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   modalHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   historyContainer: {
//     flex: 1,
//     marginTop: 20,
//   },
//   historyHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   historyHeaderRow: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   historyHeaderText: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   historyItem: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   historyText: {
//     flex: 1,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#666',
//   },
// });

// export default Stock_Details;




import { BASE_URL } from '@/Api/BASE_URL.js';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    FlatList,
    Modal,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Stock_Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId, name } = route.params; // Get projectId and name from navigation params

  const [refreshKey, setRefreshKey] = useState(0);
  const [existingStockId, setExistingStockId] = useState('');
  const [showExistingAddStockForm, setShowExistingAddStockForm] = useState(false);
  const [existingStockAmount, setExistingStockAmount] = useState('');
  const [existingStockQuantity, setExistingStockQuantity] = useState('');
  const [existingStockUsedId, setExistingStockUsedId] = useState('');
  const [existingStockUsedFormShow, setExistingStockUsedFormShow] = useState(false);
  const [usedQuantity, setUsedQuantity] = useState('');
  const [historyUsedStock, setHistoryUsedStock] = useState([]);
  const [stockOutDetailsShow, setStockOutDetailsShow] = useState(false);
  const [showAddStockDetails, setShowAddStockDetails] = useState(false);
  const [stockInData, setStockInData] = useState([]);
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

  // Handle adding existing stock
  const handleAddExistingStock = (id) => {
    setExistingStockId(id);
    setShowExistingAddStockForm(true);
    setStockOutDetailsShow(false);
    setShowAddStockDetails(false);
  };

  // Handle updating existing stock
  const handleUpdateExistingStock = async () => {
    if (!existingStockAmount || !existingStockQuantity) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (isNaN(existingStockAmount) || isNaN(existingStockQuantity)) {
      Alert.alert('Error', 'Price and Quantity must be numbers');
      return;
    }

    const data = new URLSearchParams();
    data.append('price', existingStockAmount);
    data.append('quantityString', existingStockQuantity);

    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.post(
        `${BASE_URL}/products/${existingStockId}/add-stock`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Details Added Successfully');
        setRefreshKey(refreshKey + 1);
        setExistingStockAmount('');
        setExistingStockQuantity('');
        setShowExistingAddStockForm(false);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      Alert.alert('Error', 'Failed to add stock');
    }
  };

  // Handle stock usage
  const handleStockUsed = (id) => {
    setExistingStockUsedId(id);
    setExistingStockUsedFormShow(true);
    setStockOutDetailsShow(false);
    setShowAddStockDetails(false);
  };

  // Handle adding used quantity
  const handleAddUsedQuantity = async () => {
    if (!usedQuantity) {
      Alert.alert('Error', 'Please enter used quantity');
      return;
    }
    if (isNaN(usedQuantity)) {
      Alert.alert('Error', 'Used Quantity must be a number');
      return;
    }

    const body = {
      quantityUsed: parseInt(usedQuantity, 10),
    };

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Error', 'Token is unavailable');
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/products/${existingStockUsedId}/use-stock`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Quantity removed successfully');
        setRefreshKey(refreshKey + 1);
        setUsedQuantity('');
        setExistingStockUsedFormShow(false);
      }
    } catch (error) {
      console.error('Error using stock:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to remove quantity');
    }
  };

  // Fetch stock usage history
  const handleCheckHistory = async (id) => {
    setShowAddStockDetails(false);
    setStockOutDetailsShow(true);
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/products/${id}/usages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setHistoryUsedStock(response.data || []);
    } catch (error) {
      console.error('Error fetching usage history:', error);
      Alert.alert('Error', 'Failed to load usage history');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stock-in history
  const handleShowAddStoreDetail = async (id) => {
    setStockOutDetailsShow(false);
    setShowAddStockDetails(true);
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/products/${id}/stock-in-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStockInData(response.data || []);
    } catch (error) {
      console.error('Error fetching stock-in history:', error);
      Alert.alert('Error', 'Failed to load stock-in history');
    } finally {
      setLoading(false);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setRefreshing(false);
  }, [refreshKey]);

  // Render stock-out history item
  const renderStockOutItem = ({ item, index }) => {
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

    const dateObj = new Date(item.usedAt);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, '0')}-${dateObj.getFullYear()}`;

    return (
      <TouchableOpacity
        style={styles.historyItem}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.historyCard, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.cardGradient}
          >
            <View style={styles.historyRow}>
              <Text style={styles.historyText}>{index + 1}</Text>
              <Text style={styles.historyText}>{item.quantityUsed}</Text>
              <Text style={styles.historyText}>{formattedDate}</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  // Render stock-in history item
  const renderStockInItem = ({ item }) => {
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
        style={styles.historyItem}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.historyCard, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.cardGradient}
          >
            <View style={styles.historyRow}>
              <Text style={styles.historyText}>{item.id}</Text>
              <Text style={styles.historyText}>{item.quantityAddedValue}</Text>
              <Text style={styles.historyText}>${item.priceAdded}</Text>
              <Text style={styles.historyText}>
                {new Date(item.addedAt).toLocaleDateString()}
              </Text>
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.header}>{name} Stock Details</Text>
        </View>
        <Text style={styles.subHeader}>Manage Inventory</Text>
      </LinearGradient>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.stockInButton]}
          onPress={() => handleAddExistingStock(projectId)}
        >
          <MaterialIcons name="add-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Stock In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.stockOutButton]}
          onPress={() => handleStockUsed(projectId)}
        >
          <MaterialIcons name="remove-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Stock Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.historyButton]}
          onPress={() => handleCheckHistory(projectId)}
        >
          <MaterialIcons name="history" size={20} color="#fff" />
          <Text style={styles.buttonText}>Used Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.addedButton]}
          onPress={() => handleShowAddStoreDetail(projectId)}
        >
          <MaterialIcons name="archive" size={20} color="#fff" />
          <Text style={styles.buttonText}>Added Stock</Text>
        </TouchableOpacity>
      </View>

      {stockOutDetailsShow && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyHeader}>Stock Out Details</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : historyUsedStock.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="inbox" size={48} color="#6B7280" />
              <Text style={styles.emptyText}>No history found</Text>
              <Text style={styles.emptySubText}>Pull to refresh or check back later</Text>
            </View>
          ) : (
            <FlatList
              data={historyUsedStock}
              renderItem={renderStockOutItem}
              keyExtractor={(_, index) => index.toString()}
              ListHeaderComponent={() => (
                <View style={styles.historyHeaderRow}>
                  <Text style={styles.historyHeaderText}>Sr No</Text>
                  <Text style={styles.historyHeaderText}>Quantity Used</Text>
                  <Text style={styles.historyHeaderText}>Date Used</Text>
                </View>
              )}
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
      )}

      {showAddStockDetails && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyHeader}>Stock In Details</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : stockInData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="inbox" size={48} color="#6B7280" />
              <Text style={styles.emptyText}>No history found</Text>
              <Text style={styles.emptySubText}>Pull to refresh or check back later</Text>
            </View>
          ) : (
            <FlatList
              data={stockInData}
              renderItem={renderStockInItem}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={() => (
                <View style={styles.historyHeaderRow}>
                  <Text style={styles.historyHeaderText}>ID</Text>
                  <Text style={styles.historyHeaderText}>Quantity Added</Text>
                  <Text style={styles.historyHeaderText}>Price Added</Text>
                  <Text style={styles.historyHeaderText}>Added At</Text>
                </View>
              )}
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
      )}

      {/* Add Existing Stock Modal */}
      <Modal visible={showExistingAddStockForm} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Add Stock</Text>
                <TouchableOpacity onPress={() => setShowExistingAddStockForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Price"
                value={existingStockAmount}
                onChangeText={setExistingStockAmount}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Quantity"
                value={existingStockQuantity}
                onChangeText={setExistingStockQuantity}
                keyboardType="numeric"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleUpdateExistingStock}
                >
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowExistingAddStockForm(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Use Stock Modal */}
      <Modal visible={existingStockUsedFormShow} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Use Stock</Text>
                <TouchableOpacity onPress={() => setExistingStockUsedFormShow(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Used Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Used Quantity"
                value={usedQuantity}
                onChangeText={setUsedQuantity}
                keyboardType="numeric"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleAddUsedQuantity}
                >
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setExistingStockUsedFormShow(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
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
    flex: 1,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: '400',
    color: '#E5EEFF',
    textAlign: 'center',
    marginTop: 6,
  },
  buttonContainer: {
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
  stockInButton: {
    backgroundColor: '#10B981',
  },
  stockOutButton: {
    backgroundColor: '#EF4444',
  },
  historyButton: {
    backgroundColor: '#3B82F6',
  },
  addedButton: {
    backgroundColor: '#8B5CF6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  historyHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  historyHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  historyItem: {
    marginBottom: 12,
  },
  historyCard: {
    borderRadius: 12,
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
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500/scanner-pro',
    color: '#1F2937',
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
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
  modalHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
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
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Stock_Details;