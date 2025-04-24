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
import UsageChart from '../components/usage/UsageChart';
import AppUsageList from '../components/usage/AppUsageList';
import DailyUsageSummary from '../components/usage/DailyUsageSummary';
import GoalProgress from '../components/goals/GoalProgress';
import BottomNavigation from '../components/common/BottomNavigation';

const DashboardScreen = ({ navigation }) => {
  const [totalUsage, setTotalUsage] = useState(0);
  const [usageData, setUsageData] = useState([]);
  const [topApps, setTopApps] = useState([]);
  const [goals, setGoals] = useState([]);
  
  // Mock data - would be replaced with real usage tracking in production
  useEffect(() => {
    // Simulate data fetching
    setTotalUsage(5.2); // Hours
    setUsageData([
      { day: 'Mon', hours: 4.5 },
      { day: 'Tue', hours: 5.2 },
      { day: 'Wed', hours: 3.8 },
      { day: 'Thu', hours: 6.1 },
      { day: 'Fri', hours: 5.5 },
      { day: 'Sat', hours: 7.2 },
      { day: 'Sun', hours: 5.0 },
    ]);
    
    setTopApps([
      { id: '1', name: 'Instagram', icon: 'instagram', timeSpent: 95, color: '#E1306C' },
      { id: '2', name: 'YouTube', icon: 'youtube', timeSpent: 78, color: '#FF0000' },
      { id: '3', name: 'Twitter', icon: 'twitter', timeSpent: 45, color: '#1DA1F2' },
      { id: '4', name: 'TikTok', icon: 'music-note', timeSpent: 42, color: '#000000' },
    ]);
    
    setGoals([
      { id: '1', name: 'Reduce Instagram', target: 60, current: 95, icon: 'instagram', color: '#E1306C' },
      { id: '2', name: 'Limit Social Media', target: 120, current: 165, icon: 'account-group', color: '#4267B2' },
    ]);
  }, []);

  const navigateTo = (screen) => {
    // In a real app, you would use proper navigation
    console.log(`Navigate to ${screen}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Wellbeing</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Usage Summary */}
        <DailyUsageSummary 
          totalHours={totalUsage}
          percentChange={12}
          isIncrease={false}
        />
        
        {/* Weekly Usage Chart */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weekly Usage</Text>
            <TouchableOpacity onPress={() => navigateTo('UsageDetails')}>
              <Text style={styles.seeAllText}>See Details</Text>
            </TouchableOpacity>
          </View>
          <UsageChart data={usageData} />
        </View>
        
        {/* Top Apps */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Most Used Apps</Text>
            <TouchableOpacity onPress={() => navigateTo('UsageDetails')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <AppUsageList apps={topApps} />
        </View>
        
        {/* Goal Progress */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Goals</Text>
            <TouchableOpacity onPress={() => navigateTo('Goals')}>
              <Text style={styles.seeAllText}>Manage</Text>
            </TouchableOpacity>
          </View>
          <GoalProgress 
            goals={goals}
            onViewAll={() => navigateTo('Goals')}
          />
        </View>
        
        {/* Focus Mode */}
        <TouchableOpacity 
          style={styles.focusModeCard}
          onPress={() => navigateTo('FocusMode')}
        >
          <View style={styles.focusModeContent}>
            <Icon name="timer-outline" size={32} color="#fff" />
            <View style={styles.focusModeTextContainer}>
              <Text style={styles.focusModeTitle}>Focus Mode</Text>
              <Text style={styles.focusModeDescription}>Block notifications and stay focused</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={26} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
      
      <BottomNavigation 
        activeTab="dashboard"
        onTabPress={(tab) => navigateTo(tab)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  focusModeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5E60CE',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#5E60CE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  focusModeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusModeTextContainer: {
    marginLeft: 14,
  },
  focusModeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  focusModeDescription: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 2,
  },
});

export default DashboardScreen;