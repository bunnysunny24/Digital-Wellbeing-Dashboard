import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import components
import Header from '../components/common/Header';
import ThemeToggle from '../components/common/ThemeToggle';
import BottomNavigation from '../components/common/BottomNavigation';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notificationsEnabled: true,
    usageReminders: true,
    goalAlerts: true,
    weeklyReport: true,
    screenTimeTrackingEnabled: true,
    dataCollection: true,
  });

  const toggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };
  
  const navigateTo = (screen) => {
    // In a real app, you would use proper navigation
    console.log(`Navigate to ${screen}`);
  };
  
  const showExportConfirmation = () => {
    Alert.alert(
      "Export Data",
      "Your data will be exported as a CSV file. This may take a moment.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export", onPress: () => console.log("Export initiated") }
      ]
    );
  };
  
  const showDeleteConfirmation = () => {
    Alert.alert(
      "Delete All Data",
      "This will permanently delete all your usage data and goals. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => console.log("Delete initiated"),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Header 
        title="Settings" 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.content}>
        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch between light and dark theme
              </Text>
            </View>
            <ThemeToggle 
              isDarkMode={settings.darkMode} 
              onToggle={() => toggleSetting('darkMode')}
            />
          </View>
        </View>
        
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive notifications for goals and usage updates
              </Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={() => toggleSetting('notificationsEnabled')}
              trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
              thumbColor={settings.notificationsEnabled ? '#5A78FF' : '#F5F5F5'}
            />
          </View>
          
          {settings.notificationsEnabled && (
            <>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Usage Reminders</Text>
                  <Text style={styles.settingDescription}>
                    Get notified when you approach your daily limits
                  </Text>
                </View>
                <Switch
                  value={settings.usageReminders}
                  onValueChange={() => toggleSetting('usageReminders')}
                  trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
                  thumbColor={settings.usageReminders ? '#5A78FF' : '#F5F5F5'}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Goal Alerts</Text>
                  <Text style={styles.settingDescription}>
                    Receive notifications about your goal progress
                  </Text>
                </View>
                <Switch
                  value={settings.goalAlerts}
                  onValueChange={() => toggleSetting('goalAlerts')}
                  trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
                  thumbColor={settings.goalAlerts ? '#5A78FF' : '#F5F5F5'}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Weekly Report</Text>
                  <Text style={styles.settingDescription}>
                    Receive a weekly summary of your digital wellbeing
                  </Text>
                </View>
                <Switch
                  value={settings.weeklyReport}
                  onValueChange={() => toggleSetting('weeklyReport')}
                  trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
                  thumbColor={settings.weeklyReport ? '#5A78FF' : '#F5F5F5'}
                />
              </View>
            </>
          )}
        </View>
        
        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Screen Time Tracking</Text>
              <Text style={styles.settingDescription}>
                Track how you use your device and apps
              </Text>
            </View>
            <Switch
              value={settings.screenTimeTrackingEnabled}
              onValueChange={() => toggleSetting('screenTimeTrackingEnabled')}
              trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
              thumbColor={settings.screenTimeTrackingEnabled ? '#5A78FF' : '#F5F5F5'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Data Collection</Text>
              <Text style={styles.settingDescription}>
                Collect anonymous usage data to improve the app
              </Text>
            </View>
            <Switch
              value={settings.dataCollection}
              onValueChange={() => toggleSetting('dataCollection')}
              trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
              thumbColor={settings.dataCollection ? '#5A78FF' : '#F5F5F5'}
            />
          </View>
        </View>
        
        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={showExportConfirmation}
          >
            <Icon name="export" size={24} color="#5A78FF" />
            <Text style={styles.actionText}>Export Your Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={showDeleteConfirmation}
          >
            <Icon name="delete-outline" size={24} color="#FF6B6B" />
            <Text style={styles.deleteText}>Delete All Data</Text>
          </TouchableOpacity>
        </View>
        
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Icon name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Terms of Service</Text>
            <Icon name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Send Feedback</Text>
            <Icon name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={styles.linkText}>Rate the App</Text>
            <Icon name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
      
      <BottomNavigation 
        activeTab="settings"
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#777',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  deleteButton: {
    borderBottomWidth: 0,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#5A78FF',
  },
  deleteText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginVertical: 20,
  },
});

export default SettingsScreen;