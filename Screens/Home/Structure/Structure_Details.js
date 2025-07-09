// import { View, Text, Modal } from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React from 'react'
// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Structure_Details = () => {
//   return (
//     <View>
//       <Text>Structure_Detaila</Text>
//     </View>
//   )
// }

// export default Structure_Details







import { BASE_URL } from '@/Api/BASE_URL.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Structure_Details = ({ route, navigation }) => {
  const { id, name } = route.params;
  const [paymentTable, setPaymentTable] = useState([]);
  const [searchPayment, setSearchPayment] = useState('');
  const [structurePaymentForm, setStructurePaymentForm] = useState(false);
  const [payableName, setPayableName] = useState('');
  const [remark, setRemark] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [showEditStructureForm, setShowEditStructureForm] = useState(false);
  const [contractorId, setContractorId] = useState('');
  const [editPayableName, setEditPayableName] = useState('');
  const [editRemark, setEditRemark] = useState('');
  const [editDate, setEditDate] = useState(new Date());
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);
  const [editAmount, setEditAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const getStructurePayment = async () => {
      setLoading(true);
      try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        if (!jwtToken) {
          throw new Error('No JWT token found');
        }

        const response = await axios.get(
          `${BASE_URL}/show-StructureContractor/by-project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setPaymentTable(response.data.contractors || []);
        setTotalAmount(response.data.totalAmount || 0);
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    getStructurePayment();
  }, [id, refreshKey]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredPayments = paymentTable.filter((item) =>
    item.payableName.toLowerCase().includes(searchPayment.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!payableName || !remark || !date || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const formData = {
      payableName,
      remark,
      date: date.toISOString(),
      amount: parseFloat(amount),
      projectId: id,
    };

    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const response = await axios.post(`${BASE_URL}/add`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Payment added successfully');
        setRefreshKey(refreshKey + 1);
        setPayableName('');
        setRemark('');
        setDate(new Date());
        setAmount('');
        setStructurePaymentForm(false);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add payment');
    }
  };

  const handleEditStructurePayment = async (contractorId) => {
    setContractorId(contractorId);
    setShowEditStructureForm(true);
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(
        `${BASE_URL}/structure-contractor/${contractorId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setEditPayableName(response.data.payableName || '');
      setEditRemark(response.data.remark || '');
      setEditDate(response.data.date ? new Date(response.data.date) : new Date());
      setEditAmount(response.data.amount ? response.data.amount.toString() : '');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch payment details');
    }
  };

  const handleUpdatePayment = async () => {
    if (!editPayableName || !editRemark || !editDate || !editAmount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const formData = {
      projectId: id,
      payableName: editPayableName,
      remark: editRemark,
      date: editDate.toISOString(),
      amount: parseFloat(editAmount),
    };

    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      const response = await axios.put(
        `${BASE_URL}/update-StructureContractor/${contractorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Payment updated successfully');
        setRefreshKey(refreshKey + 1);
        setShowEditStructureForm(false);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update payment');
    }
  };

  const handleDeletePayment = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const jwtToken = await AsyncStorage.getItem('jwtToken');
              const response = await axios.delete(
                `${BASE_URL}/delete-StructureContractor/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (response.status === 200) {
                Alert.alert('Success', 'Payment deleted successfully');
                setRefreshKey(refreshKey + 1);
              }
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to delete payment');
            }
          },
        },
      ]
    );
  };

  const renderPaymentItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.label}>payable Name</Text>
        <Text style={styles.value}>{item.payableName}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>₹{item.amount.toLocaleString('en-IN')}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Project</Text>
        <Text style={styles.value}>{item.projectName}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.label}>Remark</Text>
        <Text style={styles.value}>{item.remark}</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditStructurePayment(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePayment(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setStructurePaymentForm(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by payable name..."
        value={searchPayment}
        onChangeText={setSearchPayment}
      />

      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.infoText}>Loading payments...</Text>
        </View>
      ) : filteredPayments.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Ionicons name="file-tray-stacked-outline" size={60} color="#888" />
          <Text style={styles.infoText}>No payment data found.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredPayments}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={renderPaymentItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.footer}>
            <Text style={styles.footerLabel}>Total</Text>
            <Text style={styles.footerValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
          </View>
        </>
      )}

      <Modal
        visible={structurePaymentForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setStructurePaymentForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStructurePaymentForm(false)}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Payment</Text>
            <TextInput
              style={styles.input}
              placeholder="Payable Name"
              value={payableName}
              onChangeText={setPayableName}
            />
            <TextInput
              style={styles.input}
              placeholder="Remark"
              value={remark}
              onChangeText={setRemark}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEditStructureForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditStructureForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowEditStructureForm(false)}
            >
              <Ionicons name="close" size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Payment</Text>
            <TextInput
              style={styles.input}
              placeholder="Payable Name"
              value={editPayableName}
              onChangeText={setEditPayableName}
            />
            <TextInput
              style={styles.input}
              placeholder="Remark"
              value={editRemark}
              onChangeText={setEditRemark}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowEditDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(editDate)}</Text>
            </TouchableOpacity>
            {showEditDatePicker && (
              <DateTimePicker
                value={editDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowEditDatePicker(Platform.OS === 'ios');
                  if (selectedDate) setEditDate(selectedDate);
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={editAmount}
              onChangeText={setEditAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleUpdatePayment}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  addButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    margin: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: '#666666',
    flex: 0.4,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
    flex: 0.6,
    textAlign: 'right',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  footerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  footerValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dateText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Structure_Details;