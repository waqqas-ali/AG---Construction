// import React from 'react'
// import { Text, View } from 'react-native'
// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const Add_Edit_Lead = () => {
//   return (
//     <View>
//       <Text>Add_Edit_Lead</Text>
//     </View>
//   )
// }

// export default Add_Edit_Lead






import { BASE_URL } from '@/Api/BASE_URL.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddEditLead = ({ route, navigation }) => {
  const { id } = route.params || {};
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    foundOn: new Date(),
    status: 'NEW_LEAD',
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchLead();
    }
  }, []);

  const fetchLead = async () => {
    try {
      setLoading(true);
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setFormData({
        ...response.data,
        foundOn: new Date(response.data.foundOn),
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lead:', error);
      Alert.alert('Error', 'Failed to fetch lead details. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.foundOn;
    setShowDatePicker(Platform.OS === 'ios');
    setFormData({ ...formData, foundOn: currentDate });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const payload = {
        ...formData,
        foundOn: formData.foundOn.toISOString().split('T')[0],
      };

      if (isEditing) {
        await axios.put(`${BASE_URL}/updateLead/${id}`, payload, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        Alert.alert('Success', 'Lead updated successfully!');
      } else {
        await axios.post(`${BASE_URL}/createNewLead`, payload, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        Alert.alert('Success', 'Lead created successfully!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving lead:', error);
      Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'create'} lead. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit Lead' : 'Add New Lead'}</Text>
      
      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        value={formData.jobTitle}
        onChangeText={(text) => handleInputChange('jobTitle', text)}
        placeholder="Enter job title"
      />

      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        value={formData.companyName}
        onChangeText={(text) => handleInputChange('companyName', text)}
        placeholder="Enter company name"
      />

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholder="Enter email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number *</Text>
      <TextInput
        style={styles.input}
        value={formData.phoneNumber}
        onChangeText={(text) => handleInputChange('phoneNumber', text)}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Found On</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{formData.foundOn.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.foundOn}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.status}
          onValueChange={(value) => handleInputChange('status', value)}
          style={styles.picker}
        >
          <Picker.Item label="New Lead" value="NEW_LEAD" />
          <Picker.Item label="Follow Up" value="FOLLOW_UP" />
          <Picker.Item label="Under Review" value="UNDER_REVIEW" />
          <Picker.Item label="Demo" value="DEMO" />
          <Picker.Item label="Negotiation" value="NEGOTIATION" />
          <Picker.Item label="Success" value="SUCCESS" />
          <Picker.Item label="Inactive" value="INACTIVE" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>{isEditing ? 'Update Lead' : 'Create Lead'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 16,
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddEditLead;