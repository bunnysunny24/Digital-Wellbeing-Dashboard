import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Import components
import Header from '../components/common/Header';
import FocusTimer from '../components/focus/FocusTimer';
import FocusModeSchedule from '../components/focus/FocusModeSchedule';
import FocusModeSettings from '../components/focus/FocusModeSettings';
import BottomNavigation from '../components/common/BottomNavigation';

const FocusModeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('timer');
  const [timerDuration, setTimerDuration] = useState(25); // minutes
  
  const renderContent = () => {
    switch (activeTab) {
      case 'timer':
        return (
          <View style={styles.timerContainer}>
            <FocusTimer 
              initialMinutes={timerDuration} 
              onComplete={() => console.log('Timer completed!')} 
            />
            
            <Text style={styles.sectionTitle}>Quick Focus Duration</Text>
            <View style={styles.durationButtons}>
              {[5, 15, 25, 45, 60].map(minutes => (
                <TouchableOpacity
                  key={minutes}
                  style={[
                    styles.durationButton, 
                    timerDuration === minutes && styles.activeDurationButton
                  ]}
                  onPress={() => setTimerDuration(minutes)}
                >
                  <Text style={[
                    styles.durationText,
                    timerDuration === minutes && styles.activeDurationText
                  ]}>
                    {minutes} min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'schedule':
        return <FocusModeSchedule />;
      case 'settings':
        return <FocusModeSettings />;
      default:
        return <FocusTimer initialMinutes={timerDuration} />;
    }
  };
  
  const navigateTo = (screen) => {
    // In a real app, you would use proper navigation
    console.log(`Navigate to ${screen}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Header 
        title="Focus Mode" 
        onBack={() => navigation.goBack()} 
      />
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'timer' && styles.activeTab]}
          onPress={() => setActiveTab('timer')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'timer' && styles.activeTabText
          ]}>
            Timer
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'schedule' && styles.activeTabText
          ]}>
            Schedule
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'settings' && styles.activeTabText
          ]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
      
      <BottomNavigation 
        activeTab="focus"
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5A78FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#5A78FF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  timerContainer: {
    alignItems: 'center',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 30,
    marginBottom: 16,
  },
  durationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  durationButton: {
    width: '18%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  activeDurationButton: {
    backgroundColor: '#5A78FF',
  },
  durationText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  activeDurationText: {
    color: '#FFFFFF',
  },
});

export default FocusModeScreen;