import { BASE_URL } from '@/Api/BASE_URL.js';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
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

const EditCustomerDetails = ({ route }) => {
  const { bookingId, customerId } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dealPrice, setDealPrice] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [agreementAmount, setAgreementAmount] = useState('');
  const [stampDutyAmount, setStampDutyAmount] = useState('');
  const [registrationAmount, setRegistrationAmount] = useState('');
  const [gstAmount, setGstAmount] = useState('');
  const [electricWaterAmount, setElectricWaterAmount] = useState('');
  const [legalChargesAmount, setLegalChargesAmount] = useState('');
  const [bookedOn, setBookedOn] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [address, setAddress] = useState('');
  const [panCard, setPanCard] = useState('');
  const [agentName, setAgentName] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [bankName, setBankName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/getBookingCoustomerId/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Customer Data:', response.data); // Debug log
        setDealPrice(response.data.dealPrice ? String(response.data.dealPrice) : '');
        setTokenAmount(response.data.tokenAmount ? String(response.data.tokenAmount) : '');
        setAgreementAmount(response.data.agreementAmount ? String(response.data.agreementAmount) : '');
        setStampDutyAmount(response.data.stampDutyAmount ? String(response.data.stampDutyAmount) : '');
        setRegistrationAmount(response.data.registrationAmount ? String(response.data.registrationAmount) : '');
        setGstAmount(response.data.gstAmount ? String(response.data.gstAmount) : '');
        setElectricWaterAmount(response.data.electricWaterAmmount ? String(response.data.electricWaterAmmount) : '');
        setLegalChargesAmount(response.data.legalChargesAmmout ? String(response.data.legalChargesAmmout) : '');
        setBookedOn(response.data.bookedOn || '');
        setBookingStatus(response.data.bookingStatus || '');
        setName(response.data.customer?.name || '');
        setPhoneNumber(response.data.customer?.phoneNumber || '');
        setEmail(response.data.customer?.email || '');
        setAadharNumber(response.data.customer?.aadharNumber || '');
        setAddress(response.data.customer?.address || '');
        setPanCard(response.data.customer?.panCard || '');
        setAgentName(response.data.customer?.agentName || '');
        setBrokerage(response.data.customer?.brokerage ? String(response.data.customer.brokerage) : '');
        setBankName(response.data.customer?.bankName || '');
        setLoanAmount(response.data.customer?.loanAmount ? String(response.data.customer.loanAmount) : '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customer details');
        setLoading(false);
        console.error('Error fetching customer data:', err);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const payload = {
        dealPrice: dealPrice ? parseFloat(dealPrice.replace(/,/g, '')) : 0,
        tokenAmount: tokenAmount ? parseFloat(tokenAmount.replace(/,/g, '')) : 0,
        agreementAmount: agreementAmount ? parseFloat(agreementAmount.replace(/,/g, '')) : 0,
        stampDutyAmount: stampDutyAmount ? parseFloat(stampDutyAmount.replace(/,/g, '')) : 0,
        registrationAmount: registrationAmount ? parseFloat(registrationAmount.replace(/,/g, '')) : 0,
        gstAmount: gstAmount ? parseFloat(gstAmount.replace(/,/g, '')) : 0,
        electricWaterAmmount: electricWaterAmount ? parseFloat(electricWaterAmount.replace(/,/g, '')) : 0,
        legalChargesAmmout: legalChargesAmount ? parseFloat(legalChargesAmount.replace(/,/g, '')) : 0,
        bookedOn: bookedOn || new Date().toISOString().split('T')[0],
        bookingStatus: bookingStatus || 'PENDING',
        customerDto: {
          name,
          phoneNumber,
          email,
          aadharNumber,
          address,
          panCard,
          agentName,
          brokerage: brokerage ? parseFloat(brokerage.replace(/,/g, '')) : 0,
          bankName,
          loanAmount: loanAmount ? parseFloat(loanAmount.replace(/,/g, '')) : 0,
        },
      };

      const response = await axios.put(`${BASE_URL}/updateBooking/${bookingId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Customer details updated successfully');
        navigation.goBack();
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to update customer details');
      console.error('Error updating customer details:', err);
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
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Customer Details</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Deal Price"
          value={dealPrice}
          onChangeText={setDealPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Token Amount"
          value={tokenAmount}
          onChangeText={setTokenAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Agreement Amount"
          value={agreementAmount}
          onChangeText={setAgreementAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Stamp Duty Amount"
          value={stampDutyAmount}
          onChangeText={setStampDutyAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Registration Amount"
          value={registrationAmount}
          onChangeText={setRegistrationAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="GST Amount"
          value={gstAmount}
          onChangeText={setGstAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Electric/Water Amount"
          value={electricWaterAmount}
          onChangeText={setElectricWaterAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Legal Charges Amount"
          value={legalChargesAmount}
          onChangeText={setLegalChargesAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Booked On (YYYY-MM-DD)"
          value={bookedOn}
          onChangeText={setBookedOn}
        />
        <Picker
          selectedValue={bookingStatus}
          onValueChange={(value) => setBookingStatus(value)}
          style={styles.input}
        >
          <Picker.Item label="Select Booking Status" value="" />
          <Picker.Item label="Pending" value="PENDING" />
          <Picker.Item label="Complete" value="COMPLETE" />
          <Picker.Item label="Cancelled" value="CANCELLED" />
        </Picker>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Aadhar Number"
          value={aadharNumber}
          onChangeText={setAadharNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="PAN Card"
          value={panCard}
          onChangeText={setPanCard}
        />
        <TextInput
          style={styles.input}
          placeholder="Agent Name"
          value={agentName}
          onChangeText={setAgentName}
        />
        <TextInput
          style={styles.input}
          placeholder="Brokerage"
          value={brokerage}
          onChangeText={setBrokerage}
          keyboardType="numeric"
        />
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
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={16} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 5 }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleSubmit}
        >
          <Feather name="save" size={16} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 5 }]}>Save Details</Text>
        </TouchableOpacity>
      </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#6B7280',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default EditCustomerDetails;