// import React from 'react'
// import { Text, View } from 'react-native'

// const Demand_Letter = () => {
//   return (
//     <View>
//       <Text>Demand_Letter</Text>
//     </View>
//   )
// }

// export default Demand_Letter









import { BASE_URL } from '@/Api/BASE_URL.js';
import { ag } from "@/assets/images/ag.js";
import logo from '@/assets/images/agconstruction-1.png';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const DemandLetter = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    faltno: '',
    amount: '',
    sitename: '',
    favorOf: '',
    bankName: '',
    branch: '',
    acNo: '',
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [showDemandLetter, setShowDemandLetter] = useState(false);
  const [singleDemandLetter, setSingleDemandLetter] = useState(null);
  const [allDemandLetters, setAllDemandLetters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'


  const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('jwtToken'); // Fixed typo: removed space
    if (!token) {
      throw new Error('No authentication token found');
    }
    return { Authorization: `Bearer ${token}` };
  };
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'name',
      'faltno',
      'amount',
      'sitename',
      'favorOf',
      'bankName',
      'branch',
      'acNo',
    ];
    const isFormComplete = requiredFields.every((field) => formData[field]);

    if (!isFormComplete) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const url = isEditing
        ? `${BASE_URL}/updateDemandLetter/${editId}`
        : `${BASE_URL}/createDemandLetter`;
      const method = isEditing ? 'put' : 'post';

      await axios[method](url, formData, { headers });
      Alert.alert('Success', isEditing ? 'Demand Letter Updated Successfully' : 'Demand Letter Submitted Successfully');

      setFormData({
        name: '',
        faltno: '',
        amount: '',
        sitename: '',
        favorOf: '',
        bankName: '',
        branch: '',
        acNo: '',
      });
      setIsEditing(false);
      setEditId(null);
      setRefreshKey(refreshKey + 1);
      setActiveTab('list'); // Switch to list view after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again.');
    }
  };

  const handleEdit = (demand) => {
    setFormData({
      name: demand.name,
      faltno: demand.faltno,
      amount: demand.amount,
      sitename: demand.sitename,
      favorOf: demand.favorOf,
      bankName: demand.bankName,
      branch: demand.branch,
      acNo: demand.acNo,
    });
    setEditId(demand.id);
    setIsEditing(true);
    setShowActionMenu(null);
    setActiveTab('form'); // Switch to form view for editing
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this demand letter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const headers = await getAuthHeaders();
              await axios.delete(`${BASE_URL}/deleteDemandLetter/${id}`, { headers });
              setRefreshKey(refreshKey + 1);
              Alert.alert('Success', 'Demand letter deleted successfully');
            } catch (error) {
              console.error('Error deleting demand letter:', error);
              Alert.alert('Error', 'Failed to delete demand letter');
            }
          },
        },
      ]
    );
    setShowActionMenu(null);
  };

  const handleShow = async (id) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/getDemandLetterById/${id}`, { headers });
      setSingleDemandLetter(response.data);
      setShowDemandLetter(true);
      setShowActionMenu(null);
    } catch (error) {
      console.error('Error fetching demand letter:', error);
      Alert.alert('Error', 'Failed to fetch demand letter details');
    }
  };

  const generatePDF = async (data) => {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @media print {
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        page-break-inside: avoid;
      }
    }

    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 10px 20px;
      font-size: 13px;
      line-height: 1.4;
      color: #000;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .logo {
      height: 60px;
    }

    .contact-info {
      text-align: right;
      font-size: 11px;
    }

    .contact-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 2px 0;
    }

    .icon-box {
      background-color: #d34508;
      padding: 4px;
      border-radius: 2px;
      margin-left: 6px;
    }

    .divider {
      border-top: 1px solid rgb(167, 5, 86);
      margin-top: 6px;
    }

    .divider-thick {
      border-top: 3px solid rgb(167, 5, 86);
      margin-top: 1px;
      margin-bottom: 10px;
    }

    .content {
      font-size: 13px;
      margin-left: 20px;
    }

    .content h2 {
      font-size: 16px;
      text-align: center;
      margin: 8px 0;
    }

    p {
      margin: 3px 0;
    }

    .signature {
      margin-top: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${ag}" alt="AG Logo" class="logo">
    <div class="contact-info">
      <div class="contact-row">
        <div>
          <p>Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar</p>
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
  <div class="divider-thick"></div>

  <div class="content">
    <p>To,</p>
    <p>Mr/Mrs,</p>
    <p><b>rajat</b></p>
    <p>Address</p>

    <h2>DEMAND LETTER</h2>

    <p style="text-align: center;"><b>Subject: Demand of Disbursement</b></p>
    <p>Ref. Your Flat No <b>102</b></p>
    <p>Dear Sir / Madam,</p>
    <p>The work at the stage maintained below has been completed within its scheduled course of time.</p>
    <p>You are requested to release the payment of Rs <b>10000</b></p>
    <p>Due, against this stage of our site.</p>
    <p>In favor of <b>ok</b></p>
    <p>Bank Name <b>bio</b></p>
    <p>Bank Branch <b>njkashd</b></p>
    <p>A/c No. <b>1235475875</b></p>
    <p>Kindly arrange the same and please extend your esteemed co-operation to achieve the target in time.</p>
    <p>Thanking you anticipation.</p>
    <p>Yours truly,</p>

    <div class="signature">
      <p>( Authorized Signatory )</p>
    </div>
  </div>
</body>
</html>

    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { dialogTitle: `demand_letter_${data.name}.pdf` });
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
    const fetchDemandLetters = async () => {
      try {
        setLoading(true);
        const headers = await getAuthHeaders();
        const response = await axios.get(`${BASE_URL}/getAllDemandLetters`, { headers });
        const sortedData = [...response.data].sort((a, b) => b.id - a.id);
        setAllDemandLetters(sortedData);
      } catch (error) {
        console.error('Error fetching demand letters:', error);
        Alert.alert('Error', 'Failed to fetch demand letters');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchDemandLetters();
  }, [refreshKey]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setAllDemandLetters(allDemandLetters);
    } else {
      const filtered = allDemandLetters.filter(
        (demand) =>
          demand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          demand.faltno.toLowerCase().includes(searchQuery.toLowerCase()) ||
          demand.sitename.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAllDemandLetters(filtered);
    }
  }, [searchQuery, allDemandLetters]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...allDemandLetters].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setAllDemandLetters(sortedData);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <Feather name="chevron-down" size={14} color="#9ca3af" />;
    }
    return sortConfig.direction === 'asc' ? (
      <Feather name="chevron-up" size={14} color="#6A5ACD" />
    ) : (
      <Feather name="chevron-down" size={14} color="#6A5ACD" />
    );
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
              numberOfLines={field.multiline ? 3 : 1}
            />
          </View>
        </BlurView>
      </View>
    );
  };

  const formFields = [
    { label: 'Name', icon: 'person', key: 'name' },
    { label: 'Flat No', icon: 'home', key: 'faltno' },
    { label: 'Amount', icon: 'attach-money', key: 'amount', keyboardType: 'numeric' },
    { label: 'Site Name', icon: 'location-on', key: 'sitename' },
    { label: 'Favor Of', icon: 'person', key: 'favorOf' },
    { label: 'Bank Name', icon: 'account-balance', key: 'bankName' },
    { label: 'Branch', icon: 'location-on', key: 'branch' },
    { label: 'Account No', icon: 'account-box', key: 'acNo' },
  ];

  const renderDemandItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.offerCard, index % 2 === 0 ? styles.evenCard : styles.oddCard]}
      onPress={() => handleShow(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.cardHeaderContent}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardPosition}>{item.sitename}</Text>
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
            <Text style={styles.detailText}>Flat No: {item.faltno}</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="dollar-sign" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText}>Amount: ₹{item.amount}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="user" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1}>
              Favor Of: {item.favorOf}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="map-pin" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1}>
              Site: {item.sitename}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="credit-card" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText}>A/c No: {item.acNo}</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="map-pin" size={14} color="#6A5ACD" style={styles.detailIcon} />
            <Text style={styles.detailText} numberOfLines={1}>
              Branch: {item.branch}
            </Text>
          </View>
        </View>
      </View>

      {showActionMenu === item.id && (
        <View style={styles.actionMenu}>
          <TouchableOpacity style={styles.actionMenuItem} onPress={() => handleShow(item.id)}>
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
          <Text style={styles.emptyText}>Loading demand letters...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Feather name="file-text" size={60} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No demand letters found</Text>
        <Text style={styles.emptyText}>
          {searchQuery ? 'Try a different search term' : 'Create your first demand letter above'}
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
        {formFields.map((field, index) => renderInput(field, index))}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#6A5ACD', '#483D8B', '#191970']}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>
              {isEditing ? 'Update' : 'Submit'}
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
          placeholder="Search by name, flat no, or site..."
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
          {allDemandLetters.length} {allDemandLetters.length === 1 ? 'demand letter' : 'demand letters'}
        </Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Feather name="refresh-cw" size={16} color="#6A5ACD" />
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={allDemandLetters}
        renderItem={renderDemandItem}
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
            <Text style={styles.headerTitle}>Demand Letter</Text>
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
                {isEditing ? 'Edit Letter' : 'New Letter'}
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
        visible={showDemandLetter}
        onRequestClose={() => setShowDemandLetter(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={90} style={styles.modalBlur}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Demand Letter</Text>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowDemandLetter(false)}
              >
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {singleDemandLetter && (
              <View style={styles.letterContainer}>
                <View style={styles.letterButtons}>
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => generatePDF(singleDemandLetter)}
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
                            Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole nagar,
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
                          <Text style={styles.contactText}>agconstructions220@gmail.com</Text>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="envelope" size={15} color="#fff" />
                          </View>
                        </View>
                        <View style={styles.contactRow}>
                          <Text style={styles.contactText}>www.agconstruction.in</Text>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="globe" size={15} color="#fff" />
                          </View>
                        </View>
                        <View style={styles.contactRow}>
                          <Text style={styles.contactText}> +91 7620419075</Text>
                          <View style={styles.iconWrapper}>
                            <FontAwesome name="phone" size={15} color="#fff" />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.dividerContainer}>
                      <View style={[styles.divider, { borderWidth: 1 }]} />
                      <View style={[styles.divider, { borderWidth: 3 }]} />
                    </View>

                    <View style={styles.contentContainer}>
                      <View style={styles.contentRow}>
                        <View style={styles.recipientInfo}>
                          <View>
                            <Text style={styles.letterText}>Address</Text>
                          </View>
                          <Text style={styles.letterText}>Date: {currentDate}</Text>
                        </View>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterHeading}>DEMAND LETTER</Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>To,</Text>
                        <Text style={styles.letterText}>Mr/Mrs,</Text>
                        <Text style={[styles.letterText, styles.boldText]}>
                          {singleDemandLetter.name}
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={[styles.letterText, { textAlign: 'center' }]}>
                          Subject: Demand of Disbursement
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          Ref. Your Flat No{' '}
                          <Text style={styles.boldText}>{singleDemandLetter.faltno}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>Dear Sir / Madam,</Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          You will be pleased to know that the work the stage maintained below has been
                          completed within its scheduled course of time.
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          You are requested to release the payment of Rs{' '}
                          <Text style={styles.boldText}>{singleDemandLetter.amount}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          Due, against this stage of our site
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          In favor of <Text style={styles.boldText}>{singleDemandLetter.favorOf}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          Bank Name <Text style={styles.boldText}>{singleDemandLetter.bankName}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          Bank Branch <Text style={styles.boldText}>{singleDemandLetter.branch}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          A/c No. <Text style={styles.boldText}>{singleDemandLetter.acNo}</Text>
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>
                          Kindly arrange the same and please extend your esteemed co-operation to
                          achieve the target in time
                        </Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 20 }]}>
                        <Text style={styles.letterText}>Thanking you anticipation</Text>
                        <Text style={styles.letterText}>Yours truly,</Text>
                      </View>
                      <View style={[styles.contentRow, { marginTop: 40 }]}>
                        <Text style={[styles.letterText, { textAlign: 'center' }]}>
                          (Authorized Signatory)
                        </Text>
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
    marginBottom: 15,
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
    marginBottom: 8,
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
    fontSize: 13,
    marginRight: 10,
  },
  dividerContainer: {
    marginBottom: 20,
  },
  divider: {
    borderColor: 'rgb(167, 5, 86)',
    marginBottom: 4,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  letterText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  listItem: {
    marginBottom: 5,
    marginLeft: 22,
  },
});

export default DemandLetter;