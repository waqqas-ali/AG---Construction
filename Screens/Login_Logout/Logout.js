// import { MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useState } from 'react';
// import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');

// const BestLogout = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [loading, setLoading] = useState(false);

//   const { email, roleName } = route.params || {};

//   useEffect(() => {
//     console.log('Route params in Logout:', route.params);
//   }, [route.params]);

//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await AsyncStorage.clear();
//       Alert.alert('Success', 'You have been logged out successfully');
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         })
//       );
//     } catch (error) {
//       console.error('Error during logout:', error);
//       Alert.alert('Error', 'Failed to log out. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmLogout = () => {
//     Alert.alert(
//       'Confirm Logout',
//       'Are you sure you want to log out?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: handleLogout,
//         },
//       ]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={['#f2f2f2', '#e2e2e2']}
//         style={StyleSheet.absoluteFill}
//       />
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Account</Text>
//       </View>

//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <MaterialIcons name="person-outline" size={width * 0.15} color="#5e5e5e" />
//           <View style={styles.cardHeaderText}>
//             <Text style={styles.roleText}>{roleName || 'User'}</Text>
//             <Text style={styles.emailText}>{email || 'user@example.com'}</Text>
//           </View>
//         </View>

//         <Text style={styles.message}>
//           You are currently signed in. Logging out will clear all your session data.
//         </Text>

//         <TouchableOpacity
//           onPress={confirmLogout}
//           disabled={loading}
//           style={styles.logoutButton}
//         >
//           <LinearGradient
//             colors={['#ff6b6b', '#ee4d4d']}
//             style={styles.buttonGradient}
//           >
//             <MaterialIcons name="logout" size={24} color="#fff" />
//             <Text style={styles.buttonLabel}>{loading ? 'Logging out...' : 'Logout'}</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   headerContainer: {
//     position: 'absolute',
//     top: height * 0.08,
//     left: width * 0.08,
//   },
//   header: {
//     fontSize: width * 0.09,
//     fontWeight: '800',
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginHorizontal: width * 0.05,
//     padding: width * 0.08,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 15,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: height * 0.04,
//   },
//   cardHeaderText: {
//     marginLeft: width * 0.05,
//   },
//   emailText: {
//     fontSize: width * 0.035,
//     color: '#333',
//   },
//   roleText: {
//     fontSize: width * 0.04,
//     fontWeight: '600',
//     color: '#333',
//   },
//   message: {
//     fontSize: width * 0.04,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: height * 0.05,
//     lineHeight: width * 0.06,
//   },
//   logoutButton: {
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   buttonGradient: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 18,
//   },
//   buttonLabel: {
//     fontSize: width * 0.045,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
// });

// export default BestLogout;










import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
// 1. Import Image from react-native
import { MaterialIcons } from '@expo/vector-icons';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('window');

const BestLogout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const { email, roleName } = route.params || {};

  useEffect(() => {
    console.log('Route params in Logout:', route.params);
  }, [route.params]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'You have been logged out successfully');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: handleLogout,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f2f2f2', '#e2e2e2']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Account</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {/* 2. Replace MaterialIcons with your Image component */}
          <Image
            source={require("@/assets/images/agconstruction-1.png")}
            style={styles.logo}
            resizeMode="cover"
          />
          <View style={styles.cardHeaderText}>
            <Text style={styles.roleText}>{roleName || 'User'}</Text>
            <Text style={styles.emailText}>{email || 'user@example.com'}</Text>
          </View>
        </View>

        <Text style={styles.message}>
          You are currently signed in. Logging out will clear all your session data.
        </Text>

        <TouchableOpacity
          onPress={confirmLogout}
          disabled={loading}
          style={styles.logoutButton}
        >
          <LinearGradient
            colors={['#ff6b6b', '#ee4d4d']}
            style={styles.buttonGradient}
          >
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={styles.buttonLabel}>{loading ? 'Logging out...' : 'Logout'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.08,
  },
  header: {
    fontSize: width * 0.09,
    fontWeight: '800',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: width * 0.05,
    padding: width * 0.08,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },
  // 3. Add the 'logo' style to the StyleSheet
  logo: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2, // Makes the image container circular
    borderWidth: 2,
    borderColor: '#eee',
  },
  cardHeaderText: {
    marginLeft: width * 0.05,
  },
  emailText: {
    fontSize: width * 0.035,
    color: '#333',
  },
  roleText: {
    fontSize: width * 0.04,
    color: '#333',
    fontWeight: '600',
  },
  message: {
    fontSize: width * 0.04,
    color: '#555',
    textAlign: 'center',
    marginBottom: height * 0.05,
    lineHeight: width * 0.06,
  },
  logoutButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
  },
  buttonLabel: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default BestLogout;