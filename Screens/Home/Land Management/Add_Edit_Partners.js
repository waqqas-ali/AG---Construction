// import React from 'react'
// import { Text, View } from 'react-native'
// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Add_Edit_Partners = () => {
//   return (
//     <View>
//       <Text>Add_Edit_Partners</Text>
//     </View>
//   )
// }

// export default Add_Edit_Partners





import { BASE_URL } from '@/Api/BASE_URL.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Add_Edit_Partners = ({ route, navigation }) => {
  const landId = route.params?.landId;
  const partner = route.params?.partner || {};
  const isEditMode = !!partner.id;
  const partnerId = partner.id;

  const [formData, setFormData] = useState({
    name: partner.name || '',
    city: partner.city || '',
    phoneNumber: partner.phoneNumber || '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode && partnerId);

  useEffect(() => {
    if (isEditMode && partnerId) {
      const fetchPartner = async () => {
        setFetching(true);
        try {
          const jwtToken = await AsyncStorage.getItem('jwtToken');
          if (!jwtToken) {
            throw new Error('No JWT token found');
          }
          const response = await axios.get(`${BASE_URL}/${landId}/partners/${partnerId}`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          });
          const data = response.data;
          setFormData({
            name: data.name || '',
            city: data.city || '',
            phoneNumber: data.phoneNumber || '',
          });
        } catch (err) {
          Alert.alert('Error', `Failed to fetch partner data: ${err.message}`);
        } finally {
          setFetching(false);
        }
      };
      fetchPartner();
    }
  }, [isEditMode, partnerId, landId]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.city) {
      Alert.alert('Error', 'Please fill in all required fields (Name and City)');
      return;
    }

    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }

      const payload = {
        name: formData.name,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
      };

      if (isEditMode) {
        await axios.put(`${BASE_URL}/${landId}/partners/${partnerId}`, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        Alert.alert('Success', 'Partner updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await axios.post(`${BASE_URL}/${landId}/partners`, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });
        Alert.alert('Success', 'Partner added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message || `Failed to ${isEditMode ? 'update' : 'add'} partner`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>{isEditMode ? 'Edit Partner' : 'Add New Partner'}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.sectionTitle}>Partner Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Name *"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="City *"
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>{isEditMode ? 'Update Partner' : 'Add Partner'}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A0C4FF',
  },
});

export default Add_Edit_Partners;