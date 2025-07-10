import { BASE_URL } from "@/Api/BASE_URL.js"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

const { width, height } = Dimensions.get("window")

const Customer_Details = ({ navigation }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchProjects = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken")
      if (!token) {
        setError("No token found")
        setLoading(false)
        return
      }

      const response = await axios.get(`${BASE_URL}/getAllProjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProjects(response.data)
      setLoading(false)
      setError(null)
    } catch (err) {
      setError(err.message || "Failed to fetch projects")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchProjects()
    setRefreshing(false)
  }

  const handleProjectPress = (project) => {
    Alert.alert("Project Selected", `You tapped on ${project.name || "Unnamed Project"}`)
  }

  const renderProject = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.card, { marginTop: index === 0 ? 0 : 16 }]}
      onPress={() => navigation.navigate("All_Customer", { id: item.id, name: item.name })}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={["#FFFFFF", "#F8F9FA"]}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.projectIcon}>
            <Ionicons name="folder-outline" size={24} color="#4A90E2" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.name || "Unnamed Project"}
            </Text>
          </View>
          <View style={styles.arrowIcon}>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Customer Projects</Text>
      <Text style={styles.subtitle}>
        {projects.length} {projects.length === 1 ? "project" : "projects"} available
      </Text>
    </View>
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="folder-open-outline" size={64} color="#C7C7CC" />
      </View>
      <Text style={styles.emptyTitle}>No Projects Found</Text>
      <Text style={styles.emptySubtitle}>There are no customer projects available at the moment.</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  )

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading Projects...</Text>
        <Text style={styles.loadingSubtext}>Please wait while we fetch your data</Text>
      </View>
    </View>
  )

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <View style={styles.errorContent}>
        <View style={styles.errorIconContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#FF3B30" />
        </View>
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true)
            setError(null)
            fetchProjects()
          }}
        >
          <Ionicons name="refresh" size={20} color="#FFFFFF" style={styles.retryIcon} />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  if (loading) {
    return renderLoadingState()
  }

  if (error) {
    return renderErrorState()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
      <LinearGradient colors={["#F8F9FA", "#FFFFFF"]} style={styles.backgroundGradient}>
        <FlatList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4A90E2"]} tintColor="#4A90E2" />
          }
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundGradient: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: width * 0.05,
    paddingTop: 30,
    paddingBottom: 24,
  },
  title: {
    fontSize: RFPercentage(4),
    fontWeight: "800",
    color: "#1D1D1F",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: RFPercentage(2),
    color: "#8E8E93",
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: RFPercentage(2.4),
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 4,
    lineHeight: RFPercentage(2.8),
  },
  cardSubtitle: {
    fontSize: RFPercentage(1.8),
    color: "#8E8E93",
    fontWeight: "500",
  },
  arrowIcon: {
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
  },
  loadingText: {
    fontSize: RFPercentage(2.4),
    fontWeight: "600",
    color: "#1D1D1F",
    marginTop: 24,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: RFPercentage(1.8),
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: RFPercentage(2.2),
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
  },
  errorIconContainer: {
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: RFPercentage(2.6),
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 12,
    textAlign: "center",
  },
  errorText: {
    fontSize: RFPercentage(1.9),
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: RFPercentage(2.4),
  },
  retryButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    fontSize: RFPercentage(2.1),
    color: "#FFFFFF",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
    paddingTop: height * 0.1,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: RFPercentage(2.6),
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: RFPercentage(1.9),
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: RFPercentage(2.4),
  },
  refreshButton: {
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  refreshButtonText: {
    fontSize: RFPercentage(2),
    color: "#4A90E2",
    fontWeight: "600",
  },
})

export default Customer_Details
