import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Logout = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      // Clear all AsyncStorage data
      await AsyncStorage.clear();
      Alert.alert('Success', 'You have been logged out successfully');
      // Reset navigation to Login screen
      try {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      } catch (navError) {
        console.error('Navigation error:', navError);
        Alert.alert(
          'Navigation Error',
          'Unable to navigate to Login screen. Please restart the app.'
        );
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Confirm logout
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
      <Text style={styles.header}>Logout</Text>
      <View style={styles.content}>
        <MaterialIcons name="logout" size={64} color="#6200ea" />
        <Text style={styles.message}>Tap the button below to log out of your account.</Text>
        <Button
          mode="contained"
          icon="logout"
          onPress={confirmLogout}
          loading={loading}
          disabled={loading}
          style={styles.logoutButton}
          labelStyle={styles.buttonLabel}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  logoutButton: {
    marginVertical: 20,
    backgroundColor: '#6200ea',
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Logout;