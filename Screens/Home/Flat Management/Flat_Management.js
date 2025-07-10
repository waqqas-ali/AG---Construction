import { BASE_URL } from '@/Api/BASE_URL.js'; // Adjust path as needed
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// --- Re-designed FlatManagement Component ---

const FlatManagement = () => {
    // --- STATE AND HOOKS (LOGIC UNCHANGED) ---
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params || {};
    const [addScheme, setAddScheme] = useState(false);
    const [selectStatus, setSelectStatus] = useState('');
    const [schemeName, setSchemeName] = useState('');
    const [totalFlat, setTotalFlat] = useState('');
    const [buildingSize, setBuildingSize] = useState('');
    const [myLand, setMyLand] = useState([]);
    const [showCount, setShowCount] = useState({});
    const [searchScheme, setSearchScheme] = useState('');
    const [editSchemeId, setEditSchemeId] = useState(null);
    const [count, setCount] = useState(0);

    // --- API & DATA FUNCTIONS (LOGIC UNCHANGED) ---
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            return token;
        } catch (error) {
            console.error('Error retrieving token:', error);
            return null;
        }
    };

    const handleCreateScheme = async () => {
        const token = await getToken();
        if (!token) {
            Alert.alert('Error', 'Authentication token not found');
            return;
        }
        if (!id) {
            Alert.alert('Error', 'A project must be associated with a land parcel. Please start from the land management screen.');
            return;
        }
        if (!schemeName || !selectStatus || !totalFlat || !buildingSize) {
            Alert.alert('Incomplete Information', 'Please fill out all fields to create a scheme.');
            return;
        }
        const obj = {
            name: schemeName,
            status: selectStatus,
            landId: id,
            totalflat: totalFlat,
            buildingSize,
        };
        try {
            await axios.post(`${BASE_URL}/createProject`, obj, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Alert.alert('Success', 'Scheme added successfully');
            closeAndResetModal();
            setCount((prev) => prev + 1);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add scheme. Please try again.');
        }
    };

    const handleUpdateScheme = async () => {
        const token = await getToken();
        if (!token) {
            Alert.alert('Error', 'Authentication token not found');
            return;
        }
        const obj = {
            name: schemeName,
            status: selectStatus,
            totalflat: totalFlat,
            buildingSize,
        };
        try {
            await axios.put(`${BASE_URL}/updateProject/${editSchemeId}`, obj, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            });
            Alert.alert('Success', 'Scheme updated successfully');
            closeAndResetModal();
            setCount((prev) => prev + 1);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update scheme. Please try again.');
        }
    };

    const openEditModal = async (scheme) => {
        setSchemeName(scheme.name);
        setSelectStatus(scheme.status);
        setTotalFlat(scheme.totalflat.toString()); // Ensure it's a string for TextInput
        setBuildingSize(scheme.buildingSize);
        setEditSchemeId(scheme.id);
        setAddScheme(true);
    };

    const openCreateModal = () => {
        setEditSchemeId(null);
        setSchemeName('');
        setSelectStatus('');
        setTotalFlat('');
        setBuildingSize('');
        setAddScheme(true);
    };

    const closeAndResetModal = () => {
        setAddScheme(false);
        setEditSchemeId(null);
        setSchemeName('');
        setSelectStatus('');
        setTotalFlat('');
        setBuildingSize('');
    };


    useEffect(() => {
        const getLandAndCounts = async () => {
            const token = await getToken();
            if (!token) return;
            try {
                // Fetch projects and counts in parallel for better performance
                const [projectsResponse, countsResponse] = await Promise.all([
                    axios.get(`${BASE_URL}/getAllProjects`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${BASE_URL}/count`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const projectsData = Array.isArray(projectsResponse.data) ? projectsResponse.data : [];
                setMyLand(projectsData);
                setShowCount(countsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
                setMyLand([]);
                Alert.alert("Error", "Could not fetch project data.");
            }
        };
        getLandAndCounts();
    }, [id, count]);


    const confirmDelete = (id) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this scheme? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const token = await getToken();
                        if (!token) return;
                        try {
                            await axios.delete(`${BASE_URL}/deleteProject/${id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            Alert.alert('Success', 'Scheme deleted successfully');
                            setCount((prev) => prev + 1);
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Error', 'Failed to delete scheme.');
                        }
                    },
                },
            ],
        );
    };

    const handleNavigateToFlatList = (id, name) => {
        if (!id) {
            Alert.alert('Project Not Ready', 'This project has not been fully created yet.');
            return;
        }
        navigation.navigate('FlatList', { schemeId: id, schemeName: name });
    };

    const filteredSchemes = Array.isArray(myLand)
        ? myLand.filter((item) =>
            item.name && item.name.toLowerCase().includes(searchScheme.toLowerCase())
        )
        : [];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'IN_PROGRESS':
                return {
                    backgroundColor: 'rgba(255, 167, 38, 0.2)',
                    color: '#FF8C00'
                };
            case 'COMPLETE':
                return {
                    backgroundColor: 'rgba(0, 212, 170, 0.2)',
                    color: '#00D4AA'
                };
            case 'INACTIVE':
                return {
                    backgroundColor: 'rgba(119, 136, 153, 0.2)',
                    color: '#778899'
                };
            default:
                return {
                    backgroundColor: '#E0E0E0',
                    color: '#666'
                };
        }
    };

    // --- RENDER FUNCTIONS ---

    const renderSchemeItem = ({ item }) => {
        const countData = showCount[item.id] || {};
        const availableCount = countData.AVAILABLE || 0;
        const bookedCount = countData.BOOKED || 0;
        const statusStyle = getStatusStyle(item.status);

        return (
            <TouchableOpacity onPress={() => handleNavigateToFlatList(item.id, item.name)} style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => openEditModal(item)}>
                            <Feather name="edit" size={wp('5%')} color="#3498db" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => confirmDelete(item.id)}>
                            <Feather name="trash-2" size={wp('5%')} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cardStatusContainer}>
                    <Text style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }]}>
                        {item.status?.replace('_', ' ') || 'UNKNOWN'}
                    </Text>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.metricItem}>
                        <MaterialIcons name="home-work" size={wp('6%')} color="#00D4AA" />
                        <View style={styles.metricTextContainer}>
                            <Text style={styles.metricValue}>{item.totalflat || '0'}</Text>
                            <Text style={styles.metricLabel}>Total Flats</Text>
                        </View>
                    </View>
                    <View style={styles.metricItem}>
                        <MaterialCommunityIcons name="ruler-square-compass" size={wp('6%')} color="#3498db" />
                        <View style={styles.metricTextContainer}>
                            <Text style={styles.metricValue}>{item.buildingSize || 'N/A'}</Text>
                            <Text style={styles.metricLabel}>Sq.ft</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.cardFooter}>
                    <View style={styles.countItem}>
                        <View style={[styles.countIndicator, { backgroundColor: '#2ecc71' }]} />
                        <Text style={styles.countText}>Booked: {bookedCount}</Text>
                    </View>
                    <View style={styles.countItem}>
                        <View style={[styles.countIndicator, { backgroundColor: '#f1c40f' }]} />
                        <Text style={styles.countText}>Available: {availableCount}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyStateContainer}>
            <MaterialIcons name="maps-home-work" size={wp('20%')} color="#bdc3c7" />
            <Text style={styles.emptyStateTitle}>
                {searchScheme ? 'No Matches Found' : 'No Schemes Yet'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
                {searchScheme
                    ? 'Try a different search term.'
                    : 'Tap "New Scheme" to create your first project.'}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Flats Management</Text>
                {id && (
                    <TouchableOpacity style={styles.primaryButton} onPress={openCreateModal}>
                        <Feather name="plus" size={wp('5%')} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchInputContainer}>
                    <Feather name="search" size={wp('5%')} color="#95a5a6" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for a scheme..."
                        placeholderTextColor="#95a5a6"
                        value={searchScheme}
                        onChangeText={setSearchScheme}
                    />
                </View>
            </View>

            <FlatList
                data={filteredSchemes}
                renderItem={renderSchemeItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={renderEmptyComponent}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={addScheme}
                animationType="slide"
                transparent
                onRequestClose={closeAndResetModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editSchemeId ? 'Edit Scheme' : 'Create New Scheme'}
                            </Text>
                            <TouchableOpacity onPress={closeAndResetModal} style={styles.closeButton}>
                                <Feather name="x" size={wp('6%')} color="#34495e" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.label}>Project Name</Text>
                            <TextInput
                                style={styles.input}
                                value={schemeName}
                                onChangeText={setSchemeName}
                                placeholder="e.g., 'Sunrise Apartments'"
                                placeholderTextColor="#bdc3c7"
                            />

                            <Text style={styles.label}>Project Status</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectStatus}
                                    onValueChange={(itemValue) => setSelectStatus(itemValue)}
                                    style={styles.picker}
                                    dropdownIconColor="#34495e"
                                >
                                    <Picker.Item label="-- Select Status --" value="" style={styles.pickerItem} />
                                    <Picker.Item label="In Progress" value="IN_PROGRESS" style={styles.pickerItem} />
                                    <Picker.Item label="Complete" value="COMPLETE" style={styles.pickerItem} />
                                    <Picker.Item label="Inactive" value="INACTIVE" style={styles.pickerItem} />
                                </Picker>
                            </View>

                            <View style={styles.inputRow}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.label}>Total Flats</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={totalFlat}
                                        onChangeText={setTotalFlat}
                                        placeholder="e.g., 24"
                                        placeholderTextColor="#bdc3c7"
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.label}>Building Size (Sq.ft)</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={buildingSize}
                                        onChangeText={setBuildingSize}
                                        placeholder="e.g., 25000"
                                        placeholderTextColor="#bdc3c7"
                                        keyboardType="decimal-pad"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={editSchemeId ? handleUpdateScheme : handleCreateScheme}>
                                <Text style={styles.submitButtonText}>
                                    {editSchemeId ? 'Update Scheme' : 'Save Scheme'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop : hp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerTitle: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00D4AA',
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('3%'),
        borderRadius: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginLeft: wp('1.5%'),
    },
    searchSection: {
        padding: wp('5%'),
        backgroundColor: '#ffffff',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: wp('4%'),
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    searchInput: {
        flex: 1,
        fontSize: wp('4%'),
        paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1.2%'),
        marginLeft: wp('2%'),
        color: '#2c3e50',
    },
    listContainer: {
        paddingHorizontal: wp('5%'),
        paddingBottom: hp('10%'), // padding for floating button if any
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: wp('4%'),
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#2c3e50',
        flex: 1, // To allow text to wrap if needed
        marginRight: wp('2%'),
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: wp('3%'),
        padding: wp('1%'),
    },
    cardStatusContainer: {
        flexDirection: 'row',
        marginTop: hp('1%'),
    },
    statusBadge: {
        fontSize: wp('3.2%'),
        fontWeight: '600',
        paddingVertical: hp('0.5%'),
        paddingHorizontal: wp('2.5%'),
        borderRadius: 20,
        textTransform: 'capitalize',
        overflow: 'hidden',
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('2%'),
    },
    metricItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    metricTextContainer: {
        marginLeft: wp('2%'),
    },
    metricValue: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    metricLabel: {
        fontSize: wp('3.5%'),
        color: '#7f8c8d',
    },
    cardDivider: {
        height: 1,
        backgroundColor: '#e9ecef',
        marginVertical: hp('2%'),
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countIndicator: {
        width: wp('2.5%'),
        height: wp('2.5%'),
        borderRadius: wp('1.25%'),
        marginRight: wp('2%'),
    },
    countText: {
        fontSize: wp('3.8%'),
        color: '#34495e',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('15%'),
    },
    emptyStateTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#34495e',
        marginTop: hp('2%'),
    },
    emptyStateSubtitle: {
        fontSize: wp('4%'),
        color: '#7f8c8d',
        textAlign: 'center',
        marginTop: hp('1%'),
        paddingHorizontal: wp('10%'),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: wp('5%'),
        paddingBottom: hp('4%'),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    modalTitle: {
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    closeButton: {
        padding: wp('2%'),
        borderRadius: 50,
        backgroundColor: '#ecf0f1',
    },
    form: {},
    label: {
        fontSize: wp('4%'),
        color: '#34495e',
        marginBottom: hp('1%'),
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 10,
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        fontSize: wp('4%'),
        color: '#2c3e50',
        marginBottom: hp('2%'),
    },
    pickerContainer: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 10,
        marginBottom: hp('2%'),
    },
    picker: {
        width: '100%',
        height: hp('6%'),
        color: '#2c3e50',
    },
    pickerItem: {
        fontSize: wp('4%'),
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputHalf: {
        width: '48%',
    },
    submitButton: {
        backgroundColor: '#00D4AA',
        padding: hp('1.8%'),
        borderRadius: 12,
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    submitButtonText: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
});

export default FlatManagement;