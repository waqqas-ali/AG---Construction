import { BASE_URL } from '@/Api/BASE_URL.js';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const FlatOwner = ({ route }) => {
  const { bookingId, customerName } = route.params; // Get params from navigation
  const navigation = useNavigation();
  const letterRef = useRef();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBankDetailForm, setShowBankDetailForm] = useState(false);
  const [showInstallmentForm, setShowInstallmentForm] = useState(false);
  const [showCustomerSlip, setShowCustomerSlip] = useState(false);
  const [bankName, setBankName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [installmentDate, setInstallmentDate] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState('');
  const [installmentType, setInstallmentType] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Booking Data:', response.data); // Debug log
        setBookingData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch booking details');
        setLoading(false);
        console.error('Error fetching booking data:', err);
      }
    };

    fetchBookingData();
  }, [bookingId]);

  // Handlers for button actions
  const handleCustomerSlip = () => {
    if (!bookingData) {
      Alert.alert('Error', 'Booking data not available');
      return;
    }
    setShowCustomerSlip(true);
  };

  const handleAddBankDetails = () => {
    if (!bookingData?.customer?.id) {
      Alert.alert('Error', 'Customer ID not available');
      return;
    }
    setShowBankDetailForm(true);
  };

  const handleAddInstallment = () => {
    setShowInstallmentForm(true);
  };

  const handleViewInstallments = () => {
    navigation.navigate('ViewInstallments', { bookingId });
  };

  const handleEditCustomerDetails = () => {
    if (!bookingData?.customer?.id) {
      Alert.alert('Error', 'Customer ID not available');
      return;
    }
    navigation.navigate('EditCustomerDetails', {
      bookingId,
      customerId: bookingData.customer.id,
    });
  };

  const handleCancelBooking = async () => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel the booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('jwtToken');
              await axios.put(`${BASE_URL}/cancelBooking/${bookingId}`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              Alert.alert('Success', 'Booking has been cancelled.');
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', 'Failed to cancel booking.');
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleSubmitBankDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const formData = {
        bankName,
        loanAmount: loanAmount.replace(/,/g, ''),
      };
      await axios.post(`${BASE_URL}/addLoanDetails/${bookingData.customer.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'Bank details added successfully');
      setShowBankDetailForm(false);
      setBankName('');
      setLoanAmount('');
      const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookingData(response.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to add bank details');
      console.error(err);
    }
  };

  const handleSubmitInstallment = async () => {
    if (!installmentType) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    if (!installmentAmount) {
      Alert.alert('Error', 'Please enter an installment amount');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const formData = [{
        installmentDate: installmentDate || new Date().toISOString().split('T')[0],
        installmentAmount: installmentAmount.replace(/,/g, ''),
        installmentStatus: installmentType,
        remark: note,
      }];
      await axios.post(`${BASE_URL}/${bookingId}/addInstallment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'Installment added successfully');
      setShowInstallmentForm(false);
      setInstallmentDate('');
      setInstallmentAmount('');
      setInstallmentType('');
      setNote('');
      const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookingData(response.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to add installment');
      console.error(err);
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: installmentDate ? new Date(installmentDate) : new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split('T')[0];
          setInstallmentDate(formattedDate);
        }
      },
      mode: 'date',
      display: 'default',
    });
  };

  const handleGeneratePDF = async () => {
    try {
      const htmlContent = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="font-size: 24px; font-weight: bold;">AG - Construction</h2>
          <p>Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34</p>
          <p>CONTACT: +91-9028999253 | 9373450092</p>
          <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
          <h3 style="font-size: 18px; font-weight: bold;">Flat No / Plot No: ${bookingData.residency?.identifier || 'N/A'}</h3>
          <p>Area: ${bookingData.customer?.address || 'N/A'}</p>
          <p>Location: ${bookingData.residency?.name || 'N/A'}</p>
          <p>RECEIVED with thanks from <strong>${bookingData.customer?.name || 'N/A'}</strong> the sum of Rupees <strong>₹${bookingData.dealPrice ? bookingData.dealPrice.toLocaleString() : 'N/A'}</strong> by Cheque / Cash / Draft No. <strong>${bookingData.residency?.identifier || 'N/A'}</strong> flat / plot address <strong>${bookingData.customer?.address || 'N/A'}</strong> in part / full / advance payment.</p>
          <p><strong>Amount: ₹${bookingData.dealPrice ? bookingData.dealPrice.toLocaleString() : 'N/A'}</strong></p>
          <p><strong>Balance Amount: ₹${bookingData.dealPrice && bookingData.agreementAmount && bookingData.tokenAmount ? (bookingData.dealPrice - (bookingData.agreementAmount + bookingData.tokenAmount)).toLocaleString() : 'N/A'}</strong></p>
          <p><strong>Total Payable: ₹${bookingData.agreementAmount && bookingData.tokenAmount ? (bookingData.agreementAmount + bookingData.tokenAmount).toLocaleString() : 'N/A'}</strong></p>
          <div style="display: flex; justify-content: space-between; margin-top: 50px;">
            <p>Customer Signature</p>
            <p>Authorised Signature</p>
          </div>
        </div>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      Alert.alert('Success', 'PDF generated successfully');
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Share Customer Slip for ${bookingData.residency?.identifier || 'N/A'}`,
        UTI: 'com.adobe.pdf',
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to generate or share PDF');
      console.error('PDF Generation Error:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Booking Details for {customerName}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleCustomerSlip}>
          <Text style={styles.buttonText}>Customer Slip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleAddBankDetails}>
          <Text style={styles.buttonText}>Add Bank Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSuccess} onPress={handleAddInstallment}>
          <Text style={styles.buttonText}>Add Installment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonInfo} onPress={handleViewInstallments}>
          <Text style={styles.buttonText}>View Installments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDanger} onPress={handleCancelBooking}>
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
      {bookingData ? (
        <>
          {/* Booking Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Information</Text>
            <Text>Booking ID: {bookingData.id || 'N/A'}</Text>
            <Text>Deal Price: ₹{bookingData.dealPrice ? bookingData.dealPrice.toLocaleString() : 'N/A'}</Text>
            <Text>Token Amount: ₹{bookingData.tokenAmount ? bookingData.tokenAmount.toLocaleString() : 'N/A'}</Text>
            <Text>Agreement Amount: ₹{bookingData.agreementAmount ? bookingData.agreementAmount.toLocaleString() : 'N/A'}</Text>
            <Text>Stamp Duty: ₹{bookingData.stampDutyAmount ? bookingData.stampDutyAmount.toLocaleString() : 'N/A'}</Text>
            <Text>Registration Amount: ₹{bookingData.registrationAmount ? bookingData.registrationAmount.toLocaleString() : 'N/A'}</Text>
            <Text>GST Amount: ₹{bookingData.gstAmount ? bookingData.gstAmount.toLocaleString() : 'N/A'}</Text>
            <Text>Electric/Water Amount: {bookingData.electricWaterAmmount ? bookingData.electricWaterAmmount.toLocaleString() : 'N/A'}</Text>
            <Text>Legal Charges: {bookingData.legalChargesAmmout ? bookingData.legalChargesAmmout.toLocaleString() : 'N/A'}</Text>
            <Text>Booked On: {bookingData.bookedOn ? new Date(bookingData.bookedOn).toLocaleDateString('en-GB') : 'N/A'}</Text>
            <Text>Status: {bookingData.bookingStatus || 'N/A'}</Text>
          </View>

          {/* Customer Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={handleEditCustomerDetails}
              >
                <Feather name="edit" size={16} color="#fff" />
                <Text style={[styles.buttonText, { marginLeft: 5 }]}>Edit Details</Text>
              </TouchableOpacity>
            </View>
            <Text>Name: {bookingData.customer?.name || 'N/A'}</Text>
            <Text>Phone: {bookingData.customer?.phoneNumber || 'N/A'}</Text>
            <Text>Email: {bookingData.customer?.email || 'N/A'}</Text>
            <Text>Aadhar: {bookingData.customer?.aadharNumber || 'N/A'}</Text>
            <Text>Address: {bookingData.customer?.address || 'N/A'}</Text>
            <Text>PAN Card: {bookingData.customer?.panCard || 'N/A'}</Text>
            <Text>Agent Name: {bookingData.customer?.agentName || 'N/A'}</Text>
            <Text>Brokerage: {bookingData.customer?.brokerage ? bookingData.customer.brokerage.toLocaleString() : 'N/A'}</Text>
            <Text>Loan: {bookingData.customer?.loan || 'N/A'}</Text>
            <Text>Bank Name: {bookingData.customer?.bankName || 'N/A'}</Text>
            <Text>Loan Amount: {bookingData.customer?.loanAmount ? bookingData.customer.loanAmount.toLocaleString() : 'N/A'}</Text>
          </View>

          {/* Residency Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Residency Information</Text>
            <Text>Name: {bookingData.residency?.name || 'N/A'}</Text>
            <Text>Type: {bookingData.residency?.residencyType || 'N/A'}</Text>
            <Text>Flat Type: {bookingData.residency?.flatType || 'N/A'}</Text>
            <Text>Availability: {bookingData.residency?.availabilityStatus || 'N/A'}</Text>
            <Text>Floor: {bookingData.residency?.floorNumber || 'N/A'}</Text>
            <Text>Identifier: {bookingData.residency?.identifier || 'N/A'}</Text>
            <Text>Price: ₹{bookingData.residency?.price ? bookingData.residency.price.toLocaleString() : 'N/A'}</Text>
          </View>

          {/* Installment Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Installment Information</Text>
            {bookingData.bookingInstallments?.length > 0 ? (
              bookingData.bookingInstallments.map((installment) => (
                <View key={installment.id} style={styles.installment}>
                  <Text>Installment ID: {installment.id || 'N/A'}</Text>
                  <Text>Date: {installment.installmentDate ? new Date(installment.installmentDate).toLocaleDateString('en-GB') : 'N/A'}</Text>
                  <Text>Amount: ₹{installment.installmentAmount ? installment.installmentAmount.toLocaleString() : 'N/A'}</Text>
                  <Text>Status: {installment.installmentStatus || 'N/A'}</Text>
                  <Text>Remark: {installment.remark || 'N/A'}</Text>
                </View>
              ))
            ) : (
              <Text>No installments available</Text>
            )}
          </View>
        </>
      ) : (
        <Text>No booking data available</Text>
      )}

      {/* Bank Details Modal */}
      <Modal
        visible={showBankDetailForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBankDetailForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Bank Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Bank Name"
              value={bankName}
              onChangeText={setBankName}
            />
            <TextInput
              style={styles.input}
              placeholder="Loan Amount"
              value={loanAmount}
              onChangeText={setLoanAmount}
              keyboardType="numeric"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => setShowBankDetailForm(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleSubmitBankDetails}
              >
                <Text style={styles.buttonText}>Save Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Installment Form Modal */}
      <Modal
        visible={showInstallmentForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowInstallmentForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Installment</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={showDatePicker}
            >
              <Text style={installmentDate ? styles.inputText : styles.placeholderText}>
                {installmentDate || 'Select Installment Date'}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={installmentAmount}
              onChangeText={setInstallmentAmount}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={installmentType}
              onValueChange={(value) => setInstallmentType(value)}
              style={styles.input}
            >
              <Picker.Item label="Select Payment Method" value="" />
              <Picker.Item label="Cash" value="CASH" />
              <Picker.Item label="Cheque" value="CHECK" />
              <Picker.Item label="UPI" value="UPI" />
              <Picker.Item label="RTGS" value="RTGS" />
              <Picker.Item label="NEFT" value="NEFT" />
            </Picker>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Note"
              value={note}
              onChangeText={setNote}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => setShowInstallmentForm(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSuccess}
                onPress={handleSubmitInstallment}
              >
                <Text style={styles.buttonText}>Add Installment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Customer Slip Modal */}
      <Modal
        visible={showCustomerSlip}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomerSlip(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Customer Slip</Text>
            <View style={styles.slipContent}>
              <Text style={styles.slipHeader}>AG - Construction</Text>
              <Text>Address: 28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD, NAGPUR - 34</Text>
              <Text>CONTACT: +91-9028999253 | 9373450092</Text>
              <Text>Date: {new Date().toLocaleDateString('en-GB')}</Text>
              <Text style={styles.slipSubHeader}>
                Flat No / Plot No: {bookingData?.residency?.identifier || 'N/A'}
              </Text>
              <Text>Area: {bookingData?.customer?.address || 'N/A'}</Text>
              <Text>Location: {bookingData?.residency?.name || 'N/A'}</Text>
              <Text>
                RECEIVED with thanks from{' '}
                <Text style={styles.bold}>{bookingData?.customer?.name || 'N/A'}</Text>{' '}
                the sum of Rupees{' '}
                <Text style={styles.bold}>
                  ₹{bookingData?.dealPrice ? bookingData.dealPrice.toLocaleString() : 'N/A'}
                </Text>{' '}
                by Cheque / Cash / Draft No.{' '}
                <Text style={styles.bold}>{bookingData?.residency?.identifier || 'N/A'}</Text>{' '}
                flat / plot address{' '}
                <Text style={styles.bold}>{bookingData?.customer?.address || 'N/A'}</Text>{' '}
                in part / full / advance payment.
              </Text>
              <Text style={styles.bold}>
                Amount: ₹{bookingData?.dealPrice ? bookingData.dealPrice.toLocaleString() : 'N/A'}
              </Text>
              <Text style={styles.bold}>
                Balance Amount: ₹
                {bookingData?.dealPrice && bookingData?.agreementAmount && bookingData?.tokenAmount
                  ? (bookingData.dealPrice - (bookingData.agreementAmount + bookingData.tokenAmount)).toLocaleString()
                  : 'N/A'}
              </Text>
              <Text style={styles.bold}>
                Total Payable: ₹
                {bookingData?.agreementAmount && bookingData?.tokenAmount
                  ? (bookingData.agreementAmount + bookingData.tokenAmount).toLocaleString()
                  : 'N/A'}
              </Text>
              <View style={styles.signatureContainer}>
                <Text>Customer Signature</Text>
                <Text>Authorised Signature</Text>
              </View>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.buttonSuccess}
                onPress={handleGeneratePDF}
              >
                <Text style={styles.buttonText}>Download & Share PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => setShowCustomerSlip(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
  },
  buttonSecondary: {
    backgroundColor: '#6B7280',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
  },
  buttonSuccess: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
  },
  buttonInfo: {
    backgroundColor: '#17A2B8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
  },
  buttonDanger: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
  },
  buttonEdit: {
    backgroundColor: '#17A2B8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  installment: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  slipContent: {
    marginBottom: 20,
  },
  slipHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slipSubHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default FlatOwner;














// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Feather } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
// import { Picker } from "@react-native-picker/picker"
// import { useNavigation } from "@react-navigation/native"
// import axios from "axios"
// import * as Print from "expo-print"
// import * as Sharing from "expo-sharing"
// import { useEffect, useRef, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"

// const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// // Enhanced responsive breakpoints
// const isSmallPhone = screenWidth < 375
// const isMediumPhone = screenWidth >= 375 && screenWidth < 414
// const isLargePhone = screenWidth >= 414 && screenWidth < 768
// const isTablet = screenWidth >= 768 && screenWidth < 1024
// const isLargeTablet = screenWidth >= 1024

// // Enhanced responsive dimensions
// const getResponsiveDimension = (xs, sm, md, lg, xl) => {
//   if (isLargeTablet) return xl
//   if (isTablet) return lg
//   if (isLargePhone) return md
//   if (isMediumPhone) return sm
//   return xs
// }

// // Enhanced font scaling
// const getFontSize = (base) => {
//   const scale = isSmallPhone ? 0.9 : isMediumPhone ? 1 : isLargePhone ? 1.1 : isTablet ? 1.2 : 1.3
//   return Math.round(base * scale)
// }

// // Enhanced spacing
// const getSpacing = (base) => {
//   return getResponsiveDimension(base * 0.8, base, base * 1.1, base * 1.2, base * 1.4)
// }

// const ModernFlatOwner = ({ route }) => {
//   const { bookingId, customerName } = route.params
//   const navigation = useNavigation()
//   const letterRef = useRef()

//   // State management
//   const [bookingData, setBookingData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [showBankDetailForm, setShowBankDetailForm] = useState(false)
//   const [showInstallmentForm, setShowInstallmentForm] = useState(false)
//   const [showCustomerSlip, setShowCustomerSlip] = useState(false)
//   const [bankName, setBankName] = useState("")
//   const [loanAmount, setLoanAmount] = useState("")
//   const [installmentDate, setInstallmentDate] = useState("")
//   const [installmentAmount, setInstallmentAmount] = useState("")
//   const [installmentType, setInstallmentType] = useState("")
//   const [note, setNote] = useState("")

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         const token = await AsyncStorage.getItem("jwtToken")
//         if (!token) {
//           setError("No authentication token found")
//           setLoading(false)
//           return
//         }

//         const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         console.log("Booking Data:", response.data)
//         setBookingData(response.data)
//         setLoading(false)
//       } catch (err) {
//         setError("Failed to fetch booking details")
//         setLoading(false)
//         console.error("Error fetching booking data:", err)
//       }
//     }

//     fetchBookingData()
//   }, [bookingId])

//   // Format currency for display
//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   // Format number input with commas
//   const formatNumberInput = (value) => {
//     const numericValue = value.replace(/[^0-9]/g, "")
//     return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//   }

//   // Handlers for button actions
//   const handleCustomerSlip = () => {
//     if (!bookingData) {
//       Alert.alert("Error", "Booking data not available")
//       return
//     }
//     setShowCustomerSlip(true)
//   }

//   const handleAddBankDetails = () => {
//     if (!bookingData?.customer?.id) {
//       Alert.alert("Error", "Customer ID not available")
//       return
//     }
//     setShowBankDetailForm(true)
//   }

//   const handleAddInstallment = () => {
//     setShowInstallmentForm(true)
//   }

//   const handleViewInstallments = () => {
//     navigation.navigate("ViewInstallments", { bookingId })
//   }

//   const handleEditCustomerDetails = () => {
//     if (!bookingData?.customer?.id) {
//       Alert.alert("Error", "Customer ID not available")
//       return
//     }
//     navigation.navigate("EditCustomerDetails", {
//       bookingId,
//       customerId: bookingData.customer.id,
//     })
//   }

//   const handleCancelBooking = async () => {
//     Alert.alert("Confirm Cancellation", "Are you sure you want to cancel the booking?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Confirm",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const token = await AsyncStorage.getItem("jwtToken")
//             await axios.put(
//               `${BASE_URL}/cancelBooking/${bookingId}`,
//               {},
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               },
//             )
//             Alert.alert("Success", "Booking has been cancelled.")
//             navigation.goBack()
//           } catch (err) {
//             Alert.alert("Error", "Failed to cancel booking.")
//             console.error(err)
//           }
//         },
//       },
//     ])
//   }

//   const handleSubmitBankDetails = async () => {
//     if (!bankName.trim()) {
//       Alert.alert("Error", "Please enter bank name")
//       return
//     }
//     if (!loanAmount.trim()) {
//       Alert.alert("Error", "Please enter loan amount")
//       return
//     }

//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       const formData = {
//         bankName,
//         loanAmount: loanAmount.replace(/,/g, ""),
//       }

//       await axios.post(`${BASE_URL}/addLoanDetails/${bookingData.customer.id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       Alert.alert("Success", "Bank details added successfully")
//       setShowBankDetailForm(false)
//       setBankName("")
//       setLoanAmount("")

//       // Refresh booking data
//       const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setBookingData(response.data)
//     } catch (err) {
//       Alert.alert("Error", "Failed to add bank details")
//       console.error(err)
//     }
//   }

//   const handleSubmitInstallment = async () => {
//     if (!installmentType) {
//       Alert.alert("Error", "Please select a payment method")
//       return
//     }
//     if (!installmentAmount.trim()) {
//       Alert.alert("Error", "Please enter an installment amount")
//       return
//     }

//     try {
//       const token = await AsyncStorage.getItem("jwtToken")
//       const formData = [
//         {
//           installmentDate: installmentDate || new Date().toISOString().split("T")[0],
//           installmentAmount: installmentAmount.replace(/,/g, ""),
//           installmentStatus: installmentType,
//           remark: note,
//         },
//       ]

//       await axios.post(`${BASE_URL}/${bookingId}/addInstallment`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       Alert.alert("Success", "Installment added successfully")
//       setShowInstallmentForm(false)
//       setInstallmentDate("")
//       setInstallmentAmount("")
//       setInstallmentType("")
//       setNote("")

//       // Refresh booking data
//       const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setBookingData(response.data)
//     } catch (err) {
//       Alert.alert("Error", "Failed to add installment")
//       console.error(err)
//     }
//   }

//   const showDatePicker = () => {
//     DateTimePickerAndroid.open({
//       value: installmentDate ? new Date(installmentDate) : new Date(),
//       onChange: (event, selectedDate) => {
//         if (selectedDate) {
//           const formattedDate = selectedDate.toISOString().split("T")[0]
//           setInstallmentDate(formattedDate)
//         }
//       },
//       mode: "date",
//       display: "default",
//     })
//   }

//   const handleGeneratePDF = async () => {
//     try {
//       const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Customer Receipt</title>
//           <style>
//             * { margin: 0; padding: 0; box-sizing: border-box; }
//             body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 800px; margin: 0 auto; padding: 30px; }
//             .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
//             .company-name { font-size: 32px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
//             .company-details { font-size: 14px; color: #666; margin-bottom: 5px; }
//             .contact-info { font-size: 16px; font-weight: bold; color: #333; margin-top: 10px; }
//             .receipt-date { font-size: 14px; color: #666; margin-top: 15px; }
//             .property-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
//             .property-table th, .property-table td { padding: 15px; border: 1px solid #ddd; text-align: left; }
//             .property-table th { background-color: #f8f9fa; font-weight: bold; color: #333; }
//             .property-table tr:nth-child(even) { background-color: #f8f9fa; }
//             .receipt-content { background-color: #f0f9ff; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 5px solid #2563eb; }
//             .receipt-text { font-size: 16px; line-height: 1.8; }
//             .highlight { font-weight: bold; color: #2563eb; }
//             .amount-summary { background-color: #ecfdf5; padding: 20px; border-radius: 10px; margin: 30px 0; border-left: 5px solid #059669; }
//             .amount-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 16px; }
//             .amount-label { font-weight: 600; }
//             .amount-value { font-weight: bold; color: #059669; }
//             .signatures { display: flex; justify-content: space-between; margin-top: 60px; }
//             .signature-box { text-align: center; width: 200px; }
//             .signature-line { border-top: 2px solid #333; margin-bottom: 10px; }
//             .signature-label { font-size: 14px; color: #666; }
//             @media print { .container { padding: 20px; } }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <div class="company-name">AG - Construction</div>
//               <div class="company-details">28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD</div>
//               <div class="company-details">NAGPUR - 34</div>
//               <div class="contact-info">CONTACT: +91-9028999253 | 9373450092</div>
//               <div class="receipt-date">Date: ${new Date().toLocaleDateString("en-GB")}</div>
//             </div>
            
//             <table class="property-table">
//               <tr>
//                 <th>Flat No / Plot No</th>
//                 <td class="highlight">${bookingData?.residency?.identifier || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Area</th>
//                 <td>${bookingData?.customer?.address || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Location</th>
//                 <td>${bookingData?.residency?.name || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Customer Name</th>
//                 <td class="highlight">${bookingData?.customer?.name || "N/A"}</td>
//               </tr>
//             </table>
            
//             <div class="receipt-content">
//               <div class="receipt-text">
//                 RECEIVED with thanks from <span class="highlight">${bookingData?.customer?.name || "N/A"}</span> 
//                 the sum of Rupees <span class="highlight">${formatCurrency(bookingData?.dealPrice)}</span> 
//                 by Cheque / Cash / Draft No. <span class="highlight">${bookingData?.residency?.identifier || "N/A"}</span> 
//                 for flat / plot address <span class="highlight">${bookingData?.customer?.address || "N/A"}</span> 
//                 in part / full / advance payment.
//               </div>
//             </div>
            
//             <div class="amount-summary">
//               <div class="amount-row">
//                 <span class="amount-label">Deal Price:</span>
//                 <span class="amount-value">${formatCurrency(bookingData?.dealPrice)}</span>
//               </div>
//               <div class="amount-row">
//                 <span class="amount-label">Token Amount:</span>
//                 <span class="amount-value">${formatCurrency(bookingData?.tokenAmount)}</span>
//               </div>
//               <div class="amount-row">
//                 <span class="amount-label">Agreement Amount:</span>
//                 <span class="amount-value">${formatCurrency(bookingData?.agreementAmount)}</span>
//               </div>
//               <div class="amount-row">
//                 <span class="amount-label">Total Paid:</span>
//                 <span class="amount-value">${formatCurrency((bookingData?.agreementAmount || 0) + (bookingData?.tokenAmount || 0))}</span>
//               </div>
//               <div class="amount-row" style="border-top: 2px solid #059669; padding-top: 10px; margin-top: 10px;">
//                 <span class="amount-label">Balance Amount:</span>
//                 <span class="amount-value" style="color: #dc2626;">${formatCurrency((bookingData?.dealPrice || 0) - ((bookingData?.agreementAmount || 0) + (bookingData?.tokenAmount || 0)))}</span>
//               </div>
//             </div>
            
//             <div class="signatures">
//               <div class="signature-box">
//                 <div class="signature-line"></div>
//                 <div class="signature-label">Customer Signature</div>
//               </div>
//               <div class="signature-box">
//                 <div class="signature-line"></div>
//                 <div class="signature-label">Authorised Signature</div>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>`

//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         width: 612,
//         height: 792,
//         margins: {
//           left: 20,
//           top: 20,
//           right: 20,
//           bottom: 20,
//         },
//       })

//       Alert.alert("Success", "PDF generated successfully")
//       await Sharing.shareAsync(uri, {
//         mimeType: "application/pdf",
//         dialogTitle: `Share Customer Slip for ${bookingData?.residency?.identifier || "N/A"}`,
//         UTI: "com.adobe.pdf",
//       })
//     } catch (err) {
//       Alert.alert("Error", "Failed to generate or share PDF")
//       console.error("PDF Generation Error:", err)
//     }
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
//         <View style={styles.loadingContent}>
//           <ActivityIndicator size="large" color="#2563eb" />
//           <Text style={styles.loadingText}>Loading booking details...</Text>
//           <View style={styles.loadingBar}>
//             <View style={styles.loadingProgress} />
//           </View>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   // Error state
//   if (error) {
//     return (
//       <SafeAreaView style={styles.errorContainer}>
//         <StatusBar barStyle="light-content" backgroundColor="#dc2626" />
//         <View style={styles.errorContent}>
//           <Feather name="alert-circle" size={getFontSize(80)} color="#ef4444" />
//           <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity
//             style={styles.retryButton}
//             onPress={() => {
//               setError(null)
//               setLoading(true)
//               // Retry fetching data
//             }}
//           >
//             <Feather name="refresh-cw" size={getFontSize(20)} color="#fff" />
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       {/* <StatusBar barStyle="light-content" backgroundColor="#1e40af" /> */}

//       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//         {/* Enhanced Header */}
//         <View style={styles.header}>
//           <View style={styles.headerBackground} />
//           <View style={styles.headerContent}>
//             <View style={styles.headerTop}>
//               <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                 <Feather name="arrow-left" size={getFontSize(24)} color="#fff" />
//               </TouchableOpacity>
//               <View style={styles.headerTitleContainer}>
//                 <Feather name="home" size={getFontSize(32)} color="#fff" />
//                 <Text style={styles.title}>Booking Details</Text>
//               </View>
//               <View style={styles.headerActions}>
//                 <TouchableOpacity style={styles.headerActionButton}>
//                   <Feather name="bell" size={getFontSize(24)} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <Text style={styles.subtitle}>Managing booking for {customerName}</Text>
//           </View>
//         </View>

//         {/* Enhanced Quick Stats Cards */}
//         {bookingData && (
//           <View style={styles.statsContainer}>
//             <View style={styles.statCard}>
//               <View style={styles.statIconContainer}>
//                 <Feather name="home" size={getFontSize(28)} color="#2563eb" />
//               </View>
//               <View style={styles.statContent}>
//                 <Text style={styles.statValue}>{bookingData.residency?.identifier || "N/A"}</Text>
//                 <Text style={styles.statLabel}>Property ID</Text>
//               </View>
//             </View>

//             <View style={styles.statCard}>
//               <View style={[styles.statIconContainer, { backgroundColor: "#dcfce7" }]}>
//                 <Feather name="dollar-sign" size={getFontSize(28)} color="#059669" />
//               </View>
//               <View style={styles.statContent}>
//                 <Text style={[styles.statValue, { color: "#059669" }]}>{formatCurrency(bookingData.dealPrice)}</Text>
//                 <Text style={styles.statLabel}>Deal Price</Text>
//               </View>
//             </View>

//             <View style={styles.statCard}>
//               <View style={[styles.statIconContainer, { backgroundColor: "#fef3c7" }]}>
//                 <Feather name="calendar" size={getFontSize(28)} color="#d97706" />
//               </View>
//               <View style={styles.statContent}>
//                 <Text style={[styles.statValue, { color: "#d97706" }]}>
//                   {bookingData.bookedOn ? new Date(bookingData.bookedOn).toLocaleDateString("en-GB") : "N/A"}
//                 </Text>
//                 <Text style={styles.statLabel}>Booked On</Text>
//               </View>
//             </View>

//             <View style={styles.statCard}>
//               <View style={[styles.statIconContainer, { backgroundColor: "#fecaca" }]}>
//                 <Feather name="trending-up" size={getFontSize(28)} color="#dc2626" />
//               </View>
//               <View style={styles.statContent}>
//                 <Text style={[styles.statValue, { color: "#dc2626" }]}>
//                   {formatCurrency(
//                     (bookingData?.dealPrice || 0) -
//                       ((bookingData?.agreementAmount || 0) + (bookingData?.tokenAmount || 0)),
//                   )}
//                 </Text>
//                 <Text style={styles.statLabel}>Balance</Text>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Enhanced Action Buttons */}
//         <View style={styles.actionSection}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionGrid}>
//             <TouchableOpacity style={[styles.actionCard, styles.primaryAction]} onPress={handleCustomerSlip}>
//               <View style={styles.actionIconContainer}>
//                 <Feather name="file-text" size={getFontSize(24)} color="#fff" />
//               </View>
//               <Text style={styles.actionCardText}>Customer Slip</Text>
//               <Text style={styles.actionCardSubtext}>Generate receipt</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionCard, styles.secondaryAction]} onPress={handleAddBankDetails}>
//               <View style={styles.actionIconContainer}>
//                 <Feather name="credit-card" size={getFontSize(24)} color="#fff" />
//               </View>
//               <Text style={styles.actionCardText}>Bank Details</Text>
//               <Text style={styles.actionCardSubtext}>Add loan info</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionCard, styles.successAction]} onPress={handleAddInstallment}>
//               <View style={styles.actionIconContainer}>
//                 <Feather name="plus-circle" size={getFontSize(24)} color="#fff" />
//               </View>
//               <Text style={styles.actionCardText}>Add Payment</Text>
//               <Text style={styles.actionCardSubtext}>Record installment</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionCard, styles.infoAction]} onPress={handleViewInstallments}>
//               <View style={styles.actionIconContainer}>
//                 <Feather name="eye" size={getFontSize(24)} color="#fff" />
//               </View>
//               <Text style={styles.actionCardText}>View Payments</Text>
//               <Text style={styles.actionCardSubtext}>Payment history</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionCard, styles.warningAction]} onPress={handleEditCustomerDetails}>
//               <View style={styles.actionIconContainer}>
//                 <Feather name="edit" size={getFontSize(24)} color="#fff" />
//               </View>
//               <Text style={styles.actionCardText}>Edit Details</Text>
//               <Text style={styles.actionCardSubtext}>Update information</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionCard, styles.dangerAction]} onPress={handleCancelBooking}>
//               <View style={styles.actionIconContainer}>
//                 <Feather name="x-circle" size={getFontSize(24)} color="#fff" />
//               </View>
//               <Text style={styles.actionCardText}>Cancel Booking</Text>
//               <Text style={styles.actionCardSubtext}>Cancel reservation</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Enhanced Details Cards */}
//         {bookingData && (
//           <View style={styles.detailsSection}>
//             <Text style={styles.sectionTitle}>Booking Information</Text>

//             {/* Booking Details Card */}
//             <View style={styles.detailsCard}>
//               <View style={styles.cardHeader}>
//                 <View style={styles.cardHeaderLeft}>
//                   <View style={styles.propertyIcon}>
//                     <Feather name="file-text" size={getFontSize(28)} color="#2563eb" />
//                   </View>
//                   <View style={styles.cardHeaderText}>
//                     <Text style={styles.cardTitle}>Booking #{bookingData.id || "N/A"}</Text>
//                     <Text style={styles.cardSubtitle}>Status: {bookingData.bookingStatus || "N/A"}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.statusBadge}>
//                   <Text style={styles.statusText}>{bookingData.bookingStatus || "ACTIVE"}</Text>
//                 </View>
//               </View>

//               <View style={styles.infoGrid}>
//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="dollar-sign" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Deal Price</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.dealPrice)}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="credit-card" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Token Amount</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.tokenAmount)}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="file" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Agreement</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.agreementAmount)}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="bookmark" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Stamp Duty</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.stampDutyAmount)}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="clipboard" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Registration</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.registrationAmount)}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="percent" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>GST Amount</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.gstAmount)}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="zap" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Electric/Water</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.electricWaterAmmount)}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="briefcase" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Legal Charges</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.legalChargesAmmout)}</Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Customer Details Card */}
//             <View style={styles.detailsCard}>
//               <View style={styles.cardHeader}>
//                 <View style={styles.cardHeaderLeft}>
//                   <View style={styles.propertyIcon}>
//                     <Feather name="user" size={getFontSize(28)} color="#2563eb" />
//                   </View>
//                   <View style={styles.cardHeaderText}>
//                     <Text style={styles.cardTitle}>{bookingData.customer?.name || "N/A"}</Text>
//                     <Text style={styles.cardSubtitle}>{bookingData.customer?.phoneNumber || "N/A"}</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity style={styles.editButton} onPress={handleEditCustomerDetails}>
//                   <Feather name="edit" size={getFontSize(16)} color="#fff" />
//                   <Text style={styles.editButtonText}>Edit</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.infoGrid}>
//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="mail" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Email</Text>
//                     <Text style={styles.infoValue}>{bookingData.customer?.email || "N/A"}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="credit-card" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>PAN Card</Text>
//                     <Text style={styles.infoValue}>{bookingData.customer?.panCard || "N/A"}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="hash" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Aadhar</Text>
//                     <Text style={styles.infoValue}>{bookingData.customer?.aadharNumber || "N/A"}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="users" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Agent</Text>
//                     <Text style={styles.infoValue}>{bookingData.customer?.agentName || "N/A"}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="dollar-sign" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Brokerage</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.customer?.brokerage)}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="home" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Bank</Text>
//                     <Text style={styles.infoValue}>{bookingData.customer?.bankName || "N/A"}</Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.addressSection}>
//                 <View style={styles.addressHeader}>
//                   <Feather name="map-pin" size={getFontSize(16)} color="#6b7280" />
//                   <Text style={styles.infoLabel}>Address</Text>
//                 </View>
//                 <Text style={styles.addressText}>{bookingData.customer?.address || "N/A"}</Text>
//               </View>
//             </View>

//             {/* Property Details Card */}
//             <View style={styles.detailsCard}>
//               <View style={styles.cardHeader}>
//                 <View style={styles.cardHeaderLeft}>
//                   <View style={styles.propertyIcon}>
//                     <Feather name="home" size={getFontSize(28)} color="#2563eb" />
//                   </View>
//                   <View style={styles.cardHeaderText}>
//                     <Text style={styles.cardTitle}>{bookingData.residency?.name || "N/A"}</Text>
//                     <Text style={styles.cardSubtitle}>
//                       {bookingData.residency?.residencyType || "N/A"} - {bookingData.residency?.flatType || "N/A"}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.infoGrid}>
//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="layers" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Floor</Text>
//                     <Text style={styles.infoValue}>{bookingData.residency?.floorNumber || "N/A"}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="hash" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Identifier</Text>
//                     <Text style={styles.infoValue}>{bookingData.residency?.identifier || "N/A"}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Feather name="dollar-sign" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Base Price</Text>
//                     <Text style={styles.infoValue}>{formatCurrency(bookingData.residency?.price)}</Text>
//                   </View>
//                   <View style={styles.infoItem}>
//                     <Feather name="check-circle" size={getFontSize(16)} color="#6b7280" />
//                     <Text style={styles.infoLabel}>Status</Text>
//                     <Text style={[styles.infoValue, styles.statusValue]}>
//                       {bookingData.residency?.availabilityStatus || "N/A"}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Installments Card */}
//             {bookingData.bookingInstallments && bookingData.bookingInstallments.length > 0 && (
//               <View style={styles.detailsCard}>
//                 <View style={styles.cardHeader}>
//                   <View style={styles.cardHeaderLeft}>
//                     <View style={styles.propertyIcon}>
//                       <Feather name="list" size={getFontSize(28)} color="#2563eb" />
//                     </View>
//                     <View style={styles.cardHeaderText}>
//                       <Text style={styles.cardTitle}>Payment History</Text>
//                       <Text style={styles.cardSubtitle}>{bookingData.bookingInstallments.length} payments</Text>
//                     </View>
//                   </View>
//                   <TouchableOpacity style={styles.viewButton} onPress={handleViewInstallments}>
//                     <Feather name="eye" size={getFontSize(16)} color="#fff" />
//                     <Text style={styles.editButtonText}>View All</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.installmentsList}>
//                   {bookingData.bookingInstallments.slice(0, 3).map((installment, index) => (
//                     <View key={installment.id} style={styles.installmentCard}>
//                       <View style={styles.installmentHeader}>
//                         <View style={styles.installmentNumber}>
//                           <Text style={styles.installmentNumberText}>#{index + 1}</Text>
//                         </View>
//                         <View style={styles.installmentDate}>
//                           <Feather name="calendar" size={getFontSize(14)} color="#6b7280" />
//                           <Text style={styles.installmentDateText}>
//                             {new Date(installment.installmentDate).toLocaleDateString("en-GB")}
//                           </Text>
//                         </View>
//                         <View style={styles.installmentAmount}>
//                           <Text style={styles.installmentAmountText}>
//                             {formatCurrency(installment.installmentAmount)}
//                           </Text>
//                         </View>
//                       </View>
//                       <View style={styles.installmentBody}>
//                         <View style={styles.methodBadge}>
//                           <Text style={styles.methodBadgeText}>{installment.installmentStatus}</Text>
//                         </View>
//                         {installment.remark && (
//                           <Text style={styles.installmentNote} numberOfLines={1}>
//                             {installment.remark}
//                           </Text>
//                         )}
//                       </View>
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             )}
//           </View>
//         )}
//       </ScrollView>

//       {/* Enhanced Bank Details Modal */}
//       <Modal visible={showBankDetailForm} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <KeyboardAvoidingView
//             style={styles.modalKeyboardContainer}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//           >
//             <View style={styles.modalContainer}>
//               <View style={[styles.modal, styles.modalMedium]}>
//                 <View style={styles.modalHeader}>
//                   <View style={styles.modalHeaderLeft}>
//                     <View style={styles.modalIcon}>
//                       <Feather name="credit-card" size={getFontSize(24)} color="#2563eb" />
//                     </View>
//                     <Text style={styles.modalTitle}>Add Bank Details</Text>
//                   </View>
//                   <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowBankDetailForm(false)}>
//                     <Feather name="x" size={getFontSize(24)} color="#6b7280" />
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
//                   <View style={styles.formGroup}>
//                     <Text style={styles.formLabel}>
//                       <Feather name="home" size={getFontSize(16)} color="#374151" /> Bank Name
//                     </Text>
//                     <TextInput
//                       style={styles.formInput}
//                       value={bankName}
//                       onChangeText={setBankName}
//                       placeholder="Enter bank name"
//                       placeholderTextColor="#9ca3af"
//                     />
//                   </View>

//                   <View style={styles.formGroup}>
//                     <Text style={styles.formLabel}>
//                       <Feather name="dollar-sign" size={getFontSize(16)} color="#374151" /> Loan Amount
//                     </Text>
//                     <TextInput
//                       style={styles.formInput}
//                       value={loanAmount}
//                       onChangeText={(text) => setLoanAmount(formatNumberInput(text))}
//                       keyboardType="numeric"
//                       placeholder="Enter loan amount"
//                       placeholderTextColor="#9ca3af"
//                     />
//                   </View>

//                   <View style={styles.modalActions}>
//                     <TouchableOpacity
//                       style={[styles.modalButton, styles.modalCancelButton]}
//                       onPress={() => setShowBankDetailForm(false)}
//                     >
//                       <Text style={styles.modalCancelButtonText}>Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={[styles.modalButton, styles.modalPrimaryButton]}
//                       onPress={handleSubmitBankDetails}
//                     >
//                       <Feather name="save" size={getFontSize(18)} color="#fff" />
//                       <Text style={styles.modalPrimaryButtonText}>Save Details</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </ScrollView>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </View>
//       </Modal>

//       {/* Enhanced Installment Form Modal */}
//       <Modal visible={showInstallmentForm} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <KeyboardAvoidingView
//             style={styles.modalKeyboardContainer}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//           >
//             <View style={styles.modalContainer}>
//               <View style={[styles.modal, styles.modalMedium]}>
//                 <View style={styles.modalHeader}>
//                   <View style={styles.modalHeaderLeft}>
//                     <View style={styles.modalIcon}>
//                       <Feather name="plus-circle" size={getFontSize(24)} color="#059669" />
//                     </View>
//                     <Text style={styles.modalTitle}>Add Payment</Text>
//                   </View>
//                   <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowInstallmentForm(false)}>
//                     <Feather name="x" size={getFontSize(24)} color="#6b7280" />
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
//                   <View style={styles.formGroup}>
//                     <Text style={styles.formLabel}>
//                       <Feather name="calendar" size={getFontSize(16)} color="#374151" /> Payment Date
//                     </Text>
//                     <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
//                       <Feather name="calendar" size={getFontSize(20)} color="#6b7280" />
//                       <Text style={styles.datePickerText}>
//                         {installmentDate || new Date().toLocaleDateString("en-GB")}
//                       </Text>
//                       <Feather name="chevron-down" size={getFontSize(20)} color="#6b7280" />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.formGroup}>
//                     <Text style={styles.formLabel}>
//                       <Feather name="dollar-sign" size={getFontSize(16)} color="#374151" /> Payment Amount
//                     </Text>
//                     <TextInput
//                       style={styles.formInput}
//                       value={installmentAmount}
//                       onChangeText={(text) => setInstallmentAmount(formatNumberInput(text))}
//                       keyboardType="numeric"
//                       placeholder="Enter payment amount"
//                       placeholderTextColor="#9ca3af"
//                     />
//                   </View>

//                   <View style={styles.formGroup}>
//                     <Text style={styles.formLabel}>
//                       <Feather name="credit-card" size={getFontSize(16)} color="#374151" /> Payment Method
//                     </Text>
//                     <View style={styles.pickerWrapper}>
//                       <Picker
//                         selectedValue={installmentType}
//                         onValueChange={(value) => setInstallmentType(value)}
//                         style={styles.picker}
//                       >
//                         <Picker.Item label="Select Payment Method" value="" />
//                         <Picker.Item label="💵 Cash" value="CASH" />
//                         <Picker.Item label="🏦 Cheque" value="CHECK" />
//                         <Picker.Item label="📱 UPI" value="UPI" />
//                         <Picker.Item label="🏧 RTGS" value="RTGS" />
//                         <Picker.Item label="💳 NEFT" value="NEFT" />
//                       </Picker>
//                     </View>
//                   </View>

//                   <View style={styles.formGroup}>
//                     <Text style={styles.formLabel}>
//                       <Feather name="file-text" size={getFontSize(16)} color="#374151" /> Notes (Optional)
//                     </Text>
//                     <TextInput
//                       style={[styles.formInput, styles.textArea]}
//                       value={note}
//                       onChangeText={setNote}
//                       multiline
//                       numberOfLines={3}
//                       placeholder="Add payment notes or remarks..."
//                       placeholderTextColor="#9ca3af"
//                     />
//                   </View>

//                   <View style={styles.modalActions}>
//                     <TouchableOpacity
//                       style={[styles.modalButton, styles.modalCancelButton]}
//                       onPress={() => setShowInstallmentForm(false)}
//                     >
//                       <Text style={styles.modalCancelButtonText}>Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={[styles.modalButton, styles.modalPrimaryButton]}
//                       onPress={handleSubmitInstallment}
//                     >
//                       <Feather name="plus" size={getFontSize(18)} color="#fff" />
//                       <Text style={styles.modalPrimaryButtonText}>Add Payment</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </ScrollView>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </View>
//       </Modal>

//       {/* Enhanced Customer Slip Modal */}
//       <Modal visible={showCustomerSlip} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={[styles.modal, styles.modalLarge]}>
//               <View style={styles.modalHeader}>
//                 <View style={styles.modalHeaderLeft}>
//                   <View style={styles.modalIcon}>
//                     <Feather name="file-text" size={getFontSize(24)} color="#059669" />
//                   </View>
//                   <Text style={styles.modalTitle}>Customer Receipt</Text>
//                 </View>
//                 <View style={styles.modalHeaderActions}>
//                   <TouchableOpacity
//                     style={[styles.modalActionButton, styles.downloadButton]}
//                     onPress={handleGeneratePDF}
//                   >
//                     <Feather name="download" size={getFontSize(18)} color="#fff" />
//                     <Text style={styles.modalActionButtonText}>Download</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowCustomerSlip(false)}>
//                     <Feather name="x" size={getFontSize(24)} color="#6b7280" />
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
//                 <View style={styles.receiptContainer}>
//                   {/* Company Header */}
//                   <View style={styles.receiptHeader}>
//                     <Text style={styles.companyName}>AG - Construction</Text>
//                     <Text style={styles.companyAddress}>28, GOVIND PRABHU NAGAR, RAJAPETH HUDKESHWAR ROAD</Text>
//                     <Text style={styles.companyAddress}>NAGPUR - 34</Text>
//                     <Text style={styles.companyContact}>CONTACT: +91-9028999253 | 9373450092</Text>
//                     <Text style={styles.receiptDate}>Date: {new Date().toLocaleDateString("en-GB")}</Text>
//                   </View>

//                   {/* Property Details Table */}
//                   <View style={styles.receiptTable}>
//                     <View style={styles.receiptTableRow}>
//                       <Text style={styles.receiptTableLabel}>Flat No / Plot No</Text>
//                       <Text style={styles.receiptTableValue}>{bookingData?.residency?.identifier || "N/A"}</Text>
//                     </View>
//                     <View style={styles.receiptTableRow}>
//                       <Text style={styles.receiptTableLabel}>Area</Text>
//                       <Text style={styles.receiptTableValue}>{bookingData?.customer?.address || "N/A"}</Text>
//                     </View>
//                     <View style={styles.receiptTableRow}>
//                       <Text style={styles.receiptTableLabel}>Location</Text>
//                       <Text style={styles.receiptTableValue}>{bookingData?.residency?.name || "N/A"}</Text>
//                     </View>
//                     <View style={[styles.receiptTableRow, { borderBottomWidth: 0 }]}>
//                       <Text style={styles.receiptTableLabel}>Customer Name</Text>
//                       <Text style={styles.receiptTableValue}>{bookingData?.customer?.name || "N/A"}</Text>
//                     </View>
//                   </View>

//                   {/* Receipt Content */}
//                   <View style={styles.receiptContent}>
//                     <Text style={styles.receiptText}>
//                       RECEIVED with thanks from <Text style={styles.receiptBold}>{bookingData?.customer?.name}</Text>{" "}
//                       the sum of Rupees <Text style={styles.receiptBold}>{formatCurrency(bookingData?.dealPrice)}</Text>{" "}
//                       by Cheque / Cash / Draft No.{" "}
//                       <Text style={styles.receiptBold}>{bookingData?.residency?.identifier}</Text> for flat / plot
//                       address <Text style={styles.receiptBold}>{bookingData?.customer?.address}</Text> in part / full /
//                       advance payment.
//                     </Text>
//                   </View>

//                   {/* Amount Summary */}
//                   <View style={styles.receiptSummary}>
//                     <View style={styles.summaryRow}>
//                       <Text style={styles.summaryRowLabel}>Deal Price:</Text>
//                       <Text style={styles.summaryRowValue}>{formatCurrency(bookingData?.dealPrice)}</Text>
//                     </View>
//                     <View style={styles.summaryRow}>
//                       <Text style={styles.summaryRowLabel}>Token Amount:</Text>
//                       <Text style={styles.summaryRowValue}>{formatCurrency(bookingData?.tokenAmount)}</Text>
//                     </View>
//                     <View style={styles.summaryRow}>
//                       <Text style={styles.summaryRowLabel}>Agreement Amount:</Text>
//                       <Text style={styles.summaryRowValue}>{formatCurrency(bookingData?.agreementAmount)}</Text>
//                     </View>
//                     <View style={[styles.summaryRow, styles.totalPaidRow]}>
//                       <Text style={styles.summaryRowLabel}>Total Paid:</Text>
//                       <Text style={[styles.summaryRowValue, styles.totalPaidValue]}>
//                         {formatCurrency((bookingData?.agreementAmount || 0) + (bookingData?.tokenAmount || 0))}
//                       </Text>
//                     </View>
//                     <View style={[styles.summaryRow, styles.balanceRow]}>
//                       <Text style={styles.summaryRowLabel}>Balance Amount:</Text>
//                       <Text style={[styles.summaryRowValue, styles.balanceValue]}>
//                         {formatCurrency(
//                           (bookingData?.dealPrice || 0) -
//                             ((bookingData?.agreementAmount || 0) + (bookingData?.tokenAmount || 0)),
//                         )}
//                       </Text>
//                     </View>
//                   </View>

//                   {/* Signatures */}
//                   <View style={styles.receiptSignatures}>
//                     <View style={styles.signatureSection}>
//                       <View style={styles.signatureLine} />
//                       <Text style={styles.signatureLabel}>Customer Signature</Text>
//                     </View>
//                     <View style={styles.signatureSection}>
//                       <View style={styles.signatureLine} />
//                       <Text style={styles.signatureLabel}>Authorised Signature</Text>
//                     </View>
//                   </View>
//                 </View>
//               </ScrollView>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   // Container and Layout
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   scrollContainer: {
//     flex: 1,
//   },

//   // Loading States
//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//   },
//   loadingContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: getSpacing(40),
//   },
//   loadingText: {
//     marginTop: getSpacing(20),
//     fontSize: getFontSize(18),
//     color: "#6b7280",
//     fontWeight: "600",
//   },
//   loadingBar: {
//     width: getResponsiveDimension(200, 250, 300, 350, 400),
//     height: 4,
//     backgroundColor: "#e5e7eb",
//     borderRadius: 2,
//     marginTop: getSpacing(20),
//     overflow: "hidden",
//   },
//   loadingProgress: {
//     width: "60%",
//     height: "100%",
//     backgroundColor: "#2563eb",
//     borderRadius: 2,
//   },

//   // Error States
//   errorContainer: {
//     flex: 1,
//     backgroundColor: "#fef2f2",
//   },
//   errorContent: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: getSpacing(40),
//   },
//   errorTitle: {
//     fontSize: getFontSize(24),
//     fontWeight: "bold",
//     color: "#dc2626",
//     marginTop: getSpacing(20),
//     marginBottom: getSpacing(10),
//     textAlign: "center",
//   },
//   errorText: {
//     fontSize: getFontSize(16),
//     color: "#7f1d1d",
//     textAlign: "center",
//     marginBottom: getSpacing(30),
//     lineHeight: getFontSize(24),
//   },
//   retryButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#dc2626",
//     paddingVertical: getSpacing(12),
//     paddingHorizontal: getSpacing(24),
//     borderRadius: getSpacing(8),
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontSize: getFontSize(16),
//     fontWeight: "600",
//     marginLeft: getSpacing(8),
//   },

//   // Enhanced Header
//   header: {
//     position: "relative",
//     paddingTop: Platform.OS === "ios" ? getSpacing(60) : getSpacing(40),
//     paddingBottom: getSpacing(30),
//     paddingHorizontal: getSpacing(20),
//     overflow: "hidden",
//   },
//   headerBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "#1e40af",
//     borderBottomLeftRadius: getSpacing(30),
//     borderBottomRightRadius: getSpacing(30),
//   },
//   headerContent: {
//     position: "relative",
//     zIndex: 1,
//   },
//   headerTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: getSpacing(15),
//   },
//   backButton: {
//     padding: getSpacing(8),
//     borderRadius: getSpacing(20),
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//   },
//   headerTitleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "center",
//     marginHorizontal: getSpacing(20),
//   },
//   title: {
//     fontSize: getFontSize(24),
//     fontWeight: "bold",
//     color: "#fff",
//     marginLeft: getSpacing(12),
//     textAlign: "center",
//   },
//   headerActions: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerActionButton: {
//     padding: getSpacing(8),
//     borderRadius: getSpacing(20),
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//   },
//   subtitle: {
//     fontSize: getFontSize(16),
//     color: "#dbeafe",
//     textAlign: "center",
//     opacity: 0.9,
//     lineHeight: getFontSize(22),
//   },

//   // Enhanced Stats Cards
//   statsContainer: {
//     flexDirection: isTablet ? "row" : "column",
//     paddingHorizontal: getSpacing(20),
//     paddingTop: getSpacing(30),
//     gap: getSpacing(15),
//   },
//   statCard: {
//     flex: isTablet ? 1 : undefined,
//     backgroundColor: "#fff",
//     padding: getSpacing(20),
//     borderRadius: getSpacing(16),
//     flexDirection: "row",
//     alignItems: "center",
//     elevation: 6,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   statIconContainer: {
//     width: getSpacing(60),
//     height: getSpacing(60),
//     borderRadius: getSpacing(30),
//     backgroundColor: "#dbeafe",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: getSpacing(15),
//   },
//   statContent: {
//     flex: 1,
//   },
//   statValue: {
//     fontSize: getFontSize(18),
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: getSpacing(4),
//   },
//   statLabel: {
//     fontSize: getFontSize(14),
//     color: "#6b7280",
//     fontWeight: "500",
//   },

//   // Enhanced Action Section
//   actionSection: {
//     paddingHorizontal: getSpacing(20),
//     paddingTop: getSpacing(30),
//   },
//   sectionTitle: {
//     fontSize: getFontSize(20),
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: getSpacing(20),
//   },
//   actionGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: getSpacing(15),
//   },
//   actionCard: {
//     flex: isTablet ? 0.32 : isLargePhone ? 0.48 : 1,
//     minWidth: isTablet ? 0 : isLargePhone ? "45%" : "100%",
//     backgroundColor: "#2563eb",
//     padding: getSpacing(20),
//     borderRadius: getSpacing(16),
//     alignItems: "center",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   actionIconContainer: {
//     width: getSpacing(50),
//     height: getSpacing(50),
//     borderRadius: getSpacing(25),
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: getSpacing(12),
//   },
//   actionCardText: {
//     fontSize: getFontSize(16),
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: getSpacing(4),
//   },
//   actionCardSubtext: {
//     fontSize: getFontSize(12),
//     color: "rgba(255, 255, 255, 0.8)",
//     textAlign: "center",
//   },
//   primaryAction: { backgroundColor: "#2563eb" },
//   secondaryAction: { backgroundColor: "#7c3aed" },
//   successAction: { backgroundColor: "#059669" },
//   infoAction: { backgroundColor: "#0891b2" },
//   warningAction: { backgroundColor: "#d97706" },
//   dangerAction: { backgroundColor: "#dc2626" },

//   // Enhanced Details Section
//   detailsSection: {
//     paddingHorizontal: getSpacing(20),
//     paddingTop: getSpacing(30),
//     paddingBottom: getSpacing(30),
//   },
//   detailsCard: {
//     backgroundColor: "#fff",
//     borderRadius: getSpacing(20),
//     padding: getSpacing(24),
//     marginBottom: getSpacing(20),
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: getSpacing(24),
//     paddingBottom: getSpacing(20),
//     borderBottomWidth: 1,
//     borderBottomColor: "#f3f4f6",
//   },
//   cardHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   propertyIcon: {
//     width: getSpacing(60),
//     height: getSpacing(60),
//     borderRadius: getSpacing(30),
//     backgroundColor: "#dbeafe",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: getSpacing(16),
//   },
//   cardHeaderText: {
//     flex: 1,
//   },
//   cardTitle: {
//     fontSize: getFontSize(20),
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: getSpacing(4),
//   },
//   cardSubtitle: {
//     fontSize: getFontSize(16),
//     color: "#4b5563",
//     fontWeight: "600",
//     marginBottom: getSpacing(2),
//   },
//   statusBadge: {
//     backgroundColor: "#dcfce7",
//     paddingHorizontal: getSpacing(12),
//     paddingVertical: getSpacing(6),
//     borderRadius: getSpacing(20),
//   },
//   statusText: {
//     fontSize: getFontSize(12),
//     fontWeight: "bold",
//     color: "#059669",
//   },
//   editButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#2563eb",
//     paddingVertical: getSpacing(8),
//     paddingHorizontal: getSpacing(12),
//     borderRadius: getSpacing(8),
//     elevation: 2,
//   },
//   editButtonText: {
//     color: "#fff",
//     fontSize: getFontSize(14),
//     fontWeight: "600",
//     marginLeft: getSpacing(6),
//   },
//   viewButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0891b2",
//     paddingVertical: getSpacing(8),
//     paddingHorizontal: getSpacing(12),
//     borderRadius: getSpacing(8),
//     elevation: 2,
//   },

//   // Info Grid
//   infoGrid: {
//     gap: getSpacing(12),
//   },
//   infoRow: {
//     flexDirection: isTablet ? "row" : "column",
//     gap: getSpacing(12),
//   },
//   infoItem: {
//     flex: isTablet ? 1 : undefined,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f8fafc",
//     padding: getSpacing(12),
//     borderRadius: getSpacing(8),
//     borderLeftWidth: 3,
//     borderLeftColor: "#e5e7eb",
//   },
//   infoLabel: {
//     fontSize: getFontSize(14),
//     color: "#6b7280",
//     marginLeft: getSpacing(8),
//     flex: 1,
//   },
//   infoValue: {
//     fontSize: getFontSize(14),
//     color: "#1f2937",
//     fontWeight: "600",
//     flex: 1,
//     textAlign: "right",
//   },
//   statusValue: {
//     color: "#059669",
//   },
//   addressSection: {
//     marginTop: getSpacing(16),
//   },
//   addressHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: getSpacing(8),
//   },
//   addressText: {
//     fontSize: getFontSize(14),
//     color: "#1f2937",
//     lineHeight: getFontSize(20),
//     backgroundColor: "#f8fafc",
//     padding: getSpacing(12),
//     borderRadius: getSpacing(8),
//     borderLeftWidth: 3,
//     borderLeftColor: "#e5e7eb",
//   },

//   // Installments List
//   installmentsList: {
//     gap: getSpacing(12),
//   },
//   installmentCard: {
//     backgroundColor: "#f8fafc",
//     borderRadius: getSpacing(12),
//     padding: getSpacing(16),
//     borderLeftWidth: 4,
//     borderLeftColor: "#2563eb",
//   },
//   installmentHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: getSpacing(12),
//   },
//   installmentNumber: {
//     width: getSpacing(30),
//     height: getSpacing(30),
//     borderRadius: getSpacing(15),
//     backgroundColor: "#2563eb",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   installmentNumberText: {
//     fontSize: getFontSize(12),
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   installmentDate: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginLeft: getSpacing(12),
//   },
//   installmentDateText: {
//     fontSize: getFontSize(14),
//     color: "#6b7280",
//     marginLeft: getSpacing(6),
//   },
//   installmentAmount: {
//     alignItems: "flex-end",
//   },
//   installmentAmountText: {
//     fontSize: getFontSize(16),
//     fontWeight: "bold",
//     color: "#059669",
//   },
//   installmentBody: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   methodBadge: {
//     backgroundColor: "#dbeafe",
//     paddingHorizontal: getSpacing(12),
//     paddingVertical: getSpacing(4),
//     borderRadius: getSpacing(20),
//   },
//   methodBadgeText: {
//     fontSize: getFontSize(12),
//     fontWeight: "600",
//     color: "#2563eb",
//   },
//   installmentNote: {
//     fontSize: getFontSize(12),
//     color: "#6b7280",
//     fontStyle: "italic",
//     flex: 1,
//     marginLeft: getSpacing(12),
//   },

//   // Premium Modal Styles with Perfect UI Design
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.85)",
//     justifyContent: "center",
//   },

//   // Premium Modal Styles with Perfect UI Design
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.85)",
//     justifyContent: "center",
//     alignItems: "center",
//     backdropFilter: "blur(20px)",
//   },
//   modalKeyboardContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     padding: getSpacing(16),
//   },
//   modalContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     maxHeight: "100%",
//   },
//   modal: {
//     backgroundColor: "#ffffff",
//     borderRadius: getSpacing(32),
//     maxHeight: screenHeight * 0.92,
//     elevation: 50,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 25 },
//     shadowOpacity: 0.6,
//     shadowRadius: 40,
//     borderWidth: 0.5,
//     borderColor: "rgba(255, 255, 255, 0.8)",
//     overflow: "hidden",
//     transform: [{ scale: 1 }],
//   },
//   modalMedium: {
//     width: getResponsiveDimension(
//       screenWidth * 0.92,
//       screenWidth * 0.88,
//       screenWidth * 0.78,
//       screenWidth * 0.68,
//       screenWidth * 0.58,
//     ),
//     minHeight: getSpacing(500),
//   },
//   modalLarge: {
//     width: getResponsiveDimension(
//       screenWidth * 0.96,
//       screenWidth * 0.92,
//       screenWidth * 0.88,
//       screenWidth * 0.82,
//       screenWidth * 0.78,
//     ),
//     minHeight: screenHeight * 0.8,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: getSpacing(32),
//     paddingBottom: getSpacing(28),
//     borderBottomWidth: 0,
//     backgroundColor: "transparent",
//     position: "relative",
//     overflow: "hidden",
//   },
//   modalHeaderBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     backgroundColor: "#f8fafc",
//   },
//   modalHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     zIndex: 2,
//   },
//   modalIcon: {
//     width: getSpacing(72),
//     height: getSpacing(72),
//     borderRadius: getSpacing(36),
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: getSpacing(20),
//     borderWidth: 3,
//     borderColor: "rgba(255, 255, 255, 0.6)",
//     elevation: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//   },
//   modalTitle: {
//     fontSize: getFontSize(26),
//     fontWeight: "800",
//     color: "#0f172a",
//     flex: 1,
//     letterSpacing: 0.8,
//     textShadowColor: "rgba(255, 255, 255, 0.8)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   modalHeaderActions: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: getSpacing(16),
//     zIndex: 2,
//   },
//   modalActionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: getSpacing(14),
//     paddingHorizontal: getSpacing(24),
//     borderRadius: getSpacing(20),
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.3)",
//     minWidth: getSpacing(120),
//     justifyContent: "center",
//   },
//   modalActionButtonText: {
//     color: "#ffffff",
//     fontSize: getFontSize(16),
//     fontWeight: "700",
//     marginLeft: getSpacing(10),
//     letterSpacing: 0.5,
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   downloadButton: {
//     backgroundColor: "#10b981",
//     background: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)",
//   },
//   modalCloseButton: {
//     padding: getSpacing(16),
//     borderRadius: getSpacing(50),
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     borderWidth: 2,
//     borderColor: "rgba(148, 163, 184, 0.3)",
//     width: getSpacing(56),
//     height: getSpacing(56),
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     flex: 1,
//     padding: getSpacing(32),
//     paddingTop: getSpacing(24),
//     backgroundColor: "#ffffff",
//   },

//   // Premium Form Styles with Perfect Design
//   formGroup: {
//     marginBottom: getSpacing(28),
//     position: "relative",
//   },
//   formLabel: {
//     fontSize: getFontSize(18),
//     fontWeight: "700",
//     color: "#1e293b",
//     marginBottom: getSpacing(12),
//     flexDirection: "row",
//     alignItems: "center",
//     letterSpacing: 0.5,
//     textShadowColor: "rgba(0, 0, 0, 0.05)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 1,
//   },
//   formInput: {
//     borderWidth: 2,
//     borderColor: "#cbd5e1",
//     borderRadius: getSpacing(20),
//     paddingVertical: getSpacing(20),
//     paddingHorizontal: getSpacing(24),
//     fontSize: getFontSize(17),
//     color: "#0f172a",
//     backgroundColor: "#ffffff",
//     elevation: 4,
//     shadowColor: "#64748b",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     minHeight: getSpacing(64),
//     fontWeight: "500",
//     letterSpacing: 0.3,
//   },
//   formInputFocused: {
//     borderColor: "#3b82f6",
//     borderWidth: 3,
//     elevation: 8,
//     shadowColor: "#3b82f6",
//     shadowOpacity: 0.25,
//     backgroundColor: "#fefefe",
//     transform: [{ scale: 1.02 }],
//   },
//   textArea: {
//     height: getSpacing(140),
//     textAlignVertical: "top",
//     paddingTop: getSpacing(20),
//     lineHeight: getFontSize(24),
//   },
//   datePickerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 2,
//     borderColor: "#cbd5e1",
//     borderRadius: getSpacing(20),
//     paddingVertical: getSpacing(20),
//     paddingHorizontal: getSpacing(24),
//     backgroundColor: "#ffffff",
//     elevation: 4,
//     shadowColor: "#64748b",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     minHeight: getSpacing(64),
//   },
//   datePickerText: {
//     fontSize: getFontSize(17),
//     color: "#0f172a",
//     flex: 1,
//     marginLeft: getSpacing(12),
//     fontWeight: "600",
//     letterSpacing: 0.3,
//   },
//   pickerWrapper: {
//     borderWidth: 2,
//     borderColor: "#cbd5e1",
//     borderRadius: getSpacing(20),
//     backgroundColor: "#ffffff",
//     elevation: 4,
//     shadowColor: "#64748b",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     overflow: "hidden",
//     minHeight: getSpacing(64),
//   },
//   picker: {
//     height: getSpacing(64),
//     color: "#0f172a",
//     fontSize: getFontSize(17),
//     fontWeight: "600",
//   },

//   // Premium Modal Actions with Perfect Design
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: getSpacing(20),
//     marginTop: getSpacing(40),
//     paddingTop: getSpacing(32),
//     borderTopWidth: 1,
//     borderTopColor: "#e2e8f0",
//     position: "relative",
//   },
//   modalActionsBackground: {
//     position: "absolute",
//     top: 0,
//     left: getSpacing(-32),
//     right: getSpacing(-32),
//     bottom: getSpacing(-32),
//     backgroundColor: "#f8fafc",
//     borderBottomLeftRadius: getSpacing(32),
//     borderBottomRightRadius: getSpacing(32),
//   },
//   modalButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: getSpacing(20),
//     paddingHorizontal: getSpacing(28),
//     borderRadius: getSpacing(20),
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     minHeight: getSpacing(64),
//     position: "relative",
//     zIndex: 1,
//   },
//   modalCancelButton: {
//     backgroundColor: "#ffffff",
//     borderWidth: 2,
//     borderColor: "#cbd5e1",
//     elevation: 4,
//     shadowColor: "#64748b",
//     shadowOpacity: 0.15,
//   },
//   modalCancelButtonText: {
//     color: "#475569",
//     fontSize: getFontSize(17),
//     fontWeight: "700",
//     letterSpacing: 0.5,
//   },
//   modalPrimaryButton: {
//     backgroundColor: "#3b82f6",
//     background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.3)",
//     elevation: 12,
//     shadowColor: "#3b82f6",
//     shadowOpacity: 0.4,
//   },
//   modalPrimaryButtonText: {
//     color: "#ffffff",
//     fontSize: getFontSize(17),
//     fontWeight: "700",
//     marginLeft: getSpacing(12),
//     letterSpacing: 0.5,
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },

//   // Premium Receipt Styles with Perfect Design
//   receiptContainer: {
//     backgroundColor: "#ffffff",
//     borderRadius: getSpacing(16),
//     overflow: "hidden",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },
//   receiptHeader: {
//     alignItems: "center",
//     marginBottom: getSpacing(36),
//     paddingBottom: getSpacing(28),
//     borderBottomWidth: 0,
//     backgroundColor: "#f8fafc",
//     padding: getSpacing(32),
//     borderRadius: getSpacing(20),
//     elevation: 4,
//     shadowColor: "#3b82f6",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     marginHorizontal: getSpacing(-8),
//     position: "relative",
//     overflow: "hidden",
//   },
//   receiptHeaderBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "linear-gradient(135deg, #dbeafe 0%, #f8fafc 100%)",
//     backgroundColor: "#f8fafc",
//   },
//   companyName: {
//     fontSize: getFontSize(36),
//     fontWeight: "900",
//     color: "#1e40af",
//     marginBottom: getSpacing(12),
//     letterSpacing: 1.5,
//     textShadowColor: "rgba(30, 64, 175, 0.3)",
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 4,
//     zIndex: 1,
//   },
//   companyAddress: {
//     fontSize: getFontSize(16),
//     color: "#374151",
//     textAlign: "center",
//     marginBottom: getSpacing(8),
//     fontWeight: "600",
//     letterSpacing: 0.5,
//     zIndex: 1,
//   },
//   companyContact: {
//     fontSize: getFontSize(18),
//     fontWeight: "800",
//     color: "#0f172a",
//     marginTop: getSpacing(16),
//     marginBottom: getSpacing(12),
//     letterSpacing: 0.8,
//     zIndex: 1,
//   },
//   receiptDate: {
//     fontSize: getFontSize(16),
//     color: "#ffffff",
//     fontWeight: "700",
//     backgroundColor: "#3b82f6",
//     paddingHorizontal: getSpacing(20),
//     paddingVertical: getSpacing(10),
//     borderRadius: getSpacing(25),
//     marginTop: getSpacing(12),
//     elevation: 4,
//     shadowColor: "#3b82f6",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     letterSpacing: 0.5,
//     zIndex: 1,
//   },
//   receiptTable: {
//     borderWidth: 0,
//     borderRadius: getSpacing(16),
//     marginBottom: getSpacing(32),
//     overflow: "hidden",
//     elevation: 6,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     backgroundColor: "#ffffff",
//   },
//   receiptTableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e2e8f0",
//     minHeight: getSpacing(64),
//     alignItems: "center",
//   },
//   receiptTableLabel: {
//     flex: 1,
//     padding: getSpacing(20),
//     fontSize: getFontSize(16),
//     fontWeight: "800",
//     color: "#1e293b",
//     backgroundColor: "#f1f5f9",
//     letterSpacing: 0.5,
//     textAlignVertical: "center",
//   },
//   receiptTableValue: {
//     flex: 1,
//     padding: getSpacing(20),
//     fontSize: getFontSize(16),
//     color: "#0f172a",
//     fontWeight: "700",
//     backgroundColor: "#ffffff",
//     letterSpacing: 0.3,
//     textAlignVertical: "center",
//   },
//   receiptContent: {
//     backgroundColor: "#eff6ff",
//     padding: getSpacing(28),
//     borderRadius: getSpacing(20),
//     marginBottom: getSpacing(32),
//     borderLeftWidth: 6,
//     borderLeftColor: "#3b82f6",
//     elevation: 4,
//     shadowColor: "#3b82f6",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     position: "relative",
//     overflow: "hidden",
//   },
//   receiptContentBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
//     backgroundColor: "#eff6ff",
//   },
//   receiptText: {
//     fontSize: getFontSize(18),
//     color: "#1e293b",
//     lineHeight: getFontSize(28),
//     fontWeight: "600",
//     letterSpacing: 0.4,
//     zIndex: 1,
//   },
//   receiptBold: {
//     fontWeight: "900",
//     color: "#0f172a",
//     backgroundColor: "#dbeafe",
//     paddingHorizontal: getSpacing(8),
//     paddingVertical: getSpacing(4),
//     borderRadius: getSpacing(8),
//     elevation: 2,
//     shadowColor: "#3b82f6",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   receiptSummary: {
//     backgroundColor: "#f0fdf4",
//     padding: getSpacing(28),
//     borderRadius: getSpacing(20),
//     marginBottom: getSpacing(36),
//     borderWidth: 2,
//     borderColor: "#bbf7d0",
//     elevation: 6,
//     shadowColor: "#10b981",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     position: "relative",
//     overflow: "hidden",
//   },
//   receiptSummaryBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
//     backgroundColor: "#f0fdf4",
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: getSpacing(16),
//     paddingVertical: getSpacing(8),
//     zIndex: 1,
//   },
//   summaryRowLabel: {
//     fontSize: getFontSize(17),
//     color: "#1e293b",
//     fontWeight: "700",
//     letterSpacing: 0.5,
//   },
//   summaryRowValue: {
//     fontSize: getFontSize(17),
//     color: "#0f172a",
//     fontWeight: "800",
//     letterSpacing: 0.5,
//   },
//   totalPaidRow: {
//     paddingTop: getSpacing(16),
//     borderTopWidth: 2,
//     borderTopColor: "#a7f3d0",
//     marginTop: getSpacing(12),
//     backgroundColor: "rgba(220, 252, 231, 0.5)",
//     marginHorizontal: getSpacing(-28),
//     paddingHorizontal: getSpacing(28),
//     borderRadius: getSpacing(12),
//   },
//   totalPaidValue: {
//     color: "#10b981",
//     fontSize: getFontSize(19),
//     fontWeight: "900",
//     textShadowColor: "rgba(16, 185, 129, 0.3)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   balanceRow: {
//     paddingTop: getSpacing(16),
//     borderTopWidth: 3,
//     borderTopColor: "#10b981",
//     marginTop: getSpacing(12),
//     backgroundColor: "#ecfdf5",
//     marginHorizontal: getSpacing(-28),
//     paddingHorizontal: getSpacing(28),
//     borderRadius: getSpacing(12),
//     elevation: 2,
//     shadowColor: "#10b981",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   balanceValue: {
//     color: "#dc2626",
//     fontSize: getFontSize(19),
//     fontWeight: "900",
//     textShadowColor: "rgba(220, 38, 38, 0.3)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   receiptSignatures: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: getSpacing(64),
//     paddingTop: getSpacing(36),
//     borderTopWidth: 2,
//     borderTopColor: "#cbd5e1",
//     backgroundColor: "#f8fafc",
//     marginHorizontal: getSpacing(-32),
//     paddingHorizontal: getSpacing(32),
//     paddingBottom: getSpacing(32),
//     borderBottomLeftRadius: getSpacing(16),
//     borderBottomRightRadius: getSpacing(16),
//   },
//   signatureSection: {
//     alignItems: "center",
//     flex: 1,
//     paddingHorizontal: getSpacing(20),
//   },
//   signatureLine: {
//     width: getResponsiveDimension(160, 180, 200, 220, 240),
//     height: 3,
//     backgroundColor: "#374151",
//     marginBottom: getSpacing(16),
//     borderRadius: getSpacing(2),
//     elevation: 2,
//     shadowColor: "#374151",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   signatureLabel: {
//     fontSize: getFontSize(16),
//     color: "#475569",
//     textAlign: "center",
//     fontWeight: "700",
//     letterSpacing: 0.5,
//     textShadowColor: "rgba(71, 85, 105, 0.2)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 1,
//   },
// })

// export default ModernFlatOwner
