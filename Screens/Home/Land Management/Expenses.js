// 








"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import React, { useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Modal,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Enhanced responsive helper functions (consistent with Land_Management.js)
const getResponsiveWidth = (percentage) => (SCREEN_WIDTH * percentage) / 100
const getResponsiveHeight = (percentage) => (SCREEN_HEIGHT * percentage) / 100
const getResponsiveFontSize = (size) => {
  const scale = SCREEN_WIDTH / 375 // Base width (iPhone X)
  const newSize = size * scale
  return Math.max(Math.min(newSize, size * 1.4), size * 0.7)
}
const getResponsivePadding = (size) => {
  const scale = SCREEN_WIDTH / 375
  return Math.max(Math.min(size * scale, size * 1.3), size * 0.8)
}

// Device type detection (consistent with Land_Management.js)
const isSmallPhone = SCREEN_WIDTH < 350
const isPhone = SCREEN_WIDTH < 768
const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024
const isLargeTablet = SCREEN_WIDTH >= 1024

// Dynamic modal sizing
const getModalDimensions = () => {
  if (isLargeTablet) {
    return {
      width: SCREEN_WIDTH * 0.5,
      maxHeight: SCREEN_HEIGHT * 0.8,
      borderRadius: getResponsiveWidth(3),
      padding: getResponsivePadding(24),
    }
  } else if (isTablet) {
    return {
      width: SCREEN_WIDTH * 0.75,
      maxHeight: SCREEN_HEIGHT * 0.85,
      borderRadius: getResponsiveWidth(4),
      padding: getResponsivePadding(20),
    }
  } else if (isSmallPhone) {
    return {
      width: SCREEN_WIDTH * 0.95,
      maxHeight: SCREEN_HEIGHT * 0.9,
      borderRadius: getResponsiveWidth(4),
      padding: getResponsivePadding(16),
    }
  } else {
    return {
      width: SCREEN_WIDTH * 0.9,
      maxHeight: SCREEN_HEIGHT * 0.85,
      borderRadius: getResponsiveWidth(4),
      padding: getResponsivePadding(20),
    }
  }
}

const Expenses = ({ navigation, route }) => {
  const { id: landId, name: landName } = route.params
  const [expenses, setExpenses] = useState([]) // Ensure initial state is an array
  const [totalExpenses, setTotalExpenses] = useState(0) // Store total from API
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [expenseName, setExpenseName] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const modalDimensions = getModalDimensions()

  const fetchExpenses = async () => {
    setLoading(true)
    setError(null)
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken")
      if (!jwtToken) {
        throw new Error("No JWT token found")
      }
      const response = await axios.get(`${BASE_URL}/land-expenses/${landId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      // Set expenses to response.data.expenses and ensure it's an array
      setExpenses(Array.isArray(response.data.expenses) ? response.data.expenses : [])
      // Set total expenses from response.data.total
      setTotalExpenses(response.data.total || 0)
    } catch (err) {
      setError(err.message || "Failed to fetch expenses")
      setExpenses([]) // Set to empty array on error
      setTotalExpenses(0) // Reset total on error
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchExpenses()
    setRefreshing(false)
  }, [])

  const handleAddExpense = async () => {
    if (!expenseName.trim() || !amount) {
      Alert.alert("Error", "Please enter both expense name and amount")
      return
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Error", "Please enter a valid amount")
      return
    }

    setIsSubmitting(true)
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken")
      if (!jwtToken) {
        throw new Error("No JWT token found")
      }

      await axios.post(
        `${BASE_URL}/land-expenses/${landId}`,
        {
          expenseName,
          amount: parsedAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      Alert.alert("Success", "Expense added successfully")
      setExpenseName("")
      setAmount("")
      setShowAddModal(false)
      await fetchExpenses() // Refresh the expenses list
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to add expense")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const formatCurrency = (amount) => {
    if (!amount) return "₹0"
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A"
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const renderExpenseCard = ({ item }) => (
    <View style={[styles.card, isTablet && styles.cardTablet, isLargeTablet && styles.cardLargeTablet]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.expenseTitle, isTablet && styles.expenseTitleTablet]} numberOfLines={2}>
          {item.expenseName || "Unnamed Expense"}
        </Text>
      </View>
      <View style={styles.details}>
        <InfoRow icon="cash-outline" label="Amount" value={formatCurrency(item.amount)} valueColor={colors.error} />
        <InfoRow icon="calendar-outline" label="Date" value={formatDate(item.date)} />
      </View>
    </View>
  )

  const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
    <View style={[styles.detailRow, isTablet && styles.detailRowTablet]}>
      <View style={styles.detailIconContainer}>
        <Ionicons name={icon} size={getResponsiveFontSize(18)} color={colors.primary} />
      </View>
      <Text style={[styles.label, isTablet && styles.labelTablet]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }, isTablet && styles.valueTablet]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  )

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, isTablet && styles.loadingTextTablet]}>Loading expenses...</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.centeredContainer}>
          <Ionicons name="cloud-offline-outline" size={getResponsiveFontSize(60)} color={colors.error} />
          <Text style={[styles.errorText, isTablet && styles.errorTextTablet]}>Error: {error}</Text>
          <TouchableOpacity style={[styles.retryButton, isTablet && styles.retryButtonTablet]} onPress={fetchExpenses}>
            <Text style={[styles.retryButtonText, isTablet && styles.retryButtonTextTablet]}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderExpenseCard}
        contentContainerStyle={[styles.listContent, isTablet && styles.listContentTablet]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        numColumns={isLargeTablet ? 2 : 1}
        columnWrapperStyle={isLargeTablet ? styles.columnWrapper : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-stacked-outline" size={getResponsiveFontSize(80)} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, isTablet && styles.emptyTitleTablet]}>No expenses found</Text>
            <Text style={[styles.emptySubtitle, isTablet && styles.emptySubtitleTablet]}>
              No expenses recorded for this land yet.
            </Text>
          </View>
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <View>
          <Text style={[styles.title, isTablet && styles.titleTablet]}>{landName}</Text>
          <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
            Total Expenses: {formatCurrency(totalExpenses)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, isTablet && styles.addButtonTablet]}
          onPress={() => setShowAddModal(true)}
          activeOpacity={0.8}
          accessibilityLabel="Add Expense"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={getResponsiveFontSize(24)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {renderContent()}

      {/* Add Expense Modal */}
      <Modal
        visible={showAddModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
        accessibilityLabel="Add Expense Modal"
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                width: modalDimensions.width,
                maxHeight: modalDimensions.maxHeight,
                borderRadius: modalDimensions.borderRadius,
                padding: modalDimensions.padding,
              },
              isTablet && styles.modalContentTablet,
            ]}
          >
            <View style={[styles.modalHeader, isTablet && styles.modalHeaderTablet]}>
              <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>Add New Expense</Text>
              <TouchableOpacity
                style={[styles.closeButton, isTablet && styles.closeButtonTablet]}
                onPress={() => setShowAddModal(false)}
                accessibilityLabel="Close Modal"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={getResponsiveFontSize(24)} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={[styles.inputContainer, isTablet && styles.inputContainerTablet]}>
                <Ionicons
                  name="document-text-outline"
                  size={getResponsiveFontSize(20)}
                  color={colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isTablet && styles.inputTablet]}
                  placeholder="Expense Name"
                  placeholderTextColor={colors.textSecondary}
                  value={expenseName}
                  onChangeText={setExpenseName}
                  accessibilityLabel="Expense Name Input"
                />
              </View>
              <View style={[styles.inputContainer, isTablet && styles.inputContainerTablet]}>
                <Ionicons
                  name="cash-outline"
                  size={getResponsiveFontSize(20)}
                  color={colors.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isTablet && styles.inputTablet]}
                  placeholder="Amount"
                  placeholderTextColor={colors.textSecondary}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  accessibilityLabel="Amount Input"
                />
              </View>
              <TouchableOpacity
                style={[styles.submitButton, isTablet && styles.submitButtonTablet, isSubmitting && styles.disabledButton]}
                onPress={handleAddExpense}
                disabled={isSubmitting}
                accessibilityLabel="Submit Expense"
                accessibilityRole="button"
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={[styles.submitButtonText, isTablet && styles.submitButtonTextTablet]}>Add Expense</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  background: "#F7F8FA",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#666666",
  border: "#E8E8E8",
  shadow: "#000000",
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getResponsivePadding(20),
    paddingTop: getResponsiveHeight(5),
    paddingBottom: getResponsivePadding(15),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTablet: {
    paddingHorizontal: getResponsivePadding(32),
    paddingTop: getResponsiveHeight(4),
    paddingBottom: getResponsivePadding(20),
  },
  title: {
    fontSize: getResponsiveFontSize(25),
    fontWeight: "bold",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  titleTablet: {
    fontSize: getResponsiveFontSize(36),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginTop: getResponsiveHeight(0.5),
    fontWeight: "500",
  },
  subtitleTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  addButton: {
    backgroundColor: colors.primary,
    width: getResponsiveWidth(11),
    height: getResponsiveWidth(11),
    borderRadius: getResponsiveWidth(5.5),
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonTablet: {
    width: getResponsiveWidth(9),
    height: getResponsiveWidth(9),
    borderRadius: getResponsiveWidth(4.5),
  },
  listContent: {
    paddingHorizontal: getResponsivePadding(16),
    paddingVertical: getResponsivePadding(20),
  },
  listContentTablet: {
    paddingHorizontal: getResponsivePadding(32),
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: getResponsivePadding(8),
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: getResponsiveWidth(4),
    marginBottom: getResponsiveHeight(2.5),
    padding: getResponsivePadding(20),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTablet: {
    padding: getResponsivePadding(24),
    marginBottom: getResponsiveHeight(3),
  },
  cardLargeTablet: {
    width: "48%",
    marginHorizontal: "1%",
  },
  cardHeader: {
    marginBottom: getResponsiveHeight(2),
  },
  expenseTitle: {
    fontSize: getResponsiveFontSize(22),
    fontWeight: "bold",
    color: colors.textPrimary,
    lineHeight: getResponsiveFontSize(26),
  },
  expenseTitleTablet: {
    fontSize: getResponsiveFontSize(26),
    lineHeight: getResponsiveFontSize(30),
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: getResponsivePadding(16),
    marginBottom: getResponsiveHeight(2),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(1.2),
  },
  detailRowTablet: {
    marginBottom: getResponsiveHeight(1.5),
  },
  detailIconContainer: {
    marginRight: getResponsiveWidth(3),
    width: getResponsiveWidth(5),
    alignItems: "center",
  },
  label: {
    fontSize: getResponsiveFontSize(15),
    color: colors.textSecondary,
    flex: 0.4,
    fontWeight: "500",
  },
  labelTablet: {
    fontSize: getResponsiveFontSize(17),
  },
  value: {
    fontSize: getResponsiveFontSize(15),
    fontWeight: "500",
    color: colors.textPrimary,
    flex: 0.6,
    textAlign: "right",
  },
  valueTablet: {
    fontSize: getResponsiveFontSize(17),
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: getResponsivePadding(20),
  },
  loadingText: {
    marginTop: getResponsiveHeight(2),
    fontSize: getResponsiveFontSize(18),
    fontWeight: "500",
    color: colors.textSecondary,
  },
  loadingTextTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  errorText: {
    fontSize: getResponsiveFontSize(18),
    color: colors.error,
    textAlign: "center",
    marginTop: getResponsiveHeight(2),
    fontWeight: "500",
  },
  errorTextTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(30),
    borderRadius: getResponsiveWidth(6),
    marginTop: getResponsiveHeight(2.5),
    elevation: 2,
  },
  retryButtonTablet: {
    paddingVertical: getResponsivePadding(15),
    paddingHorizontal: getResponsivePadding(40),
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(16),
    fontWeight: "bold",
  },
  retryButtonTextTablet: {
    fontSize: getResponsiveFontSize(18),
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: getResponsiveHeight(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  emptyTitle: {
    fontSize: getResponsiveFontSize(22),
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: getResponsiveHeight(2),
    textAlign: "center",
  },
  emptyTitleTablet: {
    fontSize: getResponsiveFontSize(26),
  },
  emptySubtitle: {
    fontSize: getResponsiveFontSize(16),
    color: colors.textSecondary,
    marginTop: getResponsiveHeight(1),
    textAlign: "center",
    lineHeight: getResponsiveFontSize(22),
  },
  emptySubtitleTablet: {
    fontSize: getResponsiveFontSize(18),
    lineHeight: getResponsiveFontSize(24),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 25,
  },
  modalContentTablet: {
    maxWidth: 600,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: getResponsivePadding(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: getResponsiveHeight(2),
  },
  modalHeaderTablet: {
    paddingBottom: getResponsivePadding(20),
    marginBottom: getResponsiveHeight(2.5),
  },
  modalTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  modalTitleTablet: {
    fontSize: getResponsiveFontSize(24),
  },
  closeButton: {
    padding: getResponsivePadding(8),
    borderRadius: getResponsiveWidth(4),
    backgroundColor: "#F3F4F6",
  },
  closeButtonTablet: {
    padding: getResponsivePadding(10),
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    marginBottom: getResponsiveHeight(2),
    paddingHorizontal: getResponsivePadding(15),
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputContainerTablet: {
    marginBottom: getResponsiveHeight(2.5),
    paddingHorizontal: getResponsivePadding(20),
  },
  inputIcon: {
    marginRight: getResponsiveWidth(3),
  },
  input: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: colors.textPrimary,
    paddingVertical: getResponsivePadding(15),
  },
  inputTablet: {
    fontSize: getResponsiveFontSize(18),
    paddingVertical: getResponsivePadding(18),
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: getResponsiveWidth(3),
    paddingVertical: getResponsivePadding(12),
    alignItems: "center",
    elevation: 2,
  },
  submitButtonTablet: {
    paddingVertical: getResponsivePadding(15),
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
  },
  submitButtonTextTablet: {
    fontSize: getResponsiveFontSize(18),
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
})

export default Expenses