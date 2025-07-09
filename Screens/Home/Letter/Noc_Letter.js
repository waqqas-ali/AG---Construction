// import React from 'react'
// import { Text, View } from 'react-native'

// const Noc_Letter = () => {
//   return (
//     <View>
//       <Text>Noc_Letter</Text>
//     </View>
//   )
// }

// export default Noc_Letter







import { BASE_URL } from '@/Api/BASE_URL.js';
import { ag } from "@/assets/images/ag.js";
import logo from '@/assets/images/agconstruction-1.png';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('jwtToken'); // Fixed typo: removed space
    if (!token) {
      throw new Error('No authentication token found');
    }
    return { Authorization: `Bearer ${token}` };
  };
// Custom numberToWords function
const numberToWords = (num) => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands = ['', 'Thousand', 'Million', 'Billion'];

  if (num === 0) return 'Zero';

  const convertLessThanThousand = (n) => {
    if (n === 0) return '';
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + units[n % 10] : ''}`;
    }
    return `${units[Math.floor(n / 100)]} Hundred${n % 100 ? ' ' + convertLessThanThousand(n % 100) : ''}`;
  };

  let word = '';
  let thousandIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk) {
      word = `${convertLessThanThousand(chunk)} ${thousands[thousandIndex]}${word ? ' ' + word : ''}`;
    }
    num = Math.floor(num / 1000);
    thousandIndex++;
  }

  return word.trim();
};

const Noc_Letter = ({ navigation }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    address: '',
    blank: '',
    coustomername: '',
    aggrementDate: new Date(),
    flatNo: '',
    buildingNo: '',
    streetNo: '',
    localityName: '',
    areaName: '',
    pincode: '',
    city: '',
    transactionAmount: '',
    transactionAmountWords: '',
    facvoringName: '',
    reciverBankName: '',
    branchName: '',
    acNO: '',
    ifsc: '',
  });

  const [showDatePicker, setShowDatePicker] = useState({ field: null, visible: false });
  const [focusedInput, setFocusedInput] = useState(null);
  const [showNocLetter, setShowNocLetter] = useState(false);
  const [nocSingleLetter, setNocSingleLetter] = useState(null);
  const [nocLetterTable, setNocLetterTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleChange = (name, value) => {
    let updatedFormData = { ...formData, [name]: value };
    if (name === 'transactionAmount') {
      const numericValue = value.replace(/,/g, '');
      if (!isNaN(numericValue) && numericValue !== '') {
        updatedFormData.transactionAmount = numericValue;
        updatedFormData.transactionAmountWords = numberToWords(parseInt(numericValue)) + ' Only';
      } else {
        updatedFormData.transactionAmount = '';
        updatedFormData.transactionAmountWords = '';
      }
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'bankName',
      'address',
      'coustomername',
      'flatNo',
      'buildingNo',
      'streetNo',
      'localityName',
      'areaName',
      'pincode',
      'city',
      'transactionAmount',
      'transactionAmountWords',
      'facvoringName',
      'reciverBankName',
      'branchName',
      'acNO',
      'ifsc',
    ];
    const isFormComplete = requiredFields.every(
      (field) => formData[field] && (typeof formData[field] !== 'string' || formData[field].trim())
    );

    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const payload = {
      ...formData,
      aggrementDate: formData.aggrementDate.toISOString().split('T')[0],
    };

    try {
      const headers = await getAuthHeaders();
      if (isEditMode && editId) {
        await axios.put(`${BASE_URL}/bankNoc/${editId}`, payload, { headers });
        Alert.alert('Success', 'NOC Letter Updated Successfully');
      } else {
        await axios.post(`${BASE_URL}/createBankNoc`, payload, { headers });
        Alert.alert('Success', 'NOC Letter Submitted Successfully');
      }

      setFormData({
        bankName: '',
        address: '',
        blank: '',
        coustomername: '',
        aggrementDate: new Date(),
        flatNo: '',
        buildingNo: '',
        streetNo: '',
        localityName: '',
        areaName: '',
        pincode: '',
        city: '',
        transactionAmount: '',
        transactionAmountWords: '',
        facvoringName: '',
        reciverBankName: '',
        branchName: '',
        acNO: '',
        ifsc: '',
      });
      setIsEditMode(false);
      setEditId(null);
      setRefreshKey(refreshKey + 1);
      setActiveTab('list'); // Switch to list view after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      bankName: item.bankName || '',
      address: item.address || '',
      blank: item.blank || '',
      coustomername: item.coustomername || '',
      aggrementDate: item.aggrementDate ? new Date(item.aggrementDate) : new Date(),
      flatNo: item.flatNo || '',
      buildingNo: item.buildingNo || '',
      streetNo: item.streetNo || '',
      localityName: item.localityName || '',
      areaName: item.areaName || '',
      pincode: item.pincode || '',
      city: item.city || '',
      transactionAmount: item.transactionAmount || '',
      transactionAmountWords: item.transactionAmountWords || '',
      facvoringName: item.facvoringName || '',
      reciverBankName: item.reciverBankName || '',
      branchName: item.branchName || '',
      acNO: item.acNO || '',
      ifsc: item.ifsc || '',
    });
    setEditId(item.id);
    setIsEditMode(true);
    setShowActionMenu(null);
    setActiveTab('form'); // Switch to form view for editing
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this NOC letter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const headers = await getAuthHeaders();
              await axios.delete(`${BASE_URL}/bankNoc/${id}`, { headers });
              setRefreshKey(refreshKey + 1);
              Alert.alert('Success', 'NOC letter deleted successfully');
            } catch (error) {
              console.error('Error deleting NOC letter:', error);
              Alert.alert('Error', 'Failed to delete NOC letter');
            }
          },
        },
      ]
    );
    setShowActionMenu(null);
  };

  const handleView = async (id) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/bankNoc/${id}`, { headers });
      setNocSingleLetter(response.data);
      setShowNocLetter(true);
      setShowActionMenu(null);
    } catch (error) {
      console.error('Error fetching NOC letter:', error);
      Alert.alert('Error', 'Failed to fetch NOC letter details');
    }
  };

  const generatePDF = async (data) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            line-height: 1.8;
            color: #000;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .logo {
            height: 80px;
            width: auto;
          }
          .contact-info {
            text-align: right;
            font-size: 14px;
            color: #000;
          }
          .contact-row {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 5px;
          }
          .icon-box {
            background-color: #d34508;
            padding: 8px;
            border-radius: 2px;
            margin-left: 10px;
          }
          .divider {
            border-top: 3px solid rgb(167, 5, 86);
            margin: 10px 0;
          }
          .content {
            font-size: 16px;
            line-height: 1.8;
            margin-left: 40px;
          }
          .content h2 {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .content b {
            font-weight: bold;
          }
          .recipient-info {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${ag}" alt="ROYAALMEDE" class="logo">
          <div class="contact-info">
            <div class="contact-row">
              <div>
                <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar,</p>
                <p>Hudkeshwar Road, Nagpur - 440034</p>
              </div>
              <div class="icon-box"><i class="fa fa-map-marker"></i></div>
            </div>
            <div class="contact-row">
              <p>agconstructions220@gmail.com</p>
              <div class="icon-box"><i class="fa fa-envelope"></i></div>
            </div>
            <div class="contact-row">
              <p>www.agconstructionnagpur.in</p>
              <div class="icon-box"><i class="fa fa-globe"></i></div>
            </div>
            <div class="contact-row">
              <p>+91 7620 419 075</p>
              <div class="icon-box"><i class="fa fa-phone"></i></div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="content">
          <div class="recipient-info">
            <div>
              <p>The Assistant General Manager</p>
              <p>${data.bankName}</p>
              <p>${data.city}</p>
            </div>
            <p>Date: ${currentDate}</p>
          </div>
          <p style="margin-top: 30px;">TO,</p>
          <p>I/We, <b>${data.coustomername}</b>, hereby certify that:</p>
          <p style="margin-top: 20px;">
            1. I/We have transferable rights to the property described below, which has been allotted
            by me/us to Mr. ${data.coustomername}, hereinafter referred to as “the purchasers”, subject
            to the due and proper performance and compliances of all the terms and conditions of the
            Allotment Letter/Sale Agreement dated ${new Date(data.aggrementDate).toLocaleDateString('en-GB')} (hereinafter referred to as the “Sale document”)
          </p>
          <p style="margin-top: 20px;"><b>Description of the property:</b></p>
          <p>Flat No./ House No. ${data.flatNo}</p>
          <p>Building No./Name: ${data.buildingNo}</p>
          <p>Street No./Name: ${data.streetNo}</p>
          <p>Locality Name: ${data.localityName}</p>
          <p>Area Name: ${data.areaName}</p>
          <p>City Name: ${data.city}</p>
          <p>Pin Code: ${data.pincode}</p>
          <p style="margin-top: 20px;">
            2. That the total consideration for this transaction is Rs.${data.transactionAmount}/- (${data.transactionAmountWords})
            towards sale document.
          </p>
          <p>
            3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.
          </p>
          <p>
            4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs,
            charges, risks and consequences mortgaging the said property to ${data.bankName}
            (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank
            to them subject to the due and proper performance and compliances of all the terms and
            conditions of the sale document by the said purchasers.
          </p>
          <p style="margin-top: 20px;">
            5. We have borrowed from ${data.bankName} (name of the financial institution) whose NOC
            for this transaction is enclosed herewith / We have not borrowed from any financial institution
            for the purchase/development of the property and have not created and will not create any
            encumbrances on the property allotted to the said purchasers during the currency of the loan
            sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance
            and compliances of all the terms and conditions of the sale document by the said purchasers.
          </p>
          <p>
            6. After creation of proper charge/mortgage and after receipt of the copies thereof and after
            receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable
            to accept ${data.bankName} as a nominee of the above named purchaser for the property
            described above and once the nomination favoring the Bank has been registered and advice
            sent to the Bank of having done so, I/We note not to change the same without the written
            NOC of the Bank.
          </p>
          <p>
            7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt
            of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake
            to inform the society about the Bank’s charge on the said flat as and when the society is formed.
          </p>
          <p>
            8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “${data.facvoringName} (Name), ${data.reciverBankName} (Bank Name) ${data.branchName} Branch, Account No.${data.acNO}”.
          </p>
          <p style="margin-top: 20px;">
            company/firm vide ____________________ (description of document of delegation of authority to the signatory.)
          </p>
          <p style="margin-top: 30px;">Yours faithfully,</p>
          <p style="margin-top: 60px;">Authorized Signatory.</p>
          <p>Name –</p>
          <p>Place –</p>
          <p>Date: ${currentDate}</p>
        </div>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { dialogTitle: `${data.coustomername}_noc_letter.pdf` });
        Alert.alert('Success', 'PDF generated and ready to share!');
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  useEffect(() => {
    const fetchNocLetters = async () => {
      try {
        setLoading(true);
        const headers = await getAuthHeaders();
        const response = await axios.get(`${BASE_URL}/bankNoc`, { headers });
        const sortedData = [...response.data].sort((a, b) => b.id - a.id);
        setNocLetterTable(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error('Error fetching NOC letters:', error);
        Alert.alert('Error', 'Failed to fetch NOC letters');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchNocLetters();
  }, [refreshKey]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(nocLetterTable);
    } else {
      const filtered = nocLetterTable.filter(
        (item) =>
          item.coustomername.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, nocLetterTable]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderInput = (field, index) => {
    const isFocused = focusedInput === field.key;

    return (
      <View key={index} style={styles.inputGroup}>
        <Text style={styles.label}>{field.label}</Text>
        <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
          <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
            <MaterialIcons
              name={field.icon}
              size={24}
              color={isFocused ? '#6A5ACD' : '#8A8A8A'}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, field.multiline && styles.multilineInput]}
              placeholder={field.label}
              value={formData[field.key]}
              onChangeText={(text) => handleChange(field.key, text)}
              onFocus={() => setFocusedInput(field.key)}
              onBlur={() => setFocusedInput(null)}
              placeholderTextColor="#999"
              keyboardType={field.keyboardType}
              autoCapitalize={field.autoCapitalize}
              multiline={field.multiline}
            />
          </View>
        </BlurView>
      </View>
    );
  };

  const renderDateField = (field) => {
    const isFocused = focusedInput === field.key;

    return (
      <View key={field.key} style={styles.inputGroup}>
        <Text style={styles.label}>{field.label}</Text>
        <BlurView intensity={isFocused ? 80 : 40} style={styles.blurContainer}>
          <TouchableOpacity
            style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}
            onPress={() => setShowDatePicker({ field: field.key, visible: true })}
          >
            <MaterialIcons
              name="event"
              size={24}
              color={isFocused ? '#6A5ACD' : '#8A8A8A'}
              style={styles.inputIcon}
            />
            <Text style={styles.dateText}>{formatDate(formData[field.key])}</Text>
          </TouchableOpacity>
        </BlurView>
        {showDatePicker.visible && showDatePicker.field === field.key && (
          <DateTimePicker
            value={formData[field.key]}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker({ field: null, visible: false });
              if (selectedDate) {
                setFormData({ ...formData, [field.key]: selectedDate });
              }
            }}
          />
        )}
      </View>
    );
  };

  const formFields = [
    { label: 'Bank Name', icon: 'account-balance', key: 'bankName' },
    { label: 'Address', icon: 'location-on', key: 'address', multiline: true },
    { label: 'Blank', icon: 'description', key: 'blank' },
    { label: 'Customer Name', icon: 'person', key: 'coustomername' },
    { label: 'Agreement Date', icon: 'event', key: 'aggrementDate', type: 'date' },
    { label: 'Flat No', icon: 'home', key: 'flatNo' },
    { label: 'Building No', icon: 'business', key: 'buildingNo' },
    { label: 'Street No', icon: 'location-on', key: 'streetNo' },
    { label: 'Locality Name', icon: 'location-on', key: 'localityName' },
    { label: 'Area Name', icon: 'location-on', key: 'areaName' },
    { label: 'Pincode', icon: 'location-on', key: 'pincode', keyboardType: 'numeric' },
    { label: 'City', icon: 'location-city', key: 'city' },
    { label: 'Transaction Amount', icon: 'attach-money', key: 'transactionAmount', keyboardType: 'numeric' },
    { label: 'Favouring Name', icon: 'person', key: 'facvoringName' },
    { label: 'Receiver Bank Name', icon: 'account-balance', key: 'reciverBankName' },
    { label: 'Branch Name', icon: 'location-on', key: 'branchName' },
    { label: 'Account No', icon: 'account-box', key: 'acNO' },
    { label: 'IFSC Code', icon: 'code', key: 'ifsc' },
  ];

  const renderNocItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.offerCard, index % 2 === 0 ? styles.evenCard : styles.oddCard]}
      onPress={() => handleView(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.coustomername.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.cardHeaderContent}>
          <Text style={styles.cardName}>{item.coustomername}</Text>
          <Text style={styles.cardPosition}>{item.bankName}</Text>
        </View>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setShowActionMenu(showActionMenu === item.id ? null : item.id)}
        >
          <Feather name="more-vertical" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="home" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText}>Flat No: {item.flatNo}</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="calendar" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText}>
              Date: {new Date(item.aggrementDate).toLocaleDateString('en-GB')}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="map-pin" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
              City: {item.city}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="credit-card" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText}>A/C No: {item.acNO}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="dollar-sign" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText}>Amount: ₹{item.transactionAmount}</Text>
          </View>
        </View>
      </View>

      {showActionMenu === item.id && (
        <View style={styles.actionMenu}>
          <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleView(item.id)}>
            <Feather name="eye" size={16} color="#6A5ACD" />
            <Text style={styles.actionMenuText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleEdit(item)}>
            <Feather name="edit" size={16} color="#3b82f6" />
            <Text style={styles.actionMenuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleDelete(item.id)}>
            <Feather name="trash-2" size={16} color="#ef4444" />
            <Text style={styles.actionMenuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#6A5ACD" />
          <Text style={styles.emptyText}>Loading NOC letters...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Feather name="file-text" size={60} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No NOC letters found</Text>
        <Text style={styles.emptyText}>
          {searchQuery ? 'Try a different search term' : 'Create your first NOC letter above'}
        </Text>
      </View>
    );
  };

  const renderFormView = () => (
    <ScrollView
      style={styles.formScrollView}
      contentContainerStyle={styles.formScrollViewContent}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
    >
      <View style={styles.formContainer}>
        {formFields.map((field, index) =>
          field.type === 'date' ? renderDateField(field) : renderInput(field, index)
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#6A5ACD', '#483D8B', '#191970']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {isEditMode ? 'Update' : 'Submit'}
            </Text>
            <MaterialIcons name="send" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderListView = () => (
    <View style={styles.tableContainer}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6A5ACD" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or bank..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color="#6A5ACD" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tableStats}>
        <Text style={styles.tableStatsText}>
          {filteredData.length} {filteredData.length === 1 ? 'NOC letter' : 'NOC letters'}
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Feather name="refresh-cw" size={16} color="#6A5ACD" />
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderNocItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6A5ACD']} />
        }
        nestedScrollEnabled={true}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6A5ACD" />
      <LinearGradient colors={['#6A5ACD', '#483D8B', '#191970']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>NOC Letter</Text>
            <View style={styles.spacer} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'form' && styles.activeTabButton]}
              onPress={() => setActiveTab('form')}
            >
              <Feather 
                name="edit" 
                size={18} 
                color={activeTab === 'form' ? '#6A5ACD' : '#6b7280'} 
              />
              <Text style={[styles.tabText, activeTab === 'form' && styles.activeTabText]}>
                {isEditMode ? 'Edit Letter' : 'New Letter'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
              onPress={() => setActiveTab('list')}
            >
              <Feather 
                name="list" 
                size={18} 
                color={activeTab === 'list' ? '#6A5ACD' : '#6b7280'} 
              />
              <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
                All Letters
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <BlurView intensity={20} style={styles.cardBlur}>
              <View style={styles.card}>
                {activeTab === 'form' ? renderFormView() : renderListView()}
              </View>
            </BlurView>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showNocLetter}
        onRequestClose={() => setShowNocLetter(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={90} style={styles.modalBlur}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NOC Letter</Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowNocLetter(false)}
              >
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {nocSingleLetter && (
              <View style={styles.letterContainer}>
                <View style={styles.letterButtons}>
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => generatePDF(nocSingleLetter)}
                  >
                    <Text style={styles.downloadButtonText}>Download PDF</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={styles.letterScroll}
                  contentContainerStyle={styles.letterScrollContent}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  <View style={styles.letterContent}>
                    <View style={styles.headerContainer}>
                      <Image source={logo} style={styles.logo} resizeMode="contain" />
                      <View style={styles.contactInfo}>
                        <View style={styles.contactRow}>
                          <View>
                            <Text style={styles.contactText}>
                              Plot No. 28, 1st Floor, Govind Prabhau Nagar,
                            </Text>
                            <Text style={styles.contactText}>
                              Hudkeshwar Road, Nagpur - 440034
                            </Text>
                          </View>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="map-marker" size={15} color="#fff" />
                          </View>
                        </View>
                        <View style={styles.contactRow}>
                          <Text style={styles.contactText}>royaalmede@gmail.com</Text>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="envelope" size={15} color="#fff" />
                          </View>
                        </View>
                        <View style={styles.contactRow}>
                          <Text style={styles.contactText}>www.royaalmede.co.in</Text>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="globe" size={15} color="#fff" />
                          </View>
                        </View>
                        <View style={styles.contactRow}>
                          <Text style={styles.contactText}>9028999253 | 9373450092</Text>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="phone" size={15} color="#fff" />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.dividerContainer}>
                      <View style={[styles.divider, { borderWidth: 3 }]} />
                    </View>

                    <View style={styles.contentContainer}>
                      <View style={styles.contentRow}>
                        <View style={styles.recipientInfo}>
                          <View>
                            <Text style={styles.letterText}>The Assistant General Manager</Text>
                            <Text style={styles.letterText}>{nocSingleLetter.bankName}</Text>
                            <Text style={styles.letterText}>{nocSingleLetter.city}</Text>
                          </View>
                          <Text style={styles.letterText}>Date: {currentDate}</Text>
                        </View>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 30 }]}>
                        <Text style={styles.letterText}>TO,</Text>
                        <Text style={styles.letterText}>
                          I/We, <Text style={styles.boldText}>{nocSingleLetter.coustomername}</Text>, hereby certify that:
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          1. I/We have transferable rights to the property described below, which has been allotted
                          by me/us to Mr. <Text style={styles.boldText}>{nocSingleLetter.coustomername}</Text>, hereinafter referred to as “the purchasers”, subject
                          to the due and proper performance and compliances of all the terms and conditions of the
                          Allotment Letter/Sale Agreement dated{' '}
                          <Text style={styles.boldText}>{new Date(nocSingleLetter.aggrementDate).toLocaleDateString('en-GB')}</Text> (hereinafter referred to as the “Sale document”)
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterHeading}>Description of the property:</Text>
                      </View>
                      <View style={styles.contentRow}>
                        <Text style={styles.letterText}>
                          Flat No./ House No. <Text style={styles.boldText}>{nocSingleLetter.flatNo}</Text>
                        </Text>
                        <Text style={styles.letterText}>
                          Building No./Name: <Text style={styles.boldText}>{nocSingleLetter.buildingNo}</Text>
                        </Text>
                        <Text style={styles.letterText}>
                          Street No./Name: <Text style={styles.boldText}>{nocSingleLetter.streetNo}</Text>
                        </Text>
                        <Text style={styles.letterText}>
                          Locality Name: <Text style={styles.boldText}>{nocSingleLetter.localityName}</Text>
                        </Text>
                        <Text style={styles.letterText}>
                          Area Name: <Text style={styles.boldText}>{nocSingleLetter.areaName}</Text>
                        </Text>
                        <Text style={styles.letterText}>
                          City Name: <Text style={styles.boldText}>{nocSingleLetter.city}</Text>
                        </Text>
                        <Text style={styles.letterText}>
                          Pin Code: <Text style={styles.boldText}>{nocSingleLetter.pincode}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          2. That the total consideration for this transaction is Rs.
                          <Text style={styles.boldText}>{nocSingleLetter.transactionAmount}</Text>/- (
                          <Text style={styles.boldText}>{nocSingleLetter.transactionAmountWords}</Text>)
                          towards sale document.
                        </Text>
                      </View>
                      <View style={styles.contentRow}>
                        <Text style={styles.letterText}>
                          3. The title of the property described above is clear, marketable and free from all encumbrances and doubts.
                        </Text>
                      </View>
                      <View style={styles.contentRow}>
                        <Text style={styles.letterText}>
                          4. I/We confirm that I/we have no objection whatsoever to the said purchasers, at their own costs,
                          charges, risks and consequences mortgaging the said property to{' '}
                          <Text style={styles.boldText}>{nocSingleLetter.bankName}</Text> (hereinafter referred to as “the Bank”) as security for the amount advanced by the Bank
                          to them subject to the due and proper performance and compliances of all the terms and
                          conditions of the sale document by the said purchasers.
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          5. We have borrowed from <Text style={styles.boldText}>{nocSingleLetter.bankName}</Text> (name of the financial institution) whose NOC
                          for this transaction is enclosed herewith / We have not borrowed from any financial institution
                          for the purchase/development of the property and have not created and will not create any
                          encumbrances on the property allotted to the said purchasers during the currency of the loan
                          sanctioned/to be sanctioned by the Bank to them subject to the due and proper performance
                          and compliances of all the terms and conditions of the sale document by the said purchasers.
                        </Text>
                      </View>
                      <View style={styles.contentRow}>
                        <Text style={styles.letterText}>
                          6. After creation of proper charge/mortgage and after receipt of the copies thereof and after
                          receipt of proper nomination in favor of the Bank, from the said purchasers, we are agreeable
                          to accept <Text style={styles.boldText}>{nocSingleLetter.bankName}</Text> as a nominee of the above named purchaser for the property
                          described above and once the nomination favoring the Bank has been registered and advice
                          sent to the Bank of having done so, I/We note not to change the same without the written
                          NOC of the Bank.
                        </Text>
                      </View>
                      <View style={styles.contentRow}>
                        <Text style={styles.letterText}>
                          7. After creation of charge/mortgage and after receipt of the copies thereof and after receipt
                          of the proper nomination in favor of the Bank, from the above named purchaser, I/We undertake
                          to inform the society about the Bank’s charge on the said flat as and when the society is formed.
                        </Text>
                      </View>
                      <View style={styles.contentRow}>
                        <Text style={styles.letterText}>
                          8. Please note that the payment for this transaction should be made by crossed cheque/Transfer of funds favoring “
                          <Text style={styles.boldText}>{nocSingleLetter.facvoringName}</Text> (Name), <Text style={styles.boldText}>{nocSingleLetter.reciverBankName}</Text> (Bank Name) <Text style={styles.boldText}>{nocSingleLetter.branchName}</Text> Branch, Account No.<Text style={styles.boldText}>{nocSingleLetter.acNO}</Text>”.
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          company/firm vide ____________________ (description of document of delegation of authority to the signatory.)
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 30 }]}>
                        <Text style={styles.letterText}>Yours faithfully,</Text>
                        <Text style={[styles.letterText, { marginTop: 60 }]}>Authorized Signatory.</Text>
                        <Text style={styles.letterText}>Name –</Text>
                        <Text style={styles.letterText}>Place –</Text>
                        <Text style={styles.letterText}>Date: {currentDate}</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </BlurView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 5,
  },
  spacer: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#6A5ACD',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardBlur: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  formScrollView: {
    flex: 1,
  },
  formScrollViewContent: {
    paddingBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#483D8B',
    marginBottom: 8,
    marginLeft: 4,
  },
  blurContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248,249,250,0.7)',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  inputWrapperFocused: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 2,
    borderColor: '#6A5ACD',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 15,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginRight: 10,
  },
  tableContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  tableStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tableStatsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshButtonText: {
    fontSize: 14,
    color: '#6A5ACD',
    marginLeft: 4,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  evenCard: {
    backgroundColor: '#fff',
  },
  oddCard: {
    backgroundColor: '#f9fafb',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A5ACD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardHeaderContent: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  cardPosition: {
    fontSize: 14,
    color: '#6b7280',
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  cardDetails: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
  },
  actionMenu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  actionMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionMenuText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#4b5563',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBlur: {
    width: width * 0.9,
    maxWidth: 450,
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeModalButton: {
    padding: 5,
  },
  letterContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  letterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  downloadButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  letterScroll: {
    flex: 1,
  },
  letterScrollContent: {
    paddingBottom: 20,
    minHeight: 800,
  },
  letterContent: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 80,
    width: 100,
  },
  contactInfo: {
    flex: 2,
    alignItems: 'flex-end',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  iconWrapper: {
    backgroundColor: '#d34508',
    padding: 8,
    borderRadius: 2,
    marginLeft: 10,
  },
  contactText: {
    color: '#000',
    fontSize: 14,
    marginRight: 10,
  },
  dividerContainer: {
    marginBottom: 10,
  },
  divider: {
    borderColor: 'rgb(167, 5, 86)',
    marginBottom: 2,
  },
  contentRow: {
    marginBottom: 10,
  },
  recipientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  letterHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  letterText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Noc_Letter;