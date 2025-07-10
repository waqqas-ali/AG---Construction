// import { Feather, Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import React from 'react';
// import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const Letter = ({ navigation }) => {
//   const menuItems = [
//     {
//       name: 'Riveling Letter',
//       icon: 'mail',
//       gradient: ['#4ECDC4', '#45B7AF'],
//       description: 'Create riveling documentation'
//     },
//     {
//       name: 'Salary Slip',
//       icon: 'cash',
//       gradient: ['#6C5CE7', '#8480E9'],
//       description: 'Process salary statements'
//     },
//     {
//       name: 'Allotment Letter',
//       icon: 'document',
//       gradient: ['#FFA62E', '#FFB961'],
//       description: 'Handle property allotments'
//     },
//     {
//       name: 'Demand Letter',
//       icon: 'alert-circle',
//       gradient: ['#FF7675', '#FF9291'],
//       description: 'Create demand notices'
//     },
//     {
//       name: 'Letter Heades',
//       icon: 'text',
//       gradient: ['#55A0FF', '#78B5FF'],
//       description: 'Customize letter headers'
//     },
//     {
//       name: 'Noc Letter',
//       icon: 'checkmark-circle',
//       gradient: ['#26DE81', '#45E994'],
//       description: 'Generate NOC documents'
//     },
//     {
//       name: 'Possession Letter',
//       icon: 'home',
//       gradient: ['#A55EEA', '#B779EC'],
//       description: 'Issue possession letters'
//     },
//   ];

//   return (
//     <SafeAreaView style={Style_Letters.container}>
//       <ImageBackground
//         style={Style_Letters.backgroundImage}
//       >
//         <View style={Style_Letters.headerContainer}>
//           <View style={Style_Letters.headerTitleContainer} >
//             <Feather name="chevron-left" size={30} color="black" onPress={()=> navigation.goBack()}/>
//             <Text style={Style_Letters.headerTitle}>Letter Management</Text>
//           </View>
//           <Text style={Style_Letters.headerSubtitle}>Select document type to proceed</Text>
//         </View>

//         <ScrollView
//           contentContainerStyle={Style_Letters.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={Style_Letters.grid}>
//             {menuItems.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 activeOpacity={0.7}
//                 onPress={() => navigation.navigate(item.name)}
//                 style={Style_Letters.cardContainer}
//               >
//                 <LinearGradient
//                   colors={item.gradient}
//                   style={Style_Letters.card}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                 >
//                   <View style={Style_Letters.iconContainer}>
//                     <Ionicons name={item.icon} size={32} color="white" />
//                   </View>
//                   <View style={Style_Letters.cardContent}>
//                     <Text style={Style_Letters.cardTitle}>{item.name}</Text>
//                     <Text style={Style_Letters.cardDescription}>{item.description}</Text>
//                   </View>
//                   <Ionicons
//                     name="chevron-forward"
//                     size={24}
//                     color="white"
//                     style={Style_Letters.arrowIcon}
//                   />
//                 </LinearGradient>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     </SafeAreaView >
//   );
// };


// const Style_Letters = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop : 30,
//       backgroundColor: '#F8F9FA',
//     },
//     backgroundImage: {
//       flex: 1,
//       width: '100%',
//     },
//     headerContainer: {
//     //   padding: 20,
//     //   paddingTop: 10,
//       backgroundColor: 'rgba(255,255,255,0.9)',
//     },
//     headerTitleContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 10,
//     },
//     headerTitle: {
//       fontSize: 32,
//       paddingLeft : 20,
//       fontWeight: 'bold',
//       color: '#2D3436',
//       marginBottom: 8,
//     },
//     headerSubtitle: {
//       fontSize: 16,
//       paddingLeft : 60,
//       color: '#636E72',
//       marginBottom: 10,
//     },
//     scrollContent: {
//       flexGrow: 1,
//       padding: 16,
//     },
//     grid: {
//       flexDirection: 'column',
//     },
//     cardContainer: {
//       marginBottom: 16,
//       borderRadius: 16,
//       elevation: 4,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 4,
//       },
//       shadowOpacity: 0.2,
//       shadowRadius: 8,
//     },
//     card: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 20,
//       borderRadius: 16,
//       height: 100,
//     },
//     iconContainer: {
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: 16,
//     },
//     cardContent: {
//       flex: 1,
//     },
//     cardTitle: {
//       fontSize: 18,
//       fontWeight: '600',
//       color: 'white',
//       marginBottom: 4,
//     },
//     cardDescription: {
//       fontSize: 14,
//       color: 'rgba(255,255,255,0.8)',
//     },
//     arrowIcon: {
//       marginLeft: 8,
//     },
//   });
// export default Letter;






"use client"

import { Feather, Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// Enhanced responsive helper functions
const getResponsiveWidth = (percentage) => (screenWidth * percentage) / 100
const getResponsiveHeight = (percentage) => (screenHeight * percentage) / 100
const getResponsiveFontSize = (size) => {
  const scale = screenWidth / 375 // Base width (iPhone X)
  const newSize = size * scale
  return Math.max(Math.min(newSize, size * 1.3), size * 0.8) // Limit scaling between 0.8x and 1.3x
}
const getResponsivePadding = (size) => {
  const scale = screenWidth / 375
  return Math.max(Math.min(size * scale, size * 1.2), size * 0.7)
}

// Device type detection
const isSmallPhone = screenWidth < 350
const isPhone = screenWidth < 768
const isTablet = screenWidth >= 768 && screenWidth < 1024
const isLargeTablet = screenWidth >= 1024
const isLandscape = screenWidth > screenHeight

// Responsive dimensions
const HORIZONTAL_PADDING = getResponsiveWidth(isPhone ? 4 : isTablet ? 6 : 8)
const CARD_HEIGHT = getResponsiveHeight(isPhone ? 12 : isTablet ? 10 : 9)
const ICON_SIZE = getResponsiveWidth(isPhone ? 16 : isTablet ? 14 : 12)
const GRID_COLUMNS = isLargeTablet ? 2 : 1

const Letter = ({ navigation }) => {
  const menuItems = [
    {
      name: "Riveling Letter",
      icon: "mail",
      gradient: ["#4ECDC4", "#45B7AF"],
      description: "Create riveling documentation",
    },
    {
      name: "Salary Slip",
      icon: "cash",
      gradient: ["#6C5CE7", "#8480E9"],
      description: "Process salary statements",
    },
    {
      name: "Allotment Letter",
      icon: "document",
      gradient: ["#FFA62E", "#FFB961"],
      description: "Handle property allotments",
    },
    {
      name: "Demand Letter",
      icon: "alert-circle",
      gradient: ["#FF7675", "#FF9291"],
      description: "Create demand notices",
    },
    {
      name: "Letter Headers",
      icon: "text",
      gradient: ["#55A0FF", "#78B5FF"],
      description: "Customize letter headers",
    },
    {
      name: "Noc Letter",
      icon: "checkmark-circle",
      gradient: ["#26DE81", "#45E994"],
      description: "Generate NOC documents",
    },
    {
      name: "Possession Letter",
      icon: "home",
      gradient: ["#A55EEA", "#B779EC"],
      description: "Issue possession letters",
    },
  ]

  const renderCard = (item, index) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.7}
      onPress={() => navigation.navigate(item.name)}
      style={[
        styles.cardContainer,
        isLargeTablet && index % 2 === 0 && styles.cardContainerLeft,
        isLargeTablet && index % 2 === 1 && styles.cardContainerRight,
      ]}
    >
      <LinearGradient colors={item.gradient} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={getResponsiveFontSize(32)} color="white" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={isPhone ? 2 : 1}>
            {item.name}
          </Text>
          <Text style={styles.cardDescription} numberOfLines={isPhone ? 2 : 1}>
            {item.description}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={getResponsiveFontSize(24)} color="white" style={styles.arrowIcon} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )

  const renderGrid = () => {
    if (isLargeTablet) {
      // Two-column layout for large tablets
      const rows = []
      for (let i = 0; i < menuItems.length; i += 2) {
        rows.push(
          <View key={i} style={styles.row}>
            {renderCard(menuItems[i], i)}
            {menuItems[i + 1] && renderCard(menuItems[i + 1], i + 1)}
          </View>,
        )
      }
      return rows
    } else {
      // Single column layout for phones and tablets
      return menuItems.map((item, index) => renderCard(item, index))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather name="chevron-left" size={getResponsiveFontSize(24)} color="#374151" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Letter Management</Text>
              <Text style={styles.headerSubtitle}>Select document type to proceed</Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          decelerationRate="normal"
        >
          <View style={styles.grid}>{renderGrid()}</View>

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Ionicons name="information-circle" size={getResponsiveFontSize(16)} color="#6b7280" />
              <Text style={styles.footerText}>Tap any document type to get started</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  backgroundContainer: {
    flex: 1,
    width: "100%",
    
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: getResponsiveHeight(2),
    paddingBottom: getResponsivePadding(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitleContainer: {
    paddingTop : getResponsivePadding(10),
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: getResponsiveHeight(2),
  },
  backButton: {
    width: getResponsiveWidth(10),
    height: getResponsiveWidth(10),
    borderRadius: getResponsiveWidth(5),
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: getResponsiveWidth(4),
    marginTop: getResponsiveHeight(0.5),
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: getResponsiveFontSize(28),
    fontWeight: "800",
    color: "#111827",
    marginBottom: getResponsiveHeight(0.5),
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: getResponsiveFontSize(16),
    color: "#6b7280",
    fontWeight: "500",
    lineHeight: getResponsiveHeight(2.5),
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    borderRadius: getResponsiveWidth(4),
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(20),
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: "700",
    color: "#6366f1",
  },
  statLabel: {
    fontSize: getResponsiveFontSize(12),
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: getResponsiveHeight(0.3),
  },
  scrollContent: {
    flexGrow: 1,
    padding: HORIZONTAL_PADDING,
    paddingTop: getResponsivePadding(20),
    paddingBottom: getResponsiveHeight(5),
  },
  grid: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: getResponsiveHeight(2),
  },
  cardContainer: {
    marginBottom: getResponsiveHeight(2),
    borderRadius: getResponsiveWidth(4),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardContainerLeft: {
    width: "48%",
    marginRight: "2%",
  },
  cardContainerRight: {
    width: "48%",
    marginLeft: "2%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveWidth(4),
    minHeight: CARD_HEIGHT,
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: getResponsiveWidth(4),
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    paddingRight: getResponsiveWidth(2),
  },
  cardTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: "700",
    color: "white",
    marginBottom: getResponsiveHeight(0.5),
    letterSpacing: 0.2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    fontSize: getResponsiveFontSize(14),
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    lineHeight: getResponsiveHeight(2.2),
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  arrowContainer: {
    width: getResponsiveWidth(8),
    height: getResponsiveWidth(8),
    borderRadius: getResponsiveWidth(4),
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    marginLeft: getResponsiveWidth(0.5),
  },
  footer: {
    marginTop: getResponsiveHeight(3),
    paddingTop: getResponsivePadding(20),
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: getResponsiveWidth(2),
  },
  footerText: {
    fontSize: getResponsiveFontSize(14),
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },
})

export default Letter
