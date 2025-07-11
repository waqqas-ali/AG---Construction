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