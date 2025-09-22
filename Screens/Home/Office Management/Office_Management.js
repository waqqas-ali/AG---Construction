import { BASE_URL } from '@/Api/BASE_URL.js';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const OfficeManagement = () => {
    // State declarations (no changes)
    const [officeExpenseData, setOfficeExpenseData] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddOfficeExpense, setShowAddOfficeExpense] = useState(false);
    const [officeGiverName, setOfficeGiverName] = useState('');
    const [officeReceiverName, setOfficeReceiverName] = useState('');
    const [officeRemark, setOfficeRemark] = useState('');
    const [officeAmount, setOfficeAmount] = useState('');
    const [officeDate, setOfficeDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editOfficeExpenseId, setEditOfficeExpenseId] = useState('');
    const [showOfficeExpenseEditForm, setShowOfficeExpenseEditForm] = useState(false);
    const [editOfficeGiverName, setEditOfficeGiverName] = useState('');
    const [editOfficeReceiverName, setEditOfficeReceiverName] = useState('');
    const [editOfficeRemark, setEditOfficeRemark] = useState('');
    const [editOfficeAmount, setEditOfficeAmount] = useState('');
    const [editOfficeDate, setEditOfficeDate] = useState(new Date());
    const [showEditDatePicker, setShowEditDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [totalFilteredAmount, setTotalFilteredAmount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [user, setUser] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);


    // useEffect hooks for data fetching and filtering (no changes)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('employeROyalmadeLogin');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const getAllOfficeExpense = async () => {
            try {
                setIsLoading(true);
                const token = await AsyncStorage.getItem('jwtToken');
                const response = await axios.get(`${BASE_URL}/office-expenses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setOfficeExpenseData(response.data);
                setFilteredExpenses(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError('Failed to load office expenses. Please try again.');
                setIsLoading(false);
            }
        };
        getAllOfficeExpense();
    }, [refreshKey]);

    useEffect(() => {
        let filtered = officeExpenseData.filter(
            (expense) =>
                expense.remark?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expense.reciverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expense.giverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expense.amount?.toString().includes(searchQuery)
        );

        if (startDate && endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
            filtered = filtered.filter((expense) => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= startDate && expenseDate <= endOfDay;
            });
        }

        const total = filtered.reduce(
            (sum, expense) => sum + (Number.parseFloat(expense.amount) || 0),
            0
        );
        setTotalFilteredAmount(total);
        setFilteredExpenses(filtered);
    }, [searchQuery, officeExpenseData, startDate, endDate]);

    // Helper functions (no changes)
    const handleShowAllData = () => {
        setSearchQuery('');
        setStartDate(null);
        setEndDate(null);
    };

    const formatCurrency = (amount) => {
        if (!amount) return '₹0';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    // API handlers (no changes to logic)
    const handleDeleteExpense = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this expense?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('jwtToken');
                            await axios.delete(`${BASE_URL}/office-expenses/delete/${id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            Alert.alert('Success', 'Expense deleted successfully');
                            setRefreshKey((prevKey) => prevKey + 1);
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Error', 'Failed to delete expense');
                        }
                    },
                },
            ]
        );
    };

    const handleAddOfficeExpense = async () => {
        if (!officeGiverName || !officeReceiverName || !officeAmount) {
            Alert.alert('Validation Error', 'Giver, Receiver, and Amount are required.');
            return;
        }
        setIsSubmitted(true);
        const body = {
            date: officeDate.toISOString(),
            reciverName: officeReceiverName,
            giverName: officeGiverName,
            amount: Number(officeAmount) || 0,
            remark: officeRemark,
        };
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await axios.post(`${BASE_URL}/office-expenses/create`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Office Expense Added Successfully');
                setRefreshKey((prevKey) => prevKey + 1);
                setOfficeAmount('');
                setOfficeDate(new Date());
                setOfficeGiverName('');
                setOfficeReceiverName('');
                setOfficeRemark('');
                setShowAddOfficeExpense(false);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to add expense');
        } finally {
            setIsSubmitted(false);
        }
    };

    const handleEditOfficeExpense = async (id) => {
        setEditOfficeExpenseId(id);
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await axios.get(`${BASE_URL}/office-expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { reciverName, amount, date, giverName, remark } = response.data;
            setEditOfficeReceiverName(reciverName || '');
            setEditOfficeAmount(amount ? String(amount) : '');
            setEditOfficeDate(new Date(date || Date.now()));
            setEditOfficeGiverName(giverName || '');
            setEditOfficeRemark(remark || '');
            setShowOfficeExpenseEditForm(true);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to fetch expense details');
        }
    };

    const handleUpdateOfficeExpense = async () => {
        const body = {
            date: editOfficeDate.toISOString(),
            reciverName: editOfficeReceiverName,
            giverName: editOfficeGiverName,
            amount: Number(editOfficeAmount) || 0,
            remark: editOfficeRemark,
        };
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const response = await axios.put(`${BASE_URL}/office-expenses/update/${editOfficeExpenseId}`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Office expense updated successfully');
                setRefreshKey((prevKey) => prevKey + 1);
                setShowOfficeExpenseEditForm(false);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to update expense');
        }
    };

    const handlePrintOfficeExpense = async (expense) => {
        const html = `
            <html><body><h2>Office Expense Details</h2>
            <table style="width:100%; border-collapse: collapse;">
                <tr><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Field</th><th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Value</th></tr>
                <tr><td style="border: 1px solid #ddd; padding: 8px;">Date</td><td style="border: 1px solid #ddd; padding: 8px;">${formatDate(expense.date)}</td></tr>
                <tr><td style="border: 1px solid #ddd; padding: 8px;">Description</td><td style="border: 1px solid #ddd; padding: 8px;">${expense.remark}</td></tr>
                <tr><td style="border: 1px solid #ddd; padding: 8px;">From</td><td style="border: 1px solid #ddd; padding: 8px;">${expense.giverName}</td></tr>
                <tr><td style="border: 1px solid #ddd; padding: 8px;">To</td><td style="border: 1px solid #ddd; padding: 8px;">${expense.reciverName}</td></tr>
                <tr><td style="border: 1px solid #ddd; padding: 8px;">Amount</td><td style="border: 1px solid #ddd; padding: 8px;"><b>${formatCurrency(expense.amount)}</b></td></tr>
                ${user?.role === 'Admin' ? `<tr><td style="border: 1px solid #ddd; padding: 8px;">Updated By</td><td style="border: 1px solid #ddd; padding: 8px;">${expense.updatedBy}</td></tr>` : ''}
            </table></body></html>`;
        try {
            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to generate or share PDF');
        }
    };

    const renderExpenseCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Feather name="file-text" size={24} color="#007bff" />
                <Text style={styles.cardPrice}>{formatCurrency(item.amount)}</Text>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Date</Text><Text style={styles.infoValue}>{formatDate(item.date)}</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Description</Text><Text style={styles.infoValue}>{item.remark}</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>From</Text><Text style={styles.infoValue}>{item.giverName}</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>To</Text><Text style={styles.infoValue}>{item.reciverName}</Text></View>
                <View style={styles.infoItem}><Text style={styles.infoLabel}>Update By</Text><Text style={styles.infoValue}>{item.updatedBy}</Text></View>
                {/* {user?.role === 'Admin' && (<View style={styles.infoItem}><Text style={styles.infoLabel}>Updated By</Text><Text style={styles.infoValue}>{item.updatedBy}</Text></View>)} */}
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={[styles.actionBtn, styles.printBtn]} onPress={() => handlePrintOfficeExpense(item)}><Feather name="printer" size={16} color="#fff" /></TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => handleEditOfficeExpense(item.id)}><Feather name="edit" size={16} color="#fff" /></TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDeleteExpense(item.id)}><Feather name="trash-2" size={16} color="#fff" /></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><Text style={styles.headerTitle}>Office Expenses</Text></View>

            <View style={styles.controls}>
                <View style={styles.searchWrapper}>
                    <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#888" value={searchQuery} onChangeText={setSearchQuery} />
                    <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => setShowFilterModal(true)}><Feather name="filter" size={16} color="#fff" /><Text style={styles.btnText}>Filter</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={handleShowAllData}><Feather name="refresh-cw" size={16} color="#fff" /><Text style={styles.btnText}>Show All</Text></TouchableOpacity>
                </View>
            </View>

            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Total: {formatCurrency(totalFilteredAmount)}</Text>
                <TouchableOpacity style={styles.addExpenseBtn} onPress={() => setShowAddOfficeExpense(true)}><Feather name="plus" size={20} color="#fff" /></TouchableOpacity>
            </View>

            {error && <View style={styles.errorContainer}><Feather name="alert-circle" size={24} color="#721c24" style={styles.errorIcon} /><View><Text style={styles.errorTitle}>Error</Text><Text style={styles.errorText}>{error}</Text></View></View>}

            {isLoading ? (
                <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#007bff" /><Text style={styles.loadingText}>Loading...</Text></View>
            ) : (
                <FlatList
                    data={filteredExpenses}
                    renderItem={renderExpenseCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.flatListContent}
                    ListEmptyComponent={() => (
                        <View style={styles.noDataContainer}>
                            <Feather name="database" size={40} color="#666" style={styles.noDataIcon} />
                            <Text style={styles.noDataTitle}>No Expenses Found</Text>
                            <Text style={styles.noDataText}>{searchQuery || startDate || endDate ? 'No results for your current filters.' : 'No expenses have been recorded.'}</Text>
                        </View>
                    )}
                />
            )}

            {/* Filter Modal */}
            <Modal visible={showFilterModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowFilterModal(false)}><Feather name="x" size={24} color="#333" /></TouchableOpacity>
                        <Text style={styles.modalTitle}>Filter by Date</Text>
                        <View style={styles.dateInput}>
                            <Text style={styles.dateLabel}>Start Date</Text>
                            <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}><Text style={styles.dateText}>{startDate ? formatDate(startDate) : 'Select'}</Text><Feather name="calendar" size={20} color="#007bff" /></TouchableOpacity>
                            {showStartDatePicker && <DateTimePicker value={startDate || new Date()} mode="date" display="default" onChange={(e, date) => { setShowStartDatePicker(false); if (date) setStartDate(date); }} />}
                        </View>
                        <View style={styles.dateInput}>
                            <Text style={styles.dateLabel}>End Date</Text>
                            <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}><Text style={styles.dateText}>{endDate ? formatDate(endDate) : 'Select'}</Text><Feather name="calendar" size={20} color="#007bff" /></TouchableOpacity>
                            {showEndDatePicker && <DateTimePicker value={endDate || new Date()} mode="date" display="default" onChange={(e, date) => { setShowEndDatePicker(false); if (date) setEndDate(date); }} />}
                        </View>
                        <TouchableOpacity style={styles.submitButton} onPress={() => setShowFilterModal(false)}><Text style={styles.submitButtonText}>Apply Filter</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Add Expense Modal - RESTORED */}
            <Modal visible={showAddOfficeExpense} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowAddOfficeExpense(false)}><Feather name="x" size={24} color="#333" /></TouchableOpacity>
                        <Text style={styles.modalTitle}>Add Office Expense</Text>
                        <ScrollView>
                            <TextInput style={styles.modalInput} placeholder="Enter Giver Name" value={officeGiverName} onChangeText={setOfficeGiverName} />
                            <TextInput style={styles.modalInput} placeholder="Enter Receiver Name" value={officeReceiverName} onChangeText={setOfficeReceiverName} />
                            <TextInput style={styles.modalInput} placeholder="Enter Remark" value={officeRemark} onChangeText={setOfficeRemark} />
                            <TextInput style={styles.modalInput} placeholder="Enter Amount" keyboardType="numeric" value={officeAmount} onChangeText={setOfficeAmount} />
                            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}><Text style={styles.dateText}>{formatDate(officeDate)}</Text><Feather name="calendar" size={20} color="#007bff" /></TouchableOpacity>
                            {showDatePicker && <DateTimePicker value={officeDate} mode="date" display="default" onChange={(e, date) => { setShowDatePicker(false); if (date) setOfficeDate(date); }} />}
                            <TouchableOpacity style={[styles.submitButton, isSubmitted && styles.submitButtonDisabled]} onPress={handleAddOfficeExpense} disabled={isSubmitted}><Text style={styles.submitButtonText}>{isSubmitted ? 'Submitting...' : 'Submit'}</Text></TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Edit Expense Modal - RESTORED */}
            <Modal visible={showOfficeExpenseEditForm} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowOfficeExpenseEditForm(false)}><Feather name="x" size={24} color="#333" /></TouchableOpacity>
                        <Text style={styles.modalTitle}>Edit Office Expense</Text>
                        <ScrollView>
                            <TextInput style={styles.modalInput} placeholder="Enter Giver Name" value={editOfficeGiverName} onChangeText={setEditOfficeGiverName} />
                            <TextInput style={styles.modalInput} placeholder="Enter Receiver Name" value={editOfficeReceiverName} onChangeText={setEditOfficeReceiverName} />
                            <TextInput style={styles.modalInput} placeholder="Enter Remark" value={editOfficeRemark} onChangeText={setEditOfficeRemark} />
                            <TextInput style={styles.modalInput} placeholder="Enter Amount" keyboardType="numeric" value={editOfficeAmount} onChangeText={setEditOfficeAmount} />
                            <TouchableOpacity style={styles.dateButton} onPress={() => setShowEditDatePicker(true)}><Text style={styles.dateText}>{formatDate(editOfficeDate)}</Text><Feather name="calendar" size={20} color="#007bff" /></TouchableOpacity>
                            {showEditDatePicker && <DateTimePicker value={editOfficeDate} mode="date" display="default" onChange={(e, date) => { setShowEditDatePicker(false); if (date) setEditOfficeDate(date); }} />}
                            <TouchableOpacity style={styles.submitButton} onPress={handleUpdateOfficeExpense}><Text style={styles.submitButtonText}>Update</Text></TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const scaleFont = (size) => Math.round((size * width) / 375);

// Styles (with minor improvements for modals)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { backgroundColor: '#007bff', paddingVertical: 20, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    headerTitle: { fontSize: scaleFont(24), fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    controls: { padding: 20 },
    searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, elevation: 3, shadowColor: '#000' },
    searchInput: { flex: 1, paddingVertical: 12, fontSize: scaleFont(16), color: '#333' },
    searchIcon: { marginLeft: 8 },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
    controlButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007bff', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, flex: 1, marginHorizontal: 4, justifyContent: 'center', elevation: 3, shadowColor: '#000' },
    summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
    totalAmount: { fontSize: scaleFont(18), fontWeight: 'bold', color: '#333' },
    addExpenseBtn: { backgroundColor: '#28a745', padding: 12, borderRadius: 50, elevation: 3, shadowColor: '#000' },
    btnText: { color: '#fff', fontSize: scaleFont(16), fontWeight: '600', marginLeft: 8 },
    flatListContent: { paddingHorizontal: 20, paddingBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, padding: 16, elevation: 4, shadowColor: '#000' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    cardPrice: { fontSize: scaleFont(20), fontWeight: 'bold', color: '#28a745' },
    cardBody: { marginBottom: 12 },
    infoItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    infoLabel: { fontSize: scaleFont(15), color: '#555', fontWeight: '600' },
    infoValue: { fontSize: scaleFont(15), color: '#333', textAlign: 'right', flex: 1, marginLeft: 8 },
    cardActions: { flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee' },
    actionBtn: { padding: 10, borderRadius: 50, marginLeft: 8, justifyContent: 'center', alignItems: 'center' },
    editBtn: { backgroundColor: '#007bff' },
    deleteBtn: { backgroundColor: '#dc3545' },
    printBtn: { backgroundColor: '#17a2b8' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: width * 0.9, maxHeight: '85%' },
    closeButton: { alignSelf: 'flex-end', marginBottom: 8 },
    modalTitle: { fontSize: scaleFont(22), fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 24 },
    modalInput: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: scaleFont(16), color: '#333', borderWidth: 1, borderColor: '#ccc' },
    dateInput: { marginBottom: 16 },
    dateLabel: { fontSize: scaleFont(14), fontWeight: '600', color: '#555', marginBottom: 8 },
    dateButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f9fa', padding: 16, borderRadius: 12, justifyContent: 'space-between', borderWidth: 1, borderColor: '#ccc', marginBottom: 16 },
    dateText: { fontSize: scaleFont(16), color: '#333' },
    submitButton: { backgroundColor: '#007bff', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
    submitButtonDisabled: { backgroundColor: '#6c757d' },
    submitButtonText: { color: '#fff', fontSize: scaleFont(18), fontWeight: '600' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: scaleFont(16), color: '#555' },
    noDataContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 50 },
    noDataIcon: { marginBottom: 16 },
    noDataTitle: { fontSize: scaleFont(20), fontWeight: 'bold', color: '#333', marginBottom: 8 },
    noDataText: { fontSize: scaleFont(16), color: '#666', textAlign: 'center' },
    errorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8d7da', padding: 16, borderRadius: 12, marginHorizontal: 20, marginBottom: 16 },
    errorIcon: { marginRight: 12 },
    errorTitle: { fontSize: scaleFont(16), fontWeight: '600', color: '#721c24' },
    errorText: { fontSize: scaleFont(14), color: '#721c24' },
});

export default OfficeManagement;