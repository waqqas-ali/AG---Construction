// import { BASE_URL } from '@/Api/BASE_URL.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const ViewInstallments = ({ route }) => {
//   const { bookingId } = route.params; // Get bookingId from navigation
//   const navigation = useNavigation();
//   const [installments, setInstallments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchInstallments = async () => {
//       try {
//         const token = await AsyncStorage.getItem('jwtToken');
//         if (!token) {
//           setError('No authentication token found');
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log('Installments Data:', response.data); // Debug log
//         setInstallments(response.data.bookingInstallments || []); // Use bookingInstallments array
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch installment details');
//         setLoading(false);
//         console.error('Error fetching installments:', err);
//       }
//     };

//     fetchInstallments();
//   }, [bookingId]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity
//           style={styles.buttonSecondary}
//           onPress={() => navigation.goBack()}
//         >
//           <Text style={styles.buttonText}>Back</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Installment Details for Booking {bookingId}</Text>
//       <TouchableOpacity
//         style={styles.buttonSecondary}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.buttonText}>Back to Booking</Text>
//       </TouchableOpacity>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Installments</Text>
//         {installments.length > 0 ? (
//           installments.map((installment) => (
//             <View key={installment.id} style={styles.installment}>
//               <Text>Installment ID: {installment.id || 'N/A'}</Text>
//               <Text>Date: {installment.installmentDate ? new Date(installment.installmentDate).toLocaleDateString('en-GB') : 'N/A'}</Text>
//               <Text>Amount: ₹{installment.installmentAmount ? installment.installmentAmount.toLocaleString() : 'N/A'}</Text>
//               <Text>Status: {installment.installmentStatus || 'N/A'}</Text>
//               <Text>Remark: {installment.remark || 'N/A'}</Text>
//             </View>
//           ))
//         ) : (
//           <Text>No installments available</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   installment: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   buttonSecondary: {
//     backgroundColor: '#6B7280',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     margin: 5,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

// export default ViewInstallments;



import { BASE_URL } from '@/Api/BASE_URL.js';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
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

const ViewInstallments = ({ route }) => {
  const { bookingId } = route.params; // Get bookingId from navigation
  const navigation = useNavigation();
  const [installments, setInstallments] = useState([]);
  const [summary, setSummary] = useState({}); // Store additional summary data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [installmentId, setInstallmentId] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editPaymentMethod, setEditPaymentMethod] = useState('');
  const [editRemark, setEditRemark] = useState('');

  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Installments Data:', response.data); // Debug log
        setInstallments(response.data.bookingInstallments || []);
        setSummary(response.data); // Store summary data for PDF
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch installment details');
        setLoading(false);
        console.error('Error fetching installments:', err);
      }
    };

    fetchInstallments();
  }, [bookingId]);

  const handleEditInstallment = async (id) => {
    setInstallmentId(id);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`${BASE_URL}/getBookingInstallmentById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditDate(response.data.installmentDate || '');
      setEditAmount(response.data.installmentAmount ? String(response.data.installmentAmount) : '');
      setEditPaymentMethod(response.data.installmentStatus || '');
      setEditRemark(response.data.remark || '');
      setShowEditModal(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch installment details');
      console.error('Error fetching installment:', err);
    }
  };

  const handleSubmitEdit = async () => {
    if (!editPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    if (!editAmount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const formData = {
        installmentDate: editDate || new Date().toISOString().split('T')[0],
        installmentAmount: editAmount.replace(/,/g, ''),
        installmentStatus: editPaymentMethod,
        remark: editRemark,
      };
      await axios.put(`${BASE_URL}/updateBookingInstallment/${installmentId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'Installment updated successfully');
      setShowEditModal(false);
      setEditDate('');
      setEditAmount('');
      setEditPaymentMethod('');
      setEditRemark('');
      // Refresh installments
      const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInstallments(response.data.bookingInstallments || []);
      setSummary(response.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to update installment');
      console.error('Error updating installment:', err);
    }
  };

  const handleDeleteInstallment = async (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this installment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('jwtToken');
              await axios.delete(`${BASE_URL}/deleteBookingInstallment/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              Alert.alert('Success', 'Installment deleted successfully');
              // Refresh installments
              const response = await axios.get(`${BASE_URL}/BookingSummary/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setInstallments(response.data.bookingInstallments || []);
              setSummary(response.data);
            } catch (err) {
              Alert.alert('Error', 'Failed to delete installment');
              console.error('Error deleting installment:', err);
            }
          },
        },
      ]
    );
  };

  const handlePrintInstallment = async () => {
    try {
      const htmlContent = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="font-size: 24px; font-weight: bold;">Installment Summary</h2>
          <h4 style="font-size: 18px;">Property Summary</h4>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 5px;"><strong>Project:</strong></td>
              <td style="padding: 5px;">${summary.residencyName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Customer:</strong></td>
              <td style="padding: 5px;">${summary.customerName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Plot No:</strong></td>
              <td style="padding: 5px;">${summary.identifier || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Deal Price:</strong></td>
              <td style="padding: 5px;">₹${summary.dealPrice ? summary.dealPrice.toLocaleString() : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Agreement Price:</strong></td>
              <td style="padding: 5px;">₹${summary.agreementAmount ? summary.agreementAmount.toLocaleString() : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Token Amount:</strong></td>
              <td style="padding: 5px;">₹${summary.tokenAmount ? summary.tokenAmount.toLocaleString() : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Remaining:</strong></td>
              <td style="padding: 5px;">₹${summary.remainingAmount ? summary.remainingAmount.toLocaleString() : 'N/A'}</td>
            </tr>
          </table>
          <h4 style="font-size: 18px;">Installments</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="padding: 8px; border: 1px solid #ddd;">Date</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Amount</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Method</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Note</th>
              </tr>
            </thead>
            <tbody>
              ${installments.map(
                (item) => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.installmentDate ? new Date(item.installmentDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">₹${item.installmentAmount ? item.installmentAmount.toLocaleString() : 'N/A'}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.installmentStatus || 'N/A'}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.remark || 'N/A'}</td>
                </tr>`
              ).join('')}
            </tbody>
          </table>
        </div>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      Alert.alert('Success', 'PDF generated successfully');
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Share Installment Summary for Booking ${bookingId}`,
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
      <Text style={styles.title}>Installment Details for Booking {bookingId}</Text>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.buttonSuccess}
          onPress={handlePrintInstallment}
        >
          <Feather name="printer" size={16} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 5 }]}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={16} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 5 }]}>Back to Booking</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Installments</Text>
        {installments.length > 0 ? (
          installments.map((installment) => (
            <View key={installment.id} style={styles.installment}>
              <Text>Installment ID: {installment.id || 'N/A'}</Text>
              <Text>Date: {installment.installmentDate ? new Date(installment.installmentDate).toLocaleDateString('en-GB') : 'N/A'}</Text>
              <Text>Amount: ₹{installment.installmentAmount ? installment.installmentAmount.toLocaleString() : 'N/A'}</Text>
              <Text>Status: {installment.installmentStatus || 'N/A'}</Text>
              <Text>Remark: {installment.remark || 'N/A'}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() => handleEditInstallment(installment.id)}
                >
                  <Feather name="edit" size={16} color="#fff" />
                  <Text style={[styles.buttonText, { marginLeft: 5 }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonDelete}
                  onPress={() => handleDeleteInstallment(installment.id)}
                >
                  <Feather name="trash-2" size={16} color="#fff" />
                  <Text style={[styles.buttonText, { marginLeft: 5 }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>No installments available</Text>
        )}
      </View>

      {/* Edit Installment Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Installment</Text>
            <TextInput
              style={styles.input}
              placeholder="Installment Date (YYYY-MM-DD)"
              value={editDate}
              onChangeText={setEditDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={editAmount}
              onChangeText={setEditAmount}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={editPaymentMethod}
              onValueChange={(value) => setEditPaymentMethod(value)}
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
              placeholder="Remark"
              value={editRemark}
              onChangeText={setEditRemark}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleSubmitEdit}
              >
                <Text style={styles.buttonText}>Update</Text>
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
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
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
  installment: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
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
  buttonSuccess: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonEdit: {
    backgroundColor: '#17A2B8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
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
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ViewInstallments;

