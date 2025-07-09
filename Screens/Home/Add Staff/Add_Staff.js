// // import { BASE_URL } from '@/Api/BASE_URL.js';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { Picker } from '@react-native-picker/picker';
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import {
// //     Alert,
// //     Button,
// //     FlatList,
// //     StyleSheet,
// //     Text,
// //     TextInput,
// //     View
// // } from 'react-native';

// // const Add_Staff = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [supervisorList, setSupervisorList] = useState([]);
// //   const [superVisorId, setSuperVisorId] = useState('');
// //   const [showSitePicker, setShowSitePicker] = useState(false);
// //   const [siteList, setSiteList] = useState([]);
// //   const [residencyId, setResidencyId] = useState('');
// //   const [refreshKey, setRefreshKey] = useState(0);
// //   const [removeSitePicker, setRemoveSitePicker] = useState(false);
// //   const [removeSuperVisorId, setRemoveSuperVisorId] = useState('');

// //   // Fetch JWT token from AsyncStorage
// //   const getToken = async () => {
// //     try {
// //       return await AsyncStorage.getItem('jwtToken');
// //     } catch (error) {
// //       console.error('Error fetching token:', error);
// //       return null;
// //     }
// //   };

// //   // Handle form submission for registering a supervisor
// //   const handleSubmit = async () => {
// //     if (!name || !email || !password) {
// //       Alert.alert('Error', 'Please fill in all fields');
// //       return;
// //     }

// //     const formData = { name, email, password };
// //     try {
// //       const token = await getToken();
// //       const response = await axios.post(`${BASE_URL}/registerSuperisor`, formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });
// //       if (response.data) {
// //         Alert.alert('Success', 'Supervisor Added Successfully');
// //         setRefreshKey(refreshKey + 1);
// //         setName('');
// //         setEmail('');
// //         setPassword('');
// //       }
// //     } catch (error) {
// //       console.error('Error registering supervisor:', error);
// //       Alert.alert('Error', 'Failed to add supervisor');
// //     }
// //   };

// //   // Fetch all supervisors
// //   useEffect(() => {
// //     const getAllSupervisors = async () => {
// //       try {
// //         const token = await getToken();
// //         const response = await axios.get(`${BASE_URL}/AllSuperisor`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         });
// //         setSupervisorList(response.data);
// //       } catch (error) {
// //         console.error('Error fetching supervisors:', error);
// //       }
// //     };
// //     getAllSupervisors();
// //   }, [refreshKey]);

// //   // Fetch all sites
// //   useEffect(() => {
// //     const getSiteNames = async () => {
// //       try {
// //         const token = await getToken();
// //         const response = await axios.get(`${BASE_URL}/getAllProjects`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         });
// //         setSiteList(response.data);
// //       } catch (error) {
// //         console.error('Error fetching sites:', error);
// //       }
// //     };
// //     getSiteNames();
// //   }, []);

// //   // Handle adding a site to a supervisor
// //   const handleAddSite = async () => {
// //     if (!residencyId) {
// //       Alert.alert('Error', 'Please select a site');
// //       return;
// //     }
// //     try {
// //       const token = await getToken();
// //       const response = await axios.put(
// //         `${BASE_URL}/allowedSiteSupervisor/${superVisorId}/${residencyId}`,
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );
// //       if (response.status === 200) {
// //         Alert.alert('Success', 'Site added successfully');
// //         setShowSitePicker(false);
// //         setRefreshKey(refreshKey + 1);
// //       }
// //     } catch (error) {
// //       console.error('Error adding site:', error);
// //       Alert.alert('Error', 'Failed to add site');
// //     }
// //   };

// //   // Handle removing a site from a supervisor
// //   const handleRemoveSite = async () => {
// //     if (!residencyId) {
// //       Alert.alert('Error', 'Please select a site');
// //       return;
// //     }
// //     try {
// //       const token = await getToken();
// //       const response = await axios.put(
// //         `${BASE_URL}/releaseSiteSupervisor/${removeSuperVisorId}/${residencyId}`,
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );
// //       if (response.status === 200) {
// //         Alert.alert('Success', 'Site removed successfully');
// //         setRemoveSitePicker(false);
// //         setRefreshKey(refreshKey + 1);
// //       }
// //     } catch (error) {
// //       console.error('Error removing site:', error);
// //       Alert.alert('Error', 'Failed to remove site');
// //     }
// //   };

// //   // Render supervisor item in FlatList
// //   const renderSupervisor = ({ item }) => (
// //     <View style={styles.supervisorItem}>
// //       <Text style={styles.supervisorText}>{item.name}</Text>
// //       <Text style={styles.supervisorText}>{item.email}</Text>
// //       <Text style={styles.supervisorText}>
// //         Sites: {item.allowedSite?.map(site => site.name).join(', ') || 'None'}
// //       </Text>
// //       <View style={styles.buttonContainer}>
// //         <Button
// //           title="Allot Site"
// //           onPress={() => {
// //             setSuperVisorId(item.id);
// //             setShowSitePicker(true);
// //           }}
// //         />
// //         <Button
// //           title="Remove Site"
// //           onPress={() => {
// //             setRemoveSuperVisorId(item.id);
// //             setRemoveSitePicker(true);
// //           }}
// //           color="red"
// //         />
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Supervisor Registration</Text>

// //       {/* Registration Form */}
// //       <View style={styles.form}>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Name"
// //           value={name}
// //           onChangeText={setName}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Email"
// //           value={email}
// //           onChangeText={setEmail}
// //           keyboardType="email-address"
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //         />
// //         <Button title="Submit" onPress={handleSubmit} />
// //       </View>

// //       {/* Supervisor List */}
// //       <FlatList
// //         data={supervisorList}
// //         renderItem={renderSupervisor}
// //         keyExtractor={item => item.id.toString()}
// //         style={styles.list}
// //       />

// //       {/* Add Site Picker */}
// //       {showSitePicker && (
// //         <View style={styles.pickerContainer}>
// //           <Text style={styles.pickerHeader}>Add Supervisor to Site</Text>
// //           <Picker
// //             selectedValue={residencyId}
// //             onValueChange={setResidencyId}
// //             style={styles.picker}
// //           >
// //             <Picker.Item label="Select Site" value="" />
// //             {siteList.map(item => (
// //               <Picker.Item key={item.id} label={item.name} value={item.id} />
// //             ))}
// //           </Picker>
// //           <View style={styles.pickerButtons}>
// //             <Button title="Submit" onPress={handleAddSite} />
// //             <Button title="Cancel" onPress={() => setShowSitePicker(false)} color="grey" />
// //           </View>
// //         </View>
// //       )}

// //       {/* Remove Site Picker */}
// //       {removeSitePicker && (
// //         <View style={styles.pickerContainer}>
// //           <Text style={styles.pickerHeader}>Remove Supervisor from Site</Text>
// //           <Picker
// //             selectedValue={residencyId}
// //             onValueChange={setResidencyId}
// //             style={styles.picker}
// //           >
// //             <Picker.Item label="Select Site" value="" />
// //             {siteList.map(item => (
// //               <Picker.Item key={item.id} label={item.name} value={item.id} />
// //             ))}
// //           </Picker>
// //           <View style={styles.pickerButtons}>
// //             <Button title="Remove" onPress={handleRemoveSite} color="red" />
// //             <Button title="Cancel" onPress={() => setRemoveSitePicker(false)} color="grey" />
// //           </View>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginVertical: 20,
// //   },
// //   form: {
// //     marginBottom: 20,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     marginBottom: 10,
// //     borderRadius: 5,
// //   },
// //   list: {
// //     flex: 1,
// //   },
// //   supervisorItem: {
// //     padding: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //   },
// //   supervisorText: {
// //     fontSize: 16,
// //     marginBottom: 5,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 10,
// //   },
// //   pickerContainer: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: '#fff',
// //     padding: 20,
// //     borderTopWidth: 1,
// //     borderTopColor: '#ccc',
// //   },
// //   pickerHeader: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   picker: {
// //     height: 150,
// //     width: '100%',
// //   },
// //   pickerButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 10,
// //   },
// // });

// // export default Add_Staff;










// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { Picker } from "@react-native-picker/picker"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     FlatList,
//     Modal,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native"

// const { width, height } = Dimensions.get("window")

// const Add_Staff = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [supervisorList, setSupervisorList] = useState([])
//   const [superVisorId, setSuperVisorId] = useState("")
//   const [showSitePicker, setShowSitePicker] = useState(false)
//   const [siteList, setSiteList] = useState([])
//   const [residencyId, setResidencyId] = useState("")
//   const [refreshKey, setRefreshKey] = useState(0)
//   const [removeSitePicker, setRemoveSitePicker] = useState(false)
//   const [removeSuperVisorId, setRemoveSuperVisorId] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [submitLoading, setSubmitLoading] = useState(false)

//   // Fetch JWT token from AsyncStorage
//   const getToken = async () => {
//     try {
//       return await AsyncStorage.getItem("jwtToken")
//     } catch (error) {
//       console.error("Error fetching token:", error)
//       return null
//     }
//   }

//   // Handle form submission for registering a supervisor
//   const handleSubmit = async () => {
//     if (!name || !email || !password) {
//       Alert.alert("Error", "Please fill in all fields")
//       return
//     }

//     const formData = { name, email, password }
//     setSubmitLoading(true)

//     try {
//       const token = await getToken()
//       const response = await axios.post(`${BASE_URL}/registerSuperisor`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.data) {
//         Alert.alert("Success", "Supervisor Added Successfully")
//         setRefreshKey(refreshKey + 1)
//         setName("")
//         setEmail("")
//         setPassword("")
//       }
//     } catch (error) {
//       console.error("Error registering supervisor:", error)
//       Alert.alert("Error", "Failed to add supervisor")
//     } finally {
//       setSubmitLoading(false)
//     }
//   }

//   // Fetch all supervisors
//   useEffect(() => {
//     const getAllSupervisors = async () => {
//       setLoading(true)
//       try {
//         const token = await getToken()
//         const response = await axios.get(`${BASE_URL}/AllSuperisor`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })
//         setSupervisorList(response.data)
//       } catch (error) {
//         console.error("Error fetching supervisors:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     getAllSupervisors()
//   }, [refreshKey])

//   // Fetch all sites
//   useEffect(() => {
//     const getSiteNames = async () => {
//       try {
//         const token = await getToken()
//         const response = await axios.get(`${BASE_URL}/getAllProjects`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })
//         setSiteList(response.data)
//       } catch (error) {
//         console.error("Error fetching sites:", error)
//       }
//     }

//     getSiteNames()
//   }, [])

//   // Handle adding a site to a supervisor
//   const handleAddSite = async () => {
//     if (!residencyId) {
//       Alert.alert("Error", "Please select a site")
//       return
//     }

//     try {
//       const token = await getToken()
//       const response = await axios.put(
//         `${BASE_URL}/allowedSiteSupervisor/${superVisorId}/${residencyId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.status === 200) {
//         Alert.alert("Success", "Site added successfully")
//         setShowSitePicker(false)
//         setResidencyId("")
//         setRefreshKey(refreshKey + 1)
//       }
//     } catch (error) {
//       console.error("Error adding site:", error)
//       Alert.alert("Error", "Failed to add site")
//     }
//   }

//   // Handle removing a site from a supervisor
//   const handleRemoveSite = async () => {
//     if (!residencyId) {
//       Alert.alert("Error", "Please select a site")
//       return
//     }

//     try {
//       const token = await getToken()
//       const response = await axios.put(
//         `${BASE_URL}/releaseSiteSupervisor/${removeSuperVisorId}/${residencyId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (response.status === 200) {
//         Alert.alert("Success", "Site removed successfully")
//         setRemoveSitePicker(false)
//         setResidencyId("")
//         setRefreshKey(refreshKey + 1)
//       }
//     } catch (error) {
//       console.error("Error removing site:", error)
//       Alert.alert("Error", "Failed to remove site")
//     }
//   }

//   // Render supervisor item in FlatList
//   const renderSupervisor = ({ item }) => (
//     <View style={styles.supervisorCard}>
//       <View style={styles.supervisorHeader}>
//         <View style={styles.avatarContainer}>
//           <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
//         </View>
//         <View style={styles.supervisorInfo}>
//           <Text style={styles.supervisorName}>{item.name}</Text>
//           <Text style={styles.supervisorEmail}>{item.email}</Text>
//         </View>
//       </View>

//       <View style={styles.sitesContainer}>
//         <Text style={styles.sitesLabel}>Assigned Sites:</Text>
//         <Text style={styles.sitesText}>
//           {item.allowedSite?.map((site) => site.name).join(", ") || "No sites assigned"}
//         </Text>
//       </View>

//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.addButton]}
//           onPress={() => {
//             setSuperVisorId(item.id)
//             setShowSitePicker(true)
//           }}
//         >
//           <Text style={styles.addButtonText}>+ Add Site</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionButton, styles.removeButton]}
//           onPress={() => {
//             setRemoveSuperVisorId(item.id)
//             setRemoveSitePicker(true)
//           }}
//         >
//           <Text style={styles.removeButtonText}>- Remove Site</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )

//   const renderEmptyList = () => (
//     <View style={styles.emptyContainer}>
//       <Text style={styles.emptyText}>No supervisors found</Text>
//       <Text style={styles.emptySubText}>Add your first supervisor using the form above</Text>
//     </View>
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Staff Management</Text>
//           <Text style={styles.headerSubtitle}>Add and manage supervisors</Text>
//         </View>

//         {/* Registration Form */}
//         <View style={styles.formCard}>
//           <Text style={styles.formTitle}>Add New Supervisor</Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Full Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter full name"
//               value={name}
//               onChangeText={setName}
//               placeholderTextColor="#9ca3af"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Email Address</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter email address"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               placeholderTextColor="#9ca3af"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               placeholderTextColor="#9ca3af"
//             />
//           </View>

//           <TouchableOpacity
//             style={[styles.submitButton, submitLoading && styles.submitButtonDisabled]}
//             onPress={handleSubmit}
//             disabled={submitLoading}
//           >
//             {submitLoading ? (
//               <ActivityIndicator color="#ffffff" size="small" />
//             ) : (
//               <Text style={styles.submitButtonText}>Add Supervisor</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Supervisor List */}
//         <View style={styles.listContainer}>
//           <Text style={styles.listTitle}>Supervisors ({supervisorList.length})</Text>

//           {loading ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" color="#3b82f6" />
//               <Text style={styles.loadingText}>Loading supervisors...</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={supervisorList}
//               renderItem={renderSupervisor}
//               keyExtractor={(item) => item.id.toString()}
//               showsVerticalScrollIndicator={false}
//               ListEmptyComponent={renderEmptyList}
//               scrollEnabled={false}
//             />
//           )}
//         </View>
//       </ScrollView>

//       {/* Add Site Modal */}
//       <Modal
//         visible={showSitePicker}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowSitePicker(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Assign Site to Supervisor</Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   setShowSitePicker(false)
//                   setResidencyId("")
//                 }}
//                 style={styles.closeButton}
//               >
//                 <Text style={styles.closeButtonText}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.pickerContainer}>
//               <Text style={styles.pickerLabel}>Select Site</Text>
//               <View style={styles.pickerWrapper}>
//                 <Picker selectedValue={residencyId} onValueChange={setResidencyId} style={styles.picker}>
//                   <Picker.Item label="Choose a site..." value="" />
//                   {siteList.map((item) => (
//                     <Picker.Item key={item.id} label={item.name} value={item.id} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => {
//                   setShowSitePicker(false)
//                   setResidencyId("")
//                 }}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleAddSite}>
//                 <Text style={styles.confirmButtonText}>Assign Site</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Remove Site Modal */}
//       <Modal
//         visible={removeSitePicker}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setRemoveSitePicker(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Remove Site from Supervisor</Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   setRemoveSitePicker(false)
//                   setResidencyId("")
//                 }}
//                 style={styles.closeButton}
//               >
//                 <Text style={styles.closeButtonText}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.pickerContainer}>
//               <Text style={styles.pickerLabel}>Select Site to Remove</Text>
//               <View style={styles.pickerWrapper}>
//                 <Picker selectedValue={residencyId} onValueChange={setResidencyId} style={styles.picker}>
//                   <Picker.Item label="Choose a site..." value="" />
//                   {siteList.map((item) => (
//                     <Picker.Item key={item.id} label={item.name} value={item.id} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => {
//                   setRemoveSitePicker(false)
//                   setResidencyId("")
//                 }}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={[styles.modalButton, styles.removeConfirmButton]} onPress={handleRemoveSite}>
//                 <Text style={styles.removeConfirmButtonText}>Remove Site</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: "#6b7280",
//   },
//   formCard: {
//     backgroundColor: "#ffffff",
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   formTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1f2937",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#374151",
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//     backgroundColor: "#ffffff",
//     color: "#1f2937",
//   },
//   submitButton: {
//     backgroundColor: "#3b82f6",
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   submitButtonDisabled: {
//     backgroundColor: "#9ca3af",
//   },
//   submitButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   listTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#1f2937",
//     marginBottom: 16,
//   },
//   supervisorCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   supervisorHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   avatarContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#3b82f6",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 16,
//   },
//   avatarText: {
//     color: "#ffffff",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   supervisorInfo: {
//     flex: 1,
//   },
//   supervisorName: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1f2937",
//     marginBottom: 4,
//   },
//   supervisorEmail: {
//     fontSize: 14,
//     color: "#6b7280",
//   },
//   sitesContainer: {
//     marginBottom: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#f3f4f6",
//   },
//   sitesLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#374151",
//     marginBottom: 8,
//   },
//   sitesText: {
//     fontSize: 14,
//     color: "#6b7280",
//     lineHeight: 20,
//   },
//   actionButtons: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   actionButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   addButton: {
//     backgroundColor: "#10b981",
//   },
//   addButtonText: {
//     color: "#ffffff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   removeButton: {
//     backgroundColor: "#ffffff",
//     borderWidth: 1,
//     borderColor: "#ef4444",
//   },
//   removeButtonText: {
//     color: "#ef4444",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   loadingContainer: {
//     alignItems: "center",
//     paddingVertical: 40,
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#6b7280",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#6b7280",
//     marginBottom: 8,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: "#9ca3af",
//     textAlign: "center",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   modalContainer: {
//     backgroundColor: "#ffffff",
//     borderRadius: 20,
//     width: "100%",
//     maxWidth: 400,
//     maxHeight: height * 0.8,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 24,
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f3f4f6",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1f2937",
//     flex: 1,
//   },
//   closeButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#f3f4f6",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: "#6b7280",
//     fontWeight: "bold",
//   },
//   pickerContainer: {
//     padding: 24,
//   },
//   pickerLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#374151",
//     marginBottom: 12,
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 12,
//     backgroundColor: "#ffffff",
//   },
//   picker: {
//     height: 50,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     paddingHorizontal: 24,
//     paddingBottom: 24,
//     gap: 12,
//   },
//   modalButton: {
//     flex: 1,
//     paddingVertical: 14,
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
//   confirmButton: {
//     backgroundColor: "#3b82f6",
//   },
//   confirmButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   removeConfirmButton: {
//     backgroundColor: "#ef4444",
//   },
//   removeConfirmButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// })

// export default Add_Staff








"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"
import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

const { width, height } = Dimensions.get("window")

const Add_Staff = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [supervisorList, setSupervisorList] = useState([])
  const [superVisorId, setSuperVisorId] = useState("")
  const [showSitePicker, setShowSitePicker] = useState(false)
  const [siteList, setSiteList] = useState([])
  const [residencyId, setResidencyId] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [removeSitePicker, setRemoveSitePicker] = useState(false)
  const [removeSuperVisorId, setRemoveSuperVisorId] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  // Fetch JWT token from AsyncStorage
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("jwtToken")
    } catch (error) {
      console.error("Error fetching token:", error)
      return null
    }
  }

  // Handle form submission for registering a supervisor
  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const formData = { name, email, password }
    setSubmitLoading(true)

    try {
      const token = await getToken()
      const response = await axios.post(`${BASE_URL}/registerSuperisor`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data) {
        Alert.alert("Success", "Supervisor Added Successfully")
        setRefreshKey(refreshKey + 1)
        setName("")
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      console.error("Error registering supervisor:", error)
      Alert.alert("Error", "Failed to add supervisor")
    } finally {
      setSubmitLoading(false)
    }
  }

  // Fetch all supervisors
  useEffect(() => {
    const getAllSupervisors = async () => {
      setLoading(true)
      try {
        const token = await getToken()
        const response = await axios.get(`${BASE_URL}/AllSuperisor`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        setSupervisorList(response.data)
      } catch (error) {
        console.error("Error fetching supervisors:", error)
      } finally {
        setLoading(false)
      }
    }

    getAllSupervisors()
  }, [refreshKey])

  // Fetch all sites
  useEffect(() => {
    const getSiteNames = async () => {
      try {
        const token = await getToken()
        const response = await axios.get(`${BASE_URL}/getAllProjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        setSiteList(response.data)
      } catch (error) {
        console.error("Error fetching sites:", error)
      }
    }

    getSiteNames()
  }, [])

  // Handle adding a site to a supervisor
  const handleAddSite = async () => {
    if (!residencyId) {
      Alert.alert("Error", "Please select a site")
      return
    }

    try {
      const token = await getToken()
      const response = await axios.put(
        `${BASE_URL}/allowedSiteSupervisor/${superVisorId}/${residencyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        Alert.alert("Success", "Site added successfully")
        setShowSitePicker(false)
        setResidencyId("")
        setRefreshKey(refreshKey + 1)
      }
    } catch (error) {
      console.error("Error adding site:", error)
      Alert.alert("Error", "Failed to add site")
    }
  }

  // Handle removing a site from a supervisor
  const handleRemoveSite = async () => {
    if (!residencyId) {
      Alert.alert("Error", "Please select a site")
      return
    }

    try {
      const token = await getToken()
      const response = await axios.put(
        `${BASE_URL}/releaseSiteSupervisor/${removeSuperVisorId}/${residencyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.status === 200) {
        Alert.alert("Success", "Site removed successfully")
        setRemoveSitePicker(false)
        setResidencyId("")
        setRefreshKey(refreshKey + 1)
      }
    } catch (error) {
      console.error("Error removing site:", error)
      Alert.alert("Error", "Failed to remove site")
    }
  }

  // Render supervisor item in FlatList
  const renderSupervisor = ({ item }) => (
    <View style={styles.supervisorCard}>
      <View style={styles.supervisorHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.supervisorInfo}>
          <Text style={styles.supervisorName}>{item.name}</Text>
          <Text style={styles.supervisorEmail}>{item.email}</Text>
        </View>
      </View>

      <View style={styles.sitesContainer}>
        <Text style={styles.sitesLabel}>Assigned Sites:</Text>
        <Text style={styles.sitesText}>
          {item.allowedSite?.map((site) => site.name).join(", ") || "No sites assigned"}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addButton]}
          onPress={() => {
            setSuperVisorId(item.id)
            setShowSitePicker(true)
          }}
        >
          <Text style={styles.addButtonText}>+ Add Site</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => {
            setRemoveSuperVisorId(item.id)
            setRemoveSitePicker(true)
          }}
        >
          <Text style={styles.removeButtonText}>- Remove Site</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No supervisors found</Text>
      <Text style={styles.emptySubText}>Add your first supervisor using the form above</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Staff Management</Text>
          <Text style={styles.headerSubtitle}>Add and manage supervisors</Text>
        </View>

        {/* Add Supervisor Button */}
        <TouchableOpacity style={styles.addSupervisorButton} onPress={() => setShowFormModal(true)}>
          <Text style={styles.addSupervisorButtonText}>+ Add New Supervisor</Text>
        </TouchableOpacity>

        {/* Supervisor List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Supervisors ({supervisorList.length})</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.loadingText}>Loading supervisors...</Text>
            </View>
          ) : (
            <FlatList
              data={supervisorList}
              renderItem={renderSupervisor}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyList}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Add Site Modal */}
      <Modal
        visible={showSitePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSitePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Assign Site to Supervisor</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSitePicker(false)
                  setResidencyId("")
                }}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Site</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={residencyId} onValueChange={setResidencyId} style={styles.picker}>
                  <Picker.Item label="Choose a site..." value="" />
                  {siteList.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowSitePicker(false)
                  setResidencyId("")
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleAddSite}>
                <Text style={styles.confirmButtonText}>Assign Site</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Remove Site Modal */}
      <Modal
        visible={removeSitePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRemoveSitePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Remove Site from Supervisor</Text>
              <TouchableOpacity
                onPress={() => {
                  setRemoveSitePicker(false)
                  setResidencyId("")
                }}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Site to Remove</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={residencyId} onValueChange={setResidencyId} style={styles.picker}>
                  <Picker.Item label="Choose a site..." value="" />
                  {siteList.map((item) => (
                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setRemoveSitePicker(false)
                  setResidencyId("")
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.removeConfirmButton]} onPress={handleRemoveSite}>
                <Text style={styles.removeConfirmButtonText}>Remove Site</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Supervisor Form Modal */}
      <Modal
        visible={showFormModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFormModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.formModalContainer]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Supervisor</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowFormModal(false)
                  setName("")
                  setEmail("")
                  setPassword("")
                }}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formModalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </ScrollView>

            <View style={styles.formModalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowFormModal(false)
                  setName("")
                  setEmail("")
                  setPassword("")
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, submitLoading && styles.submitButtonDisabled]}
                onPress={async () => {
                  await handleSubmit()
                  if (name === "" && email === "" && password === "") {
                    setShowFormModal(false)
                  }
                }}
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={styles.confirmButtonText}>Add Supervisor</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  addSupervisorButton: {
    backgroundColor: "#3b82f6",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addSupervisorButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  supervisorCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  supervisorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  supervisorInfo: {
    flex: 1,
  },
  supervisorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  supervisorEmail: {
    fontSize: 14,
    color: "#6b7280",
  },
  sitesContainer: {
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  sitesLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  sitesText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#10b981",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  removeButtonText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6b7280",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "bold",
  },
  pickerContainer: {
    padding: 24,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  picker: {
    height: 50,
  },
  modalButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#3b82f6",
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  removeConfirmButton: {
    backgroundColor: "#ef4444",
  },
  removeConfirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  formModalContainer: {
    maxHeight: height * 0.85,
  },
  formModalContent: {
    paddingHorizontal: 24,
    maxHeight: height * 0.5,
  },
  formModalButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
})

export default Add_Staff
