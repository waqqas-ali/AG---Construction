// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import React, { useMemo, useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // Assuming separate logo files
// import { default as infraLogo, default as loanLogo } from '@/assets/images/ag.js';

// const { width } = Dimensions.get('window');

// // Centralized contact information
// const CONTACT_INFO = {
//   address: [
//     'Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar, Nagpur, Maharashtra 440034',
//   ],
//   email: 'agconstructions220@gmail.com',
//   website: 'www.agconstructionnagpur.in',
//   phone: '+91 7620419075',
// };

// const LetterHeadModal = ({ visible, onClose, type, logo }) => {
//   const [isGenerating, setIsGenerating] = useState(false);

//   const html = useMemo(() => `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           max-width: 800px;
//           margin: 20px auto;
//           padding: 20px;
//           line-height: 1.8;
//         }
//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }
//         .logo {
//           height: 80px;
//           width: auto;
//         }
//         .contact-info {
//           text-align: right;
//           font-size: 14px;
//           color: #000;
//         }
//         .contact-row {
//           display: flex;
//           justify-content: flex-end;
//           align-items: center;
//           margin-bottom: 5px;
//         }
//         .icon-box {
//           background-color: #d34508;
//           padding: 8px;
//           border-radius: 2px;
//           margin-left: 10px;
//         }
//         .divider {
//           border-top: 1px solid rgb(167, 5, 86);
//           margin-bottom: 2px;
//         }
//         .divider-thick {
//           border-top: 3px solid rgb(167, 5, 86);
//         }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <img src="${logo}" alt="ROYAALMEDE" class="logo">
//         <div class="contact-info">
//           <div class="contact-row">
//             <div>
//               <p>${CONTACT_INFO.address[0]}</p>
//             </div>
//             <div class="icon-box"><span>📍</span></div>
//           </div>
//           <div class="contact-row">
//             <p>${CONTACT_INFO.email}</p>
//             <div class="icon-box"><span>✉️</span></div>
//           </div>
//           <div class="contact-row">
//             <p>${CONTACT_INFO.website}</p>
//             <div class="icon-box"><span>🌐</span></div>
//           </div>
//           <div class="contact-row">
//             <p>${CONTACT_INFO.phone}</p>
//             <div class="icon-box"><span>📞</span></div>
//           </div>
//         </div>
//       </div>
//       <div class="divider"></div>
//       <div class="divider-thick"></div>
//     </body>
//     </html>
//   `, [logo]);

//   const generatePDF = async () => {
//     setIsGenerating(true);
//     try {
//       const filename = type === 'infra' ? 'Letter_Head_infra.pdf' : 'Letter_Head_Loan.pdf';
//       const { uri } = await Print.printToFileAsync({ html });
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, { dialogTitle: `Share ${filename}` });
//       } else {
//         alert('Sharing is not available on this device.');
//       }
//     } catch (error) {
//       console.error('Error generating PDF:', error.message);
//       alert(`Failed to generate PDF: ${error.message}`);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <BlurView intensity={90} style={styles.modalBlur}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             <View style={styles.letterHeadContainer}>
//               <View style={styles.letterHeadButtons}>
//                 <TouchableOpacity
//                   style={[styles.downloadButton, isGenerating && styles.disabledButton]}
//                   onPress={generatePDF}
//                   disabled={isGenerating}
//                   accessible={true}
//                   accessibilityLabel={`Download ${type} letterhead as PDF`}
//                   accessibilityRole="button"
//                 >
//                   <Text style={styles.downloadButtonText}>
//                     {isGenerating ? 'Generating...' : 'Download PDF'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={onClose}
//                   accessible={true}
//                   accessibilityLabel="Close modal"
//                   accessibilityRole="button"
//                 >
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.letterHeadContent}>
//                 <View style={styles.headerContainerModal}>
//                   <Image source={logo} style={styles.logo} resizeMode="contain" />
//                   <View style={styles.contactInfo}>
//                     <View style={styles.contactRow}>
//                       <View>
//                         {CONTACT_INFO.address.map((line, index) => (
//                           <Text key={index} style={styles.contactText}>
//                             {line}
//                           </Text>
//                         ))}
//                       </View>
//                       <View style={styles.iconWrapper}>
//                         <FontAwesome name="map-marker" size={15} color="#fff" />
//                       </View>
//                     </View>
//                     <View style={styles.contactRow}>
//                       <Text style={styles.contactText}>{CONTACT_INFO.email}</Text>
//                       <View style={styles.iconWrapper}>
//                         <FontAwesome name="envelope" size={15} color="#fff" />
//                       </View>
//                     </View>
//                     <View style={styles.contactRow}>
//                       <Text style={styles.contactText}>{CONTACT_INFO.website}</Text>
//                       <View style={styles.iconWrapper}>
//                         <FontAwesome name="globe" size={15} color="#fff" />
//                       </View>
//                     </View>
//                     <View style={styles.contactRow}>
//                       <Text style={styles.contactText}>{CONTACT_INFO.phone}</Text>
//                       <View style={styles.iconWrapper}>
//                         <FontAwesome name="phone" size={15} color="#fff" />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={styles.dividerContainer}>
//                   <View style={[styles.divider, { borderWidth: 1 }]} />
//                   <View style={[styles.divider, { borderWidth: 3 }]} />
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         </BlurView>
//       </View>
//     </Modal>
//   );
// };

// const letter_Heades = () => {
//   const insets = useSafeAreaInsets();
//   const scaleAnim1 = useRef(new Animated.Value(1)).current;
//   const scaleAnim2 = useRef(new Animated.Value(1)).current;
//   const [infraLetterHead, setInfraLetterHead] = useState(false);
//   const [loanLetterHead, setLoanLetterHead] = useState(false);

//   const animatePress = (anim) => {
//     Animated.spring(anim, {
//       toValue: 0.95,
//       friction: 8,
//       tension: 100,
//       useNativeDriver: true,
//     }).start(() => {
//       Animated.spring(anim, {
//         toValue: 1,
//         friction: 8,
//         tension: 100,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const ButtonComponent = ({ title, onPress, scaleAnim, gradientColors, icon }) => (
//     <Animated.View
//       style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}
//     >
//       <TouchableOpacity
//         onPress={() => {
//           animatePress(scaleAnim);
//           onPress?.();
//         }}
//         activeOpacity={0.9}
//         accessible={true}
//         accessibilityLabel={`Open ${title} letterhead template`}
//         accessibilityRole="button"
//       >
//         <LinearGradient
//           colors={gradientColors}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.button}
//         >
//           <MaterialIcons name={icon} size={24} color="white" style={styles.buttonIcon} />
//           <View style={styles.buttonContent}>
//             <Text style={styles.buttonText}>{title}</Text>
//             <Text style={styles.buttonSubText}>Tap to select template</Text>
//           </View>
//           <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
//         </LinearGradient>
//       </TouchableOpacity>
//     </Animated.View>
//   );

//   return (
//     <LinearGradient
//       colors={['#ffffff', '#f0f2f5']}
//       style={[styles.container, { paddingTop: insets.top || 40 }]}
//     >
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerText}>Letter Headers</Text>
//         <Text style={styles.subHeaderText}>Choose your preferred template style</Text>
//       </View>
//       <View style={styles.buttonsContainer}>
//         <ButtonComponent
//           title="AG - Construction"
//           onPress={() => setInfraLetterHead(true)}
//           scaleAnim={scaleAnim1}
//           gradientColors={['#4e54c8', '#8f94fb']}
//           icon="business"
//         />
//       </View>
//       <LetterHeadModal
//         visible={infraLetterHead}
//         onClose={() => setInfraLetterHead(false)}
//         type="infra"
//         logo={infraLogo}
//       />
//       <LetterHeadModal
//         visible={loanLetterHead}
//         onClose={() => setLoanLetterHead(false)}
//         type="loan"
//         logo={loanLogo}
//       />
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 40,
//   },
//   headerText: {
//     fontSize: 34,
//     fontWeight: '800',
//     color: '#1a1a1a',
//     marginBottom: 8,
//     letterSpacing: -0.5,
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 4,
//     letterSpacing: 0.2,
//   },
//   buttonsContainer: {
//     paddingHorizontal: 20,
//     gap: 20,
//   },
//   buttonWrapper: {
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 24,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonIcon: {
//     marginRight: 16,
//   },
//   buttonContent: {
//     flex: 1,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: '700',
//     marginBottom: 4,
//     letterSpacing: 0.5,
//   },
//   buttonSubText: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontWeight: '400',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalBlur: {
//     width: width * 0.9,
//     maxWidth: '90%',
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   modalContent: {
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     padding: 20,
//   },
//   letterHeadContainer: {
//     flex: 1,
//   },
//   letterHeadButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   downloadButton: {
//     backgroundColor: '#6A5ACD',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   disabledButton: {
//     backgroundColor: '#a9a9a9',
//     opacity: 0.7,
//   },
//   downloadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   closeButton: {
//     backgroundColor: '#FF0000',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   headerContainerModal: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     height: 80,
//     width: 100,
//   },
//   contactInfo: {
//     flex: 2,
//     alignItems: 'flex-end',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//     justifyContent: 'flex-end',
//   },
//   iconWrapper: {
//     backgroundColor: '#d34508',
//     padding: 8,
//     borderRadius: 2,
//     marginLeft: 10,
//   },
//   contactText: {
//     color: '#000',
//     fontSize: 14,
//     marginRight: 10,
//   },
//   dividerContainer: {
//     marginBottom: 10,
//   },
//   divider: {
//     borderColor: 'rgb(167, 5, 86)',
//     marginBottom: 2,
//   },
// });

// export default letter_Heades;












import { ag } from '@/assets/images/ag.js';
import infraLogo from '@/assets/images/agconstruction-1.png';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const LetterHeaders = () => {
  const scaleAnim1 = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  const [infraLetterHead, setInfraLetterHead] = useState(false);
  const [loanLetterHead, setLoanLetterHead] = useState(false);

  const animatePress = (anim) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const generatePDF = async (type) => {
    const logoSrc = type === 'infra' ? infraLogo : loanLogo;
    const filename = type === 'infra' ? 'Letter_Head_infra.pdf' : 'Letter_Head_Loan.pdf';
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
            border-top: 1px solid rgb(167, 5, 86);
            margin-bottom: 2px;
          }
          .divider-thick {
            border-top: 3px solid rgb(167, 5, 86);
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
        <div class="divider-thick"></div>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { dialogTitle: `Share ${filename}` });
      } else {
        alert('Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF.');
    }
  };

  const ButtonComponent = ({ title, onPress, scaleAnim, gradientColors, icon }) => (
    <Animated.View
      style={[
        styles.buttonWrapper,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          animatePress(scaleAnim);
          onPress?.();
        }}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <MaterialIcons name={icon} size={24} color="white" style={styles.buttonIcon} />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{title}</Text>
            <Text style={styles.buttonSubText}>Tap to select template</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#f0f2f5']}
      style={styles.container}
    >
      
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Letter Headers</Text>
        <Text style={styles.subHeaderText}>Choose your preferred template style</Text>
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <ButtonComponent
          title="AG - Construction"
          onPress={() => setInfraLetterHead(true)}
          scaleAnim={scaleAnim1}
          gradientColors={['#4e54c8', '#8f94fb']}
          icon="business"
        />
      </View>

      {/* Royaal Infra Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={infraLetterHead}
        onRequestClose={() => setInfraLetterHead(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={90} style={styles.modalBlur}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.letterHeadContainer}>
                <View style={styles.letterHeadButtons}>
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => generatePDF('infra')}
                  >
                    <Text style={styles.downloadButtonText}>Download PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setInfraLetterHead(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.letterHeadContent}>
                  <View style={styles.headerContainerModal}>
                    <Image source={infraLogo} style={styles.logo} resizeMode="contain" />
                    <View style={styles.contactInfo}>
                      <View style={styles.contactRow}>
                        <View>
                          <Text style={styles.contactText}>
                          Plot 62, Hudkeshwar Rd, near Rakshak Fresh Mart, Ingole Nagar,
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
                        <Text style={styles.contactText}>www.agconstructionnagpur.in</Text>
                        <View style={styles.iconWrapper}>
                          <FontAwesome name="globe" size={15} color="#fff" />
                        </View>
                      </View>
                      <View style={styles.contactRow}>
                        <Text style={styles.contactText}>+91 7620 419 075</Text>
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
                </View>
              </View>
            </ScrollView>
          </BlurView>
        </View>
      </Modal>

      {/* Royaal Loan Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={loanLetterHead}
        onRequestClose={() => setLoanLetterHead(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={90} style={styles.modalBlur}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.letterHeadContainer}>
                <View style={styles.letterHeadButtons}>
                  <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => generatePDF('loan')}
                  >
                    <Text style={styles.downloadButtonText}>Download PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setLoanLetterHead(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.letterHeadContent}>
                  <View style={styles.headerContainerModal}>
                    {/* <Image source={loanLogo} style={styles.logo} resizeMode="contain" /> */}
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
                    <View style={[styles.divider, { borderWidth: 1 }]} />
                    <View style={[styles.divider, { borderWidth: 3 }]} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </BlurView>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  buttonWrapper: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 16,
  },
  buttonContent: {
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  buttonSubText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
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
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
  },
  letterHeadContainer: {
    flex: 1,
  },
  letterHeadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  closeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainerModal: {
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
});

export default LetterHeaders;