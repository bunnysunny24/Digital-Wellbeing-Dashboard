import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import components
import Header from '../components/common/Header';
import UsageChart from '../components/usage/UsageChart';
import AppUsageList from '../components/usage/AppUsageList';
import BottomNavigation from '../components/common/BottomNavigation';

const FILTER_OPTIONS = ['Daily', 'Weekly', 'Monthly'];

const UsageDetailsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Weekly');
  const [usageData, setUsageData] = useState([]);
  const [appList, setAppList] = useState([]);
  
  // Mock data for demonstration
  useEffect(() => {
    // Daily view data
    const dailyData = [
      { day: '12AM', hours: 0.5 },
      { day: '3AM', hours: 0.0 },
      { day: '6AM', hours: 0.8 },
      { day: '9AM', hours: 1.2 },
      { day: '12PM', hours: 0.7 },
      { day: '3PM', hours: 1.5 },
      { day: '6PM', hours: 2.3 },
      { day: '9PM', hours: 1.8 },
    ];
    
    // Weekly view data
    const weeklyData = [
      { day: 'Mon', hours: 4.5 },
      { day: 'Tue', hours: 5.2 },
      { day: 'Wed', hours: 3.8 },
      { day: 'Thu', hours: 6.1 },
      { day: 'Fri', hours: 5.5 },
      { day: 'Sat', hours: 7.2 },
      { day: 'Sun', hours: 5.0 },
    ];
    
    // Monthly view data
    const monthlyData = [
      { day: 'Week 1', hours: 32.5 },
      { day: 'Week 2', hours: 37.8 },
      { day: 'Week 3', hours: 35.2 },
      { day: 'Week 4', hours: 40.3 },
    ];
    
    // Set appropriate data based on filter
    switch (selectedFilter) {
      case 'Daily':
        setUsageData(dailyData);
        break;
      case 'Monthly':
        setUsageData(monthlyData);
        break;
      case 'Weekly':
      default:
        setUsageData(weeklyData);
        break;
    }
    
    // Apps usage data
    setAppList([
      { id: '1', name: 'Instagram', icon: 'instagram', timeSpent: 95, color: '#E1306C' },
      { id: '2', name: 'YouTube', icon: 'youtube', timeSpent: 78, color: '#FF0000' },
      { id: '3', name: 'Twitter', icon: 'twitter', timeSpent: 45, color: '#1DA1F2' },
      { id: '4', name: 'Facebook', icon: 'facebook', timeSpent: 38, color: '#4267B2' },
      { id: '5', name: 'TikTok', icon: 'music-note', timeSpent: 42, color: '#000000' },
      { id: '6', name: 'WhatsApp', icon: 'whatsapp', timeSpent: 35, color: '#25D366' },
      { id: '7', name: 'Snapchat', icon: 'snapchat', timeSpent: 28, color: '#FFFC00' },
      { id: '8', name: 'Chrome', icon: 'google-chrome', timeSpent: 55, color: '#4285F4' },
    ]);
    
  }, [selectedFilter]);
  
  const getTotalScreenTime = () => {
    const totalHours = usageData.reduce((total, day) => total + day.hours, 0);
    return totalHours;
  };
  
  const navigateTo = (screen) => {
    // In a real app, you would use proper navigation
    console.log(`Navigate to ${screen}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Header 
        title="Usage Details" 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.filterContainer}>
          {FILTER_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterOption,
                selectedFilter === option && styles.selectedFilter
              ]}
              onPress={() => setSelectedFilter(option)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === option && styles.selectedFilterText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Screen Time</Text>
          <Text style={styles.totalTime}>{getTotalScreenTime()} hours</Text>
        </View>
        
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>
            Screen Time ({selectedFilter})
          </Text>
          <UsageChart data={usageData} />
        </View>
        
        <View style={styles.appsCard}>
          <Text style={styles.cardTitle}>
            App Usage Breakdown
          </Text>
          <Text style={styles.cardSubtitle}>
            Total time spent on each app
          </Text>
          <AppUsageList apps={appList} />
        </View>
        
        <TouchableOpacity style={styles.exportButton}>
          <Icon name="export-variant" size={20} color="#5A78FF" />
          <Text style={styles.exportText}>Export Usage Data</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <BottomNavigation 
        activeTab="usage"
        onTabPress={(tab) => navigateTo(tab)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollView: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: '#EAECEF',
    borderRadius: 10,
    padding: 4,
  },
  filterOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedFilter: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedFilterText: {
    color: '#5A78FF',
  },
  totalSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  totalTime: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  appsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: -10,
    marginBottom: 15,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 12,
  },
  exportText: {
    marginLeft: 8,
    color: '#5A78FF',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default UsageDetailsScreen;