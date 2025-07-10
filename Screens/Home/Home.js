
// import {
//   Feather,
//   FontAwesome,
//   FontAwesome5,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons
// } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { } from 'react-native-responsive-screen';

// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = (width - 60) / 2;

// const MenuGridItem = ({ title, icon, color, onPress, progress }) => {
//   return (
//     <TouchableOpacity 
//       style={styles.gridItem} 
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.gridItemContent}>
//         <View style={[styles.gridIconContainer, { backgroundColor: `${color}15` }]}>
//           {icon}
//         </View>
//         <Text style={styles.gridItemTitle}>{title}</Text>
        
//         {progress !== undefined && (
//           <View style={styles.progressContainer}>
//             <View style={styles.progressBar}>
//               <View 
//                 style={[
//                   styles.progressFill, 
//                   { width: `${progress}%`, backgroundColor: color }
//                 ]} 
//               />
//             </View>
//             <Text style={styles.progressText}>{progress}%</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const Home = ({ navigation }) => {
//   const [textAnimation] = useState(new Animated.Value(0));
//   const [displayText, setDisplayText] = useState('');
//   const fullText = 'AG-Construction';

//   useEffect(() => {
//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       if (currentIndex <= fullText.length) {
//         setDisplayText(fullText.slice(0, currentIndex));
//         currentIndex++;
//       } else {
//         clearInterval(typingInterval);
//         Animated.loop(
//           Animated.sequence([
//             Animated.timing(textAnimation, {
//               toValue: 1,
//               duration: 2000,
//               useNativeDriver: true,
//             }),
//             Animated.timing(textAnimation, {
//               toValue: 0,
//               duration: 2000,
//               useNativeDriver: true,
//             }),
//           ])
//         ).start();
//       }
//     }, 150);

//     return () => clearInterval(typingInterval);
//   }, [textAnimation]);

//   const scale = textAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1.03]
//   });

//   const opacity = textAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.85, 1]
//   });



//   const menuItems = [
//     { 
//       title: 'Lead Management', 
//       icon: <Ionicons name="people" size={24} color="#4A6FFF" />,
//       color: '#4A6FFF',
//       navigate: 'Lead_Management',
//       progress: 75
//     },
//     { 
//       title: 'Land Management', 
//       icon: <MaterialIcons name="request-quote" size={24} color="#FF6B6B" />,
//       color: '#FF6B6B',
//       navigate: 'Land_Management',
//       progress: 60
//     },
//     { 
//       title: 'Flat Management', 
//       icon: <MaterialIcons name="assignment" size={24} color="#FFB100" />,
//       color: '#FFB100',
//       navigate: 'Flat_Management',
//       progress: 45
//     },
//     { 
//       title: 'Add Staff', 
//       icon: <FontAwesome5 name="users" size={22} color="#00C49A" />,
//       color: '#00C49A',
//       navigate: 'Add_Staff',
//       progress: 90
//     },
//     { 
//       title: 'Stock Management', 
//       icon: <MaterialIcons name="trending-up" size={24} color="#9C27B0" />,
//       color: '#9C27B0',
//       navigate: 'Stock_Management'
//     },
//     { 
//       title: 'Structure', 
//       icon: <MaterialCommunityIcons name="cog-transfer" size={24} color="#3F51B5" />,
//       color: '#3F51B5',
//       navigate: 'Structure_Management',

//     },
//     { 
//       title: 'Customer Details', 
//       icon: <MaterialIcons name="account-balance" size={24} color="#009688" />,
//       color: '#009688',
//       navigate: 'Customer_Details'
//     },
//     { 
//       title: 'Letters', 
//       icon: <MaterialIcons name="business-center" size={24} color="#607D8B" />,
//       color: '#607D8B',
//       navigate: 'Letter'
//     },
//   ];

//   const [roleName, setRoleName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedRole = await AsyncStorage.getItem("roleName");
//         const storedEmail = await AsyncStorage.getItem("email");
        
//         if (storedRole) setRoleName(storedRole);
//         if (storedEmail) setEmail(storedEmail);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       <LinearGradient
//         colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}
//       >
//         <View style={styles.headerTopRow}>
//           <View style={styles.headerUserInfo}>
//             <FontAwesome name='user-circle-o' size={35} color='orange' style={styles.userAvatar} />
//             <View>
//               <Text style={styles.userName}>{roleName || "User"}</Text>
//               <Text style={styles.greeting}>{email || "example@email.com"}</Text>
//             </View>
//           </View>
          
//           <View style={styles.headerActions}>
//             <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Logout')}>
//               <Feather name="settings" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         <View style={styles.performanceContainer}>
//           <View style={styles.performanceTextContainer}>
//             <Animated.Text
//               style={[
//                 styles.banner,
//                 {
//                   opacity: opacity,
//                   transform: [{ scale: scale }],
//                 }
//               ]}
//             >
//               {displayText}
//               {displayText.length < fullText.length && (
//                 <Animated.Text style={{ opacity: opacity }}>|</Animated.Text>
//               )}
//             </Animated.Text>
//           </View>
//         </View>
//       </LinearGradient>
      
//       <ScrollView 
//         style={styles.scrollView} 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollViewContent}
//       > 
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Management Console</Text>
//           <TouchableOpacity>
//             <Feather name="grid" size={20} color="#666" />
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.gridContainer}>
//           {menuItems.map((item, index) => (
//             <MenuGridItem
//               key={index}
//               title={item.title}
//               icon={item.icon}
//               color={item.color}
//               onPress={() => navigation.navigate(item.navigate)}
//               progress={item.progress}
//             />
//           ))}
//         </View>
//         <View>

//         </View>
//         <View style={styles.footer} />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   banner: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 39,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 30,
//     paddingHorizontal: 10,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   headerTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerUserInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userAvatar: {
//     width: 50,
//     height: 50,
//     paddingTop: 6,
//     paddingLeft: 5,
//     marginRight: 5,
//   },
//   greeting: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)',
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: '#FF6B6B',
//     borderRadius: 10,
//     width: 18,
//     height: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   notificationBadgeText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   performanceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 10,
//   },
//   performanceTextContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   gridItem: {
//     width: CARD_WIDTH,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginBottom: 15,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   gridItemContent: {
//     alignItems: 'flex-start',
//   },
//   gridIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   gridItemTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   progressContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   progressBar: {
//     flex: 1,
//     height: 4,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 2,
//     marginRight: 8,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 2,
//   },
//   progressText: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#666',
//   },
//   footer: {
//     height: 80,
//   },

//   // Updated Styles for Recent Calls
//   callLogContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   callLogHeader: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 15,
//     letterSpacing: 0.5,
//   },
//   callLogCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   callLogIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   callLogDetails: {
//     flex: 1,
//   },
//   callLogNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   callLogTime: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 2,
//   },
//   callLogType: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#999',
//   },
//   callLogEmpty: {
//     fontSize: 16,
//     color: '#999',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   callLogListContent: {
//     paddingBottom: 20,
//   },
// });

// export default Home;











// import {
//   Feather,
//   FontAwesome,
//   FontAwesome5,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons
// } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = (width - 60) / 2;

// const MenuGridItem = ({ title, icon, color, onPress, progress }) => {
//   return (
//     <TouchableOpacity 
//       style={styles.gridItem} 
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.gridItemContent}>
//         <View style={[styles.gridIconContainer, { backgroundColor: `${color}15` }]}>
//           {icon}
//         </View>
//         <Text style={styles.gridItemTitle}>{title}</Text>
        
//         {progress !== undefined && (
//           <View style={styles.progressContainer}>
//             <View style={styles.progressBar}>
//               <View 
//                 style={[
//                   styles.progressFill, 
//                   { width: `${progress}%`, backgroundColor: color }
//                 ]} 
//               />
//             </View>
//             <Text style={styles.progressText}>{progress}%</Text>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const Home = ({ navigation }) => {
//   const [textAnimation] = useState(new Animated.Value(0));
//   const [displayText, setDisplayText] = useState('');
//   const fullText = 'AG-Construction';
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       if (currentIndex <= fullText.length) {
//         setDisplayText(fullText.slice(0, currentIndex));
//         currentIndex++;
//       } else {
//         clearInterval(typingInterval);
//         Animated.loop(
//           Animated.sequence([
//             Animated.timing(textAnimation, {
//               toValue: 1,
//               duration: 2000,
//               useNativeDriver: true,
//             }),
//             Animated.timing(textAnimation, {
//               toValue: 0,
//               duration: 2000,
//               useNativeDriver: true,
//             }),
//           ])
//         ).start();
//       }
//     }, 150);

//     return () => clearInterval(typingInterval);
//   }, [textAnimation]);

//   const scale = textAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 1.03]
//   });

//   const opacity = textAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.85, 1]
//   });

//   const stats = [
//     {
//       title: 'Revenue',
//       value: '$24,500',
//       icon: <MaterialIcons name="attach-money" size={22} color="#fff" />,
//       color: '#4A6FFF',
//       increase: '12%',
//       subtitle: 'This month'
//     },
//     {
//       title: 'Projects',
//       value: '12',
//       icon: <MaterialIcons name="business-center" size={22} color="#fff" />,
//       color: '#FF6B6B',
//       increase: '4%',
//       subtitle: 'Active now'
//     },
//     {
//       title: 'Leads',
//       value: '36',
//       icon: <Ionicons name="people" size={22} color="#fff" />,
//       color: '#FFB100',
//       increase: '8%',
//       subtitle: 'New this week'
//     },
//     {
//       title: 'Tasks',
//       value: '24',
//       icon: <MaterialIcons name="assignment" size={22} color="#fff" />,
//       color: '#00C49A',
//       increase: '6%',
//       subtitle: 'Pending'
//     }
//   ];

//   const menuItems = [
//     { 
//       title: 'Lead Management', 
//       icon: <Ionicons name="people" size={24} color="#4A6FFF" />,
//       color: '#4A6FFF',
//       navigate: 'Lead_Management',
//       progress: 75
//     },
//     { 
//       title: 'Land Management', 
//       icon: <MaterialIcons name="request-quote" size={24} color="#FF6B6B" />,
//       color: '#FF6B6B',
//       navigate: 'Land_Management',
//       progress: 60
//     },
//     { 
//       title: 'Flat Management', 
//       icon: <FontAwesome name="building" size={24} color="#FFB100" />,
//       color: '#FFB100',
//       navigate: 'Flat_Management',
//       progress: 45
//     },
//     { 
//       title: 'Add Staff', 
//       icon: <FontAwesome5 name="users" size={22} color="#00C49A" />,
//       color: '#00C49A',
//       navigate: 'Add_Staff',
//       progress: 90
//     },
//     { 
//       title: 'Stock Management', 
//       icon: <MaterialIcons name="trending-up" size={24} color="#9C27B0" />,
//       color: '#9C27B0',
//       navigate: 'Stock_Management'
//     },
//     { 
//       title: 'Structure', 
//       icon: <MaterialCommunityIcons name="cog-transfer" size={24} color="#3F51B5" />,
//       color: '#3F51B5',
//       navigate: 'Structure_Management',
//     },
//     { 
//       title: 'Customer Details', 
//       icon: <MaterialIcons name="account-balance" size={24} color="#009688" />,
//       color: '#009688',
//       navigate: 'Customer_Details'
//     },
//     { 
//       title: 'Letters', 
//       icon: <MaterialIcons name="email" size={24} color="#607D8B" />,
//       color: '#607D8B',
//       navigate: 'Letter'
//     },
//   ];

//   const [roleName, setRoleName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedUserData = await AsyncStorage.getItem("user");
//         const storedRole = await AsyncStorage.getItem("roleName");
//         const storedEmail = await AsyncStorage.getItem("email");
        
//         if (storedUserData) {
//           setUserData(JSON.parse(storedUserData));
//         }
//         if (storedRole) setRoleName(storedRole);
//         if (storedEmail) setEmail(storedEmail);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // Reversed filteredMenuItems logic
//   const filteredMenuItems = userData
//     ? menuItems
//     : menuItems.filter(item => item.title === "Stock Management");

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}
//       >
//         <View style={styles.headerTopRow}>
//           <View style={styles.headerUserInfo}>
//             <FontAwesome name='user-circle-o' size={35} color='orange' style={styles.userAvatar} />
//             <View>
//               <Text style={styles.userName}>{roleName || "User"}</Text>
//               <Text style={styles.greeting}>{email || "example@email.com"}</Text>
//             </View>
//           </View>
          
//           <View style={styles.headerActions}>
//             <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Logout')}>
//               <Feather name="settings" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         <View style={styles.performanceContainer}>
//           <View style={styles.performanceTextContainer}>
//             <Animated.Text
//               style={[
//                 styles.banner,
//                 {
//                   opacity: opacity,
//                   transform: [{ scale: scale }],
//                 }
//               ]}
//             >
//               {displayText}
//               {displayText.length < fullText.length && (
//                 <Animated.Text style={{ opacity: opacity }}>|</Animated.Text>
//               )}
//             </Animated.Text>
//           </View>
//         </View>
//       </LinearGradient>
      
//       <ScrollView 
//         style={styles.scrollView} 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollViewContent}
//       > 
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Management Console</Text>
//           <TouchableOpacity>
//             <Feather name="grid" size={20} color="#666" />
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.gridContainer}>
//           {filteredMenuItems.map((item, index) => (
//             <MenuGridItem
//               key={index}
//               title={item.title}
//               icon={item.icon}
//               color={item.color}
//               onPress={() => navigation.navigate(item.navigate)}
//               progress={item.progress}
//             />
//           ))}
//         </View>
//         <View style={styles.footer} />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   banner: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 39,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 30,
//     paddingHorizontal: 10,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//   },
//   headerTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerUserInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userAvatar: {
//     width: 50,
//     height: 50,
//     paddingTop: 6,
//     paddingLeft: 5,
//     marginRight: 5,
//   },
//   greeting: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)',
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 10,
//   },
//   performanceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 10,
//   },
//   performanceTextContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   gridItem: {
//     width: CARD_WIDTH,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginBottom: 15,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   gridItemContent: {
//     alignItems: 'flex-start',
//   },
//   gridIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   gridItemTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   progressContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   progressBar: {
//     flex: 1,
//     height: 4,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 2,
//     marginRight: 8,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 2,
//   },
//   progressText: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#666',
//   },
//   footer: {
//     height: 80,
//   },
// });

// export default Home;





"use client"

import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const { width, height } = Dimensions.get("window")

// Responsive helper functions
const getResponsiveWidth = (percentage) => (width * percentage) / 100
const getResponsiveHeight = (percentage) => (height * percentage) / 100
const getResponsiveFontSize = (size) => {
  const scale = width / 375 // Base width (iPhone X)
  return Math.round(size * scale)
}

// Responsive dimensions
const HORIZONTAL_PADDING = getResponsiveWidth(5)
const CARD_MARGIN = getResponsiveWidth(2.5)
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - CARD_MARGIN) / 2

const MenuGridItem = ({ title, icon, color, onPress, progress }) => {
  return (
    <TouchableOpacity style={[styles.gridItem, { width: CARD_WIDTH }]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.gridItemContent}>
        <View style={[styles.gridIconContainer, { backgroundColor: `${color}15` }]}>{icon}</View>
        <Text style={styles.gridItemTitle}>{title}</Text>

        {progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const Home = ({ navigation }) => {
  const [textAnimation] = useState(new Animated.Value(0))
  const [displayText, setDisplayText] = useState("")
  const fullText = "AG-Construction"
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        Animated.loop(
          Animated.sequence([
            Animated.timing(textAnimation, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(textAnimation, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ).start()
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [textAnimation])

  const scale = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03],
  })

  const opacity = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  })

  const stats = [
    {
      title: "Revenue",
      value: "$24,500",
      icon: <MaterialIcons name="attach-money" size={getResponsiveFontSize(22)} color="#fff" />,
      color: "#4A6FFF",
      increase: "12%",
      subtitle: "This month",
    },
    {
      title: "Projects",
      value: "12",
      icon: <MaterialIcons name="business-center" size={getResponsiveFontSize(22)} color="#fff" />,
      color: "#FF6B6B",
      increase: "4%",
      subtitle: "Active now",
    },
    {
      title: "Leads",
      value: "36",
      icon: <Ionicons name="people" size={getResponsiveFontSize(22)} color="#fff" />,
      color: "#FFB100",
      increase: "8%",
      subtitle: "New this week",
    },
    {
      title: "Tasks",
      value: "24",
      icon: <MaterialIcons name="assignment" size={getResponsiveFontSize(22)} color="#fff" />,
      color: "#00C49A",
      increase: "6%",
      subtitle: "Pending",
    },
  ]

  const menuItems = [
    {
      title: "Lead Management",
      icon: <Ionicons name="people" size={getResponsiveFontSize(24)} color="#4A6FFF" />,
      color: "#4A6FFF",
      navigate: "Lead_Management",
      progress: 75,
    },
    {
      title: "Land Management",
      icon: <MaterialIcons name="request-quote" size={getResponsiveFontSize(24)} color="#FF6B6B" />,
      color: "#FF6B6B",
      navigate: "Land_Management",
      progress: 60,
    },
    {
      title: "Flat Management",
      icon: <FontAwesome name="building" size={getResponsiveFontSize(24)} color="#FFB100" />,
      color: "#FFB100",
      navigate: "Flat_Management",
      progress: 45,
    },
    {
      title: "Add Staff",
      icon: <FontAwesome5 name="users" size={getResponsiveFontSize(22)} color="#00C49A" />,
      color: "#00C49A",
      navigate: "Add_Staff",
      progress: 90,
    },
    {
      title: "Stock Management",
      icon: <MaterialIcons name="trending-up" size={getResponsiveFontSize(24)} color="#9C27B0" />,
      color: "#9C27B0",
      navigate: "Stock_Management",
    },
    {
      title: "Structure",
      icon: <MaterialCommunityIcons name="cog-transfer" size={getResponsiveFontSize(24)} color="#3F51B5" />,
      color: "#3F51B5",
      navigate: "Structure_Management",
    },
    {
      title: "Customer Details",
      icon: <MaterialIcons name="account-balance" size={getResponsiveFontSize(24)} color="#009688" />,
      color: "#009688",
      navigate: "Customer_Details",
    },
    {
      title: "Letters",
      icon: <MaterialIcons name="email" size={getResponsiveFontSize(24)} color="#607D8B" />,
      color: "#607D8B",
      navigate: "Letter",
    },
  ]

  const [roleName, setRoleName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("user")
        const storedRole = await AsyncStorage.getItem("roleName")
        const storedEmail = await AsyncStorage.getItem("email")

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData))
        }
        if (storedRole) setRoleName(storedRole)
        if (storedEmail) setEmail(storedEmail)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  // Reversed filteredMenuItems logic
  const filteredMenuItems = userData ? menuItems : menuItems.filter((item) => item.title === "Stock Management")

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a2a6c", "#b21f1f", "#fdbb2d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.headerUserInfo}>
            <FontAwesome
              name="user-circle-o"
              size={getResponsiveFontSize(35)}
              color="orange"
              style={styles.userAvatar}
            />
            <View>
              <Text style={styles.userName}>{roleName || "User"}</Text>
              <Text style={styles.greeting}>{email || "example@email.com"}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Logout")}>
              <Feather name="settings" size={getResponsiveFontSize(24)} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.performanceContainer}>
          <View style={styles.performanceTextContainer}>
            <Animated.Text
              style={[
                styles.banner,
                {
                  opacity: opacity,
                  transform: [{ scale: scale }],
                },
              ]}
            >
              {displayText}
              {displayText.length < fullText.length && <Animated.Text style={{ opacity: opacity }}>|</Animated.Text>}
            </Animated.Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Management Console</Text>
          <TouchableOpacity>
            <Feather name="grid" size={getResponsiveFontSize(20)} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {filteredMenuItems.map((item, index) => (
            <MenuGridItem
              key={index}
              title={item.title}
              icon={item.icon}
              color={item.color}
              onPress={() => navigation.navigate(item.navigate)}
              progress={item.progress}
            />
          ))}
        </View>
        <View style={styles.footer} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  banner: {
    color: "white",
    fontWeight: "bold",
    fontSize: getResponsiveFontSize(39),
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  header: {
    paddingTop: getResponsiveHeight(6),
    paddingBottom: getResponsiveHeight(4),
    paddingHorizontal: HORIZONTAL_PADDING,
    borderBottomLeftRadius: getResponsiveWidth(8),
    borderBottomRightRadius: getResponsiveWidth(8),
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2.5),
  },
  headerUserInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: getResponsiveWidth(13),
    height: getResponsiveWidth(13),
    paddingTop: getResponsiveHeight(0.8),
    paddingLeft: getResponsiveWidth(1.3),
    marginRight: getResponsiveWidth(1.3),
  },
  greeting: {
    fontSize: getResponsiveFontSize(14),
    color: "rgba(255, 255, 255, 0.8)",
  },
  userName: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: getResponsiveWidth(10.5),
    height: getResponsiveWidth(10.5),
    borderRadius: getResponsiveWidth(5.25),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: getResponsiveWidth(2.5),
  },
  performanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: getResponsiveWidth(5),
    padding: getResponsiveWidth(5),
    marginTop: getResponsiveHeight(1.2),
  },
  performanceTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: getResponsiveHeight(3.5),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2),
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "bold",
    color: "#333",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: getResponsiveHeight(2.5),
  },
  gridItem: {
    backgroundColor: "#fff",
    borderRadius: getResponsiveWidth(5),
    marginBottom: getResponsiveHeight(2),
    padding: getResponsiveWidth(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  gridItemContent: {
    alignItems: "flex-start",
  },
  gridIconContainer: {
    width: getResponsiveWidth(13),
    height: getResponsiveWidth(13),
    borderRadius: getResponsiveWidth(4),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2),
  },
  gridItemTitle: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    color: "#333",
    marginBottom: getResponsiveHeight(1.2),
    lineHeight: getResponsiveFontSize(18),
  },
  progressContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: getResponsiveHeight(0.6),
  },
  progressBar: {
    flex: 1,
    height: getResponsiveHeight(0.5),
    backgroundColor: "#f0f0f0",
    borderRadius: getResponsiveHeight(0.25),
    marginRight: getResponsiveWidth(2),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: getResponsiveHeight(0.25),
  },
  progressText: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: "500",
    color: "#666",
  },
  footer: {
    height: getResponsiveHeight(10),
  },
})

export default Home
