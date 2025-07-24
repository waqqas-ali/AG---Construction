// "use client"

// import { BASE_URL } from "@/Api/BASE_URL.js"
// import { Ionicons } from "@expo/vector-icons"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from "axios"
// import { useCallback, useEffect, useState } from "react"
// import {
//   ActivityIndicator,
//   Alert,
//   Animated,
//   Dimensions,
//   FlatList,
//   Modal,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// // Enhanced responsive helper functions
// const getResponsiveWidth = (percentage) => (SCREEN_WIDTH * percentage) / 100
// const getResponsiveHeight = (percentage) => (SCREEN_HEIGHT * percentage) / 100
// const getResponsiveFontSize = (size) => {
//   const scale = SCREEN_WIDTH / 375 // Base width (iPhone X)
//   const newSize = size * scale
//   return Math.max(Math.min(newSize, size * 1.4), size * 0.7)
// }
// const getResponsivePadding = (size) => {
//   const scale = SCREEN_WIDTH / 375
//   return Math.max(Math.min(size * scale, size * 1.3), size * 0.8)
// }

// // Device type detection
// const isSmallPhone = SCREEN_WIDTH < 350
// const isPhone = SCREEN_WIDTH < 768
// const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024
// const isLargeTablet = SCREEN_WIDTH >= 1024
// const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT
// const isShortScreen = SCREEN_HEIGHT < 700

// // Dynamic modal sizing
// const getModalDimensions = () => {
//   if (isLargeTablet) {
//     return {
//       width: isLandscape ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.65,
//       maxHeight: SCREEN_HEIGHT * 0.8,
//       borderRadius: getResponsiveWidth(3),
//       padding: getResponsivePadding(24),
//     }
//   } else if (isTablet) {
//     return {
//       width: isLandscape ? SCREEN_WIDTH * 0.6 : SCREEN_WIDTH * 0.75,
//       maxHeight: SCREEN_HEIGHT * 0.85,
//       borderRadius: getResponsiveWidth(4),
//       padding: getResponsivePadding(20),
//     }
//   } else if (isSmallPhone) {
//     return {
//       width: SCREEN_WIDTH * 0.95,
//       maxHeight: SCREEN_HEIGHT * 0.9,
//       borderRadius: getResponsiveWidth(4),
//       padding: getResponsivePadding(16),
//     }
//   } else {
//     return {
//       width: SCREEN_WIDTH * 0.9,
//       maxHeight: SCREEN_HEIGHT * 0.85,
//       borderRadius: getResponsiveWidth(4),
//       padding: getResponsivePadding(20),
//     }
//   }
// }

// const Land_Management = ({ navigation }) => {
//   const [lands, setLands] = useState([])
//   const [filteredLands, setFilteredLands] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [searchText, setSearchText] = useState("")
//   const [showModalVisible, setShowModalVisible] = useState(false)
//   const [selectedLand, setSelectedLand] = useState(null)
//   const [fadeAnim] = useState(new Animated.Value(0))
//   const [modalAnim] = useState(new Animated.Value(0))

//   const modalDimensions = getModalDimensions()

//   const getAllLands = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const jwtToken = await AsyncStorage.getItem("jwtToken")
//       if (!jwtToken) {
//         throw new Error("No JWT token found")
//       }
//       const response = await axios.get(`${BASE_URL}/getAllland`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`,
//         },
//       })
//       setLands(response.data)
//       setFilteredLands(response.data)
//       console.log(JSON.stringify(response.data, null, 2))
//     } catch (err) {
//       setError(err.message || "Failed to fetch lands")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await getAllLands()
//     setRefreshing(false)
//   }, [])

//   useEffect(() => {
//     getAllLands()
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start()
//   }, [])

//   useEffect(() => {
//     const filtered = lands.filter(
//       (land) =>
//         land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
//     )
//     setFilteredLands(filtered)
//   }, [searchText, lands])

//   const handleLandPress = (land) => {
//     console.log("Card tapped:", land.id)
//   }

//   const handleShowLand = (land) => {
//     setSelectedLand(land)
//     setShowModalVisible(true)
//     Animated.spring(modalAnim, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 100,
//       friction: 8,
//     }).start()
//   }

//   const handleCloseModal = () => {
//     Animated.timing(modalAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setShowModalVisible(false)
//       setSelectedLand(null)
//     })
//   }

//   const handleAddLand = () => {
//     navigation.navigate("Add_Edit_Land")
//   }

//   const handleDeleteLand = (id) => {
//     Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             const jwtToken = await AsyncStorage.getItem("jwtToken")
//             await axios.delete(`${BASE_URL}/delete/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${jwtToken}`,
//               },
//             })
//             getAllLands()
//             Alert.alert("Success", "Land deleted successfully")
//           } catch (err) {
//             Alert.alert("Error", err.message || "Failed to delete land")
//           }
//         },
//       },
//     ])
//   }

//   const handleStartProject = (landId) => {
//     navigation.navigate("Flat_Management", { id: landId })
//   }

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A"
//     const date = new Date(dateStr)
//     const day = String(date.getDate()).padStart(2, "0")
//     const month = String(date.getMonth() + 1).padStart(2, "0")
//     const year = date.getFullYear()
//     return `${day}-${month}-${year}`
//   }

//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0"
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   const formatArea = (area) => {
//     if (!area) return "N/A"
//     return `${area.toLocaleString()} sq ft`
//   }

//   // Enhanced InfoRow component with responsive design
//   const InfoRow = ({ icon, label, value, valueColor = colors.textPrimary }) => (
//     <View style={[styles.detailRow, isTablet && styles.detailRowTablet]}>
//       <View style={styles.detailIconContainer}>
//         <Ionicons name={icon} size={getResponsiveFontSize(18)} color={colors.primary} />
//       </View>
//       <Text style={[styles.label, isTablet && styles.labelTablet]}>{label}</Text>
//       <Text style={[styles.value, { color: valueColor }, isTablet && styles.valueTablet]} numberOfLines={2}>
//         {value}
//       </Text>
//     </View>
//   )

//   // Enhanced ActionButton component
//   const ActionButton = ({ onPress, icon, text, style, disabled = false }) => (
//     <TouchableOpacity
//       style={[
//         styles.actionButton,
//         style,
//         disabled && styles.disabledButton,
//         isTablet && styles.actionButtonTablet,
//         isSmallPhone && styles.actionButtonSmall,
//       ]}
//       onPress={onPress}
//       disabled={disabled}
//       activeOpacity={0.8}
//       accessibilityLabel={text}
//       accessibilityRole="button"
//     >
//       <Ionicons name={icon} size={getResponsiveFontSize(16)} color="#FFFFFF" />
//       <Text style={[styles.actionButtonText, isTablet && styles.actionButtonTextTablet]}>{text}</Text>
//     </TouchableOpacity>
//   )

//   // Enhanced Partner Card component
//   const PartnerCard = ({ partner }) => {
//     const totalTransactions = partner.landTransactions?.length || 0
//     const totalAmount =
//       partner.landTransactions?.reduce((sum, transaction) => {
//         return transaction.change === "CREDIT"
//           ? sum + transaction.transactionAmount
//           : sum - transaction.transactionAmount
//       }, 0) || 0

//     return (
//       <View style={[styles.partnerCard, isTablet && styles.partnerCardTablet]}>
//         <View style={styles.partnerHeader}>
//           <View style={styles.partnerInfo}>
//             <View style={[styles.partnerAvatar, isTablet && styles.partnerAvatarTablet]}>
//               <Text style={[styles.partnerInitial, isTablet && styles.partnerInitialTablet]}>
//                 {partner.name?.charAt(0)?.toUpperCase()}
//               </Text>
//             </View>
//             <View style={styles.partnerDetails}>
//               <Text style={[styles.partnerName, isTablet && styles.partnerNameTablet]}>{partner.name}</Text>
//               <Text style={[styles.partnerLocation, isTablet && styles.partnerLocationTablet]}>
//                 <Ionicons name="location-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
//                 {partner.city || "N/A"}
//               </Text>
//               <Text style={[styles.partnerPhone, isTablet && styles.partnerPhoneTablet]}>
//                 <Ionicons name="call-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
//                 {partner.phoneNumber || "N/A"}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.partnerStats}>
//             <Text style={[styles.partnerStatsNumber, isTablet && styles.partnerStatsNumberTablet]}>
//               {totalTransactions}
//             </Text>
//             <Text style={[styles.partnerStatsLabel, isTablet && styles.partnerStatsLabelTablet]}>Transactions</Text>
//             <Text
//               style={[
//                 styles.partnerStatsAmount,
//                 { color: totalAmount >= 0 ? colors.success : colors.error },
//                 isTablet && styles.partnerStatsAmountTablet,
//               ]}
//             >
//               {formatCurrency(Math.abs(totalAmount))}
//             </Text>
//           </View>
//         </View>
//         <View style={[styles.partnerActions, isTablet && styles.partnerActionsTablet]}>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.viewButton, isTablet && styles.partnerButtonTablet]}
//             onPress={() => {
//               handleCloseModal()
//               navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
//             }}
//             accessibilityLabel="View Transactions"
//             accessibilityRole="button"
//           >
//             <Ionicons name="eye-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
//             <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>View</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.partnerButton, styles.payButton, isTablet && styles.partnerButtonTablet]}
//             onPress={() => {
//               handleCloseModal()
//               navigation.navigate("Pay_Partner", { partnerId: partner.id })
//             }}
//             accessibilityLabel="Pay Partner"
//             accessibilityRole="button"
//           >
//             <Ionicons name="card-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
//             <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>Pay</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   }

//   const renderLandCard = ({ item, index }) => (
//     <Animated.View
//       style={[
//         styles.card,
//         isTablet && styles.cardTablet,
//         isLargeTablet && styles.cardLargeTablet,
//         {
//           opacity: fadeAnim,
//           transform: [
//             {
//               translateY: fadeAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [50, 0],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <TouchableOpacity activeOpacity={0.95} onPress={() => handleLandPress(item)}>
//         {/* Card Header */}
//         <View style={styles.cardHeader}>
//           <View style={styles.landTitleContainer}>
//             <Text style={[styles.landName, isTablet && styles.landNameTablet]} numberOfLines={2}>
//               {item.address?.landmark || item.owner?.name || "Unnamed Land"}
//             </Text>
//             {item.project && (
//               <View
//                 style={[
//                   styles.statusBadge,
//                   item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.statusText,
//                     item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
//                   ]}
//                 >
//                   {item.project.status?.replace("_", " ") || "UNKNOWN"}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {item.project && (
//             <Text style={[styles.projectName, isTablet && styles.projectNameTablet]}>Project: {item.project.name}</Text>
//           )}
//         </View>

//         {/* Financial Summary */}
//         <View style={[styles.financialSummary, isTablet && styles.financialSummaryTablet]}>
//           <View style={[styles.amountCard, { borderLeftColor: colors.success }]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="cash-outline" size={getResponsiveFontSize(20)} color={colors.success} />
//               <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Total Amount</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.success }, isTablet && styles.amountValueTablet]}>
//               {formatCurrency(item.totalAmount)}
//             </Text>
//           </View>
//           <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
//             <View style={styles.amountHeader}>
//               <Ionicons name="resize-outline" size={getResponsiveFontSize(20)} color={colors.secondary} />
//               <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Area</Text>
//             </View>
//             <Text style={[styles.amountValue, { color: colors.secondary }, isTablet && styles.amountValueTablet]}>
//               {formatArea(item.area)}
//             </Text>
//           </View>
//         </View>

//         {/* Details Section */}
//         <View style={styles.details}>
//           <InfoRow
//             icon="location-outline"
//             label="Address"
//             value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
//           />
//           <InfoRow
//             icon="person-outline"
//             label="Owner"
//             value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow
//             icon="business-outline"
//             label="Purchaser"
//             value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
//           />
//           <InfoRow icon="calendar-outline" label="Added On" value={formatDate(item.landAddOnDate)} />
//           <InfoRow
//             icon="briefcase-outline"
//             label="Project"
//             value={item.project?.name || "No Project"}
//             valueColor={item.project ? colors.primary : colors.textSecondary}
//           />
//         </View>
//       </TouchableOpacity>

//       {/* Action Buttons */}
//       <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
//         <ActionButton
//           onPress={() => handleShowLand(item)}
//           icon="eye-outline"
//           text="Details"
//           style={styles.showButton}
//         />
//         <ActionButton
//           onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
//           icon="pencil-outline"
//           text="Edit"
//           style={styles.editButton}
//         />
//         <ActionButton
//           onPress={() => handleDeleteLand(item.id)}
//           icon="trash-outline"
//           text="Delete"
//           style={styles.deleteButton}
//         />
//       </View>
//       <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
//         <ActionButton
//           onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
//           icon="person-add-outline"
//           text="Add Partner"
//           style={styles.addPartnerButton}
//         />
//         <ActionButton
//           onPress={() => handleStartProject(item.id)}
//           disabled={!!item.project}
//           icon="play-outline"
//           text={ "Start Project"}
//           style={item.project ? styles.manageButton : styles.startButton}
//         />
//       </View>
//     </Animated.View>
//   )

//   const renderContent = () => {
//     if (loading && !refreshing) {
//       return (
//         <View style={styles.centeredContainer}>
//           <ActivityIndicator size="large" color={colors.primary} />
//           <Text style={[styles.loadingText, isTablet && styles.loadingTextTablet]}>Loading lands...</Text>
//         </View>
//       )
//     }

//     if (error) {
//       return (
//         <View style={styles.centeredContainer}>
//           <Ionicons name="cloud-offline-outline" size={getResponsiveFontSize(60)} color={colors.error} />
//           <Text style={[styles.errorText, isTablet && styles.errorTextTablet]}>Error: {error}</Text>
//           <TouchableOpacity style={[styles.retryButton, isTablet && styles.retryButtonTablet]} onPress={getAllLands}>
//             <Text style={[styles.retryButtonText, isTablet && styles.retryButtonTextTablet]}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }

//     return (
//       <FlatList
//         data={filteredLands}
//         keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//         renderItem={renderLandCard}
//         contentContainerStyle={[styles.listContent, isTablet && styles.listContentTablet]}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[colors.primary]}
//             tintColor={colors.primary}
//           />
//         }
//         numColumns={isLargeTablet ? 2 : 1}
//         columnWrapperStyle={isLargeTablet ? styles.columnWrapper : null}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="file-tray-stacked-outline" size={getResponsiveFontSize(80)} color={colors.textSecondary} />
//             <Text style={[styles.emptyTitle, isTablet && styles.emptyTitleTablet]}>No lands found</Text>
//             <Text style={[styles.emptySubtitle, isTablet && styles.emptySubtitleTablet]}>
//               Tap the '+' button to add your first land property
//             </Text>
//           </View>
//         }
//       />
//     )
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={[styles.header, isTablet && styles.headerTablet]}>
//         <View>
//           <Text style={[styles.title, isTablet && styles.titleTablet]}>Land Management</Text>
//           <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
//             {filteredLands.length} properties • Total Value:{" "}
//             {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={[styles.addButton, isTablet && styles.addButtonTablet]}
//           onPress={handleAddLand}
//           activeOpacity={0.8}
//           accessibilityLabel="Add Land"
//           accessibilityRole="button"
//         >
//           <Ionicons name="add" size={getResponsiveFontSize(24)} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Input */}
//       <View style={[styles.searchContainer, isTablet && styles.searchContainerTablet]}>
//         <Ionicons
//           name="search-outline"
//           size={getResponsiveFontSize(20)}
//           color={colors.textSecondary}
//           style={styles.searchIcon}
//         />
//         <TextInput
//           style={[styles.searchInput, isTablet && styles.searchInputTablet]}
//           placeholder="Search by address, owner, or project..."
//           placeholderTextColor={colors.textSecondary}
//           value={searchText}
//           onChangeText={setSearchText}
//           accessibilityLabel="Search input"
//           accessibilityRole="search"
//         />
//         {searchText.length > 0 && (
//           <TouchableOpacity
//             onPress={() => setSearchText("")}
//             style={styles.clearButton}
//             accessibilityLabel="Clear search"
//             accessibilityRole="button"
//           >
//             <Ionicons name="close-circle" size={getResponsiveFontSize(20)} color={colors.textSecondary} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {renderContent()}

//       {/* Enhanced Modal */}
//       <Modal
//         visible={showModalVisible}
//         animationType="none"
//         transparent={true}
//         onRequestClose={handleCloseModal}
//         accessibilityLabel="Land Details Modal"
//         statusBarTranslucent={Platform.OS === "android"}
//       >
//         <Animated.View
//           style={[
//             styles.modalOverlay,
//             {
//               opacity: modalAnim,
//             },
//           ]}
//         >
//           <Animated.View
//             style={[
//               styles.modalContent,
//               {
//                 width: modalDimensions.width,
//                 maxHeight: modalDimensions.maxHeight,
//                 borderRadius: modalDimensions.borderRadius,
//                 padding: modalDimensions.padding,
//                 transform: [
//                   {
//                     scale: modalAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [0.8, 1],
//                     }),
//                   },
//                 ],
//               },
//               isTablet && styles.modalContentTablet,
//             ]}
//           >
//             {/* Modal Header */}
//             <View style={[styles.modalHeader, isTablet && styles.modalHeaderTablet]}>
//               <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>Land Details</Text>
//               <TouchableOpacity
//                 style={[styles.closeButton, isTablet && styles.closeButtonTablet]}
//                 onPress={handleCloseModal}
//                 accessibilityLabel="Close Modal"
//                 accessibilityRole="button"
//               >
//                 <Ionicons name="close" size={getResponsiveFontSize(24)} color={colors.textPrimary} />
//               </TouchableOpacity>
//             </View>

//             <ScrollView
//               style={[styles.modalScrollView, isTablet && styles.modalScrollViewTablet]}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.modalScrollContent}
//             >
//               {selectedLand && (
//                 <>
//                   {/* Property Summary */}
//                   <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
//                     <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
//                       Property Summary
//                     </Text>
//                     <Text style={[styles.modalLandName, isTablet && styles.modalLandNameTablet]}>
//                       {selectedLand.address?.landmark || selectedLand.owner?.name || "Unnamed Land"}
//                     </Text>
//                     <Text style={[styles.modalLocation, isTablet && styles.modalLocationTablet]}>
//                       {selectedLand.address?.city || "N/A"}, {selectedLand.address?.state || "N/A"}
//                     </Text>
//                   </View>

//                   {/* Financial Overview */}
//                   <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
//                     <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
//                       Financial Overview
//                     </Text>
//                     <View style={[styles.modalAmountGrid, isTablet && styles.modalAmountGridTablet]}>
//                       <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
//                         <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>
//                           Total Amount
//                         </Text>
//                         <Text
//                           style={[
//                             styles.modalAmountValue,
//                             { color: colors.success },
//                             isTablet && styles.modalAmountValueTablet,
//                           ]}
//                         >
//                           {formatCurrency(selectedLand.totalAmount)}
//                         </Text>
//                       </View>
//                       <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
//                         <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>Area</Text>
//                         <Text
//                           style={[
//                             styles.modalAmountValue,
//                             { color: colors.secondary },
//                             isTablet && styles.modalAmountValueTablet,
//                           ]}
//                         >
//                           {formatArea(selectedLand.area)}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>

//                   {/* Partners Section */}
//                   <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
//                     <View style={[styles.partnersHeader, isTablet && styles.partnersHeaderTablet]}>
//                       <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
//                         Partners & Transactions
//                       </Text>
//                     </View>
//                     {selectedLand?.partners?.length > 0 ? (
//                       selectedLand.partners.map((partner, index) => (
//                         <PartnerCard key={partner.id || index} partner={partner} />
//                       ))
//                     ) : (
//                       <View style={[styles.noPartnersContainer, isTablet && styles.noPartnersContainerTablet]}>
//                         <Ionicons name="people-outline" size={getResponsiveFontSize(48)} color={colors.textSecondary} />
//                         <Text style={[styles.noPartnersText, isTablet && styles.noPartnersTextTablet]}>
//                           No partners added yet
//                         </Text>
//                         <Text style={[styles.noPartnersSubtext, isTablet && styles.noPartnersSubtextTablet]}>
//                           Add partners to start collaboration and track transactions
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </>
//               )}
//             </ScrollView>
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </View>
//   )
// }

// const colors = {
//   primary: "#007AFF",
//   secondary: "#5856D6",
//   success: "#34C759",
//   warning: "#FF9500",
//   error: "#FF3B30",
//   background: "#F7F8FA",
//   surface: "#FFFFFF",
//   textPrimary: "#1A1A1A",
//   textSecondary: "#666666",
//   border: "#E8E8E8",
//   shadow: "#000000",
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   // Header Styles
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: getResponsivePadding(20),
//     paddingTop: getResponsiveHeight(5),
//     paddingBottom: getResponsivePadding(15),
//     backgroundColor: colors.surface,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   headerTablet: {
//     paddingHorizontal: getResponsivePadding(32),
//     paddingTop: getResponsiveHeight(4),
//     paddingBottom: getResponsivePadding(20),
//   },
//   title: {
//     fontSize: getResponsiveFontSize(32),
//     fontWeight: "bold",
//     color: colors.textPrimary,
//     letterSpacing: -0.5,
//   },
//   titleTablet: {
//     fontSize: getResponsiveFontSize(36),
//   },
//   subtitle: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(0.5),
//     fontWeight: "500",
//   },
//   subtitleTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   addButton: {
//     backgroundColor: colors.primary,
//     width: getResponsiveWidth(11),
//     height: getResponsiveWidth(11),
//     borderRadius: getResponsiveWidth(5.5),
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 4,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   addButtonTablet: {
//     width: getResponsiveWidth(9),
//     height: getResponsiveWidth(9),
//     borderRadius: getResponsiveWidth(4.5),
//   },

//   // Search Styles
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.surface,
//     borderRadius: getResponsiveWidth(3),
//     marginHorizontal: getResponsivePadding(20),
//     marginVertical: getResponsiveHeight(2),
//     paddingHorizontal: getResponsivePadding(15),
//     borderWidth: 1,
//     borderColor: colors.border,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   searchContainerTablet: {
//     marginHorizontal: getResponsivePadding(32),
//     paddingHorizontal: getResponsivePadding(20),
//   },
//   searchIcon: {
//     marginRight: getResponsiveWidth(3),
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: getResponsiveFontSize(16),
//     color: colors.textPrimary,
//     paddingVertical: getResponsivePadding(15),
//   },
//   searchInputTablet: {
//     fontSize: getResponsiveFontSize(18),
//     paddingVertical: getResponsivePadding(18),
//   },
//   clearButton: {
//     padding: getResponsivePadding(4),
//   },

//   // List Styles
//   listContent: {
//     paddingHorizontal: getResponsivePadding(16),
//     paddingVertical: getResponsivePadding(20),
//   },
//   listContentTablet: {
//     paddingHorizontal: getResponsivePadding(32),
//   },
//   columnWrapper: {
//     justifyContent: "space-between",
//     paddingHorizontal: getResponsivePadding(8),
//   },

//   // Card Styles
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: getResponsiveWidth(4),
//     marginBottom: getResponsiveHeight(2.5),
//     padding: getResponsivePadding(20),
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   cardTablet: {
//     padding: getResponsivePadding(24),
//     marginBottom: getResponsiveHeight(3),
//   },
//   cardLargeTablet: {
//     width: "48%",
//     marginHorizontal: "1%",
//   },
//   cardHeader: {
//     marginBottom: getResponsiveHeight(2),
//   },
//   landTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: getResponsiveHeight(1),
//   },
//   landName: {
//     fontSize: getResponsiveFontSize(22),
//     fontWeight: "bold",
//     color: colors.textPrimary,
//     flex: 1,
//     marginRight: getResponsiveWidth(2.5),
//     lineHeight: getResponsiveFontSize(26),
//   },
//   landNameTablet: {
//     fontSize: getResponsiveFontSize(26),
//     lineHeight: getResponsiveFontSize(30),
//   },
//   projectName: {
//     fontSize: getResponsiveFontSize(15),
//     color: colors.textSecondary,
//     fontWeight: "500",
//     fontStyle: "italic",
//   },
//   projectNameTablet: {
//     fontSize: getResponsiveFontSize(17),
//   },
//   statusBadge: {
//     paddingHorizontal: getResponsivePadding(12),
//     paddingVertical: getResponsivePadding(6),
//     borderRadius: getResponsiveWidth(4),
//   },
//   statusText: {
//     fontSize: getResponsiveFontSize(12),
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   inProgress: { backgroundColor: "#FFF5E1" },
//   inProgressText: { color: "#FFA800" },
//   completed: { backgroundColor: "#E6F4EA" },
//   completedText: { color: "#2E7D32" },

//   // Financial Summary Styles
//   financialSummary: {
//     flexDirection: "row",
//     gap: getResponsiveWidth(3),
//     marginBottom: getResponsiveHeight(2),
//   },
//   financialSummaryTablet: {
//     gap: getResponsiveWidth(4),
//   },
//   amountCard: {
//     flex: 1,
//     backgroundColor: "#F8F9FA",
//     borderRadius: getResponsiveWidth(3),
//     padding: getResponsivePadding(12),
//     borderLeftWidth: 4,
//   },
//   amountHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: getResponsiveHeight(0.5),
//   },
//   amountTitle: {
//     fontSize: getResponsiveFontSize(13),
//     color: colors.textSecondary,
//     marginLeft: getResponsiveWidth(2),
//     fontWeight: "500",
//   },
//   amountTitleTablet: {
//     fontSize: getResponsiveFontSize(15),
//   },
//   amountValue: {
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "700",
//   },
//   amountValueTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },

//   // Details Styles
//   details: {
//     borderTopWidth: 1,
//     borderTopColor: "#F0F0F0",
//     paddingTop: getResponsivePadding(16),
//     marginBottom: getResponsiveHeight(2),
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: getResponsiveHeight(1.2),
//   },
//   detailRowTablet: {
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   detailIconContainer: {
//     marginRight: getResponsiveWidth(3),
//     width: getResponsiveWidth(5),
//     alignItems: "center",
//   },
//   label: {
//     fontSize: getResponsiveFontSize(15),
//     color: colors.textSecondary,
//     flex: 0.4,
//     fontWeight: "500",
//   },
//   labelTablet: {
//     fontSize: getResponsiveFontSize(17),
//   },
//   value: {
//     fontSize: getResponsiveFontSize(15),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     flex: 0.6,
//     textAlign: "right",
//   },
//   valueTablet: {
//     fontSize: getResponsiveFontSize(17),
//   },

//   // Action Button Styles
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: getResponsiveHeight(1),
//     gap: getResponsiveWidth(2),
//   },
//   actionRowTablet: {
//     gap: getResponsiveWidth(3),
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: getResponsivePadding(10),
//     paddingHorizontal: getResponsivePadding(12),
//     borderRadius: getResponsiveWidth(3),
//     flex: 1,
//     justifyContent: "center",
//     elevation: 2,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   actionButtonTablet: {
//     paddingVertical: getResponsivePadding(12),
//     paddingHorizontal: getResponsivePadding(16),
//   },
//   actionButtonSmall: {
//     paddingVertical: getResponsivePadding(8),
//     paddingHorizontal: getResponsivePadding(10),
//   },
//   showButton: { backgroundColor: colors.primary },
//   editButton: { backgroundColor: colors.warning },
//   deleteButton: { backgroundColor: colors.error },
//   addPartnerButton: { backgroundColor: colors.success },
//   startButton: { backgroundColor: colors.primary },
//   manageButton: { backgroundColor: colors.secondary },
//   disabledButton: { backgroundColor: "#A0A0A0" },
//   actionButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(14),
//     fontWeight: "600",
//     marginLeft: getResponsiveWidth(2),
//   },
//   actionButtonTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },

//   // Loading and Error Styles
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: getResponsivePadding(20),
//   },
//   loadingText: {
//     marginTop: getResponsiveHeight(2),
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "500",
//     color: colors.textSecondary,
//   },
//   loadingTextTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   errorText: {
//     fontSize: getResponsiveFontSize(18),
//     color: colors.error,
//     textAlign: "center",
//     marginTop: getResponsiveHeight(2),
//     fontWeight: "500",
//   },
//   errorTextTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   retryButton: {
//     backgroundColor: colors.primary,
//     paddingVertical: getResponsivePadding(12),
//     paddingHorizontal: getResponsivePadding(30),
//     borderRadius: getResponsiveWidth(6),
//     marginTop: getResponsiveHeight(2.5),
//     elevation: 2,
//   },
//   retryButtonTablet: {
//     paddingVertical: getResponsivePadding(15),
//     paddingHorizontal: getResponsivePadding(40),
//   },
//   retryButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "bold",
//   },
//   retryButtonTextTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },

//   // Empty State Styles
//   emptyContainer: {
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(10),
//     paddingHorizontal: getResponsivePadding(20),
//   },
//   emptyTitle: {
//     fontSize: getResponsiveFontSize(22),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginTop: getResponsiveHeight(2),
//     textAlign: "center",
//   },
//   emptyTitleTablet: {
//     fontSize: getResponsiveFontSize(26),
//   },
//   emptySubtitle: {
//     fontSize: getResponsiveFontSize(16),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(1),
//     textAlign: "center",
//     lineHeight: getResponsiveFontSize(22),
//   },
//   emptySubtitleTablet: {
//     fontSize: getResponsiveFontSize(18),
//     lineHeight: getResponsiveFontSize(24),
//   },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: colors.surface,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.25,
//     shadowRadius: 20,
//     elevation: 25,
//   },
//   modalContentTablet: {
//     maxWidth: 600,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: getResponsivePadding(16),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//     marginBottom: getResponsiveHeight(2),
//   },
//   modalHeaderTablet: {
//     paddingBottom: getResponsivePadding(20),
//     marginBottom: getResponsiveHeight(2.5),
//   },
//   modalTitle: {
//     fontSize: getResponsiveFontSize(20),
//     fontWeight: "bold",
//     color: colors.textPrimary,
//   },
//   modalTitleTablet: {
//     fontSize: getResponsiveFontSize(24),
//   },
//   closeButton: {
//     padding: getResponsivePadding(8),
//     borderRadius: getResponsiveWidth(4),
//     backgroundColor: "#F3F4F6",
//   },
//   closeButtonTablet: {
//     padding: getResponsivePadding(10),
//   },
//   modalScrollView: {
//     maxHeight: SCREEN_HEIGHT * 0.6,
//   },
//   modalScrollViewTablet: {
//     maxHeight: SCREEN_HEIGHT * 0.5,
//   },
//   modalScrollContent: {
//     paddingBottom: getResponsivePadding(16),
//   },

//   // Modal Section Styles
//   modalSection: {
//     marginBottom: getResponsiveHeight(3),
//   },
//   modalSectionTablet: {
//     marginBottom: getResponsiveHeight(4),
//   },
//   modalSectionTitle: {
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   modalSectionTitleTablet: {
//     fontSize: getResponsiveFontSize(22),
//     marginBottom: getResponsiveHeight(2),
//   },
//   modalLandName: {
//     fontSize: getResponsiveFontSize(24),
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(0.5),
//   },
//   modalLandNameTablet: {
//     fontSize: getResponsiveFontSize(28),
//   },
//   modalLocation: {
//     fontSize: getResponsiveFontSize(16),
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   modalLocationTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },

//   // Modal Amount Grid Styles
//   modalAmountGrid: {
//     flexDirection: "row",
//     gap: getResponsiveWidth(3),
//   },
//   modalAmountGridTablet: {
//     gap: getResponsiveWidth(4),
//   },
//   modalAmountItem: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: getResponsiveWidth(3),
//     padding: getResponsivePadding(16),
//     flex: 1,
//     alignItems: "center",
//   },
//   modalAmountItemTablet: {
//     padding: getResponsivePadding(20),
//     borderRadius: getResponsiveWidth(4),
//   },
//   modalAmountLabel: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.5),
//     fontWeight: "500",
//   },
//   modalAmountLabelTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   modalAmountValue: {
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "700",
//   },
//   modalAmountValueTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },

//   // Partner Styles
//   partnersHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: getResponsiveHeight(2),
//   },
//   partnersHeaderTablet: {
//     marginBottom: getResponsiveHeight(2.5),
//   },
//   partnerCard: {
//     backgroundColor: "#F8F9FA",
//     borderRadius: getResponsiveWidth(3),
//     padding: getResponsivePadding(16),
//     marginBottom: getResponsiveHeight(2),
//     borderWidth: 1,
//     borderColor: "#E8E8E8",
//   },
//   partnerCardTablet: {
//     padding: getResponsivePadding(20),
//     borderRadius: getResponsiveWidth(4),
//   },
//   partnerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: getResponsiveHeight(1.5),
//   },
//   partnerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   partnerAvatar: {
//     width: getResponsiveWidth(12),
//     height: getResponsiveWidth(12),
//     borderRadius: getResponsiveWidth(6),
//     backgroundColor: colors.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   partnerAvatarTablet: {
//     width: getResponsiveWidth(10),
//     height: getResponsiveWidth(10),
//     borderRadius: getResponsiveWidth(5),
//   },
//   partnerInitial: {
//     fontSize: getResponsiveFontSize(20),
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   partnerInitialTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },
//   partnerDetails: {
//     marginLeft: getResponsiveWidth(3),
//     flex: 1,
//   },
//   partnerName: {
//     fontSize: getResponsiveFontSize(18),
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginBottom: getResponsiveHeight(0.3),
//   },
//   partnerNameTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   partnerLocation: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.2),
//   },
//   partnerLocationTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   partnerPhone: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//   },
//   partnerPhoneTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   partnerStats: {
//     alignItems: "flex-end",
//   },
//   partnerStatsNumber: {
//     fontSize: getResponsiveFontSize(20),
//     fontWeight: "700",
//     color: colors.primary,
//   },
//   partnerStatsNumberTablet: {
//     fontSize: getResponsiveFontSize(22),
//   },
//   partnerStatsLabel: {
//     fontSize: getResponsiveFontSize(12),
//     color: colors.textSecondary,
//     marginBottom: getResponsiveHeight(0.5),
//   },
//   partnerStatsLabelTablet: {
//     fontSize: getResponsiveFontSize(14),
//   },
//   partnerStatsAmount: {
//     fontSize: getResponsiveFontSize(16),
//     fontWeight: "600",
//   },
//   partnerStatsAmountTablet: {
//     fontSize: getResponsiveFontSize(18),
//   },
//   partnerActions: {
//     flexDirection: "row",
//     gap: getResponsiveWidth(2),
//   },
//   partnerActionsTablet: {
//     gap: getResponsiveWidth(3),
//   },
//   partnerButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: getResponsivePadding(8),
//     paddingHorizontal: getResponsivePadding(16),
//     borderRadius: getResponsiveWidth(2),
//     flex: 1,
//     justifyContent: "center",
//   },
//   partnerButtonTablet: {
//     paddingVertical: getResponsivePadding(10),
//     paddingHorizontal: getResponsivePadding(20),
//   },
//   viewButton: {
//     backgroundColor: colors.primary,
//   },
//   payButton: {
//     backgroundColor: colors.success,
//   },
//   partnerButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(14),
//     fontWeight: "600",
//     marginLeft: getResponsiveWidth(1),
//   },
//   partnerButtonTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
//   noPartnersContainer: {
//     alignItems: "center",
//     paddingVertical: getResponsiveHeight(4),
//   },
//   noPartnersContainerTablet: {
//     paddingVertical: getResponsiveHeight(5),
//   },
//   noPartnersText: {
//     fontSize: getResponsiveFontSize(17),
//     fontWeight: "500",
//     color: colors.textPrimary,
//     marginTop: getResponsiveHeight(1.5),
//     textAlign: "center",
//   },
//   noPartnersTextTablet: {
//     fontSize: getResponsiveFontSize(20),
//   },
//   noPartnersSubtext: {
//     fontSize: getResponsiveFontSize(14),
//     color: colors.textSecondary,
//     marginTop: getResponsiveHeight(0.5),
//     textAlign: "center",
//     lineHeight: getResponsiveFontSize(18),
//   },
//   noPartnersSubtextTablet: {
//     fontSize: getResponsiveFontSize(16),
//     lineHeight: getResponsiveFontSize(20),
//   },
//   addPartnerModalButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.success,
//     paddingVertical: getResponsivePadding(8),
//     paddingHorizontal: getResponsivePadding(16),
//     borderRadius: getResponsiveWidth(3),
//   },
//   addPartnerModalButtonTablet: {
//     paddingVertical: getResponsivePadding(10),
//     paddingHorizontal: getResponsivePadding(20),
//   },
//   addPartnerModalButtonText: {
//     color: "#FFFFFF",
//     fontSize: getResponsiveFontSize(14),
//     fontWeight: "600",
//     marginLeft: getResponsiveWidth(1),
//   },
//   addPartnerModalButtonTextTablet: {
//     fontSize: getResponsiveFontSize(16),
//   },
// })

// export default Land_Management


















"use client"

import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Enhanced responsive helper functions
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

// Device type detection
const isSmallPhone = SCREEN_WIDTH < 350
const isPhone = SCREEN_WIDTH < 768
const isTablet = SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024
const isLargeTablet = SCREEN_WIDTH >= 1024
const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT
const isShortScreen = SCREEN_HEIGHT < 700

// Dynamic modal sizing
const getModalDimensions = () => {
  if (isLargeTablet) {
    return {
      width: isLandscape ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH * 0.65,
      maxHeight: SCREEN_HEIGHT * 0.8,
      borderRadius: getResponsiveWidth(3),
      padding: getResponsivePadding(24),
    }
  } else if (isTablet) {
    return {
      width: isLandscape ? SCREEN_WIDTH * 0.6 : SCREEN_WIDTH * 0.75,
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

const Land_Management = ({ navigation }) => {
  const [lands, setLands] = useState([])
  const [filteredLands, setFilteredLands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [showModalVisible, setShowModalVisible] = useState(false)
  const [selectedLand, setSelectedLand] = useState(null)
  const [fadeAnim] = useState(new Animated.Value(0))
  const [modalAnim] = useState(new Animated.Value(0))

  const modalDimensions = getModalDimensions()

  const getAllLands = async () => {
    setLoading(true)
    setError(null)
    try {
      const jwtToken = await AsyncStorage.getItem("jwtToken")
      if (!jwtToken) {
        throw new Error("No JWT token found")
      }
      const response = await axios.get(`${BASE_URL}/getAllland`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      setLands(response.data)
      setFilteredLands(response.data)
      console.log(JSON.stringify(response.data, null, 2))
    } catch (err) {
      setError(err.message || "Failed to fetch lands")
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await getAllLands()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    getAllLands()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    const filtered = lands.filter(
      (land) =>
        land.address?.landmark?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.address?.city?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.owner?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.purchaser?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        land.project?.name?.toLowerCase().includes(searchText.toLowerCase()),
    )
    setFilteredLands(filtered)
  }, [searchText, lands])

  const handleLandPress = (land) => {
    console.log("Card tapped:", land.id)
  }

  const handleShowLand = (land) => {
    setSelectedLand(land)
    setShowModalVisible(true)
    Animated.spring(modalAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start()
  }

  const handleCloseModal = () => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowModalVisible(false)
      setSelectedLand(null)
    })
  }

  const handleAddLand = () => {
    navigation.navigate("Add_Edit_Land")
  }

  const handleDeleteLand = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this land?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const jwtToken = await AsyncStorage.getItem("jwtToken")
            await axios.delete(`${BASE_URL}/delete/${id}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            getAllLands()
            Alert.alert("Success", "Land deleted successfully")
          } catch (err) {
            Alert.alert("Error", err.message || "Failed to delete land")
          }
        },
      },
    ])
  }

  const handleStartProject = (landId) => {
    navigation.navigate("Flat_Management", { id: landId })
  }

  const handleExpenses = (landId, landName) => {
    navigation.navigate("Expenses", { id: landId, name: landName })
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A"
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const formatCurrency = (amount) => {
    if (!amount) return "₹0"
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const formatArea = (area) => {
    if (!area) return "N/A"
    return `${area.toLocaleString()} sq ft`
  }

  // Enhanced InfoRow component with responsive design
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

  // Enhanced ActionButton component
  const ActionButton = ({ onPress, icon, text, style, disabled = false }) => (
    <TouchableOpacity
      style={[
        styles.actionButton,
        style,
        disabled && styles.disabledButton,
        isTablet && styles.actionButtonTablet,
        isSmallPhone && styles.actionButtonSmall,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityLabel={text}
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={getResponsiveFontSize(16)} color="#FFFFFF" />
      <Text style={[styles.actionButtonText, isTablet && styles.actionButtonTextTablet]}>{text}</Text>
    </TouchableOpacity>
  )

  // Enhanced Partner Card component
  const PartnerCard = ({ partner }) => {
    const totalTransactions = partner.landTransactions?.length || 0
    const totalAmount =
      partner.landTransactions?.reduce((sum, transaction) => {
        return transaction.change === "CREDIT"
          ? sum + transaction.transactionAmount
          : sum - transaction.transactionAmount
      }, 0) || 0

    return (
      <View style={[styles.partnerCard, isTablet && styles.partnerCardTablet]}>
        <View style={styles.partnerHeader}>
          <View style={styles.partnerInfo}>
            <View style={[styles.partnerAvatar, isTablet && styles.partnerAvatarTablet]}>
              <Text style={[styles.partnerInitial, isTablet && styles.partnerInitialTablet]}>
                {partner.name?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.partnerDetails}>
              <Text style={[styles.partnerName, isTablet && styles.partnerNameTablet]}>{partner.name}</Text>
              <Text style={[styles.partnerLocation, isTablet && styles.partnerLocationTablet]}>
                <Ionicons name="location-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
                {partner.city || "N/A"}
              </Text>
              <Text style={[styles.partnerPhone, isTablet && styles.partnerPhoneTablet]}>
                <Ionicons name="call-outline" size={getResponsiveFontSize(14)} color={colors.textSecondary} />{" "}
                {partner.phoneNumber || "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.partnerStats}>
            <Text style={[styles.partnerStatsNumber, isTablet && styles.partnerStatsNumberTablet]}>
              {totalTransactions}
            </Text>
            <Text style={[styles.partnerStatsLabel, isTablet && styles.partnerStatsLabelTablet]}>Transactions</Text>
            <Text
              style={[
                styles.partnerStatsAmount,
                { color: totalAmount >= 0 ? colors.success : colors.error },
                isTablet && styles.partnerStatsAmountTablet,
              ]}
            >
              {formatCurrency(Math.abs(totalAmount))}
            </Text>
          </View>
        </View>
        <View style={[styles.partnerActions, isTablet && styles.partnerActionsTablet]}>
          <TouchableOpacity
            style={[styles.partnerButton, styles.viewButton, isTablet && styles.partnerButtonTablet]}
            onPress={() => {
              handleCloseModal()
              navigation.navigate("View_Partner_Transactions", { partnerId: partner.id })
            }}
            accessibilityLabel="View Transactions"
            accessibilityRole="button"
          >
            <Ionicons name="eye-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
            <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.partnerButton, styles.payButton, isTablet && styles.partnerButtonTablet]}
            onPress={() => {
              handleCloseModal()
              navigation.navigate("Pay_Partner", { partnerId: partner.id })
            }}
            accessibilityLabel="Pay Partner"
            accessibilityRole="button"
          >
            <Ionicons name="card-outline" size={getResponsiveFontSize(16)} color="#FFFFFF" />
            <Text style={[styles.partnerButtonText, isTablet && styles.partnerButtonTextTablet]}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderLandCard = ({ item, index }) => (
    <Animated.View
      style={[
        styles.card,
        isTablet && styles.cardTablet,
        isLargeTablet && styles.cardLargeTablet,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.95} onPress={() => handleLandPress(item)}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.landTitleContainer}>
            <Text style={[styles.landName, isTablet && styles.landNameTablet]} numberOfLines={2}>
              {item.address?.landmark || item.owner?.name || "Unnamed Land"}
            </Text>
            {item.project && (
              <View
                style={[
                  styles.statusBadge,
                  item.project.status === "IN_PROGRESS" ? styles.inProgress : styles.completed,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.project.status === "IN_PROGRESS" ? styles.inProgressText : styles.completedText,
                  ]}
                >
                  {item.project.status?.replace("_", " ") || "UNKNOWN"}
                </Text>
              </View>
            )}
          </View>
          {item.project && (
            <Text style={[styles.projectName, isTablet && styles.projectNameTablet]}>Project: {item.project.name}</Text>
          )}
        </View>

        {/* Financial Summary */}
        <View style={[styles.financialSummary, isTablet && styles.financialSummaryTablet]}>
          <View style={[styles.amountCard, { borderLeftColor: colors.success }]}>
            <View style={styles.amountHeader}>
              <Ionicons name="cash-outline" size={getResponsiveFontSize(20)} color={colors.success} />
              <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Total Amount</Text>
            </View>
            <Text style={[styles.amountValue, { color: colors.success }, isTablet && styles.amountValueTablet]}>
              {formatCurrency(item.totalAmount)}
            </Text>
          </View>
          <View style={[styles.amountCard, { borderLeftColor: colors.secondary }]}>
            <View style={styles.amountHeader}>
              <Ionicons name="resize-outline" size={getResponsiveFontSize(20)} color={colors.secondary} />
              <Text style={[styles.amountTitle, isTablet && styles.amountTitleTablet]}>Area</Text>
            </View>
            <Text style={[styles.amountValue, { color: colors.secondary }, isTablet && styles.amountValueTablet]}>
              {formatArea(item.area)}
            </Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.details}>
          <InfoRow
            icon="location-outline"
            label="Address"
            value={`${item.address?.landmark || ""}, ${item.address?.city || ""}`}
          />
          <InfoRow
            icon="person-outline"
            label="Owner"
            value={`${item.owner?.name || "N/A"} (${item.owner?.phoneNumber || "N/A"})`}
          />
          <InfoRow
            icon="business-outline"
            label="Purchaser"
            value={`${item.purchaser?.name || "N/A"} (${item.purchaser?.phoneNumber || "N/A"})`}
          />
          <InfoRow icon="calendar-outline" label="Added On" value={formatDate(item.landAddOnDate)} />
          <InfoRow
            icon="briefcase-outline"
            label="Project"
            value={item.project?.name || "No Project"}
            valueColor={item.project ? colors.primary : colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
        <ActionButton
          onPress={() => handleShowLand(item)}
          icon="eye-outline"
          text="Details"
          style={styles.showButton}
        />
        <ActionButton
          onPress={() => navigation.navigate("Add_Edit_Land", { id: item.id })}
          icon="pencil-outline"
          text="Edit"
          style={styles.editButton}
        />
        <ActionButton
          onPress={() => handleDeleteLand(item.id)}
          icon="trash-outline"
          text="Delete"
          style={styles.deleteButton}
        />
      </View>
      <View style={[styles.actionRow, isTablet && styles.actionRowTablet]}>
        <ActionButton
          onPress={() => handleExpenses(item.id, item.address?.landmark || item.owner?.name || "Unnamed Land")}
          icon="wallet-outline"
          text="Expenses"
          style={styles.expensesButton}
        />
        <ActionButton
          onPress={() => navigation.navigate("Add_Edit_Partners", { landId: item.id })}
          icon="person-add-outline"
          text="Partner"
          style={styles.addPartnerButton}
        />
        <ActionButton
          onPress={() => handleStartProject(item.id)}
          disabled={!!item.project}
          icon="play-outline"
          text={ "Project"}
          style={item.project ? styles.manageButton : styles.startButton}
        />
      </View>
    </Animated.View>
  )

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, isTablet && styles.loadingTextTablet]}>Loading lands...</Text>
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.centeredContainer}>
          <Ionicons name="cloud-offline-outline" size={getResponsiveFontSize(60)} color={colors.error} />
          <Text style={[styles.errorText, isTablet && styles.errorTextTablet]}>Error: {error}</Text>
          <TouchableOpacity style={[styles.retryButton, isTablet && styles.retryButtonTablet]} onPress={getAllLands}>
            <Text style={[styles.retryButtonText, isTablet && styles.retryButtonTextTablet]}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <FlatList
        data={filteredLands}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderLandCard}
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
            <Text style={[styles.emptyTitle, isTablet && styles.emptyTitleTablet]}>No lands found</Text>
            <Text style={[styles.emptySubtitle, isTablet && styles.emptySubtitleTablet]}>
              Tap the '+' button to add your first land property
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
          <Text style={[styles.title, isTablet && styles.titleTablet]}>Land Management</Text>
          <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
            {filteredLands.length} properties • Total Value:{" "}
            {formatCurrency(filteredLands.reduce((sum, land) => sum + (land.totalAmount || 0), 0))}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, isTablet && styles.addButtonTablet]}
          onPress={handleAddLand}
          activeOpacity={0.8}
          accessibilityLabel="Add Land"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={getResponsiveFontSize(24)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={[styles.searchContainer, isTablet && styles.searchContainerTablet]}>
        <Ionicons
          name="search-outline"
          size={getResponsiveFontSize(20)}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, isTablet && styles.searchInputTablet]}
          placeholder="Search by address, owner, or project..."
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
          accessibilityLabel="Search input"
          accessibilityRole="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Ionicons name="close-circle" size={getResponsiveFontSize(20)} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {renderContent()}

      {/* Enhanced Modal */}
      <Modal
        visible={showModalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={handleCloseModal}
        accessibilityLabel="Land Details Modal"
        statusBarTranslucent={Platform.OS === "android"}
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: modalAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                width: modalDimensions.width,
                maxHeight: modalDimensions.maxHeight,
                borderRadius: modalDimensions.borderRadius,
                padding: modalDimensions.padding,
                transform: [
                  {
                    scale: modalAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
              isTablet && styles.modalContentTablet,
            ]}
          >
            {/* Modal Header */}
            <View style={[styles.modalHeader, isTablet && styles.modalHeaderTablet]}>
              <Text style={[styles.modalTitle, isTablet && styles.modalTitleTablet]}>Land Details</Text>
              <TouchableOpacity
                style={[styles.closeButton, isTablet && styles.closeButtonTablet]}
                onPress={handleCloseModal}
                accessibilityLabel="Close Modal"
                accessibilityRole="button"
              >
                <Ionicons name="close" size={getResponsiveFontSize(24)} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={[styles.modalScrollView, isTablet && styles.modalScrollViewTablet]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              {selectedLand && (
                <>
                  {/* Property Summary */}
                  <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
                    <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
                      Property Summary
                    </Text>
                    <Text style={[styles.modalLandName, isTablet && styles.modalLandNameTablet]}>
                      {selectedLand.address?.landmark || selectedLand.owner?.name || "Unnamed Land"}
                    </Text>
                    <Text style={[styles.modalLocation, isTablet && styles.modalLocationTablet]}>
                      {selectedLand.address?.city || "N/A"}, {selectedLand.address?.state || "N/A"}
                    </Text>
                  </View>

                  {/* Financial Overview */}
                  <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
                    <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
                      Financial Overview
                    </Text>
                    <View style={[styles.modalAmountGrid, isTablet && styles.modalAmountGridTablet]}>
                      <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
                        <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>
                          Total Amount
                        </Text>
                        <Text
                          style={[
                            styles.modalAmountValue,
                            { color: colors.success },
                            isTablet && styles.modalAmountValueTablet,
                          ]}
                        >
                          {formatCurrency(selectedLand.totalAmount)}
                        </Text>
                      </View>
                      <View style={[styles.modalAmountItem, isTablet && styles.modalAmountItemTablet]}>
                        <Text style={[styles.modalAmountLabel, isTablet && styles.modalAmountLabelTablet]}>Area</Text>
                        <Text
                          style={[
                            styles.modalAmountValue,
                            { color: colors.secondary },
                            isTablet && styles.modalAmountValueTablet,
                          ]}
                        >
                          {formatArea(selectedLand.area)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Partners Section */}
                  <View style={[styles.modalSection, isTablet && styles.modalSectionTablet]}>
                    <View style={[styles.partnersHeader, isTablet && styles.partnersHeaderTablet]}>
                      <Text style={[styles.modalSectionTitle, isTablet && styles.modalSectionTitleTablet]}>
                        Partners & Transactions
                      </Text>
                    </View>
                    {selectedLand?.partners?.length > 0 ? (
                      selectedLand.partners.map((partner, index) => (
                        <PartnerCard key={partner.id || index} partner={partner} />
                      ))
                    ) : (
                      <View style={[styles.noPartnersContainer, isTablet && styles.noPartnersContainerTablet]}>
                        <Ionicons name="people-outline" size={getResponsiveFontSize(48)} color={colors.textSecondary} />
                        <Text style={[styles.noPartnersText, isTablet && styles.noPartnersTextTablet]}>
                          No partners added yet
                        </Text>
                        <Text style={[styles.noPartnersSubtext, isTablet && styles.noPartnersSubtextTablet]}>
                          Add partners to start collaboration and track transactions
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </ScrollView>
          </Animated.View>
        </Animated.View>
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

  // Header Styles
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
    fontSize: getResponsiveFontSize(32),
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

  // Search Styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: getResponsiveWidth(3),
    marginHorizontal: getResponsivePadding(20),
    marginVertical: getResponsiveHeight(2),
    paddingHorizontal: getResponsivePadding(15),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainerTablet: {
    marginHorizontal: getResponsivePadding(32),
    paddingHorizontal: getResponsivePadding(20),
  },
  searchIcon: {
    marginRight: getResponsiveWidth(3),
  },
  searchInput: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: colors.textPrimary,
    paddingVertical: getResponsivePadding(15),
  },
  searchInputTablet: {
    fontSize: getResponsiveFontSize(18),
    paddingVertical: getResponsivePadding(18),
  },
  clearButton: {
    padding: getResponsivePadding(4),
  },

  // List Styles
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

  // Card Styles
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
  landTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: getResponsiveHeight(1),
  },
  landName: {
    fontSize: getResponsiveFontSize(22),
    fontWeight: "bold",
    color: colors.textPrimary,
    flex: 1,
    marginRight: getResponsiveWidth(2.5),
    lineHeight: getResponsiveFontSize(26),
  },
  landNameTablet: {
    fontSize: getResponsiveFontSize(26),
    lineHeight: getResponsiveFontSize(30),
  },
  projectName: {
    fontSize: getResponsiveFontSize(15),
    color: colors.textSecondary,
    fontWeight: "500",
    fontStyle: "italic",
  },
  projectNameTablet: {
    fontSize: getResponsiveFontSize(17),
  },
  statusBadge: {
    paddingHorizontal: getResponsivePadding(12),
    paddingVertical: getResponsivePadding(6),
    borderRadius: getResponsiveWidth(4),
  },
  statusText: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: "600",
    textTransform: "uppercase",
  },
  inProgress: { backgroundColor: "#FFF5E1" },
  inProgressText: { color: "#FFA800" },
  completed: { backgroundColor: "#E6F4EA" },
  completedText: { color: "#2E7D32" },

  // Financial Summary Styles
  financialSummary: {
    flexDirection: "row",
    gap: getResponsiveWidth(3),
    marginBottom: getResponsiveHeight(2),
  },
  financialSummaryTablet: {
    gap: getResponsiveWidth(4),
  },
  amountCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(12),
    borderLeftWidth: 4,
  },
  amountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: getResponsiveHeight(0.5),
  },
  amountTitle: {
    fontSize: getResponsiveFontSize(13),
    color: colors.textSecondary,
    marginLeft: getResponsiveWidth(2),
    fontWeight: "500",
  },
  amountTitleTablet: {
    fontSize: getResponsiveFontSize(15),
  },
  amountValue: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "700",
  },
  amountValueTablet: {
    fontSize: getResponsiveFontSize(18),
  },

  // Details Styles
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

  // Action Button Styles
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getResponsiveHeight(1),
    gap: getResponsiveWidth(2),
  },
  actionRowTablet: {
    gap: getResponsiveWidth(3),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(12),
    borderRadius: getResponsiveWidth(3),
    flex: 1,
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonTablet: {
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(16),
  },
  actionButtonSmall: {
    paddingVertical: getResponsivePadding(8),
    paddingHorizontal: getResponsivePadding(10),
  },
  showButton: { backgroundColor: colors.primary },
  editButton: { backgroundColor: colors.warning },
  deleteButton: { backgroundColor: colors.error },
  expensesButton: { backgroundColor: "#FF9500" }, // Orange color for Expenses button
  addPartnerButton: { backgroundColor: colors.success },
  startButton: { backgroundColor: colors.primary },
  manageButton: { backgroundColor: colors.secondary },
  disabledButton: { backgroundColor: "#A0A0A0" },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    marginLeft: getResponsiveWidth(2),
  },
  actionButtonTextTablet: {
    fontSize: getResponsiveFontSize(16),
  },

  // Loading and Error Styles
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

  // Empty State Styles
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

  // Modal Styles
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
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalScrollViewTablet: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  modalScrollContent: {
    paddingBottom: getResponsivePadding(16),
  },

  // Modal Section Styles
  modalSection: {
    marginBottom: getResponsiveHeight(3),
  },
  modalSectionTablet: {
    marginBottom: getResponsiveHeight(4),
  },
  modalSectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: getResponsiveHeight(1.5),
  },
  modalSectionTitleTablet: {
    fontSize: getResponsiveFontSize(22),
    marginBottom: getResponsiveHeight(2),
  },
  modalLandName: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: getResponsiveHeight(0.5),
  },
  modalLandNameTablet: {
    fontSize: getResponsiveFontSize(28),
  },
  modalLocation: {
    fontSize: getResponsiveFontSize(16),
    color: colors.textSecondary,
    fontWeight: "500",
  },
  modalLocationTablet: {
    fontSize: getResponsiveFontSize(18),
  },

  // Modal Amount Grid Styles
  modalAmountGrid: {
    flexDirection: "row",
    gap: getResponsiveWidth(3),
  },
  modalAmountGridTablet: {
    gap: getResponsiveWidth(4),
  },
  modalAmountItem: {
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(16),
    flex: 1,
    alignItems: "center",
  },
  modalAmountItemTablet: {
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveWidth(4),
  },
  modalAmountLabel: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginBottom: getResponsiveHeight(0.5),
    fontWeight: "500",
  },
  modalAmountLabelTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  modalAmountValue: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
  },
  modalAmountValueTablet: {
    fontSize: getResponsiveFontSize(20),
  },

  // Partner Styles
  partnersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: getResponsiveHeight(2),
  },
  partnersHeaderTablet: {
    marginBottom: getResponsiveHeight(2.5),
  },
  partnerCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: getResponsiveWidth(3),
    padding: getResponsivePadding(16),
    marginBottom: getResponsiveHeight(2),
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  partnerCardTablet: {
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveWidth(4),
  },
  partnerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: getResponsiveHeight(1.5),
  },
  partnerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  partnerAvatar: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    borderRadius: getResponsiveWidth(6),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  partnerAvatarTablet: {
    width: getResponsiveWidth(10),
    height: getResponsiveWidth(10),
    borderRadius: getResponsiveWidth(5),
  },
  partnerInitial: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  partnerInitialTablet: {
    fontSize: getResponsiveFontSize(18),
  },
  partnerDetails: {
    marginLeft: getResponsiveWidth(3),
    flex: 1,
  },
  partnerName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: getResponsiveHeight(0.3),
  },
  partnerNameTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  partnerLocation: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginBottom: getResponsiveHeight(0.2),
  },
  partnerLocationTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  partnerPhone: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
  },
  partnerPhoneTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  partnerStats: {
    alignItems: "flex-end",
  },
  partnerStatsNumber: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: "700",
    color: colors.primary,
  },
  partnerStatsNumberTablet: {
    fontSize: getResponsiveFontSize(22),
  },
  partnerStatsLabel: {
    fontSize: getResponsiveFontSize(12),
    color: colors.textSecondary,
    marginBottom: getResponsiveHeight(0.5),
  },
  partnerStatsLabelTablet: {
    fontSize: getResponsiveFontSize(14),
  },
  partnerStatsAmount: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: "600",
  },
  partnerStatsAmountTablet: {
    fontSize: getResponsiveFontSize(18),
  },
  partnerActions: {
    flexDirection: "row",
    gap: getResponsiveWidth(2),
  },
  partnerActionsTablet: {
    gap: getResponsiveWidth(3),
  },
  partnerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getResponsivePadding(8),
    paddingHorizontal: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(2),
    flex: 1,
    justifyContent: "center",
  },
  partnerButtonTablet: {
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  viewButton: {
    backgroundColor: colors.primary,
  },
  payButton: {
    backgroundColor: colors.success,
  },
  partnerButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    marginLeft: getResponsiveWidth(1),
  },
  partnerButtonTextTablet: {
    fontSize: getResponsiveFontSize(16),
  },
  noPartnersContainer: {
    alignItems: "center",
    paddingVertical: getResponsiveHeight(4),
  },
  noPartnersContainerTablet: {
    paddingVertical: getResponsiveHeight(5),
  },
  noPartnersText: {
    fontSize: getResponsiveFontSize(17),
    fontWeight: "500",
    color: colors.textPrimary,
    marginTop: getResponsiveHeight(1.5),
    textAlign: "center",
  },
  noPartnersTextTablet: {
    fontSize: getResponsiveFontSize(20),
  },
  noPartnersSubtext: {
    fontSize: getResponsiveFontSize(14),
    color: colors.textSecondary,
    marginTop: getResponsiveHeight(0.5),
    textAlign: "center",
    lineHeight: getResponsiveFontSize(18),
  },
  noPartnersSubtextTablet: {
    fontSize: getResponsiveFontSize(16),
    lineHeight: getResponsiveFontSize(20),
  },
  addPartnerModalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.success,
    paddingVertical: getResponsivePadding(8),
    paddingHorizontal: getResponsivePadding(16),
    borderRadius: getResponsiveWidth(3),
  },
  addPartnerModalButtonTablet: {
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  addPartnerModalButtonText: {
    color: "#FFFFFF",
    fontSize: getResponsiveFontSize(14),
    fontWeight: "600",
    marginLeft: getResponsiveWidth(1),
  },
  addPartnerModalButtonTextTablet: {
    fontSize: getResponsiveFontSize(16),
  },
})

export default Land_Management