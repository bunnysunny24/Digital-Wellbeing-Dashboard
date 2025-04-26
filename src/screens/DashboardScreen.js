import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import components
import UsageChart from '../components/usage/UsageChart';
import AppUsageList from '../components/usage/AppUsageList';
import DailyUsageSummary from '../components/usage/DailyUsageSummary';
import GoalProgress from '../components/goals/GoalProgress';
import BottomNavigation from '../components/common/BottomNavigation';
import { useTheme } from '../context/ThemeContext';

const DashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsage, setTotalUsage] = useState(0);
  const [usageData, setUsageData] = useState([]);
  const [topApps, setTopApps] = useState([]);
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
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
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar backgroundColor={theme.colors.card} barStyle={theme.colors.statusBar} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar backgroundColor={theme.colors.card} barStyle={theme.colors.statusBar} />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.colors.accent }]}
            onPress={() => navigation.replace('Dashboard')}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const navigateTo = (screen) => {
    // Map tab keys to screen names
    const screenMapping = {
      'dashboard': 'Dashboard',
      'usage': 'UsageDetails',
      'focus': 'FocusMode',
      'goals': 'Goals',
      'settings': 'Settings'
    };
    
    // Navigate to the correct screen
    if (screenMapping[screen]) {
      navigation.navigate(screenMapping[screen]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.card} barStyle={theme.colors.statusBar} />
      
      <View style={[styles.header, { 
        backgroundColor: theme.colors.card,
        borderBottomColor: theme.colors.border
      }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Digital Wellbeing</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={24} color={theme.colors.text} />
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
        <View style={[styles.card, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Weekly Usage</Text>
            <TouchableOpacity onPress={() => navigateTo('UsageDetails')}>
              <Text style={[styles.seeAllText, { color: theme.colors.accent }]}>See Details</Text>
            </TouchableOpacity>
          </View>
          <UsageChart data={usageData} />
        </View>
        
        {/* Top Apps */}
        <View style={[styles.card, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Most Used Apps</Text>
            <TouchableOpacity onPress={() => navigateTo('UsageDetails')}>
              <Text style={[styles.seeAllText, { color: theme.colors.accent }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <AppUsageList apps={topApps} />
        </View>
        
        {/* Goal Progress */}
        <View style={[styles.card, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Your Goals</Text>
            <TouchableOpacity onPress={() => navigateTo('Goals')}>
              <Text style={[styles.seeAllText, { color: theme.colors.accent }]}>Manage</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
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
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;