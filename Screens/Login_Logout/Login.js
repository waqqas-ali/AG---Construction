// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;
      
//       // Store token and user data in AsyncStorage
//       await AsyncStorage.setItem('jwtToken', jwtToken);
//       await AsyncStorage.setItem('user', JSON.stringify(admin));

//       // Navigate to the main screen or dashboard
//       navigation.replace('Home'); // Replace with your target screen
      
//     } catch (error) {
//       setLoading(false);
//       const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//       Alert.alert('Login Error', errorMessage);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
      
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
      
//       <Button
//         title={loading ? 'Logging in...' : 'Login'}
//         onPress={handleLogin}
//         disabled={loading}
//       />
      
//       <Text
//         style={styles.registerLink}
//         onPress={() => navigation.navigate('Home')} // Replace with your register screen
//       >
//         Don't have an account? Register
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   registerLink: {
//     marginTop: 20,
//     color: 'blue',
//     textAlign: 'center',
//   },
// });

// export default Login;








// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState } from 'react';
// import {
//     ActivityIndicator,
//     KeyboardAvoidingView,
//     Platform,
//     Pressable,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
// } from 'react-native';

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState(null);

//   // --- API LOGIC (Slightly modified for better UX, but core call is UNCHANGED) ---
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setError(null); // Clear previous errors
//     setLoading(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;
      
//       await AsyncStorage.setItem('jwtToken', jwtToken);
//       await AsyncStorage.setItem('user', JSON.stringify(admin));

//       navigation.replace('Home');
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <View style={styles.innerContainer}>
//           <Text style={styles.title}>AG Construction</Text>

//           <View style={styles.card}>
//             <View style={styles.inputContainer}>
//               <Ionicons name="mail-outline" size={22} color="#fff" style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email Address"
//                 placeholderTextColor="#ccc"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Ionicons name="lock-closed-outline" size={22} color="#fff" style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor="#ccc"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!isPasswordVisible}
//               />
//               <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
//                 <Ionicons
//                   name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
//                   size={22}
//                   color="#fff"
//                 />
//               </Pressable>
//             </View>

//             {error && <Text style={styles.errorText}>{error}</Text>}

//             <Pressable
//               style={({ pressed }) => [
//                 styles.loginButton,
//                 { opacity: pressed ? 0.8 : 1 },
//               ]}
//               onPress={handleLogin}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#192f6a" />
//               ) : (
//                 <Text style={styles.loginButtonText}>Login</Text>
//               )}
//             </Pressable>
//           </View>
          
//           <Pressable
//             style={({ pressed }) => [
//               styles.registerLinkContainer,
//               { opacity: pressed ? 0.7 : 1 },
//             ]}
//             onPress={() => navigation.navigate('Register')} // Navigate to Register screen
//           >
//             <Text style={styles.registerText}>
//               Need an account? <Text style={styles.registerLink}>Sign Up</Text>
//             </Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 40,
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 5,
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     padding: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//     borderRadius: 10,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     color: '#ffffff',
//     fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
//   },
//   errorText: {
//     color: '#ffcccc',
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   loginButton: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loginButtonText: {
//     color: '#3b5998',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   registerLinkContainer: {
//     marginTop: 25,
//     alignItems: 'center',
//   },
//   registerText: {
//     color: '#dddddd',
//     fontSize: 15,
//   },
//   registerLink: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

// export default Login;







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     ActivityIndicator,
//     Animated,
//     Dimensions,
//     Pressable,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     View
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);

//   // Animation values
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const scaleAnim = useRef(new Animated.Value(0.9)).current;

//   useEffect(() => {
//     // Entrance animations
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   // --- API LOGIC (UNCHANGED) ---
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;
      
//       await AsyncStorage.setItem('jwtToken', jwtToken);
//       await AsyncStorage.setItem('user', JSON.stringify(admin));

//       navigation.replace('Home');
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//       <LinearGradient 
//         colors={['#667eea', '#764ba2', '#f093fb']} 
//         style={styles.container}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         {/* <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         > */}
//           <Animated.View 
//             style={[
//               styles.innerContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [
//                   { translateY: slideAnim },
//                   { scale: scaleAnim }
//                 ]
//               }
//             ]}
//           >
//             {/* Logo/Brand Section */}
//             <View style={styles.brandContainer}>
//               <View style={styles.logoCircle}>
//                 <Ionicons name="construct" size={40} color="#fff" />
//               </View>
//               <Text style={styles.brandTitle}>AG Construction</Text>
//               <Text style={styles.brandSubtitle}>Welcome back</Text>
//             </View>

//             {/* Login Card */}
//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>Sign In</Text>
              
//               {/* Email Input */}
//               <View style={[
//                 styles.inputContainer,
//                 emailFocused && styles.inputContainerFocused
//               ]}>
//                 <Ionicons 
//                   name="mail-outline" 
//                   size={20} 
//                   color={emailFocused ? '#667eea' : '#8e8e93'} 
//                   style={styles.inputIcon} 
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Email Address"
//                   placeholderTextColor="#8e8e93"
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 //   onFocus={() => setEmailFocused(true)}
//                 //   onBlur={() => setEmailFocused(false)}
//                 />
//               </View>

//               {/* Password Input */}
//               <View style={[
//                 styles.inputContainer,
//                 passwordFocused && styles.inputContainerFocused
//               ]}>
//                 <Ionicons 
//                   name="lock-closed-outline" 
//                   size={20} 
//                   color={passwordFocused ? '#667eea' : '#8e8e93'} 
//                   style={styles.inputIcon} 
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   placeholderTextColor="#8e8e93"
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!isPasswordVisible}
//                 //   onFocus={() => setPasswordFocused(true)}
//                 //   onBlur={() => setPasswordFocused(false)}
//                 />
//                 <Pressable 
//                   onPress={() => setPasswordVisible(!isPasswordVisible)}
//                   style={styles.eyeButton}
//                 >
//                   <Ionicons
//                     name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
//                     size={20}
//                     color="#8e8e93"
//                   />
//                 </Pressable>
//               </View>

//               {/* Error Message */}
//               {error && (
//                 <Animated.View style={styles.errorContainer}>
//                   <Ionicons name="alert-circle-outline" size={16} color="#ff6b6b" />
//                   <Text style={styles.errorText}>{error}</Text>
//                 </Animated.View>
//               )}

//               {/* Login Button */}
//               <Pressable
//                 style={({ pressed }) => [
//                   styles.loginButton,
//                   { 
//                     opacity: pressed ? 0.9 : 1,
//                     transform: [{ scale: pressed ? 0.98 : 1 }]
//                   },
//                 ]}
//                 onPress={handleLogin}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#667eea', '#764ba2']}
//                   style={styles.loginButtonGradient}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   {loading ? (
//                     <ActivityIndicator size="small" color="#ffffff" />
//                   ) : (
//                     <>
//                       <Text style={styles.loginButtonText}>Sign In</Text>
//                       <Ionicons name="arrow-forward" size={20} color="#ffffff" />
//                     </>
//                   )}
//                 </LinearGradient>
//               </Pressable>

//               {/* Forgot Password */}
//               <Pressable style={styles.forgotPasswordContainer}>
//                 <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//               </Pressable>
//             </View>
            
//             {/* Register Link */}
//             <Pressable
//               style={({ pressed }) => [
//                 styles.registerContainer,
//                 { opacity: pressed ? 0.7 : 1 },
//               ]}
//               onPress={() => navigation.navigate('Register')}
//             >
//               <Text style={styles.registerText}>
//                 Don't have an account? 
//               </Text>
//               <Text style={styles.registerLink}> Sign Up</Text>
//             </Pressable>

//             {/* Decorative Elements */}
//             <View style={styles.decorativeCircle1} />
//             <View style={styles.decorativeCircle2} />
//           </Animated.View>
//         {/* </KeyboardAvoidingView> */}
//       </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//     paddingTop: StatusBar.currentHeight + 40,
//   },
//   brandContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     borderWidth: 2,
//     borderColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   brandTitle: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 4,
//     letterSpacing: -0.5,
//   },
//   brandSubtitle: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     textAlign: 'center',
//     fontWeight: '400',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     padding: 32,
//     borderRadius: 24,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 20,
//     elevation: 10,
//     marginBottom: 24,
//   },
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     borderRadius: 16,
//     marginBottom: 16,
//     paddingHorizontal: 16,
//     height: 56,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   inputContainerFocused: {
//     borderColor: '#667eea',
//     backgroundColor: '#ffffff',
//     shadowColor: '#667eea',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1a1a1a',
//     fontWeight: '500',
//   },
//   eyeButton: {
//     padding: 4,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff5f5',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#ff6b6b',
//   },
//   errorText: {
//     color: '#ff6b6b',
//     fontSize: 14,
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   loginButton: {
//     borderRadius: 16,
//     marginTop: 8,
//     marginBottom: 16,
//     shadowColor: '#667eea',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   loginButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//   },
//   loginButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '700',
//     marginRight: 8,
//   },
//   forgotPasswordContainer: {
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   forgotPasswordText: {
//     color: '#667eea',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 16,
//   },
//   registerText: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontSize: 16,
//     fontWeight: '400',
//   },
//   registerLink: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   decorativeCircle1: {
//     position: 'absolute',
//     top: -50,
//     right: -50,
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   decorativeCircle2: {
//     position: 'absolute',
//     bottom: -30,
//     left: -30,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
// });

// export default Login;







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Dimensions,
//     Pressable,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     View
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);


//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const jwtToken = await AsyncStorage.getItem('jwtToken');
//         // const keepLoggedInStored = await AsyncStorage.getItem('keepLoggedIn');
//         if (jwtToken === 'true') {
//           // Validate token with backend if needed
//           navigation.replace('Home');
//         }
//       } catch (err) {
//         console.error('Error checking login status:', err);
//       }
//     };
//     checkLoginStatus();
//   }, [navigation]);
//   // --- API LOGIC (UNCHANGED) ---
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setError(null); // Clear previous errors
//     setLoading(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;
      
//       await AsyncStorage.setItem('jwtToken', jwtToken);
//       await AsyncStorage.setItem('user', JSON.stringify(admin));

//       navigation.replace('Home');
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Optimize TextInput updates with useCallback
//   const handleEmailChange = useCallback((text) => {
//     setEmail(text);
//   }, []);

//   const handlePasswordChange = useCallback((text) => {
//     setPassword(text);
//   }, []);

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
//       <LinearGradient 
//         colors={['#1a1a2e', '#16213e', '#0f3460']} 
//         style={styles.container}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//           <View style={styles.innerContainer}>
//             {/* Header Section */}
//             <View style={styles.headerSection}>
//               <View style={styles.logoContainer}>
//                 <LinearGradient
//                   colors={['#ff6b6b', '#ee5a24']}
//                   style={styles.logoCircle}
//                 >
//                   <Ionicons name="construct" size={32} color="#fff" />
//                 </LinearGradient>
//               </View>
//               <Text style={styles.title}>AG Construction</Text>
//               <Text style={styles.subtitle}>Welcome back! Please sign in to continue</Text>
//             </View>

//             {/* Form Section */}
//             <View style={styles.formSection}>
//               <View style={styles.card}>
//                 {/* Email Input */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Email Address</Text>
//                   <View style={[
//                     styles.inputContainer,
//                     emailFocused && styles.inputContainerFocused,
//                     error && styles.inputContainerError
//                   ]}>
//                     <Ionicons 
//                       name="mail-outline" 
//                       size={20} 
//                       color={emailFocused ? '#ff6b6b' : '#8e8e93'} 
//                       style={styles.icon} 
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter your email"
//                       placeholderTextColor="#8e8e93"
//                       value={email}
//                       onChangeText={handleEmailChange}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       textContentType="emailAddress" // Improve iOS autofill
//                       autoCorrect={false} // Disable autocorrect
//                     />
//                   </View>
//                 </View>

//                 {/* Password Input */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <View style={[
//                     styles.inputContainer,
//                     passwordFocused && styles.inputContainerFocused,
//                     error && styles.inputContainerError
//                   ]}>
//                     <Ionicons 
//                       name="lock-closed-outline" 
//                       size={20} 
//                       color={passwordFocused ? '#ff6b6b' : '#8e8e93'} 
//                       style={styles.icon} 
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter your password"
//                       placeholderTextColor="#8e8e93"
//                       value={password}
//                       onChangeText={handlePasswordChange}
//                       secureTextEntry={!isPasswordVisible}
//                       textContentType="password" // Improve iOS autofill
//                       autoCorrect={false} // Disable autocorrect
//                     />
//                     <Pressable 
//                       onPress={() => setPasswordVisible(!isPasswordVisible)}
//                       style={styles.eyeButton}
//                     >
//                       <Ionicons
//                         name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
//                         size={20}
//                         color="#8e8e93"
//                       />
//                     </Pressable>
//                   </View>
//                 </View>

//                 {/* Error Message */}
//                 {error && (
//                   <View style={styles.errorContainer}>
//                     <Ionicons name="alert-circle-outline" size={16} color="#ff4757" />
//                     <Text style={styles.errorText}>{error}</Text>
//                   </View>
//                 )}

//                 {/* Login Button */}
//                 <Pressable
//                   style={({ pressed }) => [
//                     styles.loginButton,
//                     { opacity: pressed ? 0.9 : 1 },
//                     loading && styles.loginButtonDisabled
//                   ]}
//                   onPress={handleLogin}
//                   disabled={loading}
//                 >
//                   <LinearGradient
//                     colors={loading ? ['#cccccc', '#999999'] : ['#ff6b6b', '#ee5a24']}
//                     style={styles.loginButtonGradient}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                   >
//                     {loading ? (
//                       <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#fff" />
//                         <Text style={styles.loadingText}>Signing in...</Text>
//                       </View>
//                     ) : (
//                       <Text style={styles.loginButtonText}>Sign In</Text>
//                     )}
//                   </LinearGradient>
//                 </Pressable>

//                 {/* Forgot Password */}
//                 <Pressable style={styles.forgotPasswordContainer}>
//                   <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                 </Pressable>
//               </View>
//             </View>

//             {/* Footer Section */}
//             <View style={styles.footerSection}>
//               <View style={styles.dividerContainer}>
//                 <View style={styles.divider} />
//                 <Text style={styles.dividerText}>or</Text>
//                 <View style={styles.divider} />
//               </View>

//               <Pressable
//                 style={({ pressed }) => [
//                   styles.registerLinkContainer,
//                   { opacity: pressed ? 0.8 : 1 },
//                 ]}
//                 onPress={() => navigation.navigate('Register')}
//               >
//                 <Text style={styles.registerText}>
//                   Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//       </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 24,
//   },
//   headerSection: {
//     flex: 0.35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 60,
//   },
//   logoContainer: {
//     marginBottom: 24,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#a0a0a0',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   formSection: {
//     flex: 0.5,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: 24,
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.1,
//     shadowRadius: 40,
//     elevation: 10,
//   },
//   inputGroup: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c2c2e',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   inputContainerFocused: {
//     borderColor: '#ff6b6b',
//     backgroundColor: '#fff',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   inputContainerError: {
//     borderColor: '#ff4757',
//     backgroundColor: '#fff5f5',
//   },
//   icon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     height: 52,
//     fontSize: 16,
//     color: '#2c2c2e',
//     fontWeight: '500',
//   },
//   eyeButton: {
//     padding: 4,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff5f5',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#ff4757',
//   },
//   errorText: {
//     color: '#ff4757',
//     fontSize: 14,
//     fontWeight: '500',
//     marginLeft: 8,
//     flex: 1,
//   },
//   loginButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   loginButtonGradient: {
//     paddingVertical: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginButtonDisabled: {
//     opacity: 0.7,
//   },
//   loginButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 12,
//   },
//   forgotPasswordContainer: {
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   forgotPasswordText: {
//     color: '#ff6b6b',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   footerSection: {
//     flex: 0.15,
//     justifyContent: 'center',
//     paddingBottom: 40,
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   dividerText: {
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontSize: 14,
//     marginHorizontal: 16,
//     fontWeight: '500',
//   },
//   registerLinkContainer: {
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   registerText: {
//     color: '#e0e0e0',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   registerLink: {
//     color: '#ff6b6b',
//     fontWeight: '700',
//   },
// });

// export default Login;







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useCallback, useState } from 'react';
// import {
//     ActivityIndicator,
//     Dimensions,
//     Pressable,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     View
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [keepLoggedIn, setKeepLoggedIn] = useState(true); // New state for checkbox

//   // --- API LOGIC (UNCHANGED except for AsyncStorage condition) ---
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setError(null); // Clear previous errors
//     setLoading(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;
      
//       if (keepLoggedIn) { // Store only if checkbox is checked
//         await AsyncStorage.setItem('jwtToken', jwtToken);
//         await AsyncStorage.setItem('user', JSON.stringify(admin));
//       }

//       navigation.replace('Home');
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Optimize TextInput updates with useCallback
//   const handleEmailChange = useCallback((text) => {
//     setEmail(text);
//   }, []);

//   const handlePasswordChange = useCallback((text) => {
//     setPassword(text);
//   }, []);

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
//       <LinearGradient 
//         colors={['#1a1a2e', '#16213e', '#0f3460']} 
//         style={styles.container}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//           <View style={styles.innerContainer}>
//             {/* Header Section */}
//             <View style={styles.headerSection}>
//               <View style={styles.logoContainer}>
//                 <LinearGradient
//                   colors={['#ff6b6b', '#ee5a24']}
//                   style={styles.logoCircle}
//                 >
//                   <Ionicons name="construct" size={32} color="#fff" />
//                 </LinearGradient>
//               </View>
//               <Text style={styles.title}>AG Construction</Text>
//               <Text style={styles.subtitle}>Welcome back! Please sign in to continue</Text>
//             </View>

//             {/* Form Section */}
//             <View style={styles.formSection}>
//               <View style={styles.card}>
//                 {/* Email Input */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Email Address</Text>
//                   <View style={[
//                     styles.inputContainer,
//                     emailFocused && styles.inputContainerFocused,
//                     error && styles.inputContainerError
//                   ]}>
//                     <Ionicons 
//                       name="mail-outline" 
//                       size={20} 
//                       color={emailFocused ? '#ff6b6b' : '#8e8e93'} 
//                       style={styles.icon} 
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter your email"
//                       placeholderTextColor="#8e8e93"
//                       value={email}
//                       onChangeText={handleEmailChange}
//                     //   onFocus={() => setEmailFocused(true)}
//                     //   onBlur={() => setEmailFocused(false)}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       textContentType="emailAddress"
//                       autoCorrect={false}
//                     />
//                   </View>
//                 </View>

//                 {/* Password Input */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <View style={[
//                     styles.inputContainer,
//                     passwordFocused && styles.inputContainerFocused,
//                     error && styles.inputContainerError
//                   ]}>
//                     <Ionicons 
//                       name="lock-closed-outline" 
//                       size={20} 
//                       color={passwordFocused ? '#ff6b6b' : '#8e8e93'} 
//                       style={styles.icon} 
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter your password"
//                       placeholderTextColor="#8e8e93"
//                       value={password}
//                       onChangeText={handlePasswordChange}
//                     //   onFocus={() => setPasswordFocused(true)}
//                     //   onBlur={() => setPasswordFocused(false)}
//                       secureTextEntry={!isPasswordVisible}
//                       textContentType="password"
//                       autoCorrect={false}
//                     />
//                     <Pressable 
//                       onPress={() => setPasswordVisible(!isPasswordVisible)}
//                       style={styles.eyeButton}
//                     >
//                       <Ionicons
//                         name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
//                         size={20}
//                         color="#8e8e93"
//                       />
//                     </Pressable>
//                   </View>
//                 </View>

//                 {/* Keep Me Logged In Checkbox */}
//                 <View style={styles.checkboxContainer}>
//                   <Pressable
//                     onPress={() => setKeepLoggedIn(!keepLoggedIn)}
//                     style={styles.checkbox}
//                   >
//                     <Ionicons
//                       name={keepLoggedIn ? 'checkbox-outline' : 'square-outline'}
//                       size={24}
//                       color="#ff6b6b"
//                     />
//                   </Pressable>
//                   <Text style={styles.checkboxText}>Keep me logged in</Text>
//                 </View>

//                 {/* Error Message */}
//                 {error && (
//                   <View style={styles.errorContainer}>
//                     <Ionicons name="alert-circle-outline" size={16} color="#ff4757" />
//                     <Text style={styles.errorText}>{error}</Text>
//                   </View>
//                 )}

//                 {/* Login Button */}
//                 <Pressable
//                   style={({ pressed }) => [
//                     styles.loginButton,
//                     { opacity: pressed ? 0.9 : 1 },
//                     loading && styles.loginButtonDisabled
//                   ]}
//                   onPress={handleLogin}
//                   disabled={loading}
//                 >
//                   <LinearGradient
//                     colors={loading ? ['#cccccc', '#999999'] : ['#ff6b6b', '#ee5a24']}
//                     style={styles.loginButtonGradient}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                   >
//                     {loading ? (
//                       <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#fff" />
//                         <Text style={styles.loadingText}>Signing in...</Text>
//                       </View>
//                     ) : (
//                       <Text style={styles.loginButtonText}>Sign In</Text>
//                     )}
//                   </LinearGradient>
//                 </Pressable>

//                 {/* Forgot Password */}
//                 <Pressable style={styles.forgotPasswordContainer}>
//                   <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                 </Pressable>
//               </View>
//             </View>

//             {/* Footer Section */}
//             <View style={styles.footerSection}>
//               <View style={styles.dividerContainer}>
//                 <View style={styles.divider} />
//                 <Text style={styles.dividerText}>or</Text>
//                 <View style={styles.divider} />
//               </View>

//               <Pressable
//                 style={({ pressed }) => [
//                   styles.registerLinkContainer,
//                   { opacity: pressed ? 0.8 : 1 },
//                 ]}
//                 onPress={() => navigation.navigate('Register')}
//               >
//                 <Text style={styles.registerText}>
//                   Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//       </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 24,
//   },
//   headerSection: {
//     flex: 0.35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 60,
//   },
//   logoContainer: {
//     marginBottom: 24,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#a0a0a0',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   formSection: {
//     flex: 0.5,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: 24,
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.1,
//     shadowRadius: 40,
//     elevation: 10,
//   },
//   inputGroup: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c2c2e',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   inputContainerFocused: {
//     borderColor: '#ff6b6b',
//     backgroundColor: '#fff',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   inputContainerError: {
//     borderColor: '#ff4757',
//     backgroundColor: '#fff5f5',
//   },
//   icon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     height: 52,
//     fontSize: 16,
//     color: '#2c2c2e',
//     fontWeight: '500',
//   },
//   eyeButton: {
//     padding: 4,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff5f5',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#ff4757',
//   },
//   errorText: {
//     color: '#ff4757',
//     fontSize: 14,
//     fontWeight: '500',
//     marginLeft: 8,
//     flex: 1,
//   },
//   loginButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   loginButtonGradient: {
//     paddingVertical: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginButtonDisabled: {
//     opacity: 0.7,
//   },
//   loginButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 12,
//   },
//   forgotPasswordContainer: {
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   forgotPasswordText: {
//     color: '#ff6b6b',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   footerSection: {
//     flex: 0.15,
//     justifyContent: 'center',
//     paddingBottom: 40,
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   dividerText: {
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontSize: 14,
//     marginHorizontal: 16,
//     fontWeight: '500',
//   },
//   registerLinkContainer: {
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   registerText: {
//     color: '#e0e0e0',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   registerLink: {
//     color: '#ff6b6b',
//     fontWeight: '700',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   checkbox: {
//     marginRight: 8,
//   },
//   checkboxText: {
//     color: '#2c2c2e',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//     marginLeft: 4,
//   },
// });

// export default Login;







// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useCallback, useState } from 'react';
// import {
//     ActivityIndicator,
//     Dimensions,
//     Pressable,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TextInput,
//     View
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [keepLoggedIn, setKeepLoggedIn] = useState(true); // New state for checkbox

//   // --- API LOGIC (UNCHANGED except for AsyncStorage condition) ---
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setError(null); // Clear previous errors
//     setLoading(true);

//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;
      
//       if (keepLoggedIn) { // Store only if checkbox is checked
//         await AsyncStorage.setItem('jwtToken', jwtToken);
//         await AsyncStorage.setItem('user', JSON.stringify(admin));
//       }

//       navigation.replace('Home');
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Optimize TextInput updates with useCallback
//   const handleEmailChange = useCallback((text) => {
//     setEmail(text);
//   }, []);

//   const handlePasswordChange = useCallback((text) => {
//     setPassword(text);
//   }, []);

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
//       <LinearGradient 
//         colors={['#1a1a2e', '#16213e', '#0f3460']} 
//         style={styles.container}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//           <View style={styles.innerContainer}>
//             {/* Header Section */}
//             <View style={styles.headerSection}>
//               <View style={styles.logoContainer}>
//                 <LinearGradient
//                   colors={['#ff6b6b', '#ee5a24']}
//                   style={styles.logoCircle}
//                 >
//                   <Ionicons name="construct" size={32} color="#fff" />
//                 </LinearGradient>
//               </View>
//               <Text style={styles.title}>AG Construction</Text>
//               <Text style={styles.subtitle}>Welcome back! Please sign in to continue</Text>
//             </View>

//             {/* Form Section */}
//             <View style={styles.formSection}>
//               <View style={styles.card}>
//                 {/* Email Input */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Email Address</Text>
//                   <View style={[
//                     styles.inputContainer,
//                     emailFocused && styles.inputContainerFocused,
//                     error && styles.inputContainerError
//                   ]}>
//                     <Ionicons 
//                       name="mail-outline" 
//                       size={20} 
//                       color={emailFocused ? '#ff6b6b' : '#8e8e93'} 
//                       style={styles.icon} 
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter your email"
//                       placeholderTextColor="#8e8e93"
//                       value={email}
//                       onChangeText={handleEmailChange}
//                       onFocus={() => setEmailFocused(true)}
//                       onBlur={() => setEmailFocused(false)}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       textContentType="emailAddress"
//                       autoCorrect={false}
//                     />
//                   </View>
//                 </View>

//                 {/* Password Input */}
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <View style={[
//                     styles.inputContainer,
//                     passwordFocused && styles.inputContainerFocused,
//                     error && styles.inputContainerError
//                   ]}>
//                     <Ionicons 
//                       name="lock-closed-outline" 
//                       size={20} 
//                       color={passwordFocused ? '#ff6b6b' : '#8e8e93'} 
//                       style={styles.icon} 
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Enter your password"
//                       placeholderTextColor="#8e8e93"
//                       value={password}
//                       onChangeText={handlePasswordChange}
//                     //   onFocus={() => setPasswordFocused(true)}
//                     //   onBlur={() => setPasswordFocused(false)}
//                       secureTextEntry={!isPasswordVisible}
//                       textContentType="password"
//                       autoCorrect={false}
//                     />
//                     <Pressable 
//                       onPress={() => setPasswordVisible(!isPasswordVisible)}
//                       style={styles.eyeButton}
//                     >
//                       <Ionicons
//                         name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
//                         size={20}
//                         color="#8e8e93"
//                       />
//                     </Pressable>
//                   </View>
//                 </View>

//                 {/* Keep Me Logged In Checkbox */}
//                 <View style={styles.checkboxContainer}>
//                   <Pressable
//                     onPress={() => setKeepLoggedIn(!keepLoggedIn)}
//                     style={styles.checkbox}
//                   >
//                     <Ionicons
//                       name={keepLoggedIn ? 'checkbox-outline' : 'square-outline'}
//                       size={24}
//                       color="#ff6b6b"
//                     />
//                   </Pressable>
//                   <Text style={styles.checkboxText}>Keep me logged in</Text>
//                 </View>

//                 {/* Error Message */}
//                 {error && (
//                   <View style={styles.errorContainer}>
//                     <Ionicons name="alert-circle-outline" size={16} color="#ff4757" />
//                     <Text style={styles.errorText}>{error}</Text>
//                   </View>
//                 )}

//                 {/* Login Button */}
//                 <Pressable
//                   style={({ pressed }) => [
//                     styles.loginButton,
//                     { opacity: pressed ? 0.9 : 1 },
//                     loading && styles.loginButtonDisabled
//                   ]}
//                   onPress={handleLogin}
//                   disabled={loading}
//                 >
//                   <LinearGradient
//                     colors={loading ? ['#cccccc', '#999999'] : ['#ff6b6b', '#ee5a24']}
//                     style={styles.loginButtonGradient}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                   >
//                     {loading ? (
//                       <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#fff" />
//                         <Text style={styles.loadingText}>Signing in...</Text>
//                       </View>
//                     ) : (
//                       <Text style={styles.loginButtonText}>Sign In</Text>
//                     )}
//                   </LinearGradient>
//                 </Pressable>

//                 {/* Forgot Password */}
//                 <Pressable style={styles.forgotPasswordContainer}>
//                   <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                 </Pressable>
//               </View>
//             </View>

//             {/* Footer Section */}
//             <View style={styles.footerSection}>
//               <View style={styles.dividerContainer}>
//                 <View style={styles.divider} />
//                 <Text style={styles.dividerText}>or</Text>
//                 <View style={styles.divider} />
//               </View>

//               <Pressable
//                 style={({ pressed }) => [
//                   styles.registerLinkContainer,
//                   { opacity: pressed ? 0.8 : 1 },
//                 ]}
//                 onPress={() => navigation.navigate('Register')}
//               >
//                 <Text style={styles.registerText}>
//                   Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//       </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 24,
//   },
//   headerSection: {
//     flex: 0.35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 60,
//   },
//   logoContainer: {
//     marginBottom: 24,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 16,
//     elevation: 8,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#ffffff',
//     textAlign: 'center',
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#a0a0a0',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   formSection: {
//     flex: 0.5,
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: 24,
//     padding: 32,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.1,
//     shadowRadius: 40,
//     elevation: 10,
//   },
//   inputGroup: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#2c2c2e',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 4,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   inputContainerFocused: {
//     borderColor: '#ff6b6b',
//     backgroundColor: '#fff',
//     shadowColor: '#ff6b6b',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   inputContainerError: {
//     borderColor: '#ff4757',
//     backgroundColor: '#fff5f5',
//   },
//   icon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     height: 52,
//     fontSize: 16,
//     color: '#2c2c2e',
//     fontWeight: '500',
//   },
//   eyeButton: {
//     padding: 4,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff5f5',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderLeftWidth: 4,
//     borderLeftColor: '#ff4757',
//   },
//   errorText: {
//     color: '#ff4757',
//     fontSize: 14,
//     fontWeight: '500',
//     marginLeft: 8,
//     flex: 1,
//   },
//   loginButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   loginButtonGradient: {
//     paddingVertical: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginButtonDisabled: {
//     opacity: 0.7,
//   },
//   loginButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 12,
//   },
//   forgotPasswordContainer: {
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   forgotPasswordText: {
//     color: '#ff6b6b',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   footerSection: {
//     flex: 0.15,
//     justifyContent: 'center',
//     paddingBottom: 40,
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   divider: {
//     flex: 1,
//     height: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   dividerText: {
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontSize: 14,
//     marginHorizontal: 16,
//     fontWeight: '500',
//   },
//   registerLinkContainer: {
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   registerText: {
//     color: '#e0e0e0',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   registerLink: {
//     color: '#ff6b6b',
//     fontWeight: '700',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   checkbox: {
//     marginRight: 8,
//   },
//   checkboxText: {
//     color: '#2c2c2e',
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//     marginLeft: 4,
//   },
// });

// export default Login;





// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import { Alert, Animated, Button, StyleSheet, Text, TextInput } from 'react-native';

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Animation setup
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         const userData = await AsyncStorage.getItem('user'); // Changed 'adminData' to 'user' to match handleLogin
//         console.log(userData);

//         if (token && userData) {
//           navigation.replace('Home');
//         } else {
//           Animated.parallel([
//             Animated.timing(fadeAnim, {
//               toValue: 1,
//               duration: 800,
//               useNativeDriver: true,
//             }),
//             Animated.timing(slideAnim, {
//               toValue: 0,
//               duration: 800,
//               useNativeDriver: true,
//             }),
//           ]).start();
//         }
//       } catch (error) {
//         console.error('Error checking login status:', error);
//         Animated.parallel([
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//           Animated.timing(slideAnim, {
//             toValue: 0,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }
//     };

//     checkLoginStatus();
//   }, [navigation, fadeAnim, slideAnim]);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;

//       try {
//         await AsyncStorage.setItem('jwtToken', jwtToken);
//         await AsyncStorage.setItem('user', JSON.stringify(admin));

//         navigation.replace('Home');
//       } catch (storageError) {
//         throw new Error('Failed to store authentication data');
//       }
//     } catch (error) {
//       setLoading(false);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         'Login failed. Please try again.';
//       Alert.alert('Login Error', errorMessage);
//     }
//   };

//   return (
//     <Animated.View style={[styles.container, {
//       opacity: fadeAnim,
//       transform: [{ translateY: slideAnim }],
//     }]}>
//       <Text style={styles.title}>AG Construction</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Button
//         title={loading ? 'Logging in...' : 'Login'}
//         onPress={handleLogin}
//         disabled={loading}
//       />

//       <Text
//         style={styles.registerLink}
//         onPress={() => navigation.navigate('Register')}
//       >
//         Don't have an account? Register
//       </Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   registerLink: {
//     marginTop: 20,
//     color: 'blue',
//     textAlign: 'center',
//   },
// });

// export default Login;






// import { BASE_URL } from '@/Api/BASE_URL.js';
// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Animation setup
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const inputScaleAnim = useRef(new Animated.Value(0.95)).current;

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         const userData = await AsyncStorage.getItem('user');
//         console.log(userData);

//         if (token && userData) {
//           navigation.replace('Home');
//         } else {
//           Animated.parallel([
//             Animated.timing(fadeAnim, {
//               toValue: 1,
//               duration: 800,
//               useNativeDriver: true,
//             }),
//             Animated.timing(slideAnim, {
//               toValue: 0,
//               duration: 800,
//               useNativeDriver: true,
//             }),
//             Animated.spring(inputScaleAnim, {
//               toValue: 1,
//               friction: 8,
//               tension: 40,
//               useNativeDriver: true,
//             }),
//           ]).start();
//         }
//       } catch (error) {
//         console.error('Error checking login status:', error);
//         Animated.parallel([
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//           Animated.timing(slideAnim, {
//             toValue: 0,
//             duration: 800,
//             useNativeDriver: true,
//           }),
//           Animated.spring(inputScaleAnim, {
//             toValue: 1,
//             friction: 8,
//             tension: 40,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }
//     };

//     checkLoginStatus();
//   }, [navigation, fadeAnim, slideAnim, inputScaleAnim]);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const { jwtToken, admin } = response.data;

//       try {
//         await AsyncStorage.setItem('jwtToken', jwtToken);
//         await AsyncStorage.setItem('user', JSON.stringify(admin));

//         navigation.replace('Home', {email});
//       } catch (storageError) {
//         throw new Error('Failed to store authentication data');
//       }
//     } catch (error) {
//       setLoading(false);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         'Login failed. Please try again.';
//       Alert.alert('Login Error', errorMessage);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#007AFF', '#004C99']}
//       style={styles.container}
//     >
//       <Animated.View
//         style={[
//           styles.formContainer,
//           {
//             opacity: fadeAnim,
//             transform: [{ translateY: slideAnim }],
//           },
//         ]}
//       >
//         {/* Logo Placeholder */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={require('@/assets/images/agconstruction-1.png')} // Replace with actual logo URL
//             style={styles.logo}
//           />
//           <Text style={styles.title}>AG Construction</Text>
//           <Text style={styles.subtitle}>Sign in to manage properties</Text>
//         </View>

//         {/* Email Input */}
//         <Animated.View style={[styles.inputContainer, { transform: [{ scale: inputScaleAnim }] }]}>
//           <MaterialIcons name="email" size={24} color="#6B7280" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             placeholderTextColor="#9CA3AF"
//           />
//         </Animated.View>

//         {/* Password Input */}
//         <Animated.View style={[styles.inputContainer, { transform: [{ scale: inputScaleAnim }] }]}>
//           <MaterialIcons name="lock" size={24} color="#6B7280" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//             placeholderTextColor="#9CA3AF"
//           />
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => setShowPassword(!showPassword)}
//           >
//             <MaterialIcons
//               name={showPassword ? 'visibility' : 'visibility-off'}
//               size={24}
//               color="#6B7280"
//             />
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={[styles.button, loading && styles.buttonDisabled]}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <>
//               <MaterialIcons name="login" size={20} color="#fff" />
//               <Text style={styles.buttonText}>Login</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {/* Register Link */}
//         <TouchableOpacity >
//           <Text style={styles.registerLink}>
//             Don't have an account? <Text style={styles.registerLinkBold}>Register</Text>
//           </Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formContainer: {
//     width: '90%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 24,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   logo: {
//     width: 130,
//     height: 130,
//     borderRadius: 50,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1F2937',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 12,
//     marginBottom: 16,
//     paddingHorizontal: 12,
//   },
//   inputIcon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1F2937',
//     paddingVertical: 12,
//   },
//   eyeIcon: {
//     padding: 8,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007AFF',
//     paddingVertical: 14,
//     borderRadius: 12,
//     marginTop: 8,
//     gap: 8,
//   },
//   buttonDisabled: {
//     backgroundColor: '#60A5FA',
//     opacity: 0.7,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   registerLink: {
//     fontSize: 14,
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   registerLinkBold: {
//     fontWeight: '600',
//     color: '#007AFF',
//   },
// });

// export default Login;







"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { MaterialIcons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
const isShortScreen = screenHeight < 700

// Responsive dimensions
const FORM_WIDTH = isTablet ? getResponsiveWidth(60) : getResponsiveWidth(90)
const MAX_FORM_WIDTH = isTablet ? 500 : 400
const LOGO_SIZE = isShortScreen ? getResponsiveWidth(20) : getResponsiveWidth(25)
const INPUT_HEIGHT = getResponsiveHeight(6.5)

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  // Refs for TextInputs
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  // Animation setup
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const inputScaleAnim = useRef(new Animated.Value(0.95)).current
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken")
        const data = await AsyncStorage.getItem("data")
        console.log(data)
        if (token && data) {
          navigation.replace("Home", { email: email })
        } else {
          startAnimations()
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        startAnimations()
      }
    }

    const startAnimations = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(inputScaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 30,
          useNativeDriver: true,
        }),
      ]).start()
    }

    checkLoginStatus()
  }, [navigation, fadeAnim, slideAnim, inputScaleAnim, logoScaleAnim])

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      const { jwtToken, ...data } = response.data;
      console.log(data);

      try {
        await AsyncStorage.setItem("jwtToken", jwtToken)
        await AsyncStorage.setItem("data", JSON.stringify(data))
        navigation.replace("Home", { email })
      } catch (storageError) {
        throw new Error("Failed to store authentication data")
      }
    } catch (error) {
      setLoading(false)
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again."
      Alert.alert("Login Error", errorMessage)
    }
  }

  const handleInputFocus = (inputType) => {
    if (inputType === "email") {
      setEmailFocused(true)
    } else {
      setPasswordFocused(true)
    }
  }

  const handleInputBlur = (inputType) => {
    if (inputType === "email") {
      setEmailFocused(false)
    } else {
      setPasswordFocused(false)
    }
  }

  // Function to focus input when container is pressed
  const focusInput = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#007AFF", "#004C99"]} style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Logo Section */}
              <Animated.View
                style={[
                  styles.logoContainer,
                  {
                    transform: [{ scale: logoScaleAnim }],
                  },
                ]}
              >
                <View style={styles.logoWrapper}>
                  <Image
                    source={require("@/assets/images/agconstruction-1.png")}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.title}>AG Construction</Text>
                <Text style={styles.subtitle}>Sign in to manage properties</Text>
              </Animated.View>

              {/* Form Section */}
              <View style={styles.formSection}>
                {/* Email Input */}
                <Animated.View style={[styles.inputWrapper, { transform: [{ scale: inputScaleAnim }] }]}>
                  <TouchableOpacity
                    style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}
                    onPress={() => focusInput(emailInputRef)}
                    activeOpacity={1}
                  >
                    <MaterialIcons
                      name="email"
                      size={getResponsiveFontSize(20)}
                      color={emailFocused ? "#007AFF" : "#6B7280"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      ref={emailInputRef}
                      style={styles.input}
                      placeholder="Email Address"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholderTextColor="#9CA3AF"
                      onFocus={() => handleInputFocus("email")}
                      onBlur={() => handleInputBlur("email")}
                      returnKeyType="next"
                      onSubmitEditing={() => focusInput(passwordInputRef)}
                      blurOnSubmit={false}
                    />
                  </TouchableOpacity>
                </Animated.View>

                {/* Password Input */}
                <Animated.View style={[styles.inputWrapper, { transform: [{ scale: inputScaleAnim }] }]}>
                  <TouchableOpacity
                    style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}
                    onPress={() => focusInput(passwordInputRef)}
                    activeOpacity={1}
                  >
                    <MaterialIcons
                      name="lock"
                      size={getResponsiveFontSize(20)}
                      color={passwordFocused ? "#007AFF" : "#6B7280"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      ref={passwordInputRef}
                      style={styles.input}
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#9CA3AF"
                      onFocus={() => handleInputFocus("password")}
                      onBlur={() => handleInputBlur("password")}
                      returnKeyType="done"
                      onSubmitEditing={handleLogin}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={getResponsiveFontSize(20)}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Animated.View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <View style={styles.loadingContent}>
                      <ActivityIndicator size="small" color="#fff" />
                      <Text style={styles.buttonText}>Signing In...</Text>
                    </View>
                  ) : (
                    <View style={styles.buttonContent}>
                      <MaterialIcons name="login" size={getResponsiveFontSize(18)} color="#fff" />
                      <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Register Link */}
                <TouchableOpacity style={styles.registerContainer} activeOpacity={0.8}>
                  <Text style={styles.registerLink}>
                    Don't have an account?{" "}
                    <Text style={styles.registerLinkBold} onPress={() => console.log("Navigate to register")}>
                      Register
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Secure • Reliable • Professional</Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: getResponsiveHeight(5),
    paddingHorizontal: getResponsiveWidth(5),
  },
  formContainer: {
    width: FORM_WIDTH,
    maxWidth: MAX_FORM_WIDTH,
    backgroundColor: "#fff",
    borderRadius: getResponsiveWidth(4),
    padding: getResponsivePadding(24),
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: getResponsiveHeight(4),
  },
  logoWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2),
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: LOGO_SIZE * 0.8,
    height: LOGO_SIZE * 0.8,
    borderRadius: (LOGO_SIZE * 0.8) / 2,
  },
  title: {
    fontSize: getResponsiveFontSize(28),
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: getResponsiveHeight(0.5),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: getResponsiveHeight(2.5),
  },
  formSection: {
    marginBottom: getResponsiveHeight(2),
  },
  inputWrapper: {
    marginBottom: getResponsiveHeight(2),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: getResponsiveWidth(3),
    paddingHorizontal: getResponsivePadding(16),
    minHeight: INPUT_HEIGHT,
  },
  inputContainerFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: getResponsiveWidth(3),
  },
  input: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: "#1F2937",
    fontWeight: "500",
    paddingVertical: getResponsivePadding(12),
    // Remove any padding that might interfere with touch
    paddingHorizontal: 0,
  },
  eyeIcon: {
    padding: getResponsivePadding(8),
    borderRadius: getResponsiveWidth(2),
    // Ensure the eye icon doesn't interfere with input
    marginLeft: getResponsiveWidth(1),
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(3),
    marginTop: getResponsiveHeight(1),
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minHeight: getResponsiveHeight(7),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#93C5FD",
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveWidth(2),
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveWidth(3),
  },
  buttonText: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  registerContainer: {
    marginTop: getResponsiveHeight(3),
    paddingVertical: getResponsivePadding(8),
  },
  registerLink: {
    fontSize: getResponsiveFontSize(15),
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "500",
  },
  registerLinkBold: {
    fontWeight: "700",
    color: "#007AFF",
  },
  footer: {
    marginTop: getResponsiveHeight(2),
    paddingTop: getResponsivePadding(16),
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    alignItems: "center",
  },
  footerText: {
    fontSize: getResponsiveFontSize(12),
    color: "#9CA3AF",
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.5,
  },
})

export default Login
