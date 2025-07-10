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






// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const AddEditLead = ({ route, navigation }) => {
//   const { id } = route.params || {};
//   const isEditing = !!id;

//   const [formData, setFormData] = useState({
//     name: '',
//     jobTitle: '',
//     companyName: '',
//     email: '',
//     phoneNumber: '',
//     foundOn: new Date(),
//     status: 'NEW_LEAD',
//   });
//   const [loading, setLoading] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     if (isEditing) {
//       fetchLead();
//     }
//   }, []);

//   const fetchLead = async () => {
//     try {
//       setLoading(true);
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
//         headers: { Authorization: `Bearer ${jwtToken}` },
//       });
//       setFormData({
//         ...response.data,
//         foundOn: new Date(response.data.foundOn),
//       });
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching lead:', error);
//       Alert.alert('Error', 'Failed to fetch lead details. Please try again.');
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || formData.foundOn;
//     setShowDatePicker(Platform.OS === 'ios');
//     setFormData({ ...formData, foundOn: currentDate });
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.email || !formData.phoneNumber) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const jwtToken = await AsyncStorage.getItem('jwtToken');
//       const payload = {
//         ...formData,
//         foundOn: formData.foundOn.toISOString().split('T')[0],
//       };

//       if (isEditing) {
//         await axios.put(`${BASE_URL}/updateLead/${id}`, payload, {
//           headers: { Authorization: `Bearer ${jwtToken}` },
//         });
//         Alert.alert('Success', 'Lead updated successfully!');
//       } else {
//         await axios.post(`${BASE_URL}/createNewLead`, payload, {
//           headers: { Authorization: `Bearer ${jwtToken}` },
//         });
//         Alert.alert('Success', 'Lead created successfully!');
//       }
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving lead:', error);
//       Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'create'} lead. Please try again.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && isEditing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isEditing ? 'Edit Lead' : 'Add New Lead'}</Text>
      
//       <Text style={styles.label}>Name *</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.name}
//         onChangeText={(text) => handleInputChange('name', text)}
//         placeholder="Enter name"
//       />

//       <Text style={styles.label}>Job Title</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.jobTitle}
//         onChangeText={(text) => handleInputChange('jobTitle', text)}
//         placeholder="Enter job title"
//       />

//       <Text style={styles.label}>Company Name</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.companyName}
//         onChangeText={(text) => handleInputChange('companyName', text)}
//         placeholder="Enter company name"
//       />

//       <Text style={styles.label}>Email *</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.email}
//         onChangeText={(text) => handleInputChange('email', text)}
//         placeholder="Enter email"
//         keyboardType="email-address"
//       />

//       <Text style={styles.label}>Phone Number *</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.phoneNumber}
//         onChangeText={(text) => handleInputChange('phoneNumber', text)}
//         placeholder="Enter phone number"
//         keyboardType="phone-pad"
//       />

//       <Text style={styles.label}>Found On</Text>
//       <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>{formData.foundOn.toISOString().split('T')[0]}</Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={formData.foundOn}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}

//       <Text style={styles.label}>Status</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.status}
//           onValueChange={(value) => handleInputChange('status', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="New Lead" value="NEW_LEAD" />
//           <Picker.Item label="Follow Up" value="FOLLOW_UP" />
//           <Picker.Item label="Under Review" value="UNDER_REVIEW" />
//           <Picker.Item label="Demo" value="DEMO" />
//           <Picker.Item label="Negotiation" value="NEGOTIATION" />
//           <Picker.Item label="Success" value="SUCCESS" />
//           <Picker.Item label="Inactive" value="INACTIVE" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
//         {loading ? (
//           <ActivityIndicator size="small" color="#FFFFFF" />
//         ) : (
//           <Text style={styles.submitButtonText}>{isEditing ? 'Update Lead' : 'Create Lead'}</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#DDD',
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   dateButton: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#DDD',
//     marginBottom: 16,
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   pickerContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#DDD',
//     marginBottom: 16,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   submitButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default AddEditLead;





"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
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

// Responsive dimensions
const HORIZONTAL_PADDING = getResponsiveWidth(isPhone ? 5 : isTablet ? 8 : 10)
const VERTICAL_SPACING = getResponsiveHeight(isPhone ? 2 : 1.5)
const INPUT_HEIGHT = getResponsiveHeight(isPhone ? 6 : 5.5)

const AddEditLead = ({ route, navigation }) => {
  const { id } = route.params || {}
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    foundOn: new Date(),
    status: "NEW_LEAD",
  })

  const [loading, setLoading] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      fetchLead()
    }
  }, [])

  const fetchLead = async () => {
    try {
      setLoading(true)
      const jwtToken = await AsyncStorage.getItem("jwtToken")
      const response = await axios.get(`${BASE_URL}/getlead/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      setFormData({
        ...response.data,
        foundOn: new Date(response.data.foundOn),
      })
      setLoading(false)
    } catch (error) {
      console.error("Error fetching lead:", error)
      Alert.alert("Error", "Failed to fetch lead details. Please try again.")
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.foundOn
    setShowDatePicker(Platform.OS === "ios")
    setFormData({ ...formData, foundOn: currentDate })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Please fix the errors below and try again.")
      return
    }

    try {
      setLoading(true)
      const jwtToken = await AsyncStorage.getItem("jwtToken")
      const payload = {
        ...formData,
        foundOn: formData.foundOn.toISOString().split("T")[0],
      }

      if (isEditing) {
        await axios.put(`${BASE_URL}/updateLead/${id}`, payload, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        Alert.alert("Success", "Lead updated successfully!")
      } else {
        await axios.post(`${BASE_URL}/createNewLead`, payload, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        Alert.alert("Success", "Lead created successfully!")
      }
      navigation.goBack()
    } catch (error) {
      console.error("Error saving lead:", error)
      Alert.alert("Error", `Failed to ${isEditing ? "update" : "create"} lead. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const renderFormField = (label, field, placeholder, keyboardType = "default", required = false) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        value={formData[field]}
        onChangeText={(text) => handleInputChange(field, text)}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
        autoCorrect={false}
      />
      {errors[field] && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={getResponsiveFontSize(14)} color="#ef4444" />
          <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
      )}
    </View>
  )

  if (loading && isEditing) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading lead details...</Text>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={getResponsiveFontSize(24)} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>{isEditing ? "Edit Lead" : "Add New Lead"}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person" size={getResponsiveFontSize(20)} color="#6366f1" />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>

            {renderFormField("Full Name", "name", "Enter full name", "default", true)}
            {renderFormField("Job Title", "jobTitle", "Enter job title")}
            {renderFormField("Company Name", "companyName", "Enter company name")}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="call" size={getResponsiveFontSize(20)} color="#6366f1" />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>

            {renderFormField("Email Address", "email", "Enter email address", "email-address", true)}
            {renderFormField("Phone Number", "phoneNumber", "Enter phone number", "phone-pad", true)}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="business" size={getResponsiveFontSize(20)} color="#6366f1" />
              <Text style={styles.sectionTitle}>Lead Information</Text>
            </View>

            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Found On</Text>
              </View>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton} activeOpacity={0.8}>
                <View style={styles.dateContent}>
                  <Ionicons name="calendar" size={getResponsiveFontSize(20)} color="#6366f1" />
                  <Text style={styles.dateText}>{formData.foundOn.toLocaleDateString("en-GB")}</Text>
                  <Ionicons name="chevron-down" size={getResponsiveFontSize(16)} color="#9ca3af" />
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.foundOn}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Status</Text>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
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
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <View style={styles.loadingButtonContent}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.submitButtonText}>{isEditing ? "Updating..." : "Creating..."}</Text>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons name={isEditing ? "checkmark" : "add"} size={getResponsiveFontSize(20)} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>{isEditing ? "Update Lead" : "Create Lead"}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: getResponsiveHeight(6),
    paddingBottom: getResponsivePadding(20),
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    width: getResponsiveWidth(10),
    height: getResponsiveWidth(10),
    borderRadius: getResponsiveWidth(5),
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: getResponsiveWidth(10),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: getResponsiveHeight(10),
  },
  formContainer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: getResponsivePadding(20),
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: getResponsiveWidth(4),
    padding: getResponsivePadding(20),
    marginBottom: getResponsiveHeight(2.5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2.5),
    gap: getResponsiveWidth(3),
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
    color: "#111827",
  },
  fieldContainer: {
    marginBottom: getResponsiveHeight(2.5),
  },
  labelContainer: {
    marginBottom: getResponsiveHeight(1),
  },
  label: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
    color: "#374151",
  },
  required: {
    color: "#ef4444",
    fontSize: getResponsiveFontSize(16),
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: getResponsiveWidth(3),
    paddingHorizontal: getResponsivePadding(16),
    paddingVertical: getResponsivePadding(14),
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    fontSize: getResponsiveFontSize(16),
    color: "#111827",
    fontWeight: "500",
    minHeight: INPUT_HEIGHT,
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: getResponsiveHeight(0.8),
    gap: getResponsiveWidth(1.5),
  },
  errorText: {
    fontSize: getResponsiveFontSize(14),
    color: "#ef4444",
    fontWeight: "500",
  },
  dateButton: {
    backgroundColor: "#f9fafb",
    borderRadius: getResponsiveWidth(3),
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    minHeight: INPUT_HEIGHT,
    justifyContent: "center",
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: getResponsivePadding(16),
    paddingVertical: getResponsivePadding(14),
  },
  dateText: {
    fontSize: getResponsiveFontSize(16),
    color: "#111827",
    fontWeight: "500",
    flex: 1,
    marginLeft: getResponsiveWidth(3),
  },
  pickerContainer: {
    backgroundColor: "#f9fafb",
    borderRadius: getResponsiveWidth(3),
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  picker: {
    height: Platform.OS === "ios" ? getResponsiveHeight(20) : INPUT_HEIGHT,
    width: "100%",
    color: "#111827",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: getResponsivePadding(20),
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButton: {
    backgroundColor: "#6366f1",
    borderRadius: getResponsiveWidth(4),
    paddingVertical: getResponsivePadding(16),
    paddingHorizontal: getResponsivePadding(24),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minHeight: getResponsiveHeight(7),
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveWidth(2),
  },
  loadingButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: getResponsiveWidth(3),
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingContent: {
    alignItems: "center",
    gap: getResponsiveHeight(2),
  },
  loadingText: {
    fontSize: getResponsiveFontSize(16),
    color: "#6b7280",
    fontWeight: "500",
  },
})

export default AddEditLead
