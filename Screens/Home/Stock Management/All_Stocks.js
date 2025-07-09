// import React from 'react'
// import { Text, View } from 'react-native'
// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';

// const All_Stocks = () => {
//   return (
//     <View>
//       <Text>All_Stocks</Text>
//     </View>
//   )
// }

// export default All_Stocks




// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
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

// const AddMaterial = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { projectId } = route.params || {}; // Get projectId from navigation params
//   const [stockData, setStockData] = useState([]);
//   const [stockName, setStockName] = useState('');
//   const [stockPrice, setStockPrice] = useState('');
//   const [stockQuantity, setStockQuantity] = useState('');
//   const [stockDate, setStockDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showStockForm, setShowStockForm] = useState(false);
//   const [searchStock, setSearchStock] = useState('');
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [stockEditId, setStockEditId] = useState('');
//   const [showStockEditForm, setShowStockEditForm] = useState(false);
//   const [editStockDate, setEditStockDate] = useState(new Date());
//   const [editStockName, setEditStockName] = useState('');
//   const [editStockTotalQuantity, setEditStockTotalQuantity] = useState('');
//   const [editStockPrice, setEditStockPrice] = useState('');
//   const [editStockUsedQuantity, setEditStockUsedQuantity] = useState('');
//   const [editStockRemainingQuantity, setEditStockRemainingQuantity] = useState('');
//   const [showEditDatePicker, setShowEditDatePicker] = useState(false);

//   // Fetch JWT token
//   const getToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('jwtToken');
//       if (!token) throw new Error('No token found');
//       return token;
//     } catch (error) {
//       Alert.alert('Error', 'Authentication token not found');
//       return null;
//     }
//   };

//   // Fetch all stocks for the project
//   useEffect(() => {
//     const getAllStocks = async () => {
//       if (!projectId) {
//         Alert.alert('Error', 'Project ID is missing');
//         return;
//       }
//       try {
//         const token = await getToken();
//         if (!token) return;
//         const response = await axios.get(`${BASE_URL}/products/project/${projectId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         setStockData(response.data || []);
//       } catch (error) {
//         console.error('Error fetching stocks:', error);
//         Alert.alert('Error', 'Failed to load stocks');
//       }
//     };
//     getAllStocks();
//   }, [projectId, refreshKey]);

//   // Filter stocks by search query
//   const filterSearch = stockData.filter((item) =>
//     item.name.toLowerCase().includes(searchStock.toLowerCase())
//   );

//   // Handle adding new stock
//   const handleAddNewStock = async () => {
//     if (!stockName || !stockPrice || !stockQuantity || !stockDate) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }
//     const body = {
//       name: stockName,
//       price: stockPrice,
//       totalQuantityString: stockQuantity,
//       productAddOnDate: stockDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
//       projectId,
//     };
//     try {
//       const token = await getToken();
//       if (!token) return;
//       const response = await axios.post(`${BASE_URL}/products/create`, body, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.status === 200) {
//         Alert.alert('Success', 'Stock Added Successfully');
//         setRefreshKey(refreshKey + 1);
//         setStockName('');
//         setStockPrice('');
//         setStockQuantity('');
//         setStockDate(new Date());
//         setShowStockForm(false);
//       }
//     } catch (error) {
//       console.error('Error adding stock:', error);
//       Alert.alert('Error', 'Failed to add stock');
//     }
//   };

//   // Handle deleting stock
//   const handleStockDelete = async (id) => {
//     Alert.alert('Confirm Delete', 'Are you sure you want to delete this stock?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             const token = await getToken();
//             if (!token) return;
//             const response = await axios.delete(`${BASE_URL}/products/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               },
//             });
//             if (response.status === 200) {
//               Alert.alert('Success', 'Stock Deleted Successfully');
//               setRefreshKey(refreshKey + 1);
//             }
//           } catch (error) {
//             console.error('Error deleting stock:', error);
//             Alert.alert('Error', 'Failed to delete stock');
//           }
//         },
//       },
//     ]);
//   };

//   // Handle editing stock
//   const handleEditStock = async (id) => {
//     setStockEditId(id);
//     setShowStockEditForm(true);
//     try {
//       const token = await getToken();
//       if (!token) return;
//       const response = await axios.get(`${BASE_URL}/products/get/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = response.data;
//       setEditStockDate(new Date(data.productAddOnDate));
//       setEditStockPrice(data.price.toString());
//       setEditStockRemainingQuantity(data.remainingQuantity.toString());
//       setEditStockTotalQuantity(data.totalQuantityString.toString());
//       setEditStockUsedQuantity(data.usedQuantity.toString());
//       setEditStockName(data.name);
//     } catch (error) {
//       console.error('Error fetching stock for edit:', error);
//       Alert.alert('Error', 'Failed to load stock details');
//     }
//   };

//   // Handle updating stock
//   const handleUpdateStock = async () => {
//     if (!editStockName || !editStockPrice || !editStockTotalQuantity || !editStockDate) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
//     const body = {
//       name: editStockName,
//       price: editStockPrice,
//       totalQuantityString: editStockTotalQuantity,
//       productAddOnDate: editStockDate.toISOString().split('T')[0],
//       projectId,
//     };
//     try {
//       const token = await getToken();
//       if (!token) return;
//       const response = await axios.put(`${BASE_URL}/products/edit/${stockEditId}`, body, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.status === 200) {
//         Alert.alert('Success', 'Stock Updated Successfully');
//         setRefreshKey(refreshKey + 1);
//         setShowStockEditForm(false);
//       }
//     } catch (error) {
//       console.error('Error updating stock:', error);
//       Alert.alert('Error', 'Failed to update stock');
//     }
//   };

//   // Render stock item
//   const renderStock = ({ item }) => (
//     <View style={styles.stockItem}>
//       <Text style={styles.stockText}>Date: {item.productAddOnDate}</Text>
//       <Text style={styles.stockText}>Name: {item.name}</Text>
//       <Text style={styles.stockText}>Quantity: {item.totalQuantityString}</Text>
//       <Text style={styles.stockText}>Price: {item.price}</Text>
//       <Text style={styles.stockText}>Used: {item.usedQuantity}</Text>
//       <Text style={styles.stockText}>Remaining: {item.remainingQuantity}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.viewButton}
//           onPress={() => navigation.navigate('All_Stocks', { projectId: item.id, name: item.name })}
//         >
//           <Text style={styles.buttonText}>View Details</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() => handleEditStock(item.id)}
//         >
//           <Text style={styles.buttonText}>Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleStockDelete(item.id)}
//         >
//           <Text style={styles.buttonText}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Stock Details</Text>
//       <View style={styles.searchAddContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Enter Stock Name..."
//           value={searchStock}
//           onChangeText={setSearchStock}
//         />
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => setShowStockForm(true)}
//         >
//           <Text style={styles.buttonText}>Add Stock</Text>
//         </TouchableOpacity>
//       </View>

//       {stockData.length > 0 ? (
//         <FlatList
//           data={filterSearch}
//           renderItem={renderStock}
//           keyExtractor={(item) => item.id.toString()}
//           style={styles.list}
//         />
//       ) : (
//         <Text style={styles.emptyText}>No Stock Available</Text>
//       )}

//       {/* Add Stock Modal */}
//       <Modal visible={showStockForm} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalHeader}>Add New Stock</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Stock Name"
//             value={stockName}
//             onChangeText={setStockName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Stock Price"
//             value={stockPrice}
//             onChangeText={setStockPrice}
//             keyboardType="numeric"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Stock Quantity"
//             value={stockQuantity}
//             onChangeText={setStockQuantity}
//             keyboardType="numeric"
//           />
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               Date: {stockDate.toISOString().split('T')[0]}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={stockDate}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setStockDate(selectedDate);
//               }}
//             />
//           )}
//           <View style={styles.modalButtons}>
//             <Button title="Submit" onPress={handleAddNewStock} />
//             <Button title="Cancel" onPress={() => setShowStockForm(false)} color="grey" />
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Stock Modal */}
//       <Modal visible={showStockEditForm} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalHeader}>Edit Stock</Text>
//           <Text style={styles.label}>Date</Text>
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowEditDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               {editStockDate.toISOString().split('T')[0]}
//             </Text>
//           </TouchableOpacity>
//           {showEditDatePicker && (
//             <DateTimePicker
//               value={editStockDate}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowEditDatePicker(false);
//                 if (selectedDate) setEditStockDate(selectedDate);
//               }}
//             />
//           )}
//           <Text style={styles.label}>Stock Name</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockName}
//             onChangeText={setEditStockName}
//           />
//           <Text style={styles.label}>Total Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockTotalQuantity}
//             onChangeText={setEditStockTotalQuantity}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Price</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockPrice}
//             onChangeText={setEditStockPrice}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Used Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockUsedQuantity}
//             onChangeText={setEditStockUsedQuantity}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Remaining Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockRemainingQuantity}
//             onChangeText={setEditStockRemainingQuantity}
//             keyboardType="numeric"
//           />
//           <View style={styles.modalButtons}>
//             <Button title="Update" onPress={handleUpdateStock} />
//             <Button title="Cancel" onPress={() => setShowStockEditForm(false)} color="grey" />
//           </View>
//         </View>
//       </Modal>
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
//   searchAddContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   list: {
//     flex: 1,
//   },
//   stockItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 10,
//   },
//   stockText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   viewButton: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   editButton: {
//     backgroundColor: '#FFC107',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   deleteButton: {
//     backgroundColor: '#F44336',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//   },
//   emptyText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#666',
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
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   dateButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   dateText: {
//     fontSize: 16,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
// });

// export default AddMaterial;









// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
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

// const All_Stocks = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { projectId } = route.params; // Get projectId from navigation params

//   const [stockData, setStockData] = useState([]);
//   const [stockName, setStockName] = useState('');
//   const [stockPrice, setStockPrice] = useState('');
//   const [stockQuantity, setStockQuantity] = useState('');
//   const [stockDate, setStockDate] = useState(new Date());
//   const [showStockForm, setShowStockForm] = useState(false);
//   const [searchStock, setSearchStock] = useState('');
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [stockEditId, setStockEditId] = useState('');
//   const [showStockEditForm, setShowStockEditForm] = useState(false);
//   const [editStockDate, setEditStockDate] = useState(new Date());
//   const [editStockName, setEditStockName] = useState('');
//   const [editStockTotalQuantity, setEditStockTotalQuantity] = useState('');
//   const [editStockPrice, setEditStockPrice] = useState('');
//   const [editStockUsedQuantity, setEditStockUsedQuantity] = useState('');
//   const [editStockRemainingQuantity, setEditStockRemainingQuantity] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showEditDatePicker, setShowEditDatePicker] = useState(false);
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

//   // Fetch all stocks for the project
//   useEffect(() => {
//     const fetchStocks = async () => {
//       setLoading(true);
//       try {
//         const token = await getToken();
//         if (!token) return;

//         const response = await axios.get(`${BASE_URL}/products/project/${projectId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         setStockData(response.data || []);
//       } catch (error) {
//         console.error('Error fetching stocks:', error);
//         Alert.alert('Error', 'Failed to load stocks');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStocks();
//   }, [projectId, refreshKey]);

//   // Filter stocks based on search
//   const filteredStocks = stockData.filter((item) =>
//     item.name.toLowerCase().includes(searchStock.toLowerCase())
//   );

//   // Handle adding new stock
//   const handleAddNewStock = async () => {
//     if (!stockName || !stockPrice || !stockQuantity) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }
//     if (isNaN(stockPrice) || isNaN(stockQuantity)) {
//       Alert.alert('Error', 'Price and Quantity must be numbers');
//       return;
//     }

//     const body = {
//       name: stockName,
//       price: parseFloat(stockPrice),
//       totalQuantityString: parseInt(stockQuantity, 10),
//       productAddOnDate: stockDate.toISOString().split('T')[0],
//       projectId,
//     };

//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.post(`${BASE_URL}/products/create`, body, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Stock Added Successfully');
//         setRefreshKey(refreshKey + 1);
//         setStockName('');
//         setStockPrice('');
//         setStockQuantity('');
//         setStockDate(new Date());
//         setShowStockForm(false);
//       }
//     } catch (error) {
//       console.error('Error adding stock:', error);
//       Alert.alert('Error', 'Failed to add stock');
//     }
//   };

//   // Handle stock deletion
//   const handleStockDelete = async (id) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this stock?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               const token = await getToken();
//               if (!token) return;

//               const response = await axios.delete(`${BASE_URL}/products/delete/${id}`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//               });
//               if (response.status === 200) {
//                 Alert.alert('Success', 'Stock Deleted Successfully');
//                 setRefreshKey(refreshKey + 1);
//               }
//             } catch (error) {
//               console.error('Error deleting stock:', error);
//               Alert.alert('Error', 'Failed to delete stock');
//             }
//           },
//         },
//       ]
//     );
//   };

//   // Handle fetching stock for editing
//   const handleEditStock = async (id) => {
//     setStockEditId(id);
//     setShowStockEditForm(true);
//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.get(`${BASE_URL}/products/get/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = response.data;
//       setEditStockDate(new Date(data?.productAddOnDate));
//       setEditStockPrice(data?.price?.toString() || '');
//       setEditStockRemainingQuantity(data?.remainingQuantity?.toString() || '');
//       setEditStockTotalQuantity(data?.totalQuantityString?.toString() || '');
//       setEditStockUsedQuantity(data?.usedQuantity?.toString() || '');
//       setEditStockName(data?.name || '');
//     } catch (error) {
//       console.error('Error fetching stock for edit:', error);
//       Alert.alert('Error', 'Failed to load stock details');
//     }
//   };

//   // Handle updating stock
//   const handleUpdateStock = async () => {
//     if (!editStockName || !editStockPrice || !editStockTotalQuantity) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
//     if (isNaN(editStockPrice) || isNaN(editStockTotalQuantity)) {
//       Alert.alert('Error', 'Price and Total Quantity must be numbers');
//       return;
//     }

//     const body = {
//       name: editStockName,
//       price: parseFloat(editStockPrice),
//       totalQuantityString: parseInt(editStockTotalQuantity, 10),
//       productAddOnDate: editStockDate.toISOString().split('T')[0],
//       projectId,
//     };

//     try {
//       const token = await getToken();
//       if (!token) return;

//       const response = await axios.put(`${BASE_URL}/products/edit/${stockEditId}`, body, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Stock Updated Successfully');
//         setRefreshKey(refreshKey + 1);
//         setShowStockEditForm(false);
//       }
//     } catch (error) {
//       console.error('Error updating stock:', error);
//       Alert.alert('Error', 'Failed to update stock');
//     }
//   };

//   // Render stock item
//   const renderStock = ({ item }) => (
//     <View style={styles.stockItem}>
//       <Text style={styles.stockText}>Date: {item.productAddOnDate}</Text>
//       <Text style={styles.stockText}>Name: {item.name}</Text>
//       <Text style={styles.stockText}>Quantity: {item.totalQuantityString}</Text>
//       <Text style={styles.stockText}>Price: ${item.price}</Text>
//       <Text style={styles.stockText}>Used: {item.usedQuantity || 0}</Text>
//       <Text style={styles.stockText}>Remaining: {item.remainingQuantity || 0}</Text>
//       <View style={styles.buttonContainer}>
//         <Button
//           title="View"
//           onPress={() => navigation.navigate('Stock_Details', { projectId: item.id, name: item.name })}
//         />
//         <Button title="Edit" onPress={() => handleEditStock(item.id)} color="orange" />
//         <Button title="Delete" onPress={() => handleStockDelete(item.id)} color="red" />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Stock Details</Text>

//       {/* Search and Add Stock Button */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Stock Name..."
//           value={searchStock}
//           onChangeText={setSearchStock}
//         />
//         <Button title="Add Stock" onPress={() => setShowStockForm(true)} />
//       </View>

//       {/* Stock List */}
//       {loading ? (
//         <Text style={styles.loadingText}>Loading stocks...</Text>
//       ) : filteredStocks.length === 0 ? (
//         <Text style={styles.emptyText}>No stocks available</Text>
//       ) : (
//         <FlatList
//           data={filteredStocks}
//           renderItem={renderStock}
//           keyExtractor={(item) => item.id.toString()}
//           style={styles.list}
//         />
//       )}

//       {/* Add Stock Modal */}
//       <Modal visible={showStockForm} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalHeader}>Add New Stock</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Stock Name"
//             value={stockName}
//             onChangeText={setStockName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Stock Price"
//             value={stockPrice}
//             onChangeText={setStockPrice}
//             keyboardType="numeric"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Stock Quantity"
//             value={stockQuantity}
//             onChangeText={setStockQuantity}
//             keyboardType="numeric"
//           />
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               Date: {stockDate.toISOString().split('T')[0]}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={stockDate}
//               mode="date"
//               onChange={(event, date) => {
//                 setShowDatePicker(false);
//                 if (date) setStockDate(date);
//               }}
//             />
//           )}
//           <View style={styles.modalButtons}>
//             <Button title="Submit" onPress={handleAddNewStock} />
//             <Button title="Cancel" onPress={() => setShowStockForm(false)} color="grey" />
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Stock Modal */}
//       <Modal visible={showStockEditForm} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalHeader}>Edit Stock</Text>
//           <Text style={styles.label}>Date</Text>
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowEditDatePicker(true)}
//           >
//             <Text style={styles.dateText}>
//               {editStockDate.toISOString().split('T')[0]}
//             </Text>
//           </TouchableOpacity>
//           {showEditDatePicker && (
//             <DateTimePicker
//               value={editStockDate}
//               mode="date"
//               onChange={(event, date) => {
//                 setShowEditDatePicker(false);
//                 if (date) setEditStockDate(date);
//               }}
//             />
//           )}
//           <Text style={styles.label}>Stock Name</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockName}
//             onChangeText={setEditStockName}
//           />
//           <Text style={styles.label}>Stock Total Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockTotalQuantity}
//             onChangeText={setEditStockTotalQuantity}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Stock Price</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockPrice}
//             onChangeText={setEditStockPrice}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Used Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockUsedQuantity}
//             onChangeText={setEditStockUsedQuantity}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Remaining Quantity</Text>
//           <TextInput
//             style={styles.input}
//             value={editStockRemainingQuantity}
//             onChangeText={setEditStockRemainingQuantity}
//             keyboardType="numeric"
//           />
//           <View style={styles.modalButtons}>
//             <Button title="Update" onPress={handleUpdateStock} />
//             <Button title="Cancel" onPress={() => setShowStockEditForm(false)} color="grey" />
//           </View>
//         </View>
//       </Modal>
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
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   list: {
//     flex: 1,
//   },
//   stockItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 10,
//   },
//   stockText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
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
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   dateButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   dateText: {
//     fontSize: 16,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
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

// export default All_Stocks;







import { BASE_URL } from '@/Api/BASE_URL.js';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
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

const All_Stocks = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId, name } = route.params; // Get projectId and name from navigation params

  const [stockData, setStockData] = useState([]);
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockDate, setStockDate] = useState(new Date());
  const [showStockForm, setShowStockForm] = useState(false);
  const [searchStock, setSearchStock] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [stockEditId, setStockEditId] = useState('');
  const [showStockEditForm, setShowStockEditForm] = useState(false);
  const [editStockDate, setEditStockDate] = useState(new Date());
  const [editStockName, setEditStockName] = useState('');
  const [editStockTotalQuantity, setEditStockTotalQuantity] = useState('');
  const [editStockPrice, setEditStockPrice] = useState('');
  const [editStockUsedQuantity, setEditStockUsedQuantity] = useState('');
  const [editStockRemainingQuantity, setEditStockRemainingQuantity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Fetch all stocks for the project
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/products/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setStockData(response.data || []);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      Alert.alert('Error', 'Failed to load stocks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [projectId]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchStocks();
    setRefreshing(false);
  }, [projectId]);

  // Filter stocks based on search
  const filteredStocks = stockData.filter((item) =>
    item.name.toLowerCase().includes(searchStock.toLowerCase())
  );

  // Handle adding new stock
  const handleAddNewStock = async () => {
    if (!stockName || !stockPrice || !stockQuantity) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (isNaN(stockPrice) || isNaN(stockQuantity)) {
      Alert.alert('Error', 'Price and Quantity must be numbers');
      return;
    }

    const body = {
      name: stockName,
      price: parseFloat(stockPrice),
      totalQuantityString: parseInt(stockQuantity, 10),
      productAddOnDate: stockDate.toISOString().split('T')[0],
      projectId,
    };

    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.post(`${BASE_URL}/products/create`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Stock Added Successfully');
        await fetchStocks();
        setStockName('');
        setStockPrice('');
        setStockQuantity('');
        setStockDate(new Date());
        setShowStockForm(false);
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      Alert.alert('Error', 'Failed to add stock');
    }
  };

  // Handle stock deletion
  const handleStockDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this stock?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await getToken();
              if (!token) return;

              const response = await axios.delete(`${BASE_URL}/products/delete/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              if (response.status === 200) {
                Alert.alert('Success', 'Stock Deleted Successfully');
                await fetchStocks();
              }
            } catch (error) {
              console.error('Error deleting stock:', error);
              Alert.alert('Error', 'Failed to delete stock');
            }
          },
        },
      ]
    );
  };

  // Handle fetching stock for editing
  const handleEditStock = async (id) => {
    setStockEditId(id);
    setShowStockEditForm(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/products/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      setEditStockDate(new Date(data?.productAddOnDate));
      setEditStockPrice(data?.price?.toString() || '');
      setEditStockRemainingQuantity(data?.remainingQuantity?.toString() || '');
      setEditStockTotalQuantity(data?.totalQuantityString?.toString() || '');
      setEditStockUsedQuantity(data?.usedQuantity?.toString() || '');
      setEditStockName(data?.name || '');
    } catch (error) {
      console.error('Error fetching stock for edit:', error);
      Alert.alert('Error', 'Failed to load stock details');
    }
  };

  // Handle updating stock
  const handleUpdateStock = async () => {
    if (!editStockName || !editStockPrice || !editStockTotalQuantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (isNaN(editStockPrice) || isNaN(editStockTotalQuantity)) {
      Alert.alert('Error', 'Price and Total Quantity must be numbers');
      return;
    }

    const body = {
      name: editStockName,
      price: parseFloat(editStockPrice),
      totalQuantityString: parseInt(editStockTotalQuantity, 10),
      productAddOnDate: editStockDate.toISOString().split('T')[0],
      projectId,
    };

    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.put(`${BASE_URL}/products/edit/${stockEditId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Stock Updated Successfully');
        await fetchStocks();
        setShowStockEditForm(false);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      Alert.alert('Error', 'Failed to update stock');
    }
  };

  // Render stock item
  const renderStock = ({ item }) => {
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
        style={styles.stockItem}
        onPress={() => navigation.navigate('Stock_Details', { projectId: item.id, name: item.name })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.stockCard, { transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.cardGradient}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="inventory-2" size={24} color="#007AFF" />
              </View>
              <Text style={styles.stockName} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.stockInfo}>
                <Text style={styles.stockDetail}>ID: {item.id}</Text>
                <Text style={styles.stockDetail}>Date: {item.productAddOnDate}</Text>
                <Text style={styles.stockDetail}>Price: ${item.price}</Text>
              </View>
              <View style={styles.stockInfo}>
                <Text style={styles.stockDetail}>Total: {item.totalQuantityString}</Text>
                <Text style={styles.stockDetail}>Used: {item.usedQuantity || 0}</Text>
                <Text style={styles.stockDetail}>Remaining: {item.remainingQuantity || 0}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Stock_Details', { projectId: item.id, name: item.name })}
              >
                <Text style={styles.actionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditStock(item.id)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleStockDelete(item.id)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
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
          <Text style={styles.header}>{name}</Text>
        </View>
        <Text style={styles.subHeader}>Stock Inventory</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <MaterialIcons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Stock Name..."
            value={searchStock}
            onChangeText={setSearchStock}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowStockForm(true)}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Stock</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading stocks...</Text>
        </View>
      ) : filteredStocks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={48} color="#6B7280" />
          <Text style={styles.emptyText}>No stocks available</Text>
          <Text style={styles.emptySubText}>Add a stock or pull to refresh</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStocks}
          renderItem={renderStock}
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

      {/* Add Stock Modal */}
      <Modal visible={showStockForm} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Add New Stock</Text>
                <TouchableOpacity onPress={() => setShowStockForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Stock Name"
                value={stockName}
                onChangeText={setStockName}
              />
              <TextInput
                style={styles.input}
                placeholder="Stock Price"
                value={stockPrice}
                onChangeText={setStockPrice}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Stock Quantity"
                value={stockQuantity}
                onChangeText={setStockQuantity}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  Date: {stockDate.toISOString().split('T')[0]}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={stockDate}
                  mode="date"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setStockDate(date);
                  }}
                />
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleAddNewStock}
                >
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowStockForm(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Edit Stock Modal */}
      <Modal visible={showStockEditForm} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#ffffff', '#f9fafb']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Edit Stock</Text>
                <TouchableOpacity onPress={() => setShowStockEditForm(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEditDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {editStockDate.toISOString().split('T')[0]}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
              </TouchableOpacity>
              {showEditDatePicker && (
                <DateTimePicker
                  value={editStockDate}
                  mode="date"
                  onChange={(event, date) => {
                    setShowEditDatePicker(false);
                    if (date) setEditStockDate(date);
                  }}
                />
              )}
              <Text style={styles.label}>Stock Name</Text>
              <TextInput
                style={styles.input}
                value={editStockName}
                onChangeText={setEditStockName}
              />
              <Text style={styles.label}>Stock Total Quantity</Text>
              <TextInput
                style={styles.input}
                value={editStockTotalQuantity}
                onChangeText={setEditStockTotalQuantity}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Stock Price</Text>
              <TextInput
                style={styles.input}
                value={editStockPrice}
                onChangeText={setEditStockPrice}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Used Quantity</Text>
              <TextInput
                style={styles.input}
                value={editStockUsedQuantity}
                onChangeText={setEditStockUsedQuantity}
                keyboardType="numeric"
                editable={false}
                // style={[styles.input, styles.disabledInput]}
              />
              <Text style={styles.label}>Remaining Quantity</Text>
              <TextInput
                style={styles.input}
                value={editStockRemainingQuantity}
                onChangeText={setEditStockRemainingQuantity}
                keyboardType="numeric"
                editable={false}
                // style={[styles.input, styles.disabledInput]}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleUpdateStock}
                >
                  <Text style={styles.modalButtonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowStockEditForm(false)}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  stockItem: {
    marginBottom: 16,
  },
  stockCard: {
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
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stockInfo: {
    gap: 4,
  },
  stockDetail: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  editButton: {
    backgroundColor: '#F59E0B',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  disabledInput: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
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
});

export default All_Stocks;