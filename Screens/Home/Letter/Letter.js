import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Letter = ({ navigation }) => {
  const menuItems = [
    // {
    //   name: 'Offer Letter',
    //   icon: 'document-text',
    //   gradient: ['#FF6B6B', '#FF8E8E'],
    //   description: 'Generate & manage offer letters',
    // },
    {
      name: 'Riveling Letter',
      icon: 'mail',
      gradient: ['#4ECDC4', '#45B7AF'],
      description: 'Create riveling documentation'
    },
    {
      name: 'Salary Slip',
      icon: 'cash',
      gradient: ['#6C5CE7', '#8480E9'],
      description: 'Process salary statements'
    },
    {
      name: 'Allotment Letter',
      icon: 'document',
      gradient: ['#FFA62E', '#FFB961'],
      description: 'Handle property allotments'
    },
    {
      name: 'Demand Letter',
      icon: 'alert-circle',
      gradient: ['#FF7675', '#FF9291'],
      description: 'Create demand notices'
    },
    {
      name: 'Letter Heades',
      icon: 'text',
      gradient: ['#55A0FF', '#78B5FF'],
      description: 'Customize letter headers'
    },
    {
      name: 'Noc Letter',
      icon: 'checkmark-circle',
      gradient: ['#26DE81', '#45E994'],
      description: 'Generate NOC documents'
    },
    {
      name: 'Possession Letter',
      icon: 'home',
      gradient: ['#A55EEA', '#B779EC'],
      description: 'Issue possession letters'
    },
  ];

  return (
    <SafeAreaView style={Style_Letters.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ImageBackground
        style={Style_Letters.backgroundImage}
      >
        <View style={Style_Letters.headerContainer}>
          <View style={Style_Letters.headerTitleContainer} >
            {/* <MaterialIcons name="arrow-back" size={30} color="black" onPress={()=> navigation.goBack()}/> */}
            <Feather name="chevron-left" size={30} color="black" onPress={()=> navigation.goBack()}/>
            <Text style={Style_Letters.headerTitle}>Letter Management</Text>
          </View>
          <Text style={Style_Letters.headerSubtitle}>Select document type to proceed</Text>
        </View>

        <ScrollView
          contentContainerStyle={Style_Letters.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={Style_Letters.grid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(item.name)}
                style={Style_Letters.cardContainer}
              >
                <LinearGradient
                  colors={item.gradient}
                  style={Style_Letters.card}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={Style_Letters.iconContainer}>
                    <Ionicons name={item.icon} size={32} color="white" />
                  </View>
                  <View style={Style_Letters.cardContent}>
                    <Text style={Style_Letters.cardTitle}>{item.name}</Text>
                    <Text style={Style_Letters.cardDescription}>{item.description}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="white"
                    style={Style_Letters.arrowIcon}
                  />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView >
  );
};


const Style_Letters = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop : 30,
      backgroundColor: '#F8F9FA',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
    },
    headerContainer: {
    //   padding: 20,
    //   paddingTop: 10,
      backgroundColor: 'rgba(255,255,255,0.9)',
    },
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerTitle: {
      fontSize: 32,
      paddingLeft : 20,
      fontWeight: 'bold',
      color: '#2D3436',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      paddingLeft : 60,
      color: '#636E72',
      marginBottom: 10,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 16,
    },
    grid: {
      flexDirection: 'column',
    },
    cardContainer: {
      marginBottom: 16,
      borderRadius: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      height: 100,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)',
    },
    arrowIcon: {
      marginLeft: 8,
    },
  });
export default Letter;